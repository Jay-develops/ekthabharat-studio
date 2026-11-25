// @common2
// ---------------- video 07 - Adi Shankaracharya ----------------
// a crocodile in the water, jaw open by `jaw` (0..1); face 1 = head to the right
function croc(x, y, s, t, jaw = 0.4, face = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s); ctx.fillStyle = INK;
  const sw = Math.sin(t * 3) * 10;
  ctx.beginPath(); ctx.moveTo(-420, 10 + sw); ctx.quadraticCurveTo(-250, -40, -60, -46); ctx.lineTo(120, -40); ctx.lineTo(120, 20); ctx.quadraticCurveTo(-200, 30, -420, 10 + sw); ctx.fill();
  for (let i = 0; i < 12; i++) { const bx = -300 + i * 34; ctx.beginPath(); ctx.moveTo(bx, -40 + i * 0.6); ctx.lineTo(bx + 12, -62); ctx.lineTo(bx + 24, -42); ctx.fill(); }
  ctx.save(); ctx.translate(110, -18); ctx.rotate(-0.55 * jaw);   // upper jaw
  ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(230, -8); ctx.quadraticCurveTo(250, 0, 230, 6); ctx.lineTo(0, 10); ctx.fill();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(40, -16, 7, 0, 7); ctx.fill(); ctx.fillStyle = INK;
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(30 + i * 22, 6); ctx.lineTo(38 + i * 22, 20); ctx.lineTo(46 + i * 22, 6); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.translate(110, 0); ctx.rotate(0.3 * jaw);    // lower jaw
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(220, 4); ctx.quadraticCurveTo(232, 12, 214, 18); ctx.lineTo(0, 24); ctx.fill();
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(30 + i * 22, 2); ctx.lineTo(38 + i * 22, -12); ctx.lineTo(46 + i * 22, 2); ctx.fill(); }
  ctx.restore(); ctx.restore();
}
function splash(x, y, t, t0, s = 1) {
  const k = (t - t0) / 0.9; if (k < 0 || k > 1) return;
  const r = rng(Math.round(t0 * 10)); ctx.save(); ctx.fillStyle = 'rgba(255,225,180,0.85)';
  for (let i = 0; i < 16; i++) { const a = -Math.PI * (0.15 + r() * 0.7), v = (180 + r() * 260) * s; const px = x + Math.cos(a) * v * k, py = y + Math.sin(a) * v * k + 500 * s * k * k;
    ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(px, py, (4 + r() * 6) * s, 0, 7); ctx.fill(); }
  ctx.restore();
}
function riverBank(t, y = 1020) {
  hills(y - 60, 160, 701, 0.35);
  for (const [x, s, sd] of [[70, 1.05, 1], [190, 0.8, 2], [960, 1.1, 3], [1050, 0.8, 4]]) tree(x, y + 20, s, t, sd);
  water(y, t, 0.6);
}
function hut(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-110, -130, 220, 130); ctx.beginPath(); ctx.moveTo(-150, -120); ctx.quadraticCurveTo(0, -300, 150, -120); ctx.fill();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(-30, -80); ctx.quadraticCurveTo(0, -110, 30, -80); ctx.lineTo(30, 0); ctx.fill();
  ctx.restore();
}
const SANNYASI = { hat: 'none', hat2: 'shikha', cloth: SAFF };

// ---------- HOOK ----------
S.hook_croc = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.18, prog(t, 0, D)), fy: 1050, shake: hit(t, 0.35, 0.6, 16) + hit(t, c1, 0.8, 20) + (t > c1 ? 2 : 0) });
  bg(PAL.blood, noise1(t * 3), 700, 700);
  sun(760, 560, 110, 0.7);
  riverBank(t, 1020);
  // mother on the left bank, arms out
  actor(170, 1040, 1.15, t, { woman: true, face: 1, ...poseMix(POSE.reach, POSE.raise, pulse(t, 0.8) * prog(t, c1, c1 + 0.5)), cloth: '#b02818', lean: 0.15, ph: 1 });
  // the boy in the water, struggling, arm up
  const jerk = Math.sin(t * 7) * 0.08;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 1085); ctx.clip();
  actor(560, 1300, 1.45, t, { face: -1, hat: 'none', hat2: 'shikha', ...poseMix(POSE.raise, POSE.reach, pulse(t, 1.4)), lean: -0.15 + jerk, eye2: 1, shadow: false });
  ctx.restore();
  croc(720, 1110, 1.05, t, 0.15 + 0.1 * pulse(t, 2), -1);
  splash(600, 1080, t, 0.3, 1.4); splash(560, 1080, t, c1 + 0.1, 1.6); splash(660, 1080, t, c1 + 1.4, 1.1);
  water(1060, t + 3, 0.35);
  fgFrame(t, 'grass', 0.9);
  slam('पूर्णा नदी  ·  केरल', 220, t, 0.2, 70, { from: 1.5, until: c1 });
  grade('blood', t, 0.25 + 0.25 * prog(t, c1, c1 + 0.4));
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.08, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.temple, 0, 540, 820);
  rays(540, 820, t, 0.07);
  sun(540, 820, 170, 0.95);
  hills(1010, 220, 711, 0.45); hills(1060, 140, 712, 0.7);
  ground(1180);
  // the young sannyasi walks along the ridge, staff in hand, footprints behind
  const x = lerp(260, 600, prog(t, 0, D));
  for (let i = 1; i < 8; i++) { const fx = x - i * 60; if (fx > 0) { ctx.save(); ctx.globalAlpha = 0.35 * (1 - i / 8); ctx.fillStyle = '#ffd9a0'; ctx.beginPath(); ctx.ellipse(fx, 1186 + (i % 2) * 6, 12, 4, 0, 0, 7); ctx.fill(); ctx.restore(); } }
  actor(x, 1182, 1.25, t, { ...SANNYASI, walk: t * 3.5, fa: [0.7, -0.6], prop: 'staff', ph: 2 });
  title2(t, 'आदि शंकराचार्य', 'कालड़ी से केदारनाथ तक', { y: 230 });
  embers(t, 20, 71, 0.5);
};

// ---------- KALADI ----------
S.kaladi = (t) => {
  const n0 = at(0, 0.5), c2 = cue(1)[0];
  const night = prog(t, n0 - 0.3, n0 + 0.5);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fx: 540, fy: 1050 });
  bg(mixPal(PAL.day, PAL.tent, night), 0, 540, 760);
  if (night < 1) { ctx.save(); ctx.globalAlpha = 1 - night; sun(780, 520, 90, 0.8); birds(t, 100, 380, 5, 7); ctx.restore(); }
  hills(960, 240, 721, 0.3);
  for (const [x, s, sd] of [[60, 1.1, 5], [980, 1.0, 6], [880, 0.75, 7]]) tree(x, 1150, s, t, sd);
  hut(330, 1150, 1.1); hut(760, 1150, 0.8);
  ground(1150);
  slam('केरल  ·  कालड़ी', 230, t, 0.2, 86, { until: n0 });
  // line 2: the boy seated with a palm-leaf manuscript by the lamp
  if (night > 0) {
    ctx.save(); ctx.globalAlpha = night; lamp(640, 1150, 0.9, t);
    actor(520, 1150, 1.0, t, { seated: true, hat: 'none', hat2: 'shikha', fa: [1.3, -0.9], sh: [0.9, -1.2], prop: 'book', eye2: 0.8 });
    ctx.restore();
    slam('8 वर्ष  ·  वेद कंठस्थ', 230, t, n0 + 0.4, 70, { until: c2 });
  }
  // line 3: the mother shakes her head, the boy looks at the road
  if (t > c2) {
    const no = Math.sin((t - c2) * 6) * 0.06 * (1 - prog(t, c2 + 2, c2 + 3));
    actor(820, 1150, 1.0, t, { woman: true, face: -1, lean: no, ...POSE.hips, cloth: '#b02818', ph: 1 });
    quoteCard('“संन्यास? नहीं!”', 300, prog(t, at(1, 0.6), at(1, 0.6) + 0.4), 62);
  }
  fgFrame(t, 'branches', 0.85);
};

// ---------- CROCODILE (legend) ----------
S.croc = (t) => {
  const c0 = cue(0)[0], c1 = cue(1)[0], c2 = cue(2)[0];
  const free = prog(t, at(1, 0.55), at(1, 0.85));
  cam(t, { z: lerp(1.15, 1.0, prog(t, c2 - 0.5, c2 + 1)), fy: 1080, shake: hit(t, at(0, 0.6), 0.7, 22) });
  bg(mixPal(PAL.blood, PAL.dawn, prog(t, c1, c2)), noise1(t * 3), 640, 700);
  riverBank(t, 1020);
  legendTag(t, prog(t, 0.1, 0.5) * (1 - prog(t, c2 - 0.5, c2)));
  if (t < c2 + 0.3) {
    const a = 1 - prog(t, c2 - 0.2, c2 + 0.3);
    ctx.save(); ctx.globalAlpha = a;
    const grab = prog(t, at(0, 0.55), at(0, 0.62));
    croc(lerp(1000, 720, prog(t, c0, at(0, 0.6))) + free * 340, 1110 + free * 90, 1.05, t, grab < 1 ? 0.8 - grab * 0.65 : 0.15 + 0.6 * free, -1);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 1085 + free * 60); ctx.clip();
    actor(560, lerp(1300, 1160, free), 1.45, t, { face: -1, hat: 'none', hat2: 'shikha', ...poseMix(POSE.raise, POSE.idle, free), lean: Math.sin(t * 7) * 0.07 * (1 - free), shadow: false });
    ctx.restore();
    splash(600, 1080, t, at(0, 0.6), 1.3); splash(700, 1080, t, at(1, 0.6), 1);
    actor(170, 1040, 1.15, t, { woman: true, ...poseMix(POSE.reach, POSE.pray, prog(t, c1, c1 + 0.6)), cloth: '#b02818', lean: lerp(0.15, 0.3, prog(t, c1, c1 + 0.6)), ph: 1 });
    ctx.restore();
  }
  // line 3: farewell on the bank at dawn
  if (t > c2 - 0.2) {
    const a = prog(t, c2 - 0.2, c2 + 0.3);
    ctx.save(); ctx.globalAlpha = a; ground(1150);
    const go = prog(t, at(2, 0.6), D);
    actor(380, 1150, 1.0, t, { woman: true, ...poseMix(POSE.pray, POSE.wave, prog(t, at(2, 0.5), at(2, 0.7))), cloth: '#b02818', ph: 1 });
    actor(lerp(560, 900, go), 1150, 1.05, t, { ...SANNYASI, face: go > 0.02 ? 1 : -1, walk: go > 0.02 && go < 1 ? t * 4 : null, ...(go > 0.02 ? {} : POSE.pray), prop: 'staff' });
    ctx.restore();
    quoteCard('“माँ, आख़िरी समय में मैं ज़रूर आऊँगा।”', 320, prog(t, at(2, 0.2), at(2, 0.2) + 0.4) * (1 - prog(t, D - 0.6, D - 0.2)), 54);
  }
  fgFrame(t, 'grass', 0.9);
};

// ---------- JOURNEY ----------
S.journey = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: 1.02 });
  bg(PAL.day, 0, 540, 700);
  sun(lerp(860, 220, prog(t, 0, D)), 560, 80, 0.8);
  // parallax landscape scrolling past while he walks
  const sp = t * 90;
  ctx.save(); ctx.translate(-(sp * 0.2) % 400, 0); hills(900, 300, 731, 0.25); ctx.restore();
  ctx.save(); ctx.translate(-(sp * 0.5) % 600, 0); hills(980, 200, 732, 0.45); ctx.restore();
  for (let i = 0; i < 6; i++) { const x = ((i * 260 - sp) % 1560 + 1560) % 1560 - 240; tree(x, 1160, 0.8 + (i % 3) * 0.15, t, i); }
  ground(1160);
  actor(470, 1162, 1.1, t, { ...SANNYASI, walk: t * 5, fa: [0.7, -0.6], prop: 'staff', ph: 2 });
  // route card
  const ma = prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.4, c1));
  mapCard(t, ma, [[700, 700, 'कालड़ी', 0, 44], [760, 420, 'नर्मदा तट', 0, -24]], prog(t, 0.6, at(0, 0.8)), { x: 560, y: 300, w: 380, h: 480 });
  // line 2: manuscripts glow and stack up
  const b = prog(t, c1, c1 + 0.6);
  if (b > 0) {
    for (let i = 0; i < 5; i++) { const k = prog(t, c1 + i * 0.35, c1 + i * 0.35 + 0.4); if (k <= 0) continue;
      ctx.save(); ctx.globalAlpha = k; ctx.translate(640 + (i % 2) * 40, 1130 - i * 34 - (1 - k) * 80); ctx.fillStyle = '#e9d29c'; ctx.fillRect(-150, -14, 300, 28); ctx.fillStyle = '#6a3816'; ctx.fillRect(-150, -3, 300, 4); ctx.restore(); }
    glow(700, 1050, 260, '255,220,150', 0.4 * b);
    slam('16 वर्ष  ·  उपनिषद · गीता · ब्रह्मसूत्र पर भाष्य', 250, t, c1 + 0.3, 56, { maxW: 900 });
  }
  fgFrame(t, 'grass', 0.7);
};

// ---------- DEBATE ----------
S.debate = (t) => {
  const c1 = at(0, 0.55);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, noise1(t * 2), 540, 800);
  ctx.save(); ctx.fillStyle = INK; for (const x of [80, W - 80]) { ctx.fillRect(x - 36, 200, 72, 1000); } ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 210); ctx.quadraticCurveTo(540, 60, 0, 210); ctx.fill(); ctx.restore();
  lamp(170, 1180, 1.0, t); lamp(910, 1180, 1.0, t + 2);
  ground(1180);
  // Ubhaya Bharati presides in the centre
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(420, 1060, 240, 120); ctx.fillRect(400, 1050, 280, 16); ctx.fillStyle = HOLE; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(445 + i * 38, 1110, 6, 0, 7); ctx.fill(); } ctx.restore();
  actor(540, 1060, 0.85, t, { woman: true, seated: true, ...POSE.pray, cloth: '#7a3cbf', still: true });
  // garlands (legend: the one whose garland wilts first loses)
  const bow = prog(t, at(0, 0.6), at(0, 0.85));
  const garland = (x, y, wilt) => { ctx.save(); ctx.strokeStyle = wilt > 0.5 ? '#6b4a2a' : '#f2a43a'; ctx.lineWidth = 9; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.ellipse(x, y + wilt * 12, 26, 34 + wilt * 10, 0, 0, Math.PI); ctx.stroke(); ctx.restore(); };
  actor(300, 1180, 1.05, t, { ...SANNYASI, seated: true, ...poseMix(POSE.point, POSE.idle, pulse(t, 0.6) * (1 - bow)), ph: 2 });
  actor(790, 1180, 1.05, t, { face: -1, seated: true, hat: 'turban', beard: true, ...poseMix(POSE.point, POSE.pray, bow), lean: lerp(0, 0.35, bow), ph: 4 });
  garland(304, 990, 0); garland(784, 990, prog(t, c1 - 0.5, c1 + 0.8));
  // words fly back and forth
  if (t < c1 + 0.5) { ctx.save(); ctx.font = `700 40px ${SERIF}`; ctx.fillStyle = 'rgba(255,220,160,0.85)';
    const words = ['ब्रह्म', 'माया', 'कर्म', 'आत्मा', 'सत्य', 'ज्ञान']; for (let i = 0; i < 6; i++) { const k = ((t * 0.7 + i / 6) % 1), dir = i % 2 ? 1 : -1; ctx.globalAlpha = Math.sin(k * Math.PI) * 0.9; ctx.fillText(words[i], lerp(dir > 0 ? 340 : 740, dir > 0 ? 740 : 340, k) - 40, 820 - Math.sin(k * Math.PI) * 140 + i * 6); } ctx.restore(); }
  chip('महिष्मती का शास्त्रार्थ', 540, 200, 46, prog(t, 0.2, 0.7));
  slam('मंडन मिश्र  →  शिष्य सुरेश्वर', 330, t, at(0, 0.8), 62);
  if (bow > 0.5) glow(300, 930, 300, '255,220,150', 0.35 * bow);
};

// ---------- KASHI ----------
S.kashi = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fx: 540, fy: 1000 });
  bg(PAL.dusk, 0, 540, 640);
  sun(540, 640, 120, 0.7);
  // ghats: steps down to the Ganga, with floating lamps
  water(980, t, 0.5);
  for (let i = 0; i < 8; i++) { const x = ((i * 190 + t * 20) % 1300) - 100, y = 1010 + (i % 3) * 22; glow(x, y, 50, '255,190,90', 0.7); ctx.save(); ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.fillStyle = INK; for (let k = 0; k < 6; k++) ctx.fillRect(-20, 1060 + k * 22, W + 40, 24 - k * 0); ctx.restore();
  temple(860, 1060, 0.55, { flag: true, t });
  ground(1180);
  const bowK = prog(t, c2, c2 + 0.8);
  // Shankara with two disciples on the left, the chandala with his dogs on the right
  actor(300, 1180, 1.25, t, { ...SANNYASI, ...(bowK > 0 ? POSE.pray : POSE.idle), lean: 0.4 * bowK, prop: bowK > 0 ? null : 'staff', ph: 2 });
  actor(140, 1180, 1.0, t, { hat: 'none', hat2: 'shikha', ...poseMix(POSE.idle, POSE.point, prog(t, at(0, 0.6), at(0, 0.75)) * (1 - prog(t, c1, c1 + 0.5))), cloth: '#d07a2a', ph: 3 });
  actor(720, 1180, 1.2, t, { face: -1, hat: 'turban', ...poseMix(POSE.idle, POSE.forward, prog(t, c1, c1 + 0.5)), ph: 5 });
  for (const [dx, ph] of [[90, 0], [150, 1], [-70, 2]]) { ctx.save(); ctx.translate(720 + dx * 1.2, 1180); ctx.scale(-0.6, 0.6); ctx.fillStyle = INK;
    ctx.beginPath(); ctx.ellipse(0, -90, 70, 28, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -120, 26, 18, -0.3, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(84, -134); ctx.lineTo(92, -160); ctx.lineTo(100, -132); ctx.fill();
    for (const lx of [-50, -30, 30, 50]) ctx.fillRect(lx - 5, -80, 10, 80 + Math.sin(t * 3 + ph + lx) * 4); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-66, -96); ctx.quadraticCurveTo(-100, -130 + Math.sin(t * 6 + ph) * 10, -110, -110); ctx.stroke(); ctx.restore(); }
  legendTag(t, prog(t, 0.1, 0.5) * (1 - prog(t, c1 - 0.3, c1)));
  quoteCard('“हटो!”', 300, prog(t, at(0, 0.7), at(0, 0.7) + 0.3) * (1 - prog(t, c1 - 0.2, c1)), 76);
  quoteCard('“किसे हटाऊँ? शरीर को… या आत्मा को?”', 330, prog(t, c1 + 0.2, c1 + 0.6) * (1 - prog(t, c2 - 0.2, c2)), 58);
  if (bowK > 0) { rays(540, 640, t, 0.06 * bowK); slam('मनीषा पंचकम्', 300, t, c2 + 0.6, 76); }
  grade('gold', t, 0.6);
};

// ---------- FOUR MATHAS ----------
S.mathas = (t) => {
  const c1 = cue(1)[0];
  const snow = prog(t, c1 - 0.3, c1 + 0.5);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, c1)) });
  bg(mixPal(PAL.map, PAL.cold, snow), 0, 540, 760);
  if (snow < 1) {
    ctx.save(); ctx.globalAlpha = 1 - snow;
    // four directions on a parchment compass
    ctx.strokeStyle = 'rgba(70,32,12,0.5)'; ctx.lineWidth = 4; ctx.setLineDash([14, 12]);
    ctx.beginPath(); ctx.moveTo(540, 330); ctx.lineTo(540, 1130); ctx.moveTo(170, 730); ctx.lineTo(910, 730); ctx.stroke(); ctx.setLineDash([]);
    const P = [['ज्योतिर्मठ', 540, 360, 'उत्तर', 0.30], ['द्वारका', 220, 730, 'पश्चिम', 0.46], ['पुरी', 860, 730, 'पूर्व', 0.62], ['श्रृंगेरी', 540, 1090, 'दक्षिण', 0.78]];
    for (const [nm, x, y, dir, f] of P) { const a = prog(t, at(0, f) - 0.1, at(0, f) + 0.3); if (a <= 0) continue;
      ring(x, y, t, a); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#5a240c'; ctx.textAlign = 'center'; ctx.font = `700 50px ${SERIF}`; ctx.fillText(nm, x, y - 34); ctx.font = `700 32px ${SANS}`; ctx.fillText(dir, x, y + 58); ctx.restore(); }
    // the wanderer walks the circuit in the centre
    actor(540, 800, 0.55, t, { ...SANNYASI, walk: t * 4, prop: 'staff' });
    ctx.restore();
    chip('चार दिशाएँ  ·  चार मठ', 540, 200, 48, prog(t, 0.1, 0.6) * (1 - snow));
  }
  if (snow > 0) {
    ctx.save(); ctx.globalAlpha = snow;
    hills(820, 420, 741, 0.5, '#1c2533'); hills(900, 300, 742, 0.75, '#121924');
    ctx.fillStyle = 'rgba(235,240,250,0.7)'; ctx.beginPath(); ctx.moveTo(380, 560); ctx.lineTo(470, 470); ctx.lineTo(560, 570); ctx.lineTo(520, 560); ctx.lineTo(470, 520); ctx.lineTo(420, 575); ctx.fill();
    temple(540, 1170, 0.5);
    ground(1170, '#0d1118');
    const go = prog(t, c1, D);
    actor(lerp(200, 470, go), 1170, 0.95, t, { ...SANNYASI, walk: go < 1 ? t * 3 : null, prop: 'staff', alpha: 1 });
    rays(560, 760, t, 0.08 * prog(t, at(1, 0.6), D), 12, '220,235,255');
    for (let i = 0; i < 60; i++) { const r = rng(i + 9)(), y = ((r * 1300 + t * (60 + r * 50)) % 1300), x = (r * 9301 % 1) * W + Math.sin(t + i) * 20; ctx.fillStyle = 'rgba(240,245,255,0.7)'; ctx.beginPath(); ctx.arc((i * 97) % W + Math.sin(t + i) * 20, y, 2.5, 0, 7); ctx.fill(); }
    ctx.restore();
    slam('केदारनाथ  ·  32 वर्ष', 230, t, at(1, 0.55), 80);
    grade('cold', t, 0.6 * snow);
  }
};

// ---------- TWIST ----------
S.twist = (t) => {
  const pyre = prog(t, at(0, 0.6), at(0, 0.8));
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1050 });
  bg(PAL.tent, noise1(t * 4), 540, 820);
  lamp(200, 1170, 1.2, t);
  if (pyre < 1) {
    ctx.save(); ctx.globalAlpha = 1 - pyre;
    bed(620, 1080, 520);
    person(470, 1100, 1.0, { rot: Math.PI / 2 - 0.08, hat: 'none', fa: [0.2, 0], sh: [0, 0] });
    const arr = prog(t, 0.2, at(0, 0.45));
    actor(lerp(1150, 860, arr), 1170, 1.05, t, { ...SANNYASI, face: -1, walk: arr < 1 ? t * 5 : null, ...(arr >= 1 ? POSE.pray : {}), lean: arr >= 1 ? 0.35 : 0, prop: arr >= 1 ? null : 'staff' });
    ctx.restore();
    ground(1170);
  }
  if (pyre > 0) {
    ctx.save(); ctx.globalAlpha = pyre; ground(1170);
    ctx.fillStyle = INK; for (let i = 0; i < 6; i++) ctx.fillRect(400 + (i % 2) * 20, 1140 - i * 16, 300, 14);
    flames(560, 1080, 1.3, t, 3); embers(t, 50, 91, 0.9, [300, 400, 800, 1100]);
    actor(860, 1170, 1.05, t, { ...SANNYASI, face: -1, ...POSE.pray, still: true });
    ctx.restore();
    slam('वचन निभाया', 260, t, at(0, 0.85), 110);
  }
  grade('gold', t, 0.4);
};

S.end = (t) => endCard(t, 'आपने कौन-सा मठ देखा है?');
