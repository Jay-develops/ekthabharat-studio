// @common2
// ---------------- video 26 - Mysore rockets ----------------
const MYS = { hat: 'turban', cloth: '#d4a017' };
function rocketDiagram(x, y, s, a, t) {   // cut-away: iron tube, packed powder, bamboo stick, blade
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c8a26a'; ctx.fillRect(-420, -8, 520, 16);                          // bamboo
  ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-400 + i * 90, -8); ctx.lineTo(-400 + i * 90, 8); ctx.stroke(); }
  ctx.fillStyle = '#3a3a40'; ctx.fillRect(90, -40, 240, 80);                            // iron tube
  ctx.fillStyle = '#1a1a1a'; ctx.fillRect(100, -30, 220, 60);
  ctx.fillStyle = '#5a4a3a'; for (let i = 0; i < 40; i++) { const r = rng(i + 7); ctx.fillRect(104 + r() * 210, -26 + r() * 50, 4, 4); }   // powder
  ctx.fillStyle = '#c0c0c8'; ctx.beginPath(); ctx.moveTo(330, -40); ctx.lineTo(430, 0); ctx.lineTo(330, 40); ctx.fill();   // blade tip
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_rocket = (t) => {
  const c1 = cue(1)[0], bt = at(1, 0.35);
  cam(t, { z: lerp(1, 1.15, prog(t, 0, D)), fy: 1050, shake: 3 + hit(t, bt, 0.9, 30) });
  bg(PAL.battle, noise1(t * 3), 540, 700); hills(920, 180, 2601, 0.4); ground(1200);
  troop(t, { y: 1220, n: 7, s: 0.7, dir: 1, x: 200, speed: 30, kind: 'redcoat' });
  for (let i = 0; i < 2; i++) { const x = 640 + i * 180; ctx.fillStyle = INK; ctx.fillRect(x - 60, 1100, 120, 70); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(x - 30, 1180, 22, 0, 7); ctx.arc(x + 30, 1180, 22, 0, 7); ctx.stroke(); }
  for (let k = 0; k < 6; k++) rocket(t, 0.3 + k * 0.45, 1150, 500 - k * 30, 620 + (k % 3) * 120, 1080, 1.3, 260, k + 1);
  rocket(t, bt - 1.2, 1150, 420, 640, 1110, 1.2, 300, 9);
  boom(640, 1100, t, bt, 1.8, 7); flash(0.7 * (1 - prog(t, bt, bt + 0.5)) * (t > bt ? 1 : 0)); if (t > bt) { smoke(640, 900, t, 11, 12, 1.6, 0.25); fireRow(520, 820, 1180, t, 0.7, 4); }
  slam('1780  ·  पोल्लिलूर', 220, t, 0.15, 90, { until: c1 });
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 14) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 140, 2611, 0.6); ground(1200);
  for (let k = 0; k < 5; k++) rocket(t, k * 0.6, 200 + k * 160, 1180, 300 + k * 160, 300, 1.6, 120, k + 3);
  actor(540, 1220, 1.9, t, { ...MYS, beard: true, ...POSE.point, ph: 1 });
  title2(t, 'मैसूर के रॉकेट', 'हैदर अली  ·  टीपू सुल्तान', { y: 220, size: 112 });
};

// ---------- THE TECHNOLOGY ----------
S.tech = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  rocketDiagram(540, 760, 1.15, prog(t, 0.2, 0.8), t);
  chip('लोहे का खोल', 760, 640, 44, prog(t, at(0, 0.1), at(0, 0.3)));
  chip('कसकर भरा बारूद', 760, 880, 44, prog(t, at(0, 0.35), at(0, 0.55)));
  slam('~2 किलोमीटर', 300, t, at(0, 0.75), 96, { until: c1 });
  if (t > c1) { chip('लंबा बाँस', 260, 880, 44, prog(t, c1, c1 + 0.4)); chip('धार', 1000, 640, 40, prog(t, at(1, 0.5), at(1, 0.7))); }
};

// ---------- THE ROCKET CORPS ----------
S.corps = (t) => {
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), shake: 3 });
  bg(PAL.battle, noise1(t * 3), 540, 700); hills(950, 160, 2621, 0.35); ground(1200);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const x = 80 + i * 150 + r * 60, y = 1200 + r * 50;
    actor(x, y, 0.75 + r * 0.1, t, { ...MYS, cloth: r ? '#c0392b' : '#d4a017', fa: [2.2, -0.3], sh: [-0.3, -0.4], ph: i + r * 7 });
    rocket(t, 0.2 + i * 0.35 + r * 0.17, x + 40, y - 200, x + 500, 300, 1.3, 140, i + r * 6 + 1); }
  slam('हज़ारों रॉकेट-सैनिक', 230, t, at(0, 0.3), 80);
};

// ---------- BATTLES ----------
S.battle = (t) => {
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), shake: 6 });
  bg(PAL.blood, noise1(t * 4), 540, 760); hills(930, 180, 2631, 0.4); dust(t, 0.4, 7); ground(1200);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) redcoat(560 + i * 90 + r * 40, 1200 + r * 40, 0.7, { face: -1, fa: [1.55, -0.05], sh: [1.2, 0.3], spearA: -1.55 });
  for (let k = 0; k < 10; k++) { const t0 = 0.1 + k * 0.4; rocket(t, t0, -40, 900 - (k % 3) * 60, 600 + (k % 5) * 90, 1150, 1.1, 220, k + 11); boom(600 + (k % 5) * 90, 1150, t, t0 + 1.1, 0.6, k + 2); }
  slam('कहर', 240, t, at(0, 0.5), 140);
};

// ---------- 1799: SRIRANGAPATNA ----------
S.fall = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: t < c1 ? 4 : 0 });
  if (t < c1) { bg(PAL.fire, noise1(t * 4), 540, 760); ctx.save(); ctx.globalAlpha = 0.6; fort(540, 1100, 0.9, t); ctx.restore(); water(1120, t, 0.4); fireRow(200, 900, 900, t, 0.7, 4); ground(1200);
    troop(t, { y: 1240, n: 8, s: 0.65, dir: 1, x: -200, speed: 80, kind: 'redcoat' });
    slam('1799  ·  श्रीरंगपट्टनम', 220, t, 0.2, 80); }
  else { bg(PAL.dusk2, 0, 540, 760); ground(1180);
    for (let i = 0; i < 3; i++) { ctx.fillStyle = '#5a4a3a'; ctx.fillRect(160 + i * 40, 1120 - i * 12, 300, 18); }
    for (const x of [600, 760]) redcoat(x, 1180, 1.0, { face: -1, fa: [0.8, 1.2], sh: [-0.8, -1.2] });
    actor(lerp(900, 1300, prog(t, at(1, 0.5), D)), 1180, 1.0, t, { hat: 'none', hat2: 'topee', coat: true, walk: t * 4, ...POSE.hold, ph: 3 });
    chip('रॉकेट → इंग्लैंड', 540, 300, 50, prog(t, c1 + 0.3, c1 + 0.8)); }
};

// ---------- CONGREVE ----------
S.congreve = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  if (t < c1) { bg(PAL.cold, 0, 540, 700); ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = INK; ctx.fillRect(-20, 620, W + 40, 560); for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(255,214,150,0.4)'; ctx.fillRect(80 + i * 200, 700, 120, 160); } ctx.restore(); ground(1180);
    ctx.fillStyle = INK; ctx.fillRect(300, 1030, 480, 22); ctx.fillRect(320, 1050, 16, 130); ctx.fillRect(744, 1050, 16, 130);
    rocketDiagram(540, 1010, 0.45, 1, t);
    actor(820, 1180, 1.15, t, { hat: 'none', hat2: 'topee', coat: true, face: -1, ...POSE.point, glasses: true, ph: 1 });
    chip('विलियम कॉन्ग्रीव', 820, 760, 44, prog(t, 0.3, 0.8)); chip('इंग्लैंड', 540, 240, 48, prog(t, 0.2, 0.6)); }
  else { bg(PAL.night, noise1(t * 3), 540, 700); stars(t, 0.4); water(1060, t, 0.6);
    carrack(260, 1060, 0.45, t, {}); for (let k = 0; k < 6; k++) rocket(t, c1 + 0.2 + k * 0.4, 300, 820, 860, 760, 1.2, 200, k + 21);
    ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = INK; ctx.fillRect(760, 860, 320, 200); ctx.restore(); ground(1200);
    chip('नेपोलियन से युद्ध  ·  1814, अमेरिका', 540, 280, 42, prog(t, c1 + 0.2, c1 + 0.7)); }
};

// ---------- TWIST ----------
S.twist = (t) => {
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  const k = ss(prog(t, 0.3, at(0, 0.7)));
  mapCard(t, 1, [[640, 960, 'मैसूर', 0, 44], [300, 380, 'इंग्लैंड', 0, -24]], k, { x: 120, y: 260, w: 840, h: 840 });
  if (k > 0 && k < 1) { const x = lerp(640, 300, k), y = lerp(960, 380, k) - Math.sin(k * Math.PI) * 120; glow(x, y, 40, '255,150,50', 0.9); }
  slam('शुरुआत: मैसूर', 1180, t, at(0, 0.75), 90, { color: '#ffd27a' });
};

S.end = (t) => endCard(t, 'क्या आपको ये बात पता थी?');
