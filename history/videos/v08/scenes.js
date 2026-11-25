// @common2
// ---------------- video 08 - Bhagat Singh ----------------
const BHAGAT = { hat: 'none', hat2: 'fedora', coat: true, moustache: true };
const ERA = 0.55;   // strength of the old-film look
function hall(t, empty = 0) {   // Central Legislative Assembly chamber: arched back wall, gallery balcony, benches
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.88)'; ctx.fillRect(-20, 120, W + 40, 1100);
  for (let i = 0; i < 5; i++) { const x = 140 + i * 200; ctx.fillStyle = 'rgba(255,214,150,0.22)'; ctx.beginPath(); ctx.moveTo(x - 60, 520); ctx.lineTo(x - 60, 300); ctx.quadraticCurveTo(x, 200, x + 60, 300); ctx.lineTo(x + 60, 520); ctx.fill(); }
  glow(540, 380, 600, '255,200,120', 0.25);
  ctx.fillStyle = INK; ctx.fillRect(-20, 600, W + 40, 64); for (let i = 0; i < 46; i++) ctx.fillRect(i * 24, 572, 7, 30); ctx.fillRect(-20, 566, W + 40, 10);   // gallery
  ctx.fillStyle = 'rgba(255,214,150,0.10)'; ctx.fillRect(-20, 664, W + 40, 330);
  ctx.fillStyle = INK; for (let r = 0; r < 3; r++) { ctx.fillRect(-20, 1010 + r * 90, W + 40, 30); }
  ctx.restore();
  if (empty < 1) for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) { const x = 120 + i * 210 + (r % 2) * 70; ctx.save(); ctx.globalAlpha = 1 - empty;
    actor(x, 1010 + r * 90, 0.62 + r * 0.07, t, { seated: true, hat: i % 3 ? 'none' : 'turban', coat: true, face: i % 2 ? 1 : -1, ph: i + r, shadow: false }); ctx.restore(); }
}
function leaflets(t, t0, n = 14, seed = 4) {
  if (t < t0) return; const r = rng(seed);
  for (let i = 0; i < n; i++) { const x0 = 200 + r() * 700, sp = 120 + r() * 120, k = t - t0 - r() * 0.6; if (k < 0) continue; const y = 600 + k * sp, x = x0 + Math.sin(k * 2 + i) * 60;
    if (y > 1250) continue; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(k * 3 + i) * 0.9); ctx.fillStyle = '#efe3c6'; ctx.fillRect(-26, -18, 52, 36); ctx.fillStyle = 'rgba(40,24,10,0.6)'; for (let l = 0; l < 4; l++) ctx.fillRect(-18, -10 + l * 7, 36, 3); ctx.restore(); }
}

// ---------- HOOK ----------
S.hook_assembly = (t) => {
  const c1 = cue(1)[0], bt = c1 + 0.05;
  cam(t, { z: lerp(1, 1.12, prog(t, 0, c1)) + bump(t, bt, 0.6, 0.06), fy: 900, shake: hit(t, bt, 0.9, 28) });
  bg(PAL.court, 0, 540, 700);
  hall(t, prog(t, bt + 0.3, bt + 1.6));
  // the two young men stand in the gallery
  const up = prog(t, at(1, 0.55), at(1, 0.7));
  for (const [x, ph] of [[700, 0], [800, 2]]) actor(x, 560, 0.8, t, { ...BHAGAT, hat2: x === 700 ? 'fedora' : null, hat: x === 700 ? 'none' : 'pagdi', face: -1, ...poseMix(POSE.idle, POSE.fist, up), ph, shadow: false });
  // something falls from the gallery
  const fk = prog(t, at(0, 0.55), c1);
  if (fk > 0 && fk < 1) { ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(lerp(690, 520, fk), lerp(560, 1010, fk * fk), 14, 0, 7); ctx.fill(); ctx.restore(); }
  boom(520, 1020, t, bt, 1.2, 3);
  if (t > bt) smoke(520, 1000, t - bt, 8, 14, 1.6, 0.3 * prog(t, bt, bt + 0.6));
  // people flee
  if (t > bt + 0.3) for (let i = 0; i < 5; i++) actor(((150 + i * 190) + (t - bt) * (i % 2 ? 260 : -260)), 1240, 0.7, t, { walk: t * 9 + i, face: i % 2 ? 1 : -1, coat: true, hat: 'none', lean: 0.25, ...POSE.reach, ph: i });
  leaflets(t, bt + 0.6);
  slam('दिल्ली  ·  8 अप्रैल 1929', 220, t, 0.1, 70, { until: c1 });
  slam('इंक़लाब ज़िंदाबाद!', 260, t, at(1, 0.72), 104);
  grade('archival', t, ERA);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.4))), shake: hit(t, 0, 0.6, 12) });
  bg(PAL.fire, noise1(t * 3), 540, 900);
  rays(540, 900, t, 0.09);
  sun(540, 900, 180, 0.9);
  hills(1120, 120, 801, 0.7); ground(1200);
  actor(560, 1230, 2.2, t, { ...BHAGAT, ...POSE.idle, eye2: 0.9, ph: 1 });
  title2(t, 'भगत सिंह', '1907 – 1931', { y: 220, size: 120 });
  embers(t, 30, 81, 0.6);
  grade('archival', t, ERA * 0.6);
};

// ---------- JALLIANWALA ----------
S.jallianwala = (t) => {
  const c1 = cue(1)[0], after = prog(t, c1 - 0.3, c1 + 0.5);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000, shake: t < c1 ? 2 + 4 * pulse(t, 3) : 0 });
  bg(mixPal(PAL.blood, PAL.dawn, after), noise1(t * 4), 540, 700);
  // the garden: a low wall far behind, the narrow lane on the right
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.55)'; ctx.fillRect(-20, 900, W + 40, 260); ctx.fillStyle = INK; ctx.fillRect(900, 700, 200, 460); ctx.fillRect(-20, 1100, W + 40, 60); ctx.restore();
  ground(1160);
  if (after < 1) { ctx.save(); ctx.globalAlpha = 1 - after;
    for (let i = 0; i < 6; i++) { const x = 90 + i * 140; redcoat(x, 1160, 0.95, { face: 1, fa: [1.55, -0.05], sh: [1.2, 0.3], spearA: -1.55 }); const k = Math.floor(t * 1.3 + i * 0.37); muzzle(x + 150, 905, t, (k - i * 0.37) / 1.3, 1, 0.8); }
    ctx.restore(); chip('13 अप्रैल 1919  ·  जलियाँवाला बाग़', 540, 200, 46, prog(t, 0.1, 0.6) * (1 - after)); }
  if (after > 0) { ctx.save(); ctx.globalAlpha = after;
    const P = { seated: true, hat: 'pagdi', ...POSE.hold, lean: 0.25, eye2: 0.7 };
    actor(520, 1160, 1.45, t, P);
    const [hx, hy] = handAt(520, 1160, 1.45, P);
    glow(hx, hy - 30, 140, '255,120,80', 0.5 * pulse(t, 0.7));
    ctx.fillStyle = 'rgba(230,240,255,0.7)'; ctx.fillRect(hx - 16, hy - 66, 32, 62); ctx.fillStyle = '#7a1b0e'; ctx.fillRect(hx - 14, hy - 34, 28, 30);
    ctx.restore(); legendTag(t, after); }
  grade('archival', t, ERA);
};

// ---------- LAHORE ----------
S.lahore = (t) => {
  const c1 = cue(1)[0], night = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: night < 1 ? hit(t, at(0, 0.45), 0.5, 10) + hit(t, at(0, 0.55), 0.5, 10) : 0 });
  bg(mixPal(PAL.day, PAL.night, night), 0, 540, 700);
  if (night < 1) { ctx.save(); ctx.globalAlpha = 1 - night;
    colonnade(540, 1000, 0.8); ground(1180);
    crowd(t, { y: 1180, n: 9, s: 0.75, seed: 21, fists: 0.4, flags: 0.25, flagFn: (X, Y, s, tt) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X, Y + 60); ctx.lineTo(X, Y - 160); ctx.stroke(); flag(X, Y - 160, 80, 50, tt, '#111'); ctx.restore(); } });
    const swing = pulse(t, 1.6);
    for (const x of [260, 820]) actor(x, 1240, 1.0, t, { hat: 'pagdi', face: x < 500 ? 1 : -1, ...poseMix(POSE.raise, POSE.strike, swing), prop: 'lathi', ph: x });
    actor(560, 1240, 1.0, t, { hat: 'pagdi', beard: true, ...POSE.mourn, lean: 0.2 * swing });
    ctx.restore();
    chip('“साइमन, वापस जाओ!”', 540, 200, 50, prog(t, 0.1, 0.6) * (1 - night)); }
  if (night > 0) { ctx.save(); ctx.globalAlpha = night;
    moon(820, 360, 60); ground(1180);
    lampPost(250, 1180, 1.1, t); lampPost(850, 1180, 1.1, t + 2);
    ctx.restore();
    newspaper(540, 640, 760, 560, prog(t, at(1, 0.45), at(1, 0.45) + 0.6), 'लाहौर में अंग्रेज़ पुलिस अफ़सर सॉन्डर्स की हत्या', '17 दिसंबर 1928', { masthead: 'लाहौर समाचार', size: 58 }); }
  grade('archival', t, ERA);
};

// ---------- ESCAPE ----------
S.escape = (t) => {
  cam(t, { z: lerp(1.05, 1, prog(t, 0, D)), fy: 1050 });
  bg(PAL.sepia, 0, 540, 700);
  colonnade(540, 900, 0.9, { dome: true });
  train(1080 - prog(t, at(0, 0.7), D) * 300, 1150, 0.75, t, { n: 2, speed: prog(t, at(0, 0.7), D) * 8 });
  rails(1150, t, 0);
  ground(1165);
  // police checking faces
  for (const [x, f] of [[160, 1], [330, -1]]) actor(x, 1240, 0.95, t, { hat: 'pagdi', face: f, prop: 'lathi', ...POSE.hold, ph: x });
  // the 'sahib' in a hat walks past with a lady and a child
  const wx = lerp(-150, 700, prog(t, 0.2, at(0, 0.9)));
  actor(wx, 1240, 1.15, t, { ...BHAGAT, walk: t * 5, ph: 1 });
  actor(wx - 130, 1240, 1.0, t, { woman: true, walk: t * 5 + 1, cloth: '#3a6ab0', ph: 2 });
  actor(wx - 210, 1240, 0.6, t, { walk: t * 6, hat: 'none', ph: 3 });
  slam('लाहौर स्टेशन', 220, t, 0.1, 76, { until: at(0, 0.75) });
  stamp('फ़रार', 540, 420, t, at(0, 0.82), { size: 96 });
  grade('archival', t, ERA);
};

// ---------- THE BOMBS ----------
S.bomb = (t) => {
  const c1 = cue(1)[0], bt = at(0, 0.45);
  cam(t, { z: 1.05 + bump(t, bt, 0.5, 0.05), shake: hit(t, bt, 0.7, 18) });
  bg(PAL.court, 0, 540, 700);
  hall(t, 1);
  // highlight: the benches are empty
  if (t < bt) { ctx.save(); ctx.strokeStyle = '#ffd27a'; ctx.lineWidth = 5; ctx.setLineDash([16, 10]); ctx.globalAlpha = prog(t, 0.2, 0.6); ctx.strokeRect(330, 960, 420, 230); ctx.restore(); chip('ख़ाली बेंचें', 540, 920, 44, prog(t, 0.3, 0.7)); }
  boom(540, 1060, t, bt, 0.9, 5);
  leaflets(t, bt + 0.4, 20, 9);
  newspaper(540, 560, 820, 520, prog(t, c1, c1 + 0.6), 'बहरों को सुनाने के लिए धमाके की ज़रूरत होती है', 'हिंदुस्तान सोशलिस्ट रिपब्लिकन आर्मी', { masthead: 'पर्चा', size: 60, rot: 0.04 });
  grade('archival', t, ERA);
};

// ---------- TRIAL & SENTENCE ----------
S.jail = (t) => {
  const c1 = cue(1)[0], cell = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.court, PAL.jail, cell), 0, 540, 760);
  if (cell < 1) { ctx.save(); ctx.globalAlpha = 1 - cell;
    ctx.fillStyle = INK; ctx.fillRect(660, 820, 360, 360); ctx.fillRect(640, 810, 400, 20);
    actor(840, 820, 1.0, t, { seated: true, face: -1, hat: 'none', coat: true, still: true, shadow: false });
    ground(1180);
    for (const [x, ph] of [[200, 0], [330, 2], [460, 4]]) actor(x, 1180, 1.05, t, { ...(x === 330 ? BHAGAT : { hat: 'none', coat: true }), ...poseMix(POSE.idle, POSE.fist, prog(t, at(0, 0.5), at(0, 0.7))), ph });
    ctx.restore();
    chip('अदालत बनी मंच', 540, 220, 50, prog(t, 0.2, 0.7) * (1 - cell)); }
  if (cell > 0) { ctx.save(); ctx.globalAlpha = cell; ground(1180);
    for (const [x, nm, ph] of [[270, 'राजगुरु', 0], [540, 'भगत सिंह', 2], [810, 'सुखदेव', 4]]) { actor(x, 1180, 1.15, t, { ...(nm === 'भगत सिंह' ? BHAGAT : { hat: 'none', coat: true }), ...POSE.idle, ph, hat2: nm === 'भगत सिंह' ? null : null, eye2: 0.6 });
      chip(nm, x, 1240, 36, prog(t, c1 + 0.3, c1 + 0.8)); }
    ctx.restore(); bars(cell);
    stamp('फाँसी', 540, 330, t, at(1, 0.4), { size: 110 }); }
  grade('archival', t, ERA);
};

// ---------- THE LAST DAY ----------
S.last = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], walk = prog(t, c2 - 0.2, c2 + 0.4);
  cam(t, { z: lerp(1.08, 1, prog(t, 0, c2)), fy: 1000 });
  bg(mixPal(PAL.jail, PAL.dawn, walk), 0, 540, walk > 0 ? 600 : 800);
  if (walk < 1) { ctx.save(); ctx.globalAlpha = 1 - walk;
    lamp(820, 1180, 1.0, t); ground(1180);
    actor(480, 1180, 1.2, t, { ...BHAGAT, hat2: null, hat: 'none', seated: true, ...POSE.hold, prop: 'book', eye2: 0.9, lean: 0.1 });
    const come = prog(t, at(0, 0.5), at(0, 0.9));
    actor(lerp(1200, 900, come), 1180, 1.05, t, { face: -1, hat: 'none', hat2: 'topee', coat: true, walk: come < 1 ? t * 5 : null, ph: 3 });
    ctx.restore();
    bars(0.85 * (1 - walk), 0, W, 160);
    quoteCard('“ठहरिए… एक क्रांतिकारी, दूसरे क्रांतिकारी से मिल रहा है।”', 330, prog(t, c1, c1 + 0.4) * (1 - prog(t, c2 - 0.3, c2)), 52);
    legendTag(t, prog(t, 0.2, 0.6) * (1 - prog(t, c1 - 0.3, c1))); }
  if (walk > 0) { ctx.save(); ctx.globalAlpha = walk;
    rays(540, 600, t, 0.1 * walk); sun(540, 600, 120, 0.9); ground(1180);
    const go = prog(t, c2, D);
    for (const [dx, ph] of [[-170, 0], [0, 2], [170, 4]]) actor(540 + dx + go * 40, 1180 - go * 20, 1.1 - go * 0.1, t, { hat: 'none', coat: true, face: 1, walk: t * 3 + ph, ...POSE.fist, ph, eye2: 0.4 });
    ctx.restore(); slam('इंक़लाब ज़िंदाबाद', 260, t, at(2, 0.4), 92); }
  grade('archival', t, ERA * (1 - 0.5 * walk));
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], dawn = prog(t, c1 - 0.3, c1 + 0.6);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)), shake: hit(t, at(0, 0.5), 0.5, 10) });
  bg(mixPal(PAL.night, PAL.fire, dawn), noise1(t * 3), 540, 760);
  if (dawn < 1) { ctx.save(); ctx.globalAlpha = 1 - dawn;
    clockFace(540, 640, 220, 7, Math.round(lerp(10, 33, prog(t, 0, at(0, 0.7)))), 1);
    ctx.restore();
    overlay(() => { const a = 1 - dawn; ctx.save(); ctx.globalAlpha = a;
      textBlock('24 मार्च', 300, 1000, 70, { font: SERIF, color: CREAM, alpha: a });
      if (t > at(0, 0.45)) { ctx.strokeStyle = '#c8261a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(180, 1000); ctx.lineTo(420, 1000); ctx.stroke(); }
      textBlock('23 मार्च, शाम', 760, 1000, 70, { font: SERIF, color: '#ff9c7a', alpha: a * prog(t, at(0, 0.5), at(0, 0.6)) }); ctx.restore(); });
    stamp('एक दिन पहले', 540, 330, t, at(0, 0.62), { size: 84 }); }
  if (dawn > 0) { ctx.save(); ctx.globalAlpha = dawn;
    rays(540, 760, t, 0.1); sun(540, 760, 150, 0.95); hills(1120, 140, 811, 0.6); ground(1180);
    for (const [x, s, ph] of [[300, 1.3, 0], [540, 1.6, 2], [780, 1.3, 4]]) actor(x, 1180, s, t, { hat: 'none', ...(ph === 2 ? BHAGAT : { coat: true }), ...POSE.fist, ph, still: true });
    ctx.restore();
    quoteCard('“वो मुझे मार सकते हैं, मेरे विचारों को नहीं।”', 330, prog(t, at(1, 0.4), at(1, 0.4) + 0.5), 56); }
  embers(t, 30, 83, 0.6 * dawn);
  grade('archival', t, ERA * 0.7);
};

S.end = (t) => endCard(t, 'भगत सिंह का कौन-सा विचार आपको प्रेरित करता है?');
