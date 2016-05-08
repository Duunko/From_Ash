//Main file for the game


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

// Start the game loop. 
make_loop(renderer, 30);



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

var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e) {
  if (e.keyCode in keysPressed){
    keysPressed[e.keyCode] = true;
  }

  if (keysPressed[RIGHT_KEY_CODE] == true) {
         MC.x += 2;
       }
       if (keysPressed[LEFT_KEY_CODE] == true) {
          MC.x -= 2;
       }
       if (keysPressed[DOWN_KEY_CODE] == true) {
         MC.y += 2;
       }
       if (keysPressed[UP_KEY_CODE] == true) {
         MC.y -= 2;
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

var MC = new main_character(20, 20);
main_stage.push(MC);


