// Major Project
// Cooper
// Tues 9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 12;
const COLS = 12;
let grid, cellWidth, cellHeight;

function setup() {
  let myCanvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.1, windowHeight*0.1);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
}

function draw() {
  background(255);
  displayGrid();
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

function displayGrid() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        fill("black");
      }
      else {
        fill("white");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}