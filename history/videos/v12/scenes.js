// @common2
// ---------------- video 12 - Netaji's great escape ----------------
Object.assign(PAL, { night: ['#a9d2f0', '#2e5f8f', '#050f1c'], dawn: ['#f6d9cf', '#8d8fc0', '#1a2142'], day: ['#e8f1f5', '#8fb3c9', '#1c3040'] });   // icy winter-night look for this video
const NETAJI = { hat: 'none', hat2: 'cap', glasses: true, coat: true, cloth: '#5b6b3a' };
const PATHAN = { hat: 'pagdi', beard: true, coat: true, glasses: true };
const ERA = 0.45;
function house(x, y, s, t, lit = 1, door = 0) {   // a Calcutta town house
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-300, -520, 600, 520); ctx.fillRect(-330, -540, 660, 26); ctx.fillRect(-320, -300, 640, 18);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { if (r === 1 && c === 1) continue;
    const g = lit * (0.4 + 0.3 * noise1(t + r * 3 + c)); ctx.fillStyle = `rgba(255,200,110,${g})`; ctx.fillRect(-250 + c * 140, -470 + r * 240, 70, 130); ctx.fillStyle = INK; ctx.fillRect(-218 + c * 140, -470 + r * 240, 6, 130); }
  ctx.fillStyle = `rgba(255,214,140,${0.25 + 0.7 * door})`; ctx.fillRect(-110, -200, 90, 200);
  ctx.restore();
  if (door > 0) glow(x - 65 * s, y - 100 * s, 220 * s, '255,210,130', 0.5 * door);
}
function snowfall(t, a = 1, n = 90) { ctx.save(); ctx.fillStyle = 'rgba(240,245,255,0.85)'; for (let i = 0; i < n; i++) { const sp = 80 + (i * 37) % 90, x = ((i * 137) % W + t * 60 + Math.sin(t + i) * 30) % W, y = ((i * 211) % 1300 + t * sp) % 1300; ctx.globalAlpha = a * 0.8; ctx.beginPath(); ctx.arc(x, y, 2 + (i % 3), 0, 7); ctx.fill(); } ctx.restore(); }
function signboard(x, y, w, h, a, lines) {
  if (a <= 0) return;
  overlay(() => { ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(lerp(0.6, 1, easeOut(a)), lerp(0.6, 1, easeOut(a)));
    ctx.fillStyle = INK; ctx.fillRect(-w / 2 + 30, h / 2, 16, 260); ctx.fillRect(w / 2 - 46, h / 2, 16, 260);
    ctx.fillStyle = '#f2c230'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20);
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lines.forEach((l, i) => { ctx.font = `700 ${i ? 40 : 58}px ${SANS}`; ctx.fillText(l, 0, -h / 2 + 70 + i * 66); });
    ctx.restore(); });
}

// ---------- HOOK ----------
S.hook_house = (t) => {
  const c1 = cue(1)[0], door = prog(t, c1 - 0.2, c1 + 0.4) * (1 - prog(t, at(1, 0.8), D));
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fx: 420, fy: 1000 });
  bg(PAL.night, noise1(t * 2), 540, 700);
  stars(t, 0.5); moon(860, 330, 55);
  house(700, 1180, 0.9, t, 0.5, door);
  lampPost(330, 1180, 1.0, t);
  ground(1180);
  for (const [x, ph] of [[960, 0], [1040, 2]]) actor(x, 1180, 0.85, t, { face: -1, hat: 'none', hat2: 'topee', coat: true, ...POSE.hold, ph, eye2: 0.5 });
  // the 'Pathan' walks out to the waiting car
  const w = prog(t, at(1, 0.15), at(1, 0.7));
  if (t > c1) actor(lerp(640, 330, w), 1180, 1.2, t, { ...PATHAN, face: -1, walk: w > 0 && w < 1 ? t * 4 : null, ph: 1 });
  car(140, 1250, 0.75, t * 0, { face: -1, lights: prog(t, at(1, 0.75), at(1, 0.9)) });
  slam('कोलकाता  ·  17 जनवरी 1941', 220, t, 0.15, 70, { until: c1 });
  slam('रात 1:30', 340, t, 0.6, 64, { until: c1, color: CREAM });
  grade('archival', t, ERA); grade('night', t, 0.35);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.4))), shake: hit(t, 0, 0.6, 12) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1120, 140, 1201, 0.6); ground(1200);
  actor(540, 1220, 2.1, t, { ...NETAJI, ...POSE.salute, eye2: 0.8, ph: 1 });
  title2(t, 'नेताजी सुभाष चंद्र बोस', 'सबसे बड़ा फ़रार', { y: 220, size: 92 });
  grade('archival', t, ERA * 0.5);
};

// ---------- HOUSE ARREST ----------
S.arrest = (t) => {
  const c1 = cue(1)[0], days = prog(t, c1, D);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fx: 540, fy: 900 });
  bg(PAL.sepia, 0, 540, 700);
  house(540, 1180, 1.05, t, 0.2);
  ground(1180);
  for (const [x, f, ph] of [[140, 1, 0], [940, -1, 2]]) actor(x, 1180, 0.95, t, { face: f, hat: 'pagdi', prop: 'lathi', ...POSE.hold, ph });
  // the figure at the upper window, seated, beard growing
  ctx.save(); ctx.beginPath(); ctx.rect(398, 680, 74, 136); ctx.clip();
  actor(440, 800, 0.5, t, { ...NETAJI, hat2: null, cloth: null, coat: false, beard: days > 0.4, seated: true, ...POSE.hold, prop: 'book', shadow: false });
  ctx.restore();
  chip('नज़रबंद', 540, 220, 52, prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.3, c1)));
  if (t > c1) { const d = Math.floor(lerp(1, 40, days)); overlay(() => { ctx.save(); ctx.globalAlpha = prog(t, c1, c1 + 0.4); ctx.fillStyle = '#efe2c4'; ctx.fillRect(790, 260, 200, 200); ctx.fillStyle = '#b8231a'; ctx.fillRect(790, 260, 200, 50);
    ctx.fillStyle = '#1e1208'; ctx.font = `700 90px ${SERIF}`; ctx.textAlign = 'center'; ctx.fillText(String(d), 890, 410); ctx.font = `700 30px ${SANS}`; ctx.fillStyle = '#fff'; ctx.fillText('दिन', 890, 296); ctx.restore(); });
    chip('“अब मैं किसी से नहीं मिलूँगा”', 400, 360, 42, prog(t, c1 + 0.3, c1 + 0.8)); }
  grade('archival', t, ERA);
};

// ---------- THE CAR & THE TRAIN ----------
S.car = (t) => {
  const c1 = cue(1)[0], stn = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: 1.02 });
  bg(mixPal(PAL.night, PAL.sepia, stn), noise1(t * 2), 540, 700);
  if (stn < 1) { ctx.save(); ctx.globalAlpha = 1 - stn;
    stars(t, 0.5); moon(820, 330, 50);
    for (let i = 0; i < 7; i++) tree(((i * 220 - t * 260) % 1540 + 1540) % 1540 - 230, 1180, 0.9 + (i % 3) * 0.2, t, i);
    ground(1180);
    car(520, 1190, 1.0, t, { face: 1, lights: 1, speed: 14 });
    mapCard(t, prog(t, 0.2, 0.7), [[780, 640, 'कोलकाता', 0, 44], [620, 520, 'गोमो', 0, -24]], prog(t, 0.6, at(0, 0.8)), { x: 520, y: 330, w: 380, h: 380 });
    ctx.restore(); chip('ड्राइवर: भतीजा शिशिर बोस', 540, 220, 44, prog(t, 0.2, 0.7) * (1 - stn)); }
  if (stn > 0) { ctx.save(); ctx.globalAlpha = stn;
    colonnade(540, 980, 0.7); const go = prog(t, at(1, 0.7), D);
    train(900 + go * 500, 1160, 0.75, t, { n: 2, speed: go * 9 }); rails(1160, t, 0); ground(1172);
    actor(lerp(200, 520, prog(t, c1, at(1, 0.6))), 1250, 1.15, t, { ...PATHAN, walk: t * 4, prop: 'book', ph: 1 });
    ctx.restore(); chip('मोहम्मद ज़ियाउद्दीन  ·  बीमा एजेंट', 540, 220, 44, stn); slam('→ पेशावर', 340, t, at(1, 0.65), 70); }
  grade('archival', t, ERA);
};

// ---------- THE PASSES ----------
S.pass = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], news = prog(t, c2 - 0.3, c2 + 0.3);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, c2)), shake: news < 1 ? 2 : 0 });
  bg(mixPal(PAL.cold, PAL.sepia, news), 0, 540, 600);
  if (news < 1) { ctx.save(); ctx.globalAlpha = 1 - news;
    hills(760, 520, 1211, 0.55, '#1c2533'); hills(900, 360, 1212, 0.8, '#121924');
    ctx.fillStyle = 'rgba(235,240,250,0.65)'; for (const [x, y] of [[300, 420], [760, 470]]) { ctx.beginPath(); ctx.moveTo(x - 90, y + 90); ctx.lineTo(x, y); ctx.lineTo(x + 90, y + 90); ctx.lineTo(x + 40, y + 70); ctx.lineTo(x, y + 40); ctx.lineTo(x - 40, y + 80); ctx.fill(); }
    ground(1180, '#0d1118');
    const kab = prog(t, c1 + 0.5, at(1, 0.9));
    if (kab > 0) { ctx.save(); ctx.globalAlpha = (1 - news) * kab; palace(780, 1180, 0.5); ctx.restore(); }
    for (const [dx, p, ph] of [[0, PATHAN, 1], [-140, { hat: 'pagdi', beard: true, coat: true }, 3]]) actor(420 + dx + t * 8, 1180, 1.1, t, { ...p, walk: t * 3 + ph, lean: 0.15, ph });
    snowfall(t, 1 - news); fog(1050, t, 0.25, 4, '220,230,245');
    ctx.restore();
    chip('गूँगा-बहरा पठान बनकर', 540, 220, 46, prog(t, at(0, 0.5), at(0, 0.7)) * (1 - prog(t, c1 - 0.3, c1)));
    slam('काबुल', 240, t, at(1, 0.6), 110, { until: c2 });
    grade('cold', t, 0.6 * (1 - news)); }
  if (news > 0) { newspaper(540, 640, 800, 560, prog(t, c2 + 0.1, c2 + 0.7), 'सुभाष चंद्र बोस अपने घर से लापता!', 'जनवरी 1941', { masthead: 'कलकत्ता समाचार', size: 62 });
    stamp('10 दिन बाद पता चला', 540, 1020, t, at(2, 0.55), { size: 64 }); grade('archival', t, ERA * news); }
};

// ---------- BERLIN & THE SUBMARINE ----------
S.berlin = (t) => {
  const c1 = cue(1)[0], sub = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.map, PAL.night, sub), 0, 540, 700);
  if (sub < 1) { ctx.save(); ctx.globalAlpha = 1 - sub;
    mapCard(t, 1, [[700, 1000, 'काबुल', 0, 44], [600, 640, 'मॉस्को', 60, 0], [380, 520, 'बर्लिन', 0, -24]], prog(t, 0.4, at(0, 0.95)), { x: 200, y: 360, w: 680, h: 760 });
    ctx.restore(); chip('नया नाम: ओरलांडो मज़ोत्ता', 540, 230, 46, prog(t, 0.3, 0.8) * (1 - sub)); }
  if (sub > 0) { ctx.save(); ctx.globalAlpha = sub;
    stars(t, 0.6); moon(760, 380, 60); water(1040, t, 0.5);
    submarine(lerp(300, 620, prog(t, c1, D)), 1080, 1.1, t);
    ctx.restore(); slam('पनडुब्बी से एशिया', 240, t, at(1, 0.5), 84); grade('night', t, 0.35 * sub); }
  grade('archival', t, ERA);
};

// ---------- AZAD HIND FAUJ ----------
S.ina = (t) => {
  const c1 = cue(1)[0], roar = prog(t, c1, c1 + 0.3);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)) + bump(t, c1, 0.5, 0.06), fy: 1000, shake: hit(t, c1 + 0.2, 0.7, 16) });
  bg(PAL.fire, noise1(t * 3), 540, 760); rays(540, 760, t, 0.06 + 0.06 * roar); sun(540, 760, 130, 0.8);
  ground(1180);
  tiranga(150, 520, 260, 170, t, { pole: 660 }); tiranga(670, 520, 260, 170, t + 1, { pole: 660 });
  ctx.fillStyle = INK; ctx.fillRect(330, 1050, 420, 130);
  actor(540, 1050, 1.2, t, { ...NETAJI, ...poseMix(POSE.point, POSE.fist, roar), eye2: 0.9, ph: 1 });
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) actor(-20 + i * 140 + r * 70, 1290 + r * 30, 0.7 + r * 0.08, t, { hat: 'none', hat2: 'cap', coat: true, face: 1, ...(roar > 0 ? POSE.fist : POSE.salute), ph: i + r, shadow: false });
  chip('आज़ाद हिंद फ़ौज', 540, 220, 52, prog(t, 0.2, 0.7) * (1 - prog(t, c1 - 0.3, c1)));
  quoteCard('“तुम मुझे ख़ून दो… मैं तुम्हें आज़ादी दूँगा!”', 330, prog(t, c1 + 0.1, c1 + 0.5), 64);
  grade('archival', t, ERA * 0.6);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], stn = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.court, PAL.dawn, stn), 0, 540, 600);
  if (stn < 1) { ctx.save(); ctx.globalAlpha = 1 - stn;
    ctx.fillStyle = 'rgba(20,9,4,0.85)'; ctx.fillRect(-20, 120, W + 40, 1060);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,225,160,0.16)'; ctx.beginPath(); ctx.moveTo(480, 120); ctx.lineTo(600, 120); ctx.lineTo(900, 1180); ctx.lineTo(180, 1180); ctx.fill(); ctx.restore();
    car(560, 1150, 1.25, 0, { face: 1, speed: 0 });
    ctx.fillStyle = INK; for (const x of [150, 930]) { ctx.fillRect(x - 8, 1050, 16, 130); } ctx.strokeStyle = '#b8231a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(150, 1070); ctx.quadraticCurveTo(540, 1120, 930, 1070); ctx.stroke();
    ground(1180); ctx.restore();
    chip('नेताजी भवन, कोलकाता', 540, 220, 50, prog(t, at(0, 0.5), at(0, 0.8)) * (1 - stn)); }
  if (stn > 0) { ctx.save(); ctx.globalAlpha = stn; rays(540, 600, t, 0.07); ground(1180); rails(1180, t, 0);
    train(1300 - prog(t, c1, D) * 500, 1170, 0.6, t, { n: 2 }); ctx.restore();
    signboard(540, 560, 860, 300, prog(t, at(1, 0.4), at(1, 0.4) + 0.5), ['नेताजी सुभाष चंद्र बोस', 'जंक्शन  ·  गोमो']); }
  grade('archival', t, ERA * 0.6);
};

S.end = (t) => endCard(t, 'क्या 1945 में सच में नेताजी की मौत हुई थी?');
