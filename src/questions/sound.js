// The postcards key clicks and send swoosh. keyclicks.mp3 is the five clicks
// the write page plays, cut out of its recording and laid end to end
const CLICKS = 5;
const CLICK_LENGTH = 0.6; // seconds

let context = null;
const buffers = {};

// browsers only let audio start from a user gesture, so this waits for one
export function warmUp() {
  if (context) return context.resume();
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return;
  context = new Context();
  for (const name of ["keyclicks", "swoosh", "pencil", "shutter"]) {
    buffers[name] = fetch(`/questions/${name}.mp3`)
      .then((res) => res.arrayBuffer())
      .then((data) => context.decodeAudioData(data))
      .catch(() => null);
  }
}

async function play(name, offset, duration, gain) {
  if (!context) return;
  const buffer = await buffers[name];
  if (!buffer) return;
  const source = context.createBufferSource();
  source.buffer = buffer;
  const env = context.createGain();
  source.connect(env);
  env.connect(context.destination);

  const now = context.currentTime;
  const length = Math.min(duration, buffer.duration - offset);
  env.gain.setValueAtTime(gain, now);
  env.gain.linearRampToValueAtTime(gain, now + length * 0.95);
  env.gain.linearRampToValueAtTime(0, now + length);
  source.start(now, offset, length);
  source.stop(now + length + 0.1);
}

let clickI = 0;
export function click() {
  play("keyclicks", (clickI++ % CLICKS) * CLICK_LENGTH, CLICK_LENGTH, 0.4);
}

export function swoosh() {
  play("swoosh", 0, 10, 0.4);
}

// A grain of blown ink landing on another, `delay` seconds from now: a few
// milliseconds of fading noise, made once, rung at a different pitch each time
let grit = null;
export function tick(delay) {
  if (!context) return;
  if (!grit) {
    const length = Math.round(context.sampleRate * 0.012);
    grit = context.createBuffer(1, length, context.sampleRate);
    const data = grit.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  }
  const source = context.createBufferSource();
  source.buffer = grit;
  const band = context.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 1500 + Math.random() * 3500;
  band.Q.value = 1.5;
  const env = context.createGain();
  env.gain.value = 0.16 + Math.random() * 0.24;
  source.connect(band).connect(env).connect(context.destination);
  source.start(context.currentTime + delay);
}

// The postcards pencil and eraser sound: a steady stream of short grains
// from a recording, swaying back and forth through it, louder the faster
// you move and filtered by which way you're going. Presets are the write
// page's (the pencil's start is its 5.65s, wrapped around the 3.54s file)
const SCRIBBLES = {
  pen: { file: "pencil", start: 2.113, grain: 0.4, spread: 1.6, sway: 3 },
  erase: { file: "shutter", start: 0, grain: 0.214, spread: 0.1, sway: 0 },
};
const GRAINS_PER_SECOND = 30;

let filter;
let level;
let envelope;
let scribble = null;
let grainTimer = null;
let stopTimer = null;
let speed = 0;
let swaySpeed = 0.2;
let swayClock = 0;
let lastGrain = 0;

const clampMap = (v, a, b, c, d) => c + (Math.min(Math.max((v - a) / (b - a), 0), 1)) * (d - c);

export function scribbleStart(kind) {
  if (!context) return;
  if (!filter) {
    filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 600;
    filter.Q.value = 0.4;
    level = context.createGain();
    envelope = context.createGain();
    envelope.gain.value = 0;
    filter.connect(level).connect(envelope).connect(context.destination);
  }
  scribble = SCRIBBLES[kind];
  speed = 0;
  level.gain.value = 0;
  clearTimeout(stopTimer);
  const now = context.currentTime;
  envelope.gain.cancelScheduledValues(now);
  envelope.gain.setValueAtTime(envelope.gain.value, now);
  envelope.gain.linearRampToValueAtTime(1, now + 0.1);
  if (!grainTimer) {
    lastGrain = performance.now();
    grainTimer = setInterval(grain, 1000 / GRAINS_PER_SECOND);
  }
}

// how far the pointer moved since last time, in art pixels, and which way
export function scribbleMove(distance, angle) {
  if (!scribble) return;
  speed = speed * 0.8 + (distance / 0.96) * 0.2;
  const scaled = Math.pow(speed, 0.65);
  const now = context.currentTime;
  level.gain.linearRampToValueAtTime(clampMap(scaled, 0, 16, 0, 1), now + 0.05);
  filter.frequency.linearRampToValueAtTime(clampMap(Math.sin(angle), -1, 1, 200, 700), now + 0.05);
  swaySpeed = clampMap(scaled, 0, 16, 0.2, 2);
}

export function scribbleEnd() {
  if (!scribble) return;
  const tail = scribble.grain * 1.2;
  const now = context.currentTime;
  envelope.gain.cancelScheduledValues(now);
  envelope.gain.setValueAtTime(envelope.gain.value, now);
  envelope.gain.linearRampToValueAtTime(0, now + tail);
  stopTimer = setTimeout(() => {
    clearInterval(grainTimer);
    grainTimer = null;
  }, tail * 1000 + 100);
}

async function grain() {
  const t = performance.now();
  swayClock += ((t - lastGrain) / 1000) * swaySpeed;
  lastGrain = t;
  const { file, start, grain: length, spread, sway } = scribble;
  const buffer = await buffers[file];
  if (!buffer) return;

  const offset = start + (Math.abs((swayClock % 1) - 0.5) - 0.25) * sway + (Math.random() - 0.5) * spread * length;
  const source = context.createBufferSource();
  source.buffer = buffer;
  const env = context.createGain();
  source.connect(env).connect(filter);
  const now = context.currentTime;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(1, now + length * 0.2);
  env.gain.linearRampToValueAtTime(1, now + length * 0.8);
  env.gain.linearRampToValueAtTime(0, now + length);
  source.start(now, Math.max(0, offset), length);
  source.stop(now + length + 0.1);
}
