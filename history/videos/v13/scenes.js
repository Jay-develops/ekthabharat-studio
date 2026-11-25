// @common2
// ---------------- video 13 - Tanaji Malusare, Sinhagad ----------------
const TANAJI = { hat: 'pagdi', moustache: true, cloth: SAFF };
const SHIVAJI = { hat: 'pagdi', beard: true, cloth: '#d4a017' };
function rope(x, y0, y1, t, sway = 1) { ctx.save(); ctx.strokeStyle = '#2a1408'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y0); ctx.quadraticCurveTo(x + Math.sin(t * 1.5) * 20 * sway, (y0 + y1) / 2, x + Math.sin(t * 1.2 + 1) * 10 * sway, y1); ctx.stroke(); ctx.restore(); }
function climber(x, y, s, t, ph = 0) { person(x, y, s, { face: 1, rot: -0.15, hat: 'pagdi', fa: [2.9 + Math.sin(t * 4 + ph) * 0.2, 0.2], sh: [2.7 - Math.sin(t * 4 + ph) * 0.2, 0.3], wpn: null }); }
function ghorpad(x, y, s, t) {   // monitor lizard climbing upward
  ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); ctx.scale(s, s); ctx.fillStyle = INK; const g = t * 6;
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 18, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(80, 0, 26, 12, 0, 0, 7); ctx.fill();
  ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-130, Math.sin(g) * 20, -180, 0); ctx.stroke();
  ctx.lineWidth = 7; for (const [lx, p] of [[-30, 0], [40, 2]]) { const a = Math.sin(g + p) * 0.6; ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + 20 + Math.cos(a) * 10, -34); ctx.moveTo(lx, 0); ctx.lineTo(lx - 20 - Math.cos(a) * 10, 34); ctx.stroke(); }
  ctx.restore();
}
function garlands(t, a = 1) { ctx.save(); ctx.globalAlpha = a; for (let k = 0; k < 3; k++) { const y = 300 + k * 60; ctx.strokeStyle = k % 2 ? '#ffb347' : '#f2a43a'; ctx.lineWidth = 10; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(-20, y); ctx.quadraticCurveTo(540, y + 120 + Math.sin(t + k) * 8, W + 20, y); ctx.stroke(); } ctx.restore(); }

// ---------- HOOK ----------
S.hook_cliff = (t) => {
  const c1 = cue(1)[0], up = prog(t, c1 - 0.3, c1 + 1.0);
  cam(t, { z: lerp(1.05, 1.15, prog(t, 0, D)), fx: 640, fy: lerp(1100, 700, up) });
  bg(PAL.night, noise1(t * 2), 640, 600); stars(t, 0.6); moon(260, 330, 60);
  ctx.save(); ctx.globalAlpha = 0.62; cliffFort(700, 1250, 1.05, t); ctx.restore(); torch(640, 1250 - 945, 60, t, 1); torch(830, 1250 - 945, 60, t, 2);
  for (let i = 0; i < 3; i++) { const x = 430 + i * 60; rope(x, 380, 1240, t); const k = ((t * 0.04 + i * 0.25) % 1); climber(x + 4, lerp(1220, 520, k) + i * 40, 0.42, t, i); }
  fog(1150, t, 0.3, 4, '30,40,60');
  slam('फ़रवरी 1670  ·  आधी रात', 220, t, 0.15, 70, { until: c1 });
  if (up > 0.5) chip('ऊपर: मुग़लों की बड़ी फ़ौज', 540, 230, 44, prog(t, c1 + 0.5, c1 + 1.0));
  fgFrame(t, 'rocks', 0.9);
  grade('night', t, 0.55);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.08); sun(540, 860, 170, 0.95);
  hills(1100, 180, 1301, 0.6); ground(1200);
  bhagwa(760, 1200, 560, t);
  actor(480, 1210, 1.9, t, { ...TANAJI, ...POSE.raise, wpn: 'sword', eye2: 0.8, ph: 1 });
  title2(t, 'तानाजी मालुसरे', 'कोंढाणा  ·  1670', { y: 220, size: 110 });
  embers(t, 25, 131, 0.6);
};

// ---------- WEDDING & THE CALL ----------
S.wedding = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(PAL.temple, 0, 540, 700);
  garlands(t);
  ctx.fillStyle = INK; ctx.fillRect(140, 700, 24, 480); ctx.fillRect(916, 700, 24, 480); ctx.fillRect(120, 690, 840, 26);   // mandap
  ground(1180);
  for (let i = 0; i < 4; i++) actor(220 + i * 110, 1180, 0.8, t, { woman: i % 2 === 0, hat: 'pagdi', cloth: ['#c0392b', '#d4a017', '#8e2a9c', '#2e8b3e'][i], ...POSE.pray, ph: i });
  const arr = prog(t, at(0, 0.55), at(0, 0.9));
  rider(lerp(1300, 860, arr), 1180, 0.9, t * (arr < 1 ? 1 : 0), { hat: 'pagdi', wpn: null, fa: [1.6, 0], still: arr >= 1 });
  const turn = prog(t, c1 - 0.2, c1 + 0.3);
  actor(660, 1180, 1.25, t, { ...TANAJI, face: turn > 0.5 ? 1 : -1, ...poseMix(POSE.pray, POSE.raise, turn), wpn: turn > 0.5 ? 'sword' : null, eye2: turn, ph: 2 });
  chip('बेटे रायबा की शादी', 540, 220, 46, prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.3, c1)));
  quoteCard('“पहले कोंढाणा का ब्याह… फिर मेरे बेटे का!”', 320, prog(t, at(1, 0.4), at(1, 0.4) + 0.4), 58);
};

// ---------- THE FORT ----------
S.fort = (t) => {
  const c1 = cue(1)[0], plan = prog(t, c1 - 0.2, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.day, PAL.map, plan * 0.4), 0, 600, 700);
  hills(1000, 200, 1311, 0.35);
  cliffFort(560, 1200, 0.95, t);
  ground(1200);
  slam('कोंढाणा', 220, t, 0.15, 110, { until: c1 });
  chip('क़िलेदार: उदयभान राठौड़', 540, 360, 44, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - plan));
  if (plan > 0) {
    ctx.save(); ctx.globalAlpha = plan; ctx.strokeStyle = '#c8261a'; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(840, 520); ctx.lineTo(940, 620); ctx.moveTo(940, 520); ctx.lineTo(840, 620); ctx.stroke();   // the front: no
    ctx.setLineDash([18, 12]); ctx.lineWidth = 8; ctx.strokeStyle = '#ffd27a'; const k = prog(t, c1 + 0.3, at(1, 0.9));
    ctx.beginPath(); ctx.moveTo(240, 1180); for (let u = 0; u <= k; u += 0.02) ctx.lineTo(240 + u * 160 + Math.sin(u * 14) * 18, 1180 - u * 720); ctx.stroke(); ctx.restore();
    chip('सबसे खड़ी चट्टान  ·  कोई पहरा नहीं', 540, 360, 44, prog(t, at(1, 0.6), at(1, 0.8)));
  }
};

// ---------- THE CLIMB (legend) ----------
S.climb = (t) => {
  cam(t, { z: 1.1, fx: 540, fy: lerp(1100, 700, prog(t, 0, D)) });
  bg(PAL.night, noise1(t * 2), 540, 500); stars(t, 0.6); moon(820, 300, 55);
  // the rock face close up
  ctx.fillStyle = 'rgba(20,9,4,0.6)'; ctx.beginPath(); ctx.moveTo(300, 1400); ctx.lineTo(330, 900); ctx.lineTo(380, 500); ctx.lineTo(420, 200); ctx.lineTo(W + 40, 160); ctx.lineTo(W + 40, 1400); ctx.fill();
  ctx.strokeStyle = 'rgba(170,190,220,0.15)'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(420 + i * 60, 300 + i * 80); ctx.lineTo(470 + i * 50, 600 + i * 60); ctx.stroke(); }
  const k = prog(t, 0.3, at(0, 0.8));
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(470, lerp(1200, 330, k), 140, '150,180,230', 0.35); ctx.restore();
  ghorpad(470, lerp(1200, 330, k), 0.9, t);
  rope(470, lerp(1200, 330, k) + 90, 1400, t, 0.5);
  if (t > at(0, 0.8)) for (let i = 0; i < 3; i++) climber(474, lerp(1350, 700, prog(t, at(0, 0.8) + i * 0.6, D + 1)) + i * 150, 0.6, t, i);
  legendTag(t, prog(t, 0.2, 0.6));
  chip('घोरपड़', 700, 600, 44, prog(t, 0.8, 1.3) * (1 - prog(t, at(0, 0.7), at(0, 0.8))));
  grade('night', t, 0.55);
};

// ---------- THE FIGHT ----------
S.fight = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  const fall = prog(t, c2, c2 + 1.2);
  cam(t, { z: lerp(1, 1.18, prog(t, c1, D)), fy: 1050, shake: 5 + hit(t, 0.2, 0.6, 20) + hit(t, at(1, 0.4), 0.4, 14) - fall * 5 });
  bg(PAL.battle, noise1(t * 4), 540, 760);
  ctx.save(); ctx.globalAlpha = 0.5; wall(860, 300); ctx.restore(); torch(150, 1180, 300, t, 1); torch(930, 1180, 300, t, 2);
  ground(1180);
  if (t < c1 + 0.3) { troop(t, { y: 1180, n: 7, s: 0.75, dir: 1, x: -100, speed: 160, kind: 'sword', hat: 'pagdi', banner: 3 });
    for (let i = 0; i < 5; i++) actor(620 + i * 110 + t * 30, 1180, 0.7, t, { face: i % 2 ? 1 : -1, walk: t * 9 + i, hat: 'turban', ...POSE.reach, lean: 0.2, ph: i });
    sparks(560, 980, t, 0.6); slam('हर हर महादेव!', 250, t, 0.15, 110, { until: c1 }); }
  if (t > c1 - 0.2) {
    const a = prog(t, c1 - 0.2, c1 + 0.3), sw = pulse(t, 1.3) * (1 - fall);
    ctx.save(); ctx.globalAlpha = a;
    actor(400, 1180, 1.3, t, { ...TANAJI, ...poseMix(POSE.guard, POSE.strike, sw), wpn: 'sword', rot: -fall * 1.3, eye2: 0.8, ph: 1 });
    actor(700, 1180, 1.3, t, { face: -1, hat: 'turban', moustache: true, cloth: '#5a2a8a', ...poseMix(POSE.strike, POSE.guard, sw), wpn: 'sword', rot: fall * 1.3, ph: 3 });
    ctx.restore();
    sparks(550, 930, t, at(1, 0.15)); sparks(560, 960, t, at(1, 0.5), 16, 4); sparks(545, 940, t, c2 - 0.2, 20, 6);
    // the broken shield
    const sh = prog(t, at(1, 0.4), at(1, 0.8)); if (sh > 0 && sh < 1) { ctx.save(); ctx.fillStyle = INK; for (let k = 0; k < 2; k++) { ctx.save(); ctx.translate(380 - k * 60 - sh * 120, 980 + sh * sh * 300); ctx.rotate(sh * 5 * (k ? -1 : 1)); ctx.beginPath(); ctx.arc(0, 0, 50, k * Math.PI, k * Math.PI + Math.PI); ctx.fill(); ctx.restore(); } ctx.restore(); }
    chip('उदयभान राठौड़', 700, 1250, 40, a * (1 - fall));
  }
  grade('blood', t, 0.2 + 0.35 * fall);
};

// ---------- THE ROPES ARE CUT ----------
S.rally = (t) => {
  const c1 = cue(1)[0], cut = at(0, 0.7), dawn = prog(t, c1, D);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: hit(t, cut, 0.4, 12) });
  bg(mixPal(PAL.battle, PAL.dawn, dawn), noise1(t * 3), 540, 700);
  ctx.save(); ctx.globalAlpha = 0.5; wall(860, 300); ctx.restore(); ground(1180);
  // the rope over the wall, cut by Suryaji
  const ropeA = 1 - prog(t, cut, cut + 0.6);
  if (ropeA > 0) { ctx.save(); ctx.globalAlpha = ropeA; rope(180, 820, lerp(1180, 1600, 1 - ropeA), t); ctx.restore(); }
  actor(260, 1180, 1.15, t, { hat: 'pagdi', moustache: true, cloth: '#d4a017', ...poseMix(POSE.raise, POSE.strike, prog(t, cut - 0.3, cut)), wpn: 'sword', ph: 2 });
  sparks(200, 840, t, cut, 12, 8);
  const back = prog(t, 0, cut), charge = prog(t, cut + 0.3, D);
  for (let i = 0; i < 6; i++) actor(500 + i * 100 + lerp(0, -120, back) + charge * 500, 1180, 0.8, t, { face: charge > 0 ? 1 : -1, walk: t * 8 + i, hat: 'pagdi', wpn: 'sword', fa: charge > 0 ? [2.6, 0.2] : [1.4, -0.2], ph: i });
  if (dawn > 0) { bhagwa(540, 860, 300 * dawn, t); rays(540, 600, t, 0.07 * dawn); }
  stamp('रस्सियाँ काट दीं', 600, 420, t, cut + 0.1, { size: 66 });
  slam('कोंढाणा जीता!', 260, t, at(1, 0.6), 100);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], name = prog(t, c2, c2 + 0.6);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, c2)), fy: 1050 });
  bg(PAL.dawn, 0, 540, 700); rays(540, 700, t, 0.06);
  cliffFort(540, 1280, 0.55, t);
  ground(1180);
  // Tanaji laid under a saffron cloth, Shivaji kneels beside him
  ctx.save(); ctx.fillStyle = SAFF; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.ellipse(420, 1160, 200, 34, 0, Math.PI, 0); ctx.fill(); ctx.restore();
  const kneel = prog(t, 0.3, at(0, 0.6));
  actor(lerp(900, 680, kneel), 1180, 1.25, t, { ...SHIVAJI, face: -1, seated: kneel > 0.9, walk: kneel < 0.9 ? t * 4 : null, ...(kneel > 0.9 ? POSE.mourn : {}), lean: kneel > 0.9 ? 0.4 : 0, ph: 1 });
  legendTag(t, prog(t, c1 - 0.2, c1 + 0.2) * (1 - prog(t, c2 - 0.3, c2)));
  quoteCard('“गड आला, पण सिंह गेला।”', 300, prog(t, at(1, 0.25), at(1, 0.25) + 0.4) * (1 - prog(t, c2 - 0.3, c2)), 74);
  if (name > 0) overlay(() => {
    textBlock('कोंढाणा', 540, 260, 96, { font: SERIF, color: CREAM, alpha: 1 - name });
    if (t > c2 + 0.2) { ctx.save(); ctx.strokeStyle = '#c8261a'; ctx.lineWidth = 10; ctx.globalAlpha = 1 - name; ctx.beginPath(); ctx.moveTo(340, 260); ctx.lineTo(740, 260); ctx.stroke(); ctx.restore(); }
  });
  slam('सिंहगढ़', 280, t, at(2, 0.55), 140);
  grade('gold', t, 0.4);
};

S.end = (t) => endCard(t, 'क्या आप कभी सिंहगढ़ क़िला गए हैं?');
