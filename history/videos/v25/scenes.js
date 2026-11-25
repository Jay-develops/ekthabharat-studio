// @common2
// ---------------- video 25 - Khudiram Bose ----------------
const KHUDI = { hat: 'none', cloth: '#e3d6b4' };
const PRAFULLA = { hat: 'none', cloth: '#b8c4a0', moustache: true };
const COP25 = { hat: 'none', hat2: 'topee', coat: true };
function buggy(x, y, s, t, run = 1) {   // horse-drawn carriage
  horse(x + 200 * s, y, s * 0.9, t * run, 0, false);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-150, -250, 220, 150); ctx.beginPath(); ctx.moveTo(-160, -250); ctx.quadraticCurveTo(-40, -310, 80, -250); ctx.fill();
  ctx.fillStyle = 'rgba(255,214,150,0.55)'; ctx.fillRect(-120, -230, 70, 60); ctx.fillStyle = INK;
  ctx.lineWidth = 6; ctx.strokeStyle = INK; for (const wx of [-110, 40]) { ctx.beginPath(); ctx.arc(wx, -50, 50, 0, 7); ctx.stroke(); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + t * 4 * run; ctx.beginPath(); ctx.moveTo(wx, -50); ctx.lineTo(wx + Math.cos(a) * 50, -50 + Math.sin(a) * 50); ctx.stroke(); } }
  ctx.beginPath(); ctx.moveTo(70, -150); ctx.lineTo(200, -120); ctx.stroke();
  ctx.restore();
}
function loom(x, y, s, t, k) {   // a handloom weaving a dhoti border with a name
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-360, -420, 24, 420); ctx.fillRect(336, -420, 24, 420); ctx.fillRect(-380, -440, 760, 30);
  ctx.fillStyle = '#efe6d2'; ctx.fillRect(-320, -380, 640, 300);
  ctx.fillStyle = '#b8231a'; ctx.fillRect(-320, -150, 640, 60);
  ctx.strokeStyle = 'rgba(80,40,20,0.35)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.moveTo(-320 + i * 16, -380); ctx.lineTo(-320 + i * 16, -80); ctx.stroke(); }
  ctx.fillStyle = INK; ctx.fillRect(-340, -80 - 20 * Math.abs(Math.sin(t * 3)), 680, 14);
  ctx.save(); ctx.beginPath(); ctx.rect(-320, -160, 640 * k, 80); ctx.clip(); ctx.fillStyle = '#ffd34a'; ctx.font = `700 52px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText('खुदीराम  ·  खुदीराम', 0, -102); ctx.restore();
  ctx.restore();
}

// ---------- HOOK ----------
S.hook_carriage = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.2, prog(t, 0, D)), fx: 420, fy: 1050 });
  bg(PAL.night, noise1(t * 2), 760, 600); stars(t, 0.5); moon(860, 300, 45);
  ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = INK; ctx.fillRect(560, 760, 460, 420); ctx.beginPath(); ctx.moveTo(540, 760); ctx.lineTo(790, 640); ctx.lineTo(1040, 760); ctx.fill(); ctx.restore();
  lampPost(520, 1180, 1.0, t, 1); ground(1180);
  for (const [x, P] of [[200, KHUDI], [300, PRAFULLA]]) actor(x, 1180, 1.05, t, { ...P, face: 1, ...POSE.guard, ph: x });
  if (t > c1) { const a = prog(t, c1, c1 + 0.5); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(260, 930, 34, 0, 7); ctx.fill(); ctx.fillRect(254, 880, 12, 24); ctx.restore(); glow(262, 878, 30, '255,170,80', a * (0.5 + 0.5 * pulse(t, 0.2))); }
  slam('30 अप्रैल 1908  ·  मुज़फ़्फ़रपुर', 220, t, 0.15, 66, { until: c1 });
  chip('निशाना: जज किंग्सफ़ोर्ड', 640, 360, 44, prog(t, at(1, 0.4), at(1, 0.7)));
  grade('archival', t, 0.45);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 12) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 140, 2501, 0.6); ground(1200);
  actor(540, 1220, 2.0, t, { ...KHUDI, ...POSE.fist, ph: 1 });
  title2(t, 'खुदीराम बोस', '1889 – 1908', { y: 220, size: 120 });
  embers(t, 25, 251, 0.6);
};

// ---------- THE BOY ----------
S.boy = (t) => {
  const caught = at(0, 0.45), run = prog(t, at(0, 0.75), D);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.day, 0, 540, 700); ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = INK; for (const [x, w, h] of [[60, 220, 300], [300, 180, 380], [500, 260, 280], [780, 200, 340]]) { ctx.fillRect(x, 1180 - h, w, h); ctx.beginPath(); ctx.moveTo(x - 14, 1180 - h); ctx.lineTo(x + w / 2, 1180 - h - 70); ctx.lineTo(x + w + 14, 1180 - h); ctx.fill(); } ctx.restore(); ground(1180);
  for (let i = 0; i < 10; i++) { const k = ((t * 0.3 + i / 10) % 1); ctx.save(); ctx.translate(160 + i * 90 + Math.sin(t + i) * 40, lerp(1100, 400, k)); ctx.rotate(t * 2 + i); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#efe6d2'; ctx.fillRect(-26, -18, 52, 36); ctx.restore(); }
  actor(lerp(420, 1200, run), 1180, 1.0, t, { ...KHUDI, face: 1, walk: run > 0 ? t * 9 : null, ...(run > 0 ? POSE.reach : POSE.raise), prop: run > 0 ? null : 'book', lean: run > 0 ? 0.2 : 0, ph: 1 });
  if (t > caught && run < 1) actor(lerp(800, 1300, run), 1180, 1.05, t, { ...COP25, face: -1, ...POSE.point, ph: 2 });
  chip('मिदनापुर, बंगाल', 540, 230, 46, prog(t, 0.2, 0.6) * (1 - prog(t, caught - 0.3, caught)));
  stamp('पकड़ा गया', 540, 360, t, caught, { size: 70 });
  slam('…और भाग निकला!', 480, t, at(0, 0.8), 70);
};

// ---------- THE JUDGE ----------
S.judge = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)), fy: 1000 });
  if (t < c1) { bg(PAL.court, 0, 540, 700);
    ctx.fillStyle = INK; ctx.fillRect(560, 820, 460, 360); ctx.fillRect(540, 810, 500, 20);
    actor(790, 820, 1.0, t, { ...COP25, hat2: null, seated: true, face: -1, ...POSE.point, shadow: false, ph: 1 }); ground(1180);
    actor(320, 1180, 0.95, t, { hat: 'none', ...POSE.mourn, ph: 2 }); bars(0.4, 150, 500, 90);
    chip('मजिस्ट्रेट किंग्सफ़ोर्ड', 790, 560, 44, prog(t, 0.3, 0.8)); stamp('कड़ी सज़ा', 400, 400, t, at(0, 0.6), { size: 70 }); }
  else { bg(PAL.map, 0, 540, 700);
    const k = ss(prog(t, c1 + 0.2, at(1, 0.7)));
    mapCard(t, 1, [[760, 820, 'कलकत्ता', 0, 44], [420, 460, 'मुज़फ़्फ़रपुर', 0, -24]], k, { x: 140, y: 260, w: 800, h: 760 });
    for (const [i, P] of [[0, KHUDI], [1, PRAFULLA]]) actor(lerp(760, 420, k) + i * 30, lerp(820, 460, k) + 40, 0.3, t, { ...P, walk: t * 6 + i, ph: i });
    chip('खुदीराम  ·  प्रफुल्ल चाकी', 540, 1120, 44, prog(t, at(1, 0.5), at(1, 0.8))); }
};

// ---------- THE BOMB ----------
S.bomb = (t) => {
  const bt = at(0, 0.2), fadeTo = prog(t, at(0, 0.6), at(0, 0.8));
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1050, shake: hit(t, bt, 0.9, 28) });
  bg(mixPal(PAL.night, PAL.sepia, fadeTo), noise1(t * 3), 540, 700);
  lampPost(860, 1180, 1.0, t, 1); ground(1180);
  buggy(lerp(-200, 520, prog(t, 0, bt)), 1180, 0.9, t, t < bt ? 1 : 0);
  boom(500, 1000, t, bt, 1.4, 5); flash(0.8 * (1 - prog(t, bt, bt + 0.5)) * (t > bt ? 1 : 0)); smoke(500, 900, t, 9, 12, 1.5, 0.25 * prog(t, bt, bt + 0.5));
  if (fadeTo > 0) { ctx.save(); ctx.globalAlpha = fadeTo; newspaper(540, 560, 760, 480, fadeTo, 'मुज़फ़्फ़रपुर: बग्घी पर बम', 'किंग्सफ़ोर्ड नहीं थे · दो महिलाओं की मौत', { masthead: 'समाचार, 1908', size: 52 }); ctx.restore(); }
  grade('archival', t, 0.45);
};

// ---------- THE CHASE ----------
S.chase = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: t < c1 ? 4 : 0 });
  if (t < c1) { bg(PAL.dusk2, noise1(t * 3), 540, 760); rails(1180, t, 0); ground(1200);
    actor(540, 1200, 1.15, t, { ...PRAFULLA, face: -1, ...POSE.guard, prop: 'pistol', ph: 1 });
    for (const x of [180, 300, 800, 920]) actor(x, 1220, 0.95, t, { ...COP25, face: x < 540 ? 1 : -1, ...POSE.point, ph: x });
    chip('मोकामा  ·  प्रफुल्ल चाकी', 540, 260, 46, prog(t, 0.2, 0.6)); }
  else { bg(PAL.night, noise1(t * 2), 540, 700); stars(t, 0.5); moon(200, 300, 40);
    const k = prog(t, c1, at(1, 0.6));
    hills(1000, 120, 2511, 0.4); ground(1180);
    ctx.fillStyle = INK; ctx.fillRect(700, 900, 340, 280); ctx.fillRect(680, 890, 380, 18); ctx.fillStyle = '#efe6d2'; ctx.fillRect(760, 820, 220, 60); ctx.fillStyle = INK; ctx.font = `700 40px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText('वैनी', 870, 864);
    actor(lerp(-50, 620, k), 1180, 1.0, t, { ...KHUDI, walk: t * 4, ph: 1 });
    if (t > at(1, 0.6)) for (const x of [760, 900]) actor(x, 1180, 1.0, t, { ...COP25, face: -1, ...POSE.reach, ph: x });
    stamp('पकड़े गए', 540, 380, t, at(1, 0.7), { size: 76 }); }
  grade('archival', t, 0.45);
};

// ---------- TRIAL & EXECUTION (no gallows shown) ----------
S.trial = (t) => {
  const dawn = prog(t, at(0, 0.5), D);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.jail, PAL.dawn, dawn), 0, 540, 700);
  if (dawn < 1) { ctx.save(); ctx.globalAlpha = 1 - dawn; ground(1180); actor(540, 1180, 1.25, t, { ...KHUDI, ...POSE.idle, eye2: 0.9, ph: 1 }); bars(0.9, 160, 920, 110); ctx.restore(); }
  if (dawn > 0) { ctx.save(); ctx.globalAlpha = dawn; rays(540, 700, t, 0.09); sun(540, 700, 120, 0.8); ground(1180); ctx.restore(); }
  slam('11 अगस्त 1908', 230, t, at(0, 0.45), 90);
  chip('उम्र: 18 साल', 540, 380, 52, prog(t, at(0, 0.75), at(0, 0.9)));
  grade('archival', t, 0.4);
};

// ---------- TWIST: the woven name ----------
S.twist = (t) => {
  const c1 = cue(1)[0], loomA = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.dawn, PAL.temple, loomA), 0, 540, 700); rays(540, 600, t, 0.07);
  if (loomA < 1) { ctx.save(); ctx.globalAlpha = 1 - loomA; legendTag(t, prog(t, 0.2, 0.6)); actor(540, 1180, 1.6, t, { ...KHUDI, ...POSE.idle, ph: 1 }); glow(540, 820, 160, '255,230,170', 0.5); ground(1180); ctx.restore(); }
  if (loomA > 0) { ctx.save(); ctx.globalAlpha = loomA; loom(540, 1120, 1.1, t, prog(t, c1 + 0.3, at(1, 0.9))); ground(1180);
    actor(160, 1180, 0.9, t, { hat: 'none', seated: true, ...POSE.forward, ph: 2 }); ctx.restore();
    chip('बंगाल के जुलाहे', 540, 300, 48, prog(t, c1, c1 + 0.5)); }
};

S.end = (t) => endCard(t, 'खुदीराम बोस के लिए एक शब्द लिखिए');
