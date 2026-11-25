// @common2
// ---------------- video 24 - Harihara & Bukka, founding Vijayanagara ----------------
const HARIHARA = { hat: 'pagdi', moustache: true, cloth: '#d4a017' };
const BUKKA = { hat: 'pagdi', moustache: true, beard: true, cloth: '#c0392b' };
const SAGE = { hat: 'none', hat2: 'bun', beard: true, cloth: SAFF };
function hare(x, y, s, t, face = 1, run = 1) {
  const g = t * 14, hop = Math.abs(Math.sin(g)) * 30 * run;
  ctx.save(); ctx.translate(x, y - hop * s); ctx.scale(s * face, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.ellipse(0, -40, 60, 34, -0.15 * run * Math.sin(g), 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(56, -70, 24, 20, 0, 0, 7); ctx.fill();
  for (const a of [-0.3, 0.1]) { ctx.save(); ctx.translate(52, -86); ctx.rotate(a - 0.4); ctx.beginPath(); ctx.ellipse(0, -36, 9, 36, 0, 0, 7); ctx.fill(); ctx.restore(); }
  ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-60 - 20 * Math.sin(g) * run, 0); ctx.moveTo(30, -20); ctx.lineTo(50 + 20 * Math.sin(g) * run, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(-60, -50, 12, 0, 7); ctx.fill(); ctx.restore();
}
function dog(x, y, s, t, face = 1, run = 1, ph = 0) {
  const g = t * 13 + ph;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s); ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(0, -70, 80, 26, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(60, -80); ctx.lineTo(100, -120); ctx.lineTo(140, -110); ctx.lineTo(150, -96); ctx.lineTo(110, -86); ctx.fill();
  ctx.beginPath(); ctx.moveTo(98, -118); ctx.lineTo(100, -146); ctx.lineTo(114, -118); ctx.fill();
  ctx.lineWidth = 10; for (const [lx, p] of [[-55, 0], [-40, 1.5], [45, 3], [60, 4.5]]) { const a = Math.sin(g + p) * 0.6 * run; ctx.beginPath(); ctx.moveTo(lx, -60); ctx.lineTo(lx + Math.sin(a) * 40, 0); ctx.stroke(); }
  ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-76, -76); ctx.quadraticCurveTo(-120, -110 + Math.sin(g) * 10, -130, -120); ctx.stroke();
  ctx.restore();
}
function boulders(y = 1180, a = 0.75, seed = 24) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(40,18,8,0.85)'; const r = rng(seed);
  ctx.beginPath(); for (let i = 0; i < 12; i++) { const x = r() * W, rad = 50 + r() * 110, cy = y - rad * 0.6 - (i % 3) * 50; ctx.moveTo(x + rad, cy); ctx.ellipse(x, cy, rad, rad * 0.75, 0, 0, Math.PI * 2); } ctx.fill(); ctx.restore(); }

// ---------- HOOK: the brave hare ----------
S.hook_hare = (t) => {
  const c1 = cue(1)[0], turn = prog(t, c1 - 0.1, c1 + 0.3), chase = prog(t, c1 + 0.3, D);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fy: 1050, shake: hit(t, c1 + 0.3, 0.5, 12) });
  bg(PAL.day, 0, 540, 700); hills(920, 180, 2401, 0.35); water(1040, t, 0.45);
  boulders(1100, 0.5); ground(1180);
  const hx = t < c1 ? lerp(200, 760, prog(t, 0, c1)) : lerp(760, 520, chase);
  hare(hx, 1180, 1.15, t, turn > 0.5 ? -1 : 1);
  for (let i = 0; i < 2; i++) { const dx = t < c1 ? hx - 260 - i * 180 : lerp(hx - 260, -60, chase) - i * 180; dog(dx, 1180, 1.0, t, chase > 0 ? -1 : 1, 1, i * 2); }
  if (turn > 0 && turn < 1) glow(hx, 1120, 140, '255,230,170', Math.sin(turn * Math.PI) * 0.7);
  slam('तुंगभद्रा का किनारा', 220, t, 0.15, 80, { until: c1 });
  if (t > c1) slam('खरगोश पलटा!', 260, t, c1 + 0.3, 100);
  fgFrame(t, 'grass', 0.8);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.temple, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  boulders(1210, 0.8); ground(1200);
  actor(380, 1210, 1.7, t, { ...HARIHARA, ...POSE.raise, wpn: 'sword', ph: 1 });
  actor(700, 1210, 1.7, t, { ...BUKKA, face: -1, ...POSE.raise, wpn: 'sword', ph: 2 });
  title2(t, 'हरिहर और बुक्का', 'विजयनगर  ·  1336', { y: 220, size: 108 });
};

// ---------- CAPTIVES ----------
S.captive = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: t < c1 ? 3 : 0 });
  if (t < c1) { bg(PAL.map, 0, 540, 700);
    const k = ss(prog(t, 0.3, at(0, 0.9)));
    mapCard(t, 1, [[420, 360, 'दिल्ली', 0, -24], [470, 900, 'कम्पिली', 0, 44]], k, { x: 160, y: 260, w: 760, h: 820 });
    for (let i = 0; i < 3; i++) rider(lerp(420, 470, k) + i * 40, lerp(360, 900, k) + 30 - i * 20, 0.25, t, { hat: 'turban', wpn: 'spear', fa: [1.9, -0.5], spearA: -1.3, ph: i });
    chip('मुहम्मद बिन तुग़लक़', 540, 1180, 46, prog(t, 0.3, 0.8)); }
  else { bg(PAL.blood, noise1(t * 3), 540, 760); ctx.save(); ctx.globalAlpha = 0.55; fort(540, 1100, 0.75, t); ctx.restore(); fireRow(260, 820, 980, t, 0.6, 3, 0.8); ground(1180);
    legendTag(t, prog(t, c1 + 0.3, c1 + 0.7));
    const k = prog(t, at(1, 0.5), D);
    for (const [x, P] of [[440, HARIHARA], [560, BUKKA]]) actor(x - k * 300, 1180, 1.05, t, { ...P, hat: 'none', walk: k > 0 ? t * 3 : null, fa: [1.4, 1.6], sh: [-1.2, -1.6], ph: x });
    ctx.strokeStyle = '#2a1408'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(470 - k * 300, 1000); ctx.lineTo(590 - k * 300, 1000); ctx.stroke();
    for (const x of [300, 740]) actor(x - k * 300, 1180, 1.0, t, { hat: 'turban', face: -1, walk: k > 0 ? t * 3 : null, wpn: 'spear', fa: [0.5, -1.3], ph: x });
    chip('→ दिल्ली', 540, 360, 50, k); grade('blood', t, 0.25); }
};

// ---------- SENT BACK ----------
S.back = (t) => {
  const plot = prog(t, at(0, 0.6), at(0, 0.8));
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(mixPal(PAL.court, PAL.dusk2, plot), 0, 540, 700); boulders(1180, 0.5); ground(1180);
  actor(380, 1180, 1.2, t, { ...HARIHARA, hat: 'turban', cloth: null, ...poseMix(POSE.idle, POSE.fist, plot), ph: 1 });
  actor(660, 1180, 1.2, t, { ...BUKKA, hat: 'turban', cloth: null, face: -1, ...poseMix(POSE.idle, POSE.point, plot), ph: 2 });
  chip('सुल्तान के सूबेदार?', 540, 300, 48, prog(t, 0.3, 0.8) * (1 - plot));
  if (plot > 0) { stamp('इरादा कुछ और', 540, 380, t, at(0, 0.7), { size: 76 }); glow(520, 900, 200, '255,180,90', 0.3 * plot); }
};

// ---------- THE SAGE ----------
S.sage = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.dawn, noise1(t * 2), 540, 700); rays(540, 700, t, 0.07); boulders(1180, 0.55); ground(1180);
  actor(540, 1180, 1.1, t, { ...SAGE, seated: true, ...POSE.pray, prop: 'kamandal', ph: 1 });
  glow(540, 900, 220, '255,230,170', 0.35);
  for (const [x, P, f] of [[250, HARIHARA, 1], [830, BUKKA, -1]]) actor(x, 1180, 1.1, t, { ...P, face: f, ...POSE.pray, ph: x });
  legendTag(t, prog(t, 0.1, 0.5));
  chip('संत विद्यारण्य', 540, 1240, 40, prog(t, 0.3, 0.8));
  if (t > c1) { overlay(() => { const a = prog(t, c1, c1 + 0.5); ctx.save(); ctx.globalAlpha = a * 0.9; ctx.fillStyle = 'rgba(255,232,190,0.9)'; ctx.beginPath(); ctx.arc(540, 520, 170, 0, 7); ctx.fill(); ctx.restore(); hare(560, 590, 0.8, t, -1, 0.4); });
    slam('वीरों की धरती', 300, t, at(1, 0.6), 100); }
};

// ---------- THE CITY OF VICTORY ----------
S.found = (t) => {
  const rise = ss(prog(t, 0.3, at(0, 0.8)));
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: hit(t, 0, 0.5, 10) });
  bg(PAL.temple, noise1(t * 2), 540, 760); rays(540, 760, t, 0.08 * rise); sun(540, 760, 140, 0.8);
  water(1080, t, 0.4);
  ctx.save(); ctx.translate(0, (1 - rise) * 500); gopuram(300, 1080, 0.55); gopuram(800, 1080, 0.45, { tiers: 5 }); temple(560, 1080, 0.6); ctx.restore();
  boulders(1180, 0.7); ground(1180);
  slam('1336', 220, t, 0.2, 130);
  slam('विजयनगर', 380, t, at(0, 0.6), 120);
  chip('जीत का शहर', 540, 500, 48, prog(t, at(0, 0.8), at(0, 0.95)));
};

// ---------- GROWTH: Kumara Kampana & Gangadevi ----------
S.grow = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)), shake: t < c1 ? 3 : 0 });
  if (t < c1) { bg(PAL.map, 0, 540, 700);
    const k = ss(prog(t, 0.2, at(0, 0.9)));
    mapCard(t, 1, [[420, 480, 'विजयनगर', 0, -24], [560, 1000, 'मदुरै', 0, 44]], k, { x: 160, y: 300, w: 760, h: 820 });
    for (let i = 0; i < 4; i++) rider(lerp(420, 560, k) - i * 30, lerp(480, 1000, k) + 30 - i * 30, 0.24, t, { hat: 'pagdi', wpn: 'sword', fa: [2.6, 0.2], ph: i });
    chip('कुमार कंपण', 540, 240, 48, prog(t, 0.2, 0.6)); }
  else { bg(PAL.court, noise1(t * 2), 540, 700); ctx.save(); ctx.globalAlpha = 0.45; palace(540, 1060, 0.9); ctx.restore(); ground(1180);
    actor(420, 1180, 1.2, t, { woman: true, hat: 'none', hat2: 'mukut', cloth: '#2e8b7a', seated: true, ...POSE.hold, prop: 'book', ph: 1 });
    lamp(660, 1180, 1.2, t);
    scroll(540, 520, 560, 280, prog(t, at(1, 0.5), at(1, 0.8)), ['मधुरा विजयम', 'गंगादेवी'], {});
    chip('रानी गंगादेवी', 420, 1240, 40, prog(t, c1, c1 + 0.5)); }
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], kdr = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.map, PAL.temple, kdr), 0, 540, 700);
  if (kdr < 1) { ctx.save(); ctx.globalAlpha = 1 - kdr;
    const g = ss(prog(t, 0.2, at(0, 0.8)));
    ctx.fillStyle = 'rgba(200,110,40,0.45)'; ctx.beginPath(); ctx.ellipse(540, 820, 120 + 300 * g, 100 + 330 * g, 0.2, 0, 7); ctx.fill();
    ctx.strokeStyle = '#8a3a14'; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#5a240c'; ctx.font = `700 52px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText('विजयनगर साम्राज्य', 540, 830);
    ctx.restore(); slam('200+ साल', 240, t, at(0, 0.6), 110, { until: c1 }); }
  if (kdr > 0) { ctx.save(); ctx.globalAlpha = kdr; rays(540, 820, t, 0.09); sun(540, 820, 150, 0.9); boulders(1200, 0.7); ground(1200);
    actor(540, 1210, 1.8, t, { hat: 'none', hat2: 'mukut', moustache: true, cloth: '#d4a017', ...POSE.raise, wpn: 'sword', ph: 1 });
    ctx.restore(); chip('आगे चलकर: कृष्णदेवराय', 540, 280, 48, prog(t, c1, c1 + 0.5)); }
};

S.end = (t) => endCard(t, 'विजयनगर की कौन-सी कहानी आगे सुनें?');
