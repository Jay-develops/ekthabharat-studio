// @common2
// ---------------- video 20 - Rani Chennamma of Kittur ----------------
const RANI = { woman: true, hat: 'none', hat2: 'mukut', cloth: '#2e8b3e' };
const KGOLD = '#e0a020';
function kitturFort(x, y, s, gate = 0, a = 0.6) {   // stone walls, two bastions and a gate that swings open (gate 0..1)
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-520, -300, 1040, 300); for (let i = 0; i < 24; i++) ctx.fillRect(-520 + i * 44, -330, 26, 34);
  for (const bx of [-420, 420]) { ctx.beginPath(); ctx.moveTo(bx - 90, 0); ctx.lineTo(bx - 80, -420); ctx.quadraticCurveTo(bx, -470, bx + 80, -420); ctx.lineTo(bx + 90, 0); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,214,150,0.5)'; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-90, -200); ctx.quadraticCurveTo(0, -270, 90, -200); ctx.lineTo(90, 0); ctx.fill();
  ctx.fillStyle = INK; ctx.fillRect(-90, -200, 90 * (1 - gate), 200); ctx.fillRect(90 - 90 * (1 - gate), -200, 90 * (1 - gate), 200);
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_gate = (t) => {
  const c1 = cue(1)[0], open = prog(t, at(0, 0.6), at(0, 0.85)), out = prog(t, at(0, 0.8), D);
  cam(t, { z: lerp(1, 1.18, prog(t, 0, D)), fy: 1000, shake: hit(t, at(0, 0.85), 0.6, 14) });
  bg(PAL.battle, noise1(t * 3), 540, 760);
  kitturFort(540, 1180, 0.9, open); ground(1180);
  for (let i = 0; i < 6; i++) redcoat(60 + i * 70, 1250, 0.7, { face: 1, still: true });
  for (let i = 0; i < 2; i++) cannon(130 + i * 160, 1260, 0.7, 1, 0);
  rider(lerp(540, 680, ss(out)), 1180, 1.15 + 0.15 * out, t * (out > 0 ? 1 : 0), { woman: true, hat: 'none', wpn: 'sword', fa: [2.85, 0.1], rear: 0.3 * pulse(t, 0.7) * out, still: out === 0, face: -1 });
  if (t > c1) { glow(700, 760, 180, '255,200,120', 0.35); }
  slam('कित्तूर  ·  अक्टूबर 1824', 220, t, 0.15, 76, { until: c1 });
  fgFrame(t, 'grass', 0.8);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 150, 2001, 0.6); ground(1200);
  bhagwa(860, 1200, 520, t, KGOLD);
  actor(470, 1210, 1.9, t, { ...RANI, ...POSE.raise, wpn: 'sword', ph: 1 });
  title2(t, 'रानी चेन्नम्मा', 'कित्तूर  ·  1824', { y: 220, size: 116 });
  embers(t, 25, 201, 0.6);
};

// ---------- LOSS & THE ADOPTED HEIR ----------
S.loss = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  bg(t < c1 ? PAL.dusk2 : PAL.court, 0, 540, 700);
  ctx.save(); ctx.globalAlpha = 0.5; palace(540, 1060, 0.9); ctx.restore(); ground(1180);
  if (t < c1) { lamp(330, 1180, 1.3, t); lamp(750, 1180, 1.3, t);
    actor(540, 1180, 1.3, t, { ...RANI, ...POSE.mourn, ph: 1 });
    chip('राजा मल्लसर्ज', 540, 300, 46, prog(t, 0.2, 0.6) * (1 - prog(t, at(0, 0.5), at(0, 0.6))));
    chip('1824: इकलौता बेटा भी', 540, 300, 46, prog(t, at(0, 0.6), at(0, 0.75))); }
  else {
    actor(380, 1180, 1.3, t, { ...RANI, ...POSE.reach, sh: [0.6, 0.2], ph: 1 });
    actor(520, 1180, 0.6, t, { hat: 'pagdi', ...POSE.pray, ph: 2 });
    chip('शिवलिंगप्पा', 520, 1260, 40, prog(t, c1, c1 + 0.5));
    if (t > at(1, 0.55)) { actor(860, 1180, 1.1, t, { hat: 'none', hat2: 'topee', coat: true, face: -1, ...POSE.point, ph: 3 }); stamp('वारिस नहीं!', 700, 420, t, at(1, 0.6), { size: 76 }); }
    if (t > c2) { overlay(() => { const a = prog(t, c2, c2 + 0.5); ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 18; i++) { const r = rng(i + 3); ctx.fillStyle = '#ffd34a'; ctx.beginPath(); ctx.ellipse(420 + r() * 240, 560 + r() * 80 - i * 3, 22, 8, 0, 0, 7); ctx.fill(); } ctx.restore(); chip('ख़ज़ाना', 540, 470, 50, a); }); }
  }
};

// ---------- THE DEMAND ----------
S.demand = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1000, shake: hit(t, c1 + 0.3, 0.6, 12) });
  bg(PAL.battle, noise1(t * 2), 540, 760);
  kitturFort(540, 1180, 0.9, 0); ground(1180);
  rider(260, 1180, 1.0, t, { hat: 'none', wpn: 'sword', fa: [1.62, 0], still: true });
  chip('कलेक्टर थैकरे', 260, 820, 42, prog(t, 0.3, 0.8));
  troop(t, { y: 1250, n: 6, s: 0.6, dir: 1, x: -300, speed: 40, kind: 'redcoat' });
  quoteCard('“दरवाज़ा खोलो!”', 330, prog(t, at(0, 0.6), at(0, 0.6) + 0.3) * (1 - prog(t, c1 - 0.3, c1)), 76);
  if (t > c1) { actor(540, 912, 0.9, t, { ...RANI, face: -1, ...POSE.raise, wpn: 'sword', ph: 1, shadow: false }); glow(540, 700, 160, '255,200,120', 0.4); stamp('जवाब: तलवार', 540, 380, t, at(1, 0.5), { size: 80 }); }
};

// ---------- THE FIRST BATTLE ----------
S.battle = (t) => {
  const c1 = cue(1)[0], cap = prog(t, at(0, 0.6), at(0, 0.8));
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: t < c1 ? 6 + hit(t, 0.3, 0.6, 18) : 0 });
  bg(t < c1 ? PAL.battle : PAL.court, noise1(t * 4), 540, 760);
  if (t < c1) { kitturFort(540, 1100, 0.7, 1, 0.45); ground(1180); dust(t, 0.4, 3);
    troop(t, { y: 1200, n: 7, s: 0.75, dir: 1, x: -100, speed: 200, kind: 'sword', hat: 'pagdi', banner: 3, bannerCol: KGOLD });
    for (let i = 0; i < 4; i++) redcoat(700 + i * 90 + cap * 300, 1200, 0.75, { face: -1, rot: i === 0 ? -1.3 * cap : 0 });
    muzzle(650, 990, t, 0.8, -1, 1); sparks(620, 1000, t, 1.2);
    chip('थैकरे मारा गया', 540, 300, 48, cap); }
  else { ground(1180);
    for (const x of [300, 420]) actor(x, 1180, 1.0, t, { hat: 'none', hat2: 'topee', coat: true, ...POSE.mourn, still: true, ph: x });
    actor(760, 1180, 1.3, t, { ...RANI, face: -1, ...POSE.forward, ph: 1 });
    scroll(540, 520, 520, 260, prog(t, c1 + 0.3, c1 + 0.8), ['वादा', 'अब लड़ाई नहीं होगी'], {}); }
  slam('पहली जीत: कित्तूर', 220, t, at(0, 0.3), 80, { until: c1 });
};

// ---------- BETRAYAL & CAPTURE ----------
S.betray = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: t < c1 ? 5 + hit(t, at(0, 0.4), 0.6, 18) : 0 });
  bg(t < c1 ? PAL.blood : PAL.jail, noise1(t * 3), 540, 760);
  if (t < c1) { kitturFort(540, 1180, 0.85, 1); ground(1180);
    for (let i = 0; i < 4; i++) cannon(80 + i * 140, 1250, 0.75, 1, 0);
    for (let i = 0; i < 4; i++) boom(500 + i * 130, 950 - (i % 2) * 80, t, 0.4 + i * 0.7, 0.8, i + 4);
    troop(t, { y: 1260, n: 8, s: 0.65, dir: 1, x: -200, speed: 90, kind: 'redcoat' });
    stamp('वादा टूटा', 540, 360, t, 0.4, { size: 84 });
    slam('दिसंबर 1824', 240, t, at(0, 0.7), 80); }
  else { ctx.fillStyle = INK; ctx.fillRect(-20, 300, W + 40, 120); ground(1180);
    actor(540, 1180, 1.3, t, { ...RANI, hat2: null, ...POSE.mourn, ph: 1 });
    bars(0.85, 160, 920, 110);
    chip('बैलहोंगल क़िला', 540, 520, 46, prog(t, c1, c1 + 0.5)); slam('1829', 260, t, at(1, 0.6), 110); grade('archival', t, 0.4); }
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.battle, PAL.dawn, now), noise1(t * 2), 540, 700);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now; hills(950, 220, 2011, 0.5); for (let i = 0; i < 4; i++) tree(120 + i * 280, 1180, 1.1, t, i); ground(1180);
    actor(540, 1180, 1.35, t, { hat: 'pagdi', moustache: true, cloth: KGOLD, ...POSE.raise, wpn: 'sword', ph: 1 });
    for (let i = 0; i < 4; i++) actor(200 + i * 60 + (i > 1 ? 480 : 0), 1200, 0.7, t, { hat: 'pagdi', ...POSE.fist, wpn: 'spear', ph: i });
    ctx.restore(); chip('संगोल्ली रायन्ना', 540, 300, 50, prog(t, 0.2, 0.7) * (1 - now)); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now; rays(540, 640, t, 0.08); sun(540, 640, 120, 0.85);
    ctx.save(); ctx.globalAlpha = 0.45 * now; ctx.fillStyle = INK; ctx.fillRect(-20, 700, W + 40, 40); ctx.fillRect(-20, 1100, W + 40, 80);
    for (let i = 0; i < 14; i++) ctx.fillRect(10 + i * 78, 740, 30, 360); ctx.restore(); ground(1180);
    ctx.fillStyle = INK; ctx.fillRect(400, 1020, 280, 160); ctx.fillRect(380, 1006, 320, 18);
    glow(540, 800, 200, '255,220,150', 0.4);
    actor(540, 1006, 1.3, 0, { ...RANI, cloth: null, ...POSE.raise, wpn: 'sword', still: true, shadow: false });
    ctx.restore(); chip('संसद भवन परिसर', 540, 300, 50, prog(t, at(1, 0.3), at(1, 0.6))); }
};

S.end = (t) => endCard(t, 'क्या आपने रानी चेन्नम्मा के बारे में सुना था?');
