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

//preload of assets
var assets = new Array();
assets.push('http://people.ucsc.edu/~djchambe/cm120/mc_down.png'); //character
assets.push('http://people.ucsc.edu/~djchambe/cm120/sun.png'); //enemy_a
assets.push('http://people.ucsc.edu/~djchambe/cm120/dash_overlay.png'); //initial overlay

// Create and push the main stage.
// This stage will be the main game, we will do this later
// when we have a menu screen to work with.
var main_stage = new stage();
renderer.push(main_stage);

//Set up the tile system
var tiles = new create_board(900, 900, 64);
main_stage.push(tiles);

// Start the game loop. 
//console.log(tiles.playerX);
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

var ACTION_KEY_CODE = 75;


var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;
keysPressed[ACTION_KEY_CODE] = false;

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
	if (e.button == 0){	
		MC.attack();
	} else if (e.button == 2){
	    MC.dash();
		//MC.on_hit(5);
	}
}

canvas.oncontextmenu = function(){ return false;}

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
 
 //-----------------------------------------------------------
 //---------MAIN GAME FUNCTIONS-------------------------------
 //-----------------------------------------------------------
 
 function start_game(){
	 
 }
 
 function reset_game(){
	
 }
 
//-----------------------------------------------------------
//---------INSTANCES-----------------------------------------
//-----------------------------------------------------------
var MC = new main_character(tiles.playerX, tiles.playerY);
var EN1 = new enemy_a(100,100);
var EN2 = new enemy_a(200, 200);
main_stage.push(MC);
main_stage.push(EN1);
main_stage.push(EN2);

//overlays
var dash_sprite = new Image();
dash_sprite.src = assets[2];
dash_sprite.width = 150;
dash_sprite.height = 150;
 
var DO = new overlay(0 + 10, canvas.height - 160, dash_sprite, "dash");
main_stage.push(DO);

var MO = new overlay(160 + 10, canvas.height - 160, dash_sprite, "melee");
main_stage.push(MO);

