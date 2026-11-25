// ---------------- scenes: video 02 - Shivaji Maharaj's escape from Agra (1666) ----------------
// Every timed moment is tied to a narration line (cue i = [start, end]) so picture follows the voice.
let D = 10;
const cue = i => CUES[i] || [D, D];
const at = (i, f) => lerp(cue(i)[0], cue(i)[1], f);
const S = {};
PAL.agra = ['#ffcf7a', '#c0602a', '#2b0c05'];
PAL.court = ['#ffe0a0', '#d98a3c', '#3a1406'];
PAL.dusk = ['#f6b26b', '#a8452a', '#2a0a08'];
PAL.room = ['#f2b25a', '#8a3c18', '#1b0603'];
const GOLDEN = '#ffcf5a';

function ground(y = 1250) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(-50, y, W + 100, 400); ctx.restore(); }
function bigYear(txt, y, a, size = 120) { textBlock(txt, 540, y, size, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,160,60,0.8)', sw: 18 }); }

// Mughal cusped arch (scalloped), as a hole in a wall
function cuspArch(x, y, w, h, col = HOLE) {
  ctx.save(); ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w / 2, y - h * 0.62);
  const n = 5, top = y - h;
  for (let k = 0; k <= n; k++) {
    const a = Math.PI - k / n * Math.PI;
    const px = x + Math.cos(a) * w / 2, py = y - h * 0.62 - Math.sin(a) * (h * 0.38);
    if (k === 0) continue;
    const pa = Math.PI - (k - 0.5) / n * Math.PI;
    ctx.quadraticCurveTo(x + Math.cos(pa) * w * 0.42, y - h * 0.62 - Math.sin(pa) * h * 0.30, px, py);
  }
  ctx.lineTo(x + w / 2, y); ctx.closePath(); ctx.fill(); ctx.restore();
}
function mughalHall(y = 1150, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = INK;
  ctx.fillRect(-40, 120, W + 80, y - 120);
  for (let i = 0; i < 5; i++) cuspArch(108 + i * 216, y - 40, 170, 560, 'rgba(255,214,150,0.38)');
  ctx.fillStyle = INK; for (let i = 0; i < 6; i++) ctx.fillRect(i * 216 - 20, 380, 40, y - 420);
  ctx.fillStyle = HOLE; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(20 + i * 41, 300, 5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function throneDais(x, y, s) {   // raised jharokha platform with canopy
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-170, -60, 340, 60); ctx.fillRect(-140, -90, 280, 30);
  ctx.fillRect(-150, -420, 18, 330); ctx.fillRect(132, -420, 18, 330);
  ctx.beginPath(); ctx.moveTo(-180, -420); ctx.quadraticCurveTo(0, -560, 180, -420); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -540, 14, 0, 7); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-120 + i * 30, -40, 5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function haveli(x, y, s, t) {  // the camp / house in Agra where he was held
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-320, -300, 640, 300); ctx.fillRect(-340, -320, 680, 26);
  for (const cx of [-240, 240]) { ctx.fillRect(cx - 60, -400, 120, 80); ctx.beginPath(); ctx.moveTo(cx - 75, -400); ctx.quadraticCurveTo(cx, -490, cx + 75, -400); ctx.fill(); ctx.fillRect(cx - 4, -520, 8, 40); }
  ctx.beginPath(); ctx.moveTo(-130, -320); ctx.quadraticCurveTo(0, -470, 130, -320); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) cuspArch(-210 + i * 140, -30, 90, 200, `rgba(255,190,110,${0.45 + 0.15 * Math.sin(t * 3 + i)})`);
  ctx.restore();
}
function cannon(x, y, s, face = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.arc(-20, -30, 30, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(40, -30, 30, 0, 7); ctx.fill();
  ctx.save(); ctx.translate(0, -60); ctx.rotate(-0.25); ctx.fillRect(-40, -18, 180, 36); ctx.fillRect(130, -24, 20, 48); ctx.restore();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(-20, -30, 8, 0, 7); ctx.arc(40, -30, 8, 0, 7); ctx.fill();
  ctx.restore();
}
function basket(x, y, s, open = 0, ghost = 0) {   // big round sweet basket, lid can lift; ghost = hidden person showing through
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-70, -110); ctx.quadraticCurveTo(-82, 0, -50, 0); ctx.lineTo(50, 0); ctx.quadraticCurveTo(82, 0, 70, -110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = HOLE;
  for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(-54 + k * 18 + (r % 2) * 9, -92 + r * 24, 5, 3, 0, 0, 7); ctx.fill(); }
  if (ghost > 0) {
    ctx.save(); ctx.globalAlpha = ghost; ctx.strokeStyle = '#ffe3a8'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.arc(-10, -78, 16, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(8, -40, 40, 26, 0.3, 0, 7); ctx.stroke(); ctx.restore();
    glow(0, -55, 90, '255,220,140', 0.25 * ghost);
  }
  ctx.fillStyle = INK; ctx.save(); ctx.translate(-72, -112); ctx.rotate(-open * 0.9);
  ctx.beginPath(); ctx.ellipse(72, 0, 80, 14, 0, 0, 7); ctx.fill(); ctx.fillRect(66, -26, 12, 16); ctx.restore();
  ctx.restore();
}
function porters(x, y, s, t, ghosts = [0, 0], open = 0) {  // two porters carrying two baskets on a pole
  const ph = t * 5;
  person(x - 150 * s, y, 0.85 * s, { walk: ph, hat: 'turban', fa: [3.0, 0.1], sh: [2.9, 0.2] });
  person(x + 150 * s, y, 0.85 * s, { walk: ph + 2, hat: 'turban', fa: [3.0, 0.1], sh: [2.9, 0.2] });
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(x - 200 * s, y - 265 * s); ctx.lineTo(x + 200 * s, y - 265 * s); ctx.stroke(); ctx.restore();
  for (const [k, bx] of [[0, -60], [1, 60]]) {
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x + bx * s - 40 * s, y - 265 * s); ctx.lineTo(x + bx * s, y - 185 * s); ctx.lineTo(x + bx * s + 40 * s, y - 265 * s); ctx.stroke(); ctx.restore();
    basket(x + bx * s, y - 70 * s + Math.sin(ph * 2 + k) * 3, 0.95 * s, k === 0 ? open : 0, ghosts[k]);
  }
}
function quilt(x, y, w, t) {
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x - w / 2, y);
  for (let i = 0; i <= 10; i++) ctx.lineTo(x - w / 2 + i * w / 10, y - 70 - Math.sin(i * 1.3) * 12 - (i > 6 ? 18 : 0) + Math.sin(t * 1.2) * 1.5);
  ctx.lineTo(x + w / 2, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(x - w / 2 + 40 + i * (w - 80) / 7, y - 30, 5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function bhagwa(x, y, h, t) {   // saffron swallow-tail flag
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
  ctx.fillStyle = '#ff8a1e'; ctx.beginPath(); ctx.moveTo(x, y - h);
  for (let i = 0; i <= 10; i++) { const u = i / 10; ctx.lineTo(x + u * 150, y - h + u * 20 + Math.sin(u * 5 - t * 5) * 8 * u); }
  ctx.lineTo(x + 100, y - h + 55 + Math.sin(3 - t * 5) * 6);
  for (let i = 10; i >= 0; i--) { const u = i / 10; ctx.lineTo(x + u * 150, y - h + 110 - u * 20 + Math.sin(u * 5 - t * 5) * 8 * u); }
  ctx.closePath(); ctx.fill(); glow(x + 60, y - h + 55, 140, '255,150,40', 0.35);
  ctx.restore();
}
const SHIVAJI = { hat: 'pagdi', rods: true };

// ---------- HOOK: the empty room ----------
S.hook_door = (t) => {
  bg(PAL.room, noise1(t * 4), 540, 700);
  // inner room seen through the doorway: dawn light, an empty bed
  const op = 0.18 + 0.82 * easeOut(prog(t, 0.0, 1.4));   // doors already ajar on the first frame, swing open
  ctx.save(); ctx.fillStyle = 'rgba(40,16,6,0.78)'; ctx.fillRect(0, 0, W, 1400);
  ctx.beginPath(); ctx.rect(240, 260, 600, 1000); ctx.clip();
  bg(PAL.agra, 0, 540, 560);
  ctx.fillStyle = 'rgba(255,240,200,0.12)'; ctx.beginPath(); ctx.moveTo(700, 260); ctx.lineTo(840, 260); ctx.lineTo(560, 1260); ctx.lineTo(380, 1260); ctx.fill();
  cuspArch(720, 620, 150, 300, 'rgba(255,240,200,0.75)');
  bed(540, 1080, 460); quilt(540, 1050, 420, 0);
  ctx.restore();
  // the doors (perspective: they narrow as they open)
  ctx.save(); ctx.fillStyle = INK;
  const dw = 300 * (1 - op * 0.82);
  ctx.fillRect(240, 260, dw, 1000); ctx.fillRect(840 - dw, 260, dw, 1000);
  ctx.fillStyle = HOLE; for (const x0 of [240 + dw / 2, 840 - dw / 2]) for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(x0, 360 + k * 150, 7 * (1 - op * 0.6), 0, 7); ctx.fill(); }
  ctx.restore();
  // frame of the doorway
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(200, 220, 680, 50); ctx.fillRect(200, 220, 44, 1080); ctx.fillRect(836, 220, 44, 1080); ctx.restore();
  // guards in the foreground, startled on line 1's last words
  torch(70, 1300, 420, t, 3); torch(1010, 1300, 420, t, 4);
  const shock = prog(t, at(0, 0.7), at(0, 0.7) + 0.4);
  person(150, 1320, 1.25, { hat: 'helmet', wpn: 'spear', fa: [lerp(0.5, 1.4, shock), lerp(-1.3, -0.6, shock)], spearA: lerp(-0.05, -0.4, shock), lean: lerp(0, -0.12, shock) });
  person(930, 1320, 1.25, { face: -1, hat: 'helmet', wpn: 'spear', fa: [lerp(0.5, 1.8, shock), lerp(-1.3, -0.3, shock)], spearA: lerp(-0.05, 0.3, shock), lean: lerp(0, 0.1, shock) });
  ground(1310);
  if (shock > 0) { ctx.save(); ctx.globalAlpha = 0.35 * (1 - prog(t, at(0, 0.7) + 0.3, at(0, 0.7) + 1.2)); ctx.fillStyle = '#fff3d0'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  textBlock('ख़ाली!', 540, 170, 110, { font: SERIF, color: GOLD, alpha: shock * (1 - prog(t, cue(1)[0] + 0.5, cue(1)[0] + 1.0)), glow: 'rgba(255,160,60,0.9)', sw: 16 });
  chip('आगरा  ·  1666', 540, 170, 50, prog(t, cue(1)[0] + 0.8, cue(1)[0] + 1.3));
};

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.dusk, noise1(t * 3), 540, 760);
  sun(540, 760, 170, 0.85);
  hills(1000, 220, 201, 0.5); hills(1060, 140, 202, 0.75);
  bhagwa(860, 1060, 330, t);
  ground(1180);
  horse(500, 1185, 1.15, t * 0.25, 0, false);
  person(490, 1185 - 98 * 1.15, 1.15 * 0.8, { seated: true, ...SHIVAJI, wpn: 'sword', fa: [2.6, 0.2], sh: [0.4, 0.5] });
  const a = easeOut(prog(t, 0.0, 0.7));
  ctx.save(); const sc = lerp(1.18, 1, a); ctx.translate(540, 300); ctx.scale(sc, sc); ctx.translate(-540, -300);
  textBlock('छत्रपति शिवाजी महाराज', 540, 240, 92, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,150,50,0.9)', sw: 16, maxW: 980 });
  ctx.restore();
  textBlock('आगरा से पलायन  ·  1666', 540, 375, 60, { alpha: prog(t, 0.4, 1.0) });
};

// ---------- PART 1: the insult at court ----------
S.court = (t) => {
  bg(PAL.court, noise1(t * 2), 540, 600);
  mughalHall(1150);
  throneDais(540, 1000, 1.0);
  person(540, 940, 0.95, { seated: true, hat: 'crown', fa: [0.6, -0.4], sh: [0.3, -0.3] });
  ground(1150);
  // nobles in rows; Shivaji is pushed to the back row (line 2), then turns and walks out (line 3)
  const rowY = 1150;
  for (let i = 0; i < 6; i++) person(170 + i * 150 - (i > 2 ? -30 : 0), rowY, 0.62, { hat: 'turban', face: i < 3 ? 1 : -1, fa: [0.2, -0.3] });
  const back = easeOut(prog(t, cue(1)[0], cue(1)[0] + 1.2));
  const leave = prog(t, at(2, 0.55), D);
  const turned = t >= at(2, 0.5);
  const sx = lerp(lerp(540, 900, back), 1300, leave), sy = 1150;
  glow(sx, 960, 260, '255,200,120', 0.35);
  person(sx, sy, lerp(1.0, 0.8, back), { ...SHIVAJI, face: turned ? 1 : -1, walk: (back > 0 && back < 1) || leave > 0 ? t * 6 : null, fa: [0.3, -0.3], wpn: 'sword', lean: turned ? -0.04 : 0.02 });
  const l0 = prog(t, 0.0, 0.5) * (1 - prog(t, cue(1)[0] - 0.3, cue(1)[0]));
  bigYear('12 मई 1666', 210, l0, 100);
  chip('आगरा  ·  औरंगज़ेब का दरबार', 540, 330, 44, l0);
  chip('5000 वाले मनसबदारों की कतार में', 540, 175, 42, prog(t, at(1, 0.4), at(1, 0.4) + 0.5) * (1 - prog(t, cue(2)[0] - 0.2, cue(2)[0] + 0.2)), { color: '#ff9c7a' });
  quoteCard('अपमान सहना उनकी आदत नहीं थी', 330, prog(t, cue(2)[0] + 0.2, cue(2)[0] + 0.7), 58);
};

// ---------- PART 2: house arrest ----------
S.arrest = (t) => {
  bg(PAL.agra, noise1(t * 4), 540, 700);
  moon(820, 330, 80);
  hills(860, 120, 301, 0.3);
  haveli(540, 1050, 1.0, t);
  ground(1050);
  // soldiers close in on line 1
  const ring = easeOut(prog(t, cue(0)[0] - 0.2, cue(0)[1] + 0.6));
  for (let i = 0; i < 7; i++) {
    const side = i < 4 ? -1 : 1; const k = i < 4 ? i : i - 4;
    const x = side < 0 ? lerp(-200, 90 + k * 80, ring) : lerp(1280, 990 - k * 80, ring);
    person(x, 1215 + (k % 2) * 25, 0.85, { face: side < 0 ? 1 : -1, walk: ring < 1 ? t * 6 + i : null, hat: 'helmet', wpn: 'spear', fa: [0.5, -1.3] });
  }
  cannon(lerp(-200, 120, ring), 1130, 0.8, 1); cannon(lerp(1280, 960, ring), 1130, 0.8, -1);
  torch(330, 1250, 260, t, 1); torch(750, 1250, 260, t, 2);
  // Shivaji and young Sambhaji at the window on line 2
  const win = prog(t, cue(1)[0] - 0.2, cue(1)[0] + 0.6);
  if (win > 0) {
    ctx.save(); ctx.globalAlpha = win;
    glow(540, 900, 200, '255,200,120', 0.5);
    person(500, 1022, 0.62, { ...SHIVAJI, rods: false, fa: [0.6, -0.3] });
    person(585, 1022, 0.4, { hat: 'pagdi', face: -1, fa: [0.4, -0.3] });
    ctx.restore();
  }
  chip('नज़रबंद', 540, 175, 54, prog(t, cue(1)[0] + 0.5, cue(1)[0] + 1.0));
};

// ---------- PART 3: the plan ----------
S.plan = (t) => {
  bg(PAL.agra, noise1(t * 3), 540, 760);
  hills(880, 140, 401, 0.3);
  ctx.save(); ctx.globalAlpha = 0.55; haveli(540, 1000, 0.75, t); ground(1000); ctx.restore();
  // line 1: "ill" - a lamp-lit window, a physician walks in
  const ill = prog(t, cue(0)[0], cue(0)[0] + 0.6) * (1 - prog(t, cue(1)[0], cue(1)[0] + 0.5));
  if (ill > 0) { ctx.save(); ctx.globalAlpha = ill; person(lerp(-100, 380, prog(t, cue(0)[0], cue(1)[0])), 1215, 0.9, { walk: t * 5, hat: 'turban', fa: [0.6, -0.8] }); ctx.restore(); }
  chip('बीमार?', 540, 175, 56, ill);
  // line 2: baskets of sweets leave every day
  const go = prog(t, cue(1)[0] - 0.3, D);
  if (go > 0) {
    const x = ((t - cue(2)[0] + 1030 / 115) * 115 % 1500 + 1500) % 1500 - 250;   // a steady stream; one reaches the guard as line 3 starts
    // guard at the gate: checks the lid on line 2/early line 3, waves through later in line 3
    const checking = t < at(2, 0.55);
    const lid = checking ? Math.max(0, Math.sin((t - cue(1)[0]) * 1.8)) * prog(t, cue(1)[0] + 0.8, cue(1)[0] + 1.2) : 0;
    porters(x, 1230, 0.85, t, [0, 0], lid);
    for (const dx of [500, 1000]) porters(((x - dx) + 1750) % 1500 - 250, 1230, 0.85, t + dx / 300, [0, 0], 0);
    person(800, 1235, 1.0, { face: -1, hat: 'helmet', wpn: 'spear', fa: checking ? [1.4, -0.4] : [0.5, -1.3], spearA: -0.05, lean: checking ? 0.15 : -0.05 });
    if (!checking) chip('जाँच बंद', 800, 760, 46, prog(t, at(2, 0.55), at(2, 0.55) + 0.4), { color: '#a8ff9c' });
  }
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(0, 1240); ctx.quadraticCurveTo(540, 1220, W, 1240); ctx.lineTo(W, 1500); ctx.lineTo(0, 1500); ctx.fill(); ctx.restore();
  chip('मिठाइयों की टोकरियाँ', 540, 175, 48, prog(t, cue(1)[0] + 0.3, cue(1)[0] + 0.8) * (1 - prog(t, cue(2)[0] - 0.2, cue(2)[0] + 0.2)));
};

// ---------- PART 4: the escape ----------
S.escape = (t) => {
  // lines 1-2 and 4: at the gate at dawn; line 3: the decoy in the bed
  const bedOn = prog(t, cue(2)[0] - 0.2, cue(2)[0] + 0.3) * (1 - prog(t, cue(3)[0] - 0.3, cue(3)[0] + 0.1));
  bg(PAL.agra, noise1(t * 3), 540, 760);
  hills(880, 140, 501, 0.3);
  ctx.save(); ctx.globalAlpha = 0.55; haveli(540, 1000, 0.75, t); ground(1000); ctx.restore();
  // they wait near the door, then pass the guard exactly while line 4 is spoken
  const x = prog(t, cue(3)[0], cue(3)[1] + 0.4) > 0 ? lerp(470, 1350, prog(t, cue(3)[0], cue(3)[1] + 0.4)) : lerp(200, 470, prog(t, cue(1)[0] - 0.3, cue(2)[0]));
  const ghost = [prog(t, at(1, 0.05), at(1, 0.3)), prog(t, at(1, 0.55), at(1, 0.8))];   // "एक टोकरी में शिवाजी… दूसरी में संभाजी"
  porters(x, 1230, 0.95, t, ghost, 0);
  person(800, 1235, 1.0, { face: -1, hat: 'helmet', wpn: 'spear', fa: [0.5, -1.3], spearA: -0.05, lean: -0.05 + Math.sin(t * 0.8) * 0.02 });
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(0, 1240); ctx.quadraticCurveTo(540, 1220, W, 1240); ctx.lineTo(W, 1500); ctx.lineTo(0, 1500); ctx.fill(); ctx.restore();
  bigYear('17 अगस्त 1666', 200, prog(t, 0.0, 0.5) * (1 - prog(t, cue(1)[0] + 1.5, cue(1)[0] + 2.0)), 100);
  chip('शिवाजी', x - 57, 900, 36, ghost[0] * (1 - bedOn) * (1 - prog(t, cue(3)[0] + 1.0, cue(3)[0] + 1.6)));
  chip('संभाजी', x + 57, 960, 36, ghost[1] * (1 - bedOn) * (1 - prog(t, cue(3)[0] + 1.0, cue(3)[0] + 1.6)));
  if (bedOn > 0) {
    ctx.save(); ctx.globalAlpha = bedOn;
    bg(PAL.room, noise1(t * 5), 380, 760);
    lamp(170, 1150, 1.3, t);
    drapes(t);
    bed(600, 1060, 600);
    // Hiroji under the quilt, one arm out with the gold wristlet
    quilt(600, 1032, 520, t);
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(855, 990, 30, 0, 7); ctx.fill();
    ctx.strokeStyle = INK; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(700, 1000); ctx.lineTo(760, 1060); ctx.lineTo(860, 1075); ctx.stroke();
    const shine = 0.6 + 0.4 * Math.sin(t * 6);
    ctx.fillStyle = GOLDEN; ctx.beginPath(); ctx.ellipse(800, 1068, 10, 16, 0.2, 0, 7); ctx.fill();
    glow(800, 1068, 70, '255,210,90', 0.7 * shine * prog(t, at(2, 0.7), at(2, 0.85)));
    ctx.restore();
    chip('हिरोजी फ़र्ज़ंद', 540, 175, 48, bedOn * prog(t, at(2, 0.35), at(2, 0.45)));
  }
};

// ---------- PART 5: the road home ----------
S.journey = (t) => {
  bg(mixPal(PAL.agra, PAL.court, prog(t, 0, D)), 0, 760, 680);
  sun(820, lerp(820, 560, prog(t, 0, D)), 110, 0.8);
  hills(930, 260, 601, 0.3); hills(980, 170, 602, 0.55);
  ground(1180);
  for (const [tx, s, sd] of [[90, 0.9, 3], [980, 1.0, 4]]) tree(tx, 1185, s, t, sd);
  // sadhus on the road
  const wx = lerp(-150, 760, prog(t, 0, D));
  for (let i = 0; i < 3; i++) {
    const px = wx - i * 150, s = i === 0 ? 1.1 : 0.9;
    person(px, 1185, s, { walk: t * 4 + i, hat: i === 0 ? 'pagdi' : 'turban', fa: [0.9, -0.9], sh: [-0.3, -0.3] });
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px + 60 * s, 1185 - 330 * s); ctx.lineTo(px + 70 * s, 1185); ctx.stroke(); ctx.restore();
  }
  // a small map: Agra -> Swarajya, the dotted route grows on line 2
  const m = prog(t, cue(1)[0] - 0.3, cue(1)[0] + 0.3), rp = prog(t, cue(1)[0], cue(1)[1]);
  if (m > 0) {
    ctx.save(); ctx.globalAlpha = m;
    ctx.fillStyle = 'rgba(245,227,187,0.95)'; ctx.strokeStyle = 'rgba(70,32,12,0.9)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(640, 300, 380, 470, 18); ctx.fill(); ctx.stroke();
    const A = [880, 380], B = [740, 690];
    ctx.setLineDash([12, 10]); ctx.lineWidth = 6; ctx.strokeStyle = '#b8231a'; ctx.beginPath(); ctx.moveTo(A[0], A[1]);
    const n = 30; for (let k = 1; k <= Math.round(n * rp); k++) { const u = k / n; ctx.lineTo(lerp(A[0], B[0], u) + Math.sin(u * 6) * 30, lerp(A[1], B[1], u)); } ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#5a240c'; ctx.font = `700 34px ${SANS}`; ctx.textAlign = 'center';
    ctx.beginPath(); ctx.arc(A[0], A[1], 9, 0, 7); ctx.fill(); ctx.fillText('आगरा', A[0], A[1] - 22);
    ctx.globalAlpha = m * prog(t, at(1, 0.8), cue(1)[1] + 0.2); ctx.beginPath(); ctx.arc(B[0], B[1], 9, 0, 7); ctx.fill(); ctx.fillText('स्वराज्य', B[0] + 10, B[1] + 50);
    ctx.restore();
  }
  chip('साधु के वेश में', 540, 175, 50, prog(t, at(0, 0.5), at(0, 0.5) + 0.5) * (1 - prog(t, cue(1)[0] - 0.3, cue(1)[0])));
};

// ---------- PART 6: legacy ----------
S.legacy = (t) => {
  bg(PAL.court, 0, 540, 640);
  // rays
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,170,0.07)';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.05; ctx.beginPath(); ctx.moveTo(540, 720); ctx.lineTo(540 + Math.cos(a) * 1600, 720 + Math.sin(a) * 1600); ctx.lineTo(540 + Math.cos(a + 0.12) * 1600, 720 + Math.sin(a + 0.12) * 1600); ctx.fill(); }
  ctx.restore();
  hills(1000, 420, 701, 0.85, INK, 0.7);
  fort(540, 760, 0.45, t);
  bhagwa(540, 600, 180, t);
  ground(1180);
  glow(540, 950, 300, '255,210,140', 0.45);
  person(540, 1185, 1.3, { ...SHIVAJI, wpn: 'sword', fa: [2.8, 0.1], sh: [-0.3, -0.3], eye: 0.8 });
  chip('17 अगस्त  ·  शिवचातुर्य दिवस', 540, 200, 52, prog(t, at(0, 0.3), at(0, 0.3) + 0.5));
};

// ---------- PART 7: the twist (links to video 1) ----------
S.twist = (t) => {
  bg(PAL.agra, noise1(t * 3), 540, 760);
  const split = prog(t, cue(1)[0] - 0.2, cue(1)[0] + 0.5);
  // line 1: Raja Ram Singh, the man in charge of guarding Shivaji
  ground(1220);
  elephant(lerp(540, 300, split), 1220, lerp(1.0, 0.7, split), t, 0);
  textBlock('राजा राम सिंह', 540, 230, 96, { font: SERIF, color: GOLD, alpha: prog(t, cue(0)[0] + 0.6, cue(0)[0] + 1.2), glow: 'rgba(255,150,50,0.8)' });
  // line 2: five years later, Saraighat - Lachit on his boat
  if (split > 0) {
    ctx.save(); ctx.globalAlpha = split;
    ctx.fillStyle = 'rgba(20,9,4,0.35)'; ctx.fillRect(560, 700, 520, 520);
    ahomBoat(820, 1150, 0.62, t, { rowers: 3, pennant: true, face: -1 });
    person(800, 1135, 0.8, { face: -1, hat: 'helmet', wpn: 'sword', fa: [2.7, 0.15], sh: [-0.3, -0.3] });
    ctx.restore();
    textBlock('1666  →  1671', 540, 360, 56, { alpha: split, color: '#ffe2b8' });
    chip('लाचित बोरफुकन', 820, 640, 44, prog(t, at(1, 0.5), at(1, 0.5) + 0.5));
  }
  const end = prog(t, cue(2)[0] - 0.1, cue(2)[0] + 0.4);
  if (end > 0) { chip('फ़ॉलो करें  ·  अगली कहानी जल्द', 540, 520, 46, end); }
};

