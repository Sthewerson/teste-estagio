// Configurações do jogo
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
const width = canvas.width / cellSize;
const height = canvas.height / cellSize;

// Cria o tabuleiro inicial aleatório
let board = createBoard();

// Função para criar o tabuleiro inicial aleatório
function createBoard() {
  const board = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(Math.random() < 0.5 ? 0 : 1);
    }
    board.push(row);
  }
  return board;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(board, i, j) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) {
        continue;
      }
      const ni = (i + di + height) % height;
      const nj = (j + dj + width) % width;
      count += board[ni][nj];
    }
  }
  return count;
}

// Função para aplicar as regras do jogo da vida e gerar a próxima geração
function nextGeneration() {
  const newBoard = [];
  for (let i = 0; i < height; i++) {
    const newRow = [];
    for (let j = 0; j < width; j++) {
      const neighbors = countNeighbors(board, i, j);
      if (board[i][j] === 1) {
        if (neighbors === 2 || neighbors === 3) {
          newRow.push(1);
        } else {
          newRow.push(0);
        }
      } else {
        if (neighbors === 3) {
          newRow.push(1);
        } else {
          newRow.push(0);
        }
      }
    }
    newBoard.push(newRow);
  }
  board = newBoard;
}

// Função para desenhar o tabuleiro na tela
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const x = j * cellSize;
      const y = i * cellSize;
      if (board[i][j] === 1) {
        ctx.fillStyle = "#000";
      } else {
        ctx.fillStyle = "#fff";
      }
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

// Iniciar o jogo
setInterval(function () {
  drawBoard();
  nextGeneration();
}, 1000); // Intervalo de 1 segundo (1000 milissegundos)
