// @common2
// ---------------- video 18 - Peshwa Bajirao ----------------
const BAJIRAO = { hat: 'pagdi', moustache: true, cloth: SAFF };
function redFort(x, y, s, gate = 0) {   // red sandstone walls with a domed gate
  ctx.save(); ctx.globalAlpha = 0.6; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-520, -260, 1040, 260); for (let i = 0; i < 26; i++) ctx.fillRect(-520 + i * 40, -290, 24, 32);
  ctx.fillRect(-130, -420, 260, 420); ctx.beginPath(); ctx.moveTo(-150, -420); ctx.lineTo(150, -420); ctx.lineTo(120, -460); ctx.lineTo(-120, -460); ctx.fill();
  for (const cx of [-90, 90]) { ctx.fillRect(cx - 34, -520, 68, 60); ctx.beginPath(); ctx.moveTo(cx - 44, -520); ctx.quadraticCurveTo(cx, -590, cx + 44, -520); ctx.fill(); }
  ctx.fillStyle = `rgba(255,214,150,${0.55 * (1 - gate)})`; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, -170); ctx.quadraticCurveTo(0, -250, 60, -170); ctx.lineTo(60, 0); ctx.fill();
  ctx.restore();
}
function cavalry(t, o = {}) { const n = o.n || 6, sp = o.speed || 260, dir = o.dir || 1; for (let i = 0; i < n; i++) { const x = (o.x || 0) + dir * (t * sp) - dir * i * (o.gap || 170) + (i % 2) * 40; rider(x, (o.y || 1200) + (i % 2) * 20, o.s || 0.75, t * 1.6, { hat: 'pagdi', wpn: i % 2 ? 'spear' : 'sword', fa: i % 2 ? [1.9, -0.5] : [2.6, 0.2], spearA: -1.3, ph: i }); if (o.flags && i % 3 === 0) bhagwa(x - 40, (o.y || 1200) - 140 * (o.s || 0.75), 300 * (o.s || 0.75), t + i); } }

// ---------- HOOK ----------
S.hook_delhi = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 950, shake: t > c1 ? 4 + hit(t, c1, 0.6, 16) : 0 });
  bg(t < c1 ? PAL.court : PAL.battle, noise1(t * 3), 540, 700);
  redFort(540, 1180, 0.85, prog(t, at(1, 0.3), at(1, 0.6)));
  ground(1180);
  // a messenger runs in; a guard bars the gate
  actor(lerp(-100, 380, prog(t, 0.2, at(0, 0.9))), 1180, 1.0, t, { hat: 'turban', walk: t * 9, ...POSE.reach, lean: 0.2, ph: 1 });
  if (t > c1) { dust(t, 0.4, 3, 1000, 1200); cavalry(t - c1, { x: -200, y: 1240, s: 0.6, n: 5, speed: 180, flags: true }); }
  slam('दिल्ली  ·  मार्च 1737', 220, t, 0.15, 80, { until: c1 });
  slam('मराठे दरवाज़े पर!', 260, t, at(1, 0.4), 96);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 160, 1801, 0.6); ground(1200);
  bhagwa(860, 1200, 560, t);
  rider(480, 1200, 1.45, t, { hat: 'pagdi', wpn: 'sword', fa: [2.85, 0.1], rear: 0.35 + 0.1 * pulse(t, 0.5), still: true });
  title2(t, 'पेशवा बाजीराव', '1700 – 1740', { y: 220, size: 112 });
  embers(t, 25, 181, 0.6);
};

// ---------- YOUNG PESHWA ----------
S.young = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, noise1(t * 2), 540, 700);
  ctx.save(); ctx.globalAlpha = 0.55; palace(540, 1060, 0.9); ctx.restore(); ground(1180);
  ctx.fillStyle = INK; ctx.fillRect(660, 1070, 280, 110);
  actor(800, 1070, 1.0, t, { hat: 'crown', beard: true, seated: true, face: -1, cloth: '#d4a017', ...POSE.point, ph: 1 });
  actor(470, 1180, 1.2, t, { ...BAJIRAO, ...POSE.pray, lean: 0.15 * (1 - prog(t, at(0, 0.7), at(0, 0.9))), eye2: 0.9, ph: 2 });
  slam('20 वर्ष  ·  पेशवा', 230, t, at(0, 0.4), 96, { until: c1 });
  if (t > c1) { for (const [x, ph] of [[120, 0], [220, 2], [960, 4]]) actor(x, 1180, 0.85, t, { hat: 'turban', beard: true, face: x < 500 ? 1 : -1, ...POSE.hips, lean: Math.sin(t * 7 + ph) * 0.05, ph });
    quoteCard('“एक लड़का?”', 330, prog(t, c1 + 0.2, c1 + 0.5), 80); }
};

// ---------- SPEED ----------
S.speed = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: 1.04, shake: 3 });
  bg(PAL.day, 0, 540, 700);
  const sp = t * 500;
  ctx.save(); ctx.translate(-(sp * 0.15) % 400, 0); hills(900, 260, 1811, 0.3); ctx.restore();
  for (let i = 0; i < 5; i++) tree(((i * 300 - sp * 0.6) % 1500 + 1500) % 1500 - 200, 1180, 0.9, t, i);
  ground(1200); dust(t * 3, 0.35, 5, 1050, 1250);
  cavalry(0, { x: 900, y: 1200, s: 0.75, n: 6, speed: 0, gap: 150, flags: true });
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = '#ffe2b8'; ctx.lineWidth = 4; const y = 950 + i * 40; ctx.beginPath(); ctx.moveTo(((i * 210 - t * 900) % 1300 + 1300) % 1300 - 100, y); ctx.lineTo(((i * 210 - t * 900) % 1300 + 1300) % 1300 + 120, y); ctx.stroke(); ctx.restore(); }
  slam('रफ़्तार', 230, t, 0.2, 130, { until: c1 });
  if (t > c1) mapCard(t, prog(t, c1, c1 + 0.4), [[300, 500, 'तैयारी यहाँ', 0, -24], [760, 780, 'हमला यहाँ!', 0, 44]], prog(t, c1 + 0.3, at(1, 0.8)), { x: 150, y: 300, w: 780, h: 600 });
};

// ---------- PALKHED ----------
S.palkhed = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  // a ring of Maratha riders closing around the Nizam's camp
  ctx.save(); ctx.fillStyle = 'rgba(176,132,82,0.45)'; ctx.beginPath(); ctx.ellipse(540, 700, 400, 330, 0, 0, 7); ctx.fill(); ctx.restore();
  for (const [x, y] of [[480, 660], [600, 700], [540, 760]]) tent(x, y, 0.8, 0.2);
  chip('निज़ाम की फ़ौज', 540, 560, 40, prog(t, 0.2, 0.6));
  const close = ss(prog(t, 0.4, at(0, 0.8)));
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * 0.15, r = lerp(470, 320, close); const x = 540 + Math.cos(a) * r, y = 700 + Math.sin(a) * r * 0.8; ctx.save(); ctx.translate(x, y); ctx.scale(0.18, 0.18); ctx.restore(); rider(x, y + 20, 0.2, t, { hat: 'pagdi', wpn: 'spear', fa: [1.9, -0.5], spearA: -1.3, ph: i }); }
  stamp('रसद-पानी बंद', 540, 1150, t, at(0, 0.6), { size: 64 });
  slam('पालखेड़  ·  1728', 220, t, 0.15, 84);
  if (t > c1) { legendTag(t, prog(t, c1, c1 + 0.3)); chip('मोंटगोमरी: “रणनीति की मिसाल”', 540, 380, 44, prog(t, at(1, 0.5), at(1, 0.7))); }
};

// ---------- BUNDELKHAND ----------
S.bundel = (t) => {
  const brk = prog(t, at(0, 0.55), at(0, 0.8));
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: hit(t, at(0, 0.55), 0.6, 16) });
  bg(mixPal(PAL.battle, PAL.dawn, brk), noise1(t * 3), 540, 700);
  fort(540, 1050, 0.75, t); ground(1180);
  actor(540, 770, 0.8, t, { hat: 'pagdi', beard: true, cloth: '#2e6b8a', ...poseMix(POSE.mourn, POSE.raise, brk), ph: 1, shadow: false });
  for (let i = 0; i < 6; i++) actor(200 + i * 140 + brk * (i % 2 ? 600 : -600), 1180, 0.75, t, { hat: 'turban', face: i % 2 ? 1 : -1, walk: brk > 0 ? t * 9 + i : null, ...(brk > 0 ? POSE.reach : POSE.spearUp), wpn: brk > 0 ? null : 'spear', ph: i });
  if (t > at(0, 0.4)) cavalry(t - at(0, 0.4), { x: -300, y: 1240, s: 0.65, n: 5, speed: 320, flags: true });
  chip('राजा छत्रसाल', 540, 300, 46, prog(t, 0.2, 0.6));
  slam('घेरा टूटा', 230, t, at(0, 0.8), 110);
};

// ---------- THE RAID ----------
S.raid = (t) => {
  const c1 = cue(1)[0], gate = prog(t, at(1, 0.15), at(1, 0.4));
  cam(t, { z: lerp(1, 1.1, prog(t, 0, c1)), shake: t < c1 ? 4 : 0 });
  bg(t < c1 ? PAL.battle : PAL.dusk, noise1(t * 3), 540, 700);
  if (t < c1) { mapCard(t, 1, [[480, 1000, 'पुणे', 0, 44], [480, 420, 'दिल्ली', 0, -24]], ss(prog(t, 0.3, at(0, 0.9))), { x: 200, y: 260, w: 680, h: 860 });
    const k = ss(prog(t, 0.3, at(0, 0.9))); rider(480 + Math.sin(k * 6) * 12, lerp(1000, 420, k) + 30, 0.3, t * 2, { hat: 'pagdi', wpn: 'sword', fa: [2.6, 0.2] }); }
  else { redFort(540, 1180, 0.85, gate); ground(1180);
    cavalry(0, { x: 420, y: 1240, s: 0.7, n: 4, speed: 0, gap: 140, flags: true });
    const back = prog(t, at(1, 0.6), D); if (back > 0) { ctx.save(); ctx.globalAlpha = 1 - back; ctx.restore(); }
    stamp('दरवाज़े बंद!', 540, 420, t, at(1, 0.35), { size: 84 });
    slam('संदेश पहुँच गया', 260, t, at(1, 0.75), 84); }
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1.08, 1, prog(t, 0, D)) });
  bg(PAL.dusk2, 0, 540, 760); sun(540, 800, 140, 0.8);
  water(1040, t, 0.45);
  if (t < c1) { tent(540, 1040, 1.6, 0.5); bhagwa(760, 1040, 380, t); actor(330, 1040, 1.0, t, { hat: 'pagdi', ...POSE.mourn, ph: 1 }); slam('1740  ·  नर्मदा तट', 230, t, at(0, 0.2), 84); }
  else { ctx.fillStyle = INK; ctx.fillRect(400, 900, 280, 140); ctx.beginPath(); ctx.moveTo(380, 900); ctx.quadraticCurveTo(540, 760, 700, 900); ctx.fill(); bhagwa(560, 780, 160, t);
    rays(540, 800, t, 0.06); chip('समाधि  ·  रावेरखेड़ी', 540, 300, 48, prog(t, c1, c1 + 0.5)); }
  grade('gold', t, 0.5);
};

S.end = (t) => endCard(t, 'बाजीराव की सबसे बड़ी ताक़त क्या थी?');
