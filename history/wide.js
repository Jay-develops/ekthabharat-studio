// ================= Ek Tha Bharat - wide (16:9) toolkit for long documentaries =================
// Loaded after common.js + common2.js when the story sets WIDE = True (canvas 1920x1080, W/H already switched).
// Layout: ground line ~GY, captions drawn by lib at the bottom (y ~985), titles in the upper third.

const CX = W / 2, GY = 830;
const fadeAt = (t, t0, d = 0.4) => prog(t, t0, t0 + d);          // 0..1 fade-in starting at time t0
// camera with centre defaults for the wide frame (replaces common2's portrait defaults)
function cam(t, o = {}) {
  const z = o.z || 1, fx = o.fx == null ? 960 : o.fx, fy = o.fy == null ? 560 : o.fy, sh = o.shake || 0;
  const sx = sh ? noise1(t * 37 + 1) * sh : 0, sy = sh ? noise1(t * 41 + 3) * sh : 0;
  ctx.translate(fx + (o.px || 0) + sx, fy + (o.py || 0) + sy);
  ctx.rotate((o.rot || 0) + (sh ? noise1(t * 23 + 7) * sh * 0.0011 : 0));
  ctx.scale(z, z); ctx.translate(-fx, -fy);
}

// which beat of a scene is showing: list of [first line index, draw fn]; a short dip to dark between beats
function beats(t, list) {
  let k = 0;
  for (let i = 0; i < list.length; i++) if (t >= cue(list[i][0])[0] - 0.25) k = i;
  const start = k === 0 ? 0 : cue(list[k][0])[0] - 0.25;
  list[k][1](t, t - start);
  const f = k === 0 ? 0 : 1 - clamp((t - start) / 0.45);
  if (f > 0) overlay(() => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(0,0,0,${0.85 * f})`; ctx.fillRect(0, 0, W, H); ctx.restore(); });
}

// a plain landscape: sky gradient, two hill layers, ground
function land(t, pal, o = {}) {
  bg(pal, o.flick || 0, o.cx || CX, o.cy || 380);
  if (o.sun) sun(o.sun[0], o.sun[1], o.sun[2] || 90, o.sunA == null ? 1 : o.sunA);
  if (o.moon) moon(o.moon[0], o.moon[1], o.moon[2] || 60);
  if (o.stars) stars(t, o.stars, 5, 560);
  hills(o.hy1 || 700, o.ha1 || 210, o.seed || 3, 0.35, INK, 0.7);
  hills(o.hy2 || 790, o.ha2 || 120, (o.seed || 3) + 4, 0.65, INK, 1.2);
  ground(o.gy || GY);
}

// chapter opener in the first ~3.4 s of a chapter scene: number, big title, year, gold rule
function chapterCard(t, n, title, year, o = {}) {
  const a = prog(t, 0.0, 0.5) * (1 - prog(t, (o.hold || 3.2), (o.hold || 3.2) + 0.5));
  if (a <= 0) return;
  overlay(() => {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = `rgba(10,4,2,${0.62 * a})`; ctx.fillRect(0, 0, W, H);
    textBlock(`अध्याय ${n}`, CX, 330, 44, { alpha: a, color: '#ffd9a0', font: SANS });
    const k = easeOut(prog(t, 0.1, 0.7)), sc = lerp(1.25, 1, k);
    ctx.translate(CX, 450); ctx.scale(sc, sc); ctx.translate(-CX, -450);
    textBlock(title, CX, 450, 92, { alpha: a, font: SERIF, color: GOLD, glow: 'rgba(255,150,50,0.9)', sw: 14, maxW: 1600 });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (year) textBlock(year, CX, 575, 52, { alpha: a * prog(t, 0.5, 1.0), color: '#ffe8c4', font: SERIF });
    const w = 360 * easeOut(prog(t, 0.6, 1.3));
    ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(CX - w, 630); ctx.lineTo(CX + w, 630); ctx.stroke();
    ctx.restore();
  });
}

// hero name plate (top-left), e.g. nameplate(t, 'राणा सांगा', 'मेवाड़ · 1482–1528', a)
function nameplate(text, sub, a) {
  if (a <= 0) return;
  overlay(() => {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a;
    ctx.font = `700 54px ${SERIF}`; const w = Math.max(ctx.measureText(text).width, 300) + 90;
    const x = 70 - (1 - a) * 40, y = 70;
    ctx.fillStyle = 'rgba(20,7,3,0.82)'; ctx.strokeStyle = 'rgba(255,200,120,0.9)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x, y, w, sub ? 150 : 96, 16); ctx.fill(); ctx.stroke();
    ctx.fillStyle = SAFF; ctx.fillRect(x, y, 10, sub ? 150 : 96);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = GOLD; ctx.fillText(text, x + 40, y + 50);
    if (sub) { ctx.font = `700 34px ${SANS}`; ctx.fillStyle = '#ffe2bc'; ctx.fillText(sub, x + 40, y + 112); }
    ctx.restore();
  });
}

// year / place tag at the top centre
function topTag(text, a, o = {}) { if (a > 0) overlay(() => chip(text, CX, o.y || 95, o.size || 44, a, o)); }

// ---------------- map of the subcontinent ----------------
const SUB = [[34.5, 71.5], [36.4, 74.0], [35.6, 77.6], [32.6, 79.2], [30.2, 81.0], [28.2, 84.0], [26.6, 88.0], [27.8, 88.9],
  [27.1, 92.0], [28.3, 95.6], [27.4, 97.0], [24.9, 94.6], [23.0, 93.4], [21.8, 92.3], [22.6, 90.5], [21.7, 88.3], [20.3, 86.7],
  [18.4, 84.4], [16.7, 82.2], [15.8, 80.9], [13.2, 80.3], [10.3, 79.8], [8.1, 77.5], [9.8, 76.3], [12.5, 74.9], [15.5, 73.8],
  [18.9, 72.8], [21.1, 72.7], [22.3, 72.6], [20.9, 70.4], [22.4, 68.9], [23.7, 68.2], [24.8, 66.9], [25.3, 63.5], [25.2, 61.6],
  [28.6, 61.4], [29.9, 60.9], [31.4, 66.3], [33.0, 69.5]];
const PLACE = {
  kabul: [34.5, 69.2, 'काबुल'], panipat: [29.4, 77.0, 'पानीपत'], delhi: [28.6, 77.2, 'दिल्ली'], agra: [27.2, 78.0, 'आगरा'],
  khanwa: [27.0, 77.4, 'खानवा'], chittor: [24.9, 74.6, 'चित्तौड़'], haldighati: [24.9, 73.7, 'हल्दीघाटी'], garha: [23.2, 79.9, 'गढ़ा'],
  ahmednagar: [19.1, 74.7, 'अहमदनगर'], raigad: [18.2, 73.4, 'रायगढ़'], pune: [18.5, 73.9, 'पुणे'], saraighat: [26.2, 91.7, 'सराईघाट'],
  anandpur: [31.2, 76.5, 'आनंदपुर'], sirhind: [30.6, 76.4, 'सरहिंद'], panhala: [16.8, 74.1, 'पन्हाला'], rewari: [28.2, 76.6, 'रेवाड़ी'],
  chamkaur: [30.9, 76.2, 'चमकौर'],
};
let MAPBOX = { x: 560, y: 60, w: 800, h: 760 };
function mp(lat, lon) { const b = MAPBOX; return [b.x + (lon - 60) / 38 * b.w, b.y + (37 - lat) / 31 * b.h]; }
// draws the subcontinent; o: {a, pins:[key..], route:[key..], routeP (0..1), glow:key, box}
function subMap(t, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  if (o.box) MAPBOX = o.box;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); SUB.forEach(([la, lo], i) => { const [x, y] = mp(la, lo); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath();
  ctx.fillStyle = 'rgba(241,220,176,0.93)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(90,40,14,0.9)'; ctx.stroke();
  // rivers (Indus, Ganga, Brahmaputra) as faint lines
  ctx.strokeStyle = 'rgba(70,110,150,0.55)'; ctx.lineWidth = 4;
  for (const r of [[[35, 75.5], [31.5, 71.5], [28.5, 70.3], [25.5, 68.5], [24.2, 67.6]], [[30.9, 78.9], [28.0, 79.6], [25.4, 82.6], [25.6, 85.1], [24.8, 87.9], [22.3, 88.4]],
    [[28.0, 95.2], [27.5, 94.6], [26.2, 91.7], [25.2, 89.8], [23.4, 90.3]]]) {
    ctx.beginPath(); r.forEach(([la, lo], i) => { const [x, y] = mp(la, lo); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
  }
  if (o.route && o.route.length > 1) {
    const pts = o.route.map(k => mp(PLACE[k][0], PLACE[k][1])), p = o.routeP == null ? 1 : o.routeP, segs = pts.length - 1, n = 40 * segs;
    ctx.setLineDash([14, 10]); ctx.lineWidth = 7; ctx.strokeStyle = o.routeCol || '#b8231a'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let k = 1; k <= Math.round(n * p); k++) { const u = k / n * segs, si = Math.min(segs - 1, Math.floor(u)), f = u - si;
      ctx.lineTo(lerp(pts[si][0], pts[si + 1][0], f), lerp(pts[si][1], pts[si + 1][1], f)); }
    ctx.stroke(); ctx.setLineDash([]);
  }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  (o.pins || []).forEach((k, i) => {
    const pa = o.pinA ? o.pinA(i) : 1; if (pa <= 0) return;
    const [x, y] = mp(PLACE[k][0], PLACE[k][1]);
    ctx.globalAlpha = a * pa;
    if (o.glow === k) ring(x, y, t, 1, '184,35,26');
    ctx.fillStyle = '#b8231a'; ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#fff3d6'; ctx.stroke();
    ctx.font = `700 30px ${SANS}`; ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(245,227,187,0.95)';
    const ly = y - 30; ctx.strokeText(PLACE[k][2], x, ly); ctx.fillStyle = '#4a1d08'; ctx.fillText(PLACE[k][2], x, ly);
  });
  ctx.restore();
}
// parchment backdrop for map beats
function mapStage(t, pal) {
  bg(pal || PAL.map, 0, CX, 420);
  ctx.save(); ctx.globalAlpha = 0.25; ctx.drawImage(tex, 0, 0, W, H); ctx.restore();
}

// ---------------- people helpers ----------------
// a king/queen standing tall in the light, with a sword up when raise=1
function hero(x, y, s, t, o = {}) {
  if (o.glow !== false) glow(x, y - 200 * s, 360 * s, '255,190,90', 0.35 * (o.glowA == null ? 1 : o.glowA));
  const up = o.raise || 0;
  const p = { hat: o.hat || 'pagdi', wpn: o.wpn || 'sword', face: o.face || 1, cloth: o.cloth || '#b8231a',
    fa: [lerp(0.5, 2.9, up), lerp(-0.4, 0.2, up)], sh: [-0.25, -0.35], beard: o.beard, moustache: o.moustache !== false, still: o.still };
  if (o.woman) actor(x, y, s, t, { ...p, woman: true, hat: o.hat || 'none', moustache: false, scarf: o.scarf });
  else actor(x, y, s, t, p);
}
// an army line facing dir; o: {x0, x1, y, n, s, kind, banner, col}
function army(t, o = {}) {
  const n = o.n || 9, s = o.s || 0.45, dir = o.dir || 1;
  for (let row = 2; row >= 0; row--) {
    const ss = s * (1 - row * 0.12), y = (o.y || GY) - row * 26;
    ctx.save(); ctx.globalAlpha = 1 - row * 0.2;
    for (let i = 0; i < n; i++) {
      const x = lerp(o.x0, o.x1, (i + 0.5 + (row % 2) * 0.4) / n), ph = i * 1.7 + row;
      actor(x, y + Math.sin(i * 3.1) * 6, ss, t, { face: dir, hat: o.hat || (row === 0 ? 'helmet' : 'pagdi'), wpn: o.wpn || 'spear',
        fa: [0.5, -1.3], spearA: -0.05 + Math.sin(t * 2 + ph) * 0.04, shadow: row === 0, ph, still: o.still });
      if (o.banner && row === 1 && i % 3 === 1) bhagwa(x + 18 * dir, y - 170 * ss, 300 * ss, t + i, o.col || SAFF);
    }
    ctx.restore();
  }
}

// ---------------- end card ----------------
function wideEnd(t, q) {
  bg(PAL.night, noise1(t * 4), CX, 500); embers(t, 40, 77, 0.6, [0, 200, W, 900]);
  lamp(CX, 900, 1.4, t); border(prog(t, 0, 0.6));
  overlay(() => {
    textBlock(q, CX, 330, 78, { font: SERIF, color: GOLD, maxW: 1500, alpha: prog(t, 0.1, 0.7), glow: 'rgba(255,160,60,0.7)', sw: 13 });
    chip('कमेंट में सिर्फ़ नाम लिखिए 👇', CX, 560, 50, prog(t, 0.8, 1.3));
    chip('सब्सक्राइब करें  ·  हर सुबह 9 बजे नई कहानी', CX, 680, 42, prog(t, 1.3, 1.8), { color: '#ffd9a0' });
  });
}

// 16:9: headlines use the full width and default to the centre (the portrait helper wraps at 960px around x=540)
{ const _slam = slam; slam = function (text, y, t, t0, size = 120, o = {}) { return _slam(text, y, t, t0, size, Object.assign({ maxW: 1700, x: CX }, o)); }; }
