document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const resetButton = document.getElementById('reset-button');

  const ROWS = 6;
  const COLUMNS = 7;
  const CELLS = ROWS * COLUMNS;
  let currentPlayer = 'red';
  let boardArray = Array(CELLS).fill('empty');

  // Create the game board
  for (let i = 0; i < CELLS; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'empty');
    cell.dataset.column = i % COLUMNS;
    board.appendChild(cell);
  }

  // Add event listeners to the cells for player moves
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const column = cell.dataset.column;
      const row = findEmptyRow(column);
      if (row !== -1) {
        const index = row * COLUMNS + parseInt(column);
        boardArray[index] = currentPlayer;
        cell.classList.remove('empty');
        cell.classList.add(currentPlayer);
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        checkWin(index);
      }
    });
  });

  // Reset the game board
  resetButton.addEventListener('click', () => {
    boardArray.fill('empty');
    cells.forEach(cell => {
      cell.classList.remove('red', 'yellow');
      cell.classList.add('empty');
    });
    currentPlayer = 'red';
  });

  // Function to find the first empty row in a column
  function findEmptyRow(column) {
    for (let row = ROWS - 1; row >= 0; row--) {
      const index = row * COLUMNS + parseInt(column);
      if (boardArray[index] === 'empty') {
        return row;
      }
    }
    return -1; // Column is full
  }

  // Function to check for a win
  function checkWin(index) {
    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;
    const currentPlayerColor = boardArray[index];

    // Check horizontally
    if (
      checkDirection(1, 0) + checkDirection(-1, 0) >= 3 ||
      // Check vertically
      checkDirection(0, 1) >= 3 ||
      // Check diagonally (top-left to bottom-right)
      checkDirection(1, 1) + checkDirection(-1, -1) >= 3 ||
      // Check diagonally (bottom-left to top-right)
      checkDirection(1, -1) + checkDirection(-1, 1) >= 3
    ) {
      // Player has won
      alert(`${currentPlayerColor.toUpperCase()} wins!`);
      resetGame();
    }

    // Helper function to check a direction for consecutive pieces
    function checkDirection(dx, dy) {
      let count = 0;
      let i = row + dy;
      let j = col + dx;

      while (i >= 0 && i < ROWS && j >= 0 && j < COLUMNS) {
        const currentIndex = i * COLUMNS + j;
        if (boardArray[currentIndex] === currentPlayerColor) {
          count++;
          i += dy;
          j += dx;
        } else {
          break;
        }
      }

      return count;
    }
  }

  function resetGame() {
    // Implement game reset logic here
    location.reload();
  }

});
