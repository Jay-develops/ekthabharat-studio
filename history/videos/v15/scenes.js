// @common2
// ---------------- video 15 - Mangal Pandey ----------------
const PANDEY = { hat: 'none', hat2: 'shako', moustache: true, cloth: '#b8231a' };
const SEPOY = { hat: 'none', hat2: 'shako' };
function barracks(x, y, s) {   // long colonial barrack block
  ctx.save(); ctx.globalAlpha = 0.55; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(-500, -220, 1000, 220); ctx.beginPath(); ctx.moveTo(-520, -220); ctx.lineTo(0, -320); ctx.lineTo(520, -220); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(-460 + i * 96, -20); ctx.lineTo(-460 + i * 96, -140); ctx.quadraticCurveTo(-430 + i * 96, -180, -400 + i * 96, -140); ctx.lineTo(-400 + i * 96, -20); ctx.fill(); }
  ctx.restore();
}
function musketPose(k) { return { fa: [lerp(1.55, 1.55, k), -0.05], sh: [lerp(0.6, 1.2, k), 0.3], spearA: -1.55 }; }   // musket levelled
function cartridge(x, y, s, a = 1, bite = 0) {
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#e9dcc0'; ctx.fillRect(-150, -40, 300, 80); ctx.fillStyle = '#c9b48a'; ctx.fillRect(-150, -40, 60, 80);
  ctx.strokeStyle = '#6b4a2a'; ctx.lineWidth = 3; ctx.strokeRect(-150, -40, 300, 80);
  ctx.fillStyle = 'rgba(160,120,60,0.45)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(-60 + i * 40, (i % 2 ? 12 : -10), 22, 10, 0.3, 0, 7); ctx.fill(); }   // grease stains
  if (bite > 0) { ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); for (let i = 0; i < 5; i++) ctx.arc(150, -40 + i * 20, 16 * bite, 0, 7); ctx.fill(); }
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_parade = (t) => {
  const c1 = cue(1)[0], shot = at(1, 0.65);
  cam(t, { z: lerp(1, 1.2, prog(t, 0, shot)) + bump(t, shot, 0.5, 0.06), fx: 540, fy: 1000, shake: hit(t, shot, 0.8, 26) });
  bg(PAL.battle, noise1(t * 2), 540, 760);
  barracks(540, 1000, 0.9); ground(1180);
  for (let i = 0; i < 6; i++) actor(80 + i * 70, 1180, 0.65, t, { ...SEPOY, face: 1, ...POSE.idle, ph: i, still: i % 2 === 0 });
  actor(560, 1180, 1.35, t, { ...PANDEY, face: 1, wpn: 'spear', ...(t > c1 ? musketPose(1) : { fa: [0.5, -1.3], sh: [-0.3, -0.4], spearA: -0.05 }), eye2: 0.9, ph: 1 });
  muzzle(860, 905, t, shot, 1, 1.4);
  if (t > shot) { const k = prog(t, shot, shot + 1.2); rider(lerp(1000, 1100, k), 1180, 0.9, t, { hat: 'none', wpn: null, rear: 0.5 * k, fa: [2.2, 0.6] }); }
  else rider(1000, 1180, 0.9, t, { hat: 'none', wpn: 'sword', fa: [1.6, 0] });
  slam('29 मार्च 1857  ·  बैरकपुर', 220, t, 0.15, 70, { until: c1 });
  quoteCard('“भाइयो, उठो!”', 320, prog(t, at(1, 0.1), at(1, 0.1) + 0.3) * (1 - prog(t, shot + 0.6, shot + 1)), 80);
  grade('archival', t, 0.35);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 150, 1501, 0.6); ground(1200);
  actor(540, 1220, 2.0, t, { ...PANDEY, wpn: 'spear', fa: [0.5, -1.3], spearA: -0.05, eye2: 0.9, ph: 1 });
  title2(t, 'मंगल पांडे', '1857 की पहली चिंगारी', { y: 220, size: 120 });
  embers(t, 30, 151, 0.7);
};

// ---------- THE SEPOY ----------
S.sepoy = (t) => {
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.day, 0, 540, 700);
  const village = 1 - prog(t, at(0, 0.45), at(0, 0.6));
  if (village > 0) { ctx.save(); ctx.globalAlpha = village; hills(960, 200, 1511, 0.3); for (const [x, s] of [[120, 1], [900, 1.1]]) tree(x, 1180, s, t, x); ground(1180);
    actor(540, 1180, 1.2, t, { hat: 'pagdi', moustache: true, walk: t * 3, ph: 1 }); ctx.restore(); chip('बलिया, उत्तर प्रदेश', 540, 220, 46, village * prog(t, 0.2, 0.6)); }
  if (village < 1) { ctx.save(); ctx.globalAlpha = 1 - village; barracks(540, 1060, 0.8); ground(1180);
    for (let i = 0; i < 7; i++) actor(120 + i * 140, 1180, 0.85 + (i === 3 ? 0.25 : 0), t, { ...(i === 3 ? PANDEY : SEPOY), wpn: 'spear', fa: [0.5, -1.3], spearA: -0.05, ph: i, still: true });
    ctx.restore(); chip('34वीं बंगाल नेटिव इन्फ़ैंट्री', 540, 220, 46, 1 - village); }
  grade('archival', t, 0.35);
};

// ---------- THE CARTRIDGE ----------
S.cartridge = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: t > c2 ? 2 : 0 });
  bg(t < c2 ? PAL.court : PAL.blood, noise1(t * 3), 540, 760);
  ground(1180);
  // a soldier tearing the paper cartridge with his teeth
  const bite = prog(t, at(0, 0.6), at(0, 0.8));
  actor(300, 1180, 1.3, t, { ...SEPOY, fa: [2.3, 1.9], sh: [-0.3, -0.4], eye2: 0.6, ph: 1 });
  cartridge(640, 640, 1.8, prog(t, 0.2, 0.6), bite);
  chip('एनफ़ील्ड राइफ़ल  ·  1857', 540, 220, 46, prog(t, 0.2, 0.6) * (1 - prog(t, c1 - 0.3, c1)));
  stamp('गाय और सूअर की चर्बी?', 620, 800, t, at(1, 0.5), { size: 56 });
  if (t > c2) { crowd(t, { y: 1250, n: 9, s: 0.75, seed: 15, fists: 0.6, hats: ['pagdi', 'turban', 'none'], x0: 420 });
    slam('धर्म दाँव पर', 330, t, at(2, 0.5), 96); }
  grade('archival', t, 0.35);
};

// ---------- THE CLASH ----------
S.clash = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], fall = prog(t, at(0, 0.6), at(0, 0.9));
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: hit(t, at(0, 0.55), 0.6, 18) + hit(t, c2 + 0.3, 0.5, 12) });
  bg(PAL.battle, noise1(t * 3), 540, 760); barracks(540, 1000, 0.9); ground(1180);
  if (t < c1 + 0.2) { // an officer is thrown from his horse
    rider(760, 1180, 1.0, t, { hat: 'none', wpn: 'sword', fa: [1.6, 0], rear: 0.6 * fall });
    actor(380, 1180, 1.3, t, { ...PANDEY, ...poseMix(POSE.guard, POSE.strike, pulse(t, 1.4)), wpn: 'sword', ph: 1 });
    sparks(560, 920, t, at(0, 0.55));
    chip('लेफ़्टिनेंट बॉ', 760, 300, 42, prog(t, 0.2, 0.6) * (1 - fall)); }
  else if (t < c2 + 0.2) {
    actor(260, 1180, 1.05, t, { hat: 'none', hat2: 'topee', coat: true, ...POSE.point, ph: 2 });
    const no = prog(t, at(1, 0.6), at(1, 0.8));
    actor(620, 1180, 1.25, t, { ...SEPOY, face: -1, hat2: 'shako', ...poseMix(POSE.idle, POSE.hips, no), lean: -0.05 * no, ph: 3 });
    chip('जमादार ईश्वरी प्रसाद', 620, 1250, 40, prog(t, c1, c1 + 0.4));
    stamp('इनकार', 540, 360, t, at(1, 0.7), { size: 100 }); }
  else { actor(540, 1180, 1.2, t, { ...PANDEY, rot: -1.2 * prog(t, c2, c2 + 0.8), fa: [0.3, 0.3], sh: [0.4, 0], ph: 1 });
    for (const x of [300, 800]) actor(x, 1180, 1.0, t, { ...SEPOY, hat2: 'topee', coat: true, face: x < 540 ? 1 : -1, ...POSE.hold, ph: x }); }
  grade('archival', t, 0.35);
};

// ---------- THE HANGING (shown only as dawn, a drum and an empty parade ground) ----------
S.hang = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1.08, 1, prog(t, 0, D)) });
  bg(PAL.dusk2, 0, 540, 760); sun(540, 820, 130, 0.7);
  barracks(540, 1060, 0.8); ground(1180);
  for (let i = 0; i < 9; i++) actor(80 + i * 115, 1180, 0.7, t, { ...SEPOY, ...POSE.mourn, still: true, ph: i });
  slam('8 अप्रैल 1857', 230, t, at(0, 0.1), 96);
  stamp('फाँसी', 540, 420, t, at(0, 0.6), { size: 100 });
  if (t > c1) chip('“बात ख़त्म हुई”… या नहीं?', 540, 560, 46, prog(t, c1 + 0.2, c1 + 0.6));
  grade('archival', t, 0.5);
};

// ---------- THE SPARK SPREADS ----------
S.spark = (t) => {
  const c1 = cue(1)[0], mapA = prog(t, c1 - 0.3, c1 + 0.3);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: mapA < 1 ? 4 : 0 });
  bg(mixPal(PAL.fire, PAL.map, mapA), noise1(t * 4), 540, 700);
  if (mapA < 1) { ctx.save(); ctx.globalAlpha = 1 - mapA;
    colonnade(540, 980, 0.7); fireRow(200, 900, 980, t, 0.6, 2, 0.8); ground(1200);
    for (let i = 0; i < 6; i++) rider(-200 + i * 200 + t * 160, 1200, 0.7, t * 1.5, { hat: 'pagdi', wpn: 'sword', fa: [2.6, 0.2], ph: i });
    ctx.restore(); slam('10 मई  ·  मेरठ', 220, t, 0.2, 90, { until: c1 }); chip('→ दिल्ली', 540, 360, 52, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - mapA)); }
  if (mapA > 0) { ctx.save(); ctx.globalAlpha = mapA;
    const P = [[380, 560, 'मेरठ'], [330, 640, 'दिल्ली'], [620, 760, 'कानपुर'], [700, 720, 'लखनऊ'], [430, 860, 'झाँसी'], [880, 900, 'बैरकपुर']];
    P.forEach(([x, y, n], i) => { const k = prog(t, c1 + i * 0.35, c1 + i * 0.35 + 0.4); if (k <= 0) return; ring(x, y, t, k); flames(x, y - 10, 0.25 * k, t, i); ctx.fillStyle = '#5a240c'; ctx.font = `700 36px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText(n, x, y + 58); });
    ctx.restore(); slam('1857 की क्रांति', 230, t, at(1, 0.5), 100); }
};

// ---------- TWIST ----------
S.twist = (t) => {
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)) });
  bg(PAL.sepia, 0, 540, 700);
  newspaper(540, 640, 820, 600, prog(t, 0.2, 0.8), 'बाग़ियों को अंग्रेज़ बुलाते थे: “पांडीज़”', 'Pandies', { masthead: 'लंदन, 1857', size: 60 });
  slam('पांडे', 1050, t, at(0, 0.8), 130, { color: '#ff9c7a' });
  grade('archival', t, 0.5);
};

S.end = (t) => endCard(t, 'क्या आपको ये बात पता थी?');
