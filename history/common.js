// Every timed moment is tied to a narration line (cue i = [start, end]) so picture follows the voice.
let D = 10;
const cue = i => CUES[i] || [D, D];
const at = (i, f) => lerp(cue(i)[0], cue(i)[1], f);
const on = (t, i, f = 0, d = 0.5) => prog(t, at(i, f), at(i, f) + d);          // fade in at a point of line i
const S = {};
const SAFFRON = '#ff8a1e';

function ground(y = 1250, col = INK) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(-50, y, W + 100, 700); ctx.restore(); }
function bigYear(txt, y, a, size = 120) { textBlock(txt, 540, y, size, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,160,60,0.8)', sw: 18 }); }
function titleCard(t, main, sub, y = 250) {
  const a = easeOut(prog(t, 0.0, 0.7));
  ctx.save(); const sc = lerp(1.18, 1, a); ctx.translate(540, y + 50); ctx.scale(sc, sc); ctx.translate(-540, -y - 50);
  textBlock(main, 540, y, 96, { font: SERIF, color: GOLD, alpha: a, glow: 'rgba(255,150,50,0.9)', sw: 16, maxW: 980 });
  ctx.restore();
  textBlock(sub, 540, y + 130, 56, { alpha: prog(t, 0.4, 1.0) });
}
function cannon(x, y, s, face = 1, fire = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * face, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.arc(-20, -30, 30, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(40, -30, 30, 0, 7); ctx.fill();
  ctx.save(); ctx.translate(0, -60); ctx.rotate(-0.25); ctx.fillRect(-40, -18, 180, 36); ctx.fillRect(130, -24, 20, 48); ctx.restore();
  ctx.fillStyle = HOLE; ctx.beginPath(); ctx.arc(-20, -30, 8, 0, 7); ctx.arc(40, -30, 8, 0, 7); ctx.fill();
  ctx.restore();
  if (fire > 0) { const mx = x + face * 150 * s, my = y - 100 * s; glow(mx, my, 160 * s, '255,200,90', 0.9 * fire); }
}
function bhagwa(x, y, h, t, col = SAFFRON) {   // saffron swallow-tail flag on a pole
  ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y - h);
  for (let i = 0; i <= 10; i++) { const u = i / 10; ctx.lineTo(x + u * 150, y - h + u * 20 + Math.sin(u * 5 - t * 5) * 8 * u); }
  ctx.lineTo(x + 100, y - h + 55 + Math.sin(3 - t * 5) * 6);
  for (let i = 10; i >= 0; i--) { const u = i / 10; ctx.lineTo(x + u * 150, y - h + 110 - u * 20 + Math.sin(u * 5 - t * 5) * 8 * u); }
  ctx.closePath(); ctx.fill(); glow(x + 60, y - h + 55, 140, '255,150,40', 0.3);
  ctx.restore();
}
// where a standing person's hand/head end up (for props attached to figures)
function headPos(x, y, s, face = 1, seated = false) { const o = seated ? 72 : 0; return [x + 5 * s * face, y + (-302 + o) * s]; }
// a woman: same puppet body, with a long braid and an odhni (scarf) streaming behind
function woman(x, y, s, p = {}) {
  const f = p.face || 1, seated = !!p.seated, t = p.t || 0, o = seated ? 72 : 0;
  // odhni behind the body
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = p.scarf || 'rgba(176,40,24,0.95)';
  const wv = Math.sin(t * 6) * 10, len = p.scarfLen || 150;
  ctx.beginPath(); ctx.moveTo(-6, -262 + o); ctx.quadraticCurveTo(-len * 0.5, -250 + o + wv, -len, -228 + o - wv);
  ctx.lineTo(-len + 14, -206 + o - wv); ctx.quadraticCurveTo(-len * 0.45, -222 + o + wv, -14, -226 + o); ctx.closePath(); ctx.fill();
  // braid
  ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-12, -300 + o); ctx.quadraticCurveTo(-30, -250 + o, -22, -200 + o); ctx.stroke();
  ctx.restore();
  person(x, y, s, { ...p, hat: p.hat || 'none' });
  // long skirt for standing women
  if (!seated && !p.noSkirt) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = INK;
    ctx.beginPath(); ctx.moveTo(-26, -150); ctx.lineTo(28, -150); ctx.lineTo(48, -6); ctx.lineTo(-46, -6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = HOLE; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-38 + i * 13, -20, 3, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  // nose ring glint
  const [hx, hy] = headPos(x, y, s, f, seated);
  ctx.save(); ctx.fillStyle = 'rgba(255,214,140,0.9)'; ctx.beginPath(); ctx.arc(hx + 14 * s * f, hy + 6 * s, 3.2 * s, 0, 7); ctx.fill(); ctx.restore();
}
// a small child tied on the back of a (seated) rider
function childOnBack(x, y, s, face = 1, seated = true, glowA = 0) {
  const [hx, hy] = headPos(x, y, s, face, seated);
  const cx = hx - 34 * s * face, cy = hy + 46 * s;
  if (glowA > 0) glow(cx, cy, 90 * s, '255,225,160', 0.5 * glowA);
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(cx, cy - 22 * s, 13 * s, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx, cy + 8 * s, 16 * s, 24 * s, 0.2 * face, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(176,40,24,0.95)'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(cx - 18 * s * face, cy - 4 * s); ctx.lineTo(hx + 18 * s * face, hy + 70 * s); ctx.stroke();
  ctx.restore();
}
// a horse that can rear up (rear 0..1) around its hind hooves
function horseRear(x, y, s, t, rear = 0, ph = 0) {
  ctx.save(); ctx.translate(x - 60 * s, y); ctx.rotate(-0.42 * rear); ctx.translate(-(x - 60 * s), -y);
  horse(x, y, s, t, ph, false); ctx.restore();
}
// rider on a (possibly rearing) horse: returns nothing, draws horse + rider
function rider(x, y, s, t, o = {}) {
  const rear = o.rear || 0;
  ctx.save(); ctx.translate(x - 60 * s, y); ctx.rotate(-0.42 * rear); ctx.translate(-(x - 60 * s), -y);
  horse(x, y, s, t * (o.still ? 0 : 1), o.ph || 0, false);
  const bob = o.still ? 0 : Math.sin((t * 9 + (o.ph || 0)) * 2) * 5;
  const px = x - 10 * s, py = y + (bob - 86) * s, ps = s * 0.78;
  if (o.woman) woman(px, py, ps, { seated: true, hat: o.hat || 'pagdi', wpn: o.wpn || 'sword', fa: o.fa || [2.6, 0.2], sh: o.sh || [0.4, 0.5], t, scarfLen: 170 });
  else person(px, py, ps, { seated: true, hat: o.hat || 'pagdi', wpn: o.wpn || 'sword', fa: o.fa || [2.6, 0.2], sh: o.sh || [0.4, 0.5], spearA: o.spearA });
  if (o.child) childOnBack(px, py, ps, 1, true, o.childGlow || 0);
  ctx.restore();
}
// British soldier: puppet with a tall shako and a bayonet musket
function redcoat(x, y, s, p = {}) {
  const f = p.face || 1;
  person(x, y, s, { hat: 'none', wpn: 'spear', spearA: p.spearA != null ? p.spearA : -0.05, fa: p.fa || [0.5, -1.3], ...p });
  const [hx, hy] = headPos(x, y, s, f, !!p.seated);
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(hx - 20 * s, hy - 58 * s, 40 * s, 44 * s); ctx.fillRect(hx - 24 * s, hy - 18 * s, 48 * s, 6 * s);
  ctx.fillStyle = 'rgba(200,40,30,0.9)'; ctx.fillRect(hx - 20 * s, hy - 40 * s, 40 * s, 6 * s); ctx.restore();
}
function tent(x, y, s, glowA = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK;
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(0, -110); ctx.lineTo(90, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = `rgba(255,190,100,${0.35 + 0.4 * glowA})`; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(0, -46); ctx.lineTo(18, 0); ctx.fill();
  ctx.restore();
}
function campfire(x, y, t, seed = 1, s = 1) {
  const f = noise1(t * 7 + seed); glow(x, y - 20 * s, 120 * s, '255,160,60', 0.55);
  ctx.save(); ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.moveTo(x - 14 * s, y);
  ctx.quadraticCurveTo(x - 16 * s + f * 5, y - 30 * s, x + f * 6, y - (50 + f * 8) * s); ctx.quadraticCurveTo(x + 16 * s, y - 26 * s, x + 14 * s, y); ctx.fill(); ctx.restore();
}
function wall(y, h = 260, x0 = -40, x1 = W + 40) {   // a fort wall with battlements, top at y
  ctx.save(); ctx.fillStyle = INK; ctx.fillRect(x0, y, x1 - x0, h + 600);
  for (let x = x0; x < x1; x += 70) ctx.fillRect(x, y - 44, 40, 46);
  ctx.fillStyle = HOLE; for (let x = x0 + 30; x < x1; x += 140) { ctx.beginPath(); ctx.arc(x + 20, y + 60, 6, 0, 7); ctx.fill(); }
  ctx.restore();
}
function scroll(x, y, w, h, a, lines, o = {}) {   // an unrolled document
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; const ux = lerp(0.1, 1, easeOut(a));
  ctx.fillStyle = 'rgba(245,227,187,0.97)'; ctx.strokeStyle = 'rgba(70,32,12,0.9)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(x - w / 2 * ux, y - h / 2, w * ux, h, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#6a3816'; ctx.fillRect(x - w / 2 * ux - 14, y - h / 2 - 10, 18, h + 20); ctx.fillRect(x + w / 2 * ux - 4, y - h / 2 - 10, 18, h + 20);
  if (ux > 0.9) {
    ctx.fillStyle = '#4a1d08'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach((ln, i) => { ctx.font = `700 ${i === 0 ? 46 : 38}px ${i === 0 ? SERIF : SANS}`; ctx.fillText(ln, x, y - h / 2 + 70 + i * 62); });
    if (o.seal) { ctx.fillStyle = '#a0201a'; ctx.beginPath(); ctx.arc(x + w / 2 - 70, y + h / 2 - 60, 34, 0, 7); ctx.fill(); }
  }
  ctx.restore();
}
function mapCard(t, a, pts, prog01, o = {}) {   // small parchment map with a dotted route through pts [[x,y,label],...]
  if (a <= 0) return;
  const bx = o.x || 640, by = o.y || 300, bw = o.w || 380, bh = o.h || 470;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(245,227,187,0.95)'; ctx.strokeStyle = 'rgba(70,32,12,0.9)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 18); ctx.fill(); ctx.stroke();
  ctx.setLineDash([12, 10]); ctx.lineWidth = 6; ctx.strokeStyle = '#b8231a'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  const segs = pts.length - 1, n = 24 * segs;
  for (let k = 1; k <= Math.round(n * prog01); k++) { const u = k / n * segs, si = Math.min(segs - 1, Math.floor(u)), f = u - si;
    const A = pts[si], B = pts[si + 1]; ctx.lineTo(lerp(A[0], B[0], f) + Math.sin(f * 6) * 12, lerp(A[1], B[1], f)); }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = '#5a240c'; ctx.font = `700 34px ${SANS}`; ctx.textAlign = 'center';
  pts.forEach((p, i) => { const shown = i === 0 || prog01 >= i / segs - 0.02; if (!shown) return;
    ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, 7); ctx.fill(); ctx.fillText(p[2], p[0] + (p[3] || 0), p[1] + (p[4] != null ? p[4] : -22)); });
  ctx.restore();
}
function dim(a) { if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(10,3,1,${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function flash(a, col = '255,243,208') { if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(${col},${a})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function followChip(t, i) { const e = prog(t, cue(i)[0] - 0.1, cue(i)[0] + 0.4); if (e > 0) chip('फ़ॉलो करें  ·  अगली कहानी जल्द', 540, 520, 46, e); }
