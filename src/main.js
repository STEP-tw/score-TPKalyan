let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;
let score = 0;

let animator=undefined;

const displayText = function(elementName,text){
  let element = document.querySelector(elementName);
  element.innerText = text;
}

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    score.increseBy(10);
    displayText('#hidden_tail',`Score : ${score.value}`);
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const createScore = function(incrementalValue){
  score = new Score();
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
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
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createScore(10);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  displayText("#hidden_tail",`Score : ${score.value}`);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
