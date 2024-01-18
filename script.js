document.addEventListener("DOMContentLoaded", function () {
    let board = document.getElementById("game-board");
    let gridSize = 20;
  
    let snake = [{ x: 0, y: 0 }];
    let food = generateFood();
  
    let direction = "right";
    let score = 0;
    let gameInterval;
    let ateFood = false;
  
    let body = document.querySelector("body");
    let p = document.querySelector("p");
    let btn = document.createElement("button");
  
    function update() {
      moveSnake();
      checkCollision();
      checkFood();
      render();
    }
  
    function render() {
      board.innerHTML = "";
      renderSnake();
      renderFood();
    }
  
    function renderSnake() {
      snake.forEach((segment) => {
        const snakeSegment = document.createElement("div");
        snakeSegment.className = "snake";
        snakeSegment.style.left = segment.x * gridSize + "px";
        snakeSegment.style.top = segment.y * gridSize + "px";
        board.appendChild(snakeSegment);
      });
    }
  
    function renderFood() {
      const foodElement = document.createElement("div");
      foodElement.className = "food";
      foodElement.style.left = food.x * gridSize + "px";
      foodElement.style.top = food.y * gridSize + "px";
      board.appendChild(foodElement);
    }
  
    function moveSnake() {
      const head = { ...snake[0] };
  
      switch (direction) {
        case "up":
          head.y -= 1;
          break;
        case "down":
          head.y += 1;
          break;
        case "left":
          head.x -= 1;
          break;
        case "right":
          head.x += 1;
          break;
      }
  
      snake.unshift(head);
      if (!ateFood) {
        snake.pop();
      }
    }
  
    function checkCollision() {
      const head = snake[0];
  
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= board.clientWidth / gridSize ||
        head.y >= board.clientHeight / gridSize ||
        checkSelfCollision()
      ) {
        endGame();
      }
    }
  
    function checkSelfCollision() {
      const head = snake[0];
      return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
    }
  
    function checkFood() {
      const head = snake[0];
  
      if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        ateFood = true;
        score += 1;
      } else {
        ateFood = false;
      }
    }
  
    function generateFood() {
      const x = Math.floor(Math.random() * (board.clientWidth / gridSize));
      const y = Math.floor(Math.random() * (board.clientHeight / gridSize));
      return { x, y };
    }
  
    function endGame() {
      p.innerText = `Game Over! Your Score: ${score}`;
      body.appendChild(btn);
      btn.innerText = "Play again";
      btn.addEventListener("click", initializeGame);
      clearInterval(gameInterval);
    }
  
    function initializeGame() {
    //   p.innerText = "";
    //   btn.remove();
      btn.innerText = "Game is start";
      snake = [{ x: 0, y: 0 }];
      food = generateFood();
      direction = "right";
      score = 0;
      ateFood = false;
      gameInterval = setInterval(update, 150);
    }
  
    function handleSwipe() {
      let swipeThreshold = 30; 
      let deltaX = touchEndX - touchStartX;
      let deltaY = touchEndY - touchStartY;
  
      if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            direction = "right";
          } else {
            direction = "left";
          }
        } else {

          if (deltaY > 0) {
            direction = "down";
          } else {
            direction = "up";
          }
        }
      }
    }
  
    let touchStartX, touchStartY, touchEndX, touchEndY;
  
    document.addEventListener("touchstart", function (event) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    });
  
    document.addEventListener("touchmove", function (event) {
      touchEndX = event.touches[0].clientX;
      touchEndY = event.touches[0].clientY;
    });
  
    document.addEventListener("touchend", function () {
      handleSwipe();
    });
  
    document.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") direction = "up";
          break;
        case "ArrowDown":
          if (direction !== "up") direction = "down";
          break;
        case "ArrowLeft":
          if (direction !== "right") direction = "left";
          break;
        case "ArrowRight":
          if (direction !== "left") direction = "right";
          break;
      }
    });

    btn.innerText = "Start Game";
    btn.addEventListener("click", initializeGame);
  
    body.appendChild(btn);
  });
  