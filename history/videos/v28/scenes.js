// @common2
// ---------------- video 28 - Kakori train action ----------------
const BISMIL = { hat: 'none', moustache: true, cloth: '#e3d6b4' };
const ASHFAQ = { hat: 'none', hat2: 'topi', moustache: true, cloth: '#2e6b4a' };
const REV = { hat: 'none' };
function chest(x, y, s, open = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#3a3a40'; ctx.fillRect(-90, -90, 180, 90);
  ctx.save(); ctx.translate(-90, -90); ctx.rotate(-1.4 * open); ctx.fillRect(0, -16, 180, 18); ctx.restore();
  ctx.fillStyle = '#8a8a90'; ctx.fillRect(-12, -70, 24, 30); if (open > 0.5) { ctx.fillStyle = '#ffd34a'; for (let i = 0; i < 8; i++) ctx.fillRect(-70 + i * 18, -96, 12, 8); glow(0, -90, 80, '255,220,120', 0.6); } ctx.restore(); }
function lamps4(t, out) { const names = ['बिस्मिल', 'अशफ़ाक़', 'लाहिड़ी', 'रोशन सिंह']; for (let i = 0; i < 4; i++) { const x = 180 + i * 240, a = 1 - prog(t, out + i * 0.5, out + i * 0.5 + 0.6); ctx.save(); ctx.globalAlpha = 0.2 + 0.8 * a; lamp(x, 1160, 1.2, t); ctx.restore(); if (a < 1) smoke(x, 1060, t, i + 30, 5, 0.6, 0.25 * (1 - a)); chip(names[i], x, 1228, 34, 1); } }

// ---------- HOOK ----------
S.hook_train = (t) => {
  const c1 = cue(1)[0], brake = prog(t, c1, c1 + 1.2);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, D)), fy: 1050, shake: brake > 0 && brake < 1 ? 8 : 2 });
  bg(PAL.night, noise1(t * 2), 540, 700); stars(t, 0.5); moon(860, 300, 45);
  rails(1180, t, 1 - brake); hills(1000, 120, 2801, 0.35);
  train(540 - (1 - brake) * Math.sin(t) * 20, 1180, 0.95, t * (1 - brake), {}); ground(1200);
  if (brake > 0 && brake < 1) for (let i = 0; i < 4; i++) sparks(200 + i * 220, 1175, t, c1 + i * 0.1, 10, i + 3);
  slam('9 अगस्त 1925  ·  काकोरी', 220, t, 0.15, 78, { until: c1 });
  stamp('ज़ंजीर खींची!', 540, 380, t, c1 + 0.2, { size: 80 });
  grade('archival', t, 0.45);
};

// ---------- TITLE ----------
S.title = (t) => {
  cam(t, { z: lerp(1.1, 1, easeOut(prog(t, 0, 1.2))), shake: hit(t, 0, 0.6, 12) });
  bg(PAL.fire, noise1(t * 3), 540, 860); rays(540, 860, t, 0.09); sun(540, 860, 170, 0.95);
  hills(1100, 140, 2811, 0.6); ground(1200);
  for (let i = 0; i < 6; i++) actor(130 + i * 165, 1220, 1.0 + (i === 2 || i === 3 ? 0.25 : 0), t, { ...(i === 2 ? BISMIL : i === 3 ? ASHFAQ : REV), ...POSE.fist, ph: i });
  title2(t, 'काकोरी', '9 अगस्त 1925', { y: 220, size: 140 });
};

// ---------- WHY ----------
S.why = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.night, noise1(t * 2), 540, 760); ground(1180);
  lamp(540, 1100, 1.4, t);
  for (const [x, P, f] of [[300, BISMIL, 1], [780, ASHFAQ, -1], [180, REV, 1], [900, REV, -1]]) actor(x, 1180, x === 300 || x === 780 ? 1.1 : 0.9, t, { ...P, face: f, seated: true, ...(x === 300 && t > c1 ? POSE.point : POSE.pray), ph: x, shadow: false });
  chip('हिंदुस्तान रिपब्लिकन एसोसिएशन', 540, 240, 44, prog(t, 0.2, 0.6));
  if (t > c1) quoteCard('“सरकार का पैसा, सरकार से ही लेंगे”', 380, prog(t, c1 + 0.2, c1 + 0.6), 58);
  chip('राम प्रसाद बिस्मिल', 300, 1228, 36, prog(t, c1, c1 + 0.4));
};

// ---------- THE HEIST ----------
S.heist = (t) => {
  const c1 = cue(1)[0], hitT = at(0, 0.7), open = prog(t, hitT, hitT + 0.4);
  cam(t, { z: lerp(1, 1.12, prog(t, 0, c1)), fy: 1050, shake: hit(t, hitT, 0.5, 14) + hit(t, hitT - 0.6, 0.4, 8) });
  bg(PAL.night, noise1(t * 3), 540, 700); rails(1180, t, 0);
  ctx.save(); ctx.globalAlpha = 0.7; train(900, 1180, 0.95, 0, {}); ctx.restore(); ground(1200);
  chest(540, 1200, 1.3, open);
  const sw = pulse(t, 0.6);
  actor(380, 1200, 1.2, t, { ...ASHFAQ, fa: [lerp(2.9, 1.2, sw), 0.2], prop: 'lathi', ph: 1 });
  sparks(540, 1090, t, hitT - 0.6, 10, 2); sparks(540, 1090, t, hitT, 18, 4);
  chip('अशफ़ाक़ उल्ला ख़ाँ', 380, 760, 42, prog(t, 0.3, 0.8) * (1 - prog(t, c1 - 0.3, c1)));
  if (t > c1) { muzzle(820, 980, t, at(1, 0.55), -1, 0.8); overlay(() => { chip('यात्रियों को नहीं लूटा', 540, 360, 46, prog(t, c1, c1 + 0.4)); chip('पर एक यात्री की जान गई', 540, 460, 44, prog(t, at(1, 0.6), at(1, 0.8)), { color: '#ffb0a0' }); }); }
  grade('archival', t, 0.4);
};

// ---------- THE HUNT ----------
S.hunt = (t) => {
  const az = at(0, 0.7);
  cam(t, { z: lerp(1, 1.06, prog(t, 0, D)) });
  bg(PAL.sepia, 0, 540, 700);
  newspaper(540, 560, 760, 480, prog(t, 0.2, 0.7) * (1 - prog(t, az - 0.2, az)), 'काकोरी: देश भर में छापे', 'दर्जनों गिरफ़्तार', { masthead: 'समाचार, 1925', size: 58 });
  ground(1180);
  for (let i = 0; i < 4; i++) actor(160 + i * 120, 1180, 0.95, t, { ...REV, fa: [1.4, 1.6], sh: [-1.2, -1.6], ph: i, still: true });
  bars(0.6 * prog(t, 0.3, 1.0), 100, 620, 80);
  if (t > az) { actor(lerp(780, 1250, prog(t, az, D)), 1180, 1.1, t, { hat: 'none', moustache: true, walk: t * 9, ...POSE.reach, lean: 0.2, ph: 5 }); chip('चंद्रशेखर आज़ाद: कभी नहीं पकड़े गए', 540, 360, 44, prog(t, az, az + 0.4)); }
  grade('archival', t, 0.5);
};

// ---------- THE FRIENDS ----------
S.friends = (t) => {
  const c1 = cue(1)[0];
  cam(t, { z: lerp(1, 1.1, prog(t, 0, D)), fy: 1000 });
  bg(PAL.dusk2, 0, 540, 700); sun(540, 800, 130, 0.7); ground(1180);
  actor(400, 1180, 1.35, t, { ...BISMIL, ...POSE.hold, prop: 'book', ph: 1 });
  actor(680, 1180, 1.35, t, { ...ASHFAQ, face: -1, ...POSE.hold, prop: 'book', ph: 2 });
  glow(540, 880, 200, '255,220,150', 0.35);
  chip('बिस्मिल', 400, 1228, 38, prog(t, 0.2, 0.6)); chip('अशफ़ाक़', 680, 1228, 38, prog(t, 0.4, 0.8));
  chip('दोनों शायर  ·  पक्के दोस्त', 540, 300, 48, prog(t, at(0, 0.6), at(0, 0.8)));
  if (t > c1) slam('साथ जिए… साथ गए', 420, t, at(1, 0.4), 80);
};

// ---------- DECEMBER 1927 (lamps, no gallows) ----------
S.gallows = (t) => {
  cam(t, { z: lerp(1.05, 1, prog(t, 0, D)) });
  bg(PAL.jail, 0, 540, 700); ground(1180);
  lamps4(t, at(0, 0.5));
  slam('दिसंबर 1927', 300, t, at(0, 0.1), 100);
  grade('archival', t, 0.45);
};

// ---------- TWIST ----------
S.twist = (t) => {
  const c1 = cue(1)[0], now = prog(t, c1 - 0.3, c1 + 0.4);
  cam(t, { z: lerp(1, 1.08, prog(t, 0, D)) });
  bg(mixPal(PAL.dusk2, PAL.dawn, now), 0, 540, 700); rays(540, 700, t, 0.08);
  if (now < 1) { ctx.save(); ctx.globalAlpha = 1 - now; scroll(540, 640, 720, 340, prog(t, 0.3, 0.9), ['सरफ़रोशी की तमन्ना…'], {}); ground(1180); ctx.restore(); }
  if (now > 0) { ctx.save(); ctx.globalAlpha = now; rails(1180, t, 0.6); train(lerp(1400, 540, ss(now)), 1180, 0.9, t, {}); ground(1200); ctx.restore();
    slam('काकोरी ट्रेन एक्शन', 300, t, at(1, 0.4), 96); chip('2021 में नया नाम', 540, 440, 44, prog(t, at(1, 0.6), at(1, 0.8))); }
};

S.end = (t) => endCard(t, 'बिस्मिल और अशफ़ाक़ की दोस्ती पर आप क्या कहेंगे?');
