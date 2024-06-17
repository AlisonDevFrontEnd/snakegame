const gameArea = document.querySelector(".game-area");
const snakeElement = document.getElementById("snake");
const foodElement = document.getElementById("food");
const step = 20;
let x = 0;
let y = 0;
let snake = [{ x: 0, y: 0 }];
let direction = "ArrowRight";
let gameOver = false;

const getRandomPosition = () => {
  const maxPos = 380;
  const pos = Math.floor(Math.random() * (maxPos / step)) * step;
  return pos;
};

const placeFood = () => {
  const foodX = getRandomPosition();
  const foodY = getRandomPosition();
  foodElement.style.left = `${foodX}px`;
  foodElement.style.top = `${foodY}px`;
};

const updateSnakePosition = () => {
  if (gameOver) return;

  x +=
    direction === "ArrowRight" ? step : direction === "ArrowLeft" ? -step : 0;
  y += direction === "ArrowDown" ? step : direction === "ArrowUp" ? -step : 0;

  if (
    x < 0 ||
    x >= 400 ||
    y < 0 ||
    y >= 400 ||
    snake.some((segment) => segment.x === x && segment.y === y)
  ) {
    gameOver = true;
    alert("Game Over!");
    return;
  }

  snake.unshift({ x, y });

  if (
    x === parseInt(foodElement.style.left) &&
    y === parseInt(foodElement.style.top)
  ) {
    placeFood();
  } else {
    snake.pop();
  }

  gameArea.innerText = "";
  snake.forEach((segment) => {
    const snakeSegment = document.createElement("div");
    snakeSegment.classList.add("snake");
    snakeSegment.style.left = `${segment.x}px`;
    snakeSegment.style.top = `${segment.y}px`;
    gameArea.appendChild(snakeSegment);
  });

  gameArea.appendChild(foodElement);
};

document.addEventListener("keydown", (e) => {
  if (
    e.key.startsWith("Arrow") &&
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
    direction = e.key;
  }
});

placeFood();
setInterval(updateSnakePosition, 200);