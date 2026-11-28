// @common2
// ---------------- video 14 - Prithviraj Chauhan ----------------
Object.assign(PAL, { day: ['#fff3cf', '#eab44c', '#5a3a0e'], battle: ['#f8e6a8', '#c9772e', '#2c1406'], night: ['#cdb0ff', '#55309a', '#0d0624'], dawn: ['#ffe2b8', '#f0906a', '#3a1244'] });   // desert gold + royal purple look
const PRITHVI = { hat: 'pagdi', moustache: true, cloth: '#c0392b' };
const GHORI = { hat: 'turban', beard: true, cloth: '#2e6b3a' };
// an archer: bow in the front hand, string pulled back by `draw` (0..1); blind = cloth over the eyes
function archer(x, y, s, t, o = {}) {
  const p = { ...(o.who || PRITHVI), fa: [1.62, 0], sh: [1.45, lerp(-0.2, -2.3, o.draw || 0)], face: o.face || 1, ph: 1, ...(o.extra || {}) };
  actor(x, y, s, t, p);
  const [hx, hy] = handAt(x, y, s, p), f = o.face || 1;
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(hx - 30 * s * f, hy, 90 * s, -0.95, 0.95); if (f < 0) { ctx.beginPath(); ctx.arc(hx + 30 * s, hy, 90 * s, Math.PI - 0.95, Math.PI + 0.95); } ctx.stroke();
  const tx = hx - 30 * s * f + Math.cos(0.95) * 90 * s * f, ty1 = hy - Math.sin(0.95) * 90 * s, ty2 = hy + Math.sin(0.95) * 90 * s, px = hx - (30 + 90 * (o.draw || 0)) * s * f;
  ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(tx, ty1); ctx.lineTo(px, hy); ctx.lineTo(tx, ty2); ctx.stroke(); ctx.restore();
  if (o.blind) inFrame(x, y, s, p, (oo) => { ctx.fillStyle = '#c8261a'; ctx.fillRect(-14, -312 + oo, 40, 12); });
  return [hx, hy];
}
function arrowFly(x0, y0, x1, y1, k) { if (k <= 0 || k >= 1) return; const x = lerp(x0, x1, k), y = lerp(y0, y1, k); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.translate(x, y); ctx.rotate(Math.atan2(y1 - y0, x1 - x0)); ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(14, 0); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(8, -7); ctx.lineTo(8, 7); ctx.fill(); ctx.restore(); }
function bell(x, y, t, ring = 0) { const a = Math.sin(t * 14) * 0.4 * ring; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, 0); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-26, 50); ctx.quadraticCurveTo(-26, 0, 0, 0); ctx.quadraticCurveTo(26, 0, 26, 50); ctx.fill(); ctx.restore(); if (ring > 0) for (let k = 0; k < 3; k++) { const p = (t * 2 + k / 3) % 1; ctx.save(); ctx.globalAlpha = ring * (1 - p); ctx.strokeStyle = '#ffe7b0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y + 30, 30 + p * 90, -2.5, -0.6); ctx.stroke(); ctx.restore(); } }

// ---------- HOOK ----------
S.hook_tarain = (t) => {
  const c1 = cue(1)[0], fall = prog(t, at(0, 0.4), at(0, 0.9));
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fx: 560, fy: 1000, shake: 3 + hit(t, at(0, 0.5), 0.6, 18) });
  bg(PAL.battle, noise1(t * 3), 600, 700); sun(800, 560, 100, 0.6);
  hills(920, 200, 1401, 0.4); dust(t, 0.35, 5); ground(1200);
  for (let i = 0; i < 3; i++) fallen(150 + i * 330, 1200, 0.6, i % 2 ? 1 : -1, i + 1);
  // the wounded sultan slides from his horse
  rider(560, 1200, 1.15, t * (1 - fall * 0.8), { hat: 'turban', wpn: null, fa: lerp(0, 1, fall) > 0.5 ? [0.3, 0.2] : [1.4, -0.2], rear: 0.25 * fall, still: fall > 0.9 });
  if (fall > 0.3) glow(540, 900, 160, '255,90,60', 0.35 * fall);
  // Rajput warriors close in, then lower their swords
  const lower = prog(t, at(1, 0.4), at(1, 0.8));
  for (const [x, f, ph] of [[220, 1, 0], [880, -1, 2], [960, -1, 3]]) actor(x, 1200, 1.0, t, { hat: 'pagdi', face: f, ...poseMix(POSE.raise, POSE.idle, lower), wpn: 'sword', ph });
  fgFrame(t, 'grass', 0.8);
  slam('1191  ·  तराइन', 220, t, 0.15, 96, { until: c1 });
  grade('blood', t, 0.25);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.08); sun(540, 860, 170, 0.95);
  hills(1100, 160, 1411, 0.6); ground(1200);
  archer(520, 1210, 1.6, t, { draw: 0.4 + 0.5 * pulse(t, 0.4) });
  title2(t, 'पृथ्वीराज चौहान', 'तराइन  ·  1191 – 1192', { y: 220, size: 108 });
  embers(t, 20, 141, 0.5);
};

// ---------- AJMER: the sound-guided arrow (legend) ----------
S.ajmer = (t) => {
  const shot = at(0, 0.72);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, 0, 540, 700);
  palace(540, 1080, 0.9); ground(1180);
  chip('अजमेर  ·  दिल्ली', 540, 220, 48, prog(t, 0.1, 0.6) * (1 - prog(t, at(0, 0.5), at(0, 0.6))));
  const ring = prog(t, at(0, 0.45), at(0, 0.5)) * (1 - prog(t, shot + 0.4, shot + 1));
  bell(860, 760, t, ring);
  const [hx, hy] = archer(320, 1180, 1.25, t, { draw: prog(t, at(0, 0.5), shot) * (1 - prog(t, shot, shot + 0.1)), blind: true });
  arrowFly(hx, hy, 860, 800, prog(t, shot, shot + 0.25));
  sparks(860, 800, t, shot + 0.25, 14, 2);
  legendTag(t, prog(t, at(0, 0.4), at(0, 0.5)));
  slam('शब्दभेदी बाण', 330, t, shot + 0.3, 96);
};

// ---------- GHORI & THE FIRST BATTLE ----------
S.ghori = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: t > c1 && t < c2 ? 5 + hit(t, c1 + 0.2, 0.6, 16) : 0 });
  bg(t < c1 ? PAL.map : PAL.battle, noise1(t * 3), 540, 700);
  if (t < c1) {
    mapCard(t, 1, [[800, 380, 'ग़ज़नी', 0, -24], [470, 860, 'तराइन', 0, 44]], prog(t, 0.4, at(0, 0.9)), { x: 160, y: 260, w: 760, h: 820 });
    rider(lerp(800, 470, prog(t, 0.4, at(0, 0.9))), lerp(380, 860, prog(t, 0.4, at(0, 0.9))) + 30, 0.3, t, { hat: 'turban', wpn: 'spear', fa: [1.9, -0.5], spearA: -1.3 });
    chip('मुहम्मद ग़ोरी', 540, 1180, 48, prog(t, 0.2, 0.7));
  } else {
    hills(900, 200, 1421, 0.4); dust(t, 0.4, 7); ground(1200);
    if (t < c2 + 0.3) { for (let i = 0; i < 3; i++) elephant(-150 + i * 260 + (t - c1) * 90, 1200, 0.7, t, i);
      for (let i = 0; i < 6; i++) actor(700 + i * 90 + (t - c1) * 140, 1200, 0.65, t, { face: 1, walk: t * 9 + i, hat: 'turban', ...POSE.reach, lean: 0.25, ph: i });
      sparks(640, 1020, t, c1 + 0.5); }
    if (t > c2 - 0.3) { const a = prog(t, c2 - 0.3, c2 + 0.2); ctx.save(); ctx.globalAlpha = a;
      rider(lerp(400, 1250, prog(t, c2 + 0.3, D)), 1200, 1.0, t * 1.5, { hat: 'turban', wpn: null, fa: [1.2, -0.4] });
      person(lerp(380, 1230, prog(t, c2 + 0.3, D)), 1040, 0.7, { rot: 1.2, hat: 'turban', fa: [0.2, 0.2], sh: [0.3, 0] });
      ctx.restore(); chip('घायल ग़ोरी भाग निकला', 540, 260, 46, a); }
    slam('पहली लड़ाई: पृथ्वीराज की जीत', 230, t, c1 + 0.3, 70, { until: c2 - 0.2 });
  }
};

// ---------- RETURN 1192 ----------
S.return = (t) => {
  const c1 = cue(1)[0], night = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)) });
  bg(mixPal(PAL.dusk, PAL.night, night), 0, 540, 700);
  hills(900, 220, 1431, 0.45); ground(1200);
  if (night < 1) { ctx.save(); ctx.globalAlpha = 1 - night;
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) rider(-200 + i * 240 + t * 40 + r * 120, 1150 + r * 60, 0.55 + r * 0.15, t, { hat: 'turban', wpn: 'spear', fa: [1.9, -0.5], spearA: -1.3, ph: i + r });
    ctx.restore(); slam('1192', 220, t, 0.15, 120, { until: c1 }); chip('पहले से बड़ी फ़ौज', 540, 360, 46, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - night)); }
  if (night > 0) { ctx.save(); ctx.globalAlpha = night; stars(t, 0.6); moon(820, 330, 45);
    for (const x of [200, 520, 840]) { tent(x, 1200, 1.4, 0.3); }
    const atk = prog(t, at(1, 0.55), D);
    for (let i = 0; i < 5; i++) rider(lerp(-300, 900, atk) - i * 150, 1240, 0.7, t * 1.6, { hat: 'turban', wpn: 'sword', fa: [2.6, 0.2], ph: i });
    ctx.restore();
    scroll(540, 520, 520, 300, prog(t, c1, c1 + 0.5) * (1 - prog(t, at(1, 0.5), at(1, 0.6))), ['संधि', '…'], {});
    stamp('भोर से पहले हमला', 540, 400, t, at(1, 0.6), { size: 70 }); grade('night', t, 0.4 * night); }
};

// ---------- THE SECOND BATTLE ----------
S.battle = (t) => {
  const c1 = cue(1)[0], cap = prog(t, c1 - 0.3, c1 + 0.5);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: cap < 1 ? 5 : 0 });
  bg(mixPal(PAL.battle, PAL.dusk2, cap), noise1(t * 3), 540, 700);
  hills(900, 200, 1441, 0.4); dust(t, 0.45 * (1 - cap), 8); ground(1200);
  if (cap < 1) { ctx.save(); ctx.globalAlpha = 1 - cap;
    for (let i = 0; i < 5; i++) { const ph = i * 1.3, k = Math.sin(t * 1.4 + ph); rider(700 + k * 260 + i * 60, 1150 + (i % 2) * 70, 0.6, t, { hat: 'turban', wpn: null, fa: [1.62, 0], face: Math.cos(t * 1.4 + ph) > 0 ? 1 : -1, ph: i }); }
    for (let i = 0; i < 6; i++) actor(80 + i * 90, 1220, 0.7, t, { hat: 'pagdi', wpn: 'sword', ...POSE.guard, ph: i });
    volley(t, 0.2, 900, 900, 260, 1000, 16, 3, 0.9, 120); volley(t, 1.4, 950, 880, 240, 990, 16, 4, 0.9, 120); volley(t, 2.6, 900, 900, 260, 1000, 16, 5, 0.9, 120);
    ctx.restore(); }
  if (cap > 0) { ctx.save(); ctx.globalAlpha = cap;
    actor(540, 1200, 1.3, t, { ...PRITHVI, ...POSE.mourn, sh: [0.4, -0.9], fa: [0.6, -1.0], lean: 0.08, ph: 1 });
    ctx.strokeStyle = '#2a1408'; ctx.lineWidth = 5; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(470, 940 + k * 22); ctx.lineTo(620, 950 + k * 22); ctx.stroke(); }
    for (const [x, f] of [[340, 1], [760, -1]]) actor(x, 1200, 1.1, t, { ...GHORI, beard: false, cloth: null, face: f, ...POSE.hold, wpn: 'spear', fa: [0.5, -1.3], ph: x });
    ctx.restore(); stamp('बंदी', 540, 400, t, at(1, 0.5), { size: 110 }); }
};

// ---------- GHAZNI (legend) ----------
S.legend = (t) => {
  const c1 = cue(1)[0], shot = at(1, 0.88);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, shot)) + bump(t, shot + 0.3, 0.5, 0.06), fy: 1000, shake: hit(t, shot + 0.3, 0.6, 16) });
  bg(PAL.court, noise1(t * 2), 540, 700);
  ctx.fillStyle = INK; ctx.fillRect(700, 820, 300, 380); ctx.fillRect(680, 810, 340, 20);   // the high throne
  actor(850, 820, 0.95, t, { ...GHORI, seated: true, face: -1, ...POSE.point, ph: 2, shadow: false });
  ground(1200);
  actor(110, 1200, 0.95, t, { hat: 'turban', beard: true, cloth: '#d4a017', ...poseMix(POSE.idle, POSE.raise, prog(t, c1, c1 + 0.5)), prop: 'book', ph: 3 });
  const [hx, hy] = archer(330, 1200, 1.2, t, { draw: prog(t, c1 + 0.3, shot) * (1 - prog(t, shot, shot + 0.1)), blind: true, extra: { lean: -0.05 } });
  arrowFly(hx, hy, 850, 560, prog(t, shot, shot + 0.3));
  if (t > shot + 0.3) flash(0.6 * (1 - prog(t, shot + 0.3, shot + 0.8)));
  legendTag(t, prog(t, 0.1, 0.5));
  chip('ग़ज़नी', 540, 300, 46, prog(t, 0.3, 0.8) * (1 - prog(t, c1 - 0.3, c1)));
  quoteCard('“चार बाँस चौबीस गज, अंगुल अष्ट प्रमाण… मत चूको चौहान!”', 330, prog(t, c1 + 0.2, c1 + 0.6) * (1 - prog(t, shot - 0.2, shot)), 52);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], st = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.map, PAL.dawn, st), 0, 540, 700);
  if (st < 1) { ctx.save(); ctx.globalAlpha = 1 - st;
    newspaper(540, 660, 780, 520, prog(t, 0.2, 0.8) * (1 - st), 'मुहम्मद ग़ोरी की मौत: 1206', 'इतिहासकारों के अनुसार, किसी और के हाथों', { masthead: 'इतिहास', size: 64 });
    ctx.restore(); }
  if (st > 0) { ctx.save(); ctx.globalAlpha = st; rays(540, 640, t, 0.08); sun(540, 640, 120, 0.8);
    ctx.fillStyle = INK; ctx.fillRect(330, 1060, 420, 120); ctx.fillRect(300, 1170, 480, 30);
    rider(560, 1060, 1.1, 0, { hat: 'pagdi', wpn: null, fa: [1.62, 0], rear: 0.3, still: true }); ground(1200);
    ctx.restore();
    scroll(540, 420, 520, 220, prog(t, at(1, 0.4), at(1, 0.4) + 0.5), ['पृथ्वीराज रासो', 'सदियों पुरानी लोककथा'], {}); }
};

S.end = (t) => endCard(t, 'ग़ोरी को छोड़ना: बड़प्पन या ग़लती?');
