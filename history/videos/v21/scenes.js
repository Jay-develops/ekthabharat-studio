// @common2
// ---------------- video 21 - Chandrashekhar Azad ----------------
const AZAD = { hat: 'none', moustache: true, cloth: '#e3d6b4' };
const COP = { hat: 'none', hat2: 'topee', coat: true };
function bigTree(x, y, s, t) {   // the jamun tree of Alfred Park
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-30, -300, -60, -520); ctx.lineTo(50, -520); ctx.quadraticCurveTo(30, -300, 60, 0); ctx.fill();
  for (const [bx, by, r] of [[-200, -620, 170], [0, -760, 220], [210, -620, 170], [-90, -560, 150], [120, -560, 150]]) { ctx.beginPath(); ctx.arc(bx + Math.sin(t * 0.8 + bx) * 4, by, r, 0, 7); ctx.fill(); }
  ctx.restore();
}
function pistolBig(x, y, s, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-120, -30, 220, 50); ctx.fillRect(80, -24, 60, 14); ctx.beginPath(); ctx.moveTo(-100, 20); ctx.lineTo(-40, 20); ctx.lineTo(-60, 150); ctx.lineTo(-130, 150); ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-20, 40, 26, 0, Math.PI); ctx.stroke(); ctx.restore(); }

// ---------- HOOK ----------
S.hook_park = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.2, prog(t, 0, D)), fx: 560, fy: 1000 });
  bg(PAL.dusk2, noise1(t * 2), 540, 700); fog(1080, t, 0.25, 21);
  bigTree(560, 1180, 1.0, t); ground(1180);
  actor(470, 1180, 1.15, t, { ...AZAD, face: 1, ...POSE.guard, prop: 'pistol', eye2: 0.9, ph: 1 });
  for (let i = 0; i < 4; i++) { const x = i < 2 ? 80 + i * 110 : 860 + (i - 2) * 110; actor(x + Math.sin(t + i) * 8, 1200, 0.85, t, { ...COP, face: x < 540 ? 1 : -1, wpn: 'spear', fa: [1.55, -0.05], sh: [1.2, 0.3], spearA: -1.55, ph: i }); }
  slam('27 फ़रवरी 1931  ·  इलाहाबाद', 220, t, 0.15, 70, { until: c1 });
  if (t > c1) { const a = prog(t, c1, c1 + 0.4); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(255,232,190,0.92)'; ctx.beginPath(); ctx.arc(540, 520, 230, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a3a14'; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
    pistolBig(520, 470, 0.95, a, -0.05); for (let k = 0; k < 3; k++) { ctx.save(); ctx.globalAlpha = prog(t, c1 + 0.4 + k * 0.3, c1 + 0.6 + k * 0.3); ctx.fillStyle = '#b8841a'; ctx.fillRect(470 + k * 50, 640, 24, 56); ctx.restore(); } }
  grade('archival', t, 0.4);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 150, 2101, 0.6); ground(1200);
  actor(540, 1220, 2.1, t, { ...AZAD, ...POSE.hips, eye2: 0.9, ph: 1 });
  title2(t, 'चंद्रशेखर आज़ाद', '1906 – 1931', { y: 220, size: 108 });
  embers(t, 25, 211, 0.6);
};

// ---------- THE COURT ----------
S.court = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, 0, 540, 700);
  ctx.fillStyle = INK; ctx.fillRect(620, 820, 400, 360); ctx.fillRect(600, 810, 440, 20);
  actor(820, 820, 0.9, t, { ...COP, hat2: null, seated: true, face: -1, glasses: true, ...POSE.point, shadow: false, ph: 2 });
  ground(1180);
  actor(330, 1180, 0.85, t, { ...AZAD, moustache: false, ...POSE.hips, ph: 1 });
  chip('बनारस  ·  1921', 540, 220, 46, prog(t, 0.2, 0.6) * (1 - prog(t, c1 - 0.3, c1)));
  if (t > c1) overlay(() => { const qa = [['नाम?', 'आज़ाद'], ['पिता?', 'स्वतंत्रता'], ['घर?', 'जेल']];
    qa.forEach(([q, a], i) => { const t0 = at(1, 0.12 + i * 0.28); const k = prog(t, t0, t0 + 0.25);
      if (k > 0) { chip(q, 800, 420 + i * 120, 44, k, { color: '#ffd9a0' }); chip(a, 300, 470 + i * 120, 54, prog(t, t0 + 0.35, t0 + 0.55)); } }); });
};

// ---------- THE LASHES ----------
S.lashes = (t) => {
  const n = Math.min(15, Math.floor(prog(t, 0.2, at(0, 0.9)) * 15) + 1);
  const sw = (t * 2.2) % 1;
  cam(t, { z: lerp(1.05, 1.15, prog(t, 0, D)), shake: sw < 0.1 ? 8 : 0 });
  bg(PAL.blood, noise1(t * 3), 540, 760); ground(1180);
  ctx.fillStyle = INK; ctx.fillRect(520, 760, 30, 420); ctx.fillRect(470, 760, 130, 26);   // the whipping frame
  actor(560, 1180, 1.0, t, { ...AZAD, moustache: false, fa: [2.9, 0.2], sh: [-2.9, -0.2], ph: 1, still: true });
  actor(860, 1180, 1.1, t, { ...COP, hat2: null, hat: 'pagdi', face: -1, fa: [lerp(2.6, 1.2, ss(sw * 3)), 0.2], prop: 'lathi', ph: 2 });
  overlay(() => { textBlock(String(n), 860, 520, 150, { font: SERIF, color: '#ffd27a', alpha: 0.9 }); });
  slam('भारत माता की जय!', 300, t, 0.6, 92);
};

// ---------- THE LEADER ----------
S.leader = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)), shake: t < c1 ? 2 : 0 });
  if (t < c1) { bg(PAL.night, noise1(t * 2), 540, 700); stars(t, 0.5); moon(820, 320, 50);
    rails(1180, t, 0); train(lerp(1300, 540, ss(prog(t, 0, at(0, 0.35)))), 1180, 0.85, t, {}); ground(1200);
    for (let i = 0; i < 4; i++) actor(200 + i * 110, 1240, 0.8, t, { hat: 'none', moustache: i === 0, cloth: i === 0 ? AZAD.cloth : null, ...POSE.guard, prop: 'pistol', ph: i });
    chip('काकोरी  ·  1925', 540, 240, 48, prog(t, 0.2, 0.6));
    if (t > at(0, 0.7)) { const k = prog(t, at(0, 0.7), at(0, 0.9)); for (let i = 0; i < 4; i++) actor(lerp(1000, 760, k) + i * 60, 1240, 0.75, t, { hat: i === 0 ? 'turban' : 'none', walk: t * 5 + i, ph: i + 4 }); chip('भगत सिंह, सुखदेव, राजगुरु…', 540, 340, 42, k); } }
  else { bg(PAL.day, 0, 540, 700); ctx.save(); ctx.globalAlpha = 0.5; temple(780, 1180, 0.7); ctx.restore(); ground(1180);
    const dis = prog(t, at(1, 0.4), at(1, 0.55));
    actor(400, 1180, 1.3, t, { hat: 'none', hat2: dis > 0.5 ? 'shikha' : null, moustache: dis < 0.5, cloth: dis > 0.5 ? SAFF : AZAD.cloth, ...POSE.idle, prop: dis > 0.5 ? 'kamandal' : null, ph: 1 });
    if (dis > 0 && dis < 1) glow(400, 900, 220, '255,240,200', Math.sin(dis * Math.PI) * 0.9);
    actor(840, 1180, 1.0, t, { ...COP, face: -1, walk: t * 4, ph: 3 });
    chip('पुलिस को चकमा', 540, 300, 46, prog(t, c1 + 0.2, c1 + 0.6)); }
};

// ---------- THE LAST STAND ----------
S.stand = (t) => {
  const c1 = cue(1)[0], hush = prog(t, c1, c1 + 0.8);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, c1)), fx: 540, fy: 1000, shake: t < c1 ? 5 : 0 });
  bg(mixPal(PAL.battle, PAL.dawn, hush), noise1(t * 3), 540, 700);
  bigTree(540, 1180, 1.0, t); ground(1180);
  if (t < c1 + 0.3) {
    actor(450, 1180, 1.15, t, { ...AZAD, ...poseMix(POSE.guard, POSE.point, pulse(t, 1.6)), prop: 'pistol', eye2: 0.9, ph: 1 });
    for (let k = 0; k < 6; k++) muzzle(370, 960, t, 0.3 + k * 0.9, -1, 0.9);
    for (let i = 0; i < 5; i++) { const x = i < 2 ? 40 + i * 120 : 820 + (i - 2) * 100; actor(x, 1200, 0.8, t, { ...COP, face: x < 540 ? 1 : -1, wpn: 'spear', fa: [1.55, -0.05], sh: [1.2, 0.3], spearA: -1.55, ph: i }); muzzle(x + (x < 540 ? 130 : -130), 1000, t, 0.7 + i * 0.6, x < 540 ? 1 : -1, 0.7); }
    actor(lerp(700, 1250, prog(t, at(0, 0.6), at(0, 0.95))), 1240, 0.8, t, { hat: 'none', walk: t * 9, ...POSE.reach, lean: 0.2, ph: 6 });
    chip('साथी निकल गया', 900, 360, 42, prog(t, at(0, 0.75), at(0, 0.9)) * (1 - prog(t, c1 - 0.2, c1))); }
  if (hush > 0) { ctx.save(); ctx.globalAlpha = hush; rays(540, 600, t, 0.1 * hush); glow(540, 700, 380, '255,240,210', 0.45 * hush); ctx.restore();
    slam('कसम निभाई', 300, t, at(1, 0.55), 110); }
  grade('archival', t, 0.4 * (1 - hush));
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.dusk2, PAL.dawn, now), 0, 540, 700); rays(540, 640, t, 0.08); sun(540, 640, 120, 0.85);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now; actor(540, 1180, 1.8, t, { ...AZAD, fa: [2.0, 2.2], sh: [-0.3, -0.4], ph: 1 }); ground(1180); ctx.restore();
    slam('उम्र: 24 साल', 260, t, at(0, 0.5), 96, { until: c1 }); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now;
    bigTree(220, 1180, 0.6, t); ctx.fillStyle = INK; ctx.fillRect(470, 1040, 220, 140); ctx.fillRect(450, 1030, 260, 16);
    actor(580, 1030, 1.15, 0, { ...AZAD, cloth: null, fa: [2.0, 2.2], sh: [-0.3, -0.4], still: true, shadow: false });
    ctx.strokeStyle = 'rgba(255,240,200,0.7)'; ctx.lineWidth = 4; ctx.strokeRect(790, 860, 220, 160); pistolBig(900, 930, 0.35);
    ground(1180); ctx.restore();
    chip('चंद्रशेखर आज़ाद पार्क', 540, 300, 50, prog(t, c1, c1 + 0.5)); chip('इलाहाबाद संग्रहालय', 900, 820, 34, prog(t, at(1, 0.6), at(1, 0.8))); }
};

S.end = (t) => endCard(t, 'चंद्रशेखर आज़ाद के लिए एक शब्द लिखिए');
