"""Free voice bake-off: the same 4 dramatic Hindi lines in several open-source voices.

  python history/voice_test.py parler   -> Indic Parler-TTS (AI4Bharat), voices Rohit and Aman
  python history/voice_test.py kokoro   -> Kokoro-82M, voices hm_omega and hm_psi
  python history/voice_test.py indicf5  -> IndicF5 (AI4Bharat), cloned from its bundled sample voice
Writes out/samples/<engine>-<voice>.mp3 (the 4 lines with short gaps). Needs HF_TOKEN for the gated models.
"""
import os, re, subprocess, sys, time, urllib.request
from pathlib import Path
import numpy as np
import soundfile as sf

OUT = Path("out/samples"); OUT.mkdir(parents=True, exist_ok=True)

LINES = [
    ("दुश्मन का सुल्तान घायल होकर घोड़े से गिर रहा था। एक वार, और कहानी वहीं ख़त्म हो जाती।",
     "a tense, serious voice, expressive at a moderate pace"),
    ("पर उसे जाने दिया गया। और इसी एक फ़ैसले ने इतिहास बदल दिया।",
     "a grave, slow and deep voice, very expressive"),
    ("तीरंदाज़ी मुक़ाबले में चंद बरदाई ने एक दोहे में सुल्तान की जगह बता दी, चार बाँस चौबीस गज... मत चूको चौहान!",
     "a proud and energetic voice, highly expressive, rising with excitement"),
    ("तुम मुझे ख़ून दो... मैं तुम्हें आज़ादी दूँगा!",
     "a loud, commanding and highly expressive voice, like a general addressing his army"),
]


def save_mp3(name, clips, sr):
    gap = np.zeros(int(0.7 * sr), np.float32)
    parts = []
    for c in clips:
        parts += [np.asarray(c, np.float32).squeeze(), gap]
    wav = OUT / f"{name}.wav"
    sf.write(wav, np.concatenate(parts), sr)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(wav), "-c:a", "libmp3lame", "-b:a", "128k",
                    str(OUT / f"{name}.mp3")], check=True)
    wav.unlink()
    print("saved", name, flush=True)


def parler():
    import torch
    from parler_tts import ParlerTTSForConditionalGeneration
    from transformers import AutoTokenizer
    mid = "ai4bharat/indic-parler-tts"
    model = ParlerTTSForConditionalGeneration.from_pretrained(mid).eval()
    tok = AutoTokenizer.from_pretrained(mid)
    dtok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
    for spk in ("Rohit", "Aman"):
        clips = []
        for text, style in LINES:
            desc = (f"{spk} speaks in a deep, low-pitched male voice. He narrates a legend from Indian history with "
                    f"{style}. The recording is very clear audio with no background noise, close up.")
            torch.manual_seed(7); t0 = time.time()
            d = dtok(desc, return_tensors="pt"); p = tok(text, return_tensors="pt")
            with torch.no_grad():
                g = model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                                   prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
            a = g.cpu().numpy().squeeze(); clips.append(a)
            print(f"parler {spk}: {len(a)/model.config.sampling_rate:.1f}s audio in {time.time()-t0:.0f}s", flush=True)
        save_mp3(f"1-parler-{spk}", clips, model.config.sampling_rate)


def kokoro():
    from kokoro import KPipeline
    pipe = KPipeline(lang_code="h")
    for voice in ("hm_omega", "hm_psi"):
        clips = []
        for text, _ in LINES:
            for _, _, audio in pipe(text, voice=voice, speed=0.95):
                clips.append(audio.numpy() if hasattr(audio, "numpy") else audio)
        save_mp3(f"2-kokoro-{voice}", clips, 24000)


def indicf5():
    from transformers import AutoModel
    base = "https://raw.githubusercontent.com/AI4Bharat/IndicF5/main/"
    readme = urllib.request.urlopen(base + "README.md").read().decode()
    ref_text = re.search(r'ref_text\s*=\s*"([^"]+)"', readme).group(1)
    urllib.request.urlretrieve(base + "prompts/PAN_F_HAPPY_00001.wav", "ref.wav")
    model = AutoModel.from_pretrained("ai4bharat/IndicF5", trust_remote_code=True, low_cpu_mem_usage=False)
    clips = []
    for text, _ in LINES:
        t0 = time.time()
        a = model(text, ref_audio_path="ref.wav", ref_text=ref_text)
        a = np.asarray(a)
        if a.dtype == np.int16:
            a = a.astype(np.float32) / 32768.0
        clips.append(a)
        print(f"indicf5: {len(a)/24000:.1f}s audio in {time.time()-t0:.0f}s", flush=True)
    save_mp3("3-indicf5-sample-voice", clips, 24000)


if __name__ == "__main__":
    {"parler": parler, "kokoro": kokoro, "indicf5": indicf5}[sys.argv[1]]()
