// const ROWS = 12;
// const COLS = 12;
// let grid, cellWidth, cellHeight, boardRows, boardCols, oldPosition, moves, jump;
// let turn = "player";

// let board = 
// [[0,3,0,3,0,3,0,3,0,3,0,3], 
//   [3,0,3,0,3,0,3,0,3,0,3,0],
//   [0,3,0,3,0,3,0,3,0,3,0,3],
//   [3,0,3,0,3,0,3,0,3,0,3,0],
//   [0,3,0,3,0,3,0,3,0,3,0,3],
//   [0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0],
//   [1,0,1,0,1,0,1,0,1,0,1,0],
//   [0,1,0,1,0,1,0,1,0,1,0,1],
//   [1,0,1,0,1,0,1,0,1,0,1,0],
//   [0,1,0,1,0,1,0,1,0,1,0,1],
//   [1,0,1,0,1,0,1,0,1,0,1,0]
// ];

// function setup() {
//   let myCanvas = createCanvas(windowWidth*0.5, windowHeight*1);
//   myCanvas.position(windowWidth*0.25, windowHeight*0);
//   grid = createEmptyGrid(COLS, ROWS);
//   cellWidth = width / COLS;
//   cellHeight = height / ROWS;

//   boardRows = board.length;
//   boardCols = board[0].length;
// }

// function draw() {
//   background(255);
//   displayGrid();
//   displayPieces();
// }


// function createEmptyGrid(cols, rows) {
//   let empty = [];
//   let number = 0;
//   for (let y=0; y<rows; y++) {
//     empty.push([]);
//     for (let x=0; x<cols; x++) {
//       empty[y].push(number);
//       if (number === 0) {
//         number = 1;
//       }
//       else if (number === 1) {
//         number = 0;
//       }
//     }
//     if (number === 0) {
//       number = 1;
//     }
//     else if (number === 1) {
//       number = 0;
//     }
//   }
//   return empty;
// }

// function mousePressed() {
//   let x = Math.floor(mouseX / cellWidth);
//   let y = Math.floor(mouseY / cellHeight);
//   if (turn === "player") {
//     if (board[y][x] === 1) {
//       board[y][x] = 2;
//       oldPosition = [y, x];
//       availableMoves();
//     }
//     else if (board[y][x] === 2) {
//       board[y][x] = 1;
//       grid[y-1][x+1] = 1;
//       grid[y-1][x-1] = 1;
//       grid[y-2][x+2] = 1;
//       grid[y-2][x-2] = 1;
//     }
//   }
// }

// function availableMoves() {
//   let x = Math.floor(mouseX / cellWidth);
//   let y = Math.floor(mouseY / cellHeight);
//   if (board[y-1][x+1] === 0) {
//     grid[y-1][x+1] = 2;
//   }
//   if (board[y-1][x-1] === 0) {
//     grid[y-1][x-1] = 2;
//   }
//   if (board[y-1][x-1] === 3 && board[y-2][x-2] === 0) {
//     grid[y-2][x-2] = 2;
//   }
//   if (board[y-1][x+1] === 3 && board[y-2][x+2] === 0) {
//     grid[y-2][x+2] = 2;
//   }
// }

// function mouseClicked() {
//   let x = Math.floor(mouseX / cellWidth);
//   let y = Math.floor(mouseY / cellHeight);
//   if (grid[y][x] === 2) {
//     board[y][x] = 1;
//     grid[oldPosition[0]-1][oldPosition[1]+1] = 1;
//     grid[oldPosition[0]-1][oldPosition[1]-1] = 1;
//     //  Jumping pieces
//     if (oldPosition[0]-2 < 0 || oldPosition[1] < 0) {
//       grid[oldPosition[0]-1][oldPosition[1]+1] = 1;
//       grid[oldPosition[0]-1][oldPosition[1]-1] = 1;
//     }
//     else {
//       grid[oldPosition[0]-2][oldPosition[1]+2] = 1;
//       grid[oldPosition[0]-2][oldPosition[1]-2] = 1;
//     }
//     board[oldPosition[0]][oldPosition[1]] = 0;
//     if (y+2 === oldPosition[0] && x+2 === oldPosition[1]) {
//       board[y+1][x+1] = 0;
//     }
//     else if (y+2 === oldPosition[0] && x-2 === oldPosition[1]) {
//       board[y+1][x-1] = 0;
//     }

//     turn = "ai";
//   }
// }

// function displayPieces() {
//   for (let y=0; y<boardRows; y++) {
//     for (let x=0; x<boardCols; x++) {
//       noStroke();
//       if (board[y][x] === 1) {
//         fill("red");
//       }
//       else if (board[y][x] === 0) {
//         noFill();
//       }
//       else if (board[y][x] === 2) {
//         fill("yellow");
//       }
//       else if (board[y][x] === 3) {
//         fill("orange");
//       }
      
//       ellipseMode(CORNER);
//       ellipse(x*cellWidth,y*cellHeight,cellWidth-1,cellHeight-1);
//     }
//   }
// }


// function displayGrid() {
//   for (let y=0; y<ROWS; y++) {
//     for (let x=0; x<COLS; x++) {
//       if (grid[y][x] === 0) {
//         fill("white");
//       }
//       else if (grid[y][x] ===1 ) {
//         fill("black");
//       }
//       else {
//         fill("yellow");
//       }
//       rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
//     }
//   }
// }

// function aiMove() {
//   moves = [];
//   jump = [];
//   for (let y=0; y<ROWS; y++) {
//     for (let x=0; x<COLS; x++) {
//       if (board[y][x] === 3 && board[y+1][x+1] === 0 && board[y+1][x-1] === 0) {
//         moves.push([y, x]);
//       }
//       if (board[y][x] === 3 && board[y+1][x+1] !== 0 && board[y+1][x-1] === 0) {
//         moves.push([y, x]);
//       }
//       if (board[y][x] === 3 && board[y+1][x+1] === 0 && board[y+1][x-1] !== 0) {
//         moves.push([y, x]);
//       }
//       // jumping
//       if (board[y][x] === 3 && board[y+1][x+1] === 1 && board[y+2][x+2] === 0 && board[y+2][x+2] < 12) {
//         jump.push([y, x]);
//       }
//       if (board[y][x] === 3 && board[y+1][x-1] === 1 && board[y+2][x-2] === 0 && board[y+2][x-2] < 12) {
//         jump.push([y, x]);
//       }
//     }
//   }
//   if (turn ===  "ai") {
//     if (jump.length > 0) {
//       let choice = random(jump);
//       if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] === 1 && board[choice[0]+2][choice[1]+2] === 0) {
//         turn = "player";
//         board[choice[0]][choice[1]] = 0;
//         board[choice[0]+1][choice[1]+1] = 0;
//         board[choice[0]+2][choice[1]+2] = 3;
//         jump = [];
//       }
//       else if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]-1] === 1 && board[choice[0]+2][choice[1]-2] === 0) {
//         turn = "player";
//         board[choice[0]][choice[1]] = 0;
//         board[choice[0]+1][choice[1]-1] = 0;
//         board[choice[0]+2][choice[1]-2] = 3;
//         jump = [];
//       }
//     }
//     else {
//       let choice = random(moves);
//       if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] === 0 && board[choice[0]+1][choice[1]-1] === 0) {
//         turn = "player";
//         board[choice[0]][choice[1]] = 0;
//         board[choice[0]+1][choice[1]+1] = 3;
//         moves = [];
//       }
//       else if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] !== 0 && board[choice[0]+1][choice[1]-1] === 0) {
//         turn = "player";
//         board[choice[0]][choice[1]] = 0;
//         board[choice[0]+1][choice[1]-1] = 3;
//         moves = [];
//       }
//       else if (board[choice[0]][choice[1]] && board[choice[0]+1][choice[1]+1] === 0 && board[choice[0]+1][choice[1]-1] !== 0) {
//         turn = "player";
//         board[choice[0]][choice[1]] = 0;
//         board[choice[0]+1][choice[1]+1] = 3;
//         moves = [];
//       }
//     }
//   }
// }