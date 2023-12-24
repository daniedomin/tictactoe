let currentPlayer = 'X';
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let gameActive = true;

function makeMove(event) {
  const cell = event.target;
  const row = parseInt(cell.getAttribute('data-row'));
  const col = parseInt(cell.getAttribute('data-col'));
  cell.addEventListener('click', makeMove);


  if (gameBoard[row][col] === '' && gameActive) {
    gameBoard[row][col] = currentPlayer;
    updateCell(row, col);
    checkWinner();
    togglePlayer();
    updateTurnText();
  }
}

function updateCell(row, col) {
  const cell = document.querySelector(`#board .cell[data-row="${row}"][data-col="${col}"]`);
  cell.textContent = currentPlayer;
  cell.addEventListener('click', (event) => makeMove(event));

}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateTurnText() {
  document.getElementById('turn').textContent = `${currentPlayer}'s Turn`;
}

function restartGame() {
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gameActive = true;
  currentPlayer = 'X';
  document.getElementById('turn').textContent = `${currentPlayer}'s Turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.getElementById('winner-alert').innerHTML = '';
}

document.getElementById('board').addEventListener('click', makeMove);

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) ||
      (gameBoard[0][i] === currentPlayer && gameBoard[1][i] === currentPlayer && gameBoard[2][i] === currentPlayer)
    ) {
      displayWinner();
      return;
    }
  }

  if (
    (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) ||
    (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer)
  ) {
    displayWinner();
    return;
  }

  if (gameBoard.flat().every(cell => cell !== '')) {
    displayDraw();
  }
}
const boardElement = document.getElementById('board');
for (let row = 0; row < 3; row++) {
  const rowElement = document.createElement('div');
  rowElement.classList.add('row');
  for (let col = 0; col < 3; col++) {
    const cell = document.createElement('div');
    cell.classList.add('col-4', 'cell');
    cell.setAttribute('data-row', row);
    cell.setAttribute('data-col', col);
    cell.addEventListener('click', makeMove);
    rowElement.appendChild(cell);
  }
  boardElement.appendChild(rowElement);
}





function displayWinner() {
  gameActive = false;
  const winnerAlert = document.getElementById('winner-alert');
  winnerAlert.innerHTML = `
    <div class="alert alert-success" role="alert">
      ${currentPlayer} wins!
    </div>
  `;
}

function displayDraw() {
  gameActive = false;
  const winnerAlert = document.getElementById('winner-alert');
  winnerAlert.innerHTML = `
    <div class="alert alert-warning" role="alert">
      It's a draw!
    </div>
  `;
}