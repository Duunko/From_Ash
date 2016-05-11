//Main file for the game
//This a test to make sure Daniel "GETS" github. *wink wink* *nudge nudge*


/* Basic setup functions.
 * 
 * Get the canvas and the context, and set up the renderer with
 * the main game screen.
 * 
 * Also, start the game loop.
 */

// Get the canvas and the context
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Set up the renderer
var renderer = new renderer(canvas, context);

// Create and push the main stage.
// This stage will be the main game, we will do this later
// when we have a menu screen to work with.
var main_stage = new stage();
renderer.push(main_stage);

//Set up the tile system
var tiles = new create_board(900, 900, 50);
main_stage.push(tiles);

// Start the game loop. 
console.log(tiles.playerX);
make_loop(renderer, 15);


/* Making character movement
 * 
 * Uses an event listener to get keyboard interaction and
 * mouse interaction. 
 * 
 * Takes mostly from the in-class tile engine fiddle.
 */
 
var RIGHT_KEY_CODE = 68;
var LEFT_KEY_CODE = 65;
var UP_KEY_CODE = 87;
var DOWN_KEY_CODE = 83;

var ACTION_KEY_CODE = 75;

//mouse X and Y global variables
var mouseX = 0;
var mouseY = 0;

var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;
keysPressed[ACTION_KEY_CODE] = false;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(e){
	mouseX = e.offsetX || e.pageX - rect.left - window.scrollX;
	mouseY = e.offsetY || e.pageY - rect.top - window.scrollY;
}

function keyDown(e) {
  if (e.keyCode in keysPressed){
    keysPressed[e.keyCode] = true;
  }
}

function keyUp(e){
	if (e.keyCode in keysPressed){
    keysPressed[e.keyCode] = false;
  }
}


/* Making the basic character and pushing him to 
 * the stage for testing purposes.
 */

var MC = new main_character(tiles.playerX, tiles.playerY);
main_stage.push(MC);



