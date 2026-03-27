const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winner-message");
const finalWinner = document.getElementById("final-winner");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
const resetScoreBtn = document.getElementById("reset-score-btn");

const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

const playerXNameText = document.getElementById("player-x-name");
const playerONameText = document.getElementById("player-o-name");

const xWinsText = document.getElementById("x-wins");
const xLossesText = document.getElementById("x-losses");
const oWinsText = document.getElementById("o-wins");
const oLossesText = document.getElementById("o-losses");
const drawCountText = document.getElementById("draw-count");
const turnIndicator = document.getElementById("turn-indicator");

let circleTurn = false;
let gameStarted = false;

let playerXName = "Player X";
let playerOName = "Player O";

let scores = {
  xWins: 0,
  xLosses: 0,
  oWins: 0,
  oLosses: 0,
  draws: 0
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

disableBoard();
updateScoreBoard();
updateTurnIndicator();

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", nextRound);
resetScoreBtn.addEventListener("click", resetScore);

function startGame() {
  playerXName = playerXInput.value.trim() || "Player X";
  playerOName = playerOInput.value.trim() || "Player O";

  playerXNameText.innerText = playerXName;
  playerONameText.innerText = playerOName;

  gameStarted = true;
  circleTurn = false;

  winnerMessage.classList.remove("show");
  resetBoard();
  enableBoard();
  updateTurnIndicator();
}

function nextRound() {
  winnerMessage.classList.remove("show");
  circleTurn = false;
  resetBoard();
  enableBoard();
  updateTurnIndicator();
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.classList.remove("x", "circle");
    cell.removeEventListener("click", handleClick);
  });
}

function enableBoard() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function disableBoard() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
}

function handleClick(e) {
  if (!gameStarted) return;

  const cell = e.target;
  const currentClass = circleTurn ? "circle" : "x";

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    handleWin(currentClass);
  } else if (isDraw()) {
    handleDraw();
  } else {
    swapTurns();
    updateTurnIndicator();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function handleWin(currentClass) {
  disableBoard();

  if (currentClass === "x") {
    scores.xWins++;
    scores.oLosses++;
    finalWinner.innerText = `${playerXName} Wins!`;
  } else {
    scores.oWins++;
    scores.xLosses++;
    finalWinner.innerText = `${playerOName} Wins!`;
  }

  updateScoreBoard();
  winnerMessage.classList.add("show");
}

function handleDraw() {
  disableBoard();
  scores.draws++;
  finalWinner.innerText = "It's a Draw!";
  updateScoreBoard();
  winnerMessage.classList.add("show");
}

function updateScoreBoard() {
  xWinsText.innerText = scores.xWins;
  xLossesText.innerText = scores.xLosses;
  oWinsText.innerText = scores.oWins;
  oLossesText.innerText = scores.oLosses;
  drawCountText.innerText = scores.draws;
}

function updateTurnIndicator() {
  if (circleTurn) {
    turnIndicator.innerText = `${playerOName} (O)`;
  } else {
    turnIndicator.innerText = `${playerXName} (X)`;
  }
}

function resetScore() {
  scores = {
    xWins: 0,
    xLosses: 0,
    oWins: 0,
    oLosses: 0,
    draws: 0
  };

  updateScoreBoard();
  circleTurn = false;
  winnerMessage.classList.remove("show");
  resetBoard();
  disableBoard();
  updateTurnIndicator();
}

document.getElementById("year").innerText = new Date().getFullYear();