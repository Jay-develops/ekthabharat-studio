// @common2
// ---------------- video 10 - Velu Nachiyar & Kuyili ----------------
const VELU = { woman: true, hat: 'none', hat2: 'mukut', cloth: '#d4a017' };
const KUYILI = { woman: true, hat: 'none', hat2: 'bun', cloth: '#8e2a9c' };
function arsenal(x, y, s, a = 1) {   // a stone magazine with powder barrels
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-200, -260, 400, 260); ctx.beginPath(); ctx.moveTo(-230, -260); ctx.lineTo(0, -360); ctx.lineTo(230, -260); ctx.fill();
  ctx.fillStyle = HOLE; ctx.fillRect(-50, -170, 100, 170);
  ctx.fillStyle = INK; for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { ctx.beginPath(); ctx.ellipse(-160 + i * 34 + (j ? 17 : 0), -24 - j * 50, 16, 26, 0, 0, 7); ctx.fill(); }
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(110 + i * 32, -24, 16, 26, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
function fortWall(t, y = 1180, a = 0.55) { ctx.save(); ctx.globalAlpha = a; wall(y - 330, 330); ctx.restore(); }

// ---------- HOOK ----------
S.hook_arsenal = (t) => {
  const c1 = cue(1)[0], bt = at(1, 0.88);
  cam(t, { z: lerp(1, 1.2, prog(t, 0, bt)) + bump(t, bt, 0.6, 0.08), fx: 620, fy: 1000, shake: hit(t, bt, 1.2, 34) });
  bg(PAL.night, noise1(t * 3), 640, 760);
  stars(t, 0.6); moon(220, 360, 50);
  arsenal(760, 1180, 1.1);
  ground(1180);
  for (const x of [520, 1000]) redcoat(x, 1180, 0.85, { face: x < 700 ? -1 : -1, fa: [0.5, -1.3] });
  torch(600, 1180, 220, t, 1);
  // Kuyili walks in; a glow gathers around her as she runs
  const go = prog(t, 0.2, c1), run = prog(t, c1, bt);
  const x = lerp(-80, 250, go) + lerp(0, 440, run * run);
  if (t < bt) {
    glow(x, 1000, 260, '255,160,60', 0.2 + 0.7 * run);
    actor(x, 1180, 1.15, t, { ...KUYILI, walk: t * (run > 0 ? 9 : 4), ...(run > 0 ? POSE.reach : {}), lean: 0.25 * run, ph: 2 });
    if (run > 0.2) embers(t, 30, 11, run, [x - 100, 800, x + 100, 1180]);
  }
  boom(780, 1080, t, bt, 2.2, 9); if (t > bt) flash(1 - prog(t, bt, bt + 0.5));
  legendTag(t, prog(t, c1, c1 + 0.4) * (1 - prog(t, bt - 0.3, bt)));
  slam('1780  ·  शिवगंगा', 220, t, 0.15, 86, { until: c1 });
  grade('night', t, 0.4 * (1 - prog(t, bt, bt + 0.3)));
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.08); sun(540, 860, 160, 0.95);
  hills(1100, 150, 1001, 0.6); ground(1200);
  rider(470, 1200, 1.25, t, { woman: true, hat: 'none', wpn: 'sword', fa: [2.85, 0.1], rear: 0.3 + 0.1 * pulse(t, 0.5), still: true });
  actor(840, 1200, 1.1, t, { ...KUYILI, ...POSE.raise, wpn: 'sword', ph: 1 });
  title2(t, 'वेलु नाच्चियार', 'और सेनापति कुयिली  ·  1780', { y: 220, size: 108 });
  embers(t, 25, 101, 0.6);
};

// ---------- PRINCESS ----------
S.princess = (t) => {
  const c1 = cue(1)[0], wed = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(PAL.temple, 0, 540, 700);
  gopuram(860, 1180, 0.6); for (const [x, s] of [[80, 1.0], [180, 0.75]]) tree(x, 1180, s, t, x);
  ground(1180);
  if (wed < 1) { ctx.save(); ctx.globalAlpha = 1 - wed;
    const spin = t * 7;   // silambam: staff spinning
    actor(420, 1180, 1.2, t, { ...VELU, hat2: null, fa: [1.6 + Math.sin(spin) * 0.6, -0.4], sh: [1.2 + Math.cos(spin) * 0.5, -0.6], ph: 1 });
    const [hx, hy] = handAt(420, 1180, 1.2, { fa: [1.6 + Math.sin(spin) * 0.6, -0.4] });
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.translate(hx, hy); ctx.rotate(spin); ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(170, 0); ctx.stroke(); ctx.restore();
    ctx.restore();
    chip('रामनाथपुरम की राजकुमारी', 540, 200, 46, prog(t, 0.1, 0.6) * (1 - wed));
    const langs = ['தமிழ்', 'English', 'Français', 'اردو']; overlay(() => { langs.forEach((l, i) => { const a = prog(t, at(0, 0.55 + i * 0.1), at(0, 0.6 + i * 0.1)) * (1 - wed); if (a > 0) chip(l, 250 + (i % 2) * 560, 360 + Math.floor(i / 2) * 110, 44, a); }); }); }
  if (wed > 0) { ctx.save(); ctx.globalAlpha = wed;
    actor(400, 1180, 1.15, t, { ...VELU, ...POSE.pray, ph: 1 }); actor(650, 1180, 1.2, t, { face: -1, hat: 'crown', cloth: '#2f6a8a', ...POSE.pray, ph: 3 });
    for (let i = 0; i < 14; i++) { const k = ((t * 0.3 + i / 14) % 1); ctx.fillStyle = i % 2 ? '#ffb347' : '#ffd27a'; ctx.globalAlpha = wed * Math.sin(k * Math.PI); ctx.beginPath(); ctx.arc(300 + (i * 61) % 480, 500 + k * 600, 7, 0, 7); ctx.fill(); }
    ctx.restore(); chip('शिवगंगा के राजा मुत्तु वडुगनाथ', 540, 220, 44, wed); }
};

// ---------- ATTACK 1772 ----------
S.attack = (t) => {
  const c1 = cue(1)[0], flee = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, c1)), shake: flee < 1 ? 4 + hit(t, at(0, 0.7), 0.5, 14) : 0 });
  bg(mixPal(PAL.battle, PAL.night, flee), noise1(t * 3), 540, 700);
  if (flee < 1) { ctx.save(); ctx.globalAlpha = 1 - flee;
    hills(900, 200, 1011, 0.4); smoke(300, 1000, t, 4, 10, 1.2, 0.2); ground(1200);
    troop(t, { y: 1200, n: 7, s: 0.8, dir: -1, x: 1300, speed: 50, kind: 'redcoat' });
    for (let i = 0; i < 6; i++) muzzle(780 + i * 90, 990, t, ((t * 1.6 + i * 0.4) | 0) / 1.6 - i * 0.4 / 1.6 + 0.0, -1, 0.8);
    const fall = prog(t, at(0, 0.72), at(0, 0.9));
    person(320, 1200, 1.15, { face: 1, hat: 'crown', wpn: 'sword', rot: -fall * 1.45, fa: poseMix(POSE.raise, POSE.mourn, fall).fa, sh: [-0.4, -0.3] });
    ctx.restore(); slam('1772', 220, t, 0.1, 110, { until: c1 }); chip('अंग्रेज़ + अर्काट का नवाब', 540, 360, 44, prog(t, 0.6, 1.1) * (1 - flee)); }
  if (flee > 0) { ctx.save(); ctx.globalAlpha = flee;
    moon(800, 360, 60); for (let i = 0; i < 7; i++) tree(((i * 190 - t * 120) % 1400 + 1400) % 1400 - 150, 1200, 1.1 + (i % 2) * 0.2, t, i);
    ground(1200);
    rider(480, 1200, 1.15, t * 1.4, { woman: true, hat: 'none', wpn: null, fa: [1.2, -0.5], child: true });
    ctx.restore(); fgFrame(t, 'branches', flee); }
  grade(flee > 0.5 ? 'night' : 'blood', t, 0.35);
};

// ---------- EXILE ----------
S.exile = (t) => {
  const c1 = cue(1)[0], army = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.tent, noise1(t * 4), 540, 820);
  hills(900, 200, 1021, 0.35);
  for (const [x, s] of [[60, 1.1], [990, 1.0]]) tree(x, 1180, s, t, x);
  tent(220, 1180, 1.6, 0.6); tent(880, 1180, 1.3, 0.4);
  campfire(540, 1180, t, 2, 1.4);
  ground(1180);
  if (army < 1) { ctx.save(); ctx.globalAlpha = 1 - army;
    actor(380, 1180, 1.15, t, { ...VELU, ...POSE.point, ph: 1 });
    actor(700, 1180, 1.1, t, { face: -1, hat: 'turban', beard: true, cloth: '#2e6b3a', ...POSE.hold, ph: 2 });
    mapCard(t, prog(t, 0.2, 0.7), [[700, 640, 'शिवगंगा', 0, 44], [560, 420, 'डिंडीगुल', 0, -24]], prog(t, 0.6, at(0, 0.6)), { x: 520, y: 300, w: 360, h: 420 });
    ctx.restore(); slam('8 वर्ष', 220, t, 0.15, 96, { until: at(0, 0.6) }); chip('हैदर अली (मैसूर)', 700, 1250, 40, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - army)); }
  if (army > 0) { ctx.save(); ctx.globalAlpha = army;
    for (let i = 0; i < 6; i++) { const sw = pulse(t * 1.2 + i * 0.17); actor(170 + i * 150, 1180, 0.85 + (i === 2 ? 0.25 : 0), t, { ...(i === 2 ? KUYILI : { woman: true, hat: 'none', cloth: '#6a2a7a' }), ...poseMix(POSE.guard, POSE.strike, sw), wpn: 'sword', ph: i }); }
    ctx.restore(); slam('कुयिली  ·  सेनापति', 220, t, at(1, 0.3), 90); }
};

// ---------- RETURN ----------
S.return = (t) => {
  const c1 = cue(1)[0], fest = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 950 });
  bg(mixPal(PAL.battle, PAL.dusk, fest), 0, 540, 700);
  // the fort with cannons on its wall
  fortWall(t, 1180); fort(540, 850, 0.8, t);
  for (const x of [200, 420, 660, 880]) cannon(x, 850, 0.6, x < 540 ? -1 : 1, 0);
  for (const x of [300, 780]) redcoat(x, 850, 0.6, { face: x < 540 ? -1 : 1 });
  ground(1180);
  if (fest < 1) { ctx.save(); ctx.globalAlpha = 1 - fest;
    rider(150, 1240, 0.9, t, { woman: true, hat: 'none', wpn: 'sword', fa: [1.62, 0], still: true });
    ctx.restore(); slam('1780  ·  वापसी', 220, t, 0.15, 86, { until: c1 }); }
  if (fest > 0) { ctx.save(); ctx.globalAlpha = fest;
    for (let i = 0; i < 6; i++) { const x = ((i * 170 + t * 50) % 1300) - 200; actor(x, 1180, 0.9, t, { ...(i === 3 ? KUYILI : { woman: true, hat: 'none', cloth: i % 2 ? '#c0392b' : '#d4a017' }), walk: t * 4 + i, fa: [3.0, 0.1], wpn: 'basket', prop: i % 2 ? 'lantern' : null, ph: i }); }
    ctx.restore(); chip('विजयादशमी', 540, 220, 52, fest); }
};

// ---------- BLAST ----------
S.blast = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: 1.06 - 0.06 * prog(t, 0, c1), shake: hit(t, 0.1, 1.4, 40) + hit(t, 0.9, 0.7, 18) });
  bg(PAL.fire, noise1(t * 6), 540, 760);
  fortWall(t, 1180); fort(540, 850, 0.8, t);
  boom(540, 760, t, 0.1, 2.6, 13); boom(320, 820, t, 0.9, 1.2, 14); boom(780, 820, t, 1.2, 1.2, 15);
  fireRow(150, 950, 860, t, 0.7, 3, 1 - prog(t, c1, D) * 0.5);
  embers(t, 60, 12, 1, [0, 300, W, 1100]);
  ground(1180);
  if (t > 0.1) flash(1 - prog(t, 0.1, 0.6));
  if (t > c1 - 0.2) { troop(t - c1, { y: 1250, n: 9, s: 0.8, dir: 1, x: -100, speed: 260, kind: 'sword', hat: 'pagdi', banner: 3, bannerCol: '#d4a017' });
    rider(lerp(-300, 380, prog(t, c1, c1 + 1.5)), 1250, 1.05, t, { woman: true, hat: 'none', wpn: 'sword', fa: [2.85, 0.1] }); }
  slam('शिवगंगा आज़ाद!', 260, t, at(1, 0.6), 100);
};

// ---------- LEGACY ----------
S.legacy = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.dawn, 0, 540, 640);
  rays(540, 640, t, 0.08); sun(540, 640, 120, 0.8);
  ctx.fillStyle = INK; ctx.fillRect(330, 1060, 420, 120); ctx.fillRect(300, 1170, 480, 30);
  rider(560, 1060, 1.1, 0, { woman: true, hat: 'none', wpn: 'sword', fa: [2.85, 0.1], rear: 0.35, still: true });
  ground(1200);
  slam('वीरमंगई', 220, t, at(0, 0.45), 120, { until: c1 + 0.3 });
  if (t > c1) overlay(() => { const a = prog(t, c1, c1 + 0.4);
    textBlock('1780', 280, 300, 96, { font: SERIF, color: GOLD, alpha: a }); textBlock('1857', 800, 300, 96, { font: SERIF, color: CREAM, alpha: prog(t, c1 + 0.4, c1 + 0.8) });
    const w = prog(t, c1 + 0.5, c1 + 1.3); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(400, 310); ctx.lineTo(400 + 270 * w, 310); ctx.stroke(); ctx.restore();
    textBlock('77 साल पहले', 540, 420, 64, { color: '#ffd9a0', alpha: prog(t, c1 + 1.2, c1 + 1.6) }); });
};

S.end = (t) => endCard(t, 'क्या आपने कुयिली का नाम कभी पढ़ा था?');
