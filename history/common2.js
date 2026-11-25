// ================= Ek Tha Bharat toolkit v2 (videos 07+) =================
// Loaded after common.js for scenes.js files that start with "// @common2".
// Camera & impacts, kinetic text, atmosphere, acting puppets with coloured leather inlays,
// crowds & armies, battle effects, era scenery and props, colour grading.

PAL.cold = ['#9fb3c9', '#3d4f6a', '#0b1018'];
PAL.blood = ['#ff8a52', '#9c1f12', '#1d0302'];
PAL.jail = ['#c9b48a', '#5a4a32', '#120d07'];
PAL.sepia = ['#f1dcb0', '#a7835a', '#2a1c10'];
PAL.sea = ['#ffd49a', '#d0703a', '#2a0f12'];
PAL.temple = ['#ffe6a8', '#e09440', '#3a1406'];
PAL.fire = ['#ffc062', '#d4461c', '#2a0502'];
PAL.dusk2 = ['#ffb37a', '#8d3b4a', '#1a0a14'];
const SAFF = '#ff8a1e', LEAF = '#2f8a3a', CHALK = '#f3ead2', RED = '#b8231a';

// ---------------- camera & impact ----------------
// call first in a scene: cam(t, {z, fx, fy, px, py, shake, rot})
function cam(t, o = {}) {
  const z = o.z || 1, fx = o.fx == null ? 540 : o.fx, fy = o.fy == null ? 900 : o.fy, sh = o.shake || 0;
  const sx = sh ? noise1(t * 37 + 1) * sh : 0, sy = sh ? noise1(t * 41 + 3) * sh : 0;
  ctx.translate(fx + (o.px || 0) + sx, fy + (o.py || 0) + sy);
  ctx.rotate((o.rot || 0) + (sh ? noise1(t * 23 + 7) * sh * 0.0011 : 0));
  ctx.scale(z, z); ctx.translate(-fx, -fy);
}
const hit = (t, t0, dur = 0.6, amp = 22) => (t < t0 || t > t0 + dur) ? 0 : amp * Math.pow(1 - (t - t0) / dur, 2);
const bump = (t, t0, dur = 0.5, amt = 0.07) => (t < t0 || t > t0 + dur) ? 0 : amt * Math.sin(Math.PI * Math.min(1, (t - t0) / dur * 2.2)) * (1 - (t - t0) / dur);
const easeBack = k => { const c = 1.9; k = clamp(k) - 1; return 1 + (c + 1) * k * k * k + c * k * k; };
const ramp = (t, a, b) => clamp((t - a) / (b - a));          // linear 0..1
const pulse = (t, f = 1) => 0.5 + 0.5 * Math.sin(t * f * Math.PI * 2);
function overlay(fn) { if (DEFER) OV.push(fn); else fn(); }

// ---------------- kinetic text ----------------
// a word/year that slams onto the screen at t0 (scale down + flash + glow)
function slam(text, y, t, t0, size = 120, o = {}) {
  if (t < t0) return;
  const k = clamp((t - t0) / (o.dur || 0.3)), out = o.until != null ? 1 - prog(t, o.until - 0.3, o.until) : 1;
  overlay(() => {
    const sc = lerp(o.from || 2.1, 1, easeBack(k));
    ctx.save(); ctx.translate(o.x || 540, y); ctx.scale(sc, sc); ctx.rotate(o.rot || 0); ctx.translate(-(o.x || 540), -y);
    textBlock(text, o.x || 540, y, size, { font: o.font || SERIF, color: o.color || GOLD, alpha: Math.min(1, k * 3) * out, glow: o.glow || 'rgba(255,150,50,0.95)', sw: size * 0.15, maxW: o.maxW || 960 });
    ctx.restore();
    if (k < 1 && !o.noFlash) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = (1 - k) * 0.35; ctx.fillStyle = '#ffd8a0'; ctx.fillRect(0, y - size, W, size * 2); ctx.restore(); }
  });
}
// a red rubber stamp, e.g. "क़ैद", "1857", "फ़रार"
function stamp(text, x, y, t, t0, o = {}) {
  if (t < t0) return;
  const k = clamp((t - t0) / 0.22), a = (o.alpha == null ? 1 : o.alpha) * Math.min(1, k * 2);
  overlay(() => {
    const sc = lerp(1.8, 1, easeOut(k)); const size = o.size || 72;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot == null ? -0.12 : o.rot); ctx.scale(sc, sc); ctx.globalAlpha = a;
    ctx.font = `700 ${size}px ${o.font || SANS}`; const w = ctx.measureText(text).width + size * 0.9, h = size * 1.45;
    ctx.strokeStyle = o.color || '#c8261a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 6); ctx.stroke();
    ctx.fillStyle = o.color || '#c8261a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4);
    // worn ink speckles
    ctx.globalCompositeOperation = 'destination-out'; const r = rng(text.length * 7 + 3);
    for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * w, (r() - 0.5) * h, r() * 4, 0, 7); ctx.fill(); }
    ctx.restore();
  });
}
const typed = (text, t, t0, cps = 14) => { const ch = [...text]; return ch.slice(0, Math.max(0, Math.floor((t - t0) * cps))).join(''); };
const rollNum = (a, b, t, t0, t1) => String(Math.round(lerp(a, b, ss((t - t0) / (t1 - t0)))));
// title card v2: big name slams in, subtitle and ornament line grow
function title2(t, main, sub, o = {}) {
  const y = o.y || 250;
  slam(main, y, t, 0.05, o.size || 104, { from: 1.6, maxW: 980 });
  const a = prog(t, 0.45, 0.9);
  overlay(() => {
    textBlock(sub, 540, y + 128, 54, { alpha: a, color: '#ffe8c4' });
    const w = 320 * easeOut(prog(t, 0.5, 1.1));
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(540 - w, y + 196); ctx.lineTo(540 + w, y + 196); ctx.stroke();
    ctx.fillStyle = GOLD; ctx.translate(540, y + 196); ctx.rotate(Math.PI / 4); ctx.fillRect(-9, -9, 18, 18); ctx.restore();
  });
}
// pulsing ring on a map point
function ring(x, y, t, a = 1, col = '184,35,26') {
  for (let k = 0; k < 2; k++) { const p = (t * 0.9 + k * 0.5) % 1; ctx.save(); ctx.globalAlpha = a * (1 - p); ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, 14 + p * 60, 0, 7); ctx.stroke(); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = `rgb(${col})`; ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill(); ctx.restore();
}

// ---------------- atmosphere ----------------
function rays(x, y, t, a = 0.08, n = 14, col = '255,230,170') {
  if (a <= 0) return;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(${col},${a})`;
  for (let i = 0; i < n; i++) { const q = i / n * Math.PI * 2 + t * 0.04; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q) * 2000, y + Math.sin(q) * 2000); ctx.lineTo(x + Math.cos(q + 0.09) * 2000, y + Math.sin(q + 0.09) * 2000); ctx.fill(); }
  ctx.restore();
}
function embers(t, n = 40, seed = 1, a = 0.9, area = [0, 300, W, 1350]) {
  const r = rng(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const x0 = area[0] + r() * (area[2] - area[0]), sp = 40 + r() * 110, ph = r() * 20, life = ((t * sp / 900 + r()) % 1);
    const y = area[3] - life * (area[3] - area[1]), x = x0 + Math.sin(t * 1.3 + ph) * 30 + life * 60;
    ctx.globalAlpha = a * Math.sin(life * Math.PI) * (0.6 + 0.4 * Math.sin(t * 9 + ph));
    ctx.fillStyle = r() < 0.5 ? '#ffb347' : '#ffd98a'; ctx.beginPath(); ctx.arc(x, y, 1.5 + r() * 3, 0, 7); ctx.fill();
  }
  ctx.restore();
}
function rain(t, a = 0.5, seed = 2, slant = 0.25) {
  if (a <= 0) return;
  const r = rng(seed); ctx.save(); ctx.strokeStyle = `rgba(230,220,200,${0.35 * a})`; ctx.lineWidth = 2.2;
  for (let i = 0; i < 140; i++) { const x0 = r() * (W + 400) - 200, sp = 1600 + r() * 900, y = ((r() * H + t * sp) % (H + 200)) - 100, x = x0 - (y * slant);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 26 * slant * 2, y + 52); ctx.stroke(); }
  ctx.restore();
}
function fog(y, t, a = 0.25, seed = 3, col = '40,18,8') {
  if (a <= 0) return;
  const r = rng(seed); ctx.save();
  for (let i = 0; i < 9; i++) { const x = ((r() * 1600 + t * (12 + r() * 20)) % 1600) - 260, yy = y + (r() - 0.5) * 120, rad = 180 + r() * 220;
    const g = ctx.createRadialGradient(x, yy, 0, x, yy, rad); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - rad, yy - rad, rad * 2, rad * 2); }
  ctx.restore();
}
function bolt(x, y0, y1, seed, a) {   // lightning
  if (a <= 0) return;
  const r = rng(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = `rgba(255,248,225,${a})`; ctx.lineWidth = 6; ctx.shadowColor = '#fff2c8'; ctx.shadowBlur = 30;
  ctx.beginPath(); let px = x; ctx.moveTo(px, y0); for (let y = y0; y < y1; y += 40) { px += (r() - 0.5) * 70; ctx.lineTo(px, y); } ctx.stroke();
  ctx.restore(); flash(a * 0.35, '255,245,220');
}
function stars(t, a = 0.8, seed = 5, yMax = 900) {
  const r = rng(seed); ctx.save(); ctx.fillStyle = '#fff1cf';
  for (let i = 0; i < 80; i++) { const x = r() * W, y = r() * yMax, s = 1 + r() * 2.4; ctx.globalAlpha = a * (0.4 + 0.6 * pulse(t * (0.2 + r() * 0.5) + r())); ctx.beginPath(); ctx.arc(x, y, s, 0, 7); ctx.fill(); }
  ctx.restore();
}
function dust(t, a = 0.3, seed = 6, y0 = 900, y1 = 1300) {
  const r = rng(seed); ctx.save(); ctx.fillStyle = '#3a1a0a';
  for (let i = 0; i < 26; i++) { const x = ((r() * 1500 + t * (60 + r() * 120)) % 1500) - 200, y = y0 + r() * (y1 - y0), rad = 40 + r() * 90;
    ctx.globalAlpha = a * (0.3 + 0.7 * r()); ctx.beginPath(); ctx.ellipse(x, y, rad * 1.8, rad * 0.6, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
// layered fire tongues; s = size
function flames(x, y, s, t, seed = 1, a = 1) {
  if (a <= 0) return;
  glow(x, y - 90 * s, 260 * s, '255,150,50', 0.55 * a);
  const r = rng(seed); ctx.save(); ctx.globalAlpha = a;
  for (const [col, k] of [['#b8361a', 1], ['#ff8a2a', 0.78], ['#ffd27a', 0.5]]) {
    ctx.fillStyle = col;
    for (let i = 0; i < 5; i++) { const ox = (i - 2) * 26 * s * k, f = noise1(t * (6 + i) + seed * 3 + i * 1.7), h = (140 + r() * 70) * s * k * (0.8 + 0.25 * f);
      ctx.beginPath(); ctx.moveTo(x + ox - 26 * s * k, y); ctx.quadraticCurveTo(x + ox - 30 * s * k + f * 10 * s, y - h * 0.55, x + ox + f * 22 * s, y - h);
      ctx.quadraticCurveTo(x + ox + 32 * s * k, y - h * 0.5, x + ox + 26 * s * k, y); ctx.fill(); }
  }
  ctx.restore();
}
function fireRow(x0, x1, y, t, s = 1, seed = 1, a = 1) { for (let x = x0, i = 0; x <= x1; x += 130 * s, i++) flames(x, y + (i % 2) * 8, s * (0.8 + 0.3 * ((i * 7) % 3) / 2), t, seed + i, a); }

// ---------------- acting puppets ----------------
// pose presets (front arm fa / back arm sh), mix with poseMix(a, b, k)
const POSE = {
  idle: { fa: [0.25, -0.3], sh: [-0.25, -0.35] }, hips: { fa: [0.5, -1.9], sh: [-0.5, 1.9] },
  raise: { fa: [2.85, 0.1], sh: [-0.4, -0.3] }, fist: { fa: [2.95, 0.25], sh: [-0.3, -0.4] }, point: { fa: [1.62, 0], sh: [-0.3, -0.4] },
  forward: { fa: [1.35, -0.1], sh: [-0.4, -0.5] }, salute: { fa: [2.1, 1.9], sh: [-0.2, -0.3] }, pray: { fa: [1.0, 1.6], sh: [-0.9, -1.6] },
  hold: { fa: [0.9, -0.9], sh: [-0.2, -0.4] }, guard: { fa: [1.9, 0.9], sh: [0.6, 0.7] }, strike: { fa: [1.5, 0.15], sh: [-0.9, -0.2] },
  spearUp: { fa: [0.5, -1.3], sh: [-0.3, -0.4] }, mourn: { fa: [0.15, -0.1], sh: [0.1, -0.1] }, reach: { fa: [1.8, -0.2], sh: [1.5, -0.2] },
  arms: { fa: [0.9, -2.0], sh: [0.9, -2.0] }, wave: { fa: [2.6, 0.6], sh: [-0.3, -0.4] },
};
const poseMix = (a, b, k) => ({ fa: [lerp(a.fa[0], b.fa[0], k), lerp(a.fa[1], b.fa[1], k)], sh: [lerp(a.sh[0], b.sh[0], k), lerp(a.sh[1], b.sh[1], k)] });
// run fn(o) in the puppet's local frame (same transforms as person())
function inFrame(x, y, s, p, fn) {
  const hipY = p.seated ? -78 : -150, o = hipY + 150;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (p.face || 1), s);
  if (p.rot) { ctx.translate(0, hipY); ctx.rotate(p.rot); ctx.translate(0, -hipY); }
  ctx.translate(0, hipY); ctx.rotate(p.lean || 0); ctx.translate(0, -hipY);
  ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  fn(o); ctx.restore();
}
function handLocal(p, o) { const F = p.fa || [0.25, -0.3], sx = 6, sy = -252 + o; const ex = sx + Math.sin(F[0]) * 52, ey = sy + Math.cos(F[0]) * 52; return [ex + Math.sin(F[0] + F[1]) * 50, ey + Math.cos(F[0] + F[1]) * 50, F[0] + F[1]]; }
function backHandLocal(p, o) { const B = p.sh || [-0.25, -0.35], sx = 0, sy = -252 + o; const ex = sx + Math.sin(B[0]) * 52, ey = sy + Math.cos(B[0]) * 52; return [ex + Math.sin(B[0] + B[1]) * 50, ey + Math.cos(B[0] + B[1]) * 50, B[0] + B[1]]; }
// world position of the front hand (for attaching effects)
function handAt(x, y, s, p) {
  const hipY = p.seated ? -78 : -150, o = hipY + 150; let [hx, hy] = handLocal(p, o);
  for (const r of [p.lean || 0, p.rot || 0]) { const dx = hx, dy = hy - hipY; hx = dx * Math.cos(r) - dy * Math.sin(r); hy = hipY + dx * Math.sin(r) + dy * Math.cos(r); }
  return [x + hx * s * (p.face || 1), y + hy * s];
}
function hat2(kind, o) {
  const hy = -302 + o;
  if (kind === 'topee') { ctx.beginPath(); ctx.ellipse(4, hy - 12, 27, 20, 0, Math.PI, 0); ctx.fill(); ctx.beginPath(); ctx.ellipse(4, hy - 10, 38, 7, 0, 0, 7); ctx.fill(); }
  else if (kind === 'fedora') { ctx.beginPath(); ctx.moveTo(-18, hy - 12); ctx.lineTo(-14, hy - 40); ctx.quadraticCurveTo(4, hy - 30, 24, hy - 40); ctx.lineTo(26, hy - 12); ctx.fill(); ctx.beginPath(); ctx.ellipse(4, hy - 12, 38, 7, -0.06, 0, 7); ctx.fill(); }
  else if (kind === 'topi') { ctx.beginPath(); ctx.moveTo(-19, hy - 10); ctx.lineTo(27, hy - 10); ctx.lineTo(23, hy - 30); ctx.quadraticCurveTo(4, hy - 24, -15, hy - 32); ctx.closePath(); ctx.fill(); }
  else if (kind === 'cap') { ctx.beginPath(); ctx.ellipse(2, hy - 20, 26, 14, 0, 0, 7); ctx.fill(); ctx.fillRect(-20, hy - 22, 44, 12); ctx.beginPath(); ctx.moveTo(18, hy - 12); ctx.lineTo(42, hy - 8); ctx.lineTo(20, hy - 4); ctx.fill(); }
  else if (kind === 'shako') { ctx.fillRect(-16, hy - 60, 40, 46); ctx.fillRect(-20, hy - 18, 48, 6); ctx.save(); ctx.fillStyle = 'rgba(200,40,30,0.9)'; ctx.fillRect(-16, hy - 42, 40, 6); ctx.restore(); }
  else if (kind === 'bun') { ctx.beginPath(); ctx.arc(-14, hy - 16, 13, 0, 7); ctx.fill(); }
  else if (kind === 'shikha') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, hy - 18); ctx.quadraticCurveTo(-24, hy - 30, -30, hy - 8); ctx.stroke(); }
  else if (kind === 'mukut') { ctx.beginPath(); ctx.moveTo(-18, hy - 12); ctx.lineTo(-12, hy - 54); ctx.lineTo(4, hy - 70); ctx.lineTo(20, hy - 54); ctx.lineTo(26, hy - 12); ctx.fill(); ctx.save(); ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(4, hy - 40, 6, 0, 7); ctx.fill(); ctx.restore(); }
}
// actor: a person with breathing, idle sway, arm swing when walking, ground shadow, coloured cloth inlays and extras
// extra keys: t, hat2, cloth (colour), coat, beard, glasses, moustache, prop ('pistol'|'lathi'|'staff'|'book'|'bomb'|'torch'|'kamandal'|'rope'|'lantern'), shadow, woman
function actor(x, y, s, t, p = {}) {
  const ph = p.ph || 0, br = Math.sin(t * 2.3 + ph);
  const q = { ...p };
  if (q.walk != null && !p.fa) { const w = q.walk; q.fa = [0.3 + Math.sin(w) * 0.55, -0.35]; q.sh = [-0.25 - Math.sin(w) * 0.55, -0.35]; }
  q.lean = (q.lean || 0) + (p.still ? 0 : Math.sin(t * 1.1 + ph) * 0.012);
  const yy = y - (p.still ? 0 : (q.walk != null ? Math.abs(Math.sin(q.walk)) * 6 * s : br * 1.6 * s));
  if (p.shadow !== false && !q.seated) { ctx.save(); ctx.fillStyle = 'rgba(8,3,1,0.45)'; ctx.beginPath(); ctx.ellipse(x + 6 * s, y + 4 * s, 70 * s, 12 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
  if (p.woman) woman(x, yy, s, { ...q, t }); else person(x, yy, s, q);
  inFrame(x, yy, s, q, (o) => {
    if (q.coat) { ctx.beginPath(); ctx.moveTo(-28, -262 + o); ctx.lineTo(32, -262 + o); ctx.lineTo(40, -112 + o); ctx.lineTo(-36, -112 + o); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.fillStyle = HOLE; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(10, -240 + o + i * 30, 3.4, 0, 7); ctx.fill(); } ctx.restore(); }
    if (q.cloth) {   // translucent coloured leather inlay on torso + a sash streaming behind
      ctx.save(); ctx.fillStyle = q.cloth; ctx.globalAlpha = 0.88;
      ctx.beginPath(); ctx.moveTo(-14, -180 + o); ctx.lineTo(16, -180 + o); ctx.quadraticCurveTo(24, -220 + o, 18, -246 + o); ctx.quadraticCurveTo(4, -258 + o, -8, -254 + o); ctx.quadraticCurveTo(-22, -232 + o, -14, -180 + o); ctx.fill();
      if (!q.seated) { ctx.beginPath(); ctx.moveTo(-18, -168 + o); ctx.lineTo(20, -168 + o); ctx.lineTo(28, -114 + o); ctx.lineTo(-28, -116 + o); ctx.closePath(); ctx.fill(); }
      const wv = Math.sin(t * 5 + ph) * 8; ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.moveTo(-20, -250 + o); ctx.quadraticCurveTo(-70, -236 + o + wv, -110 - (q.walk != null ? 30 : 0), -214 + o - wv); ctx.lineTo(-100, -196 + o - wv); ctx.quadraticCurveTo(-60, -214 + o + wv, -22, -224 + o); ctx.fill();
      ctx.globalAlpha = 1; ctx.fillStyle = HOLE; [[2, -230], [-4, -206], [8, -196]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b + o, 3, 0, 7); ctx.fill(); });
      ctx.restore();
    }
    if (q.hat2) hat2(q.hat2, o);
    if (q.beard) { ctx.beginPath(); ctx.moveTo(0, -294 + o); ctx.quadraticCurveTo(30, -290 + o, 26, -262 + o); ctx.quadraticCurveTo(10, -240 + o, -4, -268 + o); ctx.fill(); }
    if (q.moustache) { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(18, -291 + o); ctx.quadraticCurveTo(34, -296 + o, 36, -306 + o); ctx.stroke(); }
    if (q.glasses) { ctx.save(); ctx.strokeStyle = 'rgba(255,232,190,0.9)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(16, -305 + o, 7, 0, 7); ctx.stroke(); ctx.restore(); }
    if (q.eye2) { ctx.save(); ctx.fillStyle = `rgba(255,236,190,${q.eye2})`; ctx.beginPath(); ctx.ellipse(14, -305 + o, 4, 2.4, 0, 0, 7); ctx.fill(); ctx.restore(); }
    if (q.prop) {
      const [hx, hy, ang] = handLocal(q, o), dx = Math.sin(ang), dy = Math.cos(ang);
      ctx.save(); ctx.translate(hx, hy);
      if (q.prop === 'pistol') { ctx.rotate(-ang + Math.PI / 2); ctx.fillRect(-4, -6, 40, 12); ctx.fillRect(-4, 0, 12, 24); }
      else if (q.prop === 'lathi') { ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-dx * 40, -dy * 40); ctx.lineTo(dx * 170, dy * 170); ctx.stroke(); }
      else if (q.prop === 'staff') { ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, 150 - o * 0); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -158, 9, 0, 7); ctx.fill(); }
      else if (q.prop === 'book') { ctx.rotate(-0.2); ctx.fillRect(-26, -20, 52, 36); ctx.save(); ctx.fillStyle = HOLE; ctx.fillRect(-2, -18, 4, 32); ctx.restore(); }
      else if (q.prop === 'bomb') { ctx.beginPath(); ctx.arc(0, -4, 15, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(6, -18); ctx.quadraticCurveTo(14, -30, 4, -36); ctx.stroke(); }
      else if (q.prop === 'kamandal') { ctx.beginPath(); ctx.ellipse(0, 20, 18, 16, 0, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 4, 12, Math.PI, 0); ctx.stroke(); }
      else if (q.prop === 'lantern') { ctx.fillRect(-12, 6, 24, 30); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, -4); ctx.stroke(); }
      else if (q.prop === 'torch') { ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(0, -60); ctx.stroke(); }
      ctx.restore();
    }
  });
  // effects in world space on top
  if (q.prop === 'torch' || q.prop === 'lantern') {
    const [wx, wy] = handAt(x, yy, s, q);
    if (q.prop === 'torch') flames(wx, wy - 60 * s, 0.35 * s, t, 9 + ph); else glow(wx, wy + 20 * s, 120 * s, '255,190,90', 0.7);
  }
}
// a fallen soldier lying on the ground
function fallen(x, y, s, face = 1, seed = 1) { person(x, y + 6 * s, s, { face, rot: face * (Math.PI / 2 - 0.08), hat: seed % 2 ? 'helmet' : 'pagdi', fa: [0.2, 0.3], sh: [0.4, 0.2], rods: false }); }

// ---------------- crowds & armies ----------------
// crowd of standing people, back rows smaller/fainter. o: {x0,x1,y,n,s,seed,hats,fists(0..1),flags(0..1),flagFn,sway,face,rows}
function crowd(t, o = {}) {
  const r = rng(o.seed || 11), rows = o.rows || 3, x0 = o.x0 == null ? -60 : o.x0, x1 = o.x1 == null ? W + 60 : o.x1;
  const hats = o.hats || ['pagdi', 'none', 'turban', 'topi'];
  for (let row = rows - 1; row >= 0; row--) {
    const n = Math.round((o.n || 14) * (1 + row * 0.25)), s = (o.s || 0.6) * (1 - row * 0.15), y = (o.y || 1250) - row * 34 * (o.s || 0.6);
    ctx.save(); ctx.globalAlpha = 1 - row * 0.18;
    for (let i = 0; i < n; i++) {
      const x = lerp(x0, x1, (i + 0.5 + (r() - 0.5) * 0.6) / n), ph = r() * 6, fist = r() < (o.fists || 0), fl = r() < (o.flags || 0);
      const h = hats[Math.floor(r() * hats.length)], up = fist ? 0.5 + 0.5 * Math.sin(t * 5 + ph) : 0, face = o.face || (r() < 0.5 ? 1 : -1);
      const pp = { face, hat: h === 'topi' ? 'none' : h, fa: fist ? [lerp(2.4, 3.0, up), lerp(0.6, 0.1, up)] : fl ? [1.0, -1.0] : [0.2 + r() * 0.3, -0.3], sh: [-0.25, -0.35], lean: Math.sin(t * (o.sway || 1.2) + ph) * 0.03 };
      const yy = y + (r() - 0.5) * 10 - up * 6 * s;
      if (h === 'topi') actor(x, yy, s, t, { ...pp, hat2: 'topi', shadow: false, still: true }); else person(x, yy, s, pp);
      if (fl) { const [hx, hy] = handAt(x, yy, s, pp); (o.flagFn || ((X, Y) => bhagwa(X, Y + 60 * s, 260 * s, t + ph)))(hx, hy, s, t + ph); }
    }
    ctx.restore();
  }
}
// marching column(s). o: {y, n, s, speed, dir(1 right/-1 left), x, gap, kind('spear'|'redcoat'|'sword'), seed, banner}
function troop(t, o = {}) {
  const n = o.n || 8, s = o.s || 0.7, gap = o.gap || 130 * s, dir = o.dir || 1, x0 = (o.x || 0) + dir * t * (o.speed || 60);
  for (let i = 0; i < n; i++) {
    const x = x0 - dir * i * gap + ((i * 37) % 3) * 8, y = (o.y || 1250) + (i % 2) * 6, w = t * 6 + i * 0.9;
    if (o.kind === 'redcoat') redcoat(x, y, s, { face: dir, walk: w, spearA: -0.08 });
    else actor(x, y, s, t, { face: dir, walk: w, hat: o.hat || 'helmet', wpn: o.kind === 'sword' ? 'sword' : 'spear', fa: o.kind === 'sword' ? [2.2, 0.3] : [0.5, -1.3], spearA: -0.05, shadow: true, ph: i });
    if (o.banner && i % o.banner === 0) bhagwa(x + 20 * dir, y - 160 * s, 300 * s, t + i, o.bannerCol || SAFFRON);
  }
}

// ---------------- battle effects ----------------
// a volley of arrows flying from (x0,y0) to (x1,y1) starting at t0
function volley(t, t0, x0, y0, x1, y1, n = 12, seed = 1, dur = 1.1, arc = 260) {
  const r = rng(seed); ctx.save(); ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const st = t0 + r() * 0.5, k = (t - st) / dur, ox = (r() - 0.5) * 260, oy = (r() - 0.5) * 120, ex = (r() - 0.5) * 300;
    if (k < 0 || k > 1.05) continue;
    const kk = clamp(k), px = lerp(x0 + ox, x1 + ex, kk), py = lerp(y0 + oy, y1 + oy * 0.5, kk) - Math.sin(kk * Math.PI) * arc;
    const vx = (x1 + ex - x0 - ox), vy = (y1 - y0) - Math.cos(kk * Math.PI) * Math.PI * arc, a = Math.atan2(vy, vx);
    ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(-46, 0); ctx.lineTo(10, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(4, -6); ctx.lineTo(4, 6); ctx.fill(); ctx.beginPath(); ctx.moveTo(-46, 0); ctx.lineTo(-56, -7); ctx.moveTo(-46, 0); ctx.lineTo(-56, 7); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}
function sparks(x, y, t, t0, n = 16, seed = 1) {
  const k = (t - t0) / 0.45; if (k < 0 || k > 1) return;
  glow(x, y, 140, '255,230,170', 0.9 * (1 - k));
  const r = rng(seed); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = `rgba(255,236,190,${1 - k})`; ctx.lineWidth = 3;
  for (let i = 0; i < n; i++) { const a = r() * Math.PI * 2, d = (40 + r() * 120) * easeOut(k); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * d * 0.6, y + Math.sin(a) * d * 0.6); ctx.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d + k * 30); ctx.stroke(); }
  ctx.restore();
}
// explosion / cannon impact at t0; returns a shake amount you can feed to cam()
function boom(x, y, t, t0, s = 1, seed = 1) {
  const k = (t - t0); if (k < 0) return 0;
  if (k < 0.5) { glow(x, y, 420 * s, '255,210,120', 1 - k * 2); }
  const fb = clamp(k / 0.35);
  if (k < 1.2) { ctx.save(); ctx.globalAlpha = 1 - clamp((k - 0.4) / 0.8); flames(x, y + 40 * s, s * (0.6 + fb), t, seed); ctx.restore(); }
  const r = rng(seed); ctx.save(); ctx.fillStyle = INK;
  for (let i = 0; i < 18; i++) { const a = -Math.PI * (0.1 + r() * 0.8), v = (300 + r() * 500) * s, g = 900 * s;
    const px = x + Math.cos(a) * v * k, py = y + Math.sin(a) * v * k + 0.5 * g * k * k; if (py > y + 200 * s) continue;
    ctx.save(); ctx.translate(px, py); ctx.rotate(k * 8 + i); ctx.fillRect(-6 * s, -4 * s, (8 + r() * 14) * s, (6 + r() * 8) * s); ctx.restore(); }
  ctx.restore();
  smoke(x, y - 40 * s, t - t0, seed + 3, 10, 1.2 * s, 0.25 * clamp(k * 2));
  return hit(t, t0, 0.7, 26 * s);
}
function muzzle(x, y, t, t0, dir = 1, s = 1) {
  const k = (t - t0); if (k < 0 || k > 1.2) return;
  if (k < 0.12) { glow(x, y, 150 * s, '255,225,150', 1); ctx.save(); ctx.fillStyle = '#ffe3a0'; ctx.beginPath(); ctx.moveTo(x, y - 10 * s); ctx.lineTo(x + dir * 80 * s, y); ctx.lineTo(x, y + 10 * s); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.fillStyle = 'rgba(235,220,200,1)'; for (let i = 0; i < 5; i++) { ctx.globalAlpha = 0.28 * (1 - k / 1.2); ctx.beginPath(); ctx.arc(x + dir * (30 + i * 22 + k * 60) * s, y - k * 40 * s - i * 6, (16 + k * 40 + i * 5) * s, 0, 7); ctx.fill(); } ctx.restore();
}
// Mysore-style rocket along an arc with fire + smoke trail
function rocket(t, t0, x0, y0, x1, y1, dur = 1.4, arc = 380, seed = 1) {
  const k = (t - t0) / dur; if (k < 0) return;
  const P = u => [lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * arc];
  ctx.save(); for (let i = 0; i < 26; i++) { const u = clamp(k) - i * 0.012; if (u < 0) break; const [px, py] = P(u); ctx.globalAlpha = 0.18 * (1 - i / 26); ctx.fillStyle = '#2a1408'; ctx.beginPath(); ctx.arc(px, py, 10 + i * 2.2, 0, 7); ctx.fill(); } ctx.restore();
  if (k > 1) return;
  const [px, py] = P(k), [qx, qy] = P(Math.max(0, k - 0.02)), a = Math.atan2(py - qy, px - qx);
  glow(px, py, 90, '255,190,90', 0.9);
  ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.moveTo(-24, -7); ctx.lineTo(-70 - noise1(t * 30 + seed) * 20, 0); ctx.lineTo(-24, 7); ctx.fill();
  ctx.fillStyle = INK; ctx.fillRect(-26, -7, 44, 14); ctx.beginPath(); ctx.moveTo(18, -9); ctx.lineTo(34, 0); ctx.lineTo(18, 9); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-140, 4); ctx.stroke(); ctx.restore();
}

// ---------------- scenery: ancient & medieval ----------------
function temple(x, y, s, o = {}) {   // north-Indian shikhara temple
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = o.col || INK;
  ctx.fillRect(-230, -40, 460, 40); ctx.fillRect(-200, -70, 400, 30);
  ctx.fillRect(-190, -180, 160, 110); ctx.beginPath(); ctx.moveTo(-200, -180); ctx.quadraticCurveTo(-110, -270, -20, -180); ctx.fill();   // mandapa
  ctx.beginPath(); ctx.moveTo(-20, -70); ctx.lineTo(-20, -200); ctx.bezierCurveTo(-10, -420, 60, -520, 90, -540); ctx.bezierCurveTo(120, -520, 190, -420, 200, -200); ctx.lineTo(200, -70); ctx.fill();
  ctx.beginPath(); ctx.ellipse(90, -548, 40, 14, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(78, -560); ctx.quadraticCurveTo(90, -610, 102, -560); ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = o.col || INK; ctx.beginPath(); ctx.moveTo(90, -600); ctx.lineTo(90, -680); ctx.stroke();
  ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { ctx.fillRect(10, -110 - i * 58, 160, 5); }
  ctx.beginPath(); ctx.moveTo(60, -70); ctx.lineTo(60, -150); ctx.quadraticCurveTo(90, -190, 120, -150); ctx.lineTo(120, -70); ctx.fill();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-160 + i * 50, -130, 9, 0, 7); ctx.fill(); }
  ctx.restore();
  if (o.flag) flag(x + 90 * s, y - 680 * s, 70 * s, 40 * s, o.t || 0, o.flagCol || SAFFRON);
}
function gopuram(x, y, s, o = {}) {   // south-Indian tiered gateway tower
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-220, -180, 440, 180);
  const tiers = o.tiers || 7;
  for (let i = 0; i < tiers; i++) { const w = 200 - i * 22, yy = -180 - i * 70; ctx.fillRect(-w, yy - 70, w * 2, 72); ctx.save(); ctx.fillStyle = HOLE; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(k * w * 0.36, yy - 36, 7, 0, 7); ctx.fill(); } ctx.restore(); }
  const top = -180 - tiers * 70; ctx.beginPath(); ctx.moveTo(-60, top); ctx.quadraticCurveTo(-70, top - 70, 0, top - 80); ctx.quadraticCurveTo(70, top - 70, 60, top); ctx.fill();
  for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(k * 40 - 8, top - 70); ctx.quadraticCurveTo(k * 40, top - 110, k * 40 + 8, top - 70); ctx.fill(); }
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, -110); ctx.lineTo(0, -150); ctx.lineTo(60, -110); ctx.lineTo(60, 0); ctx.fill();
  ctx.restore();
}
function stupa(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-260, -40, 520, 40); ctx.beginPath(); ctx.ellipse(0, -40, 220, 200, 0, Math.PI, 0); ctx.fill();
  ctx.fillRect(-40, -270, 80, 40); ctx.fillRect(-6, -340, 12, 80); for (let i = 0; i < 3; i++) ctx.fillRect(-36 + i * 8, -300 - i * 18, 72 - i * 16, 8);
  ctx.fillStyle = HOLE; for (let i = 0; i < 13; i++) { ctx.fillRect(-250 + i * 40, -30, 8, 24); }
  ctx.restore();
}
// brick monastery block with rows of cells (Nalanda); lit = window glow 0..1
function vihara(x, y, s, lit = 0, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-300, -360, 600, 360); for (let i = 0; i < 15; i++) ctx.fillRect(-300 + i * 42, -386, 26, 28);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) {
    const wx = -260 + c * 72, wy = -320 + r * 100; const g = lit * (0.6 + 0.4 * noise1(t * 3 + r * 5 + c));
    ctx.fillStyle = lit > 0 ? `rgba(255,${170 + 60 * g | 0},90,${0.45 + 0.5 * g})` : HOLE;
    ctx.beginPath(); ctx.moveTo(wx, wy + 60); ctx.lineTo(wx, wy + 20); ctx.quadraticCurveTo(wx + 18, wy, wx + 36, wy + 20); ctx.lineTo(wx + 36, wy + 60); ctx.fill();
  }
  ctx.fillStyle = INK; ctx.globalAlpha = 0.25; for (let k = 0; k < 24; k++) ctx.fillRect(-300, -340 + k * 15, 600, 2);
  ctx.restore();
}
// steep cliff with a fort wall on top (hill forts like Sinhagad)
function cliffFort(x, y, s, t = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-420, 0); ctx.lineTo(-380, -300); ctx.lineTo(-300, -520); ctx.lineTo(-200, -760); ctx.lineTo(-60, -820); ctx.lineTo(260, -830); ctx.lineTo(320, -600); ctx.lineTo(420, -200); ctx.lineTo(460, 0); ctx.fill();
  ctx.fillRect(-120, -900, 400, 90); for (let i = 0; i < 9; i++) ctx.fillRect(-120 + i * 46, -926, 26, 30);
  ctx.fillRect(-150, -960, 80, 150); ctx.fillRect(240, -960, 80, 150);
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(80, -860, 10, 0, 7); ctx.arc(180, -860, 10, 0, 7); ctx.arc(-20, -860, 10, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,200,140,0.12)'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-300 + i * 70, -100 - i * 20); ctx.lineTo(-240 + i * 66, -700 + i * 12); ctx.stroke(); }
  ctx.restore();
  if (o.torches) for (const tx of [-60, 120]) torch(x + tx * s, y - 900 * s, 60 * s, t, tx);
}
function palace(x, y, s) {   // domes + chhatris
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-320, -260, 640, 260);
  ctx.beginPath(); ctx.moveTo(-120, -260); ctx.bezierCurveTo(-140, -420, 140, -420, 120, -260); ctx.fill(); ctx.fillRect(-5, -440, 10, 60);
  for (const cx of [-250, 250]) { ctx.fillRect(cx - 40, -330, 80, 70); ctx.beginPath(); ctx.moveTo(cx - 50, -330); ctx.quadraticCurveTo(cx, -410, cx + 50, -330); ctx.fill(); }
  ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { const ax = -270 + i * 90; ctx.beginPath(); ctx.moveTo(ax, -20); ctx.lineTo(ax, -130); ctx.quadraticCurveTo(ax + 25, -170, ax + 50, -130); ctx.lineTo(ax + 50, -20); ctx.fill(); }
  ctx.restore();
}
// Chola war-ship: long hull, big square sail with a tiger hole, oars
function cholaShip(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.5 + (o.ph || 0)) * 6); ctx.rotate(Math.sin(t * 1.2 + (o.ph || 0)) * 0.015); ctx.scale(s * (o.face || 1), s);
  ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
  ctx.lineWidth = 6; for (let i = 0; i < 9; i++) { const k = Math.sin(t * 3 + i * 0.5 + (o.ph || 0)); ctx.beginPath(); ctx.moveTo(-200 + i * 50, 0); ctx.lineTo(-230 + i * 50 - k * 24, 90); ctx.stroke(); }
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, -470); ctx.stroke();
  const b = 24 + Math.sin(t * 1.3) * 6; ctx.beginPath(); ctx.moveTo(-150, -440); ctx.lineTo(150, -440); ctx.quadraticCurveTo(150 + b, -280, 150, -130); ctx.lineTo(-150, -130); ctx.quadraticCurveTo(-150 + b, -280, -150, -440); ctx.fill();
  ctx.save(); ctx.fillStyle = o.sailCol ? o.sailCol : HOLE; if (o.sailCol) { ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.moveTo(-132, -424); ctx.lineTo(132, -424); ctx.quadraticCurveTo(132 + b, -280, 132, -146); ctx.lineTo(-132, -146); ctx.quadraticCurveTo(-132 + b, -280, -132, -424); ctx.fill(); ctx.fillStyle = INK; ctx.globalAlpha = 1; }
  // leaping tiger (Chola emblem) as a cut-out
  ctx.beginPath(); ctx.ellipse(10, -285, 62, 26, -0.15, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(70, -305, 22, 0, 7); ctx.fill();
  ctx.lineWidth = 9; ctx.strokeStyle = ctx.fillStyle; ctx.beginPath(); ctx.moveTo(-48, -276); ctx.quadraticCurveTo(-90, -320, -70, -350); ctx.moveTo(40, -268); ctx.lineTo(70, -236); ctx.moveTo(-20, -268); ctx.lineTo(-40, -232); ctx.stroke(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-330, -110); ctx.quadraticCurveTo(-300, -30, -240, -30); ctx.lineTo(240, -30); ctx.quadraticCurveTo(300, -40, 330, -130); ctx.quadraticCurveTo(350, -150, 360, -130);
  ctx.quadraticCurveTo(320, 20, 200, 30); ctx.lineTo(-200, 30); ctx.quadraticCurveTo(-320, 20, -330, -110); ctx.fill();
  ctx.fillStyle = HOLE; for (let i = 0; i < 11; i++) { ctx.beginPath(); ctx.arc(-220 + i * 44, 2, 5, 0, 7); ctx.fill(); }
  if (o.crew) for (let i = 0; i < 6; i++) { ctx.fillStyle = INK; const sx = -200 + i * 80; ctx.fillRect(sx - 8, -76, 16, 46); ctx.beginPath(); ctx.arc(sx, -86, 11, 0, 7); ctx.fill(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx + 9, -30); ctx.lineTo(sx + 14, -160); ctx.stroke(); }
  ctx.restore();
  if (o.flag) flag(x, y - 520 * s, 90 * s, 50 * s, t, o.flagCol || '#c8261a');
}
// European carrack (Portuguese / British): tall castles, three masts, square sails
function carrack(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.3 + (o.ph || 0)) * 6); ctx.rotate(Math.sin(t + (o.ph || 0)) * 0.014 + (o.tilt || 0)); ctx.scale(s * (o.face || 1), s);
  ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineWidth = 9;
  for (const [mx, h] of [[-150, 380], [0, 520], [150, 420]]) { ctx.beginPath(); ctx.moveTo(mx, -60); ctx.lineTo(mx, -60 - h); ctx.stroke();
    for (let k = 0; k < 2; k++) { const top = -60 - h + 40 + k * h * 0.45, w = 70 + k * 30, sh = h * 0.36, b = 18 + Math.sin(t * 1.2 + mx) * 5;
      ctx.beginPath(); ctx.moveTo(mx - w, top); ctx.lineTo(mx + w, top); ctx.quadraticCurveTo(mx + w + b, top + sh / 2, mx + w, top + sh); ctx.lineTo(mx - w, top + sh); ctx.quadraticCurveTo(mx - w + b, top + sh / 2, mx - w, top); ctx.fill(); } }
  ctx.beginPath(); ctx.moveTo(-330, -170); ctx.lineTo(-200, -170); ctx.lineTo(-190, -80); ctx.lineTo(200, -80); ctx.lineTo(230, -140); ctx.lineTo(320, -140); ctx.lineTo(300, -40);
  ctx.quadraticCurveTo(200, 40, 0, 40); ctx.quadraticCurveTo(-260, 40, -310, -40); ctx.closePath(); ctx.fill();
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(300, -120); ctx.lineTo(420, -200); ctx.stroke();
  ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { ctx.fillRect(-170 + i * 52, -40, 18, 14); }
  ctx.restore();
  if (o.flag) flag(x, y - 620 * s, 70 * s, 40 * s, t, o.flagCol || INK);
}

// ---------------- scenery & props: British era ----------------
// steam train: locomotive + n carriages; o: {n, face, lit, smoke}
function train(x, y, s, t, o = {}) {
  const n = o.n == null ? 3 : o.n, f = o.face || 1, spin = t * (o.speed == null ? 6 : o.speed);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = INK; ctx.strokeStyle = INK;
  for (let c = 0; c < n; c++) {   // carriages behind (to the left)
    const cx = -520 - c * 430;
    ctx.fillRect(cx - 190, -230, 400, 170); ctx.beginPath(); ctx.moveTo(cx - 200, -230); ctx.quadraticCurveTo(cx, -280, cx + 220, -230); ctx.fill();
    ctx.fillRect(cx + 210, -110, 30, 14);
    for (let w = 0; w < 6; w++) { const lit = o.lit ? 0.5 + 0.4 * noise1(t * 2 + c * 3 + w) : 0; ctx.save(); ctx.fillStyle = o.lit ? `rgba(255,200,110,${lit})` : HOLE; ctx.fillRect(cx - 170 + w * 64, -205, 40, 52); ctx.restore(); }
    for (const wx of [cx - 120, cx + 140]) { ctx.beginPath(); ctx.arc(wx, -50, 34, 0, 7); ctx.fill(); ctx.save(); ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(wx + Math.cos(spin) * 20, -50 + Math.sin(spin) * 20, 5, 0, 7); ctx.fill(); ctx.restore(); }
  }
  // locomotive
  ctx.fillRect(-260, -300, 150, 240); ctx.fillRect(-280, -320, 190, 26);   // cab
  ctx.save(); ctx.fillStyle = HOLE; ctx.fillRect(-230, -270, 70, 70); ctx.restore();
  ctx.beginPath(); ctx.roundRect(-110, -230, 330, 130, 50); ctx.fill();   // boiler
  ctx.fillRect(140, -330, 50, 110); ctx.beginPath(); ctx.moveTo(126, -350); ctx.lineTo(204, -350); ctx.lineTo(190, -320); ctx.lineTo(140, -320); ctx.fill();   // chimney
  ctx.beginPath(); ctx.arc(40, -236, 26, Math.PI, 0); ctx.fill();
  ctx.beginPath(); ctx.moveTo(220, -100); ctx.lineTo(290, -40); ctx.lineTo(220, -40); ctx.fill();   // cow-catcher
  ctx.fillRect(-120, -100, 340, 40);
  for (const [wx, r] of [[-180, 52], [-40, 52], [90, 52], [190, 30]]) { ctx.beginPath(); ctx.arc(wx, -40, r, 0, 7); ctx.fill();
    ctx.save(); ctx.strokeStyle = HOLE; ctx.lineWidth = 4; for (let k = 0; k < 4; k++) { const a = spin + k * Math.PI / 4; ctx.beginPath(); ctx.moveTo(wx - Math.cos(a) * r * 0.75, -40 - Math.sin(a) * r * 0.75); ctx.lineTo(wx + Math.cos(a) * r * 0.75, -40 + Math.sin(a) * r * 0.75); ctx.stroke(); } ctx.restore(); }
  ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-180 + Math.cos(spin) * 30, -40 + Math.sin(spin) * 30); ctx.lineTo(90 + Math.cos(spin) * 30, -40 + Math.sin(spin) * 30); ctx.stroke();
  if (o.headlamp) { ctx.restore(); glow(x + 230 * s * f, y - 200 * s, 200 * s, '255,230,160', 0.8); ctx.save(); }
  ctx.restore();
  if (o.smoke !== false) smoke(x + 165 * s * f, y - 360 * s, t, 31, 12, 1.1 * s, 0.22);
}
function rails(y, t = 0, speed = 0) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(-50, y, W + 100, 14); for (let i = -2; i < 20; i++) { const x = ((i * 70 - t * speed) % 1400 + 1400) % 1400 - 140; ctx.fillRect(x, y + 14, 36, 12); } ctx.restore(); }
// colonial hall with columns and a pediment/dome
function colonnade(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.fillRect(-420, -60, 840, 60); ctx.fillRect(-400, -420, 800, 50);
  if (o.dome) { ctx.beginPath(); ctx.ellipse(0, -470, 180, 140, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-200, -480, 400, 40); ctx.fillRect(-6, -650, 12, 60); }
  else { ctx.beginPath(); ctx.moveTo(-420, -420); ctx.lineTo(0, -560); ctx.lineTo(420, -420); ctx.fill(); ctx.save(); ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(0, -470, 26, 0, 7); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 9; i++) { const cx = -360 + i * 90; ctx.fillRect(cx - 18, -370, 36, 310); ctx.fillRect(cx - 26, -380, 52, 16); ctx.fillRect(cx - 26, -76, 52, 16); }
  ctx.save(); ctx.fillStyle = 'rgba(255,214,150,0.18)'; for (let i = 0; i < 8; i++) ctx.fillRect(-342 + i * 90, -360, 54, 290); ctx.restore();
  ctx.restore();
}
function lampPost(x, y, s, t, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(-7, -420, 14, 420); ctx.fillRect(-26, -20, 52, 20); ctx.beginPath(); ctx.moveTo(-30, -420); ctx.lineTo(30, -420); ctx.lineTo(20, -480); ctx.lineTo(-20, -480); ctx.fill(); ctx.fillRect(-24, -490, 48, 12); ctx.restore();
  if (lit > 0) glow(x, y - 450 * s, 260 * s, '255,210,130', 0.55 * lit * (0.92 + 0.08 * noise1(t * 5)));
}
// jail bars in front of everything (screen space). a = alpha
function bars(a = 1, x0 = 0, x1 = W, gap = 120) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#0d0603';
  for (let x = x0 + gap / 2; x < x1; x += gap) ctx.fillRect(x - 11, -50, 22, 1400);
  ctx.fillRect(x0, 200, x1 - x0, 26); ctx.fillRect(x0, 1080, x1 - x0, 26);
  ctx.fillStyle = 'rgba(255,214,150,0.18)'; for (let x = x0 + gap / 2; x < x1; x += gap) ctx.fillRect(x - 9, -50, 4, 1400);
  ctx.restore();
}
// newspaper page sliding/spinning in: headline + fake column lines
function newspaper(x, y, w, h, a, head, sub = '', o = {}) {
  if (a <= 0) return;
  overlay(() => {
    ctx.save(); ctx.globalAlpha = Math.min(1, a * 1.5); ctx.translate(x, y); ctx.rotate((o.rot == null ? -0.05 : o.rot) + (1 - easeOut(a)) * 3); ctx.scale(lerp(0.3, 1, easeOut(a)), lerp(0.3, 1, easeOut(a)));
    ctx.fillStyle = '#eadfc6'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeStyle = 'rgba(40,24,10,0.8)'; ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28);
    ctx.fillStyle = '#1e1208'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `700 ${o.mast || 40}px ${SERIF}`; ctx.fillText(o.masthead || 'समाचार', 0, -h / 2 + 60); ctx.fillRect(-w / 2 + 30, -h / 2 + 92, w - 60, 4);
    ctx.font = `700 ${o.size || 62}px ${SANS}`; const L = wrap(head, w - 80); L.forEach((ln, i) => ctx.fillText(ln, 0, -h / 2 + 150 + i * (o.size || 62) * 1.2));
    const y0 = -h / 2 + 150 + L.length * (o.size || 62) * 1.2;
    if (sub) { ctx.font = `700 34px ${SANS}`; ctx.fillText(sub, 0, y0 + 10); }
    ctx.globalAlpha *= 0.35; const r = rng(head.length); for (let c = 0; c < 3; c++) for (let k = 0; k < 9; k++) { const cw = (w - 100) / 3 - 20; ctx.fillRect(-w / 2 + 40 + c * (cw + 20), y0 + 50 + k * 26, cw * (0.6 + r() * 0.4), 10); }
    ctx.restore();
  });
}
function clockFace(x, y, r, hh, mm, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#efe2c4'; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; for (let i = 0; i < 12; i++) { const q = i / 12 * Math.PI * 2; ctx.beginPath(); ctx.arc(x + Math.sin(q) * r * 0.82, y - Math.cos(q) * r * 0.82, i % 3 ? 5 : 9, 0, 7); ctx.fill(); }
  const hand = (ang, len, w) => { ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ang) * len, y - Math.cos(ang) * len); ctx.stroke(); };
  hand(((hh % 12) + mm / 60) / 12 * Math.PI * 2, r * 0.5, 12); hand(mm / 60 * Math.PI * 2, r * 0.75, 8);
  ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill(); ctx.restore();
}
// coloured, waving tricolour; chakra = true for the 1947 flag, 'charkha' for the 1931-47 Congress flag
function tiranga(x, y, w, h, t, o = {}) {
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, y + (o.pole || 600)); ctx.lineTo(x, y - 20); ctx.stroke();
  const band = (k, col) => { ctx.fillStyle = col; ctx.beginPath();
    for (let i = 0; i <= 14; i++) { const u = i / 14; ctx.lineTo(x + u * w, y + k * h / 3 + Math.sin(u * 5 - t * 5) * 14 * u); }
    for (let i = 14; i >= 0; i--) { const u = i / 14; ctx.lineTo(x + u * w, y + (k + 1) * h / 3 + Math.sin(u * 5 - t * 5) * 14 * u); } ctx.fill(); };
  band(0, '#ff9a2e'); band(1, '#f7f0e0'); band(2, '#2e8b3e');
  const cx = x + w / 2, cy = y + h / 2 + Math.sin(2.5 - t * 5) * 7;
  if (o.chakra) { ctx.strokeStyle = '#1f3c8c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, h / 7, 0, 7); ctx.stroke(); for (let i = 0; i < 24; i++) { const q = i / 24 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(q) * h / 7, cy + Math.sin(q) * h / 7); ctx.stroke(); } }
  ctx.restore();
  glow(x + w / 2, y + h / 2, w, '255,220,160', 0.18);
}

// ---------------- grading & framing ----------------
// call at the very end of a scene. kind: 'archival' | 'cold' | 'blood' | 'night' | 'gold'
function grade(kind, t, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (kind === 'archival') {
    ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = 0.8 * a; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.45 * a; ctx.fillStyle = '#e0b880'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.3 * a; const fr = Math.floor(t * 12);
    ctx.drawImage(tex, -((fr * 37) % 80), -((fr * 53) % 80), W + 80, H + 80);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = a * (0.04 + 0.04 * noise1(t * 9)); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const r = rng(fr + 1); ctx.globalAlpha = 0.22 * a; ctx.strokeStyle = '#f5e6c8'; ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) { if (r() < 0.6) { const sx = r() * W; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx + (r() - 0.5) * 30, H); ctx.stroke(); } }
    ctx.fillStyle = '#1a1008'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(r() * W, r() * 1300, r() * 4 + 1, 0, 7); ctx.fill(); }
  } else if (kind === 'cold') {
    ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = 0.4 * a; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.5 * a; ctx.fillStyle = '#8ea3c8'; ctx.fillRect(0, 0, W, H);
  } else if (kind === 'blood') { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.45 * a; ctx.fillStyle = '#d0402a'; ctx.fillRect(0, 0, W, H); }
  else if (kind === 'night') { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.55 * a; ctx.fillStyle = '#5a6488'; ctx.fillRect(0, 0, W, H); }
  else if (kind === 'gold') { ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = 0.5 * a; ctx.fillStyle = '#ffcf6a'; ctx.fillRect(0, 0, W, H); }
  ctx.restore();
}
// dark foreground silhouettes at the frame edges for depth (screen space, gentle sway)
function fgFrame(t, kind = 'grass', a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.fillStyle = '#080301'; ctx.strokeStyle = '#080301'; ctx.lineCap = 'round';
  if (kind === 'grass') { const r = rng(4); for (let i = 0; i < 70; i++) { const x = r() * W, h = 60 + r() * 150 * (x < 220 || x > 860 ? 1.6 : 0.6), sw = Math.sin(t * 1.4 + x * 0.02) * 14; ctx.lineWidth = 3 + r() * 5; ctx.beginPath(); ctx.moveTo(x, 1330); ctx.quadraticCurveTo(x + sw * 0.5, 1330 - h * 0.5, x + sw + (r() - 0.5) * 30, 1330 - h); ctx.stroke(); } ctx.fillRect(0, 1320, W, 20); }
  else if (kind === 'branches') { for (const [x0, dir] of [[-20, 1], [W + 20, -1]]) { const sw = Math.sin(t * 0.9 + x0) * 10; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x0, 80); ctx.quadraticCurveTo(x0 + dir * 200, 120 + sw, x0 + dir * 330, 60 + sw); ctx.stroke();
      for (let i = 0; i < 9; i++) { const u = i / 9, bx = x0 + dir * 330 * u, by = 80 + 40 * Math.sin(u * 3) + sw * u; ctx.beginPath(); ctx.ellipse(bx, by + 30, 36, 14, dir * (0.6 + u), 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(bx + dir * 10, by - 18, 30, 12, -dir * 0.5, 0, 7); ctx.fill(); } } }
  else if (kind === 'rocks') { ctx.beginPath(); ctx.moveTo(-20, 1340); ctx.lineTo(-20, 1100); ctx.lineTo(90, 1150); ctx.lineTo(170, 1240); ctx.lineTo(260, 1340); ctx.fill(); ctx.beginPath(); ctx.moveTo(W + 20, 1340); ctx.lineTo(W + 20, 1060); ctx.lineTo(W - 120, 1140); ctx.lineTo(W - 230, 1340); ctx.fill(); }
  else if (kind === 'arch') { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 1340); ctx.lineTo(W - 70, 1340); ctx.lineTo(W - 70, 500); ctx.quadraticCurveTo(540, -60, 70, 500); ctx.lineTo(70, 1340); ctx.lineTo(0, 1340); ctx.fill(); }
  ctx.restore();
}
// "kahte hain" legend badge
function legendTag(t, a) { if (a > 0) chip('लोककथा', 540, 160, 42, a, { color: '#ffd9a0' }); }
// closing card: a question for the comments + follow
function endCard(t, q, o = {}) {
  bg(PAL.night, noise1(t * 4), 540, 900); embers(t, 30, 77, 0.6);
  lamp(540, 1240, 1.6, t); border(prog(t, 0, 0.6));
  overlay(() => {
    textBlock(q, 540, 470, 80, { font: SERIF, color: GOLD, maxW: 880, alpha: prog(t, 0.1, 0.7), glow: 'rgba(255,160,60,0.7)', sw: 13 });
    chip('कमेंट में बताइए 👇', 540, 760, 50, prog(t, 0.8, 1.3));
    if (o.follow !== false) chip('फ़ॉलो करें  ·  हर रात 9:30 बजे नई कहानी', 540, 860, 40, prog(t, 1.3, 1.8), { color: '#ffd9a0' });
  });
}
// 1930s motor car (side view); o: {face, lights, spin}
function car(x, y, s, t, o = {}) {
  const f = o.face || 1, spin = t * (o.speed == null ? 8 : o.speed);
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-230, -70); ctx.lineTo(-220, -150); ctx.quadraticCurveTo(-200, -230, -90, -235); ctx.lineTo(40, -235); ctx.quadraticCurveTo(90, -232, 110, -160);
  ctx.lineTo(220, -150); ctx.quadraticCurveTo(250, -140, 250, -90); ctx.lineTo(250, -60); ctx.lineTo(-230, -60); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-250, -70); ctx.quadraticCurveTo(-210, -150, -130, -80); ctx.fill(); ctx.beginPath(); ctx.moveTo(90, -70); ctx.quadraticCurveTo(150, -160, 230, -80); ctx.fill();   // mudguards
  ctx.fillRect(-120, -60, 200, 14);   // running board
  ctx.save(); ctx.fillStyle = o.lit ? 'rgba(255,205,120,0.55)' : HOLE; ctx.beginPath(); ctx.moveTo(-185, -150); ctx.quadraticCurveTo(-170, -212, -110, -214); ctx.lineTo(-40, -214); ctx.lineTo(-40, -150); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-20, -150); ctx.lineTo(-20, -214); ctx.lineTo(30, -214); ctx.quadraticCurveTo(70, -210, 86, -150); ctx.fill(); ctx.restore();
  for (const wx of [-170, 160]) { ctx.beginPath(); ctx.arc(wx, -42, 46, 0, 7); ctx.fill(); ctx.save(); ctx.strokeStyle = HOLE; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { const a = spin + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(wx - Math.cos(a) * 30, -42 - Math.sin(a) * 30); ctx.lineTo(wx + Math.cos(a) * 30, -42 + Math.sin(a) * 30); ctx.stroke(); } ctx.restore(); }
  ctx.fillRect(236, -130, 20, 26);
  ctx.restore();
  if (o.lights) { glow(x + 250 * s * f, y - 118 * s, 160 * s, '255,235,170', 0.8 * o.lights); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,230,160,${0.12 * o.lights})`; ctx.beginPath(); ctx.moveTo(x + 250 * s * f, y - 125 * s); ctx.lineTo(x + 900 * s * f, y - 260 * s); ctx.lineTo(x + 900 * s * f, y + 40 * s); ctx.fill(); ctx.restore(); }
}
// submarine running on the surface
function submarine(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4) * 5); ctx.scale(s * (o.face || 1), s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-420, -10); ctx.quadraticCurveTo(-380, -70, -200, -70); ctx.lineTo(300, -70); ctx.quadraticCurveTo(440, -60, 460, -10); ctx.quadraticCurveTo(300, 30, -300, 30); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, -70); ctx.lineTo(-30, -190); ctx.lineTo(90, -190); ctx.lineTo(120, -70); ctx.fill(); ctx.fillRect(10, -270, 8, 80); ctx.fillRect(40, -250, 6, 60);
  ctx.fillRect(160, -100, 70, 30); ctx.fillRect(220, -92, 90, 10);
  ctx.fillStyle = HOLE; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-250 + i * 90, -30, 6, 0, 7); ctx.fill(); } ctx.fillRect(-10, -160, 80, 14);
  ctx.restore();
  if (o.wake !== false) { ctx.save(); ctx.strokeStyle = 'rgba(255,225,180,0.5)'; ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + (440 + i * 30) * s * (o.face || 1), y + (i * 8) * s); ctx.quadraticCurveTo(x + (520 + i * 60) * s * (o.face || 1), y + (20 + i * 10) * s + Math.sin(t * 4 + i) * 4, x + (620 + i * 80) * s * (o.face || 1), y + (10 + i * 14) * s); ctx.stroke(); } ctx.restore(); }
}
PAL.court = ['#ffe0a0', '#d98a3c', '#3a1406'];
PAL.dusk = PAL.dusk || ['#f6b26b', '#a8452a', '#2a0a08'];
