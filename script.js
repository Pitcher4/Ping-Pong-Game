let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let xBall = 50;
let yBall = 50;
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
function drawBlocks() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.rect(blocks[j][i].x, blocks[j][i].y, 40, 20);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
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
}

function update(){

  //update ball
  if (yBall > canvas.height){
    alert("Game over");
    document.location.reload();
    clearInterval(interval);
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

  if ((xBall > xRect) && (xBall < xRect + 120) && (yBall > yRect) && (yBall < yRect + 20)){
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

  if ((xBall > (blocks[i][j].x) - 20)) {
    if ((xBall < (blocks[i][j].x) + 20)) {
      if (yBall > (blocks[i][j].y) - 10) {
        if (yBall < (blocks[i][j].y) + 10) {
          //xBallVel *= -1;
          yBallVel *= -1;
        }
      }
    }
  }
}


function loop(){
  draw();
  update();
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
let interval = setInterval(loop, 10);
