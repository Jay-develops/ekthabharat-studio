// ---------------- scenes ----------------
// Every timed moment below is tied to a narration line (cue i = [start, end]) so picture follows the voice.
let D = 10;
const cue = i => CUES[i] || [D, D];
const at = (i, f) => lerp(cue(i)[0], cue(i)[1], f);
const S = {};
PAL.past = ['#efd6a4', '#b27c48', '#3b1c0c'];
PAL.redtent = ['#f08a3a', '#8e2a14', '#1c0503'];
PAL.dusk = ['#f6b26b', '#a8452a', '#2a0a08'];

function scroll(x, y, w, h, open) {
  if (open <= 0) return;
  const ww = w * open;
  ctx.save();
  ctx.fillStyle = '#f3dfb2'; ctx.fillRect(x - ww / 2, y - h / 2, ww, h);
  ctx.strokeStyle = 'rgba(80,40,15,0.75)'; ctx.lineWidth = 4;
  const r = rng(5);
  ctx.save(); ctx.beginPath(); ctx.rect(x - ww / 2, y - h / 2, ww, h); ctx.clip();
  ctx.font = `700 54px ${SERIF}`; ctx.fillStyle = '#5a240c'; ctx.textAlign = 'center'; ctx.fillText('संधि', x, y - h / 2 + 80);
  for (let i = 0; i < 6; i++) { const yy = y - h / 2 + 140 + i * 42; ctx.beginPath(); ctx.moveTo(x - w / 2 + 50, yy);
    for (let k = 0; k < 18; k++) ctx.lineTo(x - w / 2 + 50 + k * (w - 100) / 17, yy + (r() - 0.5) * 8); ctx.stroke(); }
  ctx.fillStyle = '#9b1d12'; ctx.beginPath(); ctx.arc(x + w / 2 - 90, y + h / 2 - 70, 34, 0, 7); ctx.fill();
  ctx.restore();
  ctx.fillStyle = INK; for (const ex of [x - ww / 2, x + ww / 2]) { ctx.fillRect(ex - 16, y - h / 2 - 22, 32, h + 44); ctx.beginPath(); ctx.arc(ex, y - h / 2 - 24, 18, 0, 7); ctx.arc(ex, y + h / 2 + 24, 18, 0, 7); ctx.fill(); }
  ctx.restore();
}
function throne(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-90, -110, 180, 30); ctx.fillRect(-80, -80, 20, 80); ctx.fillRect(60, -80, 20, 80);
  ctx.beginPath(); ctx.moveTo(-100, -110); ctx.lineTo(-100, -330); ctx.quadraticCurveTo(-20, -420, 0, -440); ctx.quadraticCurveTo(20, -420, 100, -330); ctx.lineTo(100, -110); ctx.closePath(); ctx.fill();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.moveTo(-60, -140); ctx.lineTo(-60, -300); ctx.quadraticCurveTo(0, -370, 60, -300); ctx.lineTo(60, -140); ctx.fill();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-46, -150); ctx.lineTo(-46, -292); ctx.quadraticCurveTo(0, -350, 46, -292); ctx.lineTo(46, -150); ctx.fill();
  ctx.restore();
}
function pillars() {
  ctx.save(); ctx.fillStyle = INK;
  for (const x of [70, W - 70]) { ctx.fillRect(x - 34, 160, 68, 1150); ctx.fillRect(x - 54, 160, 108, 40); ctx.fillRect(x - 54, 1270, 108, 40);
    ctx.save(); ctx.fillStyle = HOLE; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(x, 260 + i * 85, 6, 0, 7); ctx.fill(); } ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 200); ctx.quadraticCurveTo(W / 2, 40, 0, 200); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 20; i++) { const x = 60 + i * 50; ctx.beginPath(); ctx.arc(x, 70 + Math.abs(i - 9.5) * 6, 6, 0, 7); ctx.fill(); }
  ctx.restore();
}
function ground(y = 1250) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(-50, y, W + 100, 400); ctx.restore(); }
function bigYear(txt, y, a, size = 130) { textBlock(txt, 540, y, size, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,160,60,0.8)', sw: 18 }); }

// ---------- HOOK ----------
S.hook_fleet = (t) => {
  bg(PAL.night, noise1(t * 3));
  moon(780, 420, 120);
  particles(t, 30, 3, '#ffd59a', { up: true, size: 2.5, alpha: 0.6 });
  hills(930, 260, 11, 0.35); hills(950, 170, 12, 0.6);
  water(920, t);
  const r = prog(t, cue(1)[0] + 0.3, D);   // "…पीछे हट रही है"
  for (let i = 0; i < 3; i++) ahomBoat(760 + i * 120 + r * 420, 975 + i * 12, 0.3, t, { ph: i, rowers: 3 });
  mughalShip(-150 + t * 32, 975, 0.42, t, { ph: 2 });
  mughalShip(80 + t * 24, 1060, 0.66, t, { ph: 1 });
  mughalShip(260 + t * 18, 1215, 1.05, t, { ph: 0 });
  bigYear('मार्च 1671', 230, prog(t, 0.0, 0.5) * (1 - prog(t, cue(1)[0] - 0.4, cue(1)[0] + 0.3)), 112);
};
function bedScene(t, pal, eyeAt, upA, upB) {
  bg(pal, noise1(t * 5), 300, 820);
  lamp(200, 1150, 1.3, t);
  drapes(t);
  ctx.save(); ctx.strokeStyle = 'rgba(255,210,150,0.18)'; ctx.lineWidth = 4;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let y = 820; y > 560; y -= 10) { const x = 560 + i * 60 + Math.sin(y * 0.05 + t * 4 + i) * 10; y === 820 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
  ctx.restore();
  bed(640, 1010, 560);
  const up = prog(t, upA, upB);
  const eye = prog(t, eyeAt - 0.2, eyeAt + 0.5);
  // lying on his back (hip fixed on the bed); sits up by bending at the hip, legs stay on the bed
  person(600, 985 + 150 * 1.15, 1.15, { face: -1, rot: -Math.PI / 2, hat: 'none', eye, lean: window.LEANSIGN * up * 1.25 + Math.sin(t * 1.3) * 0.015 * (1 - up),
    fa: [lerp(0.15, 0.9, up), lerp(0.1, -0.6, up)], sh: [lerp(-0.1, 0.4, up), -0.2] });
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(890, 1080); ctx.lineTo(830, 860); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(870, 900); ctx.lineTo(820, 912); ctx.stroke(); ctx.restore();
}
// eyes open on "तभी वो आँखें खोलता है", sits up while saying "मुझे… नाव पर ले चलो"
S.hook_bed = (t) => bedScene(t, PAL.tent, at(1, 0.45), cue(2)[0], cue(2)[1] + 0.3);

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.battle, noise1(t * 4));
  sun(540, 640, 150, 0.9);
  hills(980, 160, 21, 0.55);
  water(980, t);
  smoke(180, 980, t, 3, 8, 1.2, 0.12); smoke(900, 1000, t, 4, 8, 1, 0.12);
  ahomBoat(560, 1170, 0.95, t, { rowers: 4, pennant: true });
  person(620, 1150, 1.0, { hat: 'helmet', wpn: 'sword', fa: [2.6, 0.2], sh: [-0.4, -0.3], rods: true, t });
  const a = easeOut(prog(t, 0.0, 0.7));
  ctx.save(); const sc = lerp(1.18, 1, a); ctx.translate(540, 300); ctx.scale(sc, sc); ctx.translate(-540, -300);
  textBlock('लाचित बोरफुकन', 540, 260, 124, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,150,50,0.9)', sw: 18 });
  ctx.restore();
  textBlock('सराईघाट का युद्ध  ·  1671', 540, 410, 58, { alpha: prog(t, 0.5, 1.1) });
  ctx.save(); ctx.globalAlpha = prog(t, 0.6, 1.2); ctx.strokeStyle = GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(240, 480); ctx.lineTo(840, 480); ctx.stroke(); ctx.restore();
};

// ---------- PART 1 ----------
S.mirjumla = (t) => {
  bg(PAL.past, 0, 540, 700);
  hills(900, 300, 91, 0.28); hills(960, 180, 92, 0.5);
  rangGhar(860, 1180, 0.55);
  for (const [x, s, sd] of [[60, 0.9, 1], [160, 0.7, 2]]) tree(x, 1190, s, t, sd);
  ground(1180);
  // year rolls back 1671 -> 1662 while "चलिए, थोड़ा पीछे चलते हैं"
  const k = prog(t, cue(0)[0], cue(0)[1] + 0.3);
  bigYear(String(Math.round(lerp(1671, 1662, k))), 230, prog(t, 0, 0.4));
  // Mir Jumla's cavalry crosses during line 2
  const cx = prog(t, cue(1)[0] - 0.2, cue(2)[1]);
  if (cx > 0) for (let i = 0; i < 5; i++) horse(-300 + cx * 900 - i * 170, 1185 + (i % 2) * 10, 0.62, t, i);
  chip('मीर जुमला', 540, 380, 50, prog(t, cue(1)[0], cue(1)[0] + 0.5) * (1 - prog(t, cue(2)[0] - 0.3, cue(2)[0])));
  // treaty unrolls on line 3
  scroll(540, 620, 620, 420, easeOut(prog(t, cue(2)[0], cue(2)[0] + 0.9)));
  chip('गुवाहाटी  →  मुग़लों के हाथ', 540, 900, 46, prog(t, at(2, 0.55), at(2, 0.55) + 0.5), { color: '#ff9c7a' });
};
S.chosen = (t) => {
  bg(PAL.tent, noise1(t * 3), 540, 760);
  pillars();
  lamp(200, 1250, 1.2, t); lamp(880, 1250, 1.2, t + 3);
  ground(1250);
  ctx.save(); ctx.globalAlpha = 0.5; throne(290, 1250, 1.1); ctx.restore();
  // the king passes the sword on line 2
  const give = prog(t, cue(1)[0], at(1, 0.6));
  person(330, 1180, 1.05, { seated: true, hat: 'crown', wpn: give > 0.02 ? 'sword' : null, fa: [lerp(0.4, 1.5, give), lerp(-0.5, 0, give)], sh: [0.3, -0.4] });
  const rise = prog(t, at(1, 0.4), at(1, 0.85));
  person(740, 1255, 1.12, { face: -1, seated: rise < 0.5, hat: 'helmet', lean: lerp(0.35, 0, rise), fa: [lerp(1.3, 0.3, rise), lerp(-0.3, -0.2, rise)], sh: [0.2, -0.2], rods: true, eye: rise });
  textBlock('लाचित', 540, 300, 140, { font: SERIF, color: GOLD, alpha: prog(t, at(1, 0.7), at(1, 0.7) + 0.5), glow: 'rgba(255,160,60,0.9)', sw: 20 });
  textBlock('बोरफुकन — अहोम सेनापति', 540, 430, 50, { alpha: prog(t, at(1, 0.8), at(1, 0.8) + 0.5), color: '#ffe2b8' });
};
S.guwahati = (t) => {
  bg(PAL.dawn, 0, 760, 760);
  hills(860, 240, 41, 0.3); hills(900, 150, 42, 0.5);
  fort(790, 1130, 0.9, t);
  const fa = at(0, 0.5);                      // "…गुवाहाटी वापस छीन लिया"
  const fr = prog(t, fa, fa + 1.2);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(790, 900); ctx.lineTo(790, 900 - 260 * fr); ctx.stroke(); ctx.restore();
  if (fr > 0.05) flag(790, 900 - 260 * fr, 120, 70, t);
  if (fr > 0.9) glow(790, 640, 260, '255,220,140', 0.35 * prog(t, fa + 1.0, fa + 1.8));
  ground(1125);
  const mx = t * 60;
  for (let i = 0; i < 6; i++) person(-60 + mx - i * 120 + (i % 2) * 20, 1135 + (i % 2) * 8, 0.78, { walk: t * 6 + i, hat: 'helmet', wpn: 'spear', fa: [0.5, -1.3], spearA: -0.05 });
  person(100 + mx, 1140, 0.98, { walk: t * 6, hat: 'helmet', wpn: 'flag', fa: [0.9, -1.0], rods: true, t });
  bigYear('1667', 250, prog(t, 0.1, 0.6));
  chip('गुवाहाटी', 790, 420, 50, prog(t, fa, fa + 0.6));
};

// ---------- PART 2 ----------
S.army = (t) => {
  bg(PAL.battle, noise1(t * 2), 540, 680);
  hills(760, 200, 51, 0.35);
  particles(t, 40, 9, 'rgba(40,12,4,1)', { drift: 30, size: 5, alpha: 0.25 });
  // line 1: a lone messenger rides to Delhi
  const m = prog(t, cue(0)[0] - 0.3, cue(1)[0] + 0.5);
  if (m < 1) { ctx.save(); ctx.globalAlpha = 1 - prog(t, cue(1)[0], cue(1)[0] + 0.5); horse(1250 - m * 1500, 1180, 0.8, t, 0); ctx.restore(); }
  chip('दिल्ली', 540, 190, 50, prog(t, 0.1, 0.6) * (1 - prog(t, cue(1)[0] - 0.3, cue(1)[0])));
  // line 2: Raja Ram Singh on his elephant
  const rs = prog(t, cue(1)[0] - 0.2, cue(1)[0] + 0.8);
  // line 3: the whole army rolls in
  const ar = easeOut(prog(t, cue(2)[0] - 0.2, cue(2)[0] + 2.2));
  const off = lerp(-1300, 0, ar);
  if (ar > 0) {
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = ar; mughalShip(-200 + i * 300 + t * 12, 780, 0.26, t, { ph: i, lanterns: false }); ctx.restore(); }
    for (let i = 0; i < 3; i++) elephant(off - 160 + i * 340 + t * 20, 960, 0.55, t, i);
    for (let i = 0; i < 7; i++) horse(off - 260 + i * 210 + t * 55 + (i % 2) * 40, 1110, 0.72, t, i * 1.3);
    for (let i = 0; i < 10; i++) person(off - 300 + i * 140 + t * 40, 1260, 0.62, { walk: t * 6 + i, hat: 'helmet', wpn: 'spear', fa: [0.5, -1.3] });
  }
  if (rs > 0) { ctx.save(); ctx.globalAlpha = rs; elephant(lerp(480, 640, prog(t, cue(1)[0], D)) - ar * 120, 1080 - ar * 60, 1.0 - ar * 0.3, t, 0); ctx.restore(); }
  textBlock('राजा राम सिंह', 540, 300, 96, { font: SERIF, color: GOLD, alpha: rs, glow: 'rgba(255,150,50,0.8)' });
  textBlock('आमेर (जयपुर)  ·  औरंगज़ेब के सेनापति', 540, 405, 42, { alpha: prog(t, cue(1)[0] + 0.4, cue(1)[0] + 1.0), color: '#ffe2b8' });
};

// ---------- PART 3 ----------
S.map = (t) => {
  const c2 = cue(1)[0], c3 = cue(2)[0];
  bg(PAL.map, 0, 540, 760);
  const pen = 'rgba(70,32,12,0.9)';
  const half = y => { const n = Math.exp(-Math.pow((y - 760) / 220, 2)); return lerp(230, 70, n) + (y < 760 ? -40 * (760 - y) / 760 : 0); };
  const cx = y => 540 + Math.sin(y * 0.004) * 60;
  ctx.save(); ctx.fillStyle = 'rgba(90,45,18,0.28)'; ctx.beginPath();
  for (let y = 90; y <= 1300; y += 10) ctx.lineTo(cx(y) - half(y), y);
  for (let y = 1300; y >= 90; y -= 10) ctx.lineTo(cx(y) + half(y), y);
  ctx.fill(); ctx.strokeStyle = pen; ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(70,32,12,0.35)'; ctx.lineWidth = 2.5;
  for (let i = 0; i < 22; i++) { const y = 120 + ((i * 57 + t * 25) % 1180); ctx.beginPath(); ctx.moveTo(cx(y) - 24, y); ctx.quadraticCurveTo(cx(y), y - 8, cx(y) + 24, y); ctx.stroke(); }
  ctx.restore();
  const hillIcon = (x, y, s) => { ctx.save(); ctx.fillStyle = 'rgba(70,32,12,0.75)'; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x, y - 55 * s); ctx.lineTo(x + 40 * s, y); ctx.fill(); ctx.restore(); };
  for (const [x, y, s] of [[300, 700, 1.2], [230, 790, 1], [340, 850, 0.9], [780, 690, 1.1], [860, 780, 1.3], [760, 860, 0.9], [180, 640, 0.8], [910, 900, 0.8]]) hillIcon(x, y, s);
  ctx.save(); ctx.font = `700 40px ${SANS}`; ctx.fillStyle = pen; ctx.textAlign = 'center';
  ctx.save(); ctx.translate(cx(1150) + 120, 1150); ctx.rotate(-1.35); ctx.fillText('ब्रह्मपुत्र', 0, 0); ctx.restore();
  ctx.fillText('गुवाहाटी', 860, 980); ctx.beginPath(); ctx.arc(860, 1010, 9, 0, 7); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.translate(950, 170); ctx.fillStyle = pen; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(12, 0); ctx.lineTo(0, 50); ctx.lineTo(-12, 0); ctx.fill();
  ctx.font = `700 32px ${SANS}`; ctx.textAlign = 'center'; ctx.fillText('उ', 0, -62); ctx.restore();
  // line 1: cavalry on open land
  const a1 = prog(t, cue(0)[0], cue(0)[0] + 0.6) * (1 - prog(t, c2 - 0.3, c2 + 0.3));
  ctx.save(); ctx.globalAlpha = a1; for (let i = 0; i < 3; i++) horse(150 + i * 70 + t * 10, 1220 + i * 10, 0.32, t, i); ctx.restore();
  if (a1 > 0) chip('खुले मैदान में घुड़सवार = मुग़लों की ताक़त', 540, 190, 40, a1);
  // line 2: "ज़मीन पर नहीं… पानी पर" -> ships come up the river
  const a2 = prog(t, at(1, 0.55) - 0.2, at(1, 0.55) + 0.4);
  if (a2 > 0) { const py = lerp(1350, 1010, prog(t, at(1, 0.55), c3 + 2)); for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = a2; mughalShip(cx(py + i * 90) + (i - 1) * 90, py + i * 90, 0.16, t, { ph: i, lanterns: false }); ctx.restore(); } }
  if (a2 > 0) chip('लड़ाई पानी पर', 540, 190, 46, a2 * (1 - prog(t, c3 - 0.3, c3)));
  const a3 = prog(t, c3 - 0.1, c3 + 0.5);
  if (a3 > 0) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 5);
    ctx.save(); ctx.globalAlpha = a3; ctx.strokeStyle = '#b8231a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(cx(760), 760, 150 + pulse * 14, 70 + pulse * 6, 0, 0, 7); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = a3; ahomBoat(cx(770) - 75 + i * 50, 770 + (i % 2) * 14, 0.12, t, { ph: i, rowers: 2 }); ctx.restore(); }
    chip('सराईघाट', cx(760) - 250, 600, 50, a3, { color: '#ffd27a' });
    textBlock('सबसे संकरा हिस्सा', 540, 190, 62, { font: SERIF, color: '#6b1d0e', stroke: 'rgba(250,232,200,0.9)', alpha: a3 });
  }
};

// ---------- PART 4: the uncle (legend) ----------
S.uncle = (t) => {
  const done = cue(4)[0];
  bg(mixPal(PAL.night, PAL.dawn, prog(t, done, D)), noise1(t * 4), 540, 820);
  moon(840, 360, 70);
  hills(900, 200, 61, 0.35);
  const hgt = lerp(40, 100, prog(t, 0, done)) + 160 * prog(t, done - 0.2, D - 0.4);
  const WB = 1080;
  ctx.save(); ctx.globalAlpha = 0.62; ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-20, WB);
  for (let x = -20; x <= W + 20; x += 20) ctx.lineTo(x, WB - hgt - Math.sin(x * 0.02) * 10 * (hgt / 260));
  ctx.lineTo(W + 20, WB); ctx.lineTo(W + 20, 1400); ctx.lineTo(-20, 1400); ctx.fill();
  const slack = prog(t, cue(1)[0], cue(1)[0] + 1) * (1 - prog(t, cue(3)[0], cue(3)[0] + 1));
  const nw = Math.round(lerp(5, 2, slack)) + Math.round(5 * prog(t, done, D));
  const sp = lerp(70, 25, slack);
  for (let i = 0; i < nw; i++) person(((i * 170 + t * sp) % 1300) - 110, WB - hgt + 4, 0.5, { walk: t * lerp(7, 3, slack) + i, hat: 'none', wpn: 'basket', fa: [3.0, 0.1], sh: [3.0, -0.1] });
  ctx.restore();
  torch(130, 1240, 300, t, 1); torch(950, 1240, 300, t, 2);
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(0, 1250); ctx.quadraticCurveTo(540, 1225, W, 1250); ctx.lineTo(W, 1400); ctx.lineTo(0, 1400); ctx.fill(); ctx.restore();
  // uncle resting by the wall from line 2
  const ua = prog(t, cue(1)[0] - 0.2, cue(1)[0] + 0.5);
  if (ua > 0) { ctx.save(); ctx.globalAlpha = ua; person(760, 1250, 1.05, { face: -1, hat: 'turban', seated: true, lean: 0.25, fa: [0.6, -0.4], sh: [0.3, -0.3] }); ctx.restore(); }
  // Lachit walks in on line 3, speaks on line 4
  const wk = prog(t, cue(2)[0], cue(2)[1]);
  if (wk > 0) {
    const point = prog(t, cue(3)[0] - 0.2, cue(3)[0] + 0.5);
    person(lerp(-150, 330, wk), 1250, 1.2, { walk: wk < 1 ? t * 5 : null, hat: 'helmet', fa: [lerp(0.2, 1.75, point), lerp(-0.3, 0, point)], sh: [-0.3, -0.4], rods: true, wpn: point > 0.5 ? null : 'sword' });
  }
  chip('लोककथा', 540, 170, 46, prog(t, cue(1)[0], cue(1)[0] + 0.5) * (1 - prog(t, cue(3)[0] - 0.5, cue(3)[0] - 0.1)));
  quoteCard('“मेरा मामा, मेरे देश से बड़ा नहीं।”', 330, prog(t, cue(3)[0], cue(3)[0] + 0.5) * (1 - prog(t, done - 0.1, done + 0.4)));
  chip('सुबह से पहले दीवार तैयार', 540, 220, 48, prog(t, done + 1.0, done + 1.6));
};

// ---------- PART 5: back to the hook ----------
S.retreat = (t) => {
  bg(PAL.battle, noise1(t * 3), 540, 700);
  sun(760, 520, 100, 0.55);
  hills(920, 220, 101, 0.4);
  water(920, t);
  smoke(300, 960, t, 21, 10, 1.2, 0.14);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 3; const ar = rng(8);
  for (let i = 0; i < 8; i++) { const ph = ((t * 0.7 + ar()) % 1); const x = -100 + ph * 1300, y = 360 + ar() * 260 + Math.sin(ph * 3.14) * -80; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 46, y - 6); ctx.stroke(); }
  ctx.restore();
  mughalShip(-120 + t * 40, 1000, 0.5, t, { ph: 1 }); mughalShip(60 + t * 34, 1090, 0.72, t, { ph: 2 }); mughalShip(-260 + t * 30, 1230, 0.95, t, { ph: 3 });
  const turn = prog(t, at(1, 0.6), at(1, 0.95));    // "…नावें पीछे मुड़ने लगीं"
  for (let i = 0; i < 4; i++) ahomBoat(700 + i * 110 + turn * 380 - (1 - turn) * t * 10, 990 + i * 18, 0.32, t, { ph: i, rowers: 3, face: turn > 0.3 ? 1 : -1 });
  bigYear('मार्च 1671', 240, prog(t, cue(0)[0], cue(0)[0] + 0.5), 112);
};
// he is already awake and burning with fever; sits up on "मुझे नाव पर ले चलो"
S.bed2 = (t) => bedScene(t, PAL.redtent, cue(0)[0] + 0.5, cue(1)[0], cue(1)[1] + 0.2);

S.rally = (t) => {
  const c2 = cue(1)[0], c3 = cue(2)[0];
  bg(PAL.battle, noise1(t * 4), 540, 720);
  sun(300, 560, 110, 0.6);
  hills(900, 190, 71, 0.4);
  water(900, t);
  smoke(700, 930, t, 7, 12, 1.3, 0.14); smoke(150, 960, t, 8, 10, 1.1, 0.12);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 3; const ar = rng(4);
  for (let i = 0; i < 9; i++) { const ph = ((t * 0.6 + ar()) % 1); const x = -100 + ph * 1300, y = 360 + ar() * 300 + Math.sin(ph * 3.14) * -80; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 46, y - 6); ctx.stroke(); }
  ctx.restore();
  mughalShip(180 + t * 10, 980, 0.5, t, { ph: 1 }); mughalShip(-40 + t * 12, 1050, 0.62, t, { ph: 2 });
  for (let i = 0; i < 3; i++) ahomBoat(800 + i * 110 + t * 14, 960 + i * 14, 0.28, t, { ph: i, rowers: 3 });
  // line 1: he is rowed out; line 2: stands ("वो खड़ा हुआ"), raises sword ("तलवार उठाई"); line 3: the roar
  const bx = lerp(-260, 560, easeOut(prog(t, cue(0)[0] - 0.3, cue(0)[1] + 0.3)));
  const zoom = lerp(1, 1.12, prog(t, c2, D)) + 0.04 * prog(t, c3, c3 + 0.4);
  ctx.save(); ctx.translate(560, 1200); ctx.scale(zoom, zoom); ctx.translate(-560, -1200);
  ahomBoat(bx, 1210, 1.05, t, { rowers: 4, pennant: true, face: -1 });
  const st = prog(t, c2, at(1, 0.3)), raise = prog(t, at(1, 0.35), at(1, 0.6));
  person(bx - 40, lerp(1150, 1190, 1 - st), 1.12, { face: -1, seated: st < 0.5, hat: 'helmet', wpn: 'sword', fa: [lerp(0.3, 2.8, raise), lerp(-0.6, 0.15, raise)], sh: [-0.4, -0.5], rods: true, eye: st, lean: lerp(0.15, -0.05, st) });
  ctx.restore();
  if (t > c3) glow(520, 760, 420, '255,200,110', 0.25 * prog(t, c3, c3 + 0.3) * (0.8 + 0.2 * Math.sin(t * 9)));
  quoteCard('“जिसे भागना है, भाग जाए!”', 310, prog(t, c3, c3 + 0.4), 72);
};

// ---------- PART 6: victory ----------
S.victory = (t) => {
  bg(mixPal(PAL.battle, PAL.dawn, prog(t, cue(2)[0], D)), 0, 760, 700);
  sun(820, lerp(780, 520, prog(t, cue(2)[0], D)), 120, prog(t, cue(2)[0], D));
  hills(900, 180, 81, 0.4);
  water(900, t);
  // three Mughal ships: hemmed in (line 2), struggling (line 3), retreating (line 4)
  const wob = prog(t, cue(2)[0], cue(2)[1]);
  const ret = easeOut(prog(t, cue(3)[0], D));
  for (let i = 0; i < 3; i++) {
    const sx = 330 - i * 150 - ret * 520, sy = 1010 + i * 60;
    smoke(sx + 40, sy - 160, t, 10 + i, 9, 0.9, 0.12 + 0.1 * wob);
    mughalShip(sx, sy, 0.55 + i * 0.08, t, { ph: i, tilt: Math.sin(t * 2.5 + i) * 0.06 * wob - 0.05 * ret * (i + 1), lanterns: false });
  }
  // line 1: "एक नाव मुड़ी। फिर दूसरी। फिर सारी।" – boats turn one by one, then all
  const turnAt = [0.03, 0.36, 0.7, 0.72, 0.74, 0.76];
  const home = [[980, 960], [1050, 1060], [900, 1150], [1100, 1240], [760, 1250], [1000, 900]];
  const ring = [[560, 930], [620, 1110], [480, 1200], [700, 1250], [380, 1270], [700, 980]];
  home.forEach(([x, y], i) => {
    const ta = at(0, turnAt[i]);
    const turned = t >= ta;
    const go = easeOut(prog(t, Math.max(ta + 0.3, cue(1)[0] - 0.4), cue(1)[1] + 0.5));
    const px = lerp(x + 120, ring[i][0] - ret * 380, go), py = lerp(y, ring[i][1], go);
    if (turned && t < ta + 0.35) glow(px, py - 40, 120, '255,220,140', 0.6 * (1 - (t - ta) / 0.35));
    ahomBoat(px + (turned ? 0 : t * 12), py, 0.3 + (py - 900) / 1400, t, { ph: i, rowers: 3, face: turned ? -1 : 1, pennant: i % 2 === 0 });
  });
  textBlock('अहोम विजय', 540, 250, 116, { font: SERIF, color: GOLD, alpha: prog(t, at(3, 0.5), at(3, 0.5) + 0.6), glow: 'rgba(255,170,60,0.9)', sw: 18 });
  textBlock('सराईघाट  ·  मार्च 1671', 540, 375, 48, { alpha: prog(t, at(3, 0.7), at(3, 0.7) + 0.6), color: '#ffe8c4' });
};

// ---------- PART 7: ending ----------
S.legacy = (t) => {
  const c2 = cue(2)[0], c3 = cue(3)[0];
  const day = prog(t, c2 - 0.4, c2 + 1.2);
  bg(mixPal(PAL.dusk, PAL.dawn, day), 0, 540, 640);
  // lines 1-2: an empty boat at sunset
  if (day < 1) {
    ctx.save(); ctx.globalAlpha = 1 - day;
    sun(540, lerp(760, 900, prog(t, 0, c2)), 130, 0.8);
    hills(930, 150, 111, 0.45); water(930, t, 0.4);
    ahomBoat(560 + t * 6, 1120, 0.75, t * 0.5, { rowers: 0, pennant: true });
    ctx.restore();
  }
  bigYear('1622 – 1672', 260, prog(t, cue(1)[0], cue(1)[0] + 0.6) * (1 - prog(t, c2 - 0.4, c2)), 96);
  // lines 3-4: the statue at dawn
  if (day > 0) {
    ctx.save(); ctx.globalAlpha = day;
    ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,170,0.07)';
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.05; ctx.beginPath(); ctx.moveTo(540, 700); ctx.lineTo(540 + Math.cos(a) * 1600, 700 + Math.sin(a) * 1600); ctx.lineTo(540 + Math.cos(a + 0.12) * 1600, 700 + Math.sin(a + 0.12) * 1600); ctx.fill(); }
    ctx.globalCompositeOperation = 'source-over';
    water(1090, t, 0.4);
    const s = lerp(1.0, 1.06, prog(t, c2, D));
    ctx.translate(540, 1150); ctx.scale(s, s); ctx.translate(-540, -1150);
    ctx.fillStyle = INK; ctx.fillRect(340, 1050, 400, 110); ctx.fillRect(300, 1150, 480, 40);
    ctx.fillStyle = HOLE; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(370 + i * 42, 1100, 6, 0, 7); ctx.fill(); }
    ahomBoat(540, 1050, 0.8, 0, { rowers: 0 });
    person(560, 1030, 1.35, { hat: 'helmet', wpn: 'sword', fa: [2.85, 0.1], sh: [-0.3, -0.3], eye: 0.8 });
    ctx.restore();
  }
  chip('24 नवंबर  ·  लाचित दिवस', 540, 200, 54, prog(t, at(2, 0.3), at(2, 0.3) + 0.5));
  const m = easeOut(prog(t, at(3, 0.15), at(3, 0.15) + 0.7));
  if (m > 0) {
    ctx.save(); ctx.translate(540, 420); ctx.scale(m, m);
    ctx.fillStyle = '#6b1d0e'; ctx.beginPath(); ctx.moveTo(-50, -110); ctx.lineTo(-14, -20); ctx.lineTo(14, -20); ctx.lineTo(50, -110); ctx.lineTo(18, -110); ctx.lineTo(0, -60); ctx.lineTo(-18, -110); ctx.fill();
    glow(0, 40, 160, '255,210,120', 0.5);
    ctx.fillStyle = '#f2b544'; ctx.beginPath(); ctx.arc(0, 40, 70, 0, 7); ctx.fill();
    ctx.strokeStyle = '#8a4b12'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 40, 56, 0, 7); ctx.stroke();
    ctx.fillStyle = '#5a2a08'; ctx.font = `700 40px ${SANS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('NDA', 0, 42);
    ctx.restore();
  }
  // the name lands with the voice ("…उसका नाम है — लाचित बोरफुकन")
  textBlock('लाचित बोरफुकन', 540, 610, 92, { font: SERIF, color: GOLD, alpha: prog(t, at(3, 0.72), at(3, 0.72) + 0.4), glow: 'rgba(255,170,60,0.9)', sw: 16 });
};
S.end = (t) => {
  bg(PAL.night, noise1(t * 4), 540, 900);
  lamp(540, 1240, 1.6, t);
  particles(t, 25, 12, '#ffd59a', { up: true, size: 2.5, alpha: 0.5 });
  border(prog(t, 0, 0.6));
  textBlock('क्या आपने यह नाम पहले सुना था?', 540, 470, 88, { font: SERIF, color: GOLD, maxW: 860, alpha: prog(t, 0.1, 0.7), glow: 'rgba(255,160,60,0.7)', sw: 14 });
  chip('कमेंट में बताइए', 540, 720, 54, prog(t, at(0, 0.6), at(0, 0.6) + 0.4));
};

