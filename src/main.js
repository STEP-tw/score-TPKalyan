let game=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const displayText = function(elementName,text){
  let element = document.querySelector(elementName);
  element.innerText = text;
}

const animateSnake=function() {
  let details=game.move();
  paintBody(details.oldHead);
  unpaintSnake(details.oldTail);
  paintHead(details.head);
  if(game.hasSnakeEatenFood()) {
    game.increaseScoreBy(10);
    displayText('#hidden_tail',`Score : ${game.getScore()}`);
    game.grow();
    game.createFood();
    drawFood(game.getFood());
  }
}

const createScore = function(incrementalValue){
  score = new Score();
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      game.turnLeft();
      break;
    case "KeyD":
      game.turnRight();
      break;
    case "KeyC":
      game.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
  game.addSnake(snake);
}

const createGame=function() {
  let topLeft=new Position(0,0,"east");
  let bottomRight=new Position(numberOfCols,numberOfRows,"east");
  game=new Game(topLeft,bottomRight);
  game.addScore(new Score());
}

const startGame=function() {
  createGame();
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  displayText("#hidden_tail",`Score : ${game.getScore()}`);
  drawSnake(game.getSnake());
  game.createFood();
  drawFood(game.getFood());
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
