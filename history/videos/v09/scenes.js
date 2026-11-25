// @common2
// ---------------- video 09 - Rani Durgavati ----------------
const RANI = { woman: true, hat: 'none', hat2: 'mukut', cloth: '#c0392b' };
// the queen in the howdah of her war elephant (elephant faces right)
function raniElephant(x, y, s, t, o = {}) {
  elephant(x, y, s, t * (o.still ? 0 : 1), o.ph || 0);
  actor(x - 10 * s, y - 262 * s, 0.75 * s, t, { ...RANI, seated: true, ...(o.pose || POSE.raise), wpn: o.wpn === undefined ? 'sword' : o.wpn, shadow: false, ph: 1, lean: o.lean || 0 });
  person(x + 110 * s, y - 200 * s, 0.5 * s, { seated: true, hat: 'pagdi', fa: [1.2, -0.4], sh: [0.4, -0.3] });   // mahout on the neck
  if (o.arrows) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 3.5 * s; const [hx, hy] = headPos(x - 10 * s, y - 262 * s, 0.75 * s, 1, true);
    ctx.beginPath(); ctx.moveTo(hx + 8 * s, hy - 4 * s); ctx.lineTo(hx + 70 * s, hy - 30 * s); ctx.moveTo(hx, hy + 30 * s); ctx.lineTo(hx + 60 * s, hy + 50 * s); ctx.stroke(); ctx.restore(); }
}
function tiger(x, y, s, t, face = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s); ctx.fillStyle = INK; const g = t * 7;
  for (const [lx, p] of [[-70, 0], [-50, 2], [50, 3], [70, 5]]) { ctx.save(); ctx.translate(lx, -70); ctx.rotate(Math.sin(g + p) * 0.5); ctx.fillRect(-9, 0, 18, 70); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, -90, 100, 34, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(100, -110, 30, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(90, -136); ctx.lineTo(96, -150); ctx.lineTo(106, -136); ctx.fill();
  ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-96, -96); ctx.quadraticCurveTo(-150, -130 + Math.sin(g) * 10, -170, -90); ctx.stroke();
  ctx.fillStyle = HOLE; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-60 + i * 22, -118); ctx.lineTo(-52 + i * 22, -88); ctx.lineTo(-66 + i * 22, -88); ctx.fill(); }
  ctx.restore();
}
function mughalLine(t, off = 0, a = 1) {   // elephants, cannons and spearmen of the Mughal army (facing left)
  ctx.save(); ctx.globalAlpha = a;
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(780 + i * 260 + off, 1050); ctx.scale(-1, 1); elephant(0, 0, 0.55, t, i); ctx.restore(); }
  for (let i = 0; i < 3; i++) cannon(700 + i * 150 + off, 1180, 0.7, -1, 0);
  troop(t * 0, { y: 1250, n: 7, s: 0.6, dir: -1, x: 1300 + off, gap: 90, hat: 'turban' });
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_elephant = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1.0, 1.15, prog(t, 0, D)), fx: 460, fy: 900, shake: 3 + hit(t, at(0, 0.15), 0.4, 14) + hit(t, at(0, 0.5), 0.4, 14) });
  bg(PAL.blood, noise1(t * 3), 600, 700);
  sun(760, 520, 100, 0.6);
  hills(900, 220, 901, 0.4); dust(t, 0.35, 9, 900, 1200);
  ground(1200);
  for (let i = 0; i < 4; i++) fallen(120 + i * 260, 1200, 0.6, i % 2 ? 1 : -1, i);
  raniElephant(420, 1200, 1.25, t, { arrows: t > at(0, 0.5), pose: poseMix(POSE.raise, POSE.strike, pulse(t, 0.9)), lean: -0.05 });
  volley(t, 0.1, 1300, 500, 400, 900, 14, 3, 1.0, 120); volley(t, 1.8, 1300, 420, 380, 880, 14, 4, 1.0, 120); volley(t, c1 + 0.5, 1300, 460, 400, 900, 14, 5, 1.0, 120);
  fgFrame(t, 'grass', 0.8);
  slam('24 जून 1564', 220, t, 0.15, 96, { until: c1 });
  quoteCard('“रानी साहिबा, निकल चलिए!”', 300, prog(t, at(3, 0.3), at(3, 0.3) + 0.3), 70);
  grade('blood', t, 0.35);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860);
  rays(540, 860, t, 0.08); sun(540, 860, 170, 0.95);
  hills(1100, 160, 911, 0.6); ground(1200);
  raniElephant(500, 1200, 1.3, t, { still: true, pose: POSE.raise });
  title2(t, 'रानी दुर्गावती', 'गोंडवाना  ·  1524 – 1564', { y: 220, size: 112 });
  embers(t, 25, 91, 0.6);
};

// ---------- KALINJAR ----------
S.kalinjar = (t) => {
  const c1 = cue(1)[0], wed = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(mixPal(PAL.day, PAL.dusk, wed), 0, 600, 700);
  if (wed < 1) { ctx.save(); ctx.globalAlpha = 1 - wed;
    hills(1000, 140, 921, 0.5); cliffFort(960, 1180, 0.42, t); ground(1180);
    const shot = at(0, 0.6);
    actor(280, 1180, 1.1, t, { ...RANI, hat2: null, ...poseMix(POSE.idle, POSE.point, prog(t, shot - 0.6, shot - 0.2)), sh: [1.5, 0.2], ph: 1 });
    const ak = prog(t, shot, shot + 0.35); if (ak > 0 && ak < 1) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(lerp(380, 640, ak), 940); ctx.lineTo(lerp(380, 640, ak) + 50, 940); ctx.stroke(); ctx.restore(); }
    tiger(lerp(820, 660, prog(t, 0.2, shot)), 1180, 0.9, t * (t < shot + 0.3 ? 1 : 0), -1);
    ctx.restore(); slam('कालिंजर  ·  चंदेल राजकुमारी', 220, t, 0.2, 70, { until: c1 }); }
  if (wed > 0) { ctx.save(); ctx.globalAlpha = wed; ground(1180);
    const gone = prog(t, at(1, 0.6), at(1, 0.9));
    actor(380, 1180, 1.15, t, { ...RANI, ...poseMix(POSE.pray, POSE.mourn, gone), ph: 1 });
    ctx.save(); ctx.globalAlpha = wed * (1 - gone); actor(640, 1180, 1.2, t, { face: -1, hat: 'crown', cloth: '#2f6a8a', ...POSE.pray, ph: 3 }); ctx.restore();
    if (gone > 0) { lamp(640, 1180, 1.0, t); }
    ctx.restore(); chip('राजा दलपत शाह', 640, 1250, 40, wed * (1 - gone)); }
};

// ---------- RULE ----------
S.rule = (t) => {
  const c1 = cue(1)[0], war = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.court, PAL.battle, war), 0, 540, 760);
  if (war < 1) { ctx.save(); ctx.globalAlpha = 1 - war;
    palace(540, 1040, 0.9); ground(1180);
    ctx.fillStyle = INK; ctx.fillRect(390, 1090, 300, 90);
    actor(540, 1090, 1.1, t, { ...RANI, seated: true, ...POSE.point, still: false });
    actor(300, 1180, 0.85, t, { hat: 'pagdi', ...POSE.pray, lean: 0.3, ph: 2 }); actor(800, 1180, 0.85, t, { face: -1, hat: 'turban', ...POSE.pray, lean: 0.3, ph: 4 });
    ctx.restore();
    slam('गढ़ा-कटंगा  ·  16 वर्ष', 220, t, 0.2, 76, { until: c1 }); }
  if (war > 0) { ctx.save(); ctx.globalAlpha = war; hills(960, 200, 931, 0.4); ground(1200); dust(t, 0.3, 4);
    const run = prog(t, at(1, 0.55), D);
    for (let i = 0; i < 6; i++) actor(lerp(500, 1300, run) + i * 120, 1200, 0.75, t, { face: run > 0 ? 1 : -1, walk: t * 8 + i, hat: 'turban', ...POSE.reach, lean: 0.2 * run, ph: i });
    raniElephant(lerp(-100, 330, prog(t, c1, at(1, 0.5))), 1200, 1.0, t, { pose: POSE.raise });
    ctx.restore();
    chip('बाज़ बहादुर (मालवा)', 760, 300, 46, war * (1 - prog(t, at(1, 0.55), at(1, 0.7))));
    stamp('हारकर लौटा', 540, 420, t, at(1, 0.7), { size: 88 }); }
};

// ---------- AKBAR'S GENERAL ----------
S.akbar = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: hit(t, c2 + 0.2, 0.5, 10) });
  bg(c2 > t ? PAL.battle : PAL.fire, noise1(t * 2), 540, 700);
  hills(900, 180, 941, 0.35); ground(1250);
  mughalLine(t, lerp(260, 0, easeOut(prog(t, 0, cue(0)[1]))), 1 - prog(t, c2 - 0.3, c2 + 0.2) * 0.6);
  slam('1564', 220, t, 0.1, 110, { until: at(0, 0.5) });
  chip('आसफ़ ख़ान  ·  अकबर का सेनापति', 540, 370, 44, prog(t, at(0, 0.4), at(0, 0.6)) * (1 - prog(t, c1 - 0.3, c1)));
  // the council, then the queen's answer
  const q = prog(t, c1 - 0.2, c1 + 0.3);
  if (q > 0) { ctx.save(); ctx.globalAlpha = q;
    actor(200, 1250, 0.95, t, { hat: 'pagdi', beard: true, ...POSE.forward, lean: 0.15, ph: 1 }); actor(330, 1250, 0.9, t, { hat: 'turban', ...POSE.pray, lean: 0.25, ph: 3 });
    const stand = prog(t, c2, c2 + 0.4);
    actor(520, 1250, 1.3, t, { ...RANI, ...poseMix(POSE.idle, POSE.raise, stand), wpn: 'sword', eye2: 0.8, ph: 2 });
    ctx.restore(); }
  legendTag(t, prog(t, c2 - 0.2, c2 + 0.2));
  quoteCard('“ग़ुलामी की ज़िंदगी से, इज़्ज़त की मौत बेहतर है।”', 330, prog(t, at(2, 0.35), at(2, 0.35) + 0.4), 56);
};

// ---------- BATTLE ----------
S.battle = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  const flood = prog(t, at(1, 0.4), c2 + 1);
  cam(t, { z: lerp(1, 1.12, prog(t, c1, D)), shake: 4 + hit(t, 0.4, 0.5, 14) + hit(t, c2 + 0.3, 0.5, 16) });
  bg(mixPal(PAL.battle, PAL.cold, flood * 0.6), noise1(t * 3), 540, 700);
  hills(880, 240, 951, 0.4);
  rain(t, flood * 0.8, 3, 0.2);
  ground(1220);
  // day one: the Gond army charges and the Mughals fall back
  const day1 = 1 - prog(t, c1 - 0.3, c1 + 0.2);
  if (day1 > 0) { ctx.save(); ctx.globalAlpha = day1;
    troop(t, { y: 1220, n: 8, s: 0.7, dir: 1, x: 300, speed: 120, kind: 'sword', hat: 'pagdi', banner: 4, bannerCol: '#c0392b' });
    for (let i = 0; i < 5; i++) actor(700 + i * 110 + t * 60, 1220, 0.65, t, { face: 1, walk: t * 8 + i, hat: 'turban', ...POSE.reach, lean: 0.2, ph: i });
    sparks(620, 1050, t, 0.5); sparks(700, 1000, t, 1.2, 14, 3);
    ctx.restore(); slam('पहले दिन: जीत', 220, t, at(0, 0.6), 88, { until: c1 }); }
  // day two: the river floods behind them, the enemy closes in
  if (flood > 0) {
    ctx.save(); ctx.globalAlpha = Math.min(1, flood * 1.5);
    water(lerp(1220, 1080, flood), t * 1.5, 0.7);
    mughalLine(t, lerp(400, 0, prog(t, c1, c2)), 1);
    raniElephant(330, 1220, 1.15, t, { arrows: t > c2 + 0.3, pose: poseMix(POSE.raise, POSE.strike, pulse(t, 0.9)) });
    ctx.restore();
    volley(t, c2, 1300, 500, 340, 920, 16, 7, 1.0, 140); volley(t, c2 + 1.4, 1300, 460, 360, 900, 16, 8, 1.0, 140);
    slam('दूसरा दिन  ·  नदी में बाढ़', 220, t, at(1, 0.45), 70, { until: c2 + 0.3 });
  }
  fgFrame(t, 'grass', 0.8);
  grade('blood', t, 0.25 * flood);
};

// ---------- FALL ----------
S.fall = (t) => {
  cam(t, { z: lerp(1.1, 1, prog(t, 0, D)) });
  bg(PAL.dusk2, 0, 540, 760);
  sun(540, lerp(760, 880, prog(t, 0, D)), 140, 0.8);
  hills(1060, 140, 961, 0.6); ground(1180);
  const kneel = prog(t, at(1, 0.2), at(2, 0.3));
  ctx.save(); ctx.translate(540, 1180); ctx.rotate(-0.0); ctx.translate(-540, -1180);
  elephant(380, 1180 + kneel * 30, 1.0, 0, 0);
  ctx.restore();
  // the sword planted in the earth, a lone glint
  const sw = prog(t, at(2, 0.4), at(2, 0.7));
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(740, 1180); ctx.lineTo(740, 1180 - 220 * sw); ctx.stroke(); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(705, 1180 - 180 * sw); ctx.lineTo(775, 1180 - 180 * sw); ctx.stroke(); ctx.restore();
  if (sw > 0.9) glow(740, 960, 120, '255,220,160', 0.6 * pulse(t, 0.5));
  for (let i = 0; i < 12; i++) { const k = ((t * 0.08 + i / 12) % 1); ctx.save(); ctx.globalAlpha = 0.7 * Math.sin(k * Math.PI); ctx.fillStyle = '#ffd9a0'; ctx.beginPath(); ctx.ellipse(200 + i * 60 + Math.sin(t + i) * 20, 1180 - k * 700, 5, 3, t + i, 0, 7); ctx.fill(); ctx.restore(); }
  slam('वीरगति', 260, t, at(2, 0.75), 120);
  quoteCard('“पीठ दिखाकर? कभी नहीं!”', 300, prog(t, at(0, 0.7), at(0, 0.7) + 0.3) * (1 - prog(t, at(1, 0), at(1, 0) + 0.3)), 70);
  grade('gold', t, 0.5);
};

// ---------- LEGACY ----------
S.legacy = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.dusk, PAL.dawn, now), 0, 540, 700);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now;
    cliffFort(540, 1180, 0.7, t, { torches: true }); ground(1180);
    fireRow(250, 830, 560, t, 0.5, 5, 0.6);
    ctx.restore(); chip('चौरागढ़  ·  वीर नारायण', 540, 220, 48, prog(t, 0.2, 0.7) * (1 - now)); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now;
    rays(540, 640, t, 0.07); sun(540, 640, 110, 0.7);
    colonnade(540, 1180, 0.85); ground(1180);
    for (let i = 0; i < 6; i++) actor(150 + i * 160, 1260, 0.6, t, { walk: t * 4 + i, hat: 'none', face: i % 2 ? 1 : -1, prop: i % 3 ? 'book' : null, ph: i });
    ctx.restore();
    slam('24 जून  ·  बलिदान दिवस', 220, t, at(1, 0.2), 76);
    chip('रानी दुर्गावती विश्वविद्यालय, जबलपुर', 540, 360, 42, prog(t, at(1, 0.6), at(1, 0.6) + 0.5)); }
};

S.end = (t) => endCard(t, 'अगली कहानी किसकी हो?');
