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
  const tileSizeInput = document.querySelector("#tile-size");
  const tileSizeValue = document.querySelector("#tile-size-value");
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
  let resetTimer = null;
  let resetInProgress = false;
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
    if (resetInProgress) {
      message = "Resetting the board…";
    } else if (roundOutcome === "draw") {
      message = "It's a draw! New round starts in 10 seconds.";
    } else if (roundOutcome === "X" || roundOutcome === "O") {
      player = roundOutcome;
      message = escapeHTML(getPlayerName(player)) + " wins the round!";
    } else {
      message = escapeHTML(getPlayerName(player)) + "'s turn";
    }
    const symbol = resetInProgress ? "↻" : (roundOutcome === "draw" ? "!" : (player === "X" ? "×" : "○"));
    const className = resetInProgress ? "reset-status" : (roundOutcome === "draw" ? "draw-status" : (player === "X" ? "x-turn" : "o-turn"));
    status.innerHTML = '<span class="status-player ' + className + '" aria-hidden="true">' + symbol + '</span> ' + message;
    status.classList.toggle("winner-status", roundOutcome === "X" || roundOutcome === "O");
  }

  function updateTileSize() {
    const size = Number(tileSizeInput.value);
    tileSizeValue.value = size + " px";
    tileSizeValue.textContent = size + " px";
    boardNode.style.setProperty("--requested-tile-size", size + "px");
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
    if (resetInProgress) return;
    resetInProgress = true;
    roundOver = true;
    roundOutcome = "";
    boardNode.classList.remove("draw-board");
    boardNode.classList.remove("winner-board");
    boardWrap.classList.remove("draw-board-wrap");
    status.classList.remove("winner-status");
    cells.forEach((cell) => {
      cell.disabled = true;
      cell.classList.remove("winning-cell", "losing-cell", "draw-cell");
      cell.classList.add("resetting-cell");
    });
    setStatus();
    const delay = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 560;
    resetTimer = window.setTimeout(() => {
      resetTimer = null;
      board = Array(9).fill("");
      currentPlayer = "X";
      roundOver = false;
      roundOutcome = "";
      resetInProgress = false;
      cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("played-x", "played-o", "winning-cell", "losing-cell", "draw-cell", "resetting-cell");
        cell.setAttribute("aria-label", 'Row ' + (Math.floor(index / 3) + 1) + ', column ' + ((index % 3) + 1) + ', empty');
      });
      setStatus();
    }, delay);
  }

  cells.forEach((cell) => cell.addEventListener("click", () => play(Number(cell.dataset.cell))));
  resetButton.addEventListener("click", resetRound);
  playerXInput.addEventListener("input", setStatus);
  playerOInput.addEventListener("input", setStatus);
  tileSizeInput.addEventListener("input", updateTileSize);
  updateTileSize();
  playButton.addEventListener("click", () => {
    document.querySelector("#tic-tac-toe").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => cells[0].focus({ preventScroll: true }), 350);
  });

  const memoryBoard = document.querySelector("#memory-board");
  const memoryPlayButton = document.querySelector("#play-memory-match");
  const memoryResetButton = document.querySelector("#memory-reset");
  if (memoryBoard && memoryPlayButton && memoryResetButton) {
    const memoryStatus = document.querySelector("#memory-status");
    const movesNode = document.querySelector("#memory-moves");
    const timeNode = document.querySelector("#memory-time");
    const pairsNode = document.querySelector("#memory-pairs");
    const symbols = ["🍋", "🌼", "🍓", "🐸", "🌙", "🐝", "🍄", "🦋"];
    let firstCard = null;
    let locked = false;
    let moves = 0;
    let matchedPairs = 0;
    let startedAt = 0;
    let timerId = null;

    function formatTime(seconds) {
      return String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
    }

    function updateTimer() {
      timeNode.textContent = formatTime(Math.floor((Date.now() - startedAt) / 1000));
    }

    function startTimer() {
      if (timerId !== null) return;
      startedAt = Date.now();
      timerId = window.setInterval(updateTimer, 1000);
    }

    function finishGame() {
      window.clearInterval(timerId);
      timerId = null;
      memoryStatus.textContent = "You matched every pair in " + moves + (moves === 1 ? " move" : " moves") + " and " + timeNode.textContent + ". Nice memory!";
    }

    function revealCard(card) {
      if (locked || card === firstCard || card.disabled) return;
      startTimer();
      card.classList.add("is-revealed");
      card.setAttribute("aria-label", "Revealed " + card.dataset.symbol);
      card.querySelector("span").textContent = card.dataset.symbol;
      if (!firstCard) {
        firstCard = card;
        memoryStatus.textContent = "Pick one more card.";
        return;
      }

      moves += 1;
      movesNode.textContent = moves;
      if (firstCard.dataset.symbol === card.dataset.symbol) {
        firstCard.disabled = true;
        card.disabled = true;
        firstCard.classList.add("is-matched");
        card.classList.add("is-matched");
        firstCard.setAttribute("aria-label", "Matched " + card.dataset.symbol);
        card.setAttribute("aria-label", "Matched " + card.dataset.symbol);
        firstCard = null;
        matchedPairs += 1;
        pairsNode.textContent = matchedPairs + " / 8";
        if (matchedPairs === symbols.length) finishGame();
        else memoryStatus.textContent = "That's a match! Find another pair.";
      } else {
        locked = true;
        const previousCard = firstCard;
        firstCard = null;
        memoryStatus.textContent = "No match. Try another pair.";
        window.setTimeout(() => {
          [previousCard, card].forEach((item) => {
            item.classList.remove("is-revealed");
            item.querySelector("span").textContent = "?";
            item.setAttribute("aria-label", "Hidden card");
          });
          locked = false;
        }, 850);
      }
    }

    function startMemoryGame() {
      window.clearInterval(timerId);
      timerId = null;
      firstCard = null;
      locked = false;
      moves = 0;
      matchedPairs = 0;
      movesNode.textContent = "0";
      timeNode.textContent = "00:00";
      pairsNode.textContent = "0 / 8";
      memoryStatus.textContent = "Choose any card to start.";
      const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
      memoryBoard.replaceChildren(...deck.map((symbol) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "memory-card";
        card.dataset.symbol = symbol;
        card.setAttribute("aria-label", "Hidden card");
        card.innerHTML = "<span aria-hidden=\"true\">?</span>";
        card.addEventListener("click", () => revealCard(card));
        return card;
      }));
    }

    memoryResetButton.addEventListener("click", startMemoryGame);
    memoryPlayButton.addEventListener("click", () => {
      document.querySelector("#memory-match").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => memoryBoard.querySelector(".memory-card")?.focus({ preventScroll: true }), 350);
    });
    startMemoryGame();
  }

  const scoutMap = document.querySelector("#star-map");
  const scoutPlayButton = document.querySelector("#play-star-scout");
  const scoutResetButton = document.querySelector("#star-reset");
  if (scoutMap && scoutPlayButton && scoutResetButton) {
    const scoutStatus = document.querySelector("#star-status");
    const starCountNode = document.querySelector("#star-count");
    const starMovesNode = document.querySelector("#star-moves");
    const scoutControls = [...document.querySelectorAll("[data-scout-direction]")];
    const mapWidth = 5;
    const startPosition = 20;
    const rocketPosition = 4;
    const rocks = new Set([6, 8, 16, 18]);
    const starPositions = new Set([1, 13, 23]);
    const collectedStars = new Set();
    const directions = {
      up: { row: -1, column: 0 },
      down: { row: 1, column: 0 },
      left: { row: 0, column: -1 },
      right: { row: 0, column: 1 },
    };
    const scoutTiles = Array.from({ length: mapWidth * mapWidth }, () => {
      const tile = document.createElement("span");
      tile.className = "star-cell";
      tile.setAttribute("aria-hidden", "true");
      scoutMap.append(tile);
      return tile;
    });
    let scoutPosition = startPosition;
    let scoutMoves = 0;
    let scoutFinished = false;

    function drawScoutMap() {
      scoutTiles.forEach((tile, index) => {
        tile.className = "star-cell";
        if (rocks.has(index)) {
          tile.classList.add("is-rock");
          tile.textContent = "🪨";
        } else if (index === rocketPosition) {
          tile.classList.add("is-rocket");
          tile.textContent = "🚀";
        } else if (starPositions.has(index) && !collectedStars.has(index)) {
          tile.classList.add("has-star");
          tile.textContent = "⭐";
        } else {
          tile.textContent = "";
        }
        if (index === scoutPosition) {
          tile.classList.add("has-scout");
          tile.textContent = "🧑‍🚀";
        }
      });
      starCountNode.textContent = collectedStars.size + " / " + starPositions.size;
      starMovesNode.textContent = scoutMoves;
      scoutControls.forEach((control) => { control.disabled = scoutFinished; });
    }

    function moveScout(directionName) {
      if (scoutFinished) return;
      const direction = directions[directionName];
      if (!direction) return;
      const row = Math.floor(scoutPosition / mapWidth);
      const column = scoutPosition % mapWidth;
      const nextRow = row + direction.row;
      const nextColumn = column + direction.column;

      if (nextRow < 0 || nextRow >= mapWidth || nextColumn < 0 || nextColumn >= mapWidth) {
        scoutStatus.textContent = "That's the edge of space. Try another direction!";
        return;
      }

      const nextPosition = nextRow * mapWidth + nextColumn;
      if (rocks.has(nextPosition)) {
        scoutStatus.textContent = "A space rock is in the way. Try a different path!";
        return;
      }

      scoutPosition = nextPosition;
      scoutMoves += 1;
      let message = "You are at row " + (nextRow + 1) + ", column " + (nextColumn + 1) + ". ";

      if (starPositions.has(scoutPosition) && !collectedStars.has(scoutPosition)) {
        collectedStars.add(scoutPosition);
        message += "Star collected! ";
      }

      if (scoutPosition === rocketPosition) {
        if (collectedStars.size === starPositions.size) {
          scoutFinished = true;
          message += "Mission complete! You found all three stars and reached your rocket in " + scoutMoves + " moves. Great exploring!";
        } else {
          message += "Rocket spotted! Find " + (starPositions.size - collectedStars.size) + " more " + (starPositions.size - collectedStars.size === 1 ? "star" : "stars") + " before takeoff.";
        }
      } else if (!message.includes("Star collected!")) {
        message += collectedStars.size === starPositions.size ? "All stars found! Head to your rocket!" : "Keep looking for stars!";
      } else {
        message += "You have " + collectedStars.size + " of " + starPositions.size + " stars. " + (collectedStars.size === starPositions.size ? "Head to your rocket!" : "Keep going!");
      }

      scoutStatus.textContent = message;
      drawScoutMap();
    }

    function resetScout() {
      scoutPosition = startPosition;
      scoutMoves = 0;
      scoutFinished = false;
      collectedStars.clear();
      scoutStatus.textContent = "Explorer at row 5, column 1. Collect all three stars and reach the rocket.";
      drawScoutMap();
    }

    scoutControls.forEach((control) => {
      control.addEventListener("click", () => moveScout(control.dataset.scoutDirection));
    });
    scoutMap.addEventListener("keydown", (event) => {
      const directionByKey = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const direction = directionByKey[event.key];
      if (!direction) return;
      event.preventDefault();
      moveScout(direction);
    });
    scoutResetButton.addEventListener("click", resetScout);
    scoutPlayButton.addEventListener("click", () => {
      document.querySelector("#star-scout").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => scoutMap.focus({ preventScroll: true }), 350);
    });
    drawScoutMap();
  }

  const dinoStage = document.querySelector("#dino-stage");
  const dinoPlayButton = document.querySelector("#play-dino-dash");
  const dinoStartButton = document.querySelector("#dino-start");
  const dinoJumpButton = document.querySelector("#dino-jump");
  const dinoResetButton = document.querySelector("#dino-reset");
  if (dinoStage && dinoPlayButton && dinoStartButton && dinoJumpButton && dinoResetButton) {
    const dinoRunner = document.querySelector("#dino-runner");
    const dinoObstacle = document.querySelector("#dino-obstacle");
    const dinoStatus = document.querySelector("#dino-status");
    const dinoScoreNode = document.querySelector("#dino-score");
    const dinoBestNode = document.querySelector("#dino-best");
    const runnerLeft = 42;
    const runnerWidth = 54;
    const runnerHeight = 54;
    const obstacleWidth = 38;
    const obstacleHeight = 48;
    let running = false;
    let frameId = null;
    let lastFrameTime = 0;
    let jumpHeight = 0;
    let verticalVelocity = 0;
    let obstacleX = dinoStage.clientWidth + 90;
    let speed = 320;
    let score = 0;
    let bestScore = 0;
    let obstacleScored = false;

    function drawDinoScene() {
      dinoRunner.style.transform = "translateY(" + -jumpHeight + "px)";
      dinoObstacle.style.transform = "translateX(" + obstacleX + "px)";
    }

    function resetDinoRun() {
      running = false;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      lastFrameTime = 0;
      jumpHeight = 0;
      verticalVelocity = 0;
      obstacleX = dinoStage.clientWidth + 90;
      speed = 320;
      score = 0;
      obstacleScored = false;
      dinoScoreNode.textContent = "0";
      dinoBestNode.textContent = bestScore;
      dinoStartButton.disabled = false;
      dinoStartButton.textContent = "Start run";
      dinoJumpButton.disabled = true;
      dinoStatus.textContent = "Press Start run when you're ready.";
      drawDinoScene();
    }

    function finishDinoRun() {
      running = false;
      frameId = null;
      dinoStartButton.disabled = false;
      dinoStartButton.textContent = "Run again";
      dinoJumpButton.disabled = true;
      const pointWord = score === 1 ? "cactus" : "cacti";
      dinoStatus.textContent = "Oh no, you hit a cactus! You cleared " + score + " " + pointWord + ". Press Run again to play another round.";
    }

    function updateDinoFrame(time) {
      if (!running) return;
      const delta = Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;
      const floorTop = dinoStage.clientHeight - 24;

      if (jumpHeight > 0 || verticalVelocity > 0) {
        jumpHeight += verticalVelocity * delta;
        verticalVelocity -= 1750 * delta;
        if (jumpHeight <= 0) {
          jumpHeight = 0;
          verticalVelocity = 0;
        }
      }

      obstacleX -= speed * delta;
      const runnerTop = floorTop - runnerHeight - jumpHeight;
      const runnerBottom = floorTop - jumpHeight;
      const obstacleTop = floorTop - obstacleHeight;
      const horizontalOverlap = runnerLeft + runnerWidth - 7 > obstacleX + 5
        && runnerLeft + 7 < obstacleX + obstacleWidth - 5;
      const verticalOverlap = runnerTop + 8 < floorTop - 4 && runnerBottom - 5 > obstacleTop + 3;

      if (horizontalOverlap && verticalOverlap) {
        drawDinoScene();
        finishDinoRun();
        return;
      }

      if (!obstacleScored && obstacleX + obstacleWidth < runnerLeft) {
        obstacleScored = true;
        score += 1;
        bestScore = Math.max(bestScore, score);
        dinoScoreNode.textContent = score;
        dinoBestNode.textContent = bestScore;
        dinoStatus.textContent = "Cactus cleared! Your score is " + score + ". Keep running and watch for the next one.";
        speed = Math.min(560, 320 + score * 16);
      }

      if (obstacleX + obstacleWidth < 0) {
        obstacleX = dinoStage.clientWidth + 150 + Math.random() * 130;
        obstacleScored = false;
      }

      drawDinoScene();
      frameId = window.requestAnimationFrame(updateDinoFrame);
    }

    function jumpDino() {
      if (!running || jumpHeight > 0) return;
      verticalVelocity = 650;
    }

    function startDinoRun() {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      running = true;
      frameId = null;
      lastFrameTime = 0;
      jumpHeight = 0;
      verticalVelocity = 0;
      obstacleX = dinoStage.clientWidth + 90;
      speed = 320;
      score = 0;
      obstacleScored = false;
      dinoScoreNode.textContent = "0";
      dinoStartButton.disabled = true;
      dinoStartButton.textContent = "Running…";
      dinoJumpButton.disabled = false;
      dinoStatus.textContent = "Run started! Jump over the cactus.";
      drawDinoScene();
      dinoStage.focus({ preventScroll: true });
      frameId = window.requestAnimationFrame(updateDinoFrame);
    }

    dinoStage.addEventListener("keydown", (event) => {
      if ((event.code === "Space" || event.code === "ArrowUp") && !event.repeat) {
        event.preventDefault();
        jumpDino();
      }
    });
    dinoStartButton.addEventListener("click", startDinoRun);
    dinoJumpButton.addEventListener("click", jumpDino);
    dinoResetButton.addEventListener("click", startDinoRun);
    dinoPlayButton.addEventListener("click", () => {
      document.querySelector("#dino-dash").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => dinoStartButton.focus({ preventScroll: true }), 350);
    });
    resetDinoRun();
  }

  const quickPlayButton = document.querySelector("#play-quick-draw");
  const quickStartButton = document.querySelector("#quick-start");
  const quickTarget = document.querySelector("#quick-target");
  if (quickPlayButton && quickStartButton && quickTarget) {
    const quickStatus = document.querySelector("#quick-status");
    const quickLabel = document.querySelector("#quick-target-label");
    const quickBestNode = document.querySelector("#quick-best");
    let quickState = "idle";
    let signalTimer = null;
    let signalTime = 0;
    let bestReaction = Infinity;

    function startQuickDraw() {
      window.clearTimeout(signalTimer);
      quickState = "waiting";
      quickTarget.classList.remove("is-ready", "is-early");
      quickTarget.setAttribute("aria-label", "Quick Draw target. Wait for it to turn green.");
      quickLabel.textContent = "WAIT…";
      quickStatus.textContent = "Keep your finger ready, but wait for green.";
      quickStartButton.disabled = true;
      quickTarget.focus({ preventScroll: true });
      signalTimer = window.setTimeout(() => {
        if (quickState !== "waiting") return;
        quickState = "ready";
        signalTime = performance.now();
        quickTarget.classList.add("is-ready");
        quickTarget.setAttribute("aria-label", "Quick Draw target. Draw now.");
        quickLabel.textContent = "DRAW!";
        quickStatus.textContent = "Now! Tap the target as fast as you can.";
      }, 1200 + Math.random() * 2300);
    }

    quickTarget.addEventListener("click", () => {
      if (quickState === "waiting") {
        window.clearTimeout(signalTimer);
        quickState = "early";
        quickTarget.classList.add("is-early");
        quickTarget.setAttribute("aria-label", "Quick Draw target. Too soon. Start another round.");
        quickLabel.textContent = "TOO SOON";
        quickStatus.textContent = "You drew too early! Take a breath and try again.";
        quickStartButton.disabled = false;
        quickStartButton.textContent = "Try again";
      } else if (quickState === "ready") {
        const reaction = Math.round(performance.now() - signalTime);
        quickState = "result";
        quickTarget.classList.remove("is-ready");
        quickTarget.setAttribute("aria-label", "Quick Draw target. Your reaction time was " + reaction + " milliseconds.");
        quickLabel.textContent = reaction + " ms";
        quickStatus.textContent = "Draw time: " + reaction + " milliseconds. Can you beat it?";
        bestReaction = Math.min(bestReaction, reaction);
        quickBestNode.textContent = bestReaction + " ms";
        quickStartButton.disabled = false;
        quickStartButton.textContent = "Play again";
      }
    });

    quickStartButton.addEventListener("click", startQuickDraw);
    quickPlayButton.addEventListener("click", () => {
      document.querySelector("#quick-draw").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => quickStartButton.focus({ preventScroll: true }), 350);
    });
  }

  const bubblePlayButton = document.querySelector("#play-bubble-pop");
  const bubbleResetButton = document.querySelector("#bubble-pop-reset");
  const bubbleBoard = document.querySelector("#bubble-pop-board");
  if (bubblePlayButton && bubbleResetButton && bubbleBoard) {
    const bubbleStatus = document.querySelector("#bubble-pop-status");
    const bubbleScoreNode = document.querySelector("#bubble-score");
    const bubbleBestNode = document.querySelector("#bubble-best");
    const bubbleTimerNode = document.querySelector("#bubble-timer");
    const bubbleCount = 12;
    const roundLength = 20;
    let bubbleTiles = [];
    let activeIndex = -1;
    let score = 0;
    let bestScore = 0;
    let timeLeft = roundLength;
    let timerId = null;
    let roundOver = false;

    function setBubbleTarget() {
      if (roundOver) return;
      const candidates = bubbleTiles.map((_, index) => index).filter((index) => index !== activeIndex);
      const nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
      bubbleTiles.forEach((tile, index) => {
        tile.classList.toggle("is-live", index === nextIndex);
        tile.disabled = roundOver;
      });
      activeIndex = nextIndex;
      bubbleStatus.textContent = "Pop the glowing bubble before the timer hits zero.";
    }

    function endBubbleRound() {
      roundOver = true;
      window.clearInterval(timerId);
      timerId = null;
      bubbleTiles.forEach((tile) => {
        tile.disabled = true;
        tile.classList.remove("is-live");
      });
      bubbleStatus.textContent = "Time is up! You scored " + score + " points. Tap Start round to play again.";
    }

    function startBubbleRound() {
      roundOver = false;
      score = 0;
      timeLeft = roundLength;
      bubbleScoreNode.textContent = "0";
      bubbleTimerNode.textContent = String(timeLeft);
      bubbleTiles.forEach((tile) => {
        tile.classList.remove("is-live");
        tile.disabled = false;
      });
      activeIndex = -1;
      bubbleStatus.textContent = "A glowing bubble is coming. Get ready!";
      setBubbleTarget();
      window.clearInterval(timerId);
      timerId = window.setInterval(() => {
        timeLeft -= 1;
        bubbleTimerNode.textContent = String(timeLeft);
        if (timeLeft <= 0) {
          endBubbleRound();
        }
      }, 1000);
    }

    function createBubbleTiles() {
      bubbleTiles = Array.from({ length: bubbleCount }, (_, index) => {
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "bubble-pop-bubble";
        tile.setAttribute("aria-label", "Bubble " + (index + 1) + ". Not active yet.");
        tile.addEventListener("click", () => {
          if (roundOver || index !== activeIndex) return;
          score += 1;
          bestScore = Math.max(bestScore, score);
          bubbleScoreNode.textContent = String(score);
          bubbleBestNode.textContent = String(bestScore);
          tile.classList.remove("is-live");
          tile.setAttribute("aria-label", "Bubble " + (index + 1) + ". Popped.");
          bubbleStatus.textContent = "Nice pop! Keep the streak going.";
          setBubbleTarget();
        });
        return tile;
      });
      bubbleBoard.replaceChildren(...bubbleTiles);
    }

    createBubbleTiles();
    startBubbleRound();
    bubbleResetButton.addEventListener("click", startBubbleRound);
    bubblePlayButton.addEventListener("click", () => {
      document.querySelector("#bubble-pop").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => bubbleResetButton.focus({ preventScroll: true }), 350);
    });
  }

  const lightPlayButton = document.querySelector("#play-light-shift");
  const lightResetButton = document.querySelector("#light-reset");
  const lightBoard = document.querySelector("#light-board");
  if (lightPlayButton && lightResetButton && lightBoard) {
    const lightStatus = document.querySelector("#light-status");
    const lightMovesNode = document.querySelector("#light-moves");
    const lightCountNode = document.querySelector("#light-count");
    const boardWidth = 5;
    const puzzleMoves = [0, 2, 6, 12, 18, 20, 24];
    let lights = [];
    let moves = 0;
    let solved = false;

    function flipLights(board, index) {
      const row = Math.floor(index / boardWidth);
      const column = index % boardWidth;
      const neighbors = [
        [row, column],
        [row - 1, column],
        [row + 1, column],
        [row, column - 1],
        [row, column + 1],
      ];

      neighbors.forEach(([neighborRow, neighborColumn]) => {
        if (neighborRow < 0 || neighborRow >= boardWidth || neighborColumn < 0 || neighborColumn >= boardWidth) return;
        const neighborIndex = neighborRow * boardWidth + neighborColumn;
        board[neighborIndex] = !board[neighborIndex];
      });
    }

    function drawLightBoard() {
      const litCount = lights.filter(Boolean).length;
      lightCountNode.textContent = litCount;
      lightMovesNode.textContent = moves;
      [...lightBoard.children].forEach((tile, index) => {
        const isLit = lights[index];
        tile.classList.toggle("is-on", isLit);
        tile.disabled = solved;
        tile.setAttribute("aria-pressed", String(isLit));
        tile.setAttribute("aria-label", "Row " + (Math.floor(index / boardWidth) + 1) + ", column " + ((index % boardWidth) + 1) + ", " + (isLit ? "light on" : "light off"));
      });
    }

    function resetLightPuzzle() {
      lights = Array(boardWidth * boardWidth).fill(false);
      puzzleMoves.forEach((index) => flipLights(lights, index));
      moves = 0;
      solved = false;
      lightStatus.textContent = "Puzzle reset. Turn every light off to solve it.";
      drawLightBoard();
    }

    function playLightTile(index) {
      if (solved) return;
      flipLights(lights, index);
      moves += 1;
      solved = lights.every((isLit) => !isLit);
      drawLightBoard();
      lightStatus.textContent = solved
        ? "Grid cleared in " + moves + (moves === 1 ? " move. " : " moves. ") + "Puzzle solved!"
        : moves + (moves === 1 ? " move. " : " moves. ") + lightCountNode.textContent + " lights still on.";
    }

    function createLightTiles() {
      const tiles = Array.from({ length: boardWidth * boardWidth }, (_, index) => {
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "light-tile";
        tile.setAttribute("aria-pressed", "false");
        tile.innerHTML = "<span aria-hidden=\"true\"></span>";
        tile.addEventListener("click", () => playLightTile(index));
        return tile;
      });
      lightBoard.replaceChildren(...tiles);
    }

    createLightTiles();
    resetLightPuzzle();
    lightResetButton.addEventListener("click", resetLightPuzzle);
    lightPlayButton.addEventListener("click", () => {
      document.querySelector("#light-shift").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(() => lightBoard.querySelector(".light-tile")?.focus({ preventScroll: true }), 350);
    });
  }
})();
