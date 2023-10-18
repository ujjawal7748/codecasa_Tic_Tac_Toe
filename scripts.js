let board = [];
let currentPlayer = 'X';
let totalRounds, currentRound = 0;
let xWins = 0, oWins = 0, draws = 0;
let gameOver = false;

function startGame() {
    totalRounds = parseInt(document.getElementById('rounds').value);
    currentRound = 1;
    resetBoard();
    document.getElementById('status').textContent = `Round ${currentRound} of ${totalRounds}. Next player: X`;
    document.getElementById('nextBtn').style.display = 'none';
}

function nextRound() {
    currentRound++;
    resetBoard();
    if (currentRound <= totalRounds) {
        document.getElementById('status').textContent = `Round ${currentRound} of ${totalRounds}. Next player: X`;
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        // End game
        document.getElementById('status').textContent = `Game over! See results below.`;
        document.getElementById('nextBtn').style.display = 'none';
    }
}

function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
}

function makeMove(index) {
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').textContent = `${currentPlayer} wins this round!`;
        gameOver = true;
        currentPlayer === 'X' ? xWins++ : oWins++;
        updateScoreboard();
        checkEndOfGame();
        return;
    } else if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        gameOver = true;
        draws++;
        updateScoreboard();
        checkEndOfGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Round ${currentRound} of ${totalRounds}. Next player: ${currentPlayer}`;
}

function checkEndOfGame() {
    if (currentRound >= totalRounds) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('status').textContent += " Game over! Check results below.";
    } else {
        document.getElementById('nextBtn').style.display = 'block';
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winCombos) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            return true;
        }
    }
    return false;
}

function updateScoreboard() {
    document.getElementById('xWins').textContent = xWins;
    document.getElementById('oWins').textContent = oWins;
    document.getElementById('draws').textContent = draws;
}
