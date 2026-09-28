// Shared by the questions page (ask.js) and my answering page (answer.js):
// pixel text blocks, the card you draw on, and how a question and its answer
// are shown. Everything is drawn in the postcards style and kept on the
// postcards server.
import { layout, draw, drawCaret, dashedBox, line, drawable, graphemes, inkBounds, INK } from "./pixel.js";
import { warmUp, click, scribbleStart, scribbleMove, scribbleEnd } from "./sound.js";

const API = import.meta.env.PUBLIC_QUESTIONS_API || "https://postcards.maxbittker.com";

// text on a card is the same size in art pixels whatever it's drawn on, so a
// card drawn on a phone and one drawn on a laptop come out alike. phones get
// a narrower, taller card that fills the screen, so what's typed isn't tiny
const PHONE = window.innerWidth < 640;
const CARD = { w: PHONE ? 340 : 400, h: PHONE ? 170 : 120, pad: 10, text: 15 };
const ERASER = matchMedia("(pointer: coarse)").matches ? [20, 26] : [12, 16];

// how many CSS pixels one art pixel covers, and text sizes in art pixels.
// phones get finer pixels so a line of text still holds a thought. cards
// scale to fit the column instead (the whole screen on phones), up to the
// same 2px
export let S = scale();
function scale() {
  const column = document.querySelector("main").clientWidth;
  const phone = window.innerWidth < 640;
  const s = phone
    ? { px: 1, text: 17, title: 36, small: 26 }
    : { px: 2, text: 12, title: 27, small: 18 };
  s.cardPx = Math.min(2, (phone ? document.documentElement.clientWidth : column) / CARD.w);
  document.documentElement.style.setProperty("--card-px", s.cardPx);
  return s;
}

// ---- blocks: elements drawn entirely onto a canvas inside them ----

const blocks = new Set();

const nearby = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const b = e.target.block;
      b.near = e.isIntersecting;
      if (b.near && b.dirty) paint(b);
    }
  },
  { rootMargin: "1500px 0px" },
);

// measure(width) lays the block out for a width in art pixels and returns its
// size; paint(ctx, b) draws that layout. inline blocks are only as wide as
// their content, lazy ones wait until they're close to being scrolled into view
function block(el, { measure, paint, inline = false, lazy = false }) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  el.prepend(canvas);
  const b = { el, canvas, measure, paint, inline, lazy, near: !lazy, dirty: true, w: 0, h: 0 };
  el.block = b;
  blocks.add(b);
  if (lazy) nearby.observe(el);
  refresh(b);
  return b;
}

function refresh(b) {
  const room = (b.inline ? b.el.parentElement : b.el).clientWidth;
  const { w, h } = b.measure(Math.floor(room / S.px));
  b.w = Math.max(1, w);
  b.h = Math.max(1, h);
  b.canvas.style.width = `${b.w * S.px}px`;
  b.canvas.style.height = `${b.h * S.px}px`;
  b.el.style.height = `${b.h * S.px}px`;
  if (b.inline) b.el.style.width = `${b.w * S.px}px`;
  if (b.near) paint(b);
  else b.dirty = true;
}

function paint(b) {
  b.canvas.width = b.w;
  b.canvas.height = b.h;
  b.paint(b.canvas.getContext("2d"), b);
  b.dirty = false;
}

// empties a section, letting go of the blocks drawn in it
export function clear(section) {
  for (const b of [...blocks]) {
    if (!section.contains(b.el)) continue;
    if (b.lazy) nearby.unobserve(b.el);
    blocks.delete(b);
  }
  section.replaceChildren();
}

const cards = new Set();
let lastWidth = 0;
new ResizeObserver(([entry]) => {
  const width = entry.contentRect.width;
  if (width === lastWidth) return;
  lastWidth = width;
  S = scale();
  for (const b of blocks) refresh(b);
  for (const c of cards) c.fit();
}).observe(document.querySelector("main"));

export function textBlock(el, runs, opts, flags) {
  let lay;
  return block(el, {
    ...flags,
    measure(w) {
      lay = layout(typeof runs === "function" ? runs() : runs, { ...opts(), width: w });
      return { w: flags?.inline ? lay.width + 1 : w, h: lay.items.length ? lay.height : 0 };
    },
    paint: (ctx) => draw(ctx, lay),
  });
}

// a line of small text that can change, for when something goes wrong
export function statusLine(el, ink) {
  let text = "";
  const b = textBlock(el, () => [{ text, color: ink }], () => ({ size: S.text }));
  return (t) => {
    text = t;
    el.textContent = "";
    el.append(b.canvas, Object.assign(document.createElement("span"), { className: "sr", textContent: t }));
    refresh(b);
  };
}

// ---- the card you draw on ----

// A card works like the postcards write page: everything on it is paint.
// The text tool puts a cursor where you click, and what you type there is
// painted in when you click somewhere else, change tools or send, after
// which the eraser can take it out like anything else.
export function paintCard(el, { color, onChange = () => {} }) {
  const textarea = el.querySelector("textarea");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = CARD.w;
  canvas.height = CARD.h;
  el.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const ink = document.createElement("canvas");
  ink.width = CARD.w;
  ink.height = CARD.h;
  const inkCtx = ink.getContext("2d", { willReadFrequently: true });

  let tool = "text";
  let typedRuns = []; // text painted in, and where, so we know what was typed
  let typedBefore = ""; // what was typed on an earlier drawing, when redoing one
  let cursor = null; // where the text being typed starts
  let blink = true;
  let eraserAt = null;
  let gust = null; // ink blowing off the card after a send, on its own canvas

  const typed = () => layout([{ text: textarea.value, color }], { size: CARD.text, width: CARD.w - CARD.pad - cursor.x });

  function render() {
    ctx.clearRect(0, 0, CARD.w, CARD.h);
    dashedBox(ctx, 0, 0, CARD.w, CARD.h, color);
    ctx.drawImage(ink, 0, 0);
    if (gust) ctx.drawImage(gust, 0, 0);
    if (cursor) {
      const lay = typed();
      draw(ctx, lay, cursor.x, cursor.y);
      if (tool === "text" && blink) drawCaret(ctx, lay, lay.caret(textarea.selectionStart), cursor.x, cursor.y, color);
    }
    if (tool === "erase" && eraserAt) {
      const [ew, eh] = ERASER;
      dashedBox(ctx, eraserAt.x - ew / 2, eraserAt.y - eh / 2, ew, eh, color);
    }
  }

  const bounds = () => inkBounds(inkCtx);

  // Blows ink off the right of the card like a cellular automaton: every
  // step, each pixel tries to go right, stay, go up or go down, 4:1:1:1, and
  // only moves if nothing's there. Pixels step right to left, so a run of
  // them can all move off together
  function blow(img) {
    const { width: w, height: h } = img;
    const cells = new Uint32Array(img.data.buffer);
    const stepped = new Uint32Array(w * h); // the step each pixel last moved on
    const layer = document.createElement("canvas");
    layer.width = w;
    layer.height = h;
    const layerCtx = layer.getContext("2d");
    gust = layer;
    let n = 0;

    // returns how many pixels are still on the card
    function step() {
      n++;
      let left = 0;
      for (let x = w - 1; x >= 0; x--) {
        for (let k = 0; k < h; k++) {
          // up and down every other step, so neither way gets the head start
          const y = n % 2 ? k : h - 1 - k;
          const i = y * w + x;
          if (!cells[i] || stepped[i] === n) continue;
          const r = Math.floor(Math.random() * 7);
          if (r < 4 && x === w - 1) {
            cells[i] = 0;
            continue;
          }
          left++;
          if (r === 4 || (r === 5 && y === 0) || (r === 6 && y === h - 1)) continue;
          const j = r < 4 ? i + 1 : r === 5 ? i - w : i + w;
          if (cells[j]) continue;
          cells[j] = cells[i];
          cells[i] = 0;
          stepped[j] = n;
        }
      }
      return left;
    }

    // a step every 2ms, so the ink's gone as the swoosh ends
    let last = performance.now();
    requestAnimationFrame(function frame(t) {
      if (gust !== layer) return;
      const steps = Math.max(1, Math.min(16, Math.round((t - last) / 2)));
      last = t;
      let left = 1;
      for (let s = 0; s < steps && left; s++) left = step();
      layerCtx.putImageData(img, 0, 0);
      if (!left) gust = null;
      render();
      if (left) requestAnimationFrame(frame);
    });
  }

  function paintIn() {
    if (cursor && textarea.value) {
      const lay = typed();
      draw(inkCtx, lay, cursor.x, cursor.y);
      typedRuns.push({ text: textarea.value, lay, x: cursor.x, y: cursor.y });
    }
    cursor = null;
    textarea.value = "";
  }

  // The words typed onto the card, top to bottom, without any letters the
  // eraser has since taken most of. Pencil writing isn't in here; the server
  // reads the whole card for that
  function typedText() {
    const { data } = inkCtx.getImageData(0, 0, CARD.w, CARD.h);
    const inked = (x, y) => x >= 0 && y >= 0 && x < CARD.w && y < CARD.h && data[(y * CARD.w + x) * 4 + 3] > 0;
    const kept = ({ lay, x, y }, { sp, x: ix, ln }) => {
      if (!sp.canvas) return true;
      const { width, height } = sp.canvas;
      const glyph = sp.canvas.getContext("2d").getImageData(0, 0, width, height).data;
      let drawn = 0;
      let left = 0;
      for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
          if (!glyph[(py * width + px) * 4 + 3]) continue;
          drawn++;
          if (inked(x + ix + sp.dx + px, y + ln * lay.lineSize + sp.dy + py)) left++;
        }
      }
      return left * 2 >= drawn;
    };
    const runs = [...typedRuns].sort((a, b) => a.y - b.y || a.x - b.x).map((run) => {
      const erased = new Set(run.lay.items.filter((it) => !kept(run, it)).map((it) => it.i));
      return graphemes(run.text).filter((g) => !erased.has(g.i)).map((g) => g.s).join("");
    });
    return [typedBefore, ...runs].join(" ").replace(/\s+/g, " ").trim();
  }

  // a cursor at the given spot, or if there isn't one, on the next line
  // below whatever's drawn so typing straight away does something sensible
  function place(at) {
    paintIn();
    if (!at) {
      const b = bounds();
      at = { x: CARD.pad, y: b ? b.y1 + 4 : CARD.pad };
    }
    cursor = {
      x: Math.max(2, Math.min(at.x, CARD.w - CARD.pad - CARD.text)),
      y: Math.max(0, Math.min(at.y, CARD.h - CARD.text)),
    };
    blink = true;
    render();
  }

  // ---- the text tool, through an invisible textarea ----

  textarea.addEventListener("focus", () => {
    warmUp();
    if (tool === "text" && !cursor) place();
  });
  // emoji and anything else the font can't draw don't go in at all, so
  // what's on the card is what gets sent
  const keepDrawable = () => {
    const value = textarea.value;
    const kept = drawable(value);
    if (kept === value) return;
    const caret = drawable(value.slice(0, textarea.selectionStart)).length;
    textarea.value = kept;
    textarea.setSelectionRange(caret, caret);
  };
  textarea.addEventListener("input", (e) => {
    if (!e.isComposing) keepDrawable();
    if (!cursor) {
      const text = textarea.value;
      place();
      textarea.value = text;
    }
    onChange();
    blink = true;
    render();
  });
  textarea.addEventListener("compositionend", () => {
    keepDrawable();
    render();
  });
  document.addEventListener("selectionchange", () => {
    if (document.activeElement !== textarea) return;
    blink = true;
    render();
  });
  textarea.addEventListener("keydown", (e) => {
    if (["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(e.key)) return;
    warmUp();
    click();
  });
  const blinker = setInterval(() => {
    if (!el.isConnected) return clearInterval(blinker);
    if (!cursor || tool !== "text") return;
    blink = !blink;
    render();
  }, 530);

  // ---- pencil and eraser ----

  let last = null;
  let trail = [];
  const at = (e) => {
    const r = canvas.getBoundingClientRect();
    return {
      x: Math.floor(((e.clientX - r.left) / r.width) * CARD.w),
      y: Math.floor(((e.clientY - r.top) / r.height) * CARD.h),
    };
  };
  // the postcards pen is a 1px line; its eraser clears a box dragged along the way
  const stroke = (from, to) => {
    if (tool === "pen") {
      inkCtx.fillStyle = color;
      line(inkCtx, from.x, from.y, to.x, to.y);
      return;
    }
    const [ew, eh] = ERASER;
    const steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) * 2));
    for (let i = 0; i <= steps; i++) {
      const x = Math.round(from.x + ((to.x - from.x) * i) / steps);
      const y = Math.round(from.y + ((to.y - from.y) * i) / steps);
      inkCtx.clearRect(x - ew / 2, y - eh / 2, ew, eh);
    }
  };

  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    warmUp();
    if (tool === "text") {
      // the click lands in the middle of the first line
      const p = at(e);
      place({ x: p.x, y: p.y - Math.round(CARD.text / 2) });
      textarea.focus({ preventScroll: true });
      return;
    }
    el.setPointerCapture(e.pointerId);
    scribbleStart(tool);
    last = at(e);
    trail = [last];
    stroke(last, last);
    eraserAt = last;
    onChange();
    render();
  });
  // phones only raise the keyboard for a focus that comes from a tap itself
  el.addEventListener("click", () => {
    if (tool === "text") textarea.focus({ preventScroll: true });
  });
  el.addEventListener("pointermove", (e) => {
    if (tool === "text") return;
    const here = at(e);
    if (last) {
      let moved = 0;
      const points = e.getCoalescedEvents?.() ?? [];
      for (const ev of points.length ? points : [e]) {
        const p = at(ev);
        moved += Math.hypot(p.x - last.x, p.y - last.y);
        stroke(last, p);
        last = p;
      }
      trail.push(here);
      if (trail.length > 6) trail.shift();
      scribbleMove(moved, Math.atan2(here.x - trail[0].x, here.y - trail[0].y));
    }
    eraserAt = here;
    render();
  });
  const lift = () => {
    if (!last) return;
    last = null;
    scribbleEnd();
  };
  el.addEventListener("pointerup", lift);
  el.addEventListener("pointercancel", lift);
  el.addEventListener("pointerleave", () => {
    eraserAt = null;
    render();
  });

  const card = {
    textarea,
    fit() {
      if (!el.isConnected) return cards.delete(card);
      canvas.style.width = `${CARD.w * S.cardPx}px`;
      canvas.style.height = `${CARD.h * S.cardPx}px`;
    },
    setTool(t) {
      if (t !== "text") paintIn();
      tool = t;
      el.dataset.tool = t;
      eraserAt = null;
      render();
    },
    // what's drawn, cropped to itself with a pixel to spare, or null if nothing is
    snapshot() {
      paintIn();
      render();
      const b = bounds();
      if (!b) return null;
      const x = Math.max(0, b.x0 - 1);
      const y = Math.max(0, b.y0 - 1);
      const out = document.createElement("canvas");
      out.width = Math.min(CARD.w, b.x1 + 2) - x;
      out.height = Math.min(CARD.h, b.y1 + 2) - y;
      out.getContext("2d").drawImage(ink, -x, -y);
      return out.toDataURL("image/png");
    },
    typedText,
    clear() {
      inkCtx.clearRect(0, 0, CARD.w, CARD.h);
      typedRuns = [];
      typedBefore = "";
      cursor = null;
      textarea.value = "";
      render();
    },
    // once something's sent: what's drawn blows away, leaving the card empty
    // to draw on straight away
    blowAway() {
      paintIn();
      const img = inkCtx.getImageData(0, 0, CARD.w, CARD.h);
      card.clear();
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) render();
      else blow(img);
    },
    // start from an earlier drawing, to redo it. what was typed on it comes
    // along as it was, since there's no telling which of it gets erased
    load(image, typed = "") {
      typedBefore = typed;
      const img = new Image();
      img.onload = () => {
        inkCtx.drawImage(img, CARD.pad, CARD.pad);
        render();
      };
      img.src = image;
    },
  };
  cards.add(card);
  card.fit();
  card.setTool("text");
  return card;
}

// ---- buttons ----

// The postcards buttons, drawn like the rest of the page: a dotted ink box
// and icon on black, filled in with ink while pointed at or chosen. Their
// pixels are 2 CSS pixels everywhere, the size the card's are on a laptop, so
// they're still big enough to tap on a phone. Odd sizes keep the dots evenly
// spaced all the way round
const BUTTON = { px: 2, h: 21, pad: 5 };

const PENCIL = [
  [6, 12, 12, 6], [8, 14, 14, 8], [12, 6, 14, 8], [10, 8, 12, 10], // body, end and band
  [6, 12, 4, 16], [8, 14, 4, 16], [4, 16, 5, 15], // point
];
const ERASER_ICON = [
  [3, 10, 7, 6], [7, 6, 16, 6], [16, 6, 12, 10], // top
  [3, 10, 12, 10], [3, 10, 3, 14], [3, 14, 12, 14], [12, 10, 12, 14], // front
  [16, 6, 16, 10], [16, 10, 12, 14], // side
];
const TRASH = [
  [4, 5, 15, 5], [8, 3, 11, 3], [8, 3, 8, 5], [11, 3, 11, 5], // lid and handle
  [5, 7, 14, 7], [5, 7, 6, 16], [14, 7, 13, 16], [6, 16, 13, 16], // can
  [8, 9, 8, 14], [11, 9, 11, 14], // ribs
];
const PLANE = [[0, 0, 11, 5], [11, 5, 0, 10], [0, 0, 3, 5], [3, 5, 0, 10]]; // pointing right, hollow

function strokes(ctx, lines, dx = 0, dy = 0) {
  for (const [x1, y1, x2, y2] of lines) line(ctx, x1 + dx, y1 + dy, x2 + dx, y2 + dy);
}

// capitals, returning how wide they came out
function caps(ctx, text, color, size = 13) {
  const lay = layout([{ text, color }], { size, width: 100 });
  draw(ctx, lay, 0, 0);
  return lay.width;
}

const ICONS = {
  text: (ctx, color) => caps(ctx, "A", color, 16),
  pen: (ctx) => strokes(ctx, PENCIL),
  erase: (ctx) => strokes(ctx, ERASER_ICON),
  trash: (ctx) => strokes(ctx, TRASH),
  send: (ctx, color) => strokes(ctx, PLANE, caps(ctx, "SEND", color) + 3, 1),
  sent: (ctx, color) => caps(ctx, "SENT!", color),
  undo: (ctx, color) => caps(ctx, "UNDO", color),
};

// an icon in a color, on a canvas cropped to it
const faces = new Map();
function face(name, color) {
  const key = `${name} ${color}`;
  if (!faces.has(key)) {
    const ctx = element("canvas").getContext("2d", { willReadFrequently: true });
    ctx.canvas.width = 100;
    ctx.canvas.height = BUTTON.h * 2;
    ctx.fillStyle = color;
    ICONS[name](ctx, color);
    const b = inkBounds(ctx);
    const out = element("canvas");
    out.width = b.x1 - b.x0 + 1;
    out.height = b.y1 - b.y0 + 1;
    out.getContext("2d").drawImage(ctx.canvas, -b.x0, -b.y0);
    faces.set(key, out);
  }
  return faces.get(key);
}

// draws a button in the page's ink. `icons` are the ones it can show, the
// first to start with, and it's wide enough for any of them
export function pixelButton(button, ink, ...icons) {
  const canvas = element("canvas");
  canvas.setAttribute("aria-hidden", "true");
  button.replaceChildren(canvas);
  button.classList.add("pixel");
  const w = Math.max(BUTTON.h, ...icons.map((i) => face(i, ink).width + 2 * BUTTON.pad)) | 1;
  canvas.width = w;
  canvas.height = BUTTON.h;
  canvas.style.width = `${w * BUTTON.px}px`;
  canvas.style.height = `${BUTTON.h * BUTTON.px}px`;
  const ctx = canvas.getContext("2d");
  let icon = icons[0];
  let pointed = false;

  function paint() {
    const lit = pointed || button.classList.contains("active");
    ctx.clearRect(0, 0, w, BUTTON.h);
    if (lit) {
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, w, BUTTON.h);
    } else {
      dashedBox(ctx, 0, 0, w, BUTTON.h, ink);
    }
    const f = face(icon, lit ? "#000" : ink);
    ctx.drawImage(f, Math.floor((w - f.width) / 2), Math.floor((BUTTON.h - f.height) / 2));
  }
  // a tap shouldn't leave a button lit on a phone
  if (matchMedia("(hover: hover)").matches) {
    button.addEventListener("pointerenter", () => {
      pointed = true;
      paint();
    });
    button.addEventListener("pointerleave", () => {
      pointed = false;
      paint();
    });
  }
  paint();
  return {
    paint,
    show(i) {
      icon = i;
      paint();
    },
  };
}

export function newButton(label, ink, icon) {
  const button = element("button");
  button.type = "button";
  button.setAttribute("aria-label", label);
  pixelButton(button, ink, icon);
  return button;
}

// the tool buttons, wired to a card
export function tools(el, card, ink) {
  const buttons = [...el.querySelectorAll("button")];
  const drawn = buttons.map((b) => pixelButton(b, ink, b.dataset.tool));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      for (const other of buttons) {
        other.classList.toggle("active", other === button);
        other.setAttribute("aria-pressed", String(other === button));
      }
      card.setTool(button.dataset.tool);
      for (const d of drawn) d.paint();
    });
  }
}

export function toolsElement() {
  const el = element("div", "tools");
  el.setAttribute("role", "toolbar");
  el.setAttribute("aria-label", "card tools");
  for (const [tool, label] of [["text", "type"], ["pen", "pencil"], ["erase", "eraser"]]) {
    const button = el.appendChild(element("button", tool === "text" ? "active" : ""));
    button.type = "button";
    button.dataset.tool = tool;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(tool === "text"));
  }
  return el;
}

// ---- talking to the postcards server ----

export async function post(path, body) {
  const res = await fetch(API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "something went wrong"), { status: res.status });
  return data;
}

export const problem = (err) => (err instanceof TypeError ? "couldn't reach the server" : err.message);

// ---- bits of page ----

export function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

// the little "max bittker" (or wherever) link in the corner
export function homeLink(el) {
  textBlock(el, [{ text: el.textContent.trim(), color: INK.green }], () => ({ font: "plain", size: S.small }), { inline: true });
}

// ---- a question and its answer ----

// 9.26.26, like bill's
function when(ms) {
  const d = new Date(ms);
  return `${d.getMonth() + 1}.${d.getDate()}.${String(d.getFullYear()).slice(2)}`;
}

// a drawn card, at the pixel size it was drawn at (or as near as fits), with
// what's written on it for anyone who can't see it
function drawing(src, className, text) {
  const img = element("img", `drawing ${className}`);
  img.alt = text || "";
  img.addEventListener("load", () => img.style.setProperty("--w", img.naturalWidth));
  img.src = src;
  return img;
}

// The date, the question, then my answer if there is one, in an article
export function exchange(q, date) {
  const el = element("article", "qa");
  el.id = `q-${q.id}`;
  el.append(element("h2", "sr", "a question, drawn on a card"));
  if (q.answer) el.append(element("p", "sr", "my answer, drawn on a card"));
  return {
    el,
    // blocks need to be on the page to measure, so this happens after
    draw() {
      const head = el.appendChild(element("div"));
      // as big as the writing on the cards below it
      const size = () => Math.round((CARD.text * S.cardPx) / S.px);
      textBlock(head, [{ text: when(date), color: INK.green }], () => ({ size: size() }), { lazy: true });
      el.append(drawing(q.question, "question", q.questionText));
      if (q.answer) el.append(drawing(q.answer, "answer", q.answerText));
    },
  };
}

// answered questions, most recently answered first, into a section. `after`
// can add something below each one
export async function showAnswers(section, ink, after) {
  let list;
  try {
    const res = await fetch(`${API}/questions`);
    if (!res.ok) throw new Error("couldn't load the answers");
    list = await res.json();
  } catch (err) {
    clear(section);
    statusLine(section.appendChild(element("p", "note")), ink)(problem(err));
    return;
  }
  clear(section);
  for (const q of list) {
    const x = exchange(q, q.answeredAt);
    section.append(x.el);
    x.draw();
    after?.(q, section);
  }
}
