const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");
const moveCounter = document.getElementById("moves");
const timerEl = document.getElementById("timer");

let tiles = [...Array(15).keys()].map(n => n + 1).concat(null); // [1-15 + blank]
let moves = 0;
let time = 0;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  time = 0;
  timerEl.textContent = "Time: 0s";
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = `Time: ${time}s`;
  }, 1000);
}

function shuffleTiles() {
  // Fisher–Yates shuffle
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  moves = 0;
  moveCounter.textContent = `Moves: ${moves}`;
  message.textContent = "";
  render();
  startTimer();
}

function render() {
  puzzle.innerHTML = "";
  tiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (tile === null) {
      div.classList.add("blank");
    } else {
      div.textContent = tile;
      div.addEventListener("click", () => moveTile(index));
    }
    puzzle.appendChild(div);
  });
}

function moveTile(index)
 {
  const blankIndex = tiles.indexOf(null);
  const validMoves = [index - 1, index + 1, index - 4, index + 4];

  if (validMoves.includes(blankIndex)) {
    if ((index % 4 === 0 && blankIndex === index - 1) || 
        (index % 4 === 3 && blankIndex === index + 1)) return;

    [tiles[index], tiles[blankIndex]] = [tiles[blankIndex], tiles[index]];
    moves++;
    moveCounter.textContent = `Moves: ${moves}`;
    render();
    checkWin();
  }
}

function checkWin() {
  const win = [...Array(15).keys()].map(n => n + 1).concat(null);
  const isSolved = tiles.every((val, i) => val === win[i]);
  if (isSolved) {
    clearInterval(timerInterval);
    message.textContent = `🎉 You solved it in ${moves} moves and ${time} seconds!`;
  }
}

shuffleTiles(); // auto-start
