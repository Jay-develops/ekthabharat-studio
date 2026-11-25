// @common2
// ---------------- video 17 - Udham Singh ----------------
const UDHAM = { hat: 'none', hat2: 'fedora', coat: true, moustache: true, cloth: '#2e6b8a' };
const ODWYER = { hat: 'none', coat: true, beard: false };
const ERA = 0.5;
function hallInterior(t) {   // Caxton Hall: stage, lamps, rows of chairs
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.85)'; ctx.fillRect(-20, 120, W + 40, 1100);
  for (let i = 0; i < 4; i++) { const x = 180 + i * 240; ctx.fillStyle = 'rgba(255,214,150,0.18)'; ctx.fillRect(x - 50, 240, 100, 300); }
  ctx.fillStyle = INK; ctx.fillRect(-20, 820, W + 40, 40); ctx.restore();
  for (const x of [200, 880]) { ctx.fillStyle = INK; ctx.fillRect(x - 4, 560, 8, 260); glow(x, 560, 120, '255,220,150', 0.5); }
}
function audience(t, a = 1, skip = -1) { ctx.save(); ctx.globalAlpha = a; for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) { if (r === 0 && i === skip) continue; actor(80 + i * 150 + r * 70, 1180 + r * 70, 0.75 + r * 0.1, t, { seated: true, hat: 'none', coat: true, face: -1, ph: i + r, shadow: false }); } ctx.restore(); }

// ---------- HOOK ----------
S.hook_hall = (t) => {
  const c1 = cue(1)[0], open = prog(t, at(1, 0.35), at(1, 0.7));
  cam(t, { z: lerp(1, 1.25, prog(t, 0, D)), fx: 600, fy: 1050 });
  bg(PAL.court, 0, 540, 600); hallInterior(t);
  actor(300, 820, 0.9, t, { ...ODWYER, face: 1, ...POSE.point, ph: 1 }); actor(560, 820, 0.85, t, { hat: 'none', coat: true, face: -1, ...POSE.idle, ph: 2 });
  audience(t, 1, 3);
  // Udham in the audience: the book opens, the revolver shows
  actor(530, 1180, 0.9, t, { ...UDHAM, seated: true, face: -1, fa: [1.2, -1.0], sh: [0.6, -1.0], eye2: 0.9, ph: 3, shadow: false });
  const bx = 470, by = 1060;
  ctx.save(); ctx.translate(bx, by); ctx.fillStyle = INK; ctx.fillRect(-60, -10, 120, 24); ctx.save(); ctx.translate(-60, -10); ctx.rotate(-1.9 * open); ctx.fillRect(0, -2, 120, 10); ctx.restore();
  if (open > 0.5) { ctx.fillStyle = 'rgba(255,214,150,0.6)'; ctx.fillRect(-50, -6, 100, 14); ctx.fillStyle = INK; ctx.fillRect(-40, -4, 60, 8); ctx.fillRect(-40, -4, 14, 20); }
  ctx.restore(); if (open > 0.5) glow(bx, by, 100, '255,230,170', 0.4 * pulse(t, 1.2));
  slam('लंदन  ·  13 मार्च 1940', 220, t, 0.15, 76, { until: c1 });
  grade('archival', t, ERA);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 12) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1120, 140, 1701, 0.6); ground(1200);
  actor(540, 1220, 2.1, t, { ...UDHAM, ...POSE.idle, eye2: 0.8, ph: 1 });
  title2(t, 'ऊधम सिंह', '1899 – 1940', { y: 220, size: 120 });
  grade('archival', t, ERA * 0.5);
};

// ---------- JALLIANWALA BAGH ----------
S.bagh = (t) => {
  const c1 = cue(1)[0], c2 = cue(2)[0], fire = prog(t, at(1, 0.6), at(1, 0.7)) * (1 - prog(t, c2, c2 + 0.4));
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), shake: fire > 0 ? 6 : 0 });
  bg(t < c1 ? PAL.day : PAL.blood, noise1(t * 3), 540, 700);
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.55)'; ctx.fillRect(-20, 860, W + 40, 320); ctx.fillStyle = INK; ctx.fillRect(900, 700, 200, 480); ctx.restore();
  ground(1180);
  if (t < c2) {
    crowd(t, { y: 1180, n: 10, s: 0.6, seed: 17, hats: ['pagdi', 'turban', 'none'], x0: 40, x1: 700, sway: fire > 0 ? 6 : 1 });
    if (t > c1) for (let i = 0; i < 5; i++) { const x = 930 - i * 60; redcoat(x, 1180, 0.8, { face: -1, fa: [1.55, -0.05], sh: [1.2, 0.3], spearA: -1.55 }); if (fire > 0) { const k = Math.floor(t * 1.6 + i * 0.37); muzzle(x - 150, 935, t, (k - i * 0.37) / 1.6, -1, 0.8); } }
    slam('13 अप्रैल 1919  ·  बैसाखी', 220, t, 0.15, 70, { until: c1 });
    chip('जनरल डायर', 760, 360, 46, prog(t, c1, c1 + 0.5) * (1 - prog(t, c2 - 0.3, c2)));
  } else {
    newspaper(540, 640, 780, 520, prog(t, c2, c2 + 0.6), 'गवर्नर ओ\'डायर ने डायर की कार्रवाई को सही ठहराया', 'पंजाब, 1919', { masthead: 'पंजाब समाचार', size: 56 });
  }
  grade('archival', t, ERA);
};

// ---------- THE VOW ----------
S.vow = (t) => {
  cam(t, { z: lerp(1.1, 1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.dusk2, 0, 540, 700); sun(540, 760, 110, 0.6);
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.55)'; ctx.fillRect(-20, 860, W + 40, 320); ctx.restore(); ground(1180);
  actor(540, 1180, 1.5, t, { hat: 'pagdi', cloth: '#2e6b8a', ...poseMix(POSE.mourn, POSE.fist, prog(t, at(0, 0.6), at(0, 0.85))), eye2: 0.8, ph: 1 });
  legendTag(t, prog(t, 0.2, 0.6));
  slam('कसम', 300, t, at(0, 0.75), 130);
  grade('archival', t, ERA);
};

// ---------- 21 YEARS ----------
S.years = (t) => {
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.map, 0, 540, 700);
  mapCard(t, 1, [[700, 560, 'अमृतसर', 0, 44], [470, 900, 'अफ़्रीका', 0, 44], [180, 420, 'अमेरिका', 0, -24], [420, 360, 'लंदन', 0, -24]], prog(t, 0.3, at(0, 0.9)), { x: 100, y: 260, w: 880, h: 820 });
  overlay(() => { const names = ['शेर सिंह', 'उदे सिंह', 'फ़्रैंक ब्राज़ील', 'राम मोहम्मद सिंह आज़ाद']; names.forEach((n, i) => { const a = prog(t, at(0, 0.45 + i * 0.12), at(0, 0.5 + i * 0.12)); if (a > 0) stamp(n, 300 + (i % 2) * 480, 960 + Math.floor(i / 2) * 90, t, at(0, 0.45 + i * 0.12), { size: 46, rot: (i % 2 ? 0.08 : -0.08) }); }); });
  slam('21 साल', 200, t, at(0, 0.2), 96);
  grade('archival', t, ERA * 0.6);
};

// ---------- THE SHOT ----------
S.shot = (t) => {
  const c1 = cue(1)[0], sh = at(0, 0.7);
  cam(t, { z: lerp(1.1, 1.0, prog(t, 0, sh)) + bump(t, sh, 0.5, 0.07), fx: 540, fy: 1000, shake: hit(t, sh, 0.8, 22) + hit(t, sh + 0.35, 0.6, 14) });
  bg(PAL.court, 0, 540, 600); hallInterior(t);
  const fall = prog(t, sh + 0.2, sh + 1.0);
  actor(300, 820, 0.9, t, { ...ODWYER, face: 1, rot: -fall * 1.3, ...POSE.point, ph: 1 });
  audience(t, 1 - prog(t, sh + 0.2, sh + 0.8), 3);
  if (t > sh + 0.2) for (let i = 0; i < 5; i++) actor(150 + i * 200 + (t - sh) * (i % 2 ? 300 : -300), 1180, 0.75, t, { walk: t * 9 + i, coat: true, hat: 'none', face: i % 2 ? 1 : -1, ...POSE.reach, lean: 0.2, ph: i });
  const stand = prog(t, at(0, 0.4), at(0, 0.6));
  actor(560, 1180, 1.25, t, { ...UDHAM, face: -1, seated: stand < 0.5, ...poseMix(POSE.idle, POSE.point, stand), prop: stand > 0.5 ? 'pistol' : null, eye2: 0.9, ph: 3 });
  muzzle(330, 900, t, sh, -1, 1.2); muzzle(330, 900, t, sh + 0.35, -1, 1.2);
  if (t > c1) slam('वो भागे नहीं', 260, t, at(1, 0.3), 96);
  grade('archival', t, ERA);
};

// ---------- THE TRIAL ----------
S.trial = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(PAL.sepia, 0, 540, 700);
  ctx.fillStyle = INK; ctx.fillRect(640, 820, 380, 360); ctx.fillRect(620, 810, 420, 20); actor(830, 820, 0.9, t, { seated: true, face: -1, hat: 'none', coat: true, still: true, shadow: false });
  ground(1180);
  actor(330, 1180, 1.35, t, { ...UDHAM, hat2: null, hat: 'pagdi', ...POSE.idle, eye2: 0.9, ph: 1 });
  bars(0.3, 180, 480, 80);
  slam('राम मोहम्मद सिंह आज़ाद', 260, t, at(0, 0.45), 84);
  if (t > c1) overlay(() => { const w = ['हिंदू', 'मुसलमान', 'सिख', 'आज़ाद']; w.forEach((s, i) => { const a = prog(t, at(1, i * 0.18), at(1, i * 0.18) + 0.25); if (a > 0) chip(s, 180 + i * 240, 420, 50, a); }); });
  grade('archival', t, ERA);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], home = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(mixPal(PAL.night, PAL.dawn, home), 0, 540, 700);
  if (home < 1) { ctx.save(); ctx.globalAlpha = 1 - home; stars(t, 0.5); ctx.fillStyle = INK; ctx.fillRect(140, 700, 800, 480); bars(0.7 * (1 - home), 300, 780, 90); ground(1180); ctx.restore();
    slam('31 जुलाई 1940', 230, t, at(0, 0.3), 90, { until: c1 }); }
  if (home > 0) { ctx.save(); ctx.globalAlpha = home; rays(540, 640, t, 0.08); sun(540, 640, 130, 0.9);
    tiranga(380, 520, 300, 190, t, { chakra: true, pole: 660 }); ground(1180);
    for (let i = 0; i < 7; i++) actor(120 + i * 140, 1180, 0.8, t, { hat: i % 2 ? 'pagdi' : 'none', ...POSE.salute, ph: i, still: true });
    ctx.restore(); slam('1974  ·  घर वापसी', 230, t, at(1, 0.3), 90); }
  grade('archival', t, ERA * 0.5);
};

S.end = (t) => endCard(t, 'ऊधम सिंह के लिए एक शब्द लिखिए');
