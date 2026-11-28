// @common2
// ---------------- documentary 01 - "Do sau saal, jo jhuke nahin" (1526-1737), 16:9 ----------------
// Each chapter scene is split into beats keyed to its narration lines (cue i = line i of that scene).
Object.assign(PAL, {
  warm: ['#ffd08a', '#c8662c', '#2a0c04'], dusk3: ['#ffb38a', '#8d3b5a', '#160818'], forest: ['#d8f0b0', '#4f8a4a', '#0c1c0a'],
  river: ['#bfe6ff', '#3f7fa8', '#071624'], royal: ['#e7c6ff', '#6b3fa0', '#120624'], deccan: ['#ffe0a0', '#d0763a', '#2c1008'],
});
const KING = { hat: 'crown' };

// ================= OPEN: Panipat 1556 in silhouette, then the promise =================
S.open = (t) => {
  beats(t, [
    [0, (t) => {
      cam(t, { z: 1 + 0.03 * prog(t, 0, cue(1)[1]), fx: 960, fy: 600, shake: hit(t, at(1, 0.15), 0.8, 10) });
      land(t, PAL.blood, { sun: [1450, 330, 110], seed: 11 });
      army(t, { x0: -80, x1: 820, n: 10, dir: 1, banner: true });
      army(t, { x0: 1120, x1: 2000, n: 10, dir: -1, hat: 'helmet' });
      elephant(640, GY - 4, 0.9, t, 0);
      hero(640, GY - 205, 0.55, t, { hat: 'crown', raise: 0.6, glowA: 0.6 });
      dust(t, 0.35, 6, 600, 840);
      volley(t, at(1, 0.05), 1500, 520, 700, 560, 14, 3, 1.0, 180);
      if (t > at(1, 0.15)) overlay(() => flash(0.5 * (1 - clamp((t - at(1, 0.15)) / 0.6))));
      topTag('पानीपत · 1556', fadeAt(t, 0, 0.2) * (1 - prog(t, cue(1)[1], cue(1)[1] + 0.4)));
      grade('blood', t, 0.35);
    }],
    [2, (t, lt) => {
      land(t, PAL.warm, { sun: [960, 560, 160], seed: 7, hy1: 720 });
      rays(960, 560, t, 0.1);
      const names = [['crown'], ['pagdi'], ['none', 1], ['crown'], ['pagdi'], ['pagdi'], ['helmet'], ['turban'], ['none', 1], ['helmet']];
      names.forEach(([h, w], i) => {
        const x = 170 + i * 175, a = prog(t, at(3, 0.1) + i * 0.25, at(3, 0.1) + i * 0.25 + 0.5);
        if (a > 0) { ctx.save(); ctx.globalAlpha = a; actor(x, GY, 0.52, t, { hat: h, woman: !!w, wpn: 'sword', fa: [2.6, 0.2], cloth: SAFF, ph: i }); ctx.restore(); }
      });
      slam('1526 – 1737', 230, t, cue(2)[0] + 0.2, 110, { x: CX, until: cue(3)[0] });
      slam('दो सौ साल… जो झुके नहीं', 230, t, cue(3)[0] + 0.1, 96, { x: CX });
      embers(t, 40, 4, 0.7, [0, 200, W, 840]);
    }],
  ]);
};

// ================= 1526: Babur =================
S.babur = (t) => {
  chapterCard(t, 1, 'बाबर और पानीपत की तोपें', '1526');
  beats(t, [
    [0, (t) => {
      mapStage(t);
      subMap(t, { box: { x: 560, y: 70, w: 800, h: 720 }, pins: ['kabul', 'panipat'], route: ['kabul', 'panipat'], routeP: prog(t, at(1, 0.1), cue(1)[1]), glow: 'kabul' });
      nameplate('बाबर', 'तैमूर और चंगेज़ ख़ान का वंशज', fadeAt(t, 0, 0.3) * (1 - prog(t, cue(2)[0] - 0.4, cue(2)[0])));
    }],
    [2, (t) => {
      cam(t, { z: 1.02, shake: hit(t, at(2, 0.4), 0.7, 14) + hit(t, at(2, 0.55), 0.7, 14) });
      land(t, PAL.battle, { seed: 21 });
      for (let i = 0; i < 4; i++) { cannon(1200 + i * 150, GY, 0.85, -1, prog(t, at(2, 0.4 + i * 0.05), at(2, 0.4 + i * 0.05) + 0.3)); boom(1080 + i * 150, GY - 60, t, at(2, 0.4 + i * 0.05), 0.8, i + 2); }
      [[260, 0], [520, 1.3], [760, 2.1]].forEach(([x, ph]) => elephant(x - prog(t, at(2, 0.5), cue(2)[1]) * 160, GY, 0.75, t * 2.2, ph));
      army(t, { x0: -100, x1: 400, n: 6, dir: 1, s: 0.4 });
      smoke(1150, GY - 100, t, 4, 14, 1.6, 0.25);
      topTag('पानीपत · 21 अप्रैल 1526', fadeAt(t, cue(2)[0], 0.4));
      grade('night', t, 0.25);
    }],
    [3, (t) => {
      land(t, PAL.dusk3, { seed: 31, hy1: 720 });
      palace(960, GY - 10, 1.25);
      flag(1200, GY - 520, 130, 80, t, '#2a6a3a');
      stamp('दिल्ली · आगरा', CX, 150, t, at(3, 0.15), { size: 70, color: '#3a7a4a' });
      slam('मुग़ल राज की शुरुआत', 300, t, at(3, 0.55), 80, { x: CX });
    }],
    [4, (t) => {
      land(t, PAL.dusk2, { seed: 41, moon: [1500, 240, 60], stars: 0.5 });
      fort(1100, GY, 1.1, t);
      const a = prog(t, at(4, 0.5), at(4, 0.8));
      ctx.save(); ctx.globalAlpha = a; hero(700, GY, 0.85, t, { hat: 'crown', glowA: 0.8 }); ctx.restore();
      stamp('80 घाव', 700, 300, t, at(4, 0.8), { size: 84 });
    }],
  ]);
};

// ================= Rana Sanga, Khanwa 1527 =================
S.sanga = (t) => {
  chapterCard(t, 2, 'राणा सांगा', 'खानवा · 1527');
  beats(t, [
    [0, (t) => {
      cam(t, { z: 1 + 0.05 * prog(t, 0, cue(0)[1]), fx: 960, fy: 520 });
      land(t, PAL.warm, { sun: [1450, 360, 120], seed: 51 });
      fort(1450, GY - 20, 0.9, t);
      hero(820, GY, 1.05, t, { hat: 'crown', raise: prog(t, at(0, 0.7), at(0, 0.9)), moustache: true });
      nameplate('राणा सांगा', 'मेवाड़ के महाराणा · 1508–1528', fadeAt(t, cue(0)[0], 0.4));
      [['एक आँख', 0.15], ['एक हाथ', 0.3], ['एक पैर', 0.45]].forEach(([s, f], i) => stamp(s, 950 + i * 260, 280 + i * 20, t, at(0, f), { size: 56, rot: -0.1 + i * 0.08 }));
      slam('80 घाव', 470, t, at(0, 0.62), 120, { x: 1300 });
    }],
    [1, (t) => {
      land(t, PAL.dawn, { sun: [960, 500, 120], seed: 61 });
      crowd(t, { x0: -60, x1: W + 60, y: GY, n: 16, s: 0.55, flags: 0.35, fists: 0.3, rows: 3, seed: 7 });
      const names = ['मारवाड़', 'आमेर', 'चंदेरी', 'मेवात'];
      overlay(() => names.forEach((n, i) => chip(n, 360 + i * 400, 170, 44, fadeAt(t, at(1, 0.15 + i * 0.18), 0.4))));
      if (t > cue(2)[0] - 0.2) {
        overlay(() => scroll(CX, 330, 900, 300, prog(t, cue(2)[0], cue(2)[0] + 0.6), ['जीतें', 'दिल्ली · गुजरात · मालवा', 'मालवा के सुल्तान को बंदी बनाया, फिर छोड़ दिया'], { seal: true }));
      }
    }],
    [3, (t) => {
      cam(t, { z: 1.03, shake: hit(t, at(4, 0.1), 0.8, 16) + hit(t, at(4, 0.3), 0.8, 16) });
      land(t, PAL.battle, { seed: 71 });
      army(t, { x0: -80, x1: 900, n: 11, dir: 1, banner: true });
      army(t, { x0: 1150, x1: 2000, n: 9, dir: -1, hat: 'helmet' });
      for (let i = 0; i < 3; i++) { cannon(1250 + i * 170, GY, 0.8, -1, prog(t, at(4, 0.1 + i * 0.1), at(4, 0.1 + i * 0.1) + 0.3)); boom(1130 + i * 170, GY - 60, t, at(4, 0.1 + i * 0.1), 0.9, i + 9); }
      rider(560, GY, 0.85, t, { hat: 'crown', wpn: 'sword', rear: 0.3 + 0.2 * Math.sin(t * 2) });
      volley(t, at(3, 0.5), 1600, 500, 500, 560, 16, 5, 1.0, 200);
      dust(t, 0.4, 6, 600, 840);
      topTag('खानवा · 1527', fadeAt(t, cue(3)[0], 0.4));
      if (t > at(4, 0.7)) grade('blood', t, 0.4 * prog(t, at(4, 0.7), cue(4)[1]));
    }],
    [5, (t) => {
      land(t, PAL.dusk2, { seed: 81, moon: [1450, 260, 70], stars: 0.6 });
      tent(560, GY, 1.0, 0.8); campfire(900, GY, t, 3, 1.2);
      hero(1150, GY, 0.95, t, { hat: 'crown', raise: prog(t, at(5, 0.4), at(5, 0.6)) });
      quoteCard('बाबर को हराए बिना चित्तौड़ नहीं लौटूँगा', 250, prog(t, at(5, 0.35), at(5, 0.6)) * (1 - prog(t, cue(6)[0] - 0.3, cue(6)[0])), 58);
      slam('भारत आसान नहीं होगा', 260, t, at(6, 0.5), 84, { x: CX });
    }],
  ]);
};

// ================= Hemu, 1556 =================
S.hemu = (t) => {
  chapterCard(t, 3, 'सम्राट हेमचंद्र विक्रमादित्य', '1556');
  beats(t, [
    [0, (t) => {
      land(t, PAL.day, { sun: [1600, 260, 80], seed: 91 });
      for (let i = 0; i < 5; i++) tent(250 + i * 360, GY, 0.8, 0.2);
      crowd(t, { x0: -60, x1: W + 60, y: GY + 10, n: 14, s: 0.5, rows: 2, seed: 19 });
      hero(960, GY, 0.95, t, { hat: 'pagdi', wpn: 'basket', glowA: prog(t, cue(2)[0], cue(2)[0] + 1) });
      nameplate('हेमू', 'रेवाड़ी से दिल्ली तक', fadeAt(t, at(0, 0.5), 0.4));
      if (t > cue(2)[0]) { slam('22', 330, t, at(2, 0.6), 200, { x: 1500 }); overlay(() => chip('लगातार जीतें (कहते हैं)', 1500, 460, 40, fadeAt(t, at(2, 0.7), 0.4))); }
    }],
    [3, (t) => {
      mapStage(t);
      subMap(t, { box: { x: 560, y: 70, w: 800, h: 720 }, pins: ['rewari', 'agra', 'delhi'], route: ['agra', 'delhi'], routeP: prog(t, at(3, 0.5), cue(3)[1]), glow: 'delhi' });
      topTag('1556 · हुमायूँ की मौत', fadeAt(t, cue(3)[0], 0.4));
    }],
    [4, (t) => {
      cam(t, { z: 1 + 0.04 * prog(t, cue(4)[0], cue(4)[1]), fx: 960, fy: 420 });
      land(t, PAL.warm, { sun: [960, 420, 150], seed: 101 });
      rays(960, 420, t, 0.12);
      fort(960, GY - 40, 1.3, t);
      crowd(t, { x0: -60, x1: W + 60, y: GY + 20, n: 18, s: 0.5, flags: 0.4, fists: 0.5, rows: 3, seed: 23 });
      hero(960, GY - 140, 0.8, t, { hat: 'crown', raise: prog(t, at(4, 0.6), at(4, 0.8)) });
      topTag('पुराना क़िला, दिल्ली · 7 अक्टूबर 1556', fadeAt(t, cue(4)[0], 0.4));
      slam('सम्राट हेमचंद्र विक्रमादित्य', 250, t, at(4, 0.7), 90, { x: CX });
      embers(t, 50, 3, 0.8, [0, 150, W, 800]);
    }],
    [5, (t) => {
      cam(t, { z: 1.02, fx: 700, fy: 600, shake: hit(t, at(7, 0.1), 0.9, 12) });
      land(t, PAL.blood, { sun: [1500, 320, 100], seed: 11 });
      army(t, { x0: -80, x1: 760, n: 10, dir: 1, banner: true });
      army(t, { x0: 1180 + prog(t, at(6, 0.4), cue(6)[1]) * 200, x1: 2050, n: 9, dir: -1, hat: 'helmet' });
      elephant(640, GY, 0.95, t, 0);
      const fell = prog(t, at(7, 0.15), at(7, 0.6));
      ctx.save(); ctx.translate(640, GY - 215); ctx.rotate(-fell * 0.9); ctx.translate(-640, -(GY - 215));
      hero(640, GY - 215, 0.55, t, { hat: 'crown', raise: 1 - fell, glowA: 0.5 * (1 - fell) });
      ctx.restore();
      topTag('पानीपत · 5 नवंबर 1556', fadeAt(t, cue(6)[0], 0.4));
      if (t > at(7, 0.0)) { const k = prog(t, at(7, 0.0), at(7, 0.15)); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; const x = lerp(1500, 655, k), y = lerp(430, GY - 300, k); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60, y - 8); ctx.stroke(); ctx.restore(); }
      if (t > at(7, 0.15)) overlay(() => flash(0.6 * (1 - clamp((t - at(7, 0.15)) / 0.5)), '255,90,60'));
      if (t > cue(8)[0]) { grade('archival', t, prog(t, cue(8)[0], cue(8)[0] + 0.6)); slam('अगर वो तीर चूक जाता…?', 260, t, at(8, 0.3), 80, { x: CX }); }
    }],
  ]);
};

// ================= Rani Durgavati, 1564 =================
S.durgavati = (t) => {
  chapterCard(t, 4, 'रानी दुर्गावती', 'गोंडवाना · 1564');
  beats(t, [
    [0, (t) => {
      land(t, PAL.forest, { sun: [1500, 280, 90], seed: 111 });
      for (let i = 0; i < 9; i++) tree(100 + i * 230, GY + 4, 0.9 + (i % 3) * 0.15, t, i + 3);
      hero(960, GY, 1.0, t, { woman: true, wpn: 'spear', cloth: '#7a2a8a', raise: 0.2 });
      nameplate('रानी दुर्गावती', 'गढ़ा-कटंगा · 1524–1564', fadeAt(t, at(0, 0.6), 0.4));
      if (t > cue(1)[0]) { volley(t, at(1, 0.4), 1050, 560, 1700, 520, 3, 9, 0.8, 120); }
      if (t > cue(2)[0]) overlay(() => chip('16 साल का राज · बाज़ बहादुर को हराया', CX, 180, 44, fadeAt(t, cue(2)[0], 0.4)));
    }],
    [3, (t) => {
      cam(t, { z: 1.03, shake: hit(t, at(4, 0.1), 0.7, 10) + hit(t, at(4, 0.25), 0.7, 10) });
      land(t, PAL.battle, { seed: 121 });
      army(t, { x0: 1150, x1: 2050, n: 10, dir: -1, hat: 'helmet' });
      army(t, { x0: -80, x1: 480, n: 6, dir: 1, banner: true, col: '#7a2a8a' });
      elephant(760, GY, 1.0, t, 0);
      ctx.save(); hero(760, GY - 225, 0.58, t, { woman: true, wpn: 'spear', cloth: '#7a2a8a', raise: 0.7 }); ctx.restore();
      volley(t, at(4, 0.05), 1500, 480, 790, GY - 330, 10, 4, 0.9, 120);
      topTag('नरई नाला · 24 जून 1564', fadeAt(t, cue(3)[0], 0.4));
      if (t > at(4, 0.55)) { grade('archival', t, prog(t, at(4, 0.55), cue(4)[1])); slam('वीरगति', 250, t, at(4, 0.7), 120, { x: CX }); }
    }],
    [5, (t) => {
      land(t, PAL.dawn, { sun: [960, 600, 130], seed: 131 });
      ctx.save(); ctx.fillStyle = INK; ctx.fillRect(860, GY - 120, 200, 120); ctx.fillRect(840, GY - 140, 240, 24); ctx.restore();
      const r = rng(5); for (let i = 0; i < 40; i++) { ctx.save(); ctx.fillStyle = `rgba(250,245,232,${0.85 * fadeAt(t, cue(5)[0] + i * 0.05, 0.3)})`; ctx.beginPath(); ctx.ellipse(800 + r() * 320, GY - 4 - r() * 18, 12 + r() * 8, 8, 0, 0, 7); ctx.fill(); ctx.restore(); }
      lamp(960, GY - 150, 0.9, t);
      if (t > cue(6)[0]) overlay(() => chip('रानी दुर्गावती विश्वविद्यालय, जबलपुर', CX, 200, 50, fadeAt(t, cue(6)[0], 0.5)));
    }],
  ]);
};

// ================= Maharana Pratap =================
S.pratap = (t) => {
  chapterCard(t, 5, 'महाराणा प्रताप', 'हल्दीघाटी से दिवेर');
  beats(t, [
    [0, (t) => {
      cam(t, { z: 1 + 0.06 * prog(t, 0, cue(1)[0]), fx: 960, fy: 520 });
      land(t, PAL.warm, { sun: [960, 520, 170], seed: 141, hy1: 740 });
      rays(960, 520, t, 0.14);
      hero(960, GY, 1.15, t, { hat: 'crown', wpn: 'spear', raise: 0.15, moustache: true, glowA: 1 });
      nameplate('महाराणा प्रताप', 'मेवाड़ · 1540–1597', fadeAt(t, at(0, 0.6), 0.4));
      embers(t, 50, 8, 0.8, [0, 150, W, 840]);
    }],
    [1, (t) => {
      land(t, PAL.court, { seed: 151 });
      palace(960, GY - 10, 1.1);
      actor(1350, GY, 0.85, t, { hat: 'turban', face: -1, fa: [1.3, -0.2], prop: 'book' });
      hero(620, GY, 0.95, t, { hat: 'crown', face: 1, raise: 0 });
      ['सोना', 'जागीर', 'सम्मान'].forEach((s, i) => overlay(() => chip(s, 1450, 220 + i * 80, 40, fadeAt(t, at(1, 0.2 + i * 0.12), 0.3))));
      slam('मेवाड़ नहीं झुकेगा', 260, t, at(1, 0.75), 92, { x: 700 });
    }],
    [2, (t) => {
      cam(t, { z: 1.02, shake: hit(t, at(4, 0.4), 0.8, 14) });
      land(t, PAL.battle, { seed: 161, hy1: 680, ha1: 260 });
      army(t, { x0: -80, x1: 700, n: 9, dir: 1, banner: true });
      army(t, { x0: 1250, x1: 2050, n: 9, dir: -1, hat: 'helmet' });
      // Bhil archers on the ridge + Hakim Khan Sur's banner (line 3)
      if (t > cue(3)[0]) { for (let i = 0; i < 6; i++) actor(120 + i * 90, 640, 0.32, t, { hat: 'none', wpn: 'spear', fa: [2.0, 0.3], shadow: false, ph: i }); overlay(() => chip('भील योद्धा · हकीम ख़ान सूर', 520, 180, 42, fadeAt(t, cue(3)[0], 0.4))); }
      elephant(1250, GY, 1.0, t, 0);
      actor(1250, GY - 220, 0.5, t, { hat: 'turban', face: -1, wpn: 'spear', fa: [1.5, -0.3] });
      const charge = prog(t, at(4, 0.0), at(4, 0.35));
      rider(lerp(700, 1060, charge), GY, 1.0, t, { hat: 'crown', wpn: 'spear', rear: lerp(0, 0.9, prog(t, at(4, 0.25), at(4, 0.45))), fa: [2.2, -0.1] });
      dust(t, 0.45, 6, 600, 840);
      topTag('हल्दीघाटी · 18 जून 1576', fadeAt(t, cue(2)[0], 0.4));
      if (t > at(4, 0.6)) slam('चेतक!', 260, t, at(4, 0.6), 120, { x: CX });
    }],
    [5, (t) => {
      land(t, PAL.dusk3, { seed: 171, sun: [1600, 520, 80] });
      water(GY - 10, t, 0.6);
      const k = prog(t, at(5, 0.25), at(5, 0.55));
      const x = lerp(500, 1300, k), y = GY - Math.sin(k * Math.PI) * 220;
      rider(x, y, 0.9, t, { hat: 'crown', rear: Math.sin(k * Math.PI) * 0.4 });
      if (t > cue(6)[0]) { for (let i = 0; i < 8; i++) tree(100 + i * 250, GY + 4, 1.0, t, i + 30); }
      if (t > cue(7)[0]) quoteCard('जब तक चित्तौड़ आज़ाद नहीं, न सोने की थाली, न महल', 240, fadeAt(t, cue(7)[0] + 0.3, 0.5) * (1 - prog(t, cue(8)[0] - 0.3, cue(8)[0])), 54);
      grade('night', t, 0.3);
    }],
    [8, (t) => {
      cam(t, { z: 1.03, shake: hit(t, at(8, 0.3), 0.6, 10) });
      land(t, PAL.dawn, { sun: [1500, 360, 130], seed: 181 });
      fort(1450, GY - 20, 0.95, t);
      army(t, { x0: -80, x1: 1100, n: 12, dir: 1, banner: true });
      rider(900, GY, 0.95, t, { hat: 'crown', wpn: 'sword', rear: 0.4 });
      rider(620, GY, 0.85, t, { hat: 'pagdi', wpn: 'sword', rear: 0.3, ph: 1 });
      bhagwa(1450, GY - 360, 360 * prog(t, at(8, 0.6), at(8, 0.9)) + 1, t);
      topTag('दिवेर · 1582', fadeAt(t, cue(8)[0], 0.4));
      if (t > cue(9)[0]) overlay(() => chip('1597 तक: चित्तौड़-मांडलगढ़ छोड़ लगभग पूरा मेवाड़ आज़ाद', CX, 190, 42, fadeAt(t, cue(9)[0], 0.5)));
      if (t > cue(10)[0]) slam('जय मेवाड़!', 300, t, at(10, 0.5), 130, { x: CX });
      embers(t, 40, 12, 0.7, [0, 150, W, 840]);
    }],
  ]);
};

// ================= Chand Bibi, Ahmednagar 1595-96 =================
S.chandbibi = (t) => {
  chapterCard(t, 6, 'चाँद बीबी', 'अहमदनगर · 1595');
  beats(t, [
    [0, (t) => {
      land(t, PAL.deccan, { seed: 191, sun: [400, 300, 80] });
      wall(560, 300, 700, 2000);
      for (let i = 0; i < 6; i++) tent(120 + i * 110, GY, 0.55, 0.3);
      army(t, { x0: -60, x1: 620, n: 7, dir: 1, hat: 'helmet', s: 0.38 });
      if (t > cue(1)[0]) { hero(1300, 560, 0.75, t, { woman: true, cloth: '#2a6a7a', raise: 0.3 }); nameplate('चाँद बीबी', 'अहमदनगर की संरक्षक', fadeAt(t, cue(1)[0], 0.4)); }
      if (t > cue(2)[0]) overlay(() => chip('पहले बीजापुर की संरक्षक रानी', 1300, 180, 42, fadeAt(t, cue(2)[0], 0.4)));
    }],
    [3, (t) => {
      cam(t, { z: 1.02, shake: hit(t, at(3, 0.35), 1.0, 22) });
      land(t, PAL.fire, { seed: 201 });
      const breach = prog(t, at(3, 0.35), at(3, 0.5)), rebuilt = prog(t, at(4, 0.55), cue(4)[1]);
      wall(560, 300, 700, 1150 + (1 - breach) * 400 + rebuilt * 400 * 0);
      wall(560, 300, 1550, 2000);
      if (breach > 0 && rebuilt < 1) { ctx.save(); ctx.globalAlpha = 1 - rebuilt; ctx.fillStyle = INK; ctx.fillRect(1150, 560 + 300 * (1 - rebuilt), 400, 300 * rebuilt); ctx.restore(); }
      if (rebuilt > 0) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(1150, 860 - 300 * rebuilt, 400, 300 * rebuilt); ctx.restore(); }
      boom(1350, 700, t, at(3, 0.35), 2.2, 4); smoke(1350, 700, t, 7, 16, 2.2, 0.3);
      if (t > cue(4)[0]) { hero(1350, 560 + (1 - prog(t, cue(4)[0], at(4, 0.3))) * 40, 0.8, t, { woman: true, cloth: '#2a6a7a', raise: 1 });
        for (let i = 0; i < 5; i++) torch(1180 + i * 80, 860, 60, t, i + 2); }
      topTag('फ़रवरी 1596', fadeAt(t, cue(3)[0], 0.4));
      if (t > at(4, 0.6)) overlay(() => chip('रातों-रात दीवार फिर खड़ी', CX, 190, 46, fadeAt(t, at(4, 0.6), 0.4)));
      grade('night', t, 0.35);
    }],
    [5, (t) => {
      land(t, PAL.deccan, { seed: 211, sun: [1500, 300, 90] });
      overlay(() => scroll(CX, 470, 900, 360, prog(t, cue(5)[0], cue(5)[0] + 0.7), ['संधि · 1596', 'मुग़ल फ़ौज लौटी'], { seal: true }));
      army(t, { x0: 1300, x1: 2100, n: 7, dir: 1, hat: 'helmet', s: 0.38 });
    }],
  ]);
};

// ================= Shivaji Maharaj =================
S.shivaji = (t) => {
  chapterCard(t, 7, 'छत्रपति शिवाजी महाराज', 'हिंदवी स्वराज्य');
  beats(t, [
    [0, (t) => {
      cam(t, { z: 1 + 0.05 * prog(t, 0, cue(2)[0]), fx: 960, fy: 520 });
      land(t, PAL.dawn, { sun: [960, 560, 170], seed: 221, hy1: 700, ha1: 300 });
      cliffFort(1560, GY - 10, 0.5, t);
      rays(960, 560, t, 0.12);
      hero(860, GY, 1.1, t, { hat: 'crown', beard: true, raise: 0.4, cloth: SAFF });
      bhagwa(1240, GY, 380, t);
      nameplate('छत्रपति शिवाजी महाराज', '1630–1680', fadeAt(t, at(0, 0.6), 0.4));
      if (t > cue(1)[0]) slam('हिंदवी स्वराज्य', 260, t, at(1, 0.3), 100, { x: CX });
    }],
    [2, (t, lt) => {
      land(t, PAL.forest, { seed: 231, hy1: 680, ha1: 300 });
      troop(lt, { y: GY, n: 7, s: 0.55, dir: 1, kind: 'sword', banner: 3, x: -200, speed: 260 });
      overlay(() => chip('गनिमी कावा: अचानक हमला… और ग़ायब', CX, 190, 46, fadeAt(t, at(2, 0.5), 0.4)));
    }],
    [3, (t) => {
      cam(t, { z: 1.02, shake: hit(t, at(3, 0.6), 0.6, 8) });
      land(t, PAL.dusk2, { seed: 241, moon: [1500, 230, 60], stars: 0.7 });
      palace(1100, GY - 10, 1.1);
      for (let i = 0; i < 3; i++) actor(500 + i * 120 + prog(t, at(3, 0.4), at(3, 0.7)) * 420, GY, 0.7, t, { hat: 'pagdi', wpn: 'sword', fa: [2.3, 0.2], walk: t * 6 + i, face: 1, ph: i });
      topTag('लाल महल, पुणे · 1663', fadeAt(t, cue(3)[0], 0.4));
      if (t > at(3, 0.75)) stamp('उँगलियाँ गँवाकर भागा', 1300, 300, t, at(3, 0.75), { size: 56 });
      grade('night', t, 0.4);
    }],
    [4, (t) => {
      land(t, PAL.court, { seed: 251 });
      palace(960, GY - 10, 1.0);
      for (let i = 0; i < 4; i++) { const x = 500 + i * 220 + prog(t, at(4, 0.5), cue(4)[1]) * 700; actor(x, GY, 0.6, t, { hat: 'pagdi', wpn: 'basket', walk: t * 5 + i, face: 1, ph: i }); }
      topTag('आगरा · 1666', fadeAt(t, cue(4)[0], 0.4));
      if (t > cue(5)[0]) overlay(() => chip('1670: तानाजी मालुसरे ने कोंढाणा जीता → सिंहगढ़', CX, 190, 44, fadeAt(t, cue(5)[0], 0.4)));
    }],
    [6, (t) => {
      cam(t, { z: 1 + 0.05 * prog(t, cue(6)[0], cue(7)[1]), fx: 960, fy: 480 });
      land(t, PAL.warm, { sun: [960, 400, 170], seed: 261 });
      rays(960, 400, t, 0.15);
      cliffFort(960, GY - 20, 0.6, t);
      crowd(t, { x0: -60, x1: W + 60, y: GY + 20, n: 18, s: 0.5, flags: 0.5, fists: 0.5, rows: 3, seed: 31 });
      hero(960, GY - 170, 0.75, t, { hat: 'crown', beard: true, raise: prog(t, at(6, 0.6), at(6, 0.8)), cloth: SAFF });
      topTag('रायगढ़ · 6 जून 1674', fadeAt(t, cue(6)[0], 0.4));
      slam('छत्रपति!', 250, t, at(6, 0.75), 140, { x: CX });
      embers(t, 60, 14, 0.85, [0, 150, W, 840]);
    }],
  ]);
};

// ================= Lachit Borphukan, Saraighat 1671 =================
S.lachit = (t) => {
  chapterCard(t, 8, 'लाचित बोरफुकन', 'सराईघाट · 1671');
  beats(t, [
    [0, (t) => {
      mapStage(t);
      subMap(t, { box: { x: 560, y: 70, w: 800, h: 720 }, pins: ['saraighat'], glow: 'saraighat' });
      topTag('ब्रह्मपुत्र · 1671', fadeAt(t, 0, 0.4));
    }],
    [1, (t) => {
      land(t, PAL.river, { seed: 271, moon: [1500, 220, 50] });
      water(GY - 120, t, 0.7);
      for (let i = 0; i < 3; i++) mughalShip(1100 + i * 300 - prog(t, cue(1)[0], cue(2)[1]) * 200, GY - 60, 0.8, t, {});
      if (t < cue(3)[0]) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(250, GY - 70, 300, 30); ctx.restore(); actor(400, GY - 70, 0.7, t, { seated: true, hat: 'pagdi', fa: [0.2, 0.3], still: true }); nameplate('लाचित बोरफुकन', 'अहोम सेनापति · बुख़ार में', fadeAt(t, at(1, 0.5), 0.4) * (1 - prog(t, cue(2)[0] + 0.2, at(2, 0.5)))); }
      if (t > cue(2)[0]) quoteCard('मेरा मामा, मेरे देश से बड़ा नहीं', 250, fadeAt(t, at(2, 0.55), 0.5) * (1 - prog(t, cue(3)[0] - 0.3, cue(3)[0])), 58);
      grade('night', t, 0.3);
    }],
    [3, (t) => {
      cam(t, { z: 1.03, shake: hit(t, at(3, 0.7), 0.7, 12) });
      land(t, PAL.river, { seed: 281, sun: [400, 300, 80] });
      water(GY - 120, t, 0.7);
      for (let i = 0; i < 3; i++) mughalShip(1250 + i * 260 + prog(t, cue(4)[0], cue(4)[1]) * 400, GY - 60, 0.75, t, {});
      for (let i = 0; i < 4; i++) ahomBoat(250 + i * 220 + prog(t, cue(4)[0], cue(4)[1]) * 500, GY - 40, 0.7, t + i, {});
      hero(560, GY - 120, 0.75, t, { hat: 'pagdi', raise: prog(t, at(3, 0.5), at(3, 0.7)) });
      slam('मैं यहीं लड़ूँगा!', 250, t, at(3, 0.7), 110, { x: CX });
      volley(t, at(4, 0.2), 500, 600, 1400, 660, 14, 6, 1.0, 160);
    }],
    [5, (t) => {
      land(t, PAL.royal, { seed: 291 });
      glow(960, 450, 300, '255,200,90', 0.6);
      ctx.save(); ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(960, 450, 120, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a5a10'; ctx.lineWidth = 10; ctx.stroke();
      ctx.fillStyle = '#b8231a'; ctx.fillRect(900, 200, 40, 150); ctx.fillStyle = '#2a4a8a'; ctx.fillRect(980, 200, 40, 150); ctx.restore();
      overlay(() => chip('लाचित बोरफुकन गोल्ड मेडल · NDA', CX, 690, 50, fadeAt(t, at(5, 0.4), 0.4)));
    }],
  ]);
};

// ================= Guru Gobind Singh ji and the Sahibzade =================
S.guru = (t) => {
  chapterCard(t, 9, 'गुरु गोबिंद सिंह जी और साहिबज़ादे', '1675–1705');
  beats(t, [
    [0, (t) => {
      land(t, PAL.dawn, { sun: [960, 520, 140], seed: 301 });
      lamp(960, GY - 60, 1.3, t);
      topTag('गुरु तेग बहादुर जी · हिंद की चादर', fadeAt(t, at(0, 0.6), 0.5));
    }],
    [1, (t) => {
      cam(t, { z: 1 + 0.04 * prog(t, cue(1)[0], cue(1)[1]), fx: 960, fy: 500 });
      land(t, PAL.warm, { sun: [960, 440, 150], seed: 311 });
      rays(960, 440, t, 0.12);
      crowd(t, { x0: -60, x1: W + 60, y: GY + 20, n: 18, s: 0.5, hats: ['turban'], fists: 0.4, rows: 3, seed: 41 });
      hero(960, GY - 60, 0.9, t, { hat: 'turban', beard: true, raise: prog(t, at(1, 0.6), at(1, 0.8)), cloth: '#e07a1a' });
      topTag('आनंदपुर साहिब · बैसाखी 1699', fadeAt(t, at(1, 0.3), 0.4));
      slam('खालसा', 250, t, at(1, 0.75), 130, { x: CX });
    }],
    [2, (t) => {
      cam(t, { z: 1.02, shake: hit(t, at(2, 0.3), 0.6, 8) });
      land(t, PAL.battle, { seed: 321 });
      fort(500, GY, 0.8, t);
      army(t, { x0: 1000, x1: 2050, n: 12, dir: -1, hat: 'helmet' });
      for (let i = 0; i < 3; i++) actor(700 + i * 110, GY, 0.6, t, { hat: 'turban', wpn: 'sword', fa: [2.4, 0.2], face: 1, ph: i });
      topTag('चमकौर', fadeAt(t, cue(2)[0], 0.4));
      overlay(() => chip('साहिबज़ादा अजीत सिंह · साहिबज़ादा जुझार सिंह', CX, 190, 44, fadeAt(t, at(2, 0.55), 0.4)));
    }],
    [3, (t) => {
      bg(PAL.night, 0, CX, 450); grade('cold', t, 0.3);
      ctx.save(); ctx.fillStyle = INK; for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) ctx.fillRect(560 + c * 90 + (r % 2) * 45, GY - 40 - r * 44, 84, 38); ctx.restore();
      glow(860, GY - 220, 260, '255,200,120', 0.5); glow(1060, GY - 220, 260, '255,200,120', 0.5);
      actor(880, GY, 0.55, t, { hat: 'turban', still: true, cloth: '#e07a1a' }); actor(1040, GY, 0.48, t, { hat: 'turban', still: true, cloth: '#e07a1a' });
      overlay(() => chip('साहिबज़ादा ज़ोरावर सिंह · साहिबज़ादा फ़तेह सिंह', CX, 160, 44, fadeAt(t, at(3, 0.15), 0.5)));
      if (t > cue(4)[0]) overlay(() => scroll(CX, 470, 820, 300, prog(t, cue(4)[0] + 0.5, cue(4)[0] + 1.1), ['ज़फ़रनामा', 'जीत का पत्र']));
    }],
  ]);
};

// ================= Maharani Tarabai =================
S.tarabai = (t) => {
  chapterCard(t, 10, 'महारानी ताराबाई', '1700–1707');
  beats(t, [
    [0, (t) => {
      land(t, PAL.deccan, { seed: 331 });
      for (let i = 0; i < 8; i++) tent(150 + i * 230, GY, 0.8, 0.3);
      army(t, { x0: -80, x1: 2050, n: 16, dir: 1, hat: 'helmet', s: 0.4 });
      topTag('औरंगज़ेब · दक्कन', fadeAt(t, 0, 0.4));
      if (t > cue(1)[0]) overlay(() => chip('छत्रपति संभाजी महाराज · बलिदान 1689', CX, 190, 44, fadeAt(t, cue(1)[0], 0.4)));
      if (t > cue(2)[0]) grade('archival', t, prog(t, cue(2)[0], cue(2)[0] + 1));
    }],
    [3, (t) => {
      cam(t, { z: 1 + 0.05 * prog(t, cue(3)[0], cue(4)[1]), fx: 960, fy: 520 });
      land(t, PAL.dawn, { sun: [1500, 380, 120], seed: 341, hy1: 700, ha1: 280 });
      cliffFort(170, GY - 10, 0.42, t); cliffFort(1770, GY - 10, 0.42, t);
      const k = prog(t, at(4, 0.1), cue(4)[1]);
      rider(lerp(500, 1400, k), GY, 1.0, t, { woman: true, hat: 'none', wpn: 'sword', rear: 0.2 + 0.15 * Math.sin(t * 3) });
      if (t > cue(4)[0]) troop(t - cue(4)[0], { y: GY + 10, n: 6, s: 0.5, dir: 1, kind: 'sword', banner: 2, x: -100, speed: 200 });
      nameplate('महारानी ताराबाई', 'मराठा साम्राज्य की संरक्षक', fadeAt(t, at(3, 0.5), 0.4) * (1 - prog(t, cue(5)[0] - 0.4, cue(5)[0])));
      if (t > cue(5)[0]) quoteCard('असली ताक़त कोई मंत्री नहीं, ख़ुद ताराबाई थीं — जदुनाथ सरकार', 250, fadeAt(t, cue(5)[0] + 0.2, 0.5) * (1 - prog(t, cue(6)[0] - 0.3, cue(6)[0])), 50);
      if (t > cue(6)[0]) overlay(() => { chip('दुर्गादास राठौड़ · मारवाड़', 560, 190, 42, fadeAt(t, cue(6)[0], 0.4)); chip('छत्रसाल · बुंदेलखंड', 1360, 190, 42, fadeAt(t, at(6, 0.4), 0.4)); });
    }],
    [7, (t) => {
      land(t, PAL.dusk3, { seed: 351, sun: [960, 600, 140] });
      tent(960, GY, 1.5, 0.1 * (1 - prog(t, cue(7)[0], at(7, 0.5))));
      bhagwa(1450, GY - 400, 400 * prog(t, at(7, 0.6), cue(7)[1]) + 1, t);
      topTag('मार्च 1707', fadeAt(t, cue(7)[0], 0.4));
      slam('स्वराज्य खड़ा था', 260, t, at(7, 0.7), 100, { x: CX });
    }],
  ]);
};

// ================= 1737: the Marathas at Delhi, and the ending =================
S.delhi = (t) => {
  chapterCard(t, 11, 'दिल्ली के दरवाज़े पर', '1737');
  beats(t, [
    [0, (t) => {
      cam(t, { z: 1.02, shake: 3 });
      land(t, PAL.dawn, { sun: [1600, 380, 110], seed: 361 });
      for (let i = 0; i < 7; i++) rider(((t * 380 + i * 300) % 2400) - 300, GY + (i % 2) * 14, 0.7, t, { hat: 'pagdi', wpn: 'spear', ph: i });
      dust(t, 0.6, 6, 650, 840);
      nameplate('पेशवा बाजीराव', '1700–1740', fadeAt(t, at(0, 0.5), 0.4));
      if (t > cue(1)[0]) overlay(() => chip('एक भी बड़ी लड़ाई नहीं हारी (कहा जाता है)', CX, 190, 44, fadeAt(t, cue(1)[0], 0.4)));
    }],
    [2, (t) => {
      cam(t, { z: 1 + 0.04 * prog(t, cue(2)[0], cue(3)[1]), fx: 960, fy: 520 });
      land(t, PAL.warm, { sun: [960, 380, 150], seed: 371 });
      palace(1350, GY - 10, 1.2); wall(560, 280, 900, 2050);
      for (let i = 0; i < 5; i++) rider(200 + i * 150, GY, 0.75, t, { hat: 'pagdi', wpn: 'spear', ph: i, rear: i === 2 ? 0.5 : 0 });
      bhagwa(1000, GY, 420, t);
      topTag('दिल्ली · 1737', fadeAt(t, cue(2)[0], 0.4) * (1 - prog(t, cue(3)[0], at(3, 0.3))));
      if (t > cue(3)[0]) slam('पानीपत की तोपों से… मराठा घोड़ों की टापों तक', 300, t, at(3, 0.4), 70, { x: CX });
    }],
    [4, (t) => {
      cam(t, { z: 1 + 0.06 * prog(t, cue(4)[0], cue(5)[1]), fx: 960, fy: 560 });
      land(t, PAL.warm, { sun: [960, 560, 180], seed: 7, hy1: 720 });
      rays(960, 560, t, 0.15);
      const H10 = [['crown', 0, 'सांगा'], ['crown', 0, 'हेमू'], ['none', 1, 'दुर्गावती'], ['crown', 0, 'प्रताप'], ['none', 1, 'चाँद बीबी'],
        ['crown', 0, 'शिवाजी'], ['pagdi', 0, 'लाचित'], ['turban', 0, 'गुरु गोबिंद सिंह'], ['none', 1, 'ताराबाई'], ['pagdi', 0, 'बाजीराव']];
      H10.forEach(([h, w, n], i) => {
        const x = 150 + i * 180, a = prog(t, at(4, 0.05) + i * 0.3, at(4, 0.05) + i * 0.3 + 0.5);
        if (a <= 0) return;
        ctx.save(); ctx.globalAlpha = a; actor(x, GY, 0.55, t, { hat: h, woman: !!w, wpn: 'sword', fa: [lerp(0.5, 2.7, prog(t, cue(5)[0], cue(5)[0] + 0.8)), 0.2], cloth: SAFF, ph: i }); ctx.restore();
        overlay(() => chip(n, x, GY + 40, 26, a));
      });
      if (t > cue(5)[0]) slam('कभी न झुकने की कहानी', 240, t, at(5, 0.3), 100, { x: CX });
      embers(t, 60, 21, 0.85, [0, 120, W, 840]);
    }],
  ]);
};

S.end = (t) => { wideEnd(t, 'इन दस में से आपका सबसे बड़ा योद्धा कौन?'); };

// YouTube thumbnail (not in the timeline; rendered once by make-doc)
S.thumb = (t) => {
  land(t, PAL.blood, { sun: [960, 600, 220], seed: 7, hy1: 760 });
  rays(960, 600, 2, 0.18);
  [['crown', 0], ['none', 1], ['crown', 0], ['crown', 0], ['turban', 0], ['none', 1], ['pagdi', 0]].forEach(([h, w], i) => {
    const x = 330 + i * 210, s = i === 3 ? 0.95 : 0.7; actor(x, GY + 60, s, 1, { hat: h, woman: !!w, wpn: 'sword', fa: [2.8, 0.2], cloth: SAFF, ph: i, still: true });
  });
  overlay(() => {
    textBlock('200 साल… जो झुके नहीं', CX, 170, 120, { font: SERIF, color: GOLD, glow: 'rgba(255,120,40,0.95)', sw: 20, maxW: 1800 });
    chip('मुग़ल बनाम भारत के वीर · 1526–1737', CX, 330, 56, 1);
  });
};
