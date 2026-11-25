// @common2
// ---------------- video 22 - Rani Abbakka of Ullal ----------------
const ABBAKKA = { woman: true, hat: 'none', hat2: 'bun', cloth: '#7a3cbf' };
const PORT = { hat: 'none', hat2: 'cap', coat: true, beard: true };
function fireArrows(t, t0, x0, y0, x1, y1, n = 10, seed = 1) {   // flaming arrows in an arc
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const d = r() * 0.5, k = prog(t, t0 + d, t0 + d + 1.1); if (k <= 0 || k >= 1) continue;
    const tx = x1 + (r() - 0.5) * 220, ty = y1 + (r() - 0.5) * 80, x = lerp(x0, tx, k), y = lerp(y0, ty, k) - Math.sin(k * Math.PI) * 300;
    const dx = tx - x0, dy = (ty - y0) - Math.cos(k * Math.PI) * 300 * Math.PI;
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(dy, dx)); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(10, 0); ctx.stroke(); ctx.restore();
    glow(x, y, 26, '255,150,50', 0.9); }
}
function coastGuard(x, y, s, t) {   // modern patrol vessel
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.2) * 4); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-420, -40); ctx.lineTo(380, -40); ctx.lineTo(460, -110); ctx.lineTo(-400, -110); ctx.closePath(); ctx.fill();
  ctx.fillRect(-200, -200, 320, 90); ctx.fillRect(-120, -260, 180, 60); ctx.fillRect(-30, -340, 10, 80);
  ctx.fillStyle = 'rgba(255,214,150,0.6)'; for (let i = 0; i < 6; i++) ctx.fillRect(-180 + i * 50, -180, 30, 24);
  ctx.fillStyle = '#e06a1a'; ctx.beginPath(); ctx.moveTo(140, -110); ctx.lineTo(200, -110); ctx.lineTo(160, -40); ctx.lineTo(100, -40); ctx.fill();
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_sea = (t) => {
  const c1 = cue(1)[0], burn = prog(t, 1.6, 3.2);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 950, shake: 2 + hit(t, 1.6, 0.6, 10) });
  bg(PAL.night, noise1(t * 2), 700, 700); stars(t, 0.6); moon(220, 330, 50);
  for (const [x, s, ph] of [[700, 0.55, 0], [960, 0.45, 2]]) carrack(x, 1000, s, t, { ph, face: -1 });
  water(1000, t, 0.6);
  if (burn > 0) { flames(700, 820, 0.7 * burn, t, 3); flames(960, 850, 0.55 * burn, t, 4); smoke(800, 600, t, 5, 8, 1.2, 0.2 * burn); }
  fireArrows(t, 0.4, 100, 1150, 760, 840, 12, 1); fireArrows(t, 1.4, 100, 1150, 930, 860, 10, 2);
  ground(1200);
  if (t > c1) { const a = prog(t, c1, c1 + 0.5); ctx.save(); ctx.globalAlpha = a; actor(230, 1200, 1.3, t, { ...ABBAKKA, ...POSE.point, wpn: 'sword', ph: 1 }); ctx.restore(); glow(230, 900, 160, '255,160,80', 0.35 * a); }
  slam('अरब सागर  ·  सोलहवीं सदी', 220, t, 0.15, 72, { until: c1 });
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.sea, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  water(1100, t, 0.5); ground(1200);
  for (const x of [130, 950]) tree(x, 1200, 1.2, t, x);
  actor(540, 1210, 1.9, t, { ...ABBAKKA, ...POSE.raise, wpn: 'sword', ph: 1 });
  title2(t, 'रानी अब्बक्का', 'उल्लाल  ·  सोलहवीं सदी', { y: 220, size: 120 });
};

// ---------- ULLAL ----------
S.ullal = (t) => {
  const c1 = cue(1)[0], port = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.day, PAL.battle, port), 0, 540, 700);
  hills(900, 120, 2201, 0.3); water(980, t, 0.5);
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(200 + i * 260 + Math.sin(t + i) * 10, 960); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(0, 40, 90, 0); ctx.lineTo(70, -20); ctx.lineTo(-70, -20); ctx.fill(); ctx.fillRect(-3, -150, 6, 130); ctx.beginPath(); ctx.moveTo(3, -150); ctx.lineTo(70, -40); ctx.lineTo(3, -40); ctx.fill(); ctx.restore(); }
  ground(1180);
  for (let i = 0; i < 3; i++) { const x = 160 + i * 300; ctx.fillStyle = '#7a3a12'; ctx.beginPath(); ctx.arc(x, 1160, 40, Math.PI, 0); ctx.fill(); ctx.fillStyle = ['#c0392b', '#d4a017', '#2e8b3e'][i]; ctx.beginPath(); ctx.arc(x, 1150, 30, Math.PI, 0); ctx.fill(); }
  chip('उल्लाल  ·  मंगलौर के पास', 540, 230, 46, prog(t, 0.2, 0.6) * (1 - port));
  chip('मसाले  ·  काली मिर्च  ·  चावल', 540, 330, 42, prog(t, at(0, 0.5), at(0, 0.7)) * (1 - port));
  if (port > 0) { carrack(820, 980, 0.5 * port, t, { face: -1 }); scroll(540, 480, 520, 260, port, ['पुर्तगाली परमिट', 'और कर दो!'], {}); }
};

// ---------- SHE REFUSES ----------
S.refuse = (t) => {
  const no = at(0, 0.25);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000, shake: hit(t, no, 0.5, 12) });
  bg(PAL.court, 0, 540, 700); ctx.save(); ctx.globalAlpha = 0.45; palace(540, 1060, 0.85); ctx.restore(); ground(1180);
  actor(260, 1180, 1.0, t, { ...PORT, ...POSE.forward, prop: 'book', ph: 2 });
  actor(560, 1180, 1.3, t, { ...ABBAKKA, face: -1, ...POSE.hips, ph: 1 });
  stamp('इनकार', 540, 380, t, no, { size: 100 });
  const k = prog(t, at(0, 0.45), at(0, 0.8));
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = prog(t, at(0, 0.45) + i * 0.15, at(0, 0.45) + i * 0.15 + 0.3); actor(700 + i * 70, 1200, 0.75, t, { hat: ['pagdi', 'none', 'turban'][i % 3], face: -1, ...POSE.fist, wpn: 'spear', ph: i }); ctx.restore(); }
  chip('हिंदू  ·  जैन  ·  मुसलमान', 760, 560, 44, k);
};

// ---------- THE ATTACKS ----------
S.attack = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: 4 + hit(t, 0.6, 0.6, 16) });
  if (t < c1) { bg(PAL.sea, noise1(t * 3), 540, 700); water(1000, t, 0.6);
    const back = prog(t, at(0, 0.6), D);
    for (let i = 0; i < 3; i++) carrack(lerp(700, 1300, back) + i * 180, 990, 0.42, t, { ph: i, face: back > 0 ? 1 : -1 });
    for (let i = 0; i < 3; i++) boom(560 + i * 160, 900, t, 0.5 + i * 0.6, 0.6, i + 2);
    ground(1200); for (let i = 0; i < 5; i++) actor(80 + i * 90, 1200, 0.75, t, { hat: 'pagdi', ...POSE.fist, wpn: 'spear', ph: i });
    slam('1555', 220, t, 0.15, 120); chip('पुर्तगाली हारकर लौटे', 540, 380, 46, back); }
  else { bg(PAL.blood, noise1(t * 3), 540, 760); ctx.save(); ctx.globalAlpha = 0.55; palace(540, 1080, 0.85); ctx.restore(); fireRow(220, 860, 1000, t, 0.6, 3, 0.8); ground(1180);
    troop(t - c1, { y: 1220, n: 7, s: 0.7, dir: 1, x: 100, speed: 80, kind: 'redcoat' });
    slam('1568', 220, t, c1 + 0.1, 120); stamp('उल्लाल पर कब्ज़ा', 540, 400, t, at(1, 0.4), { size: 70 }); grade('blood', t, 0.25); }
};

// ---------- THE NIGHT RAID ----------
S.night = (t) => {
  const c1 = cue(1)[0], burn = prog(t, c1 + 0.6, D);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fy: 1000, shake: t > c1 ? 5 + hit(t, c1, 0.6, 18) : 0 });
  bg(t < c1 ? PAL.night : PAL.fire, noise1(t * 4), 540, 700); if (t < c1) { stars(t, 0.5); moon(820, 300, 45); }
  if (t < c1) { ground(1180); legendTag(t, prog(t, 0.2, 0.6));
    for (let i = 0; i < 7; i++) actor(lerp(-100, 600, prog(t, 0.3, D)) - i * 90, 1180, 0.8, t, { hat: i === 0 ? 'none' : 'pagdi', woman: i === 0, hat2: i === 0 ? 'bun' : null, walk: t * 5 + i, wpn: 'sword', ph: i, cloth: i === 0 ? ABBAKKA.cloth : null });
    for (let i = 0; i < 3; i++) tent(760 + i * 120, 1180, 0.7, 0.4); }
  else { water(1040, t, 0.6);
    for (const [x, s, ph] of [[640, 0.45, 0], [900, 0.4, 2]]) carrack(x, 1030, s, t, { ph, face: -1, tilt: 0.06 * burn });
    if (burn > 0) { flames(640, 880, 0.6 * burn, t, 7); flames(900, 900, 0.5 * burn, t, 8); embers(t, 50, 221, burn); }
    fireArrows(t, c1 + 0.1, 120, 1200, 700, 900, 14, 4);
    ground(1200); actor(220, 1200, 1.3, t, { ...ABBAKKA, ...poseMix(POSE.point, POSE.raise, pulse(t, 0.8)), wpn: 'sword', ph: 1 });
    slam('अग्निबाण!', 260, t, c1 + 0.4, 110); }
};

// ---------- BETRAYAL ----------
S.betray = (t) => {
  cam(t, { z: lerp(1.08, 1, prog(t, 0, D)) });
  bg(PAL.jail, 0, 540, 700); ctx.fillStyle = INK; ctx.fillRect(-20, 300, W + 40, 100); ground(1180);
  actor(540, 1180, 1.3, t, { ...ABBAKKA, hat2: null, ...POSE.mourn, ph: 1 });
  bars(0.85 * prog(t, 0.3, 1.0), 160, 920, 110);
  legendTag(t, prog(t, 0.2, 0.6));
  stamp('धोखा', 540, 420, t, at(0, 0.3), { size: 96 });
  grade('archival', t, 0.45);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], ship = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.dawn, PAL.sea, ship), 0, 540, 700); rays(540, 640, t, 0.08); sun(540, 640, 120, 0.85);
  if (ship < 1) { ctx.save(); ctx.globalAlpha = 1 - ship; ground(1180);
    crowd(t, { y: 1220, n: 9, s: 0.7, seed: 22, fists: 0.3, flags: 0.2, hats: ['pagdi', 'none'] });
    for (let i = 0; i < 2; i++) lamp(200 + i * 680, 1140, 1.2, t);
    ctx.restore(); chip('वीर रानी अब्बक्का उत्सव', 540, 300, 48, prog(t, 0.3, 0.8) * (1 - ship)); }
  if (ship > 0) { ctx.save(); ctx.globalAlpha = ship; water(1060, t, 0.6); coastGuard(540, 1080, 0.9, t); ctx.restore();
    chip('भारतीय तटरक्षक बल', 540, 300, 46, prog(t, c1, c1 + 0.5)); slam('ICGS रानी अब्बक्का', 420, t, at(1, 0.6), 76); }
};

S.end = (t) => endCard(t, 'क्या आपने रानी अब्बक्का का नाम सुना था?');
