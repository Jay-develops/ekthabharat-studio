// @common: this video uses history/common.js (shared helpers), added in front by render.py
// ---------------- scenes: video 06 - Maharana Pratap and Chetak at Haldighati ----------------
PAL.haldi = ['#ffe08a', '#d6952e', '#3a1c06'];     // Haldighati: the turmeric-yellow pass
PAL.fight = ['#ffb04a', '#b5401a', '#260704'];
PAL.mewar = ['#ffe0a0', '#d98a3c', '#3a1406'];
PAL.eve = ['#f6b26b', '#a8452a', '#2a0a08'];
const PRATAP = { hat: 'helmet', wpn: 'spear', spearA: -1.3, fa: [1.9, -0.5], sh: [0.5, 0.6] };

function stream(x0, x1, y, t, a = 1) {   // a monsoon stream cut into the ground: dark banks, lit water
  ctx.save(); ctx.globalAlpha = a;
  const g = ctx.createLinearGradient(0, y - 6, 0, y + 70); g.addColorStop(0, 'rgba(255,214,150,0.75)'); g.addColorStop(1, 'rgba(150,90,40,0.6)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x0, y - 4); ctx.quadraticCurveTo((x0 + x1) / 2, y + 10, x1, y - 4); ctx.lineTo(x1 - 30, y + 70); ctx.lineTo(x0 + 30, y + 70); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,240,200,0.8)'; ctx.lineWidth = 3;
  for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let x = x0 + 30; x <= x1 - 30; x += 10) { const yy = y + 14 + i * 18 + Math.sin(x * 0.05 + t * 4 + i) * 3; x === x0 + 30 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
    ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 70; ctx.stroke(); }
  ctx.restore();
}
function chhatra(x, y, s, a = 1) {   // the royal umbrella
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -170); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-90, -150); ctx.quadraticCurveTo(0, -260, 90, -150); ctx.closePath(); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-70 + i * 28, -158, 5, 0, 7); ctx.fill(); }
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -232, 8, 0, 7); ctx.fill(); ctx.restore();
}
function helicopter(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.strokeStyle = INK;
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,225,170,0.6)'; ctx.beginPath(); ctx.ellipse(52, -10, 46, 34, 0, -1.4, 1.2); ctx.fill(); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-90, -14); ctx.lineTo(-300, -24); ctx.lineTo(-300, 4); ctx.lineTo(-90, 20); ctx.fill();
  ctx.fillRect(-318, -60, 16, 72);
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60, 70); ctx.lineTo(80, 70); ctx.moveTo(-40, 50); ctx.lineTo(-40, 70); ctx.moveTo(60, 50); ctx.lineTo(60, 70); ctx.stroke();
  ctx.fillRect(-8, -84, 16, 26);
  const r = Math.sin(t * 40); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-230 * r, -86); ctx.lineTo(230 * r, -86); ctx.stroke();
  ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.ellipse(0, -86, 230, 14, 0, 0, 7); ctx.fill();
  ctx.restore();
}
function legWrap(x, y, s) { ctx.save(); ctx.strokeStyle = '#b8231a'; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.moveTo(x - 10 * s, y); ctx.lineTo(x + 10 * s, y + 6 * s); ctx.stroke(); ctx.restore(); }

// ---------- HOOK: the wounded horse carries the king, a stream ahead ----------
S.hook_run = (t) => {
  bg(PAL.eve, noise1(t * 3), 760, 640);
  sun(800, 700, 130, 0.7);
  hills(1000, 180, 61, 0.5);
  ground(1180);
  stream(680, 1150, 1180, t);
  const sp = prog(t, 0, at(1, 1.0));
  const hx = lerp(240, 470, sp);
  // dust behind, pursuers on line 2
  smoke(hx - 220, 1180, t, 62, 6, 0.8, 0.2);
  const pur = on(t, 1, 0.3, 0.6);
  if (pur > 0) { ctx.save(); ctx.globalAlpha = pur; for (let i = 0; i < 3; i++) horse(lerp(-260, -60, pur) + i * 70, 1185, 0.7, t + i, i * 2, true); ctx.restore(); }
  rider(hx, 1185, 1.25, t * 1.15, { ...PRATAP, rear: 0.08 * Math.sin(t * 6) });
  legWrap(hx + 55 * 1.25, 1185 - 70 * 1.25, 1.25);
  chip('हल्दीघाटी  ·  1576', 540, 170, 50, on(t, 0, 0.6, 0.5));
};

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.haldi, noise1(t * 3), 540, 760);
  sun(540, 760, 170, 0.85);
  hills(1000, 220, 63, 0.5); hills(1060, 140, 64, 0.75);
  ground(1180);
  rider(500, 1185, 1.25, t * 0.2, { ...PRATAP, still: true, rear: 0.35 });
  titleCard(t, 'महाराणा प्रताप और चेतक', 'हल्दीघाटी  ·  18 जून 1576');
};

// ---------- PART 1: Mewar will not bow ----------
S.mewar = (t) => {
  bg(PAL.mewar, noise1(t * 2), 540, 640);
  hills(1000, 280, 65, 0.8);
  fort(540, 900, 0.55, t); bhagwa(540, 720, 140, t);
  ground(1180);
  const l2 = on(t, 1, 0.0, 0.5), no = on(t, 1, 0.7, 0.4);
  glow(330, 960, 240, '255,210,140', 0.35);
  person(330, 1185, 1.2, { hat: 'helmet', face: 1, wpn: 'spear', spearA: 0.02, fa: [0.6, -1.0], sh: [-0.3, -0.3] });
  if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2; person(lerp(1150, 760, l2), 1185, 1.0, { face: -1, hat: 'turban', walk: l2 < 1 ? t * 5 : null, fa: [1.4, -0.5] }); ctx.restore();
    scroll(760, 560, 420, 200, l2 * (1 - no), ['अकबर का संदेश', 'झुक जाओ']); }
  textBlock('ना!', 300, 420, 150, { font: SERIF, color: GOLD, alpha: no, glow: 'rgba(255,150,40,0.9)', sw: 18 });
  chip('मेवाड़', 540, 175, 52, on(t, 0, 0.05, 0.4));
};

// ---------- PART 2: Haldighati - the charge at Man Singh's elephant ----------
S.battle = (t) => {
  bg(mixPal(PAL.haldi, PAL.fight, prog(t, 0, at(1, 1))), noise1(t * 4), 540, 620);
  for (let k = 0; k < 3; k++) smoke(150 + k * 380, 1150, t, 66 + k, 8, 1.1, 0.18);
  hills(1000, 160, 67, 0.55, '#3a2206');
  ground(1180);
  bigYear('18 जून 1576', 220, on(t, 0, 0.0, 0.4) * (1 - on(t, 1, 0.0, 0.4)), 104);
  chip('हल्दीघाटी', 540, 340, 50, on(t, 0, 0.5, 0.4) * (1 - on(t, 1, 0.0, 0.4)));
  // line 2: Man Singh on his elephant (right)
  const el = on(t, 1, 0.0, 0.6);
  if (el > 0) { ctx.save(); ctx.globalAlpha = el; elephant(800, 1185, 1.05, t * 0.5, 0);
    person(800, 1185 - 1.05 * 300, 0.62, { seated: true, hat: 'turban', face: 1, fa: [1.5, -0.4], sh: [0.4, 0.3] }); ctx.restore();
    chip('राजा मान सिंह', 800, 640, 42, el * (1 - on(t, 2, 0, 0.3))); }
  // lines 3-4: Pratap charges in on Chetak; Chetak rears with hooves on the elephant's head
  const ch = prog(t, cue(2)[0] - 0.2, at(2, 1.0)), rear = on(t, 3, 0.05, 0.6);
  if (ch > 0) {
    const x = lerp(-150, 640, ch);
    rider(x, 1185, 1.1, t * (1 - rear * 0.8), { ...PRATAP, rear: rear * 1.05, fa: [lerp(1.9, 2.6, rear), lerp(-0.5, 0.2, rear)], spearA: lerp(-1.3, -2.0, rear) });
    chip('चेतक', x - 20, 760, 42, on(t, 2, 0.4, 0.4) * (1 - rear));
  }
  if (rear > 0.6) flash(0.12 * Math.max(0, Math.sin((t - at(3, 0.5)) * 6)));
};

// ---------- PART 3: the wound; Jhala Man takes the royal umbrella ----------
S.wound = (t) => {
  const l2 = on(t, 1, 0.0, 0.6);
  bg(PAL.fight, noise1(t * 4), 540, 640);
  for (let k = 0; k < 2; k++) smoke(260 + k * 560, 1150, t, 70 + k, 8, 1.0, 0.2);
  hills(1020, 150, 68, 0.55, '#3a2206');
  ground(1180);
  if (l2 < 1) { ctx.save(); ctx.globalAlpha = 1 - l2;
    elephant(760, 1185, 1.0, t * 0.6, 0);
    const sw = Math.sin(t * 3) * 0.5;
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(930, 1145); ctx.lineTo(930 - 150, 1145 + 40 * sw); ctx.stroke(); ctx.restore();   // sword in the trunk
    rider(470, 1185, 1.1, t * 0.4, { ...PRATAP, rear: 0.25 });
    legWrap(470 + 55 * 1.1, 1185 - 70 * 1.1, 1.1);
    ctx.restore();
    glow(560, 1110, 120, '255,120,80', 0.5 * on(t, 0, 0.5, 0.4) * (1 - l2));
    chip('चेतक घायल', 540, 175, 50, on(t, 0, 0.5, 0.4) * (1 - l2), { color: '#ff9c7a' }); }
  // line 2: Jhala Man under the umbrella draws the enemy away
  if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2;
    glow(560, 900, 260, '255,210,140', 0.45);
    rider(560, 1185, 1.15, t, { hat: 'helmet', wpn: 'sword', fa: [2.6, 0.2] });
    chhatra(540, 1185 - 1.15 * 200, 1.2);
    for (let i = 0; i < 4; i++) person(940 - i * 80, 1185, 0.8, { face: -1, hat: 'turban', wpn: 'spear', spearA: 1.2, fa: [1.4, -0.3], walk: t * 6 + i });
    ctx.restore(); chip('झाला मान', 560, 600, 48, on(t, 1, 0.2, 0.4)); chip('राणा का छत्र', 540, 175, 46, on(t, 1, 0.5, 0.4)); }
};

// ---------- PART 4: the leap across the stream; Chetak falls ----------
S.leap = (t) => {
  const end = on(t, 1, 0.3, 1.0);
  bg(mixPal(PAL.eve, PAL.haldi, 0.3), noise1(t * 3), 540, 640);
  sun(760, 760, 130, 0.6);
  hills(1000, 180, 69, 0.5);
  ground(1180);
  stream(380, 700, 1180, t);
  // line 1: run, then a jump arc over the stream
  const j = prog(t, at(0, 0.45), at(0, 0.95));
  let x, y, rr;
  if (t < at(0, 0.45)) { x = lerp(-120, 330, prog(t, 0, at(0, 0.45))); y = 1185; rr = 0.08 * Math.sin(t * 6); }
  else { x = lerp(330, 820, j); y = 1185 - Math.sin(j * Math.PI) * 300; rr = lerp(0.45, -0.25, j); }
  if (end <= 0) { rider(x, y, 1.05, t * (j > 0 && j < 1 ? 0.2 : 1), { ...PRATAP, rear: rr }); if (j > 0.05 && j < 0.95) flash(0.06); }
  // line 2: on the far bank, Chetak lies down; Pratap kneels beside him
  if (end > 0) { ctx.save(); ctx.globalAlpha = end;
    ctx.save(); ctx.translate(840, 1185); ctx.rotate(0.0); horse(0, 40, 1.0, 0, 0, false); ctx.restore();
    person(700, 1185, 1.0, { face: 1, seated: true, hat: 'helmet', lean: 0.3, fa: [1.2, -0.6], sh: [0.6, -0.8] });
    ctx.restore(); dim(0.25 * end); glow(780, 1100, 240, '255,220,160', 0.35 * end); }
  chip('छलाँग', 560, 175, 54, prog(t, at(0, 0.5), at(0, 0.6)) * (1 - on(t, 1, 0, 0.3)));
};

// ---------- PART 5: the memorial; Pratap never gave up ----------
S.legacy = (t) => {
  const l2 = on(t, 1, 0.0, 0.6);
  bg(mixPal(PAL.mewar, PAL.haldi, l2), 0, 540, 640);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,170,0.06)';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.05; ctx.beginPath(); ctx.moveTo(540, 720); ctx.lineTo(540 + Math.cos(a) * 1600, 720 + Math.sin(a) * 1600); ctx.lineTo(540 + Math.cos(a + 0.12) * 1600, 720 + Math.sin(a + 0.12) * 1600); ctx.fill(); }
  ctx.restore();
  hills(1040, 200, 70, 0.7);
  ground(1180);
  if (l2 < 1) { ctx.save(); ctx.globalAlpha = 1 - l2;   // the chhatri memorial
    ctx.fillStyle = INK; ctx.fillRect(400, 1080, 280, 100); for (const px of [430, 520, 590, 650]) ctx.fillRect(px - 10, 900, 20, 180);
    ctx.beginPath(); ctx.moveTo(380, 900); ctx.quadraticCurveTo(540, 740, 700, 900); ctx.closePath(); ctx.fill();
    ctx.restore(); chip('चेतक समाधि  ·  बलीचा', 540, 175, 46, on(t, 0, 0.3, 0.4) * (1 - l2)); }
  if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2;
    tree(120, 1185, 1.0, t, 1); tree(980, 1185, 0.9, t, 2);
    glow(540, 950, 300, '255,210,140', 0.45);
    rider(520, 1185, 1.2, t * 0.2, { ...PRATAP, still: true, rear: 0.2, fa: [2.8, 0.1], wpn: 'sword' });
    ctx.restore(); chip('कभी नहीं झुके', 540, 175, 52, on(t, 1, 0.5, 0.4)); }
};

// ---------- PART 6: the twist - the helicopter named Chetak ----------
S.twist = (t) => {
  bg(PAL.haldi, noise1(t * 2), 540, 700);
  hills(1060, 140, 71, 0.6);
  ground(1200);
  const h = on(t, 0, 0.55, 0.6);
  if (h < 1) { ctx.save(); ctx.globalAlpha = 1 - h; horse(560, 1205, 1.2, 0, 0, false); ctx.restore(); }
  if (h > 0) { ctx.save(); ctx.globalAlpha = h; helicopter(lerp(1300, 560, easeOut(h)), lerp(500, 820, easeOut(h)) + Math.sin(t * 2) * 10, 1.1, t); ctx.restore(); }
  chip('चेतक', 560, 330, 64, on(t, 0, 0.75, 0.4));
  followChip(t, 1);
};
