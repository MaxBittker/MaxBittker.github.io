// Draws text and boxes the way the postcards write page does: Hershey strokes
// plotted as 1px Bresenham lines on a low-resolution canvas, which CSS scales
// back up with image-rendering: pixelated. Sizes here are all in those big
// "art" pixels.
import FONTS from "./hershey-font.js";

export const INK = {
  blue: "#78b3d6",
  pink: "#fccbcb",
  green: "#4f7969",
};

// Hershey glyphs are drawn on a grid where `size` spans this many units
const UNITS = 28;
const R = "R".charCodeAt(0);

// the postcards pixelArtLine: every pixel from one end to the other, both ends included
export function line(ctx, x1, y1, x2, y2) {
  x1 = Math.floor(x1);
  y1 = Math.floor(y1);
  x2 = Math.floor(x2);
  y2 = Math.floor(y2);
  const dx = Math.abs(x2 - x1);
  const sx = x1 < x2 ? 1 : -1;
  const dy = -Math.abs(y2 - y1);
  const sy = y1 < y2 ? 1 : -1;
  let er = dx + dy;
  ctx.beginPath();
  for (;;) {
    ctx.rect(x1, y1, 1, 1);
    if (x1 === x2 && y1 === y2) break;
    const e2 = 2 * er;
    if (e2 > dy) {
      er += dy;
      x1 += sx;
    }
    if (e2 < dx) {
      er += dx;
      y1 += sy;
    }
  }
  ctx.fill();
}

// the smallest box around everything drawn on a canvas, or null if nothing is
export function inkBounds(ctx) {
  const { width, height } = ctx.canvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!data[(y * width + x) * 4 + 3]) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
}

// every other pixel, like the postcards eraser outline. each side starts from
// the corner before it, going round, so every corner gets a dot
export function dashedBox(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  const x2 = x + w - 1;
  const y2 = y + h - 1;
  for (let i = 0; i < w; i += 2) {
    ctx.fillRect(x + i, y, 1, 1);
    ctx.fillRect(x2 - i, y2, 1, 1);
  }
  for (let j = 0; j < h; j += 2) {
    ctx.fillRect(x2, y + j, 1, 1);
    ctx.fillRect(x, y2 - j, 1, 1);
  }
}

// Hershey only knows ASCII, so fold the usual typographic characters and
// accents down to it. Anything else (emoji, other scripts) isn't drawn
const FOLD = {
  "‘": "'", "’": "'", "‚": "'", "′": "'",
  "“": '"', "”": '"', "„": '"', "″": '"',
  "–": "-", "—": "--", "−": "-", "…": "...",
  "\u00a0": " ", "\t": " ",
};

function hersheyText(font, s) {
  if (FOLD[s]) s = FOLD[s];
  if ([...s].every((c) => font[c])) return s;
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (s && [...s].every((c) => font[c])) return s;
  return null;
}

// Each character is drawn once per font, size and color into its own little
// canvas, then stamped wherever it's needed. Sprite offsets are from the
// character's top-left in a line of height `lineSize`.
const sprites = new Map();
const NOTHING = { canvas: null, dx: 0, dy: 0, advance: 0 };

function sprite(fontName, size, lineSize, color, s) {
  const key = `${fontName} ${size} ${lineSize} ${color} ${s}`;
  let sp = sprites.get(key);
  if (!sp) {
    const font = FONTS[fontName];
    const ascii = hersheyText(font, s);
    sp = ascii === null ? NOTHING : hersheySprite(font, size, lineSize, color, ascii);
    sprites.set(key, sp);
  }
  return sp;
}

function hersheySprite(font, size, lineSize, color, s) {
  const ratio = size / UNITS;
  const top = Math.round(lineSize / 2);
  const strokes = [];
  let advance = 0;
  for (const c of s) {
    const entry = font[c];
    const xmin = Math.round((entry.charCodeAt(3) - R) * ratio);
    const xmax = Math.round((entry.charCodeAt(4) - R) * ratio);
    const body = entry.slice(5);
    let stroke = [];
    for (let i = 0; i < body.length; i += 2) {
      if (body[i] === " " && body[i + 1] === "R") {
        if (stroke.length) strokes.push(stroke);
        stroke = [];
        continue;
      }
      stroke.push([
        advance + Math.round((body.charCodeAt(i) - R) * ratio) - xmin,
        top + Math.round((body.charCodeAt(i + 1) - R) * ratio),
      ]);
    }
    if (stroke.length) strokes.push(stroke);
    advance += xmax - xmin;
  }

  const points = strokes.flat();
  if (!points.length) return { canvas: null, dx: 0, dy: 0, advance };
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const dx = Math.min(...xs);
  const dy = Math.min(...ys);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(...xs) - dx + 1;
  canvas.height = Math.max(...ys) - dy + 1;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  for (const st of strokes) {
    if (st.length === 1) line(ctx, st[0][0] - dx, st[0][1] - dy, st[0][0] - dx, st[0][1] - dy);
    for (let i = 1; i < st.length; i++) {
      line(ctx, st[i - 1][0] - dx, st[i - 1][1] - dy, st[i][0] - dx, st[i][1] - dy);
    }
  }
  return { canvas, dx, dy, advance };
}

const segmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter() : null;

export function graphemes(text) {
  if (segmenter) return [...segmenter.segment(text)].map(({ segment, index }) => ({ s: segment, i: index }));
  const out = [];
  let i = 0;
  for (const s of text) {
    out.push({ s, i });
    i += s.length;
  }
  return out;
}

// the text with anything the font can't draw taken out, keeping line breaks
export function drawable(text, font = "simplex") {
  return graphemes(text)
    .filter(({ s }) => isNewline(s) || hersheyText(FONTS[font], s) !== null)
    .map(({ s }) => s)
    .join("");
}

const isNewline = (s) => s === "\n" || s === "\r\n";
const isSpace = (s) => /^\s$/.test(s) && !isNewline(s);

// Lays out runs of colored text into lines, wrapping at spaces (and inside
// words too long for a line). Returns what `draw` needs, plus the caret
// position before every character so the text tool can show where you are.
export function layout(runs, { font = "simplex", size, lineHeight = 1, width, align = "left" }) {
  const lineSize = Math.round(size * lineHeight);

  const clusters = [];
  let offset = 0;
  for (const run of runs) {
    for (const g of graphemes(run.text)) clusters.push({ s: g.s, i: offset + g.i, color: run.color });
    offset += run.text.length;
  }

  const items = [];
  const carets = new Map();
  const lineEnds = [0];
  let x = 0;
  let ln = 0;
  const newline = () => {
    ln++;
    x = 0;
    lineEnds[ln] = 0;
  };
  const advance = (c) => sprite(font, size, lineSize, c.color, c.s).advance;

  let k = 0;
  while (k < clusters.length) {
    const c = clusters[k];
    if (isNewline(c.s)) {
      carets.set(c.i, { x, ln });
      newline();
      k++;
    } else if (isSpace(c.s)) {
      carets.set(c.i, { x, ln });
      x = Math.min(x + advance(c), width);
      k++;
    } else {
      let end = k;
      let w = 0;
      while (end < clusters.length && !isNewline(clusters[end].s) && !isSpace(clusters[end].s)) {
        w += advance(clusters[end]);
        end++;
      }
      if (x + w > width && x > 0) newline();
      for (; k < end; k++) {
        const c = clusters[k];
        const sp = sprite(font, size, lineSize, c.color, c.s);
        if (x + sp.advance > width && x > 0) newline();
        carets.set(c.i, { x, ln });
        items.push({ sp, x, ln, i: c.i });
        x += sp.advance;
        lineEnds[ln] = x;
      }
    }
  }
  const end = { x, ln };

  if (align === "center") {
    const shift = lineEnds.map((w) => Math.floor((width - w) / 2));
    for (const it of items) it.x += shift[it.ln];
    for (const c of carets.values()) c.x += shift[c.ln];
    end.x += shift[end.ln];
    lineEnds.forEach((w, l) => (lineEnds[l] = w + shift[l]));
  }

  let height = (ln + 1) * lineSize;
  for (const it of items) {
    if (it.sp.canvas) height = Math.max(height, it.ln * lineSize + it.sp.dy + it.sp.canvas.height);
  }

  return {
    items,
    lineSize,
    height,
    width: Math.max(0, ...lineEnds),
    size,
    caret(index) {
      if (index >= offset) return end;
      for (let i = index; i >= 0; i--) if (carets.has(i)) return carets.get(i);
      return { x: 0, ln: 0 };
    },
  };
}

export function draw(ctx, lay, ox = 0, oy = 0) {
  for (const { sp, x, ln } of lay.items) {
    if (sp.canvas) ctx.drawImage(sp.canvas, ox + x + sp.dx, oy + ln * lay.lineSize + sp.dy);
  }
}

// a text cursor the height of a capital, for a caret from `lay.caret()`
export function drawCaret(ctx, lay, pos, ox, oy, color) {
  const ratio = lay.size / UNITS;
  const top = Math.round(lay.lineSize / 2) - Math.round(12 * ratio);
  const h = Math.round(24 * ratio);
  ctx.fillStyle = color;
  ctx.fillRect(ox + pos.x, oy + pos.ln * lay.lineSize + top, 1, h);
}
