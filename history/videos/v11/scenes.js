// @common2
// ---------------- video 11 - Rajendra Chola's navy ----------------
const RAJENDRA = { hat: 'crown', cloth: '#d4a017' };
const SAIL = 'rgba(214,92,42,0.9)';
function sea(t, y = 1000, a = 0.6) { water(y, t, a); }
function vimana(x, y, s) { gopuram(x, y, s, { tiers: 11 }); }   // Brihadeeswarar-style tower
// a parchment sea map: south India, Sri Lanka, the Malay peninsula and Sumatra
function seaMap(t, a, route = 0, o = {}) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(245,227,187,0.96)'; ctx.strokeStyle = 'rgba(70,32,12,0.9)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(70, 230, 940, 880, 20); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(176,132,82,0.55)';
  ctx.beginPath(); ctx.moveTo(90, 250); ctx.lineTo(420, 250); ctx.lineTo(400, 420); ctx.lineTo(300, 640); ctx.lineTo(250, 760); ctx.lineTo(200, 620); ctx.lineTo(120, 420); ctx.lineTo(90, 330); ctx.fill();   // peninsula
  ctx.beginPath(); ctx.ellipse(300, 830, 36, 54, 0.2, 0, 7); ctx.fill();   // Sri Lanka
  ctx.beginPath(); ctx.moveTo(760, 250); ctx.lineTo(820, 250); ctx.lineTo(830, 520); ctx.lineTo(880, 700); ctx.lineTo(850, 720); ctx.lineTo(790, 560); ctx.fill();   // Malay peninsula
  ctx.beginPath(); ctx.moveTo(700, 640); ctx.lineTo(780, 700); ctx.lineTo(960, 960); ctx.lineTo(930, 1000); ctx.lineTo(740, 800); ctx.fill();   // Sumatra
  ctx.fillStyle = '#5a240c'; ctx.font = `700 34px ${SANS}`; ctx.textAlign = 'center';
  ctx.fillText('चोल राज्य', 260, 470); ctx.fillText('श्रीविजय', 890, 860); ctx.fillText('बंगाल की खाड़ी', 560, 420);
  if (o.strait) { const p = 0.5 + 0.5 * Math.sin(t * 5); ctx.strokeStyle = '#b8231a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(800, 650, 80 + p * 10, 50 + p * 6, 0.6, 0, 7); ctx.stroke(); }
  if (route > 0) { ctx.setLineDash([14, 10]); ctx.strokeStyle = '#b8231a'; ctx.lineWidth = 7; ctx.beginPath(); const P = u => [lerp(330, 800, u), 640 - Math.sin(u * Math.PI) * 140 + u * 10];
    ctx.moveTo(...P(0)); for (let u = 0; u <= route; u += 0.02) ctx.lineTo(...P(u)); ctx.stroke(); ctx.setLineDash([]); const [sx, sy] = P(route); ctx.save(); ctx.translate(sx, sy); ctx.scale(0.12, 0.12); ctx.globalAlpha = a; ctx.restore(); cholaShip(sx, sy, 0.1, t, { sailCol: SAIL }); }
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_sea = (t) => {
  const c1 = cue(1)[0], far = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, c1)), fy: 1000, shake: hit(t, 0.2, 0.5, 10) });
  bg(mixPal(PAL.night, PAL.cold, far * 0.5), noise1(t * 2), 640, 700);
  stars(t, 0.7); moon(780, 380, 80);
  if (far < 1) { ctx.save(); ctx.globalAlpha = 1 - far;
    sea(t, 980);
    for (let i = 0; i < 5; i++) cholaShip(-200 + i * 300 + t * 40 - (i % 2) * 80, 1000 + (i % 3) * 30, 0.32, t, { ph: i, sailCol: SAIL });
    cholaShip(380 + t * 25, 1180, 0.8, t, { sailCol: SAIL, flag: true });
    ctx.restore();
    slam('1025 ईस्वी', 220, t, 0.15, 110, { until: c1 }); }
  if (far > 0) { ctx.save(); ctx.globalAlpha = far;
    sea(t, 1060, 0.4);
    stupa(700, 1060, 0.55); for (let i = 0; i < 5; i++) { ctx.fillStyle = INK; ctx.fillRect(120 + i * 90, 990, 70, 70); ctx.beginPath(); ctx.moveTo(110 + i * 90, 990); ctx.lineTo(155 + i * 90, 940); ctx.lineTo(200 + i * 90, 990); ctx.fill(); }
    for (const [x, s] of [[60, 1], [980, 0.9]]) tree(x, 1060, s, t, x);
    ctx.restore(); chip('श्रीविजय  ·  हज़ारों किलोमीटर दूर', 540, 220, 44, far); }
  grade('night', t, 0.45);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.12, 1, easeOut(prog(t, 0, 1.4))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.sea, noise1(t * 2), 540, 760); rays(540, 760, t, 0.08); sun(540, 760, 170, 0.95);
  sea(t, 1000, 0.6);
  cholaShip(520, 1150, 1.15, t, { sailCol: SAIL, flag: true, crew: true });
  actor(330, 1110, 0.62, t, { ...RAJENDRA, ...POSE.point, wpn: 'sword', shadow: false });
  title2(t, 'राजेंद्र चोल', 'गंगैकोंड चोल  ·  1014 – 1044', { y: 220, size: 112 });
};

// ---------- FATHER ----------
S.father = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1050 });
  bg(PAL.temple, 0, 540, 600); rays(540, 360, t, 0.06);
  vimana(540, 1180, 0.85);
  ground(1180);
  chip('बृहदेश्वर मंदिर  ·  तंजावुर', 540, 220, 46, prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.3, c1)));
  actor(260, 1180, 1.0, t, { hat: 'crown', beard: true, ...POSE.pray, cloth: '#9a6a2a', ph: 1 });
  const walk = prog(t, c1, D);
  actor(lerp(-120, 760, walk), 1180, 1.25, t, { ...RAJENDRA, walk: walk > 0 && walk < 1 ? t * 5 : null, ...POSE.idle, wpn: 'sword', ph: 3 });
  slam('राजेंद्र', 320, t, at(1, 0.4), 110);
};

// ---------- GANGA ----------
S.ganga = (t) => {
  const c1 = cue(1)[0], cap = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.day, PAL.temple, cap), 0, 540, 700);
  if (cap < 1) { ctx.save(); ctx.globalAlpha = 1 - cap;
    hills(900, 260, 1101, 0.35); dust(t, 0.25, 3); ground(1200);
    troop(t, { y: 1200, n: 9, s: 0.75, dir: 1, x: 100, speed: 70, kind: 'spear', hat: 'pagdi', banner: 3, bannerCol: '#d4552a' });
    mapCard(t, prog(t, 0.2, 0.7), [[640, 690, 'तंजावुर', 0, 44], [690, 380, 'गंगा', 0, -24]], prog(t, 0.6, at(0, 0.7)), { x: 520, y: 300, w: 360, h: 460 });
    // the pot of Ganga water
    const pot = prog(t, at(0, 0.7), at(0, 0.9));
    if (pot > 0) { glow(300, 760, 200, '200,230,255', 0.6 * pot); ctx.fillStyle = '#b5762e'; ctx.beginPath(); ctx.ellipse(300, 800, 70 * pot, 60 * pot, 0, 0, 7); ctx.fill(); ctx.fillRect(270, 730, 60 * pot, 30); }
    ctx.restore(); }
  if (cap > 0) { ctx.save(); ctx.globalAlpha = cap;
    vimana(540, 1180, 0.8); for (const [x, s] of [[90, 1.0], [990, 1.0]]) tree(x, 1180, s, t, x); ground(1180);
    ctx.restore();
    slam('गंगैकोंड चोल', 220, t, c1 + 0.1, 110);
    chip('नई राजधानी: गंगैकोंड चोलपुरम', 540, 360, 44, prog(t, at(1, 0.6), at(1, 0.6) + 0.5)); }
};

// ---------- SRIVIJAYA ----------
S.srivijaya = (t) => {
  const c1 = cue(1)[0], board = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.map, PAL.sea, board), 0, 540, 700);
  if (board < 1) { ctx.save(); ctx.globalAlpha = 1 - board;
    seaMap(t, 1, 0, { strait: t > at(0, 0.5) });
    ctx.restore();
    chip('व्यापार का रास्ता बंद', 540, 1180, 46, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - board), { color: '#ff9c7a' }); }
  if (board > 0) { ctx.save(); ctx.globalAlpha = board;
    sea(t, 1060, 0.5);
    cholaShip(560, 1150, 1.0, t, { sailCol: SAIL, flag: true });
    ctx.fillStyle = INK; ctx.fillRect(-40, 1040, 260, 30); ctx.fillRect(-40, 1070, 300, 200);   // the jetty
    troop(t, { y: 1060, n: 6, s: 0.6, dir: 1, x: -150, speed: 90, kind: 'spear', hat: 'pagdi' });
    cholaShip(1000, 1010, 0.5, t, { sailCol: SAIL, ph: 2 });
    ctx.restore();
    slam('पूरी सेना, समंदर पर', 230, t, at(1, 0.5), 80); }
};

// ---------- ATTACK ----------
S.attack = (t) => {
  const c1 = cue(1)[0], won = prog(t, c1 - 0.2, c1 + 0.4);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, c1)), shake: won < 1 ? 5 + hit(t, at(0, 0.4), 0.6, 18) : 0 });
  bg(mixPal(PAL.fire, PAL.dawn, won), noise1(t * 4), 540, 700);
  if (won < 1) { ctx.save(); ctx.globalAlpha = 1 - won;
    // the enemy port burns as the fleet closes in
    sea(t, 1040, 0.5);
    stupa(820, 1000, 0.45); for (let i = 0; i < 4; i++) { ctx.fillStyle = INK; ctx.fillRect(560 + i * 110, 930, 80, 80); }
    boom(640, 960, t, at(0, 0.4), 1.0, 3); boom(900, 940, t, at(0, 0.7), 0.9, 4); fireRow(560, 980, 1000, t, 0.5, 6, prog(t, at(0, 0.4), at(0, 0.6)));
    for (let i = 0; i < 3; i++) cholaShip(-150 + i * 210 + t * 30, 1120 + i * 20, 0.5 + i * 0.1, t, { sailCol: SAIL, ph: i });
    volley(t, 0.3, 200, 900, 760, 980, 14, 3, 1.0, 180); volley(t, 1.6, 220, 880, 800, 970, 14, 4, 1.0, 180);
    ctx.restore(); slam('हमला!', 230, t, 0.1, 120, { until: c1 }); }
  if (won > 0) { ctx.save(); ctx.globalAlpha = won;
    ground(1180); palace(700, 1100, 0.6);
    actor(330, 1180, 1.3, t, { ...RAJENDRA, ...POSE.point, wpn: 'sword', eye2: 0.8, ph: 1 });
    actor(700, 1180, 1.0, t, { face: -1, hat: 'crown', seated: true, ...POSE.pray, lean: 0.4, ph: 2 });
    ctx.restore();
    stamp('कडारम (केदाह)  ·  विजय', 540, 360, t, at(1, 0.45), { size: 70 }); }
};

// ---------- LEGACY ----------
S.legacy = (t) => {
  cam(t, { z: lerp(1, 1.05, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  seaMap(t, 1, ss(prog(t, 0.3, D - 0.5)));
  chip('समुद्री व्यापार फिर खुला', 540, 1180, 46, prog(t, at(0, 0.5), at(0, 0.8)));
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], unesco = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.sea, PAL.temple, unesco), 0, 540, 700);
  if (unesco < 1) { ctx.save(); ctx.globalAlpha = 1 - unesco;
    for (const [x, s] of [[80, 1.1], [990, 1.0]]) tree(x, 1180, s, t, x); ground(1180);
    // a weathered stone slab with carved lines
    ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(380, 1180); ctx.lineTo(370, 620); ctx.quadraticCurveTo(540, 540, 710, 620); ctx.lineTo(700, 1180); ctx.fill();
    ctx.strokeStyle = 'rgba(255,214,150,0.5)'; ctx.lineWidth = 4; const r = rng(7);
    for (let k = 0; k < 9; k++) { const y = 680 + k * 52, w = prog(t, 0.3 + k * 0.25, 0.6 + k * 0.25); ctx.beginPath(); ctx.moveTo(410, y); for (let x = 410; x < 410 + 260 * w; x += 18) ctx.lineTo(x + 9, y + (r() - 0.5) * 18); ctx.stroke(); }
    ctx.restore(); chip('सुमात्रा  ·  तमिल व्यापारियों का शिलालेख, 1088', 540, 220, 40, (1 - unesco) * prog(t, 0.2, 0.7)); }
  if (unesco > 0) { ctx.save(); ctx.globalAlpha = unesco; rays(540, 400, t, 0.07); vimana(540, 1180, 0.8); ground(1180); ctx.restore();
    slam('यूनेस्को विश्व धरोहर', 230, t, at(1, 0.45), 84); }
};

S.end = (t) => endCard(t, 'हज़ार साल पहले की ये नौसेना… क्या आप जानते थे?');
