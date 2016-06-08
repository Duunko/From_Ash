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

enemies_killed = 0;

storedFP = 0;


// Start the game loop. 
make_loop(renderer, 15);

/* Making character movement
 * 
 * Uses an event listener to get keyboard interaction and
 * mouse interaction. 
 * 
 * Takes mostly from the in-class tile engine fiddle.
 */

//mouse X and Y global variables
var mouseX = 0;
var mouseY = 0;

// corners of canvas
var topLeft = {x:0,y:0};
var topRight = {x:canvas.width,y:0};
var bottomLeft = {x:0,y:canvas.height};
var bottomRight = {x:canvas.width,y:canvas.height};

//mouse angles in degrees
var mADTL = 0;
var mADTR = 0;
var mADBL = 0;
var mADBR = 0;
//character angles in degrees
var cADTL = 0;
var cADTR = 0;
var cADBL = 0;
var cADBR = 0;

//keycodes and key presses
var RIGHT_KEY_CODE = 68;
var LEFT_KEY_CODE = 65;
var UP_KEY_CODE = 87;
var DOWN_KEY_CODE = 83;

var ACTION_KEY_CODE = 69;
var RETRIEVE_KEY_CODE = 82;
var BEAM_KEY_CODE = 81;

var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;
keysPressed[ACTION_KEY_CODE] = false;
keysPressed[RETRIEVE_KEY_CODE] = false;
keysPressed[BEAM_KEY_CODE] = false;

var anyKeyPress = false;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
//document.addEventListener('mouseup', onMouseUp);

function onMouseMove(e){
	mouseX = e.offsetX || e.pageX - window.scrollX;
	mouseY = e.offsetY || e.pageY  - window.scrollY;
}

function onMouseDown(e){
	if(renderer.stages.length > 1){
		
	} else {
	    if (e.button == 0){	
		    MC.attack();
	    } else if (e.button == 2){
	        MC.dash();
	    }
	}
}

canvas.oncontextmenu = function(){ return false;}

function keyDown(e) {
  if (e.keyCode in keysPressed){
		keysPressed[e.keyCode] = true;
  }
  anyKeyPress = true;
}

function keyUp(e){
	if (e.keyCode in keysPressed){
		keysPressed[e.keyCode] = false;
	}
	anyKeyPress = false;
}

function angleDeg(x1,y1,x2,y2){
	AD = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	return AD;
}

/* Making the basic character and pushing him to 
 * the stage for testing purposes.
 */
 
 //-----------------------------------------------------------
 //---------HELPER FUNCTIONS----------------------------------
 //-----------------------------------------------------------
 
 //converters
 function toCanvasX(old){
	return old - tiles.left; 
 }
 
 function toCanvasY(old){
	return old - tiles.top; 
 }
 
 function toMapX(old){
	return old + tiles.left;
 }
 
 function toMapY(old){
	return old + tiles.top;
 }
 
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
 //-----------------------------------------------------------
 //---------MAIN GAME FUNCTIONS-------------------------------
 //-----------------------------------------------------------
 
 load_game();
 
 function start_game(){

	MC = new main_character(tiles.playerX, tiles.playerY);
	EN1 = new enemy_a(100,100);
	EN2 = new enemy_a(200,200);
	SC = new sound_control();
	//Set up the tile system
	main_stage.push(tiles);
	
	main_stage.push(MC);
	
	//main_stage.push(EN1);
    
	main_stage.push(SC);
	main_stage.push(SC);
	
	main_stage.push(MO);
	main_stage.push(DO);
 }
 
 function reset_game(){
 	current_level = 0;
 	tiles.refresh();
	MC.hp = MC.hpMax;
	MC.nextFp = MC.nextFp;
	MC.fp = Math.floor(MC.nextFp);
	main_stage.remove_enemies();
	
	//EN1 = new enemy_a(100,100);
	//EN2 = new enemy_a(200, 200);
	
	//main_stage.push(EN1);
	//main_stage.push(EN2);
 }
 
