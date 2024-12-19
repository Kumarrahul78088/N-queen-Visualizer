document.addEventListener("DOMContentLoaded", () => {
    const submitSizeBtn = document.getElementById("submit-size");
    const boardSizeInput = document.getElementById("board-size");
    const boardElement = document.getElementById("board");
    const boardContainer = document.getElementById("board-container");
    const startBtn = document.getElementById("start-btn");
  
    let N;
  
    // Function to create the chessboard grid dynamically
    const createChessBoard = (size) => {
      boardElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;
      boardElement.style.gridTemplateRows = `repeat(${size}, 50px)`;
      boardElement.innerHTML = ''; // Clear previous board
  
      for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        if ((Math.floor(i / size) + (i % size)) % 2 === 0) {
          square.style.backgroundColor = "#f0d9b5"; // Light squares
        } else {
          square.style.backgroundColor = "#b58863"; // Dark squares
        }
        boardElement.appendChild(square);
      }
    };
  
    // N-Queen Backtracking Algorithm
    const isSafe = (board, row, col) => {
      for (let i = 0; i < col; i++) if (board[row][i]) return false;
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
      for (let i = row, j = col; i < N && j >= 0; i++, j--) if (board[i][j]) return false;
      return true;
    };
  
    const solveNQueens = (board, col, result) => {
      if (col >= N) {
        result.push(board.map(row => [...row]));
        return true;
      }
      for (let i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
          board[i][col] = 1;
          solveNQueens(board, col + 1, result);
          board[i][col] = 0;
        }
      }
      return false;
    };
  
    // Visualize the N-Queens solution
    const visualizeSolution = (solution) => {
      createChessBoard(N); // Redraw board
      for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
          if (solution[row][col] === 1) {
            const index = row * N + col;
            boardElement.children[index].classList.add("queen");
          }
        }
      }
    };
  
    // Start Visualization
    const startVisualization = () => {
      const board = Array(N).fill(0).map(() => Array(N).fill(0));
      const solutions = [];
      solveNQueens(board, 0, solutions);
      if (solutions.length > 0) {
        visualizeSolution(solutions[0]);
      }
    };
  
    // Event listener for setting board size and visualizing
    submitSizeBtn.addEventListener("click", () => {
      N = parseInt(boardSizeInput.value);
      if (N >= 4) {
        boardContainer.classList.remove("hidden");
        createChessBoard(N); // Create the chessboard grid
      } else {
        alert("Please enter a valid board size (N >= 4).");
      }
    });
  
    // Event listener for visualizing the solution
    startBtn.addEventListener("click", startVisualization);
  });
  