/*
 * This is a skeleton for the game snake. Fill out the 13 TODOs in the indicated order to make a working game!
 */
window.onload = function() {

  // ====== GLOBAL GAME OBJECTS AND VARIABLES
  // Get Canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var boardwidth = canvas.width;
  var boardheight = canvas.height;

  // Game variables
  var cellwidth = 10; // partitions board into cells of length 10px
  var direction;
  var food = {x:0, y:0};
  var score = 0;
  var snake_array = []; // array of cells that make up the snake, grows each time food is eaten

  // Audio files
  var mainMusic = document.getElementById("main_music");
  var foodMusic = document.getElementById("food_music");

  /*
   * ======= INITIALIZATION FUNCTIONS ======
   * These functions initialze the game variables
   */

  function initSnake() {
    // This function creates a snake array of length 5
    // Note that the "head" of the snake is the beginning of the array, and the "tail" is at the end of the array
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
    // TODO 1: uncomment and fill out code to randomly generate y coordinate
    //var ypt = ...

    // x and y between 0 and 44 inclusive
    // Sets food object attributes
    // TODO 2: uncomment the following after you finish implementing ypt
    //food = {x:xpt, y:ypt};
  }

  /*
   * ====== HELPER FUNCTIONS ======
   * These are small, single task functions used by the bigger functions
   */
  function paintCell(x, y) {
    /* This is a helper function to paint one cell white with a black border.
     * TODO 3: implement paintCell
     * Hints: use the fillStyle, fillRect, strokeStyle, strokeRect canvas functions
     */
  }

  function selfCollision(x, y, array) {
    /*
     * This function checks to see if the snake has collided with itself
     * Array is array of {x, y} objects
     * Returns true if cell (x,y) is part of array cells
     * TODO 11: implement selfCollision
     * Hint: array is an array of cells, so objects with attributes {x, y}. Use a for loop to iterate through the array for checking
     */

    return false
  }

  function wallCollision(x, y) {
    /*
     * This function checks to see whether the snake is touching the wall.
     * Function should return true of the x and y position collides with the wall. Otherwise return false.
     * TODO 12: implement this function
     *  Hint: use boardwidth, boardheight, and cellwidth
     */

    return false;
  }

  /*
   *  ====== RENDERING FUNCTIONS =====
   * These two functions are called at every timestamp when the page re-renders. They deal with painting the canvas and the main game logic
   */
  function paintCanvas() {
    /*
     * This function paints all the game components on the canvas. This includes the background, the snake, the food, and the score
     */

    // Paint canvas background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, boardwidth, boardheight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, boardwidth, boardheight);

    // Paint Snake
    /*
     * TODO 4: Paint the snake by iterating through the snake_array and painting each cell of the snake by calling paintCell
     * Hint: See initSnake() for how snake_array is constructed
     */

    // Paint Food
    // TODO 5: uncomment the following when you finish implementing paintCell
    //paintCell(food.x, food.y);
    // Checkpoint: At the end of this step, you should be able to see the snake array in the upper and a food cell appear randomly on the canvas when you refresh.

    // Paint score
    var score_text = "Score: " + score;
    ctx.fillText(score_text, 5, boardheight-5);

  }

  function updateSnake() {
    /*
     * This function checks for game over and updates the game state. The snake moves one unit in the direction it is facing. The game ends when the snake collides with the wall or collides with itself. The snake grows when it collides with food.
     */
    var head_x = snake_array[0].x;
    var head_y = snake_array[0].y;

    // Assigns new head position based on direction
    // TODO 6: finish for the other directions
    if (direction == "right") {
      head_x++;
    }
    else if (direction == "left") {
      // here
    }
    else if (direction == "up") {
      // here
    }
    else if (direction == "down") {
      // here
    }

    // Check for wall collisions and self collision
    if (wallCollision(head_x, head_y) ||
        selfCollision(head_x, head_y, snake_array)) {

      // gameover, restart
      init();
      return;
    }

    /*
     * There are 2 senarios every time the snake moves. The first one is that it collides with the food. In this case, the food cell essentially becomes the new head of the snake. In the 2nd senario, the snake moves normally, so in this case, we want to move the tail of the snake to the new head to visualize movement.
     */
    // Check for food collision
    if (head_x == food.x && head_y == food.y) {

      // TODO 7: increment the score

      // Creates new head, so snake becomes longer
      var tail = {x:head_x, y:head_y};

      // Creates new food
      createFood();

      // Play food music
      foodMusic.pause();
      foodMusic.currentTime = 0;
      foodMusic.play();
    }
    else {

      // TODO 8: uncomment tail variable. remove the tail from the snake_array. set tail to new head position
      // Hint: use the pop() function of an array to remove the last element of the array
      //var tail = 
    }

    // Moves snake by appending tail to the beginning of the array
    // TODO 9: Append tail to the beginning of snake_array
    // Hint: use the unshift() function
    // Checkpoint: At the end of this step, you should be able to see the snake move across the screen, eat food, and see the score increment. The only thing left is checking for collisions!

  }

  /*
   * ====== EVENT LISTENERS ======
   */
  // Keydown event listener used to detect keyboard events
  document.addEventListener("keydown", function(e) {
    var key = e.which;

    // Second clause to prevents reverse gear
    // TODO 10: finish for the other arrow keys
    // Hint: keycode 38 -> up key, 39 -> right key, 40 -> down key
    // Checkpoint: After this step, you should be able to control the snake, eat food, and see the score increment. The only thing left is checking for collisions and adding background music! Go up for steps 11 and 12.
    if(key == "37" && direction != "right") {
      direction = "left";
    }

  });


  /*
   * ====== MAIN FUNCTIONS ======
   * These functions control the main flow of the game
   */
  function render() {
    /*
     * This function renders the canvas, is composed of painting all the components on the canvas and updating the state of the snake
     */

    // paint board, snake, and food
    paintCanvas();

    // update snake position, detects wall and food collisions
    updateSnake();
  }


  function init()
  {
    /*
     * This function initializes the game and all game variables
     */

    // Set default direction to right
    direction = "right";
    initSnake();
    createFood();
    score = 0;

    // Clears previous setInterval when game ends, so the setIntervals do not cumulate
    if(typeof game_loop != "undefined") {
      clearInterval(game_loop);
    }
    game_loop = setInterval(render, 60);

    // TODO 13: set the main music start to the beginning of the track and play the music. Hurray, you are done!
  }

  // Starts snake game when page is loaded
  init();
}
