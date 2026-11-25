// @common2
// ---------------- video 19 - Nalanda Mahavihara ----------------
const MONK = { hat: 'none', cloth: '#c8641a' };
function leaves(x, y, s, n = 6, a = 1, burn = 0) {   // stack of palm-leaf manuscripts tied with cord
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? '#d9b77a' : '#c9a464'; ctx.fillRect(-110 + (i % 3) * 3, -i * 14, 220, 12); }
  ctx.fillStyle = '#5a2a10'; ctx.fillRect(-60, -n * 14, 6, n * 14); ctx.fillRect(56, -n * 14, 6, n * 14);
  if (burn > 0) { ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = `rgba(30,10,4,${burn})`; ctx.fillRect(-120, -n * 14, 240 * burn, n * 14 + 4); }
  ctx.restore();
}
function shelves(x, y, s, t, lit = 0) {   // library shelves full of manuscripts
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-300, -620, 600, 620); ctx.fillStyle = 'rgba(255,200,120,' + (0.2 + 0.25 * lit) + ')';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) ctx.fillRect(-270 + c * 190, -590 + r * 118, 160, 96);
  ctx.restore();
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) leaves(x + (-190 + c * 190) * s, y + (-500 + r * 118) * s, 0.55 * s, 5);
}
function backpack(x, y, s, p) {   // Xuanzang's travelling frame
  inFrame(x, y, s, p, (o) => { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.fillStyle = INK;
    ctx.strokeRect(-70, -300 + o, 44, 170); ctx.fillRect(-66, -250 + o, 36, 60);
    ctx.beginPath(); ctx.moveTo(-48, -300 + o); ctx.lineTo(-48, -350 + o); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-48, -352 + o, 50, 10, 0, 0, 7); ctx.fill(); ctx.restore(); });
}

// ---------- HOOK ----------
S.hook_fire = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1.0, 1.15, prog(t, 0, D)), fy: 1000, shake: 2 });
  bg(PAL.fire, noise1(t * 4), 540, 800);
  ctx.save(); ctx.globalAlpha = 0.6; vihara(540, 1180, 1.25, 1, t); ctx.restore();
  fireRow(120, 960, 1000, t, 1.1, 3, 0.9); flames(300, 800, 0.9, t, 4); flames(780, 760, 1.0, t, 5);
  smoke(540, 600, t, 7, 12, 1.6, 0.25); embers(t, 70, 191, 1);
  ground(1180);
  // falling burning leaves
  for (let i = 0; i < 8; i++) { const k = (t * 0.25 + i / 8) % 1, x = 120 + i * 120 + Math.sin(t + i) * 30, y = lerp(500, 1150, k); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + i); ctx.fillStyle = '#d9b77a'; ctx.globalAlpha = 1 - k; ctx.fillRect(-30, -5, 60, 10); ctx.restore(); }
  slam('बिहार  ·  लगभग 1200 ईस्वी', 220, t, 0.15, 72, { until: c1 });
  if (t > c1) legendTag(t, prog(t, c1, c1 + 0.3));
  grade('blood', t, 0.25);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))) });
  bg(PAL.temple, noise1(t * 2), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  ctx.save(); ctx.globalAlpha = 0.6; vihara(540, 1220, 1.0, 0.6, t); stupa(900, 1220, 0.5); ctx.restore(); ground(1220);
  for (let i = 0; i < 5; i++) actor(160 + i * 190, 1240, 0.9, t, { ...MONK, walk: t * 3 + i, prop: 'book', ph: i });
  title2(t, 'नालंदा', 'ज्ञान का महाविहार', { y: 220, size: 140 });
};

// ---------- CAMPUS ----------
S.campus = (t) => {
  const c1 = cue(1)[0], busy = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fx: 540, fy: lerp(900, 1050, prog(t, 0, D)) });
  bg(PAL.day, 0, 540, 700); hills(950, 140, 1911, 0.25);
  ctx.save(); ctx.globalAlpha = 0.6; vihara(260, 1150, 0.62, 0, t); vihara(800, 1150, 0.62, 0, t); stupa(540, 1150, 0.6); ctx.restore();
  ground(1180);
  slam('पाँचवीं सदी  ·  गुप्त काल', 220, t, 0.15, 76, { until: c1 });
  if (busy > 0) { ctx.save(); ctx.globalAlpha = busy;
    for (let i = 0; i < 9; i++) actor(((i * 150 + t * (i % 2 ? 40 : -40)) % 1300 + 1300) % 1300 - 100, 1200 + (i % 3) * 30, 0.7, t, { ...MONK, face: i % 2 ? 1 : -1, walk: t * 4 + i, prop: i % 3 === 0 ? 'book' : null, ph: i });
    ctx.restore(); chip('हज़ारों विद्यार्थी  ·  हज़ारों शिक्षक', 540, 360, 46, busy); }
  chip('700 साल', 540, 460, 52, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - busy));
};

// ---------- THE GATE EXAM ----------
S.exam = (t) => {
  const q = at(0, 0.45), back = prog(t, at(0, 0.7), D);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, 0, 540, 700);
  // the gateway
  ctx.fillStyle = INK; ctx.fillRect(330, 560, 80, 620); ctx.fillRect(670, 560, 80, 620); ctx.fillRect(300, 520, 480, 70);
  ctx.fillStyle = 'rgba(255,214,150,0.35)'; ctx.fillRect(410, 590, 260, 590);
  ground(1180);
  actor(560, 1180, 1.15, t, { ...MONK, face: -1, beard: true, ...poseMix(POSE.idle, POSE.point, prog(t, q - 0.2, q)), prop: 'staff', ph: 1 });
  // hopefuls arrive, most turn away
  for (let i = 0; i < 4; i++) { const leave = i < 3 && back > i * 0.25; actor(lerp(240, -200, leave ? prog(t, at(0, 0.7) + i * 0.4, at(0, 0.7) + i * 0.4 + 1.2) : 0) - i * 90, 1180, 0.95, t, { hat: 'pagdi', face: leave ? -1 : 1, walk: leave ? t * 6 + i : null, ...(leave ? {} : POSE.pray), ph: i + 2 }); }
  if (t > q) overlay(() => { for (let k = 0; k < 3; k++) { const a = prog(t, q + k * 0.25, q + k * 0.25 + 0.3); if (a > 0) chip('?', 620 + k * 90, 760 - k * 40, 70, a * (1 - back * 0.6)); } });
  stamp('दाख़िला: सबसे कठिन परीक्षा', 540, 330, t, at(0, 0.2), { size: 58 });
};

// ---------- XUANZANG ----------
S.xuanzang = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  if (t < c1 + 0.2) {
    const k = ss(prog(t, 0.3, at(0, 0.9)));
    mapCard(t, 1, [[820, 360, 'चीन', 0, -24], [300, 760, 'नालंदा', 0, 44]], k, { x: 120, y: 260, w: 840, h: 700 });
    const p = { hat: 'none', walk: t * 6, ph: 1 };
    const x = lerp(820, 300, k), y = lerp(360, 760, k) + 40; actor(x, y, 0.32, t, p); backpack(x, y, 0.32, p);
    chip('ह्वेन त्सांग  ·  सातवीं सदी', 540, 1150, 48, prog(t, 0.2, 0.7));
  } else {
    const pts = [[540, 720, 'नालंदा', 0, 44], [880, 420, 'चीन', 0, -24], [940, 560, 'कोरिया', 0, -24], [560, 420, 'तिब्बत', 0, -24], [860, 1000, 'इंडोनेशिया', 0, 44]];
    mapCard(t, 1, pts.slice(0, 1), 1, { x: 120, y: 260, w: 840, h: 860 });
    pts.slice(1).forEach(([x, y, n], i) => { const a = prog(t, c1 + i * 0.35, c1 + i * 0.35 + 0.5); if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a; ctx.setLineDash([12, 10]); ctx.strokeStyle = '#8a3a14'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(lerp(x, 540, a), lerp(y, 720, a)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#5a240c'; ctx.font = `700 38px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText(n, x, y - 24); ring(x, y, t, a); ctx.restore(); });
    slam('पूरा एशिया', 220, t, at(1, 0.5), 96);
  }
};

// ---------- THE LIBRARY ----------
S.library = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1.05, 1.15, prog(t, 0, D)), fy: 950 });
  bg(PAL.temple, noise1(t * 2), 540, 650); rays(540, 500, t, 0.07);
  shelves(540, 1180, 1.1, t, 0.6 + 0.4 * pulse(t, 0.5)); ground(1180);
  for (const [x, f] of [[150, 1], [930, -1]]) actor(x, 1180, 1.0, t, { ...MONK, face: f, ...POSE.hold, prop: 'book', ph: x });
  slam('धर्मगंज', 230, t, at(0, 0.2), 130, { until: c1 + 0.4 });
  if (t > c1) overlay(() => { ['बौद्ध दर्शन', 'गणित', 'व्याकरण', 'चिकित्सा', 'खगोल'].forEach((s, i) => { const a = prog(t, c1 + i * 0.4, c1 + i * 0.4 + 0.3); if (a > 0) chip(s, i % 2 ? 760 : 320, 300 + i * 90, 48, a); }); });
};

// ---------- THE ATTACK ----------
S.attack = (t) => {
  const c1 = cue(1)[0], burn = prog(t, c1, D);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: 4 + hit(t, c1 + 0.2, 0.6, 16) });
  bg(mixPal(PAL.battle, PAL.fire, burn), noise1(t * 4), 540, 760);
  ctx.save(); ctx.globalAlpha = 0.6; vihara(560, 1180, 0.9, burn, t); ctx.restore();
  if (burn > 0) { fireRow(240, 880, 1000, t, 0.9 * burn, 6); smoke(560, 700, t, 9, 10, 1.4, 0.22 * burn); embers(t, 50, 192, burn); }
  ground(1180);
  if (t < c1 + 0.3) for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) rider(-300 + i * 220 + t * 120 + r * 100, 1180 + r * 60, 0.6 + r * 0.12, t * 1.5, { hat: 'turban', wpn: 'sword', fa: [2.6, 0.2], ph: i + r });
  else for (let i = 0; i < 4; i++) leaves(260 + i * 190, 1170, 0.7, 4, 1, prog(t, c1 + 0.4 + i * 0.3, c1 + 1.4 + i * 0.3));
  chip('बख़्तियार ख़िलजी', 540, 260, 46, prog(t, 0.3, 0.8) * (1 - prog(t, c1 - 0.3, c1)));
  stamp('नालंदा ख़ामोश', 540, 360, t, at(1, 0.7), { size: 80 });
  grade('blood', t, 0.25 + 0.2 * burn);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], nw = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.dawn, PAL.day, nw), 0, 540, 700); rays(540, 640, t, 0.08); sun(540, 640, 130, 0.9);
  if (nw < 1) { ctx.save(); ctx.globalAlpha = 1 - nw;
    // ruins: the stepped brick walls of today's site
    ctx.fillStyle = 'rgba(30,12,5,0.8)'; for (let i = 0; i < 5; i++) ctx.fillRect(140 + i * 70, 1180 - (i + 1) * 60, 800 - i * 140, 60);
    for (let i = 0; i < 6; i++) { ctx.fillStyle = HOLE; ctx.fillRect(180 + i * 130, 1140, 40, 30); }
    for (const x of [120, 960]) { ctx.fillStyle = 'rgba(30,12,5,0.8)'; ctx.fillRect(x - 40, 900, 80, 280); }
    ground(1180); ctx.restore();
    slam('2016  ·  यूनेस्को विश्व धरोहर', 230, t, at(0, 0.5), 72, { until: c1 }); }
  if (nw > 0) { ctx.save(); ctx.globalAlpha = nw;
    ctx.fillStyle = INK; ctx.fillRect(200, 860, 680, 320); for (let i = 0; i < 7; i++) { ctx.fillStyle = 'rgba(255,214,150,0.5)'; ctx.fillRect(240 + i * 92, 920, 50, 70); ctx.fillRect(240 + i * 92, 1040, 50, 70); }
    ground(1180);
    for (let i = 0; i < 6; i++) actor(120 + i * 170, 1240, 0.8, t, { hat: 'none', hat2: i % 3 === 0 ? 'bun' : null, woman: i % 3 === 0, walk: t * 4 + i, prop: 'book', ph: i });
    ctx.restore(); slam('नया नालंदा विश्वविद्यालय', 230, t, at(1, 0.4), 78); }
};

S.end = (t) => endCard(t, 'नालंदा में आप कौन-सा विषय पढ़ते?');
