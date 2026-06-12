const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const resetBtn = document.getElementById("reset");
const resetScoresBtn = document.getElementById("resetScores");
const darkModeBtn = document.getElementById("darkMode");

const xScoreText = document.getElementById("x-score");
const oScoreText = document.getElementById("o-score");

let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);
resetScoresBtn.addEventListener("click", resetScores);
darkModeBtn.addEventListener("click", toggleDarkMode);

function handleClick() {

    if (this.textContent !== "" || !gameActive) {
        return;
    }

    this.textContent = currentPlayer;

    if (checkWinner()) {

        statusText.textContent = `Player ${currentPlayer} Wins!`;

        if (currentPlayer === "X") {
            xScore++;
            xScoreText.textContent = xScore;
        } else {
            oScore++;
            oScoreText.textContent = oScore;
        }

        gameActive = false;
        return;
    }

    if (checkDraw()) {

        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {

    for (let pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            return true;
        }
    }

    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function resetGame() {

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";
}

function resetScores() {

    xScore = 0;
    oScore = 0;

    xScoreText.textContent = 0;
    oScoreText.textContent = 0;

    resetGame();
}

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "Light Mode";
    } else {
        darkModeBtn.textContent = "Dark Mode";
    }
}