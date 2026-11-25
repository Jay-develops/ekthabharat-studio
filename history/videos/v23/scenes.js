// @common2
// ---------------- video 23 - Guru Tegh Bahadur Ji ----------------
// The Gurus are never drawn as figures: they appear only as light.
const PANDIT = { hat: 'none', hat2: 'shikha', beard: true, cloth: '#e9e2cf' };
const SIKH = { hat: 'pagdi', beard: true, cloth: '#e06a1a' };
function guruLight(x, y, r, t, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter';
  glow(x, y, r * 2.2, '255,200,110', 0.35); glow(x, y, r * 1.2, '255,230,170', 0.6); glow(x, y, r * 0.5, '255,250,230', 0.9);
  ctx.restore();
  ctx.save(); ctx.globalAlpha = a * 0.6; ctx.strokeStyle = 'rgba(255,240,200,0.8)'; ctx.lineWidth = 3;
  for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(x, y, r * (0.8 + i * 0.35) + Math.sin(t * 1.5 + i) * 6, 0, 7); ctx.stroke(); }
  ctx.restore();
}
function nishan(x, y, h, t) { ctx.fillStyle = INK; ctx.fillRect(x - 5, y - h, 10, h); bhagwa(x, y - h + 40, 260, t, '#e06a1a'); }
function snowPeaks(y, a = 1) { ctx.save(); ctx.globalAlpha = a;
  for (const [x, w, h] of [[150, 360, 420], [520, 460, 560], [900, 380, 440]]) { ctx.fillStyle = 'rgba(40,30,40,0.75)'; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x, y - h); ctx.lineTo(x + w / 2, y); ctx.fill();
    ctx.fillStyle = 'rgba(245,245,250,0.9)'; ctx.beginPath(); ctx.moveTo(x - w * 0.12, y - h * 0.76); ctx.lineTo(x, y - h); ctx.lineTo(x + w * 0.12, y - h * 0.76); ctx.lineTo(x + w * 0.04, y - h * 0.8); ctx.lineTo(x - w * 0.03, y - h * 0.74); ctx.fill(); }
  ctx.restore(); }
function gurdwara(x, y, s, a = 1) {   // white domed shrine silhouette with a central dome and kalash
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(30,14,6,0.85)';
  ctx.fillRect(-300, -260, 600, 260); ctx.beginPath(); ctx.ellipse(0, -260, 150, 170, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-6, -470, 12, 50);
  for (const cx of [-250, 250]) { ctx.fillRect(cx - 30, -340, 60, 80); ctx.beginPath(); ctx.ellipse(cx, -340, 40, 50, 0, Math.PI, 0); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,220,150,0.55)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-220 + i * 110, 0); ctx.lineTo(-220 + i * 110, -120); ctx.quadraticCurveTo(-190 + i * 110, -170, -160 + i * 110, -120); ctx.lineTo(-160 + i * 110, 0); ctx.fill(); }
  ctx.restore();
}

function chowk(x, y, s, a = 0.5) {   // Mughal-era bazaar arcade with small chhatris
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-560, -300, 1120, 300); for (let i = 0; i < 28; i++) ctx.fillRect(-560 + i * 40, -322, 24, 24);
  for (const cx of [-420, 0, 420]) { ctx.fillRect(cx - 50, -400, 100, 80); ctx.beginPath(); ctx.ellipse(cx, -400, 62, 70, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(cx - 3, -490, 6, 30); }
  ctx.fillStyle = 'rgba(255,214,150,0.5)'; for (let i = 0; i < 9; i++) { const ax = -520 + i * 120; ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax, -150); ctx.quadraticCurveTo(ax + 40, -220, ax + 80, -150); ctx.lineTo(ax + 80, 0); ctx.fill(); }
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_chowk = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fy: 1000 });
  bg(PAL.dusk2, noise1(t * 2), 540, 760);
  chowk(540, 1180, 0.9, 0.5);
  ground(1180);
  crowd(t, { y: 1250, n: 10, s: 0.62, seed: 23, x0: -40, x1: 360, hats: ['pagdi', 'none', 'turban'] });
  crowd(t, { y: 1250, n: 10, s: 0.62, seed: 24, x0: 720, x1: 1120, hats: ['pagdi', 'none', 'turban'] });
  guruLight(540, 980, 120, t, prog(t, 0.3, 1.2));
  for (const x of [400, 680]) actor(x, 1180, 1.0, t, { hat: 'turban', face: x < 540 ? 1 : -1, wpn: 'spear', fa: [0.5, -1.3], ph: x, still: true });
  slam('1675  ·  चाँदनी चौक, दिल्ली', 220, t, 0.15, 70, { until: c1 });
  if (t > c1) overlay(() => { chip('धर्म बदलो', 300, 520, 52, prog(t, at(1, 0.3), at(1, 0.45)), { color: '#ffd9a0' }); chip('या मौत', 780, 520, 52, prog(t, at(1, 0.6), at(1, 0.75)), { color: '#ffb0a0' }); });
  grade('archival', t, 0.3);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))) });
  bg(PAL.temple, noise1(t * 2), 540, 860); rays(540, 860, t, 0.1);
  guruLight(540, 860, 170, t, prog(t, 0, 0.8));
  hills(1120, 120, 2301, 0.6); ground(1200);
  nishan(860, 1200, 520, t);
  title2(t, 'गुरु तेग बहादुर जी', 'हिंद की चादर', { y: 220, size: 104 });
};

// ---------- KASHMIR ----------
S.kashmir = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.cold, 0, 540, 700); snowPeaks(1100); ground(1180);
  if (t < c1) { for (let i = 0; i < 4; i++) actor(240 + i * 170, 1180, 0.95, t, { ...PANDIT, ...(i % 2 ? POSE.mourn : POSE.pray), ph: i });
    chip('कश्मीर', 540, 240, 52, prog(t, 0.2, 0.6)); stamp('ज़बरदस्ती धर्म-परिवर्तन', 540, 380, t, at(0, 0.55), { size: 56 }); }
  else { const k = prog(t, c1, D);
    for (let i = 0; i < 6; i++) actor(lerp(1200, 200, k) + i * 110, 1180, 0.8, t, { ...PANDIT, face: -1, walk: t * 4 + i, prop: i === 0 ? 'staff' : null, ph: i });
    chip('पंडित किरपा राम', 540, 240, 48, prog(t, c1, c1 + 0.5)); chip('→ आनंदपुर साहिब', 540, 340, 44, prog(t, c1 + 0.6, c1 + 1.1)); }
};

// ---------- ANANDPUR ----------
S.anandpur = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 950 });
  bg(PAL.dawn, noise1(t * 2), 540, 700); hills(1000, 160, 2311, 0.35); ground(1180);
  nishan(900, 1180, 560, t);
  guruLight(400, 920, 130, t, 1);
  for (let i = 0; i < 4; i++) actor(620 + i * 90, 1200, 0.75, t, { ...PANDIT, face: -1, seated: true, ...POSE.pray, ph: i, shadow: false });
  for (let i = 0; i < 3; i++) actor(80 + i * 70, 1200, 0.75, t, { ...SIKH, seated: true, ...POSE.pray, ph: i + 5, shadow: false });
  if (t > c1) { guruLight(260, 1020, 60, t, prog(t, c1, c1 + 0.6)); chip('गोबिंद राय, 9 वर्ष', 260, 860, 38, prog(t, c1 + 0.2, c1 + 0.7)); }
  legendTag(t, prog(t, 0.2, 0.6));
  quoteCard('“पिताजी, आपसे बड़ा महापुरुष और कौन है?”', 330, prog(t, at(1, 0.3), at(1, 0.3) + 0.4), 54);
};

// ---------- THE MESSAGE ----------
S.message = (t) => {
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.temple, 0, 540, 700); rays(540, 640, t, 0.07);
  guruLight(540, 800, 110, t, 1); ground(1180);
  for (let i = 0; i < 5; i++) actor(160 + i * 190, 1180, 0.85, t, { ...PANDIT, face: i < 2 ? 1 : -1, ...POSE.pray, ph: i });
  scroll(540, 470, 640, 330, prog(t, 0.6, 1.2), ['बादशाह से कह दो:', 'तेग बहादुर धर्म बदलें,', 'तो हम सब बदल लेंगे'], {});
};

// ---------- ARREST & THE THREE COMPANIONS ----------
S.arrest = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.jail, noise1(t * 2), 540, 700);
  ctx.fillStyle = INK; ctx.fillRect(-20, 300, W + 40, 100); ground(1180);
  guruLight(540, 760, 100, t, 0.9);
  const names = ['भाई मती दास', 'भाई सती दास', 'भाई दयाला'];
  for (let i = 0; i < 3; i++) { const x = 230 + i * 310, a = prog(t, 0.5 + i * 0.6, 1.0 + i * 0.6);
    ctx.save(); ctx.globalAlpha = a; actor(x, 1180, 1.05, t, { ...SIKH, ...POSE.pray, ph: i, still: true }); ctx.restore();
    chip(names[i], x, 1228, 36, a); }
  bars(0.5, 120, 960, 140);
  if (t > c1) { overlay(() => { for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(230 + i * 310, 960, 120, '255,220,150', 0.5 * prog(t, c1, c1 + 0.6)); ctx.restore(); } }); slam('कोई नहीं झुका', 300, t, c1 + 0.2, 100); }
  grade('archival', t, 0.35);
};

// ---------- MARTYRDOM ----------
S.martyr = (t) => {
  const up = prog(t, at(0, 0.5), D);
  cam(t, { z: lerp(1.1, 1, prog(t, 0, D)), fy: lerp(1000, 760, up) });
  bg(mixPal(PAL.dusk2, PAL.temple, up), noise1(t * 2), 540, 700);
  chowk(540, 1180, 0.9, 0.45); ground(1180);
  guruLight(540, lerp(980, 520, ss(up)), lerp(120, 200, up), t, 1);
  rays(540, lerp(980, 520, ss(up)), t, 0.12 * up);
  slam('शीश दिया… धर्म नहीं छोड़ा', 280, t, at(0, 0.55), 80);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.night, PAL.dawn, now), noise1(t * 2), 540, 700);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now; stars(t, 0.5); ground(1180);
    actor(lerp(700, 300, prog(t, 0.3, at(0, 0.5))), 1180, 1.1, t, { ...SIKH, cloth: null, walk: t * 5, face: -1, ...POSE.hold, ph: 1 });
    glow(lerp(760, 360, prog(t, 0.3, at(0, 0.5))), 960, 70, '255,230,170', 0.7);
    chip('भाई जैता', 540, 260, 46, prog(t, 0.2, 0.6) * (1 - prog(t, at(0, 0.5), at(0, 0.6))));
    if (t > at(0, 0.55)) { ctx.fillStyle = INK; ctx.fillRect(620, 960, 260, 220); ctx.beginPath(); ctx.moveTo(600, 960); ctx.lineTo(750, 860); ctx.lineTo(900, 960); ctx.fill(); flames(750, 960, 0.8, t, 9); chip('लक्खी शाह वणजारा', 540, 260, 46, prog(t, at(0, 0.6), at(0, 0.7))); }
    ctx.restore(); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now; rays(540, 600, t, 0.08); guruLight(540, 560, 90, t, 0.8);
    gurdwara(300, 1180, 0.62); gurdwara(800, 1180, 0.62); ground(1180); ctx.restore();
    chip('शीश गंज साहिब', 300, 1228, 36, prog(t, c1, c1 + 0.5)); chip('रकाब गंज साहिब', 800, 1228, 36, prog(t, c1 + 0.3, c1 + 0.8)); }
};

S.end = (t) => endCard(t, 'गुरु तेग बहादुर जी के बलिदान को नमन');
