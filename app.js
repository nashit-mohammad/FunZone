(() => {
  const cells = [...document.querySelectorAll("[data-cell]")];
  const status = document.querySelector("#game-status");
  const resetButton = document.querySelector("#reset-game");
  const playButton = document.querySelector("#play-tic-tac-toe");
  const scoreXNode = document.querySelector("#score-x");
  const scoreONode = document.querySelector("#score-o");
  const playerXInput = document.querySelector("#player-x-name");
  const playerOInput = document.querySelector("#player-o-name");
  const boardNode = document.querySelector(".board");
  const boardWrap = document.querySelector(".board-wrap");
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  let board = Array(9).fill("");
  let currentPlayer = "X";
  let roundOver = false;
  let roundOutcome = "";
  let drawTimer = null;
  const scores = { X: 0, O: 0 };

  function getPlayerName(player) {
    const input = player === "X" ? playerXInput : playerOInput;
    return input.value.trim() || "Player " + player;
  }

  function escapeHTML(value) {
    return value.replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    })[character]);
  }

  function setStatus() {
    let message;
    let player = currentPlayer;
    if (roundOutcome === "draw") {
      message = "It's a draw! New round starts in 10 seconds.";
    } else if (roundOutcome === "X" || roundOutcome === "O") {
      player = roundOutcome;
      message = escapeHTML(getPlayerName(player)) + " wins the round!";
    } else {
      message = escapeHTML(getPlayerName(player)) + "'s turn";
    }
    const symbol = roundOutcome === "draw" ? "!" : (player === "X" ? "×" : "○");
    const className = roundOutcome === "draw" ? "draw-status" : (player === "X" ? "x-turn" : "o-turn");
    status.innerHTML = '<span class="status-player ' + className + '" aria-hidden="true">' + symbol + '</span> ' + message;
    status.classList.toggle("winner-status", roundOutcome === "X" || roundOutcome === "O");
  }

  function finishRound(winner, line) {
    roundOver = true;
    cells.forEach((cell) => { cell.disabled = true; });
    if (winner) {
      roundOutcome = winner;
      boardNode.classList.add("winner-board");
      status.classList.add("winner-status");
      line.forEach((index) => cells[index].classList.add("winning-cell"));
      cells.forEach((cell, index) => {
        if (board[index] && board[index] !== winner) cell.classList.add("losing-cell");
      });
      scores[winner] += 1;
      scoreXNode.textContent = scores.X;
      scoreONode.textContent = scores.O;
    } else {
      roundOutcome = "draw";
      boardNode.classList.add("draw-board");
      boardWrap.classList.add("draw-board-wrap");
      cells.forEach((cell) => cell.classList.add("draw-cell"));
      drawTimer = window.setTimeout(() => {
        drawTimer = null;
        resetRound();
      }, 10000);
    }
    setStatus();
  }

  function play(index) {
    if (roundOver || board[index]) return;
    board[index] = currentPlayer;
    const cell = cells[index];
    cell.textContent = currentPlayer === "X" ? "×" : "○";
    cell.classList.add(currentPlayer === "X" ? "played-x" : "played-o");
    cell.setAttribute("aria-label", 'Row ' + (Math.floor(index / 3) + 1) + ', column ' + ((index % 3) + 1) + ', ' + currentPlayer);
    cell.disabled = true;

    const winningLine = winningLines.find((line) => line.every((position) => board[position] === currentPlayer));
    if (winningLine) {
      finishRound(currentPlayer, winningLine);
      return;
    }
    if (board.every(Boolean)) {
      finishRound(null);
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus();
  }

  function resetRound() {
    if (drawTimer !== null) {
      window.clearTimeout(drawTimer);
      drawTimer = null;
    }
    board = Array(9).fill("");
    currentPlayer = "X";
    roundOver = false;
    roundOutcome = "";
    boardNode.classList.remove("draw-board");
    boardNode.classList.remove("winner-board");
    boardWrap.classList.remove("draw-board-wrap");
    status.classList.remove("winner-status");
    cells.forEach((cell, index) => {
      cell.textContent = "";
      cell.disabled = false;
      cell.classList.remove("played-x", "played-o", "winning-cell", "losing-cell", "draw-cell");
      cell.setAttribute("aria-label", 'Row ' + (Math.floor(index / 3) + 1) + ', column ' + ((index % 3) + 1) + ', empty');
    });
    setStatus();
  }

  cells.forEach((cell) => cell.addEventListener("click", () => play(Number(cell.dataset.cell))));
  resetButton.addEventListener("click", resetRound);
  playerXInput.addEventListener("input", setStatus);
  playerOInput.addEventListener("input", setStatus);
  playButton.addEventListener("click", () => {
    document.querySelector("#tic-tac-toe").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => cells[0].focus({ preventScroll: true }), 350);
  });
})();
