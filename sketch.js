// Major Project
// Cooper
// Tues 9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 12;
const COLS = 12;
let grid, cellWidth, cellHeight, boardRows, boardCols, oldPosition;
let turn = "player";

let aiBoard = 
[[0,1,0,1,0,1,0,1,0,1,0,1], 
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0]
];
let playerBoard = 
[[0,3,0,3,0,3,0,3,0,3,0,3], 
  [3,0,3,0,3,0,3,0,3,0,3,0],
  [0,3,0,3,0,3,0,3,0,3,0,3],
  [3,0,3,0,3,0,3,0,3,0,3,0],
  [0,3,0,3,0,3,0,3,0,3,0,3],
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

  boardRows = aiBoard.length;
  boardCols = aiBoard[0].length;
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
  if (turn === "player") {
    if (playerBoard[y][x] === 1) {
      playerBoard[y][x] = 2;
      oldPosition = [y, x];
      availableMoves();
    }
    else if (playerBoard[y][x] === 2) {
      playerBoard[y][x] = 1;
      grid[y-1][x+1] = 1;
      grid[y-1][x-1] = 1;
    // grid[y+1][x+1] = 1;
    // grid[y+1][x-1] = 1;
    }
  }
}

function availableMoves() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  if (playerBoard[y-1][x+1] === 0) {
    grid[y-1][x+1] = 2;
  }
  if (playerBoard[y-1][x-1] === 0) {
    grid[y-1][x-1] = 2;
  }
}

function mouseClicked() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  if (grid[y][x] === 2) {
    playerBoard[y][x] = 1;
    grid[oldPosition[0]-1][oldPosition[1]+1] = 1;
    grid[oldPosition[0]-1][oldPosition[1]-1] = 1;
    playerBoard[oldPosition[0]][oldPosition[1]] = 0;
    turn = "ai";
    aiMove();
  }  
}

function displayPieces() {
  for (let y=0; y<boardRows; y++) {
    for (let x=0; x<boardCols; x++) {
      noStroke();
      if (aiBoard[y][x] === 1) {
        fill("orange");
      }
      else if (aiBoard[y][x] === 0){
        noFill();
      }
      ellipseMode(CORNER);
      ellipse(x*cellWidth,y*cellHeight,cellWidth-1,cellHeight-1);
    }
  }
  for (let y=0; y<boardRows; y++) {
    for (let x=0; x<boardCols; x++) {
      noStroke();
      if (playerBoard[y][x] === 1) {
        fill("red");
      }
      else if (playerBoard[y][x] === 0){
        noFill();
      }
      else if (playerBoard[y][x] === 2) {
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

function aiMove() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (turn ===  "ai") {
        if (aiBoard[y][x] === 1) {
          turn = "player";
          return aiBoard[y+1][x+1] = 1;

        }
      }
    }
  }
}