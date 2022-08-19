let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let lives = 3;
let score = 0;

let xBall = 300;
let yBall = 300;
let xBallVel = 3;
let yBallVel = 3;

let xRect = canvas.width/2;
let yRect = canvas.height - 40;
let yRectVel = -0;
let xRectVel = 0;

let rightPressed = false;
let leftPressed = false;

let blocks = [];

for (let j = 0; j < 3; j++) {
  blocks[j] = [];
  for (let i = 0; i < 10; i++) {
    let xBlock = (i * 70) + 30;
    let yBlock = (j * 40) + 20;
    let block = {x: xBlock, y: yBlock};
    blocks[j][i] = block;
}
}


function drawText(text, x, y, colour) {
  ctx.font = "20px Arial";
  ctx.fillStyle = colour ;
  ctx.fillText(text, x, y);
}

function drawBlocks() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 10; i++) {
      if (blocks[j][i]){
        ctx.beginPath();
        ctx.rect(blocks[j][i].x, blocks[j][i].y, 40, 20);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawRect(){
  ctx.beginPath();
  ctx.rect(xRect, yRect, 120, 22);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(xBall, yBall, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function keyDown(event){
  if (event.key == "ArrowRight"){
    rightPressed = true;
  }
  else if (event.key == "ArrowLeft"){
    leftPressed = true;
  }
}

function keyUp(event) {
  if (event.key == "ArrowRight"){
    rightPressed = false;
  }
  else if (event.key == "ArrowLeft"){
    leftPressed = false;
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawRect();
  drawBlocks();
  drawText("Score: " + score, 300, 200, "blue");
  drawText("Lives: " + lives, 400, 200, "red")
}


function blockCollisionDetection() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 10; i++) {
      if (blocks[j][i]) {
      const block = blocks[j][i];

        if ((xBall > block.x)
        && (xBall < block.x + 70)
        && (yBall > block.y)
        && (yBall < block.y + 40)) {
          blocks[j][i] = null;
          score++;
          yBallVel *= -1;
          if (score == 30) {
            alert("You won!");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function update(){

  //update ball
  if (yBall > canvas.height){
    lives--;

    if (lives == 0) {
      alert("Game over");
      document.location.reload();
      clearInterval(interval);
    }
    else {
      xBall = 360;
      yBall = 400;
      xBallVel = 2;
      yBallVel = -2;
    }
  }

  if (xBall > canvas.width) {
    xBallVel *= -1;
  }

  if (xBall < 0) {
    xBallVel *= -1;
  }

  if (yBall < 0) {
    yBallVel *= -1;
  }

  if ((xBall > xRect)
  && (xBall < xRect + 120)
  && (yBall > yRect)
  && (yBall < yRect + 20)){
    yBallVel *= -1;
  }

  xBall += xBallVel;
  yBall += yBallVel;

  //update rectangle/paddle (rect.)
  if (rightPressed) {
    xRectVel = 3;
  }
  else if (leftPressed) {
    xRectVel = -3;
  }

  else {
    xRectVel = 0;
  }

  xRect += xRectVel;
  yRect += yRectVel;

  blockCollisionDetection();
}


function loop(){
  draw();
  update();
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
let interval = setInterval(loop, 10);
