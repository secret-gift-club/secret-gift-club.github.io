// MADE by automation/scripts/build-poster-page.js from automation/src/utils/{posterFestivals,photoPoster,posterSound}.js:
// change those, not this.
(function () {
"use strict";
// stubs for the app's own imports
const birthdayOf = () => "";
const GIFEncoder = null, applyPalette = null, quantize = null;
let sfxCtx = null;
const getSfxContext = () => sfxCtx || (sfxCtx = new (window.AudioContext || window.webkitAudioContext)());
/**
 * The photo poster's festivals (utils/photoPoster.js): what each one says
 * ("Merry Christmas", "Eid Mubarak" …), its own colours, its wishes, and what
 * lights up one by one at the bottom, like the gift page's Diwali diyas: the
 * Christmas tree's bulbs and star, five diyas, the new year's digits, Holi's
 * gulal bowls bursting into colour, Eid's lanterns, the rakhi's gems. The
 * drawing helpers come from photoPoster.js as `h` (no import back to it).
 */

// the year a New Year card wishes for: next year from October on
const newYearOf = (now = new Date()) => (now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear());

const FESTIVALS = {
  christmas: {
    label: "🎄 Christmas", top: "Merry", title: "Christmas", emoji: "🎄", center: "tree", decor: "bells", flower: "holly", fall: "snow", riser: "ornaments",
    banner: "Season's Greetings", sub: "Wishing you joy, peace & love this season", hint: "🎄 Tree ki lights jal rahi hain", vibes: true,
    look: {
      dark: true, panel: "rgba(5,30,20,.55)", panelLine: "#ffd166", happy: "#ffffff", title: "#ff4545", glow: null, band: "#ffd166", bandInk: "#7f1d1d",
      wishInk: "#f0fdf4", accent: "#e11d2e", closeInk: "#ffd166", balloons: ["#e11d2e", "#ffd166", "#15803d"], rose: "#c81e2e",
      gifts: [["#b91c1c", "#facc15"], ["#15803d", "#facc15"]], sparkle: "#ffffff", sky: ["#0b3d2e", "#14532d", "#04211a"],
    },
    pop: { word: ["#ffffff", "#ff4545", "#ffd166"], glow: "#ff4545" },
  },
  diwali: {
    label: "🪔 Diwali", top: "Happy", title: "Diwali", emoji: "🪔", center: "diyas", decor: "kandil", flower: "marigold", fall: "confetti", riser: "skylanterns",
    banner: "Shubh Deepavali", sub: "May the diyas light up your life", hint: "🪔 Diye jal rahe hain",
    look: {
      dark: true, panel: "rgba(30,6,40,.55)", panelLine: "#ffb703", happy: "#ffd166", title: "gold", band: "#ff9933", bandInk: "#3b0a12",
      wishInk: "#fff7e6", accent: "#ffb703", closeInk: "#ffd166", balloons: ["#ff9933", "#ff3d7f", "#ffd166"], rose: "#ff8c00",
      gifts: [["#ff3d7f", "#ffd166"], ["#ff9933", "#7c1d6f"]], sparkle: "#ffd98a", sky: ["#1a0533", "#3b0a45", "#0d0221"],
    },
    pop: { word: ["#fff3b0", "#ff9933", "#ff3d7f"], glow: "#ffb703" },
  },
  newyear: {
    label: "🎆 New Year", top: "Happy", title: "New Year", emoji: "🎆", center: "digits", decor: "stars", flower: "sparkles", fall: "confetti", riser: "skylanterns",
    banner: "", sub: "New hopes, new dreams, new beginnings", hint: "🎆 Naye saal ke ank jal rahe hain",
    look: {
      dark: true, panel: "rgba(8,8,30,.55)", panelLine: "#e8c766", happy: "#ffffff", title: "gold", band: "#e8c766", bandInk: "#111827",
      wishInk: "#e2e8f0", accent: "#e8c766", closeInk: "#e8c766", balloons: ["#e8c766", "#22e6ff", "#ffffff"], rose: "#e8c766",
      gifts: [["#1e1b4b", "#e8c766"], ["#e8c766", "#1e1b4b"]], sparkle: "#ffffff", sky: ["#020617", "#1e1b4b", "#000000"],
    },
    pop: { word: ["#fff3b0", "#e8c766", "#22e6ff"], glow: "#e8c766" },
  },
  holi: {
    label: "🎨 Holi", top: "Happy", title: "Holi", emoji: "🎨", center: "pots", decor: "splash", flower: "splash", fall: "dust", riser: "balloons",
    banner: "Rang Barse!", sub: "Rangon bhari shubhkamnayein", hint: "🎨 Gulal ud raha hai",
    look: {
      dark: false, panel: "rgba(255,255,255,.72)", panelLine: "#ec4899", happy: "#7c3aed", title: "#ec4899", band: "#facc15", bandInk: "#6d28d9",
      wishInk: "#3b0764", accent: "#ec4899", closeInk: "#16a34a", balloons: ["#ec4899", "#facc15", "#22c55e"], rose: "#ec4899",
      gifts: [["#22c55e", "#ec4899"], ["#3b82f6", "#facc15"]], sparkle: "#ffffff", sky: ["#fdf2ff", "#ffffff", "#fff7ed"],
    },
    pop: { word: ["#ec4899", "#f59e0b", "#22c55e"], glow: "#ec4899" },
  },
  eid: {
    label: "🌙 Eid", top: "Eid", title: "Mubarak", emoji: "🌙", center: "lanterns", decor: "moon", flower: "marigold", fall: "confetti", riser: "skylanterns",
    banner: "Chaand Mubarak", sub: "Wishing you peace, joy & barakah", hint: "🏮 Lalten jal rahi hain", vibes: true,
    look: {
      dark: true, panel: "rgba(2,40,30,.55)", panelLine: "#e8c766", happy: "#fef3c7", title: "gold", band: "#e8c766", bandInk: "#064e3b",
      wishInk: "#ecfdf5", accent: "#e8c766", closeInk: "#e8c766", balloons: ["#e8c766", "#34d399", "#ffffff"], rose: "#f59e0b",
      gifts: [["#065f46", "#e8c766"], ["#e8c766", "#065f46"]], sparkle: "#fff3c4", sky: ["#022c22", "#065f46", "#011a14"],
    },
    pop: { word: ["#fff3b0", "#e8c766", "#34d399"], glow: "#e8c766" },
  },
  rakhi: {
    label: "🪢 Raksha Bandhan", top: "Happy", title: "Raksha Bandhan", emoji: "🪢", center: "rakhi", decor: "marigold", flower: "marigold", fall: "confetti", riser: "hearts",
    banner: "Bhai-Behen ka Pyaar", sub: "A bond of love, forever", hint: "🪢 Rakhi ke moti chamak rahe hain",
    look: {
      dark: false, panel: "rgba(255,255,255,.72)", panelLine: "#f59e0b", happy: "#9a3412", title: "#e11d48", band: "#fbbf24", bandInk: "#7c2d12",
      wishInk: "#431407", accent: "#e11d48", closeInk: "#c2410c", balloons: ["#f43f5e", "#fbbf24", "#fb923c"], rose: "#fb923c",
      gifts: [["#e11d48", "#fbbf24"], ["#fbbf24", "#e11d48"]], sparkle: "#ffffff", sky: ["#fff1e6", "#fffaf3", "#ffe4cc"],
    },
    pop: { word: ["#fbbf24", "#f43f5e", "#fb923c"], glow: "#f43f5e" },
  },
};

const FESTIVAL_WISHES = {
  christmas: [
    { label: "English", wish: "May the magic of Christmas fill your home with love, joy and peace.", closing: "Season's Greetings..." },
    { label: "Hinglish", wish: "Christmas ki dher saari shubhkamnayein! Aapka ghar khushiyon aur pyaar se bhara rahe.", closing: "Merry Christmas!" },
    { label: "हिंदी", wish: "क्रिसमस का यह त्योहार आपके जीवन में खुशियाँ, शांति और प्यार लाए।", closing: "मेरी क्रिसमस!" },
  ],
  diwali: [
    { label: "English", wish: "May the festival of lights brighten your life with happiness, prosperity and success.", closing: "Shubh Deepavali..." },
    { label: "Hinglish", wish: "Diwali ki hardik shubhkamnayein! Maa Lakshmi aapke ghar sukh, samriddhi aur khushiyan laaye.", closing: "Happy Diwali!" },
    { label: "हिंदी", wish: "दीपों का यह पर्व आपके जीवन में सुख, समृद्धि और खुशियाँ लाए।", closing: "शुभ दीपावली!" },
  ],
  newyear: [
    { label: "English", wish: "May the new year bring you new hopes, new dreams and endless happiness.", closing: "Cheers to the New Year!" },
    { label: "Hinglish", wish: "Naya saal aapke liye dher saari khushiyan, safalta aur nayi umeedein laaye.", closing: "Happy New Year!" },
    { label: "हिंदी", wish: "नया साल आपके लिए नई खुशियाँ, नई सफलताएँ और नई उम्मीदें लाए।", closing: "नव वर्ष की शुभकामनाएँ!" },
  ],
  holi: [
    { label: "English", wish: "May your life be as colourful as Holi, full of joy, laughter and love.", closing: "Bura Na Mano, Holi Hai!" },
    { label: "Hinglish", wish: "Rangon ke is tyohaar par aapki zindagi khushiyon ke rangon se bhar jaaye.", closing: "Happy Holi!" },
    { label: "हिंदी", wish: "रंगों का यह त्योहार आपके जीवन को खुशियों के रंगों से भर दे।", closing: "होली की हार्दिक शुभकामनाएँ!" },
  ],
  eid: [
    { label: "English", wish: "May this Eid bring peace, happiness and prosperity to you and your family.", closing: "Eid Mubarak..." },
    { label: "Hinglish", wish: "Eid ke is mubarak mauke par aapko aur aapke parivaar ko dher saari khushiyan mile.", closing: "Eid Mubarak!" },
    { label: "हिंदी", wish: "ईद का यह मुबारक मौका आपके जीवन में अमन, खुशियाँ और बरकत लाए।", closing: "ईद मुबारक!" },
  ],
  rakhi: [
    { label: "English", wish: "May the bond of love between us grow stronger with every passing year.", closing: "Happy Raksha Bandhan..." },
    { label: "Hinglish", wish: "Bhai-behen ka yeh pyaara rishta hamesha yun hi bana rahe, dher saara pyaar!", closing: "Rakhi ki Shubhkamnayein!" },
    { label: "हिंदी", wish: "भाई-बहन का यह प्यारा रिश्ता सदा यूँ ही बना रहे।", closing: "रक्षाबंधन की शुभकामनाएँ!" },
  ],
};

/** A festival's poster kind from a day's / an occasion's name ("" for none). */
const festivalKindOf = (name = "") => {
  if (/christmas|xmas|क्रिसमस/i.test(name)) return "christmas";
  if (/diwali|deepavali|दिवाली|दीपावली/i.test(name)) return "diwali";
  if (/new\s*year|नया साल|नव वर्ष/i.test(name)) return "newyear";
  if (/holi|होली/i.test(name)) return "holi";
  if (/\beid\b|ईद/i.test(name)) return "eid";
  if (/raksha|rakhi|रक्षा|राखी/i.test(name)) return "rakhi";
  return "";
};

// ---- the centrepiece at the bottom: its still body, and where its lights are

const CX = 470;

/** The lights, in the order they catch: { x, y, type, col? , ch? }. */
const centerLights = (center, year = "") => {
  switch (center) {
    case "diyas":
      return [0, 1, 2, 3, 4].map((i) => ({ x: CX - 140 + i * 70 + 16, y: [1020, 1004, 994, 1004, 1020][i] - 16, type: "flame", s: 0.8 }));
    case "tree":
      return [
        [CX - 40, 862, "#ff4545"], [CX + 36, 846, "#ffd166"], [CX - 82, 942, "#4fc3ff"], [CX + 72, 926, "#ff7ad9"],
        [CX - 112, 1026, "#ffffff"], [CX + 102, 1016, "#7ee081"],
      ].map(([x, y, col]) => ({ x, y, type: "bulb", col })).concat([{ x: CX, y: 742, type: "star" }]);
    case "digits": {
      const chars = String(year).split("");
      return chars.map((ch, i) => ({ x: CX + (i - (chars.length - 1) / 2) * 92, y: 1022, type: "digit", ch }));
    }
    case "pots":
      return ["#ec4899", "#facc15", "#22c55e", "#3b82f6"].map((col, i) => ({ x: CX - 135 + i * 90, y: 1000, type: "puff", col }));
    case "lanterns":
      return [0, 1, 2, 3].map((i) => ({ x: CX - 135 + i * 90, y: i % 3 ? 952 : 972, type: "glow" }));
    case "rakhi":
      return [0, 1, 2, 3, 4].map((i) => {
        const a = Math.PI + (i / 4) * Math.PI;
        return { x: CX + Math.cos(a) * 96, y: 975 + Math.sin(a) * 96, type: "gem", col: ["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f59e0b"][i] };
      });
    default:
      return [];
  }
};

const diya = (g, h, x, y) => {
  g.save();
  const body = g.createLinearGradient(x - 30, y, x + 30, y + 26);
  body.addColorStop(0, "#e2711d");
  body.addColorStop(1, "#7c2d12");
  g.fillStyle = body;
  g.beginPath();
  g.moveTo(x - 30, y);
  g.quadraticCurveTo(x - 26, y + 28, x, y + 28);
  g.quadraticCurveTo(x + 26, y + 28, x + 30, y);
  g.lineTo(x + 40, y - 10); // the spout
  g.lineTo(x + 26, y - 2);
  g.closePath();
  g.fill();
  g.fillStyle = "#5b2a0a";
  g.beginPath();
  g.ellipse(x, y, 30, 7, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#facc15";
  for (let k = -2; k <= 2; k++) {
    g.beginPath();
    g.arc(x + k * 10, y + 15, 2.6, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "#3b1d0a";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(x + 16, y - 2);
  g.lineTo(x + 16, y - 8);
  g.stroke();
  g.restore();
};

const rangoli = (g, h, x, y) => {
  g.save();
  g.translate(x, y);
  g.scale(1, 0.32);
  [["#ec4899", 200], ["#facc15", 170], ["#22c55e", 140], ["#3b82f6", 110], ["#f97316", 80]].forEach(([col, r], i) => {
    g.fillStyle = col;
    g.beginPath();
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2 + i * 0.2;
      g.quadraticCurveTo(Math.cos(a - 0.2) * r * 1.1, Math.sin(a - 0.2) * r * 1.1, Math.cos(a) * r * (k % 2 ? 0.88 : 1), Math.sin(a) * r * (k % 2 ? 0.88 : 1));
    }
    g.closePath();
    g.fill();
  });
  g.restore();
};

const lantern = (g, x, y) => {
  g.save();
  g.fillStyle = "#b8862b";
  g.beginPath();
  g.moveTo(x - 26, y - 40);
  g.quadraticCurveTo(x, y - 78, x + 26, y - 40);
  g.closePath();
  g.fill();
  g.strokeStyle = "#e8c766";
  g.lineWidth = 3;
  g.beginPath();
  g.arc(x, y - 80, 8, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = "rgba(20,40,40,.85)";
  g.beginPath();
  g.moveTo(x - 24, y - 40);
  g.lineTo(x + 24, y - 40);
  g.lineTo(x + 18, y + 30);
  g.lineTo(x - 18, y + 30);
  g.closePath();
  g.fill();
  g.strokeStyle = "#e8c766";
  g.lineWidth = 3;
  g.stroke();
  g.beginPath();
  g.moveTo(x, y - 40);
  g.lineTo(x, y + 30);
  g.stroke();
  g.fillStyle = "#b8862b";
  g.fillRect(x - 22, y + 30, 44, 10);
  g.restore();
};

/** The centrepiece's still body (its lights unlit). */
const drawCenter = (g, h, center, { year = "", cakeLabel = "" } = {}) => {
  switch (center) {
    case "diyas":
      rangoli(g, h, CX, 1040);
      [0, 1, 2, 3, 4].forEach((i) => diya(g, h, CX - 140 + i * 70, [1020, 1004, 994, 1004, 1020][i]));
      return;
    case "tree": {
      g.save();
      g.fillStyle = "#6b3a20";
      g.fillRect(CX - 18, 1030, 36, 40);
      [[760, 880, 90], [825, 965, 135], [900, 1045, 180]].forEach(([top, bot, half]) => {
        const gr = g.createLinearGradient(CX - half, 0, CX + half, 0);
        gr.addColorStop(0, "#14532d");
        gr.addColorStop(0.5, "#22803d");
        gr.addColorStop(1, "#0f3d22");
        g.fillStyle = gr;
        g.beginPath();
        g.moveTo(CX, top);
        g.quadraticCurveTo(CX + half * 0.5, (top + bot) / 2, CX + half, bot);
        g.quadraticCurveTo(CX, bot + 18, CX - half, bot);
        g.quadraticCurveTo(CX - half * 0.5, (top + bot) / 2, CX, top);
        g.fill();
        g.fillStyle = "rgba(255,255,255,.85)"; // snow on its edge
        g.beginPath();
        g.ellipse(CX, bot + 4, half * 0.92, 8, 0, 0, Math.PI);
        g.fill();
      });
      // a gold garland
      g.strokeStyle = "#e8c766";
      g.lineWidth = 3;
      [[800, 870, 70], [880, 950, 110], [960, 1030, 150]].forEach(([y1, y2, half]) => {
        g.beginPath();
        g.moveTo(CX - half * 0.6, y1 + 20);
        g.quadraticCurveTo(CX, y2, CX + half * 0.75, y1 + 10);
        g.stroke();
      });
      centerLights("tree").forEach((l) => {
        if (l.type !== "bulb") return;
        g.fillStyle = "rgba(30,30,30,.6)";
        g.beginPath();
        g.arc(l.x, l.y, 9, 0, Math.PI * 2);
        g.fill();
      });
      // the star, unlit
      g.globalAlpha = 0.5;
      star(g, CX, 742, 34, "#b8a46a");
      g.restore();
      return;
    }
    case "digits": {
      g.save();
      g.font = `900 140px "Cinzel", "Playfair Display", Georgia, serif`;
      g.textAlign = "center";
      g.textBaseline = "alphabetic";
      centerLights("digits", year).forEach((l) => {
        g.lineWidth = 3;
        g.strokeStyle = "rgba(232,199,102,.45)";
        g.strokeText(l.ch, l.x, l.y + 50);
      });
      g.restore();
      return;
    }
    case "pots":
      centerLights("pots").forEach((l) => {
        g.save();
        g.fillStyle = l.col;
        g.beginPath();
        g.ellipse(l.x, l.y + 12, 34, 22, 0, Math.PI, 0);
        g.fill();
        const b = g.createLinearGradient(l.x - 40, 0, l.x + 40, 0);
        b.addColorStop(0, "#a8761d");
        b.addColorStop(0.5, "#f6e27a");
        b.addColorStop(1, "#a8761d");
        g.fillStyle = b;
        g.beginPath();
        g.moveTo(l.x - 40, l.y + 10);
        g.quadraticCurveTo(l.x - 36, l.y + 52, l.x, l.y + 52);
        g.quadraticCurveTo(l.x + 36, l.y + 52, l.x + 40, l.y + 10);
        g.closePath();
        g.fill();
        g.restore();
      });
      return;
    case "lanterns":
      centerLights("lanterns").forEach((l) => lantern(g, l.x, l.y));
      return;
    case "rakhi": {
      g.save();
      g.lineWidth = 7;
      [["#dc2626", 0], ["#facc15", 5]].forEach(([col, dy]) => {
        g.strokeStyle = col;
        g.beginPath();
        for (let k = 0; k <= 40; k++) {
          const x = CX - 230 + k * 11.5;
          const y = 975 + dy + Math.sin(k * 0.6) * 4;
          if (k) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        g.stroke();
      });
      // the tassels
      [CX - 236, CX + 236].forEach((x) => {
        g.fillStyle = "#facc15";
        g.beginPath();
        g.arc(x, 978, 12, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = "#dc2626";
        g.lineWidth = 3;
        for (let k = -2; k <= 2; k++) {
          g.beginPath();
          g.moveTo(x, 988);
          g.lineTo(x + k * 5, 1024);
          g.stroke();
        }
      });
      // the flower in the middle, petal on petal
      [["#f97316", 78, 14], ["#dc2626", 60, 12], ["#facc15", 42, 10], ["#be123c", 24, 8]].forEach(([col, r, n]) => {
        g.fillStyle = col;
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2;
          g.beginPath();
          g.ellipse(CX + Math.cos(a) * r * 0.55, 975 + Math.sin(a) * r * 0.55, r * 0.5, r * 0.26, a, 0, Math.PI * 2);
          g.fill();
        }
      });
      g.fillStyle = "#fde68a";
      g.beginPath();
      g.arc(CX, 975, 14, 0, Math.PI * 2);
      g.fill();
      centerLights("rakhi").forEach((l) => {
        g.fillStyle = "rgba(80,40,20,.55)";
        g.beginPath();
        g.arc(l.x, l.y, 11, 0, Math.PI * 2);
        g.fill();
      });
      g.restore();
      return;
    }
    default:
      h.cake(g, CX, 1040, cakeLabel, false);
  }
};

const star = (g, x, y, r, col) => {
  g.fillStyle = col;
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
};

// a flame (a candle's, a diya's): its glow, the flame and its bright core; `f` its flicker, `grow` 0 … 1 as it catches
const flame = (g, x, y, f, grow, sway, s = 1) => {
  const glow = g.createRadialGradient(x, y - 2, 2, x, y - 2, (26 * f + 1) * s);
  glow.addColorStop(0, "#fff7c2");
  glow.addColorStop(0.4, "#ffb703aa");
  glow.addColorStop(1, "#ffb70300");
  g.fillStyle = glow;
  g.beginPath();
  g.arc(x, y - 2, (26 * f + 1) * s, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#ffd166";
  g.beginPath();
  g.ellipse(x + sway, y - (f - 1) * 8, 5 * grow * s, 11 * f * s, sway * 0.05, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#fffbe6";
  g.beginPath();
  g.ellipse(x + sway, y + 4 * s, 2.2 * grow * s, 5 * f * s, 0, 0, Math.PI * 2);
  g.fill();
};

/** One light, lit: `on` seconds since it caught, `t` the clock. */
const drawLight = (g, h, l, t, on, i) => {
  const grow = Math.min(1, on / 0.35);
  const f = grow * (1 + 0.12 * Math.sin(t * 18 + i * 2) + 0.06 * Math.sin(t * 31 + i * 5));
  const tw = 0.75 + 0.25 * Math.sin(t * 4 + i * 1.3);
  switch (l.type) {
    case "flame":
      flame(g, l.x, l.y, f, grow, Math.sin(t * 7 + i) * 1.5, l.s || 1);
      return;
    case "bulb": {
      const r = 26 * grow * tw;
      const gl = g.createRadialGradient(l.x, l.y, 1, l.x, l.y, r + 1);
      gl.addColorStop(0, "#ffffff");
      gl.addColorStop(0.3, l.col);
      gl.addColorStop(1, `${l.col}00`);
      g.fillStyle = gl;
      g.beginPath();
      g.arc(l.x, l.y, r + 1, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = l.col;
      g.beginPath();
      g.arc(l.x, l.y, 9 * grow, 0, Math.PI * 2);
      g.fill();
      return;
    }
    case "star": {
      g.save();
      g.shadowColor = "#ffd166";
      g.shadowBlur = 40 * grow;
      const gr = g.createRadialGradient(l.x, l.y, 2, l.x, l.y, 40);
      gr.addColorStop(0, "#fffbe6");
      gr.addColorStop(1, "#f6c445");
      star(g, l.x, l.y, 36 * grow * (0.95 + 0.05 * tw), gr);
      g.restore();
      h.sparkle(g, l.x + 30, l.y - 26, 8 * tw * grow, "#ffffff");
      return;
    }
    case "digit": {
      g.save();
      g.font = `900 ${Math.round(140 * (0.6 + 0.4 * grow))}px "Cinzel", "Playfair Display", Georgia, serif`;
      g.textAlign = "center";
      g.textBaseline = "alphabetic";
      const gr = g.createLinearGradient(0, l.y - 60, 0, l.y + 50);
      gr.addColorStop(0, "#fff3b0");
      gr.addColorStop(0.5, "#e8c766");
      gr.addColorStop(1, "#b8862b");
      g.shadowColor = "#ffd98a";
      g.shadowBlur = 26 * tw;
      g.fillStyle = gr;
      g.fillText(l.ch, l.x, l.y + 50);
      g.restore();
      return;
    }
    case "puff": {
      // gulal bursting up out of its bowl, then hanging there as a cloud
      const rise = Math.min(1, on / 0.8);
      const r0 = h.rng(17 + i);
      g.save();
      for (let k = 0; k < 9; k++) {
        const ox = (r0() - 0.5) * 90 * rise, oy = -r0() * 130 * rise - 10, rr = (20 + r0() * 30) * (0.4 + 0.6 * rise);
        const p = g.createRadialGradient(l.x + ox, l.y + oy, 1, l.x + ox, l.y + oy, rr);
        p.addColorStop(0, `${l.col}cc`);
        p.addColorStop(1, `${l.col}00`);
        g.fillStyle = p;
        g.beginPath();
        g.arc(l.x + ox, l.y + oy + Math.sin(t * 2 + k) * 3, rr, 0, Math.PI * 2);
        g.fill();
      }
      g.restore();
      return;
    }
    case "glow": {
      const gl = g.createRadialGradient(l.x, l.y - 6, 2, l.x, l.y - 6, 80 * grow);
      gl.addColorStop(0, `rgba(255,214,120,${0.55 * f})`);
      gl.addColorStop(1, "rgba(255,180,60,0)");
      g.fillStyle = gl;
      g.beginPath();
      g.arc(l.x, l.y - 6, 80 * grow, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = `rgba(255,${190 + Math.round(30 * tw)},110,${0.85 * grow})`;
      g.beginPath();
      g.moveTo(l.x - 20, l.y - 36);
      g.lineTo(l.x + 20, l.y - 36);
      g.lineTo(l.x + 15, l.y + 26);
      g.lineTo(l.x - 15, l.y + 26);
      g.closePath();
      g.fill();
      flame(g, l.x, l.y - 2, f, grow, 0, 0.6);
      return;
    }
    case "gem": {
      const gl = g.createRadialGradient(l.x, l.y, 1, l.x, l.y, 30 * grow);
      gl.addColorStop(0, "#ffffff");
      gl.addColorStop(0.35, l.col);
      gl.addColorStop(1, `${l.col}00`);
      g.fillStyle = gl;
      g.beginPath();
      g.arc(l.x, l.y, 30 * grow, 0, Math.PI * 2);
      g.fill();
      h.sparkle(g, l.x + 8, l.y - 8, 7 * tw * grow, "#ffffff");
      return;
    }
    default:
  }
};

// ---- what hangs / floats in the top left corner, moving with `t`

const bell = (g, x, y, s, ang) => {
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.strokeStyle = "#7f1d1d";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, -y);
  g.lineTo(0, -s * 0.9);
  g.stroke();
  const gr = g.createLinearGradient(-s, 0, s, 0);
  gr.addColorStop(0, "#a8761d");
  gr.addColorStop(0.45, "#fff3b0");
  gr.addColorStop(1, "#b8862b");
  g.fillStyle = gr;
  g.beginPath();
  g.moveTo(-s * 0.35, -s * 0.9);
  g.quadraticCurveTo(-s * 0.55, 0, -s, s * 0.7);
  g.lineTo(s, s * 0.7);
  g.quadraticCurveTo(s * 0.55, 0, s * 0.35, -s * 0.9);
  g.closePath();
  g.fill();
  g.fillStyle = "#7c4a12";
  g.beginPath();
  g.arc(0, s * 0.78, s * 0.18, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#dc2626";
  g.beginPath();
  g.ellipse(-s * 0.3, -s * 0.95, s * 0.3, s * 0.14, -0.4, 0, Math.PI * 2);
  g.ellipse(s * 0.3, -s * 0.95, s * 0.3, s * 0.14, 0.4, 0, Math.PI * 2);
  g.fill();
  g.restore();
};

const kandil = (g, x, y, s, ang, col) => {
  g.save();
  g.translate(x, 0);
  g.rotate(ang);
  g.strokeStyle = "rgba(255,220,150,.7)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(0, y - s);
  g.stroke();
  g.translate(0, y);
  const glow = g.createRadialGradient(0, 0, 4, 0, 0, s * 2);
  glow.addColorStop(0, "rgba(255,200,80,.45)");
  glow.addColorStop(1, "rgba(255,200,80,0)");
  g.fillStyle = glow;
  g.beginPath();
  g.arc(0, 0, s * 2, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = col;
  g.beginPath();
  g.moveTo(0, -s);
  g.lineTo(s * 0.8, 0);
  g.lineTo(0, s);
  g.lineTo(-s * 0.8, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = "#ffd166";
  g.lineWidth = 3;
  g.stroke();
  g.beginPath();
  g.moveTo(-s * 0.8, 0);
  g.lineTo(s * 0.8, 0);
  g.stroke();
  g.strokeStyle = "#ffd166";
  for (let k = -2; k <= 2; k++) {
    g.beginPath();
    g.moveTo(0, s);
    g.lineTo(k * 4, s + 30);
    g.stroke();
  }
  g.restore();
};

const crescent = (g, x, y, r, col) => {
  const off = document.createElement("canvas");
  off.width = off.height = Math.ceil(r * 2 + 8);
  const o = off.getContext("2d");
  const c = r + 4;
  const gr = o.createLinearGradient(0, 0, off.width, off.height);
  gr.addColorStop(0, "#fff3b0");
  gr.addColorStop(1, col);
  o.fillStyle = gr;
  o.beginPath();
  o.arc(c, c, r, 0, Math.PI * 2);
  o.fill();
  o.globalCompositeOperation = "destination-out";
  o.beginPath();
  o.arc(c + r * 0.42, c - r * 0.18, r * 0.86, 0, Math.PI * 2);
  o.fill();
  g.save();
  g.shadowColor = "#ffe9a8";
  g.shadowBlur = 30;
  g.drawImage(off, x - c, y - c);
  g.restore();
};

/** The top left corner's things for `decor`, at `t`. */
const drawDecor = (g, h, decor, t) => {
  const bob = (i) => Math.sin(t * 1.3 + i * 1.7) * 9;
  switch (decor) {
    case "bells":
      bell(g, 80, 130 + bob(0) * 0.3, 44, Math.sin(t * 2.2) * 0.18);
      bell(g, 160, 90 + bob(1) * 0.3, 34, Math.sin(t * 2.2 + 1) * 0.2);
      // holly at the top
      [[40, 20], [110, 14], [180, 24]].forEach(([x, y], i) => {
        h.leaf(g, x, y, 54, 0.3 + i);
        h.leaf(g, x, y, 54, 2.6 + i);
      });
      [[60, 30], [74, 22], [126, 28]].forEach(([x, y]) => {
        g.fillStyle = "#dc2626";
        g.beginPath();
        g.arc(x, y, 9, 0, Math.PI * 2);
        g.fill();
      });
      return;
    case "kandil":
      kandil(g, 80, 150, 38, Math.sin(t * 1.4) * 0.08, "#f97316");
      kandil(g, 175, 95, 30, Math.sin(t * 1.4 + 1) * 0.1, "#db2777");
      kandil(g, 40, 270, 26, Math.sin(t * 1.4 + 2) * 0.1, "#a21caf");
      return;
    case "moon":
      crescent(g, 110, 120 + bob(0) * 0.4, 70, "#e8c766");
      h.sparkle(g, 190, 70, 10 + 4 * Math.sin(t * 3), "#fff3c4");
      h.sparkle(g, 60, 230, 8 + 3 * Math.sin(t * 3 + 1), "#fff3c4");
      kandil(g, 200, 200, 24, Math.sin(t * 1.3) * 0.1, "#047857");
      return;
    case "stars":
      for (let i = 0; i < 7; i++) {
        const x = 40 + ((i * 53) % 200), y = 40 + ((i * 89) % 230);
        h.sparkle(g, x, y, (8 + (i % 3) * 6) * (0.5 + 0.5 * Math.sin(t * 3 + i)), i % 2 ? "#e8c766" : "#ffffff");
      }
      return;
    case "splash":
      [["#ec4899", 70, 90, 70], ["#facc15", 170, 60, 50], ["#22c55e", 60, 220, 55], ["#3b82f6", 170, 180, 40]].forEach(([col, x, y, r], i) => {
        const rr = r * (1 + 0.06 * Math.sin(t * 2 + i));
        const p = g.createRadialGradient(x, y + bob(i) * 0.5, 2, x, y, rr);
        p.addColorStop(0, `${col}ee`);
        p.addColorStop(0.7, `${col}88`);
        p.addColorStop(1, `${col}00`);
        g.fillStyle = p;
        g.beginPath();
        g.arc(x, y + bob(i) * 0.5, rr, 0, Math.PI * 2);
        g.fill();
      });
      return;
    case "marigold":
      [40, 95, 150, 205].forEach((x, i) => {
        const sw = Math.sin(t * 1.5 + i) * 6;
        for (let k = 0; k < 6 - (i % 2) * 2; k++) {
          g.fillStyle = k % 2 ? "#facc15" : "#f97316";
          g.beginPath();
          g.arc(x + sw * (k / 6), 18 + k * 30, 14, 0, Math.PI * 2);
          g.fill();
        }
      });
      return;
    default:
  }
};

/** The bottom left corner's flowers for `flower` (still). */
const drawFlowers = (g, h, flower, L) => {
  switch (flower) {
    case "marigold":
      [[30, 900], [95, 880], [160, 905], [60, 965], [130, 960], [200, 955], [20, 1030], [95, 1035], [170, 1030]].forEach(([x, y], i) => {
        h.leaf(g, x - 20, y + 20, 50, i);
        const r = 34;
        [["#c2410c", r], ["#f97316", r * 0.8], ["#facc15", r * 0.5]].forEach(([col, rr], k) => {
          g.fillStyle = i % 2 && k === 1 ? "#fbbf24" : col;
          for (let p = 0; p < 12; p++) {
            const a = (p / 12) * Math.PI * 2;
            g.beginPath();
            g.arc(x + Math.cos(a) * rr * 0.5, y + Math.sin(a) * rr * 0.5, rr * 0.38, 0, Math.PI * 2);
            g.fill();
          }
        });
      });
      return;
    case "holly":
      [[40, 940], [120, 920], [80, 1010], [180, 1000], [20, 1060], [150, 1060]].forEach(([x, y], i) => {
        h.leaf(g, x, y, 80, -0.6 + i);
        h.leaf(g, x, y, 80, 2.2 + i);
      });
      [[70, 950], [86, 962], [150, 930], [110, 1020], [126, 1012], [60, 1050]].forEach(([x, y]) => {
        const b = g.createRadialGradient(x - 3, y - 3, 1, x, y, 12);
        b.addColorStop(0, "#ff8a8a");
        b.addColorStop(1, "#b91c1c");
        g.fillStyle = b;
        g.beginPath();
        g.arc(x, y, 12, 0, Math.PI * 2);
        g.fill();
      });
      return;
    case "splash":
      [["#ec4899", 60, 960, 90], ["#22c55e", 170, 1010, 70], ["#facc15", 40, 1060, 60], ["#3b82f6", 150, 900, 50]].forEach(([col, x, y, r]) => {
        const p = g.createRadialGradient(x, y, 2, x, y, r);
        p.addColorStop(0, `${col}ee`);
        p.addColorStop(1, `${col}00`);
        g.fillStyle = p;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      });
      return;
    case "sparkles":
      for (let i = 0; i < 14; i++) h.sparkle(g, 20 + ((i * 41) % 220), 880 + ((i * 67) % 190), 6 + (i % 4) * 4, i % 2 ? "#e8c766" : "#ffffff");
      return;
    default: {
      [[-20, 30], [50, 10], [110, 40], [20, 90], [90, 100], [160, 85], [-10, 150], [60, 160], [140, 150]].forEach(([dx, dy], i) =>
        h.leaf(g, 40 + dx, 880 + dy, 70, -0.8 + i * 0.35),
      );
      [[30, 900], [95, 880], [160, 905], [60, 965], [130, 960], [200, 955], [20, 1030], [95, 1035], [170, 1030]].forEach(([x, yy]) =>
        h.rose(g, x, yy, 38, L.rose),
      );
      g.fillStyle = "#ffffff";
      const rw = h.rng(5);
      for (let i = 0; i < 30; i++) {
        g.beginPath();
        g.arc(10 + rw() * 230, 850 + rw() * 220, 3 + rw() * 3, 0, Math.PI * 2);
        g.fill();
      }
    }
  }
};

/** What rises past the pop-up's sides: balloons, hearts, ornaments, sky lanterns. */
const drawRiser = (g, h, riser, x, y, i, dt, P) => {
  switch (riser) {
    case "hearts":
      h.heart(g, x, y, 46 + i * 6, [P.word[0], P.word[1], "#ff8fb1", P.word[2]][i % 4]);
      return;
    case "ornaments": {
      const col = ["#ef4444", "#facc15", "#3b82f6", "#22c55e"][i % 4];
      const b = g.createRadialGradient(x - 10, y - 10, 2, x, y, 34);
      b.addColorStop(0, "#ffffff");
      b.addColorStop(0.3, col);
      b.addColorStop(1, "#111");
      g.fillStyle = b;
      g.beginPath();
      g.arc(x, y, 34, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "#e8c766";
      g.fillRect(x - 9, y - 44, 18, 12);
      return;
    }
    case "skylanterns": {
      const gl = g.createRadialGradient(x, y, 4, x, y, 70);
      gl.addColorStop(0, "rgba(255,200,90,.5)");
      gl.addColorStop(1, "rgba(255,200,90,0)");
      g.fillStyle = gl;
      g.beginPath();
      g.arc(x, y, 70, 0, Math.PI * 2);
      g.fill();
      const body = g.createLinearGradient(0, y - 40, 0, y + 40);
      body.addColorStop(0, "#ffe7a3");
      body.addColorStop(1, "#ff8c1a");
      g.fillStyle = body;
      g.beginPath();
      g.moveTo(x - 26, y - 38);
      g.lineTo(x + 26, y - 38);
      g.lineTo(x + 20, y + 36);
      g.lineTo(x - 20, y + 36);
      g.closePath();
      g.fill();
      return;
    }
    default:
      h.balloon(g, x + Math.sin(dt * 1.5 + i) * 10, y, 44 + i * 4, ["#ff5e7e", "#ffd60a", "#22c3ff", "#b05cff"][i % 4]);
  }
};

/**
 * A photo greeting poster (1080×1080) like the ones shared on WhatsApp /
 * Instagram: the person's photo on the left, "Happy Birthday" or "Happy
 * Anniversary" in script on the right, their name on a yellow brush
 * banner, the wish, and balloons / hearts, roses, a cake and gifts drawn
 * around it; or a festival's (Christmas, Diwali, New Year, Holi, Eid, Raksha
 * Bandhan: utils/posterFestivals.js), each with its own colours, corners and
 * what lights up at the bottom. 🖼 on the Festivals card (components/panels/PhotoPosterDrawer.jsx).
 */


const POSTER_SIZE = 1080;

const POSTER_KINDS = {
  birthday: {
    label: "🎂 Birthday", top: "Happy", title: "Birthday", cake: "Happy Birthday", center: "cake", blow: true, emoji: "🎂", decor: "balloons", flower: "rose",
    fall: "confetti", riser: "balloons", banner: "", sub: "Many many happy returns of the day", hint: "🕯️ Mombattiyan jal rahi hain",
  },
  anniversary: {
    label: "💞 Anniversary", top: "Happy", title: "Anniversary", cake: "Happy Anniversary", center: "cake", blow: true, emoji: "💞", decor: "hearts", flower: "rose",
    fall: "confetti", riser: "hearts", banner: "", sub: "Many more years of love & togetherness", hint: "🕯️ Mombattiyan jal rahi hain",
  },
  ...FESTIVALS,
};
/** A kind's whole description (birthday when unknown). */
const kindOf = (kind) => POSTER_KINDS[kind] || POSTER_KINDS.birthday;
// a New Year card's year: its "age" box when that's a year, else the coming one
const yearOf = (opts) => (/^\d{4}$/.test(String(opts.age || "")) ? String(opts.age) : String(newYearOf()));

const POSTER_WISHES = {
  birthday: [
    { label: "English", wish: "May God bless you with good health, happiness, success and prosperity in life.", closing: "Have a Great Year Ahead..." },
    { label: "Hinglish", wish: "Bhagwan aapko achchi sehat, khushiyan, safalta aur samriddhi pradaan kare.", closing: "Janmdin ki Hardik Shubhkamnayein!" },
    { label: "हिंदी", wish: "ईश्वर आपको उत्तम स्वास्थ्य, सुख, सफलता और समृद्धि प्रदान करे।", closing: "जन्मदिन की हार्दिक शुभकामनाएँ!" },
    { label: "Short", wish: "Wishing you endless smiles, love and laughter today and always.", closing: "Enjoy Your Special Day..." },
  ],
  anniversary: [
    { label: "English", wish: "May your bond grow stronger with every passing year, filled with love, trust and happiness.", closing: "Happy Married Life..." },
    { label: "Hinglish", wish: "Aapki jodi hamesha salamat rahe, jeevan pyaar aur khushiyon se bhara rahe.", closing: "Shaadi ki Saalgirah Mubarak!" },
    { label: "हिंदी", wish: "आपकी जोड़ी सदा सलामत रहे, जीवन प्रेम और खुशियों से भरा रहे।", closing: "सालगिरह मुबारक!" },
    { label: "Short", wish: "Cheers to love, laughter and a lifetime of togetherness.", closing: "Stay Blessed Together..." },
  ],
  ...FESTIVAL_WISHES,
};

const ANNIVERSARY = /anniversary|saalgirah|salgirah|सालगिरह/i;
const BIRTHDAY_WORDS = /\s*('s)?\s*(birthday|janmdin|bday)\s*/gi;
const ANNI_WORDS = /\s*('s)?\s*(wedding\s+)?(anniversary|saalgirah|salgirah)\s*/gi;

/** What the poster starts as for a festival card's day: { kind, name }. */
const posterDefaults = (fest) => {
  const fname = fest?.name || "";
  const festival = festivalKindOf(fname);
  if (festival) return { kind: festival, name: "" };
  if (ANNIVERSARY.test(fname)) return { kind: "anniversary", name: fname.replace(ANNI_WORDS, " ").trim() };
  const person = birthdayOf(fest || {});
  if (person) return { kind: "birthday", name: person };
  if (fest?.icon === "🎂" || /birthday|janmdin/i.test(fname)) return { kind: "birthday", name: fname.replace(BIRTHDAY_WORDS, " ").trim() };
  return { kind: "birthday", name: "" };
};

// ---- fonts: Google Fonts when online; offline the fallbacks below are used
const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Cinzel:wght@700&family=Playfair+Display:ital,wght@0,700;1,500&family=Lora:wght@500;700&family=Tiro+Devanagari+Hindi&display=swap";
const DEVA = '"Tiro Devanagari Hindi"';
const SCRIPT = `"Dancing Script", ${DEVA}, cursive`;
const VIBES = `"Great Vibes", "Dancing Script", ${DEVA}, cursive`;
const SERIF = `"Lora", ${DEVA}, Georgia, serif`;
const PLAYFAIR = `"Playfair Display", ${DEVA}, Georgia, serif`;
const CINZEL = `"Cinzel", "Playfair Display", ${DEVA}, Georgia, serif`;
let fontsReady = null;
const loadPosterFonts = () => {
  if (fontsReady) return fontsReady;
  if (typeof document === "undefined" || !document.fonts) return (fontsReady = Promise.resolve());
  if (!document.querySelector(`link[href="${FONT_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_CSS;
    document.head.appendChild(link);
  }
  const all = Promise.all([
    document.fonts.load('700 100px "Dancing Script"'),
    document.fonts.load('400 100px "Great Vibes"'),
    document.fonts.load('700 60px "Cinzel"'),
    document.fonts.load('700 60px "Playfair Display"'),
    document.fonts.load('italic 500 30px "Playfair Display"'),
    document.fonts.load('700 60px "Lora"'),
    document.fonts.load('500 30px "Lora"'),
    document.fonts.load('400 30px "Tiro Devanagari Hindi"', "अ"),
  ]).catch(() => {});
  // never wait long: offline, draw with the fallbacks
  fontsReady = Promise.race([all, new Promise((r) => setTimeout(r, 2500))]);
  return fontsReady;
};

/** An image file (from an <input type=file>) as a decoded <img>. */
const imageFromFile = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("not an image"));
    };
    img.src = url;
  });

// ---- drawing helpers
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, v + amt));
  return `#${((ch(n >> 16) << 16) | (ch((n >> 8) & 255) << 8) | ch(n & 255)).toString(16).padStart(6, "0")}`;
};

const fit = (g, text, font, maxSize, maxW) => {
  let s = maxSize;
  g.font = font.replace("{s}", s);
  while (g.measureText(text).width > maxW && s > 14) {
    s -= 2;
    g.font = font.replace("{s}", s);
  }
};

const wrap = (g, text, maxW) => {
  const lines = [];
  let line = "";
  for (const w of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${w}` : w;
    if (g.measureText(next).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
};

const cover = (g, img, x, y, w, h, zoom = 1, posY = 0.5) => {
  const s = Math.max(w / img.width, h / img.height) * zoom;
  const iw = img.width * s;
  const ih = img.height * s;
  g.drawImage(img, x + (w - iw) / 2, y + (h - ih) * posY, iw, ih);
};

const balloon = (g, x, y, r, col) => {
  g.save();
  g.strokeStyle = "rgba(120,120,120,.7)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(x, y + r * 1.15);
  g.bezierCurveTo(x + 15, y + r * 1.6, x - 15, y + r * 2.1, x + 5, y + r * 2.8);
  g.stroke();
  const grad = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r * 1.2);
  grad.addColorStop(0, "#ffffffcc");
  grad.addColorStop(0.25, col);
  grad.addColorStop(1, shade(col, -40));
  g.fillStyle = grad;
  g.beginPath();
  g.ellipse(x, y, r, r * 1.15, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = shade(col, -30);
  g.beginPath();
  g.moveTo(x - 8, y + r * 1.2);
  g.lineTo(x + 8, y + r * 1.2);
  g.lineTo(x, y + r * 1.08);
  g.fill();
  g.restore();
};

const heart = (g, x, y, s, col) => {
  g.save();
  g.translate(x, y);
  g.scale(s / 30, s / 30);
  g.fillStyle = col;
  g.beginPath();
  g.moveTo(0, 10);
  g.bezierCurveTo(-30, -12, -12, -34, 0, -16);
  g.bezierCurveTo(12, -34, 30, -12, 0, 10);
  g.fill();
  g.restore();
};

const rose = (g, x, y, r, col) => {
  g.save();
  const grad = g.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
  grad.addColorStop(0, shade(col, 40));
  grad.addColorStop(1, shade(col, -50));
  g.fillStyle = grad;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = shade(col, -70);
  g.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.arc(x + i * 2, y - i * 2, r * (0.75 - i * 0.22), 0.4 + i, Math.PI * 1.6 + i);
    g.stroke();
  }
  g.restore();
};

const leaf = (g, x, y, len, ang) => {
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.fillStyle = "#2f7d32";
  g.beginPath();
  g.moveTo(0, 0);
  g.quadraticCurveTo(len / 2, -len / 3, len, 0);
  g.quadraticCurveTo(len / 2, len / 3, 0, 0);
  g.fill();
  g.restore();
};

const gift = (g, x, y, w, h, box, rib) => {
  g.save();
  g.fillStyle = box;
  g.fillRect(x, y, w, h);
  g.fillStyle = shade(box, 25);
  g.fillRect(x - 6, y - h * 0.18, w + 12, h * 0.2);
  g.fillStyle = rib;
  g.fillRect(x + w / 2 - w * 0.07, y - h * 0.18, w * 0.14, h * 1.18);
  g.fillRect(x, y + h * 0.35, w, h * 0.12);
  g.beginPath();
  g.ellipse(x + w / 2 - w * 0.18, y - h * 0.28, w * 0.18, h * 0.12, -0.4, 0, Math.PI * 2);
  g.ellipse(x + w / 2 + w * 0.18, y - h * 0.28, w * 0.18, h * 0.12, 0.4, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = shade(rib, -40);
  g.beginPath();
  g.arc(x + w / 2, y - h * 0.22, w * 0.06, 0, Math.PI * 2);
  g.fill();
  g.restore();
};

const cake = (g, cx, by, label, flames = true) => {
  g.save();
  const w = 300;
  const h = 120;
  const top = by - h;
  g.fillStyle = "#f3f3f3";
  g.beginPath();
  g.ellipse(cx, by + 6, w * 0.62, 30, 0, 0, Math.PI * 2);
  g.fill();
  const body = g.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
  body.addColorStop(0, "#3b1f12");
  body.addColorStop(0.5, "#6b3a20");
  body.addColorStop(1, "#3b1f12");
  g.fillStyle = body;
  g.fillRect(cx - w / 2, top, w, h);
  g.beginPath();
  g.ellipse(cx, by, w / 2, 34, 0, 0, Math.PI);
  g.fill();
  g.fillStyle = "#2a140a";
  for (let i = 0; i < 10; i++) {
    const dl = 20 + ((i * 37) % 35);
    g.beginPath();
    g.ellipse(cx - w / 2 + 15 + i * 30, top + dl / 2, 9, dl / 2 + 6, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.beginPath();
  g.ellipse(cx, top, w / 2, 34, 0, 0, Math.PI * 2);
  g.fillStyle = "#4a2614";
  g.fill();
  [[-90, -6], [95, -4]].forEach(([dx, dy]) => {
    g.fillStyle = "#c0102a";
    g.beginPath();
    g.arc(cx + dx, top + dy, 11, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#ffffff88";
    g.beginPath();
    g.arc(cx + dx - 3, top + dy - 4, 3, 0, Math.PI * 2);
    g.fill();
  });
  ["#3b82f6", "#ec4899", "#f59e0b", "#10b981"].forEach((col, i) => {
    const x = cx - 60 + i * 40;
    const y = top - 8;
    g.fillStyle = col;
    g.fillRect(x - 6, y - 70, 12, 70);
    g.strokeStyle = "#fff";
    g.lineWidth = 3;
    for (let k = 0; k < 4; k++) {
      g.beginPath();
      g.moveTo(x - 6, y - 60 + k * 16);
      g.lineTo(x + 6, y - 66 + k * 16);
      g.stroke();
    }
    if (!flames) return;
    const flame = g.createRadialGradient(x, y - 86, 2, x, y - 86, 22);
    flame.addColorStop(0, "#fff7c2");
    flame.addColorStop(0.4, "#ffb703aa");
    flame.addColorStop(1, "#ffb70300");
    g.fillStyle = flame;
    g.beginPath();
    g.arc(x, y - 86, 22, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#ffd166";
    g.beginPath();
    g.ellipse(x, y - 84, 5, 11, 0, 0, Math.PI * 2);
    g.fill();
  });
  g.fillStyle = "#fbf1dc";
  g.strokeStyle = "#8a5a2b";
  g.lineWidth = 3;
  g.beginPath();
  g.ellipse(cx, top + 4, 95, 26, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = "#5a2d14";
  g.textAlign = "center";
  g.textBaseline = "middle";
  fit(g, label, `700 {s}px ${SCRIPT}`, 30, 170);
  g.fillText(label, cx, top + 5);
  g.restore();
};

// ---- the looks: colours, fonts and what's drawn around the words
const POSTER_THEMES = {
  classic: { label: "Classic", icon: "🎈", swatch: "linear-gradient(135deg,#5fa8e6 0%,#cfe7fa 45%,#ffd60a 70%,#d0121b 100%)" },
  royal: { label: "Royal Gold", icon: "👑", swatch: "linear-gradient(135deg,#16050a 0%,#4a0c1b 50%,#d4af37 100%)" },
  floral: { label: "Floral", icon: "🌸", swatch: "linear-gradient(135deg,#fff6f8 0%,#f9d5e0 50%,#e75480 100%)" },
  neon: { label: "Neon Party", icon: "✨", swatch: "linear-gradient(135deg,#0d0726 0%,#7b2ff7 50%,#ff3ec8 80%,#22e6ff 100%)" },
};
const POSTER_FRAMES = { side: "▮ Side", circle: "◯ Circle" };

const look = (theme, kind) => {
  const anni = kind === "anniversary";
  // a festival in "Classic": its own colours
  const F = FESTIVALS[kind];
  if (F && (!theme || theme === "classic")) return { script: F.vibes ? VIBES : SCRIPT, nameFont: PLAYFAIR, wishFont: PLAYFAIR, ...F.look };
  switch (theme) {
    case "royal":
      return {
        dark: true, panel: "rgba(20,6,10,.55)", panelLine: "#d4af37", script: VIBES, nameFont: CINZEL, wishFont: PLAYFAIR,
        happy: "gold", title: "gold", band: "gold", bandInk: "#3b0a12", wishInk: "#fbecd0", accent: "#e8c766", closeInk: "gold",
        balloons: ["#d4af37", "#7a0f1e", "#f1e4b3"], rose: "#8e0f24", gifts: [["#7a0f1e", "#d4af37"], ["#d4af37", "#7a0f1e"]], border: true, sparkle: "#ffe9a8",
        sky: anni ? ["#2a0610", "#5b0f22", "#170309"] : ["#16050a", "#4a0c1b", "#0c0306"],
      };
    case "floral":
      return {
        dark: false, panel: "rgba(255,255,255,.72)", panelLine: "#e7a4b8", script: VIBES, nameFont: PLAYFAIR, wishFont: PLAYFAIR,
        happy: "#8a3b55", title: "#c2416b", band: "#f7c6d4", bandInk: "#6b1f3a", wishInk: "#4a2633", accent: "#c2416b", closeInk: "#b8325f",
        balloons: ["#f4a7bb", "#f7d26a", "#c9a7e8"], rose: "#e75480", gifts: [["#f3b6c8", "#b8325f"], ["#fff1f4", "#e75480"]], corners: true, sparkle: "#ffffff",
        sky: ["#fde4ec", "#fff6f8", "#f9d5e0"],
      };
    case "neon":
      return {
        dark: true, panel: "rgba(10,6,30,.5)", panelLine: "#ff3ec8", script: SCRIPT, nameFont: PLAYFAIR, wishFont: SERIF,
        happy: "#ffffff", title: "#ff3ec8", glow: "#ff3ec8", band: "#22e6ff", bandInk: "#120a33", wishInk: "#e9e6ff", accent: "#22e6ff", closeInk: "#ffe14d",
        balloons: ["#ff3ec8", "#22e6ff", "#ffe14d"], rose: "#ff3e7f", gifts: [["#7b2ff7", "#22e6ff"], ["#ff3ec8", "#ffe14d"]], bokeh: true, sparkle: "#ffffff",
        sky: ["#0d0726", "#2a0b5c", "#07041a"],
      };
    default:
      return {
        dark: false, fade: true, script: SCRIPT, nameFont: SERIF, wishFont: SERIF,
        happy: anni ? "#5b1340" : "#16226b", title: anni ? "#c2185b" : "#d0121b", band: anni ? "#ffd54f" : "#ffd60a",
        bandInk: anni ? "#5b1340" : "#16226b", wishInk: "#1d1d2b", accent: anni ? "#c2185b" : "#d0121b", closeInk: anni ? "#c2185b" : "#d0121b",
        balloons: ["#f4b400", "#e53935", "#1e66d0"], rose: "#c8102e", gifts: [["#e7b416", "#d0121b"], ["#d0121b", "#f2c230"]],
        sky: anni ? ["#f8c8d8", "#fde8ef", "#f7d3df"] : null,
      };
  }
};

// a gold gradient across a line of text at height y
const goldAt = (g, y, size) => {
  const gr = g.createLinearGradient(0, y - size, 0, y + size * 0.2);
  gr.addColorStop(0, "#fff3b0");
  gr.addColorStop(0.45, "#e8c766");
  gr.addColorStop(0.6, "#b8862b");
  gr.addColorStop(1, "#f6e27a");
  return gr;
};

const fancyText = (g, L, text, x, y, size, ink) => {
  g.save();
  const fill = ink === "gold" ? goldAt(g, y, size) : ink;
  if (L.glow) {
    g.shadowColor = L.glow;
    g.shadowBlur = 28;
    g.fillStyle = fill;
    g.fillText(text, x, y);
    g.shadowBlur = 10;
  } else if (L.dark) {
    g.shadowColor = "rgba(0,0,0,.6)";
    g.shadowBlur = 12;
    g.shadowOffsetY = 3;
  } else {
    g.shadowColor = "rgba(0,0,0,.22)";
    g.shadowOffsetY = 4;
    g.shadowBlur = 6;
  }
  g.fillStyle = fill;
  g.fillText(text, x, y);
  g.restore();
};

const sparkle = (g, x, y, r, col) => {
  g.save();
  g.fillStyle = col;
  g.shadowColor = col;
  g.shadowBlur = r * 1.5;
  g.beginPath();
  g.moveTo(x, y - r);
  g.quadraticCurveTo(x, y, x + r, y);
  g.quadraticCurveTo(x, y, x, y + r);
  g.quadraticCurveTo(x, y, x - r, y);
  g.quadraticCurveTo(x, y, x, y - r);
  g.fill();
  g.restore();
};

const roundRect = (g, x, y, w, h, r) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
};

/** "1st", "2nd", "3rd", "11th", "25th" … ("" for no number). */
const ordinal = (n) => {
  const v = Math.floor(Number(n));
  if (!v || v < 1) return "";
  const t = v % 100;
  const suf = t >= 11 && t <= 13 ? "th" : ["th", "st", "nd", "rd"][v % 10] || "th";
  return `${v}${suf}`;
};

// the photo with its right edge melting into the card
const sidePhoto = (g, img, zoom, posY) => {
  const w = 680;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = POSTER_SIZE;
  const o = off.getContext("2d");
  cover(o, img, 0, 0, 640, POSTER_SIZE, zoom, posY);
  o.globalCompositeOperation = "destination-in";
  const m = o.createLinearGradient(0, 0, w, 0);
  m.addColorStop(0, "rgba(0,0,0,1)");
  m.addColorStop(0.78, "rgba(0,0,0,1)");
  m.addColorStop(0.94, "rgba(0,0,0,0)");
  o.fillStyle = m;
  o.fillRect(0, 0, w, POSTER_SIZE);
  g.drawImage(off, 0, 0);
};

// the photo in a round frame with a ring in the theme's colour
const circlePhoto = (g, img, L, zoom, posY) => {
  const cx = 285, cy = 470, r = 225;
  g.save();
  g.shadowColor = L.glow || "rgba(0,0,0,.45)";
  g.shadowBlur = 40;
  g.beginPath();
  g.arc(cx, cy, r + 16, 0, Math.PI * 2);
  g.fillStyle = L.accent;
  g.fill();
  g.restore();
  const ring = g.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  ring.addColorStop(0, "#fff7d1");
  ring.addColorStop(0.5, L.accent);
  ring.addColorStop(1, "#ffffff");
  g.beginPath();
  g.arc(cx, cy, r + 16, 0, Math.PI * 2);
  g.fillStyle = ring;
  g.fill();
  g.save();
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.clip();
  g.fillStyle = "#ddd";
  g.fillRect(cx - r, cy - r, r * 2, r * 2);
  cover(g, img, cx - r, cy - r, r * 2, r * 2, zoom, posY);
  g.restore();
  g.strokeStyle = "rgba(255,255,255,.8)";
  g.lineWidth = 3;
  g.beginPath();
  g.arc(cx, cy, r + 28, 0, Math.PI * 2);
  g.stroke();
};

const placeholder = (g, circle) => {
  g.save();
  g.fillStyle = "rgba(255,255,255,.35)";
  if (circle) {
    g.beginPath();
    g.arc(285, 470, 225, 0, Math.PI * 2);
    g.fill();
  } else g.fillRect(60, 160, 440, 640);
  g.fillStyle = "rgba(40,40,70,.35)";
  g.beginPath();
  g.arc(285, 400, 85, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(285, 640, 160, 130, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = "rgba(30,30,60,.8)";
  g.font = "600 30px sans-serif";
  g.textAlign = "center";
  g.fillText("Yahan photo aayegi", 285, 560);
  g.restore();
};

// the age / years as a medal by the title
const badge = (g, L, text, x, y) => {
  g.save();
  const r = 62;
  g.shadowColor = "rgba(0,0,0,.35)";
  g.shadowBlur = 14;
  g.shadowOffsetY = 4;
  const b = g.createRadialGradient(x - 18, y - 22, 6, x, y, r);
  b.addColorStop(0, "#fff6c8");
  b.addColorStop(0.55, "#e8c04a");
  b.addColorStop(1, "#a8761d");
  g.fillStyle = b;
  g.beginPath();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 2 ? r : r * 0.9;
    g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
  g.restore();
  g.save();
  g.strokeStyle = "rgba(120,70,10,.55)";
  g.lineWidth = 2;
  g.beginPath();
  g.arc(x, y, r * 0.72, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = "#5a2d0c";
  g.textAlign = "center";
  const m = text.match(/^(\d+)(\D*)$/) || [text, text, ""];
  g.font = `700 46px ${PLAYFAIR}`;
  const nw = g.measureText(m[1]).width;
  g.font = `700 20px ${PLAYFAIR}`;
  const sw = g.measureText(m[2]).width;
  const left = x - (nw + sw) / 2;
  g.textAlign = "left";
  g.font = `700 46px ${PLAYFAIR}`;
  g.fillText(m[1], left, y + 12);
  g.font = `700 20px ${PLAYFAIR}`;
  g.fillText(m[2], left + nw + 2, y - 8);
  g.restore();
};

const corners = (g, col) => {
  const bunch = (x, y, s) => {
    [[0, 0], [40, 18], [-30, 30], [18, 50], [60, -20]].forEach(([dx, dy], i) => leaf(g, x + dx * s, y + dy * s, 60 * s, i * 1.3));
    [[0, 0], [44, 26], [-24, 40], [20, 58]].forEach(([dx, dy]) => rose(g, x + dx * s, y + dy * s, 30 * s, col));
  };
  bunch(1020, 40, 1);
  bunch(560, 40, 0.7);
};

/**
 * The poster as a 1080×1080 canvas.
 * opts: kind ("birthday" | "anniversary"), theme (POSTER_THEMES), frame ("side" | "circle"),
 * name, wish, closing, from, age (a number: "25th" on a medal),
 * photo / background (decoded images or null), zoom (1…2.5), posY (0…1).
 */
// the drawing helpers posterFestivals.js uses
const DRAW = { rng, sparkle, heart, leaf, rose, balloon, cake };

const paintPhotoPoster = (opts = {}) => {
  const { name = "", wish = "", closing = "", from = "", photo = null, background = null, zoom = 1, posY = 0.3 } = opts;
  const anni = opts.kind === "anniversary";
  const K = kindOf(opts.kind);
  const L = look(opts.theme, opts.kind);
  const circle = opts.frame === "circle";
  const W = POSTER_SIZE;
  const H = POSTER_SIZE;
  const c = opts.canvas || document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  g.clearRect(0, 0, W, H);
  g.textBaseline = "alphabetic";

  // background: their photo (toned to the theme), else the theme's own
  if (background) {
    cover(g, background, 0, 0, W, H);
    if (L.dark) {
      g.fillStyle = "rgba(10,4,20,.45)";
      g.fillRect(0, 0, W, H);
    }
  } else if (L.sky) {
    const sky = L.dark ? g.createRadialGradient(W * 0.6, H * 0.4, 60, W * 0.6, H * 0.5, W * 0.85) : g.createLinearGradient(0, 0, 0, H);
    if (L.dark) {
      sky.addColorStop(0, L.sky[1]);
      sky.addColorStop(0.55, L.sky[0]);
    } else {
      sky.addColorStop(0, L.sky[0]);
      sky.addColorStop(0.6, L.sky[1]);
    }
    sky.addColorStop(1, L.sky[2]);
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
  } else {
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#5fa8e6");
    sky.addColorStop(0.55, "#cfe7fa");
    sky.addColorStop(0.75, "#9ed27a");
    sky.addColorStop(1, "#5a9e3a");
    g.fillStyle = sky;
    g.fillRect(0, 0, W, H);
  }
  if (!background) {
    const r = rng(anni ? 7 : 3);
    for (let i = 0; i < (L.bokeh || L.dark ? 26 : 14); i++) {
      const x = r() * W, y = r() * H * (L.dark ? 1 : 0.5), rad = 14 + r() * 48;
      g.fillStyle = L.bokeh ? [`rgba(255,62,200,.18)`, `rgba(34,230,255,.16)`, `rgba(255,225,77,.14)`][i % 3] : L.dark ? "rgba(232,199,102,.10)" : "rgba(255,255,255,.55)";
      g.beginPath();
      g.arc(x, y, rad, 0, Math.PI * 2);
      g.fill();
    }
  }
  // light rays behind the words (dark looks)
  if (L.dark) {
    g.save();
    g.translate(795, 300);
    g.fillStyle = L.glow ? "rgba(255,62,200,.06)" : "rgba(255,220,130,.07)";
    for (let i = 0; i < 16; i++) {
      g.rotate(Math.PI / 8);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(700, -60);
      g.lineTo(700, 60);
      g.fill();
    }
    g.restore();
  }

  // the person / couple
  if (photo) (circle ? circlePhoto(g, photo, L, zoom, posY) : sidePhoto(g, photo, zoom, posY));
  else placeholder(g, circle);

  // what the words sit on: a white glow (classic) or a glass panel
  if (L.fade) {
    const fade = g.createLinearGradient(500, 0, 700, 0);
    fade.addColorStop(0, "rgba(255,255,255,0)");
    fade.addColorStop(1, background ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.88)");
    g.fillStyle = fade;
    g.fillRect(500, 0, W - 500, H);
    const glow = g.createRadialGradient(800, 560, 40, 800, 560, 520);
    glow.addColorStop(0, "rgba(255,255,255,.75)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = glow;
    g.fillRect(500, 0, W - 500, H);
  } else {
    g.save();
    g.shadowColor = "rgba(0,0,0,.35)";
    g.shadowBlur = 30;
    roundRect(g, 545, 50, 500, 790, 28);
    g.fillStyle = L.panel;
    g.fill();
    g.restore();
    roundRect(g, 545, 50, 500, 790, 28);
    g.strokeStyle = L.panelLine;
    g.globalAlpha = 0.8;
    g.lineWidth = 2;
    g.stroke();
    roundRect(g, 557, 62, 476, 766, 20);
    g.globalAlpha = 0.35;
    g.stroke();
    g.globalAlpha = 1;
  }
  if (L.corners) corners(g, L.rose);

  const base = opts.layer === "base"; // without what moves (drawPosterMotion draws that)
  // the words
  const cx = 795;
  const years = K.blow ? ordinal(opts.age) : "";
  g.textAlign = "center";
  g.font = `${L.script === VIBES ? 400 : 700} ${L.script === VIBES ? 128 : 118}px ${L.script}`;
  fancyText(g, L, K.top, cx - (years ? 60 : 0), 180, 118, L.happy);
  if (years) badge(g, L, years, cx + 170, 130);
  else {
    heart(g, cx - 190, 100, 28, L.accent);
    heart(g, cx + 215, 175, 24, L.accent);
  }
  fit(g, K.title, `${L.script === VIBES ? 400 : 700} {s}px ${L.script}`, L.script === VIBES ? 180 : 165, 480);
  fancyText(g, L, K.title, cx, 330, 150, L.title);
  g.strokeStyle = L.title === "gold" ? "#d4af37" : L.accent;
  g.lineWidth = 5;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(cx - 200, 362);
  g.quadraticCurveTo(cx, 348, cx + 210, 355);
  g.stroke();

  // the name on a banner
  g.save();
  const band = L.band === "gold" ? (() => {
    const gr = g.createLinearGradient(cx - 260, 0, cx + 260, 0);
    gr.addColorStop(0, "#b8862b");
    gr.addColorStop(0.5, "#f6e27a");
    gr.addColorStop(1, "#b8862b");
    return gr;
  })() : L.band;
  g.fillStyle = band;
  if (L.glow) {
    g.shadowColor = L.band;
    g.shadowBlur = 22;
  }
  g.beginPath();
  g.moveTo(cx - 245, 395);
  g.lineTo(cx + 240, 388);
  g.lineTo(cx + 228, 470);
  g.lineTo(cx - 238, 478);
  g.closePath();
  g.fill();
  // ribbon tails
  g.shadowBlur = 0;
  g.globalAlpha = 0.75;
  [[-1, cx - 245], [1, cx + 240]].forEach(([d, x]) => {
    g.beginPath();
    g.moveTo(x, 405);
    g.lineTo(x + d * 34, 400);
    g.lineTo(x + d * 18, 436);
    g.lineTo(x + d * 34, 472);
    g.lineTo(x - d * 4, 466);
    g.closePath();
    g.fill();
  });
  g.restore();
  // no name on a festival's card: its own words on the banner
  const who = name.trim() || (K.center === "digits" ? `Welcome ${yearOf(opts)}` : K.banner) || " ";
  g.fillStyle = L.bandInk;
  fit(g, who, `700 {s}px ${L.nameFont}`, L.nameFont === CINZEL ? 56 : 64, 450);
  g.fillText(who, cx, 452);

  // the wish
  g.fillStyle = L.wishInk;
  g.font = `${L.wishFont === PLAYFAIR ? "italic 500" : "500"} 33px ${L.wishFont}`;
  const lines = wrap(g, wish.trim(), 440).slice(0, from.trim() ? 4 : 5);
  lines.forEach((l, i) => g.fillText(l, cx, 540 + i * 44));
  const y = 540 + lines.length * 44;
  g.strokeStyle = L.title === "gold" ? "#d4af37" : L.accent;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx - 170, y);
  g.lineTo(cx - 30, y);
  g.moveTo(cx + 30, y);
  g.lineTo(cx + 170, y);
  g.stroke();
  g.fillStyle = L.title === "gold" ? "#e8c766" : L.accent;
  g.font = "26px serif";
  g.fillText("★ ★ ★", cx, y + 9);
  const last = closing.trim();
  if (last) {
    fit(g, last, `${L.script === VIBES ? 400 : 700} {s}px ${L.script}`, L.script === VIBES ? 60 : 50, 450);
    fancyText(g, { ...L, glow: L.glow && L.closeInk }, last, cx, y + 76, 50, L.closeInk);
  }
  const by = from.trim();
  if (by) {
    g.fillStyle = L.wishInk;
    fit(g, `— ${by}`, `italic 500 {s}px ${PLAYFAIR}`, 30, 420);
    g.globalAlpha = 0.9;
    g.fillText(`— ${by}`, cx, y + 122);
    g.globalAlpha = 1;
  }

  // the corner's flowers, the centrepiece (its lights not lit yet), the gifts
  drawFlowers(g, DRAW, K.flower, L);
  drawCenter(g, DRAW, K.center, { year: yearOf(opts), cakeLabel: K.cake });
  gift(g, 880, 920, 150, 140, L.gifts[0][0], L.gifts[0][1]);
  gift(g, 760, 985, 110, 80, L.gifts[1][0], L.gifts[1][1]);

  // a gold frame round the whole card (royal)
  if (L.border) {
    g.save();
    const gr = g.createLinearGradient(0, 0, W, H);
    gr.addColorStop(0, "#f6e27a");
    gr.addColorStop(0.5, "#b8862b");
    gr.addColorStop(1, "#f6e27a");
    g.strokeStyle = gr;
    g.lineWidth = 10;
    g.strokeRect(14, 14, W - 28, H - 28);
    g.lineWidth = 2;
    g.strokeRect(30, 30, W - 60, H - 60);
    g.restore();
  }
  if (!base) drawPosterMotion(g, opts, opts.t || 0, opts.show || {});
  return c;
};

const CAKE = { cx: 470, by: 1040 };
const CANDLE_COLS = 4;
// the video's story: a candle every 0.6 s from 0.8 s, a moment for the wish, blown out at 4.6 s
const VIDEO_SHOW = { lit: [0.8, 1.4, 2.0, 2.6], blowAt: 4.6 };

/** What lights up one by one on this card (a cake's candles, the diyas, the tree's bulbs …). */
const lightsOf = (opts = {}) => {
  const K = kindOf(opts.kind);
  if (K.center === "cake") {
    return Array.from({ length: CANDLE_COLS }, (_, i) => ({ x: CAKE.cx - 60 + i * 40, y: CAKE.by - 128 - 84, type: "flame" }));
  }
  return centerLights(K.center, yearOf(opts));
};

/** Which light a tap at (x, y) on the 1080 poster is on, else -1. */
const lightAt = (opts, x, y) => {
  const reach = kindOf(opts.kind).center === "cake" ? 22 : 48;
  let best = -1;
  let near = Infinity;
  lightsOf(opts).forEach((l, i) => {
    const d = Math.hypot(x - l.x, (y - l.y) * (l.type === "flame" ? 0.5 : 1));
    if (d < reach * 1.6 && d < near) {
      near = d;
      best = i;
    }
  });
  return best;
};
/** Which candle (0 … 3) a tap at (x, y) is on, else -1 (a birthday's cake). */
const candleAt = (x, y) => lightAt({ kind: "birthday" }, x, y);

/** The video / GIF story: one light every 0.55 s from 0.8 s, then blown out (a cake) or the pop-up. */
const videoShow = (opts = {}) => {
  const n = lightsOf(opts).length;
  const lit = Array.from({ length: n }, (_, i) => +(0.8 + i * 0.55).toFixed(2));
  const last = lit[n - 1] || 0.8;
  return kindOf(opts.kind).blow ? { lit, blowAt: +(last + 2).toFixed(2) } : { lit, popAt: +(last + 1.3).toFixed(2) };
};

/**
 * What moves on the poster, drawn over its still layer (paintPhotoPoster with
 * layer: "base") at `t` seconds: confetti falling, sparkles twinkling, the
 * balloons / hearts bobbing, a shine across the title, the candles flickering.
 * `show`: { lit: [seconds each candle catches, null: not yet] (none: all lit),
 * blowAt: seconds they're blown out (smoke, a confetti burst, then the
 * "Happy Birthday!" pop-up), popup: false to leave that out }.
 */
const drawPosterMotion = (g, opts = {}, t = 0, show = {}) => {
  const anni = opts.kind === "anniversary";
  const L = look(opts.theme, opts.kind);
  const H = POSTER_SIZE;

  // confetti falling down the right side; sparkles twinkling in place
  const rr = rng(11);
  const K = kindOf(opts.kind);
  const cols = L.dark || FESTIVALS[opts.kind] ? [L.sparkle, L.accent, L.balloons[0], L.balloons[2]] : anni ? ["#e91e63", "#f4b400", "#ff80ab", "#ffffff"] : ["#f4b400", "#e53935", "#1e88e5", "#43a047"];
  for (let i = 0; i < 40; i++) {
    const x0 = 520 + rr() * 540, y0 = rr() * H, a0 = rr() * 6, speed = 25 + rr() * 45, size = 5 + rr() * 9;
    if (L.sparkle && i % 3 === 0) {
      sparkle(g, x0, y0, size * (0.55 + 0.45 * Math.sin(t * 3 + i)), L.sparkle);
      continue;
    }
    const y = ((y0 + t * speed) % (H + 20)) - 10;
    g.save();
    g.translate(x0 + Math.sin(t * 1.4 + i) * 10, y);
    g.rotate(a0 + t * 2.2);
    g.fillStyle = cols[i % 4];
    g.fillRect(-6, -2, 12, 5);
    g.restore();
  }

  // snow (Christmas) or colour dust (Holi) drifting over everything
  if (K.fall === "snow" || K.fall === "dust") {
    const rs = rng(23);
    const dust = ["#ec4899", "#facc15", "#22c55e", "#3b82f6", "#a855f7"];
    for (let i = 0; i < 70; i++) {
      const x0 = rs() * H, y0 = rs() * H, sp = 18 + rs() * 40, r = 2 + rs() * 4;
      const x = x0 + Math.sin(t * 0.8 + i) * 18, y = (y0 + t * sp) % H;
      g.fillStyle = K.fall === "snow" ? "rgba(255,255,255,.88)" : `${dust[i % 5]}aa`;
      g.beginPath();
      g.arc(x, y, K.fall === "snow" ? r : r * 1.6, 0, Math.PI * 2);
      g.fill();
    }
  }

  // balloons (birthday), hearts (anniversary) or the festival's own, top left
  const bob = (i) => Math.sin(t * 1.3 + i * 1.7) * 9;
  if (K.decor !== "balloons" && K.decor !== "hearts") drawDecor(g, DRAW, K.decor, t);
  else if (anni || K.decor === "hearts") {
    const beat = (i) => 1 + 0.08 * Math.max(0, Math.sin(t * 4 + i));
    heart(g, 70, 120 + bob(0), 70 * beat(0), L.dark ? "#d4af37" : "#e0245e");
    heart(g, 160, 70 + bob(1), 45 * beat(1), L.dark ? "#f1e4b3" : "#ff6f91");
    heart(g, 120, 210 + bob(2), 40 * beat(2), L.dark ? "#7a0f1e" : "#c2185b");
  } else {
    balloon(g, 70 + Math.sin(t * 0.9) * 3, 90 + bob(0), 62, L.balloons[0]);
    balloon(g, 150 + Math.sin(t * 0.8 + 1) * 3, 120 + bob(1), 60, L.balloons[1]);
    balloon(g, 55 + Math.sin(t * 1.1 + 2) * 3, 240 + bob(2), 58, L.balloons[2]);
  }

  // a shine sweeping across the title, every 4 s
  if (t > 0) {
    const p = (t % 4) / 1.4; // 0 … 1 across, then a rest
    if (p <= 1) {
      g.save();
      g.beginPath();
      g.rect(530, 40, 530, 460);
      g.clip();
      g.globalCompositeOperation = "lighter";
      const x = 480 + p * 640;
      const band = g.createLinearGradient(x - 90, 0, x + 90, 0);
      band.addColorStop(0, "rgba(255,255,255,0)");
      band.addColorStop(0.5, L.dark ? "rgba(255,240,200,.22)" : "rgba(255,255,255,.35)");
      band.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = band;
      g.translate(x, 270);
      g.transform(1, 0, -0.35, 1, 0, 0);
      g.translate(-x, -270);
      g.fillRect(x - 90, 40, 180, 460);
      g.restore();
    }
  }

  // the lights, each at its time (a flash as it catches); a cake's candles blown out with smoke rising
  const lights = lightsOf(opts);
  const lit = show.lit || [];
  const blowAt = K.blow ? show.blowAt ?? null : null;
  const popAt = K.blow ? null : show.popAt ?? null;
  const out = blowAt != null && t >= blowAt;
  lights.forEach((l, i) => {
    const on = lit[i] === undefined ? -Infinity : lit[i]; // undefined: lit all along; null: not yet
    if (out) {
      const dt = t - blowAt;
      g.strokeStyle = "#2b2b2b";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(l.x, l.y + 14);
      g.lineTo(l.x, l.y + 6);
      g.stroke();
      const fade = Math.max(0, 1 - dt / 2.6);
      for (let k = 0; k < 3 && fade > 0; k++) {
        const up = dt * 45 + k * 20;
        g.fillStyle = `rgba(200,200,205,${0.45 * fade})`;
        g.beginPath();
        g.arc(l.x + Math.sin(dt * 3 + k + i) * (6 + up * 0.15), l.y - up, 5 + dt * 7 + k * 2, 0, Math.PI * 2);
        g.fill();
      }
      return;
    }
    if (on === null || t < on) return;
    // the spark as it catches
    const flash = Math.max(0, 1 - (t - on) / 0.5);
    if (flash > 0 && on !== -Infinity) {
      g.save();
      g.globalCompositeOperation = "lighter";
      const fl = g.createRadialGradient(l.x, l.y, 1, l.x, l.y, 70 * flash + 10);
      fl.addColorStop(0, `rgba(255,240,180,${0.9 * flash})`);
      fl.addColorStop(1, "rgba(255,180,60,0)");
      g.fillStyle = fl;
      g.beginPath();
      g.arc(l.x, l.y, 70 * flash + 10, 0, Math.PI * 2);
      g.fill();
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2 + i;
        const r = 14 + (1 - flash) * 40;
        sparkle(g, l.x + Math.cos(a) * r, l.y + Math.sin(a) * r, 5 * flash + 1, "#fff2b0");
      }
      g.restore();
    }
    drawLight(g, DRAW, l, t, t - on, i);
  });

  const endAt = out ? blowAt : popAt != null && t >= popAt ? popAt : null;
  if (endAt == null) return;
  const dt = t - endAt;
  const bx = lights.length ? lights.reduce((n, l) => n + l.x, 0) / lights.length : CAKE.cx;
  const byy = lights.length ? Math.min(...lights.map((l) => l.y)) : 830;
  // a burst of confetti from the cake / centrepiece
  if (dt < 3.6) {
    const r2 = rng(99);
    const burst = ["#ff3e7f", "#ffd60a", "#22c3ff", "#7ee081", "#c084fc", "#ffffff"];
    g.save();
    g.globalAlpha = Math.max(0, 1 - dt / 3.6);
    for (let i = 0; i < 90; i++) {
      const vx = (r2() - 0.5) * 900, vy = -(350 + r2() * 650), spin = r2() * 10;
      const x = bx + vx * dt, y = byy + vy * dt + 0.5 * 950 * dt * dt;
      g.save();
      g.translate(x, y);
      g.rotate(spin + dt * 8);
      g.fillStyle = burst[i % burst.length];
      if (i % 5 === 0) sparkle(g, 0, 0, 9, burst[i % burst.length]);
      else g.fillRect(-7, -3, 14, 6);
      g.restore();
    }
    g.restore();
  }
  // then the pop-up: "Happy Birthday!" springing up over the card
  if (show.popup !== false && dt > 0.6) popUp(g, opts, L, dt - 0.6);
};

const easeOutBack = (x) => {
  const c1 = 2.2, c3 = c1 + 1;
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
};

// fireworks: a few bursts going off one after another round the pop-up
const fireworks = (g, t) => {
  const spots = [[180, 200, "#ffd60a"], [900, 180, "#ff3ec8"], [200, 820, "#22e6ff"], [880, 840, "#7ee081"], [540, 120, "#ff7a45"]];
  spots.forEach(([x, y, col], i) => {
    const p = ((t + i * 0.45) % 1.8) / 1.2; // 0 … 1 the burst, then a rest
    if (p > 1) return;
    const r = 30 + p * 110;
    g.save();
    g.globalAlpha = 1 - p;
    g.strokeStyle = col;
    g.lineWidth = 3;
    g.lineCap = "round";
    g.shadowColor = col;
    g.shadowBlur = 12;
    for (let k = 0; k < 14; k++) {
      const a = (k / 14) * Math.PI * 2 + i;
      g.beginPath();
      g.moveTo(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55 + p * 20);
      g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r + p * 30);
      g.stroke();
    }
    g.restore();
  });
};

// the pop-up's own colours: the big word's gradient and the glow round the glass
const POP = {
  classic: { word: ["#ff6a88", "#ff3d3d", "#ffb340"], glow: "#ff5e7e" },
  royal: { word: ["#fff3b0", "#e8c766", "#b8862b"], glow: "#e8c766" },
  floral: { word: ["#ff9ec0", "#e75480", "#ffc3a0"], glow: "#ff8fb1" },
  neon: { word: ["#ff3ec8", "#b05cff", "#22e6ff"], glow: "#ff3ec8" },
};

const popUp = (g, opts, L, dt) => {
  const W = POSTER_SIZE;
  const K = kindOf(opts.kind);
  const F = FESTIVALS[opts.kind];
  const P = F && (!opts.theme || opts.theme === "classic") ? F.pop : POP[opts.theme] || POP.classic;
  const e = easeOutBack(Math.min(1, dt / 0.8));
  const fadeIn = Math.min(1, dt / 0.45);
  const base = g.getTransform(); // the poster's own scale (a GIF draws it smaller)
  const gv = voucherOf(opts);
  // floats a little once it's up; higher with a gift voucher to come under it
  const cx = 540, cy = (gv ? 430 : 520) + (dt > 0.8 ? Math.sin((dt - 0.8) * 1.8) * 6 : 0);
  const w = 820, h = 540;

  g.save();
  // the card behind: dimmed at the edges, softly blurred
  g.save();
  g.globalAlpha = fadeIn;
  g.filter = `blur(${Math.round(6 * fadeIn)}px)`;
  g.drawImage(g.canvas, 0, 0, W, W);
  g.filter = "none";
  const vig = g.createRadialGradient(cx, cy, 120, cx, cy, 760);
  vig.addColorStop(0, "rgba(10,4,24,.12)");
  vig.addColorStop(1, "rgba(10,4,24,.62)");
  g.fillStyle = vig;
  g.fillRect(0, 0, W, W);
  g.restore();

  // soft coloured rays turning behind the glass
  g.save();
  g.translate(cx, cy);
  g.rotate(dt * 0.22);
  g.globalAlpha = fadeIn * 0.9;
  const ray = g.createRadialGradient(0, 0, 80, 0, 0, 700);
  ray.addColorStop(0, `${P.glow}55`);
  ray.addColorStop(1, `${P.glow}00`);
  g.fillStyle = ray;
  for (let i = 0; i < 16; i++) {
    g.rotate((Math.PI * 2) / 16);
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(700, -70);
    g.lineTo(700, 70);
    g.fill();
  }
  g.restore();

  // glowing bokeh drifting up, and fireworks
  const rb = rng(31);
  for (let i = 0; i < 22; i++) {
    const x = rb() * W, speed = 30 + rb() * 60, r = 6 + rb() * 22, ph = rb() * W;
    const y = W - ((ph + dt * speed) % (W + 60)) + 30;
    const col = [P.word[0], P.word[2], "#ffffff"][i % 3];
    const bo = g.createRadialGradient(x, y, 0, x, y, r);
    bo.addColorStop(0, `${col}aa`);
    bo.addColorStop(1, `${col}00`);
    g.globalAlpha = fadeIn * 0.8;
    g.fillStyle = bo;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = fadeIn;
  fireworks(g, dt);

  // balloons / hearts rising past the sides
  for (let i = 0; i < 4; i++) {
    const side = i % 2 ? 1 : -1;
    const x = cx + side * (w / 2 + 40 + (i > 1 ? 50 : 0));
    const y = W + 120 - ((dt * (90 + i * 25) + i * 260) % (W + 300));
    drawRiser(g, DRAW, K.riser, x, y, i, dt, P);
  }

  // curly ribbon streamers drifting down
  for (let i = 0; i < 9; i++) {
    const r3 = rng(7919 * (i + 3));
    r3(); // close seeds start alike: skip the first
    const x0 = 40 + ((i + r3() * 0.8) / 9) * (W - 80), sp = 70 + r3() * 60, len = 90 + r3() * 60;
    const y0 = ((r3() * W + dt * sp) % (W + 200)) - 150;
    const col = [P.word[0], "#ffd60a", P.word[2], "#ffffff"][i % 4];
    g.save();
    g.globalAlpha = fadeIn * 0.85;
    g.strokeStyle = col;
    g.lineWidth = 5;
    g.lineCap = "round";
    g.beginPath();
    for (let k = 0; k <= 24; k++) {
      const yy = y0 + (k / 24) * len;
      const xx = x0 + Math.sin(k * 0.55 + dt * 4 + i) * 14;
      if (k) g.lineTo(xx, yy);
      else g.moveTo(xx, yy);
    }
    g.stroke();
    g.restore();
  }

  // a white flash the moment it pops
  if (dt < 0.5) {
    g.save();
    const fl = g.createRadialGradient(cx, cy, 0, cx, cy, 520);
    fl.addColorStop(0, `rgba(255,255,255,${0.75 * (1 - dt / 0.5)})`);
    fl.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = fl;
    g.fillRect(0, 0, W, W);
    g.restore();
  }

  // the glass plaque, flipping up into place
  g.translate(cx, cy);
  const flip = Math.min(1, dt / 0.6);
  g.transform(1, 0, (1 - flip) * -0.35, 1, 0, 0);
  g.scale(e, e * (0.25 + 0.75 * Math.min(1, flip * 1.1)));
  g.globalAlpha = fadeIn;
  // its glow
  g.save();
  g.shadowColor = P.glow;
  g.shadowBlur = 60;
  roundRect(g, -w / 2, -h / 2, w, h, 56);
  g.fillStyle = "rgba(255,255,255,.04)";
  g.fill();
  g.restore();
  // frosted: the card again, blurred harder, seen through it
  g.save();
  roundRect(g, -w / 2, -h / 2, w, h, 56);
  g.clip();
  const inner = g.getTransform();
  g.setTransform(base);
  g.filter = "blur(18px) saturate(1.4)";
  g.drawImage(g.canvas, 0, 0, W, W);
  g.filter = "none";
  g.setTransform(inner);
  const tint = g.createLinearGradient(0, -h / 2, 0, h / 2);
  // light along the top, a touch darker below: the words stay clear on any card
  tint.addColorStop(0, "rgba(255,255,255,.24)");
  tint.addColorStop(0.55, "rgba(40,12,60,.12)");
  tint.addColorStop(1, "rgba(20,6,34,.32)");
  g.fillStyle = tint;
  g.fillRect(-w / 2, -h / 2, w, h);
  // a sheen sliding across the glass
  const sx = -w / 2 - 200 + ((dt * 260) % (w + 600));
  const sheen = g.createLinearGradient(sx - 120, 0, sx + 120, 0);
  sheen.addColorStop(0, "rgba(255,255,255,0)");
  sheen.addColorStop(0.5, "rgba(255,255,255,.22)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = sheen;
  g.transform(1, 0, -0.4, 1, 0, 0);
  g.fillRect(sx - 120, -h / 2, 240, h);
  g.restore();
  // its rim: a bright hairline, lighter along the top
  const rim = g.createLinearGradient(0, -h / 2, 0, h / 2);
  rim.addColorStop(0, "rgba(255,255,255,.95)");
  rim.addColorStop(0.5, "rgba(255,255,255,.35)");
  rim.addColorStop(1, `${P.glow}cc`);
  g.strokeStyle = rim;
  g.lineWidth = 3;
  roundRect(g, -w / 2, -h / 2, w, h, 56);
  g.stroke();

  // the words, each line springing in a moment after the last
  const line = (k) => easeOutBack(Math.min(1, Math.max(0, (dt - 0.3 - k * 0.2) / 0.6)));
  const script = L.script === VIBES ? 400 : 700;
  g.textAlign = "center";
  // "Happy": white script, softly lit
  let s = line(0);
  if (s > 0) {
    g.save();
    g.translate(0, -118);
    g.scale(s, s);
    g.font = `${script} 108px ${L.script}`;
    g.shadowColor = "rgba(0,0,0,.35)";
    g.shadowBlur = 14;
    g.shadowOffsetY = 4;
    g.fillStyle = "#ffffff";
    g.fillText(K.top, 0, 0);
    g.restore();
  }
  // "Birthday!": the big word in its gradient, glowing, a white edge, a shine running through it
  s = line(1);
  if (s > 0) {
    const word = `${K.title}!`;
    g.save();
    g.translate(0, 38);
    g.scale(s, s);
    fit(g, word, `${script} {s}px ${L.script}`, 168, w - 110);
    const grad = g.createLinearGradient(-w / 2, -120, w / 2, 20);
    grad.addColorStop(0, P.word[0]);
    grad.addColorStop(0.5, P.word[1]);
    grad.addColorStop(1, P.word[2]);
    g.shadowColor = P.glow;
    g.shadowBlur = 34;
    g.fillStyle = grad;
    g.fillText(word, 0, 0);
    g.shadowBlur = 0;
    g.lineWidth = 2.5;
    g.strokeStyle = "rgba(255,255,255,.85)";
    g.strokeText(word, 0, 0);
    g.fillText(word, 0, 0);
    const p = ((dt - 1) % 2.6) / 1.1; // the shine: across, then a rest
    if (dt > 1 && p <= 1) {
      const x = -w / 2 + p * w;
      const shine = g.createLinearGradient(x - 70, -60, x + 70, 20);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.5, "rgba(255,255,255,.95)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = shine;
      g.fillText(word, 0, 0);
    }
    g.restore();
    // glitter round the word
    const rg = rng(77);
    for (let i = 0; i < 14; i++) {
      const gx = (rg() - 0.5) * (w - 120), gy = -60 + (rg() - 0.5) * 170, ph = rg() * 6;
      const tw = Math.max(0, Math.sin(dt * 4 + ph));
      if (tw > 0.2) sparkle(g, gx, gy, 3 + 7 * tw * s, i % 3 ? "#ffffff" : P.word[2]);
    }
  }
  // the name on a ribbon banner
  s = line(2);
  const who = (opts.name || "").trim() || (K.center === "digits" ? `Welcome ${yearOf(opts)}` : K.banner || "");
  if (s > 0 && who) {
    g.save();
    g.translate(0, 132);
    g.scale(s, s);
    const label = who.toUpperCase();
    fit(g, label, `700 {s}px ${L.nameFont}`, 44, w - 260);
    if ("letterSpacing" in g) g.letterSpacing = "5px";
    const bw = Math.min(w - 120, g.measureText(label).width + 120), bh = 66;
    const rb2 = g.createLinearGradient(0, -bh / 2, 0, bh / 2);
    rb2.addColorStop(0, "#fff3b0");
    rb2.addColorStop(0.45, "#e8c04a");
    rb2.addColorStop(1, "#a8761d");
    // tails folding behind
    g.fillStyle = "#8a5a12";
    [-1, 1].forEach((d) => {
      g.beginPath();
      g.moveTo(d * (bw / 2 - 10), -bh / 2 + 12);
      g.lineTo(d * (bw / 2 + 46), -bh / 2 + 12);
      g.lineTo(d * (bw / 2 + 26), 8);
      g.lineTo(d * (bw / 2 + 46), bh / 2 + 12);
      g.lineTo(d * (bw / 2 - 10), bh / 2 + 12);
      g.closePath();
      g.fill();
    });
    g.shadowColor = "rgba(0,0,0,.35)";
    g.shadowBlur = 14;
    g.shadowOffsetY = 5;
    g.fillStyle = rb2;
    roundRect(g, -bw / 2, -bh / 2, bw, bh, 10);
    g.fill();
    g.shadowColor = "transparent";
    g.strokeStyle = "rgba(255,255,255,.7)";
    g.lineWidth = 2;
    roundRect(g, -bw / 2 + 6, -bh / 2 + 6, bw - 12, bh - 12, 6);
    g.stroke();
    g.fillStyle = "#4a1d06";
    g.textBaseline = "middle";
    g.fillText(label, 0, 3);
    g.restore();
  }
  // a line of good wishes under it
  s = line(3);
  if (s > 0) {
    g.save();
    g.globalAlpha = fadeIn * Math.min(1, s);
    g.translate(0, 212);
    g.font = `italic 500 30px ${PLAYFAIR}`;
    g.shadowColor = "rgba(0,0,0,.45)";
    g.shadowBlur = 8;
    g.fillStyle = "#ffffff";
    const sub = K.sub;
    g.fillText(sub, 0, 0);
    const half = g.measureText(sub).width / 2;
    sparkle(g, -half - 26, -10, 9, P.word[2]);
    sparkle(g, half + 26, -10, 9, P.word[2]);
    g.restore();
  }
  // a medal at the top: the age / years, else a heart
  s = line(0);
  if (s > 0) {
    g.save();
    g.translate(0, -h / 2);
    g.scale(s, s);
    const years = K.blow ? ordinal(opts.age) : "";
    if (years) badge(g, L, years, 0, 0);
    else {
      g.save();
      g.shadowColor = P.glow;
      g.shadowBlur = 24;
      const md = g.createRadialGradient(-12, -14, 4, 0, 0, 46);
      md.addColorStop(0, "#ffffff");
      md.addColorStop(1, P.word[1]);
      g.fillStyle = md;
      g.beginPath();
      g.arc(0, 0, 44, 0, Math.PI * 2);
      g.fill();
      g.restore();
      g.strokeStyle = "rgba(255,255,255,.9)";
      g.lineWidth = 3;
      g.beginPath();
      g.arc(0, 0, 44, 0, Math.PI * 2);
      g.stroke();
      if (F) {
        // the festival's own mark in the medal
        g.font = '50px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText(K.emoji, 0, 4);
      } else heart(g, 0, 10, 40 * (1 + 0.08 * Math.max(0, Math.sin(dt * 5))), "#ffffff");
    }
    g.restore();
  }
  // stars twinkling on the glass's corners
  const tw = (i) => 0.5 + 0.5 * Math.sin(dt * 5 + i * 1.7);
  [[-w / 2 + 50, -h / 2 + 50], [w / 2 - 50, -h / 2 + 50], [-w / 2 + 50, h / 2 - 50], [w / 2 - 50, h / 2 - 50]].forEach(([x, y], i) =>
    sparkle(g, x, y, 6 + 10 * tw(i), i % 2 ? P.word[2] : "#ffffff"),
  );
  g.restore();
  if (gv && dt > 1.5) giftVoucher(g, gv, P, dt - 1.5, cy + 425);
};

/**
 * The gift voucher on a card, if it has one: { amount, brand, code }. The amount is 0 and the
 * code "" unless they asked for them to be shown: by itself it's just "a gift voucher".
 */
const voucherOf = (opts = {}) => {
  const v = opts.voucher;
  if (!v || !v.on) return null;
  return {
    amount: v.showAmount ? Math.round(Number(v.amount) || 0) : 0,
    brand: String(v.brand || "").trim().slice(0, 24),
    code: v.showCode ? String(v.code || "").trim().toUpperCase().slice(0, 24) : "",
  };
};

const rupees = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

// 🎁 the voucher: a ticket springing up under the glass, a shine across it, coins of light round it
const giftVoucher = (g, gv, P, dt, cy) => {
  const e = easeOutBack(Math.min(1, dt / 0.7));
  const a = Math.min(1, dt / 0.35);
  const w = 680, h = 210, cx = 540;
  g.save();
  g.globalAlpha = a;
  g.translate(cx, cy + (1 - e) * 120);
  g.rotate((1 - e) * -0.12);
  g.scale(0.6 + 0.4 * e, 0.6 + 0.4 * e);
  // its glow
  g.shadowColor = P.glow;
  g.shadowBlur = 50;
  // the ticket: rounded, with a notch either side where it tears
  const ticket = () => {
    g.beginPath();
    g.moveTo(-w / 2 + 22, -h / 2);
    g.lineTo(w / 2 - 22, -h / 2);
    g.arcTo(w / 2, -h / 2, w / 2, -h / 2 + 22, 22);
    g.lineTo(w / 2, -20);
    g.arc(w / 2, 0, 20, -Math.PI / 2, Math.PI / 2, true);
    g.lineTo(w / 2, h / 2 - 22);
    g.arcTo(w / 2, h / 2, w / 2 - 22, h / 2, 22);
    g.lineTo(-w / 2 + 22, h / 2);
    g.arcTo(-w / 2, h / 2, -w / 2, h / 2 - 22, 22);
    g.lineTo(-w / 2, 20);
    g.arc(-w / 2, 0, 20, Math.PI / 2, -Math.PI / 2, true);
    g.lineTo(-w / 2, -h / 2 + 22);
    g.arcTo(-w / 2, -h / 2, -w / 2 + 22, -h / 2, 22);
    g.closePath();
  };
  const bg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  bg.addColorStop(0, "#fff3b0");
  bg.addColorStop(0.35, "#e8c04a");
  bg.addColorStop(0.7, "#c9962b");
  bg.addColorStop(1, "#f6e27a");
  ticket();
  g.fillStyle = bg;
  g.fill();
  g.shadowColor = "transparent";
  // a pattern of fine diagonal lines, like a printed voucher
  g.save();
  ticket();
  g.clip();
  g.strokeStyle = "rgba(255,255,255,.18)";
  g.lineWidth = 2;
  for (let x = -w; x < w; x += 18) {
    g.beginPath();
    g.moveTo(x, -h / 2);
    g.lineTo(x + h, h / 2);
    g.stroke();
  }
  // the shine, every 2.4 s
  const p = (dt % 2.4) / 1.2;
  if (p <= 1) {
    const sx = -w / 2 - 100 + p * (w + 200);
    const sh = g.createLinearGradient(sx - 80, 0, sx + 80, 0);
    sh.addColorStop(0, "rgba(255,255,255,0)");
    sh.addColorStop(0.5, "rgba(255,255,255,.55)");
    sh.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = sh;
    g.transform(1, 0, -0.4, 1, 0, 0);
    g.fillRect(sx - 80, -h / 2, 160, h);
  }
  g.restore();
  ticket();
  g.strokeStyle = "rgba(255,255,255,.85)";
  g.lineWidth = 3;
  g.stroke();
  // the stub on the left: a gift box, torn off along a dotted line
  const stubX = -w / 2 + 170;
  g.strokeStyle = "rgba(90,50,10,.55)";
  g.lineWidth = 3;
  g.setLineDash([8, 9]);
  g.beginPath();
  g.moveTo(stubX, -h / 2 + 16);
  g.lineTo(stubX, h / 2 - 16);
  g.stroke();
  g.setLineDash([]);
  g.font = '86px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.save();
  g.translate(-w / 2 + 85, gv.code && gv.brand && gv.amount ? -16 : 0);
  g.rotate(Math.sin(dt * 3) * 0.08);
  g.fillText("🎁", 0, 4);
  g.restore();
  // the words
  const tx = stubX + (w / 2 - stubX) / 2;
  g.fillStyle = "#5a2d0c";
  g.font = `700 24px ${PLAYFAIR}`;
  if ("letterSpacing" in g) g.letterSpacing = "6px";
  g.fillText("GIFT VOUCHER", tx, -h / 2 + 38);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  // the big line: the amount when it's shown, else whose voucher it is
  const big = gv.amount ? rupees(gv.amount) : gv.brand || "Special Gift";
  g.fillStyle = "#3b1d06";
  g.shadowColor = "rgba(255,255,255,.7)";
  g.shadowOffsetY = 2;
  fit(g, big, `900 {s}px ${CINZEL}`, gv.amount ? 78 : 64, w / 2 - stubX - 40);
  g.fillText(big, tx, -2);
  g.shadowColor = "transparent";
  g.font = `italic 600 26px ${PLAYFAIR}`;
  g.fillStyle = "#5a2d0c";
  const line2 = gv.amount && gv.brand ? `${gv.brand} gift card` : "Aapke liye ek khaas tohfa";
  if (!gv.code) g.fillText(line2, tx, h / 2 - 36);
  else {
    // the code on a white pill
    g.font = `700 26px "Courier New", monospace`;
    const cw = Math.min(w / 2 - stubX - 30, g.measureText(gv.code).width + 40);
    g.fillStyle = "rgba(255,255,255,.9)";
    roundRect(g, tx - cw / 2, h / 2 - 58, cw, 40, 20);
    g.fill();
    g.fillStyle = "#3b1d06";
    fit(g, gv.code, `700 {s}px "Courier New", monospace`, 26, cw - 24);
    g.fillText(gv.code, tx, h / 2 - 37);
    if (gv.brand && gv.amount) {
      // the brand in the stub, under the gift (without the amount it's the big line)
      g.fillStyle = "#5a2d0c";
      fit(g, gv.brand, `italic 700 {s}px ${PLAYFAIR}`, 22, 140);
      g.fillText(gv.brand, -w / 2 + 85, h / 2 - 30);
    }
  }
  g.restore();
  // coins of light popping round it as it lands
  if (dt < 1.6) {
    const rc = rng(41);
    for (let i = 0; i < 16; i++) {
      const ang = rc() * Math.PI * 2, sp = 180 + rc() * 260;
      const x = cx + Math.cos(ang) * sp * dt, y = cy + Math.sin(ang) * sp * dt * 0.6 + 200 * dt * dt;
      g.save();
      g.globalAlpha = Math.max(0, 1 - dt / 1.6);
      sparkle(g, x, y, 8 + rc() * 6, i % 2 ? "#ffe9a8" : "#ffffff");
      g.restore();
    }
  }
};

/**
 * The animated poster as a short video: the candles lit one by one, blown
 * out, then the "Happy Birthday!" pop-up (VIDEO_SHOW);
 * { blob, ext } — an MP4 where the browser can record one, else WebM.
 */
const recordPosterVideo = async (opts, { seconds = 10, show = videoShow(opts) } = {}) => {
  const types = ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm"];
  const type = types.find((ty) => window.MediaRecorder?.isTypeSupported?.(ty));
  if (!type) throw new Error("no recorder");
  const still = paintPhotoPoster({ ...opts, layer: "base" });
  const c = document.createElement("canvas");
  c.width = POSTER_SIZE;
  c.height = POSTER_SIZE;
  const g = c.getContext("2d");
  const draw = (t) => {
    g.drawImage(still, 0, 0);
    drawPosterMotion(g, opts, t, show);
  };
  draw(0);
  const rec = new MediaRecorder(c.captureStream(30), { mimeType: type, videoBitsPerSecond: 6_000_000 });
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  const stopped = new Promise((resolve) => {
    rec.onstop = resolve;
  });
  rec.start();
  const t0 = performance.now();
  await new Promise((resolve) => {
    const step = () => {
      const t = (performance.now() - t0) / 1000;
      draw(t);
      if (t < seconds) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
  rec.stop();
  await stopped;
  return { blob: new Blob(chunks, { type: type.split(";")[0] }), ext: type.includes("mp4") ? "mp4" : "webm" };
};

const posterFileName = (kind, name) =>
  `happy-${kind}-${(name || "card").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "card"}.png`;

/**
 * The animated poster as a looping GIF (the same story as the video: the
 * candles lit one by one, blown out, the pop-up), drawn frame by frame, so
 * it plays straight away wherever it's posted: WhatsApp, Instagram, an email.
 * `size` px square, `fps` frames a second, the last frame held `hold` ms;
 * `onProgress(0…1)` as it goes. A GIF Blob.
 */
const recordPosterGif = async (opts, { size = 540, fps = 10, seconds = 9, show = videoShow(opts), hold = 2500, onProgress } = {}) => {
  const still = paintPhotoPoster({ ...opts, layer: "base" });
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d", { willReadFrequently: true });
  const k = size / POSTER_SIZE;
  const gif = GIFEncoder();
  const frames = Math.round(seconds * fps);
  const delay = Math.round(1000 / fps);
  for (let i = 0; i <= frames; i++) {
    const t = i / fps;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(still, 0, 0, size, size);
    g.setTransform(k, 0, 0, k, 0, 0);
    drawPosterMotion(g, opts, t, show);
    const { data } = g.getImageData(0, 0, size, size);
    const palette = quantize(data, 256);
    gif.writeFrame(applyPalette(data, palette), size, size, { palette, delay: i === frames ? hold : delay });
    if (i % 4 === 0) {
      onProgress?.(i / frames);
      await new Promise((resolve) => setTimeout(resolve, 0)); // let the page breathe
    }
  }
  gif.finish();
  onProgress?.(1);
  return new Blob([gif.bytes()], { type: "image/gif" });
};

/**
 * The photo poster's sounds (components/panels/PhotoPosterDrawer.jsx), made
 * with Web Audio: a little bell as each light catches (rising up a pentatonic
 * scale), a breath of air as the candles are blown out, a "ta-da" as the
 * pop-up springs up, and the occasion's song played like a music box, each
 * note on the audio clock (so it keeps time), with a soft bass and a touch
 * of room echo. Everything goes through one gain, so stopAll() hushes it.
 */


let master = null;
let echo = null;

const ctx = () => {
  const c = getSfxContext();
  if (!c) return null;
  if (c.state === "suspended") c.resume().catch(() => {});
  if (!master || master.context !== c) {
    master = c.createGain();
    master.gain.value = 0.9;
    master.connect(c.destination);
    // a small room: a second of decaying noise as the impulse
    echo = c.createConvolver();
    const len = Math.floor(c.sampleRate * 1.6);
    const ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    }
    echo.buffer = ir;
    const wet = c.createGain();
    wet.gain.value = 0.22;
    echo.connect(wet);
    wet.connect(master);
  }
  return c;
};

// one note: a music-box / bell voice (a sine with soft overtones, a quick strike and a long fade)
const note = (c, freq, at, dur, vol = 0.22, bright = 1) => {
  const out = c.createGain();
  out.gain.setValueAtTime(0.0001, at);
  out.gain.exponentialRampToValueAtTime(vol, at + 0.008);
  out.gain.exponentialRampToValueAtTime(0.0001, at + Math.max(0.25, dur));
  out.connect(master);
  out.connect(echo);
  [[1, 1], [2, 0.32 * bright], [3, 0.12 * bright], [4.2, 0.05 * bright]].forEach(([mult, level]) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = freq * mult;
    g.gain.value = level;
    o.connect(g);
    g.connect(out);
    o.start(at);
    o.stop(at + Math.max(0.3, dur) + 0.05);
  });
};

// a soft low note under the tune
const bass = (c, freq, at, dur) => {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "triangle";
  o.frequency.value = freq / 2;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.09, at + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(master);
  o.start(at);
  o.stop(at + dur + 0.05);
};

// C6 D6 E6 G6 A6 C7 D7: each light a step higher
const SCALE = [1047, 1175, 1319, 1568, 1760, 2093, 2349];

/** A light catching: a little bell, higher for each one. */
const lightChime = (i) => {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime + 0.01;
  note(c, SCALE[i % SCALE.length], t, 0.9, 0.16, 0.7);
  note(c, SCALE[(i + 2) % SCALE.length] * 2, t + 0.05, 0.4, 0.04, 0.3); // a glint above it
};

/** Blowing the candles out: a breath of air, falling. */
const blowWhoosh = () => {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime + 0.01;
  const len = Math.floor(c.sampleRate * 0.8);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.8;
  band.frequency.setValueAtTime(1800, t);
  band.frequency.exponentialRampToValueAtTime(350, t + 0.7);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
  src.connect(band);
  band.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + 0.8);
};

/** The pop-up springing up: a quick rising sparkle, then a bright chord. */
const tada = () => {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime + 0.01;
  [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => note(c, f, t + i * 0.045, 0.5, 0.1, 0.6));
  [523, 659, 784].forEach((f) => note(c, f, t + 0.32, 1.6, 0.12, 0.9));
  bass(c, 262, t + 0.32, 1.4);
};

/**
 * The occasion's song: [[freq, beats], …] at `bpm`, from `delay` s; a bass note on each bar's
 * first beat. Returns when it ends (s).
 */
const playSong = (song, { bpm = 120, delay = 0 } = {}) => {
  const c = ctx();
  if (!c || !song?.length) return 0;
  const beat = 60 / bpm;
  let t = c.currentTime + 0.05 + delay;
  let beats = 0;
  song.forEach(([f, b]) => {
    const dur = b * beat;
    if (f) {
      note(c, f, t, dur * 1.6 + 0.25, 0.2);
      if (beats % 3 === 0) bass(c, f, t, dur * 2);
    }
    t += dur;
    beats += b;
  });
  return t - c.currentTime;
};

/** Hush everything playing now (a replay, closing the maker). */
const stopAll = () => {
  if (!master) return;
  const c = master.context;
  const old = master;
  old.gain.setTargetAtTime(0.0001, c.currentTime, 0.05);
  setTimeout(() => old.disconnect(), 300);
  master = null; // the next sound makes a new one
};

const G4 = 392, A4 = 440, B4 = 494, C5 = 523, D5 = 587, E5 = 659, F5 = 698, G5 = 784, A5 = 880, E4 = 330, F4 = 349;

/** The songs, in beats (3/4 for Happy Birthday). */
const SONGS = {
  // Happy birthday to you, happy birthday to you, happy birthday dear …, happy birthday to you
  birthday: {
    bpm: 150,
    notes: [
      [G4, 0.75], [G4, 0.25], [A4, 1], [G4, 1], [C5, 1], [B4, 2],
      [G4, 0.75], [G4, 0.25], [A4, 1], [G4, 1], [D5, 1], [C5, 2],
      [G4, 0.75], [G4, 0.25], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 2],
      [F5, 0.75], [F5, 0.25], [E5, 1], [C5, 1], [D5, 1], [C5, 3],
    ],
  },
  // Jingle bells, jingle bells, jingle all the way …
  christmas: {
    bpm: 200,
    notes: [
      [E5, 1], [E5, 1], [E5, 2], [E5, 1], [E5, 1], [E5, 2],
      [E5, 1], [G5, 1], [C5, 1.5], [D5, 0.5], [E5, 4],
      [F5, 1], [F5, 1], [F5, 1.5], [F5, 0.5], [F5, 1], [E5, 1], [E5, 1], [E5, 0.5], [E5, 0.5],
      [E5, 1], [D5, 1], [D5, 1], [E5, 1], [D5, 2], [G5, 2],
    ],
  },
  // a bright festive tune for the rest
  festive: {
    bpm: 140,
    notes: [
      [C5, 0.5], [E5, 0.5], [G5, 1], [E5, 0.5], [G5, 0.5], [A5, 1], [G5, 1],
      [E5, 0.5], [D5, 0.5], [C5, 1], [D5, 0.5], [E5, 0.5], [C5, 2],
      [G4, 0.5], [C5, 0.5], [E5, 1], [D5, 1], [C5, 2],
    ],
  },
  // soft and slow, for an anniversary / Eid
  gentle: {
    bpm: 96,
    notes: [
      [E4, 1], [G4, 1], [C5, 2], [B4, 1], [A4, 1], [G4, 2],
      [F4, 1], [A4, 1], [D5, 2], [C5, 1], [B4, 1], [C5, 3],
    ],
  },
};

/** Which song an occasion plays. */
const songFor = (kind) =>
  SONGS[kind === "christmas" ? "christmas" : kind === "birthday" ? "birthday" : kind === "anniversary" || kind === "eid" ? "gentle" : "festive"];

window.Poster = { POSTER_SIZE, POSTER_KINDS, paintPhotoPoster, drawPosterMotion, kindOf, lightsOf, lightAt, videoShow, voucherOf, rupees,
  loadPosterFonts, lightChime, blowWhoosh, tada, playSong, songFor, stopAll };
})();
