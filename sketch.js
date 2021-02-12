// Major Project
// Cooper
// Tues 9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 12;
const COLS = 12;
let grid, cellWidth, cellHeight, boardRows, boardCols;

let board = 
[[0,1,0,1,0,1,0,1,0,1,0,1], 
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0]
];

function setup() {
  let myCanvas = createCanvas(windowWidth*0.5, windowHeight*1);
  myCanvas.position(windowWidth*0.25, windowHeight*0);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;

  boardRows = board.length;
  boardCols = board[0].length;
}

function draw() {
  background(255);
  displayGrid();
  displayPieces();
}


function createEmptyGrid(cols, rows) {
  let empty = [];
  let number = 0;
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(number);
      if (number === 0) {
        number = 1;
      }
      else if (number === 1) {
        number = 0;
      }
    }
    if (number === 0) {
      number = 1;
    }
    else if (number === 1) {
      number = 0;
    }
  }
  return empty;
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  if (board[y][x] === 1) {
    board[y][x] = 2;
  }
  else if (board[y][x] === 2) {
    board[y][x] = 1;
    availableMoves();
  }
}

function availableMoves() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  if (board[y-1][x+1] === 0) {
    grid[y-1][x+1] = 2;
  }
  else if (board[y-1][x-1] === 0) {
    grid[y-1][x-1] = 2;
  }
  else if (board[y+1][x+1] === 0) {
    grid[y+1][x+1] = 2;
  }
  else if (board[y+1][x-1] === 0) {
    grid[y+1][x-1] = 2;
  }
}

function displayPieces() {
  for (let y=0; y<boardRows; y++) {
    for (let x=0; x<boardCols; x++) {
      noStroke();
      if (board[y][x] === 1) {
        fill("red");
      }
      else if (board[y][x] === 0){
        noFill();
      }
      else {
        fill("yellow");
      }
      ellipseMode(CORNER);
      ellipse(x*cellWidth,y*cellHeight,cellWidth-1,cellHeight-1);
    }
  }
}


function displayGrid() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] ===1 ) {
        fill("black");
      }
      else {
        fill("yellow");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}