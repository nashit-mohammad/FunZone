const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class Element {
  constructor(dataset = {}) {
    this.dataset = dataset;
    const values = new Set();
    this.classList = {
      add: (...names) => names.forEach((name) => values.add(name)),
      remove: (...names) => names.forEach((name) => values.delete(name)),
      contains: (name) => values.has(name),
      toggle: (name, force) => {
        const add = force === undefined ? !values.has(name) : force;
        if (add) values.add(name);
        else values.delete(name);
        return add;
      },
    };
    this.listeners = {};
    this.attributes = {};
    this.style = { values: {}, setProperty: (name, value) => { this.style.values[name] = value; } };
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.innerHTML = "";
  }
  addEventListener(name, handler) { this.listeners[name] = handler; }
  setAttribute(name, value) { this.attributes[name] = value; }
  click() { if (!this.disabled) this.listeners.click(); }
  focus() {}
}

const cells = Array.from({ length: 9 }, (_, i) => new Element({ cell: String(i) }));
const ids = ["#game-status", "#reset-game", "#play-tic-tac-toe", "#score-x", "#score-o", "#player-x-name", "#player-o-name", "#tile-size", "#tile-size-value", ".board", ".board-wrap", "#tic-tac-toe"];
const nodes = Object.fromEntries(ids.map((id) => [id, new Element()]));
nodes["#player-x-name"].value = "Player X";
nodes["#player-o-name"].value = "Player O";
nodes["#tile-size"].value = "96";
nodes["#score-x"].textContent = "0";
nodes["#score-o"].textContent = "0";
nodes["#tic-tac-toe"].scrollIntoView = () => {};
const document = {
  querySelectorAll: (selector) => selector === "[data-cell]" ? cells : [],
  querySelector: (selector) => nodes[selector],
};
const timers = [];
const window = {
  setTimeout: (handler, delay) => { timers.push({ handler, delay }); return delay; },
  clearTimeout: () => {},
};
vm.runInNewContext(fs.readFileSync("app.js", "utf8"), { document, window });

function move(index) { cells[index].click(); }
function reset() { nodes["#reset-game"].click(); }
nodes["#player-x-name"].value = "Skye";
nodes["#player-x-name"].listeners.input();
nodes["#tile-size"].value = "120";
nodes["#tile-size"].listeners.input();
assert.equal(nodes["#tile-size-value"].textContent, "120 px");
assert.equal(nodes[".board"].style.values["--requested-tile-size"], "120px");
move(0); move(3); move(1); move(4); move(2);

assert.match(nodes["#game-status"].innerHTML, /Skye wins the round/);
assert.equal(nodes[".board"].classList.contains("winner-board"), true);
assert.equal(nodes["#game-status"].classList.contains("winner-status"), true);
assert.equal([0, 1, 2].every((i) => cells[i].classList.contains("winning-cell")), true);
assert.equal([3, 4].every((i) => cells[i].classList.contains("losing-cell")), true);
assert.equal(nodes["#score-x"].textContent, 1);

reset();
assert.equal(timers.length, 1);
assert.equal(timers[0].delay, 560);
assert.equal(cells.every((cell) => cell.classList.contains("resetting-cell") && cell.disabled), true);
assert.equal(cells[0].textContent, "×");
timers.shift().handler();
assert.equal(cells.every((cell) => !cell.disabled && cell.textContent === ""), true);
assert.equal(cells.some((cell) => cell.classList.contains("resetting-cell")), false);
assert.equal(nodes[".board"].classList.contains("winner-board"), false);
assert.equal(nodes["#game-status"].classList.contains("winner-status"), false);
assert.equal(cells.some((cell) => cell.classList.contains("losing-cell")), false);
assert.equal(nodes["#player-x-name"].value, "Skye");

const css = fs.readFileSync("styles.css", "utf8");
assert.match(css, /grid-template-columns: minmax\(0,1fr\) 1px minmax\(0,1fr\)/);
assert.match(css, /\.player-name-input \{[^}]*height: 20px/);
assert.match(css, /@keyframes winner-burst/);
assert.match(css, /@keyframes winner-pulse/);
assert.match(css, /@keyframes loser-wobble/);
assert.match(css, /@keyframes tile-reset/);
assert.match(css, /--cell-size: clamp\(56px, min\(var\(--requested-tile-size\)/);
assert.match(css, /prefers-reduced-motion: reduce/);
console.log("PASS: fixed name slots, winning celebration, losing-piece reaction, and reset cleanup");
