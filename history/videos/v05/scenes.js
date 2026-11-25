// @common: this video uses history/common.js (shared helpers), added in front by render.py
// ---------------- scenes: video 05 - Chanakya's vow ----------------
PAL.court = ['#ffe0a0', '#d98a3c', '#3a1406'];
PAL.anger = ['#ff9a5a', '#a32a14', '#230604'];
PAL.forest = ['#f3d08a', '#8d6a2a', '#1d1406'];
PAL.gold = ['#fff0c4', '#e8a85a', '#5a2a0e'];

// a brahmin: shaven head with a shikha (topknot); untie 0..1 lets the hair fall loose and stream behind
function brahmin(x, y, s, p = {}) {
  const f = p.face || 1, o = p.seated ? 72 : 0, untie = p.untie || 0, t = p.t || 0;
  if (untie > 0) {   // loose hair streaming back (drawn behind)
    ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.strokeStyle = INK; ctx.lineCap = 'round';
    ctx.translate(0, -150); ctx.rotate(p.lean || 0); ctx.translate(0, 150);
    for (let k = 0; k < 4; k++) { ctx.lineWidth = 6 - k; ctx.beginPath(); ctx.moveTo(-10, -318 + o);
      ctx.quadraticCurveTo(-60 - k * 10, -320 + o + Math.sin(t * 5 + k) * 12 * untie, -60 - 110 * untie - k * 12, -300 + o + k * 14 + Math.sin(t * 4 + k) * 16 * untie); ctx.stroke(); }
    ctx.restore();
  }
  person(x, y, s, { ...p, hat: 'none' });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.translate(0, -150); ctx.rotate(p.lean || 0); ctx.translate(0, 150);
  if (untie < 1) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-12, -326 + o, 10 * (1 - untie) + 1, 0, 7); ctx.fill(); }   // the knot
  ctx.strokeStyle = 'rgba(255,230,180,0.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -262 + o); ctx.lineTo(24, -186 + o); ctx.stroke();     // sacred thread
  ctx.restore();
}
function throne(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-190, -60, 380, 60); ctx.fillRect(-150, -100, 300, 40);
  ctx.beginPath(); ctx.moveTo(-120, -100); ctx.lineTo(-120, -380); ctx.quadraticCurveTo(0, -470, 120, -380); ctx.lineTo(120, -100); ctx.fill();
  ctx.fillStyle = 'rgba(255,205,140,0.6)'; ctx.beginPath(); ctx.moveTo(-90, -100); ctx.lineTo(-90, -360); ctx.quadraticCurveTo(0, -430, 90, -360); ctx.lineTo(90, -100); ctx.fill();   // lit back panel
  ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-90 + i * 30, -40, 5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function hallPillars(alpha = 1) { ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = INK; ctx.fillRect(-40, 160, W + 80, 120);
  for (let i = 0; i < 6; i++) { const x = 60 + i * 192; ctx.fillRect(x - 20, 280, 40, 900); ctx.beginPath(); ctx.ellipse(x, 290, 44, 20, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function palmLeaves(x, y, w, a) {   // a palm-leaf manuscript stack, top leaf with writing
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  for (let k = 4; k >= 0; k--) { ctx.fillStyle = k ? 'rgba(196,150,80,0.95)' : 'rgba(236,200,130,0.98)'; ctx.strokeStyle = 'rgba(70,32,12,0.9)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x - w / 2 + k * 6, y + k * 14, w, 70, 30); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = 'rgba(70,32,12,0.9)'; ctx.beginPath(); ctx.arc(x - w / 4, y + 35, 7, 0, 7); ctx.arc(x + w / 4, y + 35, 7, 0, 7); ctx.fill();
  ctx.font = `700 40px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#4a1d08'; ctx.fillText('अर्थशास्त्र', x, y + 37);
  ctx.restore();
}
function rockSeat(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(-100, -80, -20, -90); ctx.quadraticCurveTo(80, -100, 95, 0); ctx.fill(); ctx.restore(); }

// ---------- HOOK: dragged out of the court by his topknot ----------
S.hook_court = (t) => {
  const vow = on(t, 1, 0.0, 0.6);
  bg(mixPal(PAL.court, PAL.anger, vow), noise1(t * 3), 540, 640);
  hallPillars();
  ground(1180);
  throne(820, 1180, 0.8);
  person(820, 1180 - 0.8 * 100 + 6, 0.85, { seated: true, hat: 'crown', face: -1, fa: [1.9, -0.8], sh: [0.2, -0.2], lean: -0.08 + Math.sin(t * 9) * 0.03 * (1 - vow) });   // the king laughs
  // line 1: two guards drag him by the topknot, leftwards
  const drag = prog(t, 0, at(0, 1.0)), bx = lerp(560, 330, drag);
  if (vow < 1) {
    ctx.save(); ctx.globalAlpha = 1 - vow;
    person(bx - 170, 1185, 1.2, { face: -1, hat: 'helmet', walk: t * 5, fa: [1.9, -0.2], sh: [0.4, 0.4] });
    ctx.restore();
  }
  // the guard's hand holds the knot: draw the grip line
  const [hx, hy] = headPos(bx, 1185, 1.25, 1);
  if (vow < 1) { ctx.save(); ctx.globalAlpha = 1 - vow; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(bx - 170 - 92, 1185 - 1.2 * 250); ctx.lineTo(hx - 44, hy - 44); ctx.stroke(); ctx.restore(); }
  // line 2: he stands, unties the knot, the hair streams, glow
  glow(bx, 950, 280, '255,190,120', 0.45 * vow);
  brahmin(bx, 1185, 1.25, { face: 1, lean: lerp(-0.32, 0, vow), walk: vow < 0.5 ? t * 7 : null, fa: vow > 0 ? [lerp(0.4, 3.05, vow), lerp(-0.6, 0.05, vow)] : [0.9, -0.5], sh: [lerp(1.2, -0.3, vow), -0.4], untie: on(t, 1, 0.1, 0.6), t, eye: vow });
  chip('मगध का दरबार', 540, 170, 50, on(t, 0, 0.55, 0.5) * (1 - vow));
};

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.gold, noise1(t * 3), 540, 760);
  sun(540, 760, 170, 0.85);
  hills(1000, 220, 51, 0.5); hills(1060, 140, 52, 0.75);
  ground(1180);
  glow(540, 950, 260, '255,220,150', 0.35);
  brahmin(540, 1185, 1.35, { face: 1, fa: [3.05, 0.05], sh: [-0.3, -0.4], untie: 1, t, eye: 0.7 });
  titleCard(t, 'चाणक्य की प्रतिज्ञा', 'मगध  ·  लगभग 321 ई.पू.');
};

// ---------- PART 1: Dhana Nanda's court, the insult ----------
S.magadh = (t) => {
  const ins = on(t, 1, 0.45, 0.6);
  bg(mixPal(PAL.court, PAL.anger, ins), noise1(t * 2), 540, 600);
  hallPillars();
  ground(1180);
  throne(540, 1180, 0.95);
  person(540, 1180 - 0.95 * 100 + 6, 1.0, { seated: true, hat: 'crown', face: ins > 0.5 ? 1 : -1, fa: [lerp(0.6, 1.7, ins), lerp(-0.4, 0.4, ins)], sh: [0.3, -0.3] });
  for (let i = 0; i < 3; i++) person(130 + i * 90, 1185, 0.7, { hat: 'turban', face: 1, lean: Math.sin(t * 8 + i) * 0.04 * ins, fa: [0.3, -0.4] });
  // line 2: Chanakya walks in from the right
  const cx = lerp(1200, 860, prog(t, cue(1)[0] - 0.3, at(1, 0.4)));
  brahmin(cx, 1185, 1.0, { face: -1, walk: cx > 870 ? t * 5 : null, fa: [0.5, -0.4], t, lean: -0.1 * ins });
  chip('राजा धनानंद', 540, 640, 44, on(t, 0, 0.45, 0.4));
  chip('तेईस सौ साल पहले', 540, 175, 46, on(t, 0, 0.05, 0.4) * (1 - on(t, 1, 0, 0.3)));
  chip('तक्षशिला के आचार्य', 860, 780, 38, on(t, 1, 0.2, 0.4) * (1 - ins));
  if (ins > 0) chip('अपमान', 540, 175, 54, ins, { color: '#ff9c7a' });
};

// ---------- PART 2: the vow ----------
S.vow = (t) => {
  bg(PAL.anger, noise1(t * 4), 540, 640);
  for (let k = 0; k < 2; k++) smoke(240 + k * 600, 1180, t, 80 + k, 7, 1.0, 0.15);
  hills(1060, 140, 53, 0.6);
  ground(1180);
  glow(540, 900, 340, '255,170,90', 0.5);
  brahmin(540, 1185, 1.45, { face: 1, fa: [3.05, 0.05], sh: [-0.3, -0.4], untie: 1, t, eye: 1 });
  quoteCard('नंद वंश का नाश… तब तक ये चोटी नहीं बँधेगी', 420, on(t, 0, 0.3, 0.5), 58);
};

// ---------- PART 3: the boy who played king ----------
S.boy = (t) => {
  bg(PAL.forest, noise1(t * 2), 540, 700);
  sun(800, 640, 120, 0.7);
  hills(1040, 160, 54, 0.5);
  for (const [x, s] of [[90, 0.9], [990, 1.0]]) tree(x, 1185, s, t, x);
  ground(1180);
  rockSeat(560, 1180, 1.0);
  const named = on(t, 1, 0.6, 0.5);
  glow(560, 1000, 200, '255,225,160', 0.25 + 0.4 * named);
  person(560, 1180 - 86, 0.62, { seated: true, hat: 'crown', fa: [lerp(1.2, 2.0, Math.max(0, Math.sin(t * 1.4))), -0.6], sh: [0.3, -0.3] });   // the boy-king judging
  for (const [x, f, k] of [[380, 1, 0], [720, -1, 1], [800, -1, 2]]) person(x, 1185, 0.58, { face: f, hat: 'none', fa: [1.0 + Math.sin(t * 2 + k) * 0.2, -0.8], lean: 0.05 });
  brahmin(180, 1185, 1.0, { face: 1, fa: [0.6, -0.5], untie: 1, t: t * 0.3 });
  chip('चंद्रगुप्त', 560, 860, 48, named);
};

// ---------- PART 4: years of training, then the army ----------
S.train = (t) => {
  const l2 = on(t, 1, 0.0, 0.6);
  bg(mixPal(PAL.forest, PAL.anger, l2), noise1(t * 3), 540, 700);
  hills(1040, 160, 55, 0.5);
  ground(1180);
  if (l2 < 1) { ctx.save(); ctx.globalAlpha = 1 - l2;
    tree(100, 1185, 0.9, t, 1); tree(980, 1185, 0.85, t, 2);
    brahmin(330, 1185, 1.0, { face: 1, fa: [1.6, -0.9], untie: 1, t: t * 0.3 });
    person(660, 1185, 0.95, { face: -1, hat: 'pagdi', wpn: 'sword', fa: [2.2 + Math.sin(t * 4) * 0.6, 0.2], sh: [-0.3, -0.3], lean: Math.sin(t * 4) * 0.06 });
    ctx.restore(); chip('तक्षशिला  ·  सालों की तैयारी', 540, 175, 46, on(t, 0, 0.2, 0.4) * (1 - l2)); }
  if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2; const m = prog(t, cue(1)[0], D);
    for (let i = 0; i < 2; i++) elephant(lerp(-200, 300, m) + i * 220, 1180, 0.7, t, i);
    for (let i = 0; i < 6; i++) person(lerp(-300, 200, m) + i * 110, 1185, 0.72, { face: 1, hat: 'helmet', wpn: 'spear', spearA: -0.1, fa: [0.5, -1.3], walk: t * 6 + i });
    ctx.restore(); chip('मगध की ओर', 540, 175, 50, on(t, 1, 0.3, 0.4)); }
};

// ---------- PART 5: the Nandas fall; Chandragupta crowned; the knot is tied ----------
S.fall = (t) => {
  const crown = on(t, 1, 0.4, 0.6), tie = on(t, 2, 0.3, 0.8);
  bg(mixPal(PAL.anger, PAL.gold, crown), noise1(t * 2), 540, 680);
  sun(540, 720, 150, 0.4 + 0.5 * crown);
  if (crown < 1) for (let k = 0; k < 2; k++) smoke(300 + k * 480, 1100, t, 90 + k, 8, 1.1, 0.2 * (1 - crown));
  hills(1040, 140, 56, 0.5);
  fort(540, 1020, 0.6, t);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(540, 840); ctx.lineTo(540, 840 - 130 * crown); ctx.stroke(); ctx.restore();
  if (crown > 0) bhagwa(540, 840, 130 * crown, t, '#e8b43a');
  ground(1180);
  glow(700, 980, 220, '255,225,160', 0.4 * crown);
  person(700, 1185, 1.15, { face: -1, hat: crown > 0.5 ? 'crown' : 'pagdi', wpn: 'sword', fa: [lerp(0.5, 2.7, on(t, 0, 0.2, 0.6)), 0.15], sh: [-0.3, -0.3] });
  glow(330, 960, 240, '255,210,140', 0.5 * tie);
  brahmin(330, 1185, 1.15, { face: 1, fa: [lerp(0.6, 2.7, on(t, 2, 0.0, 0.4)), lerp(-0.4, -1.9, on(t, 2, 0.0, 0.4))], untie: 1 - tie, t, eye: 0.6 });
  chip('सम्राट चंद्रगुप्त मौर्य', 700, 760, 42, on(t, 1, 0.5, 0.4));
  chip('गुरु और शिष्य', 540, 175, 48, on(t, 0, 0.3, 0.4) * (1 - on(t, 1, 0, 0.3)));
  if (tie > 0) chip('प्रतिज्ञा पूरी', 540, 175, 52, tie, { color: '#a8ff9c' });
};

// ---------- PART 6: the Maurya empire and the Arthashastra ----------
S.legacy = (t) => {
  bg(PAL.gold, 0, 540, 640);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,170,0.07)';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.05; ctx.beginPath(); ctx.moveTo(540, 720); ctx.lineTo(540 + Math.cos(a) * 1600, 720 + Math.sin(a) * 1600); ctx.lineTo(540 + Math.cos(a + 0.12) * 1600, 720 + Math.sin(a + 0.12) * 1600); ctx.fill(); }
  ctx.restore();
  hills(1060, 160, 57, 0.6);
  ground(1180);
  brahmin(300, 1185, 1.1, { face: 1, seated: true, fa: [1.2, -0.9], sh: [0.4, -0.6], t });
  palmLeaves(640, 1040, 420, on(t, 0, 0.45, 0.6));
  chip('मौर्य साम्राज्य', 540, 175, 52, on(t, 0, 0.05, 0.4));
};

// ---------- PART 7: the twist - his grandson was Ashoka ----------
S.twist = (t) => {
  bg(PAL.court, noise1(t * 2), 540, 760);
  ground(1200);
  const g = [on(t, 0, 0.15, 0.4), on(t, 0, 0.4, 0.4), on(t, 0, 0.75, 0.5)];
  const fig = [[230, 'चंद्रगुप्त', 1.0], [540, 'बिंदुसार', 1.0], [850, 'अशोक', 1.15]];
  fig.forEach(([x, name, s], k) => { if (g[k] <= 0) return; ctx.save(); ctx.globalAlpha = g[k];
    if (k === 2) glow(x, 950, 260, '255,220,150', 0.5 * g[k]);
    person(x, 1205, s, { hat: 'crown', face: k === 2 ? -1 : 1, fa: [0.4, -0.4] }); ctx.restore();
    chip(name, x, 780, 42, g[k], k === 2 ? { color: '#fff3d6' } : {});
    if (k) textBlock('→', x - 155, 1040, 70, { alpha: g[k], color: GOLD }); });
  textBlock('दादा  ·  पिता  ·  पोता', 540, 330, 50, { alpha: g[2] * (1 - on(t, 1, 0, 0.3)) });
  followChip(t, 1);
};
