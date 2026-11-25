// @common2
// ---------------- video 27 - Hemu, Panipat 1556 ----------------
const HEMU = { hat: 'pagdi', moustache: true, cloth: '#c0392b' };
function warElephant(x, y, s, t, o = {}) {   // elephant with a howdah; o.rider (actor props) or null; o.slump 0..1
  elephant(x, y, s, t * (o.still ? 0 : 1), o.ph || 0);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-90, -300, 150, 80); ctx.beginPath(); ctx.moveTo(-100, -300); ctx.quadraticCurveTo(-15, -360, 70, -300); ctx.fill();
  ctx.fillStyle = o.cloth || '#c0392b'; ctx.globalAlpha = 0.85; ctx.fillRect(-110, -230, 190, 60); ctx.restore();
  if (o.rider) actor(x - 15 * s, y - 250 * s, s * 0.62, t, { ...o.rider, seated: true, rot: -(o.slump || 0) * 0.9, shadow: false });
}
function arrowAt(x0, y0, x1, y1, k) { if (k <= 0) return; const kk = Math.min(1, k), x = lerp(x0, x1, kk), y = lerp(y0, y1, kk); ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(y1 - y0, x1 - x0)); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(10, 0); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-110, -12); ctx.lineTo(-104, 0); ctx.lineTo(-110, 12); ctx.fill(); ctx.restore(); }

// ---------- HOOK ----------
S.hook_eye = (t) => {
  const c1 = cue(1)[0], hitT = at(1, 0.45), sl = prog(t, hitT, hitT + 0.8);
  cam(t, { z: lerp(1, 1.3, prog(t, c1 - 0.5, hitT)), fx: 520, fy: lerp(1000, 820, prog(t, c1 - 0.5, hitT)), shake: 3 + hit(t, hitT, 0.6, 20) });
  bg(PAL.battle, noise1(t * 3), 540, 700); hills(930, 160, 2701, 0.4); dust(t, 0.4, 5); ground(1200);
  for (let i = 0; i < 4; i++) actor(860 + i * 80 - t * 20, 1220, 0.7, t, { hat: 'turban', face: 1, walk: t * 8 + i, ...POSE.reach, lean: 0.2, ph: i });
  warElephant(480, 1200, 1.15, t, { rider: { ...HEMU, ...POSE.raise, wpn: 'sword' }, slump: sl });
  arrowAt(1150, 520, 470, 840, prog(t, hitT - 0.5, hitT));
  if (t > hitT) { flash(0.5 * (1 - prog(t, hitT, hitT + 0.4))); grade('blood', t, 0.4 * sl); }
  slam('5 नवंबर 1556  ·  पानीपत', 220, t, 0.15, 74, { until: c1 });
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 150, 2711, 0.6); ground(1200);
  warElephant(560, 1210, 1.35, t, { rider: { ...HEMU, ...POSE.raise, wpn: 'sword' }, still: true });
  title2(t, 'हेमू', 'व्यापारी से राजा', { y: 220, size: 150 });
  embers(t, 25, 271, 0.6);
};

// ---------- TRADER TO GENERAL ----------
S.trader = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  if (t < c1) { bg(PAL.day, 0, 540, 700); ground(1180);
    for (let i = 0; i < 6; i++) { const x = 140 + i * 150; ctx.fillStyle = ['#c9a464', '#efe6d2', '#b8841a'][i % 3]; ctx.beginPath(); ctx.ellipse(x, 1150, 56, 40, 0, 0, 7); ctx.fill(); }
    actor(540, 1180, 1.2, t, { ...HEMU, cloth: '#7a5a2a', ...POSE.hold, prop: 'book', ph: 1 });
    chip('रेवाड़ी  ·  रसद और शोरा', 540, 240, 46, prog(t, 0.2, 0.6)); }
  else { bg(PAL.court, noise1(t * 2), 540, 700); ctx.save(); ctx.globalAlpha = 0.5; palace(540, 1060, 0.9); ctx.restore(); ground(1180);
    const up = prog(t, c1, c2);
    actor(540, 1180 - up * 40, 1.1 + up * 0.3, t, { ...HEMU, ...(t > c2 ? POSE.raise : POSE.pray), wpn: t > c2 ? 'sword' : null, ph: 1 });
    chip(t < c2 ? 'मंत्री' : 'सेनापति', 540, 300, 56, prog(t, c1, c1 + 0.4));
    if (t > c2) { const n = Math.min(22, Math.floor(prog(t, c2, at(2, 0.9)) * 22) + 1); overlay(() => textBlock(String(n), 860, 520, 150, { font: SERIF, color: '#ffd27a' })); legendTag(t, prog(t, c2, c2 + 0.3)); chip('लगातार जीतें', 860, 640, 40, prog(t, c2 + 0.3, c2 + 0.7)); } }
};

// ---------- DELHI ----------
S.delhi = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  if (t < c1) { bg(PAL.map, 0, 540, 700); const k = ss(prog(t, 0.2, at(0, 0.9)));
    mapCard(t, 1, [[640, 860, 'आगरा', 0, 44], [460, 420, 'दिल्ली', 0, -24]], k, { x: 160, y: 260, w: 760, h: 820 });
    warElephant(lerp(640, 460, k), lerp(860, 420, k) + 40, 0.22, t, {}); slam('1556', 220, t, 0.2, 110); }
  else { bg(PAL.temple, noise1(t * 2), 540, 700); rays(540, 700, t, 0.09);
    ctx.save(); ctx.globalAlpha = 0.6; fort(540, 1100, 0.85, t); ctx.restore(); ground(1180);
    actor(540, 1180, 1.4, t, { ...HEMU, hat: 'crown', ...POSE.raise, wpn: 'sword', ph: 1 });
    for (let i = 0; i < 4; i++) actor(120 + i * 70 + (i > 1 ? 560 : 0), 1200, 0.75, t, { hat: 'pagdi', face: i > 1 ? -1 : 1, ...POSE.pray, ph: i });
    slam('राजा विक्रमादित्य', 260, t, at(1, 0.55), 100); chip('पुराना क़िला, दिल्ली', 540, 400, 44, prog(t, c1 + 0.2, c1 + 0.6)); }
};

// ---------- PANIPAT ----------
S.panipat = (t) => {
  const c1 = cue(1)[0], push = prog(t, c1, D);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: 5 });
  bg(PAL.battle, noise1(t * 4), 540, 700); hills(920, 180, 2721, 0.4); dust(t, 0.45, 7); ground(1200);
  for (let i = 0; i < 6; i++) rider(700 + i * 100 + push * 300, 1210 + (i % 2) * 30, 0.6, t, { hat: 'turban', wpn: 'spear', fa: [1.9, -0.5], spearA: -1.3, ph: i, face: push > 0.3 ? 1 : -1 });
  warElephant(lerp(200, 380, push), 1210, 0.9, t, { rider: { ...HEMU, ...POSE.raise, wpn: 'sword' } });
  for (let i = 0; i < 2; i++) warElephant(lerp(-80, 100, push) - i * 140, 1240, 0.6, t, { ph: i + 1 });
  chip('अकबर (13 वर्ष)  ·  बैरम ख़ान', 760, 300, 42, prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.3, c1)));
  if (t > c1) chip('हाथी: हवाई', 380, 740, 42, prog(t, c1, c1 + 0.4));
  slam('मुग़ल पीछे हटे', 260, t, at(1, 0.6), 90);
};

// ---------- THE ARROW ----------
S.arrow = (t) => {
  const c1 = cue(1)[0], hitT = at(0, 0.12), sl = prog(t, hitT, hitT + 0.9), flee = prog(t, at(0, 0.6), D);
  cam(t, { z: lerp(1.25, 1, prog(t, 0, at(0, 0.6))), fx: 480, fy: lerp(820, 1000, prog(t, 0, at(0, 0.6))), shake: hit(t, hitT, 0.5, 18) });
  bg(mixPal(PAL.battle, PAL.dusk2, flee), noise1(t * 3), 540, 700); hills(930, 160, 2731, 0.4); ground(1200);
  warElephant(480, 1200, 1.15, t, { rider: { ...HEMU, fa: [0.4, 0.4], sh: [-0.4, -0.3] }, slump: sl, still: sl > 0.9 });
  if (flee > 0) for (let i = 0; i < 6; i++) actor(lerp(300, -200, flee) - i * 90 + 600 * (i % 2), 1230, 0.7, t, { hat: 'pagdi', face: -1, walk: t * 9 + i, ...POSE.reach, lean: 0.2, ph: i });
  if (t > c1) slam('जीत → हार', 260, t, at(1, 0.2), 110);
  grade('blood', t, 0.25 + 0.2 * flee);
};

// ---------- TWIST ----------
S.twist = (t) => {
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)) });
  bg(PAL.dusk2, 0, 540, 760); sun(540, 860, 140, 0.8); hills(1000, 120, 2741, 0.45); ground(1200);
  warElephant(560, 1200, 1.1, t, { still: true });
  arrowAt(1000, 560, 640, 760, 1);
  slam('एक तीर', 260, t, at(0, 0.45), 120);
  chip('…और बदल गया इतिहास', 540, 420, 50, prog(t, at(0, 0.7), at(0, 0.85)));
};

S.end = (t) => endCard(t, 'अगर वो तीर न लगता, तो क्या होता?');
