// maxbittker.com/questions: ask me something, read what i've answered.
// The same page for everyone; i answer from /questions/answer. Everything
// about asking is blue, everything about answering pink.
import { INK } from "./pixel.js";
import { warmUp, swoosh } from "./sound.js";
import { S, textBlock, statusLine, paintCard, tools, pixelButton, post, problem, showAnswers } from "./ui.js";

textBlock(document.querySelector("h1"), [{ text: "Questions:", color: INK.blue }], () => ({ font: "plain", size: S.title }));
textBlock(document.querySelector(".answers-title"), [{ text: "Answers:", color: INK.blue }], () => ({ font: "plain", size: S.title }));

const form = document.querySelector("#ask");
const sendButton = form.querySelector(".send");
const send = pixelButton(sendButton, INK.blue, "send", "sent");
const status = statusLine(form.querySelector(".status"), INK.blue);
let sending = false;

const ask = paintCard(form.querySelector(".card"), {
  color: INK.blue,
  onChange() {
    send.show("send");
    sendButton.setAttribute("aria-label", "send");
    status("");
  },
});
tools(form.querySelector(".tools"), ask, INK.blue);
// like postcards, the cursor's waiting on the card when you arrive
if (!matchMedia("(pointer: coarse)").matches) ask.textarea.focus({ preventScroll: true });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (sending) return;
  const question = ask.snapshot();
  if (!question) return;
  sending = true;
  try {
    await post("/questions/ask", { question, typed: ask.typedText(), website: form.website.value });
    warmUp();
    swoosh();
    send.show("sent");
    sendButton.setAttribute("aria-label", "sent");
    ask.blowAway();
  } catch (err) {
    status(problem(err));
  } finally {
    sending = false;
  }
});

showAnswers(document.querySelector("#answers"), INK.blue);
