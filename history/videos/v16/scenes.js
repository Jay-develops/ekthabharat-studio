// @common2
// ---------------- video 16 - Krishnadevaraya & Vijayanagara ----------------
const KDR = { hat: 'none', hat2: 'mukut', moustache: true, cloth: '#d4a017' };
function boulders(t, y = 1180, a = 1) {   // Hampi's boulder hills
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(40,18,8,0.75)'; const r = rng(16);
  for (let i = 0; i < 14; i++) { const x = r() * W, rad = 60 + r() * 120; ctx.beginPath(); ctx.ellipse(x, y - rad * 0.6 - (i % 3) * 60, rad, rad * 0.75, r(), 0, 7); ctx.fill(); }
  ctx.restore();
}
function mandapa(x, y, s, a = 1) {   // pillared hall
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(-320, -40, 640, 40); ctx.fillRect(-340, -360, 680, 40); ctx.fillRect(-300, -400, 600, 40);
  for (let i = 0; i < 8; i++) { const cx = -280 + i * 80; ctx.fillRect(cx - 14, -320, 28, 280); ctx.fillRect(cx - 22, -200, 44, 30); }
  ctx.restore();
}
function gems(t, x, y, a) { if (a <= 0) return; const r = rng(9); for (let i = 0; i < 26; i++) { const gx = x + (r() - 0.5) * 260, gy = y - r() * 80; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = ['#ff6a6a', '#7ad0ff', '#ffe066', '#ffffff', '#7affb0'][i % 5]; ctx.translate(gx, gy); ctx.rotate(0.78); ctx.fillRect(-6, -6, 12, 12); ctx.restore(); glow(gx, gy, 20, '255,255,255', 0.3 * a * pulse(t * 2 + i)); } }

// ---------- HOOK ----------
S.hook_river = (t) => {
  const c1 = cue(1)[0], charge = prog(t, c1, D);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fy: 1000, shake: 4 + hit(t, 0.4, 0.6, 18) + hit(t, at(0, 0.5), 0.6, 18) });
  bg(PAL.battle, noise1(t * 3), 540, 700);
  hills(880, 200, 1601, 0.4); water(980, t, 0.4); ground(1200);
  boom(820, 1000, t, 0.4, 0.9, 3); boom(660, 980, t, at(0, 0.5), 0.8, 4); smoke(900, 1000, t, 6, 10, 1.2, 0.2);
  for (let i = 0; i < 6; i++) actor(300 + i * 90 - (1 - charge) * t * 30 + charge * (t - c1) * 200, 1200, 0.7, t, { hat: 'pagdi', face: charge > 0.1 ? 1 : -1, walk: t * 8 + i, wpn: 'sword', fa: charge > 0.1 ? [2.6, 0.2] : [1.4, -0.2], ph: i });
  rider(lerp(-200, 380, ss(charge * 1.5)), 1200, 1.15, t, { hat: 'none', wpn: 'sword', fa: [2.85, 0.1], rear: 0.25 * pulse(t, 0.8) });
  slam('1520  ·  रायचूर', 220, t, 0.15, 96, { until: c1 });
  fgFrame(t, 'grass', 0.8);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.temple, noise1(t * 2), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  boulders(t, 1200, 0.8); gopuram(820, 1200, 0.5); ground(1200);
  actor(430, 1210, 1.9, t, { ...KDR, ...POSE.raise, wpn: 'sword', eye2: 0.8, ph: 1 });
  title2(t, 'कृष्णदेवराय', 'विजयनगर  ·  1509 – 1529', { y: 220, size: 120 });
};

// ---------- HAMPI ----------
S.hampi = (t) => {
  const c1 = cue(1)[0], bazaar = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)) });
  bg(PAL.temple, 0, 540, 700);
  if (bazaar < 1) { ctx.save(); ctx.globalAlpha = 1 - bazaar;
    boulders(t, 1180); gopuram(300, 1180, 0.6); gopuram(820, 1180, 0.45, { tiers: 5 }); mandapa(560, 1180, 0.5); ground(1180);
    ctx.restore();
    slam('हम्पी', 230, t, 0.15, 130, { until: c1 }); chip('“रोम जितना बड़ा शहर”', 540, 380, 50, prog(t, at(0, 0.6), at(0, 0.8)) * (1 - bazaar)); }
  if (bazaar > 0) { ctx.save(); ctx.globalAlpha = bazaar;
    mandapa(540, 1180, 0.95); ground(1180);
    for (const [x, f, ph] of [[220, 1, 0], [860, -1, 2]]) actor(x, 1180, 1.1, t, { hat: 'pagdi', face: f, cloth: x < 540 ? '#2e8b7a' : '#c0392b', ...POSE.forward, ph });
    ctx.fillStyle = INK; ctx.fillRect(420, 1090, 240, 90);
    gems(t, 540, 1080, bazaar);
    ctx.restore(); chip('हीरे-मोती ढेरों में', 540, 300, 50, bazaar); }
};

// ---------- THE POET KING ----------
S.king = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(PAL.court, noise1(t * 2), 540, 700);
  mandapa(540, 1180, 1.05, 0.45); ground(1180);
  ctx.fillStyle = INK; ctx.fillRect(400, 1060, 280, 120);
  actor(540, 1060, 1.1, t, { ...KDR, seated: true, ...(t < c1 ? POSE.hold : POSE.point), prop: t < c1 ? 'book' : null, ph: 1 });
  scroll(540, 520, 520, 260, prog(t, at(0, 0.5), at(0, 0.7)) * (1 - prog(t, c1 - 0.3, c1)), ['आमुक्तमाल्यदा', 'తెలుగు'], {});
  if (t > c1) { for (let i = 0; i < 8; i++) { const a = prog(t, c1 + i * 0.12, c1 + i * 0.12 + 0.3); const x = i < 4 ? 90 + i * 80 : 760 + (i - 4) * 80; ctx.save(); ctx.globalAlpha = a; actor(x, 1180, 0.7, t, { hat: 'turban', face: i < 4 ? 1 : -1, seated: true, beard: i % 2 === 0, cloth: '#7a3cbf', ...POSE.pray, ph: i, shadow: false }); ctx.restore(); }
    slam('अष्टदिग्गज', 260, t, at(1, 0.5), 110); }
};

// ---------- RAICHUR ----------
S.raichur = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], win = prog(t, at(2, 0.4), at(2, 0.7));
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: t > c1 ? 5 + hit(t, c1 + 0.3, 0.6, 18) : 0 });
  bg(mixPal(PAL.battle, PAL.dawn, win), noise1(t * 3), 540, 700);
  if (t < c1) { fort(560, 1100, 0.8, t); ground(1180);
    for (let i = 0; i < 7; i++) actor(-50 + i * 50 + t * 20, 1250, 0.7, t, { hat: 'pagdi', walk: t * 5 + i, wpn: 'spear', fa: [0.5, -1.3], ph: i });
    slam('रायचूर क़िला', 220, t, 0.15, 90, { until: c1 }); chip('बीजापुर: आदिल शाह', 560, 360, 46, prog(t, at(0, 0.3), at(0, 0.5))); }
  else {
    hills(900, 200, 1611, 0.4); water(1000, t, 0.4); ground(1200);
    for (let i = 0; i < 3; i++) cannon(760 + i * 110 - win * 400, 1200, 0.8, -1, 0);
    for (let i = 0; i < 3; i++) boom(300 + i * 160, 1150, t, c1 + 0.4 + i * 0.9, 0.7, i + 2);
    if (win < 1) troop(t - c1, { y: 1220, n: 7, s: 0.7, dir: 1, x: 0, speed: 60, kind: 'sword', hat: 'pagdi', banner: 3, bannerCol: '#d4a017' });
    rider(lerp(200, 640, prog(t, c2, at(2, 0.4))), 1200, 1.1, t, { hat: 'none', wpn: 'sword', fa: [2.85, 0.1] });
    if (win > 0) for (let i = 0; i < 5; i++) actor(800 + i * 90 + win * 400, 1200, 0.7, t, { hat: 'turban', face: 1, walk: t * 9 + i, ...POSE.reach, lean: 0.25, ph: i });
    slam('रायचूर विजयनगर का!', 230, t, at(2, 0.75), 86);
  }
};

// ---------- TENALI RAMA ----------
S.tenali = (t) => {
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.court, 0, 540, 700); mandapa(540, 1180, 1.05, 0.4); ground(1180);
  ctx.fillStyle = INK; ctx.fillRect(560, 1060, 280, 120);
  actor(700, 1060, 1.0, t, { ...KDR, seated: true, face: -1, lean: Math.sin(t * 6) * 0.04, ...POSE.hips, ph: 1 });
  const hop = Math.abs(Math.sin(t * 4)) * 30;
  actor(330, 1180 - hop, 1.15, t, { hat: 'turban', moustache: true, cloth: '#2e8b3e', ...poseMix(POSE.wave, POSE.point, pulse(t, 0.7)), ph: 2, shadow: false });
  for (let i = 0; i < 4; i++) actor(80 + i * 60, 1180, 0.65, t, { hat: 'pagdi', ...POSE.hips, lean: Math.sin(t * 7 + i) * 0.05, ph: i });
  slam('तेनालीराम', 240, t, at(0, 0.6), 120);
  overlay(() => { for (let i = 0; i < 3; i++) { const k = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI); ctx.font = `700 54px ${SANS}`; ctx.fillStyle = GOLD; ctx.fillText('हा हा', 120 + i * 300, 700 - k * 200); ctx.restore(); } });
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.fire, PAL.dawn, now), noise1(t * 4), 540, 700);
  boulders(t, 1180, 0.9);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now; mandapa(540, 1180, 0.9); gopuram(860, 1180, 0.4); fireRow(150, 950, 1100, t, 0.8, 4); embers(t, 50, 161, 0.9); ground(1180); ctx.restore();
    slam('1565', 230, t, at(0, 0.4), 130, { until: c1 }); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now; rays(540, 620, t, 0.07); sun(540, 620, 120, 0.8);
    // ruins: broken pillars
    ctx.fillStyle = INK; for (let i = 0; i < 8; i++) { const h = [280, 180, 240, 120, 260, 200, 150, 230][i]; ctx.fillRect(220 + i * 80, 1180 - h, 30, h); } ctx.fillRect(200, 1180 - 300, 300, 26);
    gopuram(860, 1180, 0.4); ground(1180);
    ctx.restore(); slam('यूनेस्को विश्व धरोहर', 230, t, at(1, 0.45), 84); }
};

S.end = (t) => endCard(t, 'क्या आप कभी हम्पी गए हैं?');
