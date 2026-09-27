const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class FakeElement {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.classList = {
      values: new Set(),
      add: (...values) => values.forEach((value) => this.classList.values.add(value)),
      remove: (...values) => values.forEach((value) => this.classList.values.delete(value)),
      contains: (value) => this.classList.values.has(value),
      toggle: (value, force) => {
        const shouldAdd = force === undefined ? !this.classList.values.has(value) : force;
        if (shouldAdd) this.classList.values.add(value);
        else this.classList.values.delete(value);
        return shouldAdd;
      },
    };
    this.listeners = {};
    this.attributes = {};
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.innerHTML = "";
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
  click() { if (!this.disabled) this.listeners.click(); }
  focus() {}
}

const cells = Array.from({ length: 9 }, (_, index) => new FakeElement({ cell: String(index) }));
const status = new FakeElement();
const reset = new FakeElement();
const play = new FakeElement();
const scoreX = new FakeElement();
const scoreO = new FakeElement();
const nameX = new FakeElement();
const nameO = new FakeElement();
const board = new FakeElement();
const boardWrap = new FakeElement();
const section = new FakeElement();
status.innerHTML = '<span>×</span> Player X\'s turn';
scoreX.textContent = "0";
scoreO.textContent = "0";
nameX.value = "Player X";
nameO.value = "Player O";
section.scrollIntoView = () => {};
const nodes = {
  "#game-status": status, "#reset-game": reset, "#play-tic-tac-toe": play,
  "#score-x": scoreX, "#score-o": scoreO, "#player-x-name": nameX,
  "#player-o-name": nameO, ".board": board, ".board-wrap": boardWrap,
  "#tic-tac-toe": section,
};
const timers = new Map();
let timerId = 1;
const fakeWindow = {
  setTimeout(callback, delay) {
    const id = timerId++;
    if (delay === 10000) timers.set(id, { callback, delay });
    else callback();
    return id;
  },
  clearTimeout(id) { timers.delete(id); },
};
const document = {
  querySelectorAll: (selector) => selector === "[data-cell]" ? cells : [],
  querySelector: (selector) => nodes[selector],
};

vm.runInNewContext(fs.readFileSync("app.js", "utf8"), { document, window: fakeWindow });

function move(index) { cells[index].click(); }
function resetGame() { reset.click(); }
function statusText() { return status.innerHTML.replace(/<[^>]+>/g, "").trim(); }
function finishDraw() { [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(move); }
function fireDrawTimer() {
  assert.equal(timers.size, 1);
  const [id, timer] = [...timers.entries()][0];
  assert.equal(timer.delay, 10000);
  timers.delete(id);
  timer.callback();
}

assert.match(statusText(), /Player X's turn/);
nameX.value = "<A & B>";
nameX.listeners.input();
assert.match(status.innerHTML, /&lt;A &amp; B&gt;/);
move(0);
assert.match(statusText(), /Player O's turn/);
assert.equal(cells[0].disabled, true);
assert.match(statusText(), /Player O's turn/);

// X wins. The custom name is escaped in status markup, and the score updates.
move(3); move(1); move(4); move(2);
assert.match(status.innerHTML, /&lt;A &amp; B&gt; wins the round/);
assert.equal(scoreX.textContent, 1);
assert.equal(cells.every((cell) => cell.disabled), true);

// Manual reset keeps names and scores.
resetGame();
assert.equal(cells.every((cell) => !cell.disabled && cell.textContent === ""), true);
assert.equal(scoreX.textContent, 1);
assert.equal(nameX.value, "<A & B>");

// Draw is highlighted and frozen for the full pending 10-second timer.
nameX.value = "Sunny";
nameO.value = "River";
finishDraw();
assert.match(statusText(), /draw/i);
assert.match(statusText(), /10 seconds/);
assert.equal(board.classList.contains("draw-board"), true);
assert.equal(boardWrap.classList.contains("draw-board-wrap"), true);
assert.equal(cells.every((cell) => cell.disabled && cell.classList.contains("draw-cell")), true);
const snapshot = cells.map((cell) => cell.textContent).join("");
assert.equal(snapshot.length, 9);
assert.equal(timers.size, 1);

// Manual reset can interrupt the display timer and keeps both entered names.
resetGame();
assert.equal(timers.size, 0);
assert.equal(board.classList.contains("draw-board"), false);
assert.equal(cells.every((cell) => !cell.disabled && cell.textContent === ""), true);
assert.equal(nameX.value, "Sunny");
assert.equal(nameO.value, "River");

// A subsequent draw automatically resets after exactly one 10-second timer.
finishDraw();
const autoResetSnapshot = cells.map((cell) => cell.textContent).join("");
fireDrawTimer();
assert.equal(cells.every((cell) => !cell.disabled && cell.textContent === ""), true);
assert.notEqual(cells.map((cell) => cell.textContent).join(""), autoResetSnapshot);
assert.equal(board.classList.contains("draw-board"), false);
assert.match(statusText(), /Sunny's turn/);
assert.equal(nameX.value, "Sunny");
assert.equal(nameO.value, "River");

const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
assert.match(html, /id="player-x-name"/);
assert.match(html, /id="player-o-name"/);
assert.match(html, /aria-live="polite"/);
assert.match(css, /\.cell\.draw-cell/);
assert.match(css, /\.draw-status/);

console.log("PASS: player names, safe name rendering, win score, draw highlight, 10-second timer, auto reset, and manual reset");
