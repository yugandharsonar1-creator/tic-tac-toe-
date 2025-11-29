// Tic Tac Toe with 3-mark cycling rule
const boardEl = document.getElementById('board');
const currentPlayerEl = document.getElementById('currentPlayer');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
// Store positions per player in chronological order (oldest first)
const positions = { X: [], O: [] };

function init(){
  boardEl.innerHTML = '';
  for(let i=0;i<9;i++){
    const cell = document.createElement('div');
    cell.className = 'cell empty';
    cell.dataset.index = i;
    cell.addEventListener('click', onCellClick);
    boardEl.appendChild(cell);
  }
  render();
}

function onCellClick(e){
  const idx = Number(e.currentTarget.dataset.index);
  if(gameOver) return;
  if(board[idx] !== '') return; // cannot click occupied cell

  placeMark(idx, currentPlayer);
  // After placing, check for win
  if(checkWin(currentPlayer)){
    messageEl.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  // If board full (no empty) and no winner -> tie
  if(board.every(v => v !== '')){
    messageEl.textContent = 'It\'s a draw.';
    gameOver = true;
    return;
  }

  // switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  render();
}

function placeMark(idx, player){
  board[idx] = player;
  positions[player].push(idx);

  // Enforce max 3 marks per player: if >3, remove oldest
  if(positions[player].length > 3){
    const removedIdx = positions[player].shift();
    // If that removed index is still containing player's mark, clear it
    if(board[removedIdx] === player){
      board[removedIdx] = '';
    }
  }
  render();
}

const winningLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin(player){
  return winningLines.some(line => line.every(i => board[i] === player));
}

function render(){
  // update board UI
  const cells = boardEl.querySelectorAll('.cell');
  cells.forEach(cell => {
    const i = Number(cell.dataset.index);
    const val = board[i];
    cell.textContent = val;
    cell.classList.toggle('empty', val === '');
    cell.classList.toggle('x', val === 'X');
    cell.classList.toggle('o', val === 'O');
  });

  currentPlayerEl.textContent = currentPlayer;
  if(!gameOver) messageEl.textContent = '';
}

resetBtn.addEventListener('click', ()=>{
  board = Array(9).fill('');
  positions.X = [];
  positions.O = [];
  currentPlayer = 'X';
  gameOver = false;
  messageEl.textContent = '';
  render();
});

// initialize cells and render
init();
