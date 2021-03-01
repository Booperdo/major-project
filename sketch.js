// Major Project
// Cooper
// Tues 9/21
//

const ROWS = 12;
const COLS = 12;

let mode = 0;

let cellWidth;
let cellHeight;
let oldPosition, moves, jump, grid;
let turn = "player";
let playerPoints = 0;
let aiPoints = 0;
let playerPieces = 30;

let board = 
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

let backDrop;


let boardRows = board.length;
let boardCols = board[0].length;

function preload() {
  backDrop = loadImage("assets/background.webp");
}

function setup() {
  let myCanvas = createCanvas(windowWidth*0.5, windowHeight*1);
  myCanvas.position(windowWidth*0.25, windowHeight*0);

  // create game board 
  grid = createEmptyGrid(COLS, ROWS);

  cellWidth = width / COLS;
  cellHeight = height / ROWS;
}

function draw() {
  // background
  image(backDrop, 0, 0, width, height);
  
  // Title Screen
  if (mode === 0) {
    fill("white");
    textSize(100);
    text("checkers", width-width/2*1.5, height/3);
    textSize(32);
    text("Press 1 to vs Ai.", width/2/1.3, height/2);
    textSize(32);
    text("Press 2 to Play with a Friend.", width/2/1.9, height/2+30);
  }
  
  // Single Player
  if (mode === 1) {
    displayGrid();
    displayPieces();
    aiMove();
    numberOfPoints();
  }

  // MultiPlayer
  if (mode === 2) {
    displayGrid();
    displayPieces();
    numberOfPoints();
  }

  // RuleBook
  if (mode ===3 ) {
    fill("white");
    textSize(50);
    text("Rules", width/2, height/3);
    textSize(32);
    text("1. You can move to the yellow squares.", width/2, height/2-90);
    text("2. You can only jump one piece per turn.", width/2, height/2-60);
    text("3. Get to the other side to get points.", width/2, height/2-30);
    text("4. Your points are displayd in the bottom right.", width/2, height/2);
    text("5. The opponents in the top left.", width/2, height/2+30);
    text("6. Player with the most points wins.", width/2, height/2+60);
  }

  // Menu Button
  if (mode === 4) {
    fill("white");
    textSize(100);
    text("checkers", width/2, height/3);
    textSize(32);
    text("Press 1 to vs Ai.", width/2, height/2);
    textSize(32);
    text("Press 2 to Play with a Friend.", width/2, height/2+30);
  }
}

function keyPressed() {
  // Buttons for navigating menu
  if (keyCode === 49) {
    mode = 1;
  }
  if (keyCode === 50) {
    mode = 2;
  }
  if (keyCode === 51) {
    mode = 3;
  }
  if (keyCode === 52) {
    mode = 4;
  }
}

function createEmptyGrid(cols, rows) {
  // creating board area
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
  // selecting and showing available moves
  if (turn === "player") {
    if (board[y][x] === 1) {
      board[y][x] = 2;
      oldPosition = [y, x];
      availableMoves();
    }
    // deselecting pieces
    else if (board[y][x] === 2 && y-1 >= 0 ) {
      board[y][x] = 1;
      grid[y-1][x+1] = 1;
      grid[y-1][x-1] = 1;
      if (y-2 > 0) {
        grid[y-2][x+2] = 1;
        grid[y-2][x-2] = 1;
      }
      
    }
  }
  else if (mode === 2) {
    // Selecting in 2 player
    if (turn === "ai") {
      if (board[y][x] === 3) {
        board[y][x] = 2;
        oldPosition = [y, x];
        availableMoves2();
      }
      // deselecting 
      else if (board[y][x] === 2 && y+1 >= 0 ) {
        board[y][x] = 3;
        grid[y+1][x+1] = 1;
        grid[y+1][x-1] = 1;
        if (y-2 < 12) {
          grid[y+2][x+2] = 1;
          grid[y+2][x-2] = 1;
        }
        
      }
    }
  }
}

function availableMoves() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  // showing moves
  if (y-1 >= 0){
    if (board[y-1][x+1] === 0) {
      grid[y-1][x+1] = 2;
    }
    if (board[y-1][x-1] === 0) {
      grid[y-1][x-1] = 2;
    }
  }
  // showing jumps
  if (y-2 >= 0) {
    if (board[y-1][x-1] === 3 && board[y-2][x-2] === 0) {
      grid[y-2][x-2] = 2;
    }
    if (board[y-1][x+1] === 3 && board[y-2][x+2] === 0) {
      grid[y-2][x+2] = 2;
    }
  }
}

function availableMoves2() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  // showing moves in two player
  if (y+1 <= 12){
    if (board[y+1][x+1] === 0) {
      grid[y+1][x+1] = 5;
    }
    if (board[y+1][x-1] === 0) {
      grid[y+1][x-1] = 5;
    }
  }
  // showing jumps in two player
  if (y+2 <= 12) {
    if (board[y+1][x-1] === 1 && board[y+2][x-2] === 0) {
      grid[y+2][x-2] = 5;
    }
    if (board[y+1][x+1] === 1 && board[y+2][x+2] === 0) {
      grid[y+2][x+2] = 5;
    }
  }
}


function mouseClicked() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  // movin pieces
  if (grid[y][x] === 2) {
    board[y][x] = 1;
    grid[oldPosition[0]-1][oldPosition[1]+1] = 1;
    grid[oldPosition[0]-1][oldPosition[1]-1] = 1;
    //  Jumping pieces
    if (oldPosition[0]-2 < 0 || oldPosition[1] < 0) {
      grid[oldPosition[0]-1][oldPosition[1]+1] = 1;
      grid[oldPosition[0]-1][oldPosition[1]-1] = 1;
    }
    // edge check
    else {
      grid[oldPosition[0]-2][oldPosition[1]+2] = 1;
      grid[oldPosition[0]-2][oldPosition[1]-2] = 1;
    }
    board[oldPosition[0]][oldPosition[1]] = 0;
    // edge check for jumping
    if (y+2 === oldPosition[0] && x+2 === oldPosition[1]) {
      board[y+1][x+1] = 0;
    }
    else if (y+2 === oldPosition[0] && x-2 === oldPosition[1]) {
      board[y+1][x-1] = 0;
    }

    turn = "ai";
  }
  if (mode === 2) {
    // moving in two player
    if (grid[y][x] === 5) {
      board[y][x] = 3;
      grid[oldPosition[0]+1][oldPosition[1]+1] = 1;
      grid[oldPosition[0]+1][oldPosition[1]-1] = 1;
      //  Jumping pieces
      if (oldPosition[0]+2 > 12 || oldPosition[1] > 12) {
        grid[oldPosition[0]+1][oldPosition[1]+1] = 1;
        grid[oldPosition[0]+1][oldPosition[1]-1] = 1;
      }
      // edge check
      else {
        grid[oldPosition[0]+2][oldPosition[1]+2] = 1;
        grid[oldPosition[0]+2][oldPosition[1]-2] = 1;
      }
      board[oldPosition[0]][oldPosition[1]] = 0;
      // edge check
      if (y-2 === oldPosition[0] && x-2 === oldPosition[1]) {
        board[y-1][x-1] = 0;
      }
      else if (y-2 === oldPosition[0] && x+2 === oldPosition[1]) {
        board[y-1][x+1] = 0;
      }
  
      turn = "player";
    }
  }
}

function displayPieces() {
  for (let y=0; y<boardCols; y++) {
    for (let x=0; x<boardRows; x++) {
      noStroke();
      // player 1 pieces
      if (board[y][x] === 1) {
        fill("lightblue");
      }
      else if (board[y][x] === 0) {
        noFill();
      }
      //  available moves
      else if (board[y][x] === 2) {
        fill("pink");
      }
      // ai / player 2 peices
      else if (board[y][x] === 3) {
        fill("purple");
      }
      else if (board[y][x] === 4) {
        noFill();
      }
      // player 2 available moves
      else if (board[y][x] === 5) {
        fill("yellow");
      }
      ellipseMode(CORNER);
      ellipse(x*cellWidth,y*cellHeight,cellWidth-1,cellHeight-1);
    }
  }
}


function displayGrid() {
  // drawing board
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        fill("red");
      }
      else if (grid[y][x] ===1 ) {
        fill("black");
      }
      else {
        fill("pink");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function aiMove() {
  // ai moves
  moves = [];
  jump = [];
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      // avalible pieces to move
      if (y+1 < 12) {
        if (board[y][x] === 3 && board[y+1][x+1] === 0 && board[y+1][x-1] === 0) {
          moves.push([y, x]);
        }
        if (board[y][x] === 3 && board[y+1][x+1] !== 0 && board[y+1][x-1] === 0) {
          moves.push([y, x]);
        }
        if (board[y][x] === 3 && board[y+1][x+1] === 0 && board[y+1][x-1] !== 0) {
          moves.push([y, x]);
        }
      }
      // jumping
      if (y+2 < 12) {
        if (board[y][x] === 3 && board[y+1][x+1] === 1 && board[y+2][x+2] === 0 && y+2<12) {
          jump.push([y, x]);
        }
        if (board[y][x] === 3 && board[y+1][x-1] === 1 && board[y+2][x-2] === 0 && y+2<12) {
          jump.push([y, x]);
        }
      }
    }
  }
  if (turn ===  "ai") {
    //  jumping if possible
    if (jump.length > 0) {
      let choice = random(jump);
      if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] === 1 && board[choice[0]+2][choice[1]+2] === 0) {
        turn = "player";
        board[choice[0]][choice[1]] = 0;
        board[choice[0]+1][choice[1]+1] = 0;
        board[choice[0]+2][choice[1]+2] = 3;
        jump = [];
        playerPieces = playerPieces - 1;
      }
      else if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]-1] === 1 && board[choice[0]+2][choice[1]-2] === 0) {
        turn = "player";
        board[choice[0]][choice[1]] = 0;
        board[choice[0]+1][choice[1]-1] = 0;
        board[choice[0]+2][choice[1]-2] = 3;
        jump = [];
        playerPieces = playerPieces - 1;
      }
    }
    // moving pieces
    else if(moves.length > 0) {
      let choice = random(moves);
      if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] === 0 && board[choice[0]+1][choice[1]-1] === 0) {
        turn = "player";
        board[choice[0]][choice[1]] = 0;
        board[choice[0]+1][choice[1]+1] = 3;
        moves = [];
      }
      else if (board[choice[0]][choice[1]] === 3 && board[choice[0]+1][choice[1]+1] !== 0 && board[choice[0]+1][choice[1]-1] === 0) {
        turn = "player";
        board[choice[0]][choice[1]] = 0;
        board[choice[0]+1][choice[1]-1] = 3;
        moves = [];
      }
      else if (board[choice[0]][choice[1]] && board[choice[0]+1][choice[1]+1] === 0 && board[choice[0]+1][choice[1]-1] !== 0) {
        turn = "player";
        board[choice[0]][choice[1]] = 0;
        board[choice[0]+1][choice[1]+1] = 3;
        moves = [];
      }
    }
  }
}

function numberOfPoints() {
  // score board
  for (let y=0; y<boardCols; y++) {
    for (let x=0; x<boardRows; x++) {
      if (y === 0) {
        if (board[y][x] === 1) {
          board[y][x] = 4;
        }
        if (board[y][x] === 4) {
          playerPoints = playerPoints +1;
          board[y][x] = 0;
        }
      }
      if (y === 11) {
        if (board[y][x] === 3) {
          board[y][x] = 4;
        }
        if (board[y][x] === 4) {
          aiPoints = aiPoints +1;
          board[y][x] = 0;
        }
      }
      else if (playerPieces === 0) {
        if (board[y][x] === 3) {
          board[y][x] = 4;
          aiPoints = aiPoints + 1;
          board[y][x] = 0;
        }
        if (board[y][x] === 4) {
          aiPoints = aiPoints + 1;
          board[y][x] = 0;
        }
      }
      if (mode === 1) {
        if (moves.length === 0 && board[y][x] === 0) {
          if (board[y][x] === 1) {
            board[y][x] = 4;
          
          }
          if (board[y][x] === 4) {
            playerPoints = playerPoints + 1;
            board[y][x] = 0;
          }
        }
      }
      // displaying score board
      if (y === 0 && x === 0) {
        if (grid[y][x] === 0) {
          fill("black");
          textSize(40);
          textAlign(CENTER, CENTER);
          text(aiPoints, cellWidth/2, cellHeight/2);

        }
      }
      if (y === 11 && x === 11) {
        if (grid[y][x] === 0) {
          fill("black");
          textSize(40);
          textAlign(CENTER, CENTER);
          text(playerPoints, cellWidth*11.5, cellHeight*11.5);
        }
      }
    }
  }
}
