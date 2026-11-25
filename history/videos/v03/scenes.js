// @common: this video uses history/common.js (shared helpers), added in front by render.py
// ---------------- scenes: video 03 - Rani Lakshmibai of Jhansi ----------------
PAL.moon = ['#f6c27a', '#7a3a1e', '#140503'];
PAL.palace = ['#ffe0a0', '#c97a34', '#341205'];
PAL.cold = ['#e9c99a', '#7d4a2a', '#1d0a05'];

function cradle(x, y, s, rock) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(rock) * 0.08); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-110, -70); ctx.quadraticCurveTo(0, 20, 110, -70); ctx.lineTo(90, -70); ctx.quadraticCurveTo(0, -10, -90, -70); ctx.fill();
  ctx.fillRect(-100, -80, 200, 14);
  ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-95, -80); ctx.lineTo(0, -300); ctx.lineTo(95, -80); ctx.stroke();
  ctx.restore();
}
function jhansiFort(x, y, s, t) { fort(x, y, s, t); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - 300 * s); ctx.lineTo(x, y - 300 * s - 120); ctx.stroke(); flag(x, y - 300 * s - 120, 70, 44, t, SAFFRON); ctx.restore(); }
const RANI = { woman: true, hat: 'pagdi' };

// ---------- HOOK: a rider on the wall at night ----------
S.hook_wall = (t) => {
  bg(PAL.moon, noise1(t * 3), 700, 520);
  moon(760, 420, 130);
  hills(960, 110, 31, 0.5);
  // the British camp on the plain below, in haze: tents, fires, cannons that flash
  ctx.save(); ctx.fillStyle = 'rgba(20,9,4,0.72)'; ctx.fillRect(-40, 1000, W + 80, 400); ctx.restore();
  for (const [x, s] of [[90, 0.42], [260, 0.36], [830, 0.4], [1000, 0.34]]) tent(x, 1040, s, 0.5 + 0.5 * Math.sin(t * 3 + x));
  for (const [x, sd] of [[180, 1], [360, 2], [720, 3], [930, 4]]) campfire(x, 1046, t, sd, 0.55);
  const f1 = Math.max(0, Math.sin(t * 2.3)) ** 14, f2 = Math.max(0, Math.sin(t * 2.3 + 2.2)) ** 14;
  cannon(150, 1085, 0.5, 1, f1); cannon(930, 1085, 0.5, -1, f2);
  flash(0.08 * Math.max(f1, f2), '255,214,150');
  // the fort wall in front, with a lit top edge so it reads as a wall
  wall(1150);
  ctx.save(); ctx.strokeStyle = 'rgba(255,200,130,0.4)'; ctx.lineWidth = 3;
  ctx.beginPath(); for (let x = -40; x < W + 40; x += 70) { ctx.moveTo(x, 1106); ctx.lineTo(x + 40, 1106); } ctx.stroke(); ctx.restore();
  // the queen on the wall, against the moon; she raises the sword on line 2, the child on her back glows
  const up = on(t, 1, 0.45, 0.6);
  glow(560, 900, 300, '255,225,170', 0.25);
  rider(560, 1108, 1.4, t * 0.15, { ...RANI, still: true, rear: 0.3 + 0.06 * Math.sin(t * 1.5), child: true,
    childGlow: on(t, 1, 0.05, 0.5) * (1 - on(t, 1, 0.6, 0.6) * 0.6), fa: [lerp(2.2, 2.95, up), lerp(0.4, 0.05, up)] });
  chip('झाँसी  ·  1858', 540, 170, 50, on(t, 0, 0.6, 0.5));
};

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.dawn, noise1(t * 3), 540, 760);
  sun(540, 760, 170, 0.85);
  hills(1000, 220, 32, 0.5); hills(1060, 140, 33, 0.75);
  jhansiFort(830, 1150, 0.42, t);
  ground(1180);
  rider(430, 1185, 1.15, t * 0.25, { ...RANI, fa: [2.6, 0.2] });
  titleCard(t, 'रानी लक्ष्मीबाई', 'झाँसी की रानी  ·  1857–58');
};

// ---------- PART 1: Manikarnika becomes the queen; the son dies; Damodar is adopted ----------
S.jhansi = (t) => {
  bg(PAL.palace, noise1(t * 2), 540, 640);
  // palace arches
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(-40, 150, W + 80, 1050);
  for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(255,214,150,0.32)'; ctx.beginPath(); const x = 150 + i * 260; ctx.moveTo(x - 90, 1150); ctx.lineTo(x - 90, 640); ctx.quadraticCurveTo(x, 470, x + 90, 640); ctx.lineTo(x + 90, 1150); ctx.fill(); }
  ctx.restore();
  ground(1180);
  const sad = on(t, 1, 0.0, 0.8), ad = on(t, 2, 0.0, 0.6), kingGone = on(t, 2, 0.6, 1.2);
  // line 1: Manikarnika, then the queen
  glow(420, 950, 260, '255,210,140', 0.4);
  woman(420, 1185, 1.05, { face: 1, fa: [0.4, -0.5], sh: [-0.3, -0.3], t, hat: 'none' });
  chip(t < at(0, 0.55) ? 'मणिकर्णिका  ·  बनारस' : 'झाँसी की रानी', 540, 175, 50, on(t, 0, 0.1, 0.4) * (1 - on(t, 1, 0, 0.3)));
  // line 2: an empty cradle, the lamp goes low
  if (sad > 0 && ad < 1) {
    ctx.save(); ctx.globalAlpha = sad * (1 - ad);
    cradle(720, 1180, 1.0, t * 1.2 * (1 - sad));
    lamp(900, 1180, 1.0, t); ctx.restore();
    dim(0.25 * sad * (1 - ad));
  }
  // line 3: the king with the adopted child; then the king fades away
  if (ad > 0) {
    ctx.save(); ctx.globalAlpha = ad * (1 - kingGone);
    person(740, 1185, 1.05, { face: -1, hat: 'crown', fa: [0.9, -1.2], sh: [-0.2, -0.3] });
    ctx.restore();
    ctx.save(); ctx.globalAlpha = ad;
    person(620, 1185, 0.5, { face: -1, hat: 'pagdi', fa: [0.6, -0.6] });
    ctx.restore();
    chip('दामोदर राव', 620, 960, 40, on(t, 2, 0.25, 0.4));
  }
};

// ---------- PART 2: the British claim; "I will not give my Jhansi" ----------
S.lapse = (t) => {
  bg(PAL.cold, noise1(t * 2), 540, 700);
  hills(1000, 160, 34, 0.4);
  jhansiFort(540, 1060, 0.55, t);
  ground(1180);
  const rq = on(t, 1, 0.0, 0.5);
  redcoat(800, 1185, 1.0, { face: -1, fa: [1.3, -0.6], wpn: null });
  scroll(540, 520, 760, 330, on(t, 0, 0.1, 0.6) * (1 - rq), ['ईस्ट इंडिया कंपनी का फ़रमान', 'गोद लिया बेटा वारिस नहीं', 'झाँसी अब कंपनी की'], { seal: true });
  glow(300, 950, 260, '255,200,120', 0.25 + 0.35 * rq);
  woman(300, 1185, 1.15, { face: 1, hat: 'none', wpn: 'sword', fa: [lerp(0.4, 2.7, rq), lerp(-0.4, 0.15, rq)], sh: [-0.3, -0.3], t });
  quoteCard('मैं अपनी झाँसी नहीं दूँगी!', 470, on(t, 1, 0.2, 0.5), 76);
};

// ---------- PART 3: the siege of 1858 ----------
S.siege = (t) => {
  bg(PAL.battle, noise1(t * 4), 540, 620);
  for (let k = 0; k < 3; k++) smoke(200 + k * 330, 1100, t, 40 + k, 8, 1.1, 0.2);
  hills(980, 120, 35, 0.35);
  jhansiFort(540, 1080, 0.62, t);
  // cannons on both sides fire in turns
  const f1 = Math.max(0, Math.sin(t * 3.1)) ** 12, f2 = Math.max(0, Math.sin(t * 3.1 + 2)) ** 12;
  ground(1180);
  cannon(110, 1260, 0.9, 1, f1); cannon(970, 1260, 0.9, -1, f2);
  for (let i = 0; i < 4; i++) redcoat(160 + i * 60, 1290, 0.6, { face: 1 });
  for (let i = 0; i < 4; i++) redcoat(920 - i * 60, 1290, 0.6, { face: -1 });
  flash(0.12 * Math.max(f1, f2));
  bigYear('1858', 220, on(t, 0, 0.0, 0.4) * (1 - on(t, 1, 0.0, 0.4)), 130);
  // line 2: the queen fighting on the walls
  const q = on(t, 1, 0.0, 0.6);
  if (q > 0) {
    ctx.save(); ctx.globalAlpha = q; glow(540, 790, 180, '255,210,140', 0.5);
    woman(540, 900, 0.7, { face: 1, hat: 'pagdi', wpn: 'sword', fa: [2.4 + Math.sin(t * 5) * 0.4, 0.2], sh: [-0.3, -0.3], t });
    ctx.restore();
    chip('दो हफ़्ते की घेराबंदी', 540, 220, 48, on(t, 1, 0.3, 0.5));
  }
};

// ---------- PART 4: the night escape ----------
S.escape = (t) => {
  bg(PAL.moon, noise1(t * 3), 760, 560);
  moon(820, 420, 90);
  ctx.save(); ctx.globalAlpha = 0.6; jhansiFort(200, 1060, 0.45, t); ctx.restore();
  hills(1080, 90, 36, 0.6);
  ground(1170);
  // she rides out through the camp, left to right
  const rx = lerp(160, 900, prog(t, cue(0)[0], D));
  for (const [x, s] of [[520, 0.5], [760, 0.45]]) tent(x, 1170, s, 0.6);
  rider(rx, 1175, 1.0, t, { ...RANI, child: true, childGlow: on(t, 0, 0.35, 0.5) * (1 - on(t, 0, 0.8, 0.6)), fa: [2.0, 0.6], sh: [0.4, 0.5] });
  for (let i = 0; i < 3; i++) redcoat(rx - 260 - i * 90, 1175, 0.7, { face: 1, walk: t * 6 + i, fa: [1.4, -0.3], spearA: -1.2 });
  mapCard(t, on(t, 1, 0.0, 0.4), [[720, 400, 'झाँसी'], [880, 680, 'कालपी', 0, 52]], prog(t, at(1, 0.1), cue(1)[1]), { x: 620, y: 300, w: 400, h: 470 });
};

// ---------- PART 5: Gwalior taken with Tatya Tope ----------
S.gwalior = (t) => {
  bg(PAL.dawn, noise1(t * 2), 540, 700);
  sun(540, 720, 140, 0.7);
  hills(1000, 300, 37, 0.85);
  const win = on(t, 0, 0.55, 0.6);
  fort(540, 820, 0.5, t);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(540, 670); ctx.lineTo(540, 670 - 150 * win); ctx.stroke(); ctx.restore();
  if (win > 0) bhagwa(540, 670, 150 * win, t);
  ground(1180);
  rider(360, 1185, 1.0, t * 0.2, { ...RANI, fa: [2.7, 0.1] });
  person(760, 1185, 1.1, { face: -1, hat: 'turban', wpn: 'sword', fa: [2.6, 0.2], sh: [-0.3, -0.3] });
  chip('तात्या टोपे', 760, 760, 42, on(t, 0, 0.15, 0.4));
  chip('ग्वालियर  ·  जून 1858', 540, 175, 48, on(t, 0, 0.6, 0.4));
};

// ---------- PART 6: the last battle ----------
S.last = (t) => {
  const end = on(t, 1, 0.4, 1.4);
  bg(mixPal(PAL.battle, PAL.dawn, end), noise1(t * 4), 540, 700);
  sun(540, lerp(760, 900, end), 150, 0.6 + 0.3 * end);
  for (let k = 0; k < 2; k++) smoke(300 + k * 500, 1150, t, 50 + k, 8, 1.0, 0.18 * (1 - end));
  hills(1040, 140, 38, 0.6);
  ground(1180);
  for (let i = 0; i < 5; i++) redcoat(700 + i * 80, 1185, 0.8, { face: -1, walk: (1 - end) * t * 5 + i, fa: [1.4, -0.3], spearA: 1.2 });
  ctx.save(); ctx.globalAlpha = 1 - 0.5 * end;
  rider(lerp(320, 420, prog(t, 0, at(1, 0.4))), 1185, 1.1, t * (1 - end), { ...RANI, fa: [2.5 + Math.sin(t * 6) * 0.3 * (1 - end), 0.2], rear: 0.15 * (1 - end) });
  ctx.restore();
  glow(420, 950, 300, '255,225,170', 0.5 * end);
  bigYear('18 जून 1858', 220, on(t, 0, 0.0, 0.4) * (1 - on(t, 1, 0.0, 0.4)), 104);
  quoteCard('विद्रोहियों में सबसे बहादुर', 380, on(t, 2, 0.35, 0.5), 66);
};

// ---------- PART 7: the twist - the Rani of Jhansi Regiment (1943) ----------
S.twist = (t) => {
  const rev = on(t, 1, 0.0, 0.7);
  bg(mixPal(PAL.moon, PAL.dawn, rev), 0, 540, 700);
  ground(1200);
  if (rev < 1) { ctx.save(); ctx.globalAlpha = 1 - rev; glow(540, 900, 260, '255,210,140', 0.4); rider(520, 1205, 1.1, 0, { ...RANI, still: true, fa: [2.6, 0.2] }); ctx.restore(); }
  if (rev > 0) {
    ctx.save(); ctx.globalAlpha = rev;
    for (let i = 0; i < 6; i++) { const x = lerp(-200, 150, prog(t, at(1, 0), D)) + i * 150;
      woman(x, 1205 + (i % 2) * 18, 0.78, { face: 1, hat: 'none', wpn: 'spear', spearA: -0.1, fa: [0.5, -1.3], walk: t * 5 + i, t, noSkirt: true }); }
    ctx.restore();
    textBlock('1858  →  1943', 540, 360, 60, { alpha: rev, color: '#ffe2b8' });
    chip('रानी झाँसी रेजिमेंट', 540, 230, 54, on(t, 1, 0.55, 0.5));
    chip('नेताजी सुभाष चंद्र बोस', 540, 470, 42, on(t, 1, 0.25, 0.4) * (1 - on(t, 2, 0, 0.3)));
  }
  followChip(t, 2);
};
