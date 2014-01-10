window.onload = function() {

  // Get Canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var boardwidth = canvas.width;
  var boardheight = canvas.height;
  console.log("width: " + boardwidth);
  console.log("height: " + boardheight);

  // Game variables
  var cell_width = 10; // partitions board into cells of length 10px
  var direction;
  var food;
  var score;
  var snake_array; // array of cells that make up the snake


  function create_snake() {
    var length = 5;
    snake_array = [];
    for (var i = length-1; i >= 0; i--) {
      var cell = {x:i, y:0};
      snake_array.push(cell);
    }

  }


  function create_food() {
    // Randomly places food on the board
    var xpt = Math.round(Math.random()*(boardwidth - cell_width) / cell_width);
    var ypt = Math.round(Math.random()*(boardheight - cell_width) / cell_width);

    // x and y between 0 and 44 inclusive
    food = {x:xpt, y:ypt};
  }

  //create_food();
  //console.log(food);

  function paint() {

    // Paints canvas background white with black border
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardwidth, boardheight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, boardwidth, boardheight); 

    var head_x = snake_array[0].x;
    var head_y = snake_array[0].y;
   
    // Assigns new head position based on direction
    if (direction == "right") {
      head_x++;
    } 
    else if (direction == "left") {
      head_x--;
    }
    else if (direction == "up") {
      head_y--;
    }
    else if (direction == "down") {
      head_y++;
    }

    // Check for wall collisions
    if (head_x >= boardwidth/cell_width || 
        head_x <= -1 || 
        head_y >= boardheight/cell_width ||
        head_y <= -1 ||
        self_collision(head_x, head_y, snake_array)) {

      // gameover, restart
      init();
      return;
    }

    // Check for food collision
    if (head_x == food.x && head_y == food.y) {
      score++;
      // Creates new head, so snake becomes longer
      var tail = {x:head_x, y:head_y};
      create_food();
    }
    else {
      var tail = snake_array.pop();
      tail.x = head_x;
      tail.y = head_y;
    }
    // Moves snake
    snake_array.unshift(tail) // Appends to beginning of array

    // Paint snake
    for (var i = 0; i < snake_array.length; i++) {
      var cell = snake_array[i];
      paint_cell(cell.x, cell.y);
    }

    // Paint food
    paint_cell(food.x, food.y);

    // Paint score
    var score_text = "Score: " + score;
    ctx.fillText(score_text, 5, boardheight-5);
  }

  function paint_cell(x, y) {
    // Colors a cell  
    ctx.fillStyle = "white";
    ctx.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cell_width, y*cell_width, cell_width, cell_width);
  }

  function self_collision(x, y, array) {
    // array is array of {x, y} objects
    // Returns true if cell (x,y) is part of array cells
    for (var i = 0; i < array.length; i++) {
      if (array[i].x == x && array[i].y == y) {
        return true;
      }
    }
    return false;
  }

  // Event listeners
  document.onkeydown = function(e){
    var key = e.which;
    // Second clause to prevents reverse gear
    if(key == "37" && direction != "right") {
      direction = "left";
    }
    else if(key == "38" && direction != "down") {
      direction = "up";
    }
    else if(key == "39" && direction != "left") {
      direction = "right";
    }
    else if(key == "40" && direction != "up") {
      direction = "down";
    }
  }

  function init()
  {
    direction = "right"; //default direction
    create_snake();
    create_food(); //Now we can see the food particle
    //finally lets display the score
    score = 0;
    
    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  init(); 
}
