const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(value) { this.values.add(value); }
  remove(...values) { values.forEach((value) => this.values.delete(value)); }
  contains(value) { return this.values.has(value); }
}

class FakeElement {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.classList = new FakeClassList();
    this.listeners = {};
    this.attributes = {};
    this.textContent = "";
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
const section = new FakeElement();
status.innerHTML = '<span>×</span> Player X\'s turn';
scoreX.textContent = "0";
scoreO.textContent = "0";
section.scrollIntoView = () => {};
const nodes = {
  "#game-status": status,
  "#reset-game": reset,
  "#play-tic-tac-toe": play,
  "#score-x": scoreX,
  "#score-o": scoreO,
  "#tic-tac-toe": section,
};
const document = {
  querySelectorAll: (selector) => selector === "[data-cell]" ? cells : [],
  querySelector: (selector) => nodes[selector],
};

vm.runInNewContext(fs.readFileSync("app.js", "utf8"), {
  document,
  window: { setTimeout: (callback) => callback() },
  setTimeout,
});

function move(index) { cells[index].click(); }
function resetGame() { reset.click(); }
function statusText() { return status.innerHTML.replace(/<[^>]+>/g, "").trim(); }

assert.match(statusText(), /Player X's turn/);
move(0);
assert.equal(cells[0].textContent, "×");
assert.equal(cells[0].disabled, true);
assert.match(statusText(), /Player O's turn/);

// X completes the top row. Attempts to overwrite occupied cells are ignored.
move(3); move(1); move(4); move(2);
assert.match(statusText(), /Player X wins/);
assert.equal(scoreX.textContent, 1);
assert.equal(cells.every((cell) => cell.disabled), true);
assert.equal(cells[0].textContent, "×");

// New round clears cells and winner styling while keeping score.
resetGame();
assert.match(statusText(), /Player X's turn/);
assert.equal(cells.every((cell) => !cell.disabled && cell.textContent === ""), true);
assert.equal(scoreX.textContent, 1);
assert.equal(cells[0].attributes["aria-label"], "Row 1, column 1, empty");

// Draw sequence contains no winning line.
[0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(move);
assert.match(statusText(), /draw/i);
assert.equal(scoreX.textContent, 1);
assert.equal(scoreO.textContent, 0);
assert.equal(cells.every((cell) => cell.disabled), true);

// Reset after draw starts another playable game; O can also win.
resetGame();
[0, 2, 1, 4, 3, 6].forEach(move);
assert.match(statusText(), /Player O wins/);
assert.equal(scoreO.textContent, 1);

// Structural checks for the page and responsive/accessibility hooks.
const html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
assert.match(html, /<h1 id="hero-title">/);
assert.match(html, /Memory Match/);
assert.match(html, /Quick Draw/);
assert.equal((html.match(/data-cell="/g) || []).length, 9);
assert.match(html, /aria-live="polite"/);
assert.match(css, /@media \(max-width: 650px\)/);
assert.match(css, /:focus-visible/);

console.log("PASS: turns, occupied cells, X win/score, reset, draw, O win/score, board markup, status announcement, mobile breakpoint, and focus styling");
