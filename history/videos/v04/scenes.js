// @common: this video uses history/common.js (shared helpers), added in front by render.py
// ---------------- scenes: video 04 - Ashoka after Kalinga ----------------
PAL.ash = ['#f2b06a', '#8c3b22', '#1e0805'];
PAL.blood = ['#ff9a5a', '#9a2716', '#220604'];
PAL.peace = ['#fff0c4', '#e8a85a', '#5a2a0e'];
PAL.court = ['#ffe0a0', '#d98a3c', '#3a1406'];
const NAVY = '#1a2a80';

function spearStuck(x, y, h, a) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -h); ctx.stroke();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-7, -h); ctx.lineTo(0, -h - 26); ctx.lineTo(7, -h); ctx.fill(); ctx.restore(); }
function shield(x, y, r, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.45, 0, 0, 7); ctx.fill();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(0, -2, r * 0.18, 0, 7); ctx.fill(); ctx.restore(); }
function fallen(x, y, s, f = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = INK; ctx.globalAlpha *= 0.9;
  ctx.beginPath(); ctx.ellipse(0, -14, 70, 16, 0.05, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(78, -16, 15, 0, 7); ctx.fill(); ctx.restore(); }
function chakra(x, y, r, col, rot = 0, lw = 4) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, 7); ctx.fill();
  ctx.lineWidth = lw * 0.6; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 0.16, Math.sin(a) * r * 0.16); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke(); }
  ctx.restore();
}
function lion(x, y, s, f) {   // a seated lion: profile (f = +1 / -1 facing) or front (f = 0)
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (f || 1), s); ctx.fillStyle = INK;
  ctx.strokeStyle = 'rgba(255,214,150,0.75)'; ctx.lineWidth = 5; ctx.lineJoin = 'round';
  const star = (cx, cy, r1, r2, n) => { ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r2 : r1; ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } ctx.closePath(); ctx.stroke(); ctx.fill();
    ctx.save(); ctx.strokeStyle = HOLE; ctx.lineWidth = 2.5; for (let i = 0; i < n; i++) { const a = (i + 0.5) / n * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r2 * 0.45, cy + Math.sin(a) * r2 * 0.45); ctx.lineTo(cx + Math.cos(a) * r2 * 0.85, cy + Math.sin(a) * r2 * 0.85); ctx.stroke(); } ctx.restore(); };
  if (f === 0) {
    ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-34, -80); ctx.lineTo(34, -80); ctx.lineTo(40, 0); ctx.closePath(); ctx.stroke(); ctx.fill();   // chest
    ctx.fillRect(-30, -40, 18, 40); ctx.fillRect(12, -40, 18, 40);
    star(0, -122, 58, 44, 11);                                                                   // mane
    ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(-15, -130, 5.5, 0, 7); ctx.arc(15, -130, 5.5, 0, 7); ctx.fill();
    ctx.fillRect(-14, -104, 28, 6);                                                              // open mouth
  } else {
    ctx.beginPath(); ctx.moveTo(-46, 0); ctx.quadraticCurveTo(-56, -50, -24, -86); ctx.lineTo(28, -92); ctx.lineTo(38, 0); ctx.closePath(); ctx.stroke(); ctx.fill();   // seated body
    ctx.fillRect(20, -60, 16, 60);                                                               // front leg
    star(6, -118, 46, 36, 9);                                                                    // mane
    ctx.beginPath(); ctx.moveTo(34, -140); ctx.lineTo(74, -128); ctx.lineTo(58, -120); ctx.lineTo(74, -110); ctx.lineTo(36, -100); ctx.closePath(); ctx.stroke(); ctx.fill();   // snarling muzzle
    ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(30, -126, 4.5, 0, 7); ctx.fill();
  }
  ctx.restore();
}
function lionCapital(x, y, s, glowA = 0) {   // the Sarnath capital: lotus bell, abacus with a wheel, lions back to back
  if (glowA > 0) glow(x, y - 230 * s, 360 * s, '255,225,160', 0.55 * glowA);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.quadraticCurveTo(-60, -60, -95, -110); ctx.lineTo(95, -110); ctx.quadraticCurveTo(60, -60, 70, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(-60 + i * 20, -80, 6, 18, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = INK; ctx.fillRect(-110, -170, 220, 60);
  ctx.restore();
  chakra(x, y - 140 * s, 22 * s, 'rgba(255,214,150,0.85)', 0, 3 * s);
  lion(x - 78 * s, y - 170 * s, 1.1 * s, -1); lion(x + 78 * s, y - 170 * s, 1.1 * s, 1); lion(x, y - 166 * s, 1.0 * s, 0);
}
function edictRock(x, y, s, reveal) {   // a boulder with lines of carved letters appearing
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-300, 0); ctx.quadraticCurveTo(-330, -260, -120, -330); ctx.quadraticCurveTo(140, -380, 290, -230); ctx.quadraticCurveTo(340, -100, 300, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,205,140,0.85)'; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; const r = rng(9);
  for (let row = 0; row < 6; row++) { if (row / 6 > reveal) break; let gx = -215 + (row % 2) * 12;
    while (gx < 205) { const k = Math.floor(r() * 8), yy = -268 + row * 42, h = 20; ctx.beginPath();
      if (k === 0) { ctx.moveTo(gx, yy + h / 2); ctx.lineTo(gx + 16, yy + h / 2); ctx.moveTo(gx + 8, yy); ctx.lineTo(gx + 8, yy + h); }           // ka
      else if (k === 1) { ctx.moveTo(gx + 14, yy); ctx.quadraticCurveTo(gx - 4, yy + h / 2, gx + 14, yy + h); }                                    // ta
      else if (k === 2) { ctx.moveTo(gx, yy); ctx.lineTo(gx, yy + h); ctx.lineTo(gx + 16, yy + h); ctx.lineTo(gx + 16, yy + 6); }                   // ya-ish
      else if (k === 3) { ctx.arc(gx + 8, yy + h - 7, 7, Math.PI, 0); ctx.moveTo(gx + 8, yy + h - 14); ctx.lineTo(gx + 8, yy); }                  // ma-ish
      else if (k === 4) { ctx.moveTo(gx, yy + h); ctx.lineTo(gx + 8, yy); ctx.lineTo(gx + 16, yy + h); ctx.moveTo(gx + 16, yy + h); ctx.lineTo(gx + 22, yy + h - 6); } // ga + mark
      else if (k === 5) { ctx.moveTo(gx + 8, yy); ctx.lineTo(gx + 8, yy + h); ctx.moveTo(gx + 8, yy + 7); ctx.lineTo(gx + 17, yy + 2); }        // vowel sign
      else if (k === 6) { ctx.moveTo(gx, yy + 4); ctx.quadraticCurveTo(gx + 8, yy + h + 6, gx + 16, yy + 4); }                                    // cup
      else { ctx.arc(gx + 8, yy + h / 2, 3, 0, 7); }                                                                                                 // dot
      ctx.stroke(); gx += k === 7 ? 14 : 26; } }
  ctx.restore();
}
function monk(x, y, s, p = {}) {   // shaven head, robe over one shoulder
  person(x, y, s, { hat: 'none', ...p });
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (p.face || 1), s); ctx.fillStyle = 'rgba(214,110,30,0.95)';
  ctx.beginPath(); ctx.moveTo(-28, -262); ctx.lineTo(30, -250); ctx.lineTo(44, -40); ctx.lineTo(-40, -40); ctx.closePath(); ctx.fill(); ctx.restore();
}
function banyan(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(-16, -200, 32, 200);
  for (const [cx, cy, r] of [[0, -260, 110], [-90, -220, 80], [90, -220, 85], [0, -340, 80]]) { ctx.beginPath(); ctx.arc(cx + Math.sin(t + cx) * 2, cy, r, 0, 7); ctx.fill(); }
  ctx.restore(); }
function well(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(-70, -70, 140, 70); ctx.fillRect(-80, -170, 12, 100); ctx.fillRect(68, -170, 12, 100);
  ctx.fillRect(-90, -178, 180, 14); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -164); ctx.lineTo(0, -100); ctx.stroke(); ctx.fillRect(-14, -100, 28, 24); ctx.restore(); }
function deer(x, y, s, f = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.ellipse(0, -80, 52, 22, 0, 0, 7); ctx.fill(); for (const lx of [-36, -24, 28, 40]) { ctx.beginPath(); ctx.moveTo(lx, -70); ctx.lineTo(lx, 0); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(40, -90); ctx.lineTo(60, -140); ctx.lineTo(80, -130); ctx.lineTo(56, -84); ctx.fill();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(64, -140); ctx.lineTo(56, -176); ctx.moveTo(60, -160); ctx.lineTo(46, -168); ctx.moveTo(70, -140); ctx.lineTo(78, -174); ctx.stroke(); ctx.restore(); }
function tiranga(x, y, w, h, t, a) {   // the national flag, waving, with the Ashoka Chakra
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, y + h + 600); ctx.lineTo(x, y - 20); ctx.stroke();
  const band = (k, col) => { ctx.fillStyle = col; ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const u = i / 20; ctx.lineTo(x + u * w, y + k * h / 3 + Math.sin(u * 5 - t * 4) * 14 * u); }
    for (let i = 20; i >= 0; i--) { const u = i / 20; ctx.lineTo(x + u * w, y + (k + 1) * h / 3 + Math.sin(u * 5 - t * 4) * 14 * u); } ctx.fill(); };
  band(0, '#ff9933'); band(1, '#ffffff'); band(2, '#138808');
  const u = 0.5; chakra(x + u * w, y + h / 2 + Math.sin(u * 5 - t * 4) * 14 * u, h / 6 * 0.92, NAVY, 0, 3);
  ctx.restore();
}
function note(x, y, w, a) {   // a generic banknote card showing the emblem
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(-0.06);
  ctx.fillStyle = 'rgba(214,226,196,0.97)'; ctx.strokeStyle = 'rgba(60,80,50,0.9)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(-w / 2, -w * 0.23, w, w * 0.46, 14); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-w / 2 + 14, -w * 0.23 + 14, w - 28, w * 0.46 - 28, 10); ctx.stroke();
  ctx.fillStyle = '#3c5032'; ctx.font = `700 ${w * 0.1}px ${SANS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₹', w * 0.3, 0);
  ctx.restore();
  ctx.save(); ctx.globalAlpha = a; lionCapital(x - w * 0.22, y + w * 0.16, w / 1300, 0); ctx.restore();
}

// ---------- HOOK: the victor weeping on the battlefield ----------
S.hook_field = (t) => {
  bg(PAL.ash, noise1(t * 2), 540, 620);
  sun(700, 640, 120, 0.55);
  for (let k = 0; k < 3; k++) smoke(150 + k * 360, 1150, t, 60 + k, 9, 1.2, 0.22);
  hills(1040, 120, 41, 0.5);
  ground(1170);
  const r = rng(4);
  for (let i = 0; i < 9; i++) spearStuck(60 + i * 120 + r() * 40, 1180, 150 + r() * 60, (r() - 0.5) * 0.7);
  for (let i = 0; i < 4; i++) fallen(100 + i * 260, 1200 + (i % 2) * 30, 0.9, i % 2 ? 1 : -1);
  shield(230, 1215, 40, 0.2); shield(830, 1230, 46, -0.3);
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(900, 1190); ctx.lineTo(980, 1010); ctx.stroke(); ctx.restore();
  flag(980, 1010, 80, 50, t * 0.3);
  // Ashoka: crown, head bowed, the sword hanging from his hand; it drops on line 2
  const drop = on(t, 1, 0.3, 0.6);
  glow(540, 950, 300, '255,215,150', 0.35);
  person(540, 1185, 1.4, { hat: 'crown', face: 1, lean: 0.12, fa: [lerp(0.3, 0.1, drop), -0.2], sh: [0.4, -1.2], wpn: drop < 0.5 ? 'sword' : null });
  if (drop >= 0.5) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(590, 1196); ctx.lineTo(760, 1186); ctx.stroke(); ctx.restore(); }
  birds(t, -60, 300, 5, 3);
  chip('कलिंग  ·  261 ई.पू.', 540, 170, 50, on(t, 0, 0.6, 0.5));
};

// ---------- TITLE ----------
S.title = (t) => {
  bg(PAL.court, noise1(t * 3), 540, 760);
  sun(540, 760, 170, 0.85);
  hills(1000, 220, 42, 0.5); hills(1060, 140, 43, 0.75);
  ground(1180);
  elephant(560, 1185, 1.05, t * 0.3, 0);
  person(560, 1185 - 1.05 * 300, 0.62, { seated: true, hat: 'crown', fa: [1.6, -0.4], sh: [0.3, 0.3] });
  titleCard(t, 'सम्राट अशोक', 'कलिंग के बाद  ·  261 ई.पू.');
};

// ---------- PART 1: grandson of Chandragupta; "Chandashoka" ----------
S.rise = (t) => {
  const dark = on(t, 1, 0.0, 0.8);
  bg(mixPal(PAL.court, PAL.blood, dark), noise1(t * 2), 540, 600);
  // the pillared hall of Pataliputra
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(-40, 160, W + 80, 140);
  for (let i = 0; i < 6; i++) { const x = 60 + i * 192; ctx.fillRect(x - 22, 300, 44, 880); ctx.beginPath(); ctx.ellipse(x, 310, 46, 22, 0, 0, 7); ctx.fill(); }
  ctx.restore();
  ground(1180);
  person(540, 1185, 1.25, { hat: 'crown', face: 1, wpn: dark > 0.3 ? 'sword' : null, fa: [lerp(0.4, 2.4, dark), lerp(-0.6, 0.2, dark)], sh: [-0.3, -0.3], eye: 0.6 * dark });
  if (dark > 0) { ctx.save(); ctx.globalAlpha = dark; person(lerp(900, 840, dark), 1185, 1.0, { face: -1, hat: 'crown', lean: 0.25 * dark, fa: [1.6, -0.6] }); person(lerp(180, 230, dark), 1185, 1.0, { face: 1, hat: 'crown', lean: 0.25 * dark, fa: [1.6, -0.6] }); ctx.restore(); }
  chip('चंद्रगुप्त  →  बिंदुसार  →  अशोक', 540, 470, 44, on(t, 0, 0.3, 0.5) * (1 - on(t, 1, 0, 0.3)));
  chip('मौर्य साम्राज्य', 540, 175, 50, on(t, 0, 0.05, 0.4) * (1 - on(t, 1, 0, 0.3)));
  textBlock('चंडाशोक', 540, 230, 110, { font: SERIF, color: '#ff8a6a', alpha: on(t, 1, 0.6, 0.5), glow: 'rgba(200,40,20,0.8)', sw: 16 });
};

// ---------- PART 2: the attack on Kalinga ----------
S.war = (t) => {
  bg(PAL.blood, noise1(t * 4), 540, 620);
  for (let k = 0; k < 2; k++) smoke(250 + k * 520, 1120, t, 70 + k, 9, 1.1, 0.2);
  hills(1000, 120, 44, 0.45);
  ground(1170);
  const charge = prog(t, 0, D);
  for (let i = 0; i < 3; i++) elephant(lerp(-260, 260, charge) + i * 170 - 100, 1175 - i * 8, 0.7, t, i);
  for (let i = 0; i < 6; i++) person(lerp(1180, 820, charge) + i * 70 - 60, 1180, 0.75, { face: -1, hat: 'turban', wpn: 'spear', spearA: 1.1, fa: [1.4, -0.3], walk: t * 6 + i });
  bigYear('261 ई.पू.', 220, on(t, 0, 0.0, 0.4) * (1 - on(t, 1, 0.0, 0.4)), 110);
  mapCard(t, on(t, 0, 0.2, 0.4) * (1 - on(t, 1, 0.0, 0.4)), [[740, 400, 'मगध'], [860, 640, 'कलिंग (ओडिशा)', -40, 54]], prog(t, at(0, 0.3), cue(0)[1]), { x: 620, y: 310, w: 400, h: 440 });
  chip('कलिंग की सेना', 860, 860, 40, on(t, 1, 0.1, 0.4));
  chip('मौर्य सेना', 230, 860, 40, on(t, 1, 0.4, 0.4));
};

// ---------- PART 3: the cost, in his own words on stone ----------
S.cost = (t) => {
  const broken = on(t, 1, 0.0, 0.8);
  bg(mixPal(PAL.ash, PAL.blood, 0.3), noise1(t * 2), 540, 640);
  hills(1060, 120, 45, 0.5);
  ground(1170);
  edictRock(560, 1175, 1.0, prog(t, at(0, 0.0), at(0, 0.6)));
  chip('1,00,000 मारे गए', 330, 520, 50, on(t, 0, 0.5, 0.4), { color: '#ffb09a' });
  chip('1,50,000 बंदी', 760, 620, 50, on(t, 0, 0.75, 0.4), { color: '#ffb09a' });
  chip('शिलालेख 13', 540, 175, 46, on(t, 0, 0.05, 0.4));
  if (broken > 0) { ctx.save(); ctx.globalAlpha = broken; dim(0.3 * broken); glow(300, 1000, 200, '255,210,150', 0.4);
    person(300, 1185, 1.1, { hat: 'crown', seated: true, lean: 0.35, fa: [0.7, -1.4], sh: [0.8, -1.6] }); ctx.restore(); }
};

// ---------- PART 4: the vow - Dhamma, edicts, care ----------
S.change = (t) => {
  const l2 = on(t, 1, 0.0, 0.6), l3 = on(t, 2, 0.0, 0.6);
  bg(mixPal(PAL.ash, PAL.peace, prog(t, 0, at(0, 0.8))), 0, 540, 640);
  sun(540, 720, 150, 0.6 + 0.3 * l2);
  hills(1060, 140, 46, 0.5);
  ground(1180);
  // line 1: he lays the sword down
  if (l3 < 1) { ctx.save(); ctx.globalAlpha = 1 - l3;
    glow(420, 950, 240, '255,225,170', 0.4);
    person(420, 1185, 1.15, { hat: 'crown', fa: [lerp(0.9, 0.2, on(t, 0, 0.3, 0.6)), -0.4], sh: [-0.2, -0.3] });
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(470, 1190); ctx.lineTo(650, 1190); ctx.stroke(); ctx.restore();
    if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2; monk(720, 1185, 1.05, { face: -1, fa: [1.2, -1.5] }); ctx.restore();
      ctx.save(); ctx.fillStyle = INK; ctx.globalAlpha = l2; ctx.fillRect(900, 760, 36, 430); ctx.restore(); lion(918, 770, 0.8 * l2 + 0.01, 1); }
    ctx.restore(); }
  quoteCard('अब तलवार नहीं… धम्म', 380, on(t, 0, 0.35, 0.5) * (1 - on(t, 1, 0, 0.3)), 66);
  chip('बौद्ध धर्म  ·  शिलालेख और स्तंभ', 540, 175, 44, l2 * (1 - l3));
  // line 3: trees along the road, a well, a deer at peace
  if (l3 > 0) { ctx.save(); ctx.globalAlpha = l3;
    for (const [x, s] of [[120, 0.9], [420, 0.75], [780, 0.85], [1010, 0.7]]) banyan(x, 1185, s, t);
    well(600, 1185, 0.9); deer(300, 1185, 0.9, 1); deer(880, 1190, 0.75, -1);
    ctx.restore(); chip('इलाज  ·  पेड़  ·  कुएँ  ·  दया', 540, 175, 46, l3); }
};

// ---------- PART 5: Mahinda and Sanghamitra sail to Sri Lanka; Dhammashoka ----------
S.mission = (t) => {
  const l2 = on(t, 1, 0.0, 0.6);
  bg(PAL.peace, 0, 540, 760);
  sun(760, 820, 140, 0.8);
  // island on the horizon
  ctx.save(); ctx.fillStyle = INK; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.moveTo(620, 1000); ctx.quadraticCurveTo(820, 900, 1100, 990); ctx.lineTo(1100, 1010); ctx.lineTo(620, 1010); ctx.fill(); ctx.restore();
  tree(900, 960, 0.35, t, 1); tree(980, 975, 0.3, t, 2);
  water(1000, t, 0.6);
  const bx = lerp(220, 520, prog(t, 0, D));
  ahomBoat(bx, 1150, 0.6, t, { rowers: 2, face: 1 });
  monk(bx - 30, 1110, 0.62, { face: 1, fa: [1.4, -1.4] });
  woman(bx + 60, 1110, 0.58, { face: 1, hat: 'none', fa: [1.2, -1.4], t, scarf: 'rgba(214,110,30,0.95)', noSkirt: true });
  chip('महेंद्र', bx - 30, 860, 36, on(t, 0, 0.3, 0.4) * (1 - l2)); chip('संघमित्रा', bx + 70, 920, 36, on(t, 0, 0.4, 0.4) * (1 - l2));
  chip('श्रीलंका', 880, 820, 42, on(t, 0, 0.75, 0.4) * (1 - l2));
  // line 2: Chandashoka becomes Dhammashoka
  const sw = on(t, 1, 0.35, 0.6);
  textBlock('चंडाशोक', 540, 330, 96, { font: SERIF, color: '#ff8a6a', alpha: l2 * (1 - sw), sw: 14 });
  textBlock('धम्माशोक', 540, 330, 110, { font: SERIF, color: GOLD, alpha: sw, glow: 'rgba(255,170,60,0.9)', sw: 16 });
};

// ---------- PART 6: the twist - his emblem in every pocket ----------
S.twist = (t) => {
  const l2 = on(t, 1, 0.0, 0.6), l3 = on(t, 2, 0.0, 0.6);
  bg(mixPal(PAL.court, PAL.peace, l2), 0, 540, 760);
  ground(1300);
  // line 1: a banknote rises
  note(540, lerp(1100, 800, on(t, 0, 0.2, 1.0)), 560, on(t, 0, 0.2, 0.6) * (1 - l2));
  // line 2: the Sarnath lion capital, glowing
  if (l2 > 0) { ctx.save(); ctx.globalAlpha = l2 * (1 - l3); lionCapital(540, 1180, 1.6, l2); ctx.restore();
    chip('सारनाथ का सिंह-स्तंभ  ·  राष्ट्रीय चिह्न', 540, 230, 44, l2 * (1 - l3)); }
  // line 3: the tricolour with the Ashoka Chakra
  tiranga(290, 640, 520, 330, t, l3);
  chip('अशोक चक्र', 550, 1050, 46, on(t, 2, 0.4, 0.4));
  followChip(t, 3);
};
