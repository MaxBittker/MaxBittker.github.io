// maxbittker.com/questions/answer: where i answer questions. It takes the
// postcards key, and remembers it in this browser until it stops working.
// Everything about answering is pink.
import { INK } from "./pixel.js";
import { swoosh } from "./sound.js";
import { S, clear, element, newButton, pixelButton, paintCard, tools, toolsElement, statusLine, textBlock, post, problem, homeLink, exchange, showAnswers } from "./ui.js";

const KEY = "questions-key";
let key = localStorage.getItem(KEY);

homeLink(document.querySelector(".home"));
const login = document.querySelector("#login");
pixelButton(login.querySelector("button"), INK.pink, "send");
const status = statusLine(document.querySelector("main > .status"), INK.pink);
const inbox = document.querySelector("#inbox");
const answered = document.querySelector("#answered");
const trashed = document.querySelector("#trash");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  key = login.elements.pw.value;
  load();
});

async function load() {
  status("");
  let list;
  try {
    list = await post("/questions/inbox", { pw: key });
  } catch (err) {
    if (err.status === 403) {
      localStorage.removeItem(KEY);
      login.hidden = false;
      login.elements.pw.value = "";
      login.elements.pw.focus();
    } else {
      status(problem(err));
    }
    return;
  }
  localStorage.setItem(KEY, key);
  login.hidden = true;

  // unanswered, oldest first, each looking just as it will to everyone else
  clear(inbox);
  for (const q of list) {
    const item = inbox.appendChild(element("div", "asked"));
    item.append(exchange(q));
    answerer(item, q);
  }

  showAnswers(answered, INK.pink, (q, section) => {
    const slot = section.appendChild(element("div", "edit"));
    const row = slot.appendChild(element("div", "row"));
    row.appendChild(newButton("change answer", INK.pink, "pen")).addEventListener("click", () => {
      slot.replaceChildren();
      answerer(slot, q);
    });
  });
  showTrash();
}

// trashed questions, last trashed first, each one a click from going back
// to wherever it was
async function showTrash() {
  let list;
  try {
    list = await post("/questions/trash", { pw: key });
  } catch (err) {
    return status(problem(err));
  }
  clear(trashed);
  if (!list.length) return;
  const title = trashed.appendChild(element("h2", "trash-title"));
  title.append(element("span", "sr", "Trash:"));
  textBlock(title, [{ text: "Trash:", color: INK.pink }], () => ({ font: "plain", size: S.title }));
  for (const q of list) {
    trashed.append(exchange(q));
    const row = trashed.appendChild(element("div", "edit")).appendChild(element("div", "row"));
    row.appendChild(newButton("undo trash", INK.pink, "undo")).addEventListener("click", async () => {
      try {
        await post("/questions/answer", { pw: key, id: q.id, restore: true });
        load();
      } catch (err) {
        status(problem(err));
      }
    });
  }
}

// a card to draw an answer on, with its tools, trash and send
function answerer(container, q) {
  const cardEl = container.appendChild(element("div", "card"));
  cardEl.appendChild(element("textarea")).setAttribute("aria-label", "answer");
  const row = container.appendChild(element("div", "row"));
  const toolbar = row.appendChild(toolsElement());
  const trash = row.appendChild(newButton("trash", INK.pink, "trash"));
  const send = row.appendChild(newButton("answer", INK.pink, "send"));
  const problemLine = statusLine(container.appendChild(element("p", "status")), INK.pink);
  const card = paintCard(cardEl, { color: INK.pink, onChange: () => problemLine("") });
  tools(toolbar, card, INK.pink);
  if (q.answer) card.load(q.answer, q.answerTyped);

  async function save(body) {
    try {
      await post("/questions/answer", { pw: key, id: q.id, ...body });
      swoosh();
      load();
    } catch (err) {
      problemLine(problem(err));
    }
  }
  send.addEventListener("click", () => {
    const drawn = card.snapshot();
    if (drawn) save({ answer: drawn, typed: card.typedText() });
  });
  trash.addEventListener("click", () => save({ trash: true }));
}

if (key) load();
else login.hidden = false;
