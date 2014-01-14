window.onload = function() {

  // Get Canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var boardwidth = canvas.width;
  var boardheight = canvas.height;

  // Game variables
  var cellwidth = 10; // partitions board into cells of length 10px
  var direction;
  var food;
  var score;
  var snake_array; // array of cells that make up the snake, grows each time food is eaten

  // Audio files
  var mainMusic = document.getElementById("main_music");
  var foodMusic = document.getElementById("food_music");

  // Creates a snake array of length 5
  function initSnake() {
    var length = 5;
    snake_array = [];
    for (var i = length-1; i >= 0; i--) {
      var cell = {x:i, y:0};
      snake_array.push(cell);
    }
  }

  function createFood() {
    // Randomly places food on the board
    var xpt = Math.round(Math.random()*(boardwidth - cellwidth) / cellwidth);
    var ypt = Math.round(Math.random()*(boardheight - cellwidth) / cellwidth);

    // x and y between 0 and 44 inclusive
    food = {x:xpt, y:ypt};
  }

  function paintCell(x, y) {
    // Helper function to paint one cell
    ctx.fillStyle = "white";
    ctx.fillRect(x*cellwidth, y*cellwidth, cellwidth, cellwidth);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*cellwidth, y*cellwidth, cellwidth, cellwidth);
  }

  function selfCollision(x, y, array) {
    // Array is array of {x, y} objects
    // Returns true if cell (x,y) is part of array cells
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) {
        return true;
      }
    }
    return false;
  }

  // Keydown event listener
  document.addEventListener("keydown", function(e) {
    var key = e.which;

    // Second clause to prevents reverse gear
    if(key == "37" && direction != "right") direction = "left";
    else if(key == "38" && direction != "down") direction = "up";
    else if(key == "39" && direction != "left") direction = "right";
    else if(key == "40" && direction != "up") direction = "down";
  });

  function paintCanvas() {

    // Paint canvas background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardwidth, boardheight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, boardwidth, boardheight);

    // Paint Snake
    for (var i = 0; i < snake_array.length; i++) {
      var cell = snake_array[i];
      paintCell(cell.x, cell.y);
    }

    // Paint Food
    paintCell(food.x, food.y);

    // Paint score
    var score_text = "Score: " + score;
    ctx.fillText(score_text, 5, boardheight-5);

  }

  function updateSnake() {
    var head_x = snake_array[0].x;
    var head_y = snake_array[0].y;

    // Assigns new head position based on direction
    if (direction == "right") head_x++;
    else if (direction == "left") head_x--;
    else if (direction == "up") head_y--;
    else if (direction == "down") head_y++;

    // Check for wall collisions and self collision
    if (head_x >= boardwidth/cellwidth ||
        head_x <= -1 ||
        head_y >= boardheight/cellwidth ||
        head_y <= -1 ||
        selfCollision(head_x, head_y, snake_array)) {

      // gameover, restart
      init();
      return;
    }

    // Check for food collision
    if (head_x == food.x && head_y == food.y) {
      score++;
      // Creates new head, so snake becomes longer
      var tail = {x:head_x, y:head_y};
      createFood();

      // Play food music
      foodMusic.pause();
      foodMusic.currentTime = 0;
      foodMusic.play();
    }
    else {
      var tail = snake_array.pop();
      tail.x = head_x;
      tail.y = head_y;
    }

    // Moves snake
    snake_array.unshift(tail) // Appends tail to beginning of array
  }

  function render() {
    // paint board, snake, and food
    paintCanvas();

    // update snake position, detects wall and food collisions
    updateSnake();
  }

  function init()
  {
    // Set default direction to right
    direction = "right";
    initSnake();
    createFood();
    score = 0;

    if(typeof game_loop != "undefined") {
      clearInterval(game_loop);
    }
    game_loop = setInterval(render, 60);
    mainMusic.currentTime = 0;
    mainMusic.play();
  }

  init();
}
