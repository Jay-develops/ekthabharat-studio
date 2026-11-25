"""Procedural score (no licensed music): tanpura drone + nagara drums on battle scenes, boom on the title.
music(scenes) -> stereo float32 at 44.1 kHz, full length."""
import numpy as np
SR = 44100


def music(scenes, seed=3):
    starts, t = {}, 0.0
    for sid, d, _ in scenes:
        starts.setdefault(sid, (t, d)); t += d
    T = t; N = int(T * SR) + SR; out = np.zeros((N, 2)); rng = np.random.default_rng(seed)

    def add(sig, at, gain=1.0, pan=0.0):
        i = int(at * SR); j = min(N, i + len(sig))
        if j <= i: return
        sig = sig[: j - i]; out[i:j, 0] += sig * gain * (1 - pan); out[i:j, 1] += sig * gain * (1 + pan)

    def tanpura(f, dur=4.0):
        n = int(dur * SR); tt = np.arange(n) / SR; s = np.zeros(n)
        for h in range(1, 16):
            s += (1 / h) * (1 + 0.6 * np.sin(2 * np.pi * (0.35 + h * 0.07) * tt + h)) * np.sin(2 * np.pi * f * h * tt * (1 + 0.0008 * h))
        return s * np.minimum(1, tt / 0.01) * np.exp(-tt / 1.8) / 6

    SA = 130.81
    notes = [SA * 0.75, SA, SA, SA / 2]; k = 0; x = 0.0
    while x < T:
        add(tanpura(notes[k % 4]), x, 0.32, pan=[-0.3, 0.2, 0.1, -0.1][k % 4]); x += 1.15; k += 1
    tt = np.arange(N) / SR
    pad = (np.sin(2 * np.pi * SA / 2 * tt) + 0.5 * np.sin(2 * np.pi * SA * 0.75 * tt)) * 0.05
    out[:, 0] += pad; out[:, 1] += pad

    def drum(dur=0.9, f0=95, f1=48):
        n = int(dur * SR); t2 = np.arange(n) / SR
        f = f1 + (f0 - f1) * np.exp(-t2 * 18)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t2 * 5) + rng.standard_normal(n) * np.exp(-t2 * 60) * 0.35

    def drums(sid, bpm, gain, pattern=(1, 0, 0.6, 0, 1, 0.5, 0.7, 0), fade_in=1.0):
        if sid not in starts: return
        a, d = starts[sid]; step = 60 / bpm / 2; i = 0; x = a + 0.2
        while x < a + d - 0.3:
            v = pattern[i % len(pattern)]
            if v: add(drum() * v, x, gain * min(1, (x - a) / fade_in))
            x += step; i += 1

    drums("hook_fleet", 70, 0.22, pattern=(1, 0, 0, 0))
    drums("army", 92, 0.30, fade_in=4)
    drums("retreat", 108, 0.30)
    drums("rally", 100, 0.30, fade_in=5)
    drums("victory", 112, 0.34)
    if "title" in starts:
        a, _ = starts["title"]; add(drum(2.5, 70, 32) * 1.2, a, 0.6)
        sh = rng.standard_normal(int(1.5 * SR)); sh = np.convolve(sh, np.ones(30) / 30, "same") * np.exp(-np.arange(len(sh)) / SR * 2.5)
        add(sh * 0.6, a, 0.35)

    # videos 07+: story.MUSIC = {"drums": {scene: bpm or (bpm, gain)}, "pulse": [scene], "hits": [(scene, line)],
    #                            "rise": [(scene, line)], "quiet": [scene]}
    try:
        import story
        cfg = getattr(story, "MUSIC", None) or {}
    except Exception:
        cfg = {}
    cues = {}
    for sid, _, c in scenes:
        cues.setdefault(sid, c)
    line_at = lambda sid, k: starts[sid][0] + cues[sid][min(k, len(cues[sid]) - 1)][0] if sid in starts and cues[sid] else None
    for sid in cfg.get("quiet", []):          # soften the drone under emotional scenes
        if sid in starts:
            a, d = starts[sid]; i0, i1 = int(a * SR), int((a + d) * SR); ramp = int(0.6 * SR)
            env = np.ones(i1 - i0) * 0.45; env[:ramp] = np.linspace(1, 0.45, min(ramp, len(env)))[:len(env[:ramp])]
            env[-ramp:] = np.linspace(0.45, 1, ramp)[-len(env[-ramp:]):]; out[i0:i1] *= env[:, None]
    for sid, spec in cfg.get("drums", {}).items():
        bpm, g = spec if isinstance(spec, (list, tuple)) else (spec, 0.28)
        drums(sid, bpm, g, fade_in=2.0)
    for sid in cfg.get("pulse", []):          # heartbeat under tension
        if sid in starts:
            a, d = starts[sid]; x = a + 0.15
            while x < a + d - 0.4:
                add(drum(0.45, 62, 38) * 0.9, x, 0.26); add(drum(0.4, 58, 36) * 0.6, x + 0.27, 0.26); x += 0.92
    for sid, k in cfg.get("rise", []):         # noise riser ending on a line
        at = line_at(sid, k)
        if at is not None and at > 0.5:
            n = int(1.6 * SR); u = np.arange(n) / n
            sw = np.convolve(rng.standard_normal(n), np.ones(8) / 8, "same") * u ** 2.2 * 0.5 + np.sin(2 * np.pi * np.cumsum(200 + 600 * u ** 2) / SR) * u ** 2 * 0.15
            add(sw, at - 1.6, 0.4)
    for sid, k in cfg.get("hits", []):         # big boom on a line
        at = line_at(sid, k)
        if at is not None:
            add(drum(2.4, 75, 30) * 1.2, at, 0.6)
            sh = rng.standard_normal(int(1.2 * SR)); sh = np.convolve(sh, np.ones(30) / 30, "same") * np.exp(-np.arange(len(sh)) / SR * 3)
            add(sh * 0.5, at, 0.3)
    out = np.tanh(out * 1.2)
    return (out / (np.max(np.abs(out)) + 1e-9) * 0.7)[: int(T * SR)]
