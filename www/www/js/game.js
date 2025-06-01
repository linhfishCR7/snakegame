document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const statusEl = document.getElementById("gameStatus");

  if (!canvas) {
    statusEl.textContent = "Canvas not supported.";
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    statusEl.textContent = "Unable to initialize game. Your browser may not support canvas.";
    return;
  }

  const box = 20;
  let snake;
  let food;
  let direction;
  let game;

  function initGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
    direction = null;
    statusEl.textContent = "Use arrow keys to play!";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "lime" : "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    if (
      headX < 0 || headY < 0 ||
      headX >= canvas.width || headY >= canvas.height ||
      snake.some((s, index) => index !== 0 && s.x === headX && s.y === headY)
    ) {
      clearInterval(game);
      statusEl.textContent = "Game Over! Refresh to play again.";
      return;
    }

    let newHead = { x: headX, y: headY };

    if (headX === food.x && headY === food.y) {
      food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box,
      };
    } else {
      snake.pop();
    }

    snake.unshift(newHead);
  }

  function startGame() {
    clearInterval(game);
    initGame();
    game = setInterval(draw, 150);
  }

  startGame();
});
