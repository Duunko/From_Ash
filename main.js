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
var im1 = new Image();
im1.src = 'http://people.ucsc.edu/~djchambe/cm120/mc_down.png';
var im2 = new Image();
im2.src = 'http://people.ucsc.edu/~dursmith/cmpm120/seascorpion%20-%20selfishness_remade.png';
var im3 = new Image();
im3.src = 'http://people.ucsc.edu/~djchambe/cm120/dash_overlay.png';
var im4 = new Image();
im4.src = 'http://people.ucsc.edu/~djchambe/cm120/melee_overlay.png';
var im5 = new Image();
im5.src = 'http://people.ucsc.edu/~dursmith/cmpm120/treestump_nest1.png';
var im6 = new Image();
im6.src = 'http://people.ucsc.edu/~djchambe/cm120/overlay_cover.png';
var im7 = new Image();
im7.src = 'http://people.ucsc.edu/~djchambe/cm120/ash_tile.png';
var im8 = new Image();
im8.src = 'http://people.ucsc.edu/~dursmith/cmpm120/black_square.png';
assets.push(im1); //Character
assets.push(im2); //Enemy_a
assets.push(im3); //Dash overlay
assets.push(im4); //Melee overlay 
assets.push(im5); //Obstacle sprite
assets.push(im6); //Overlay rectangular cover
assets.push(im7); //Ash tiles
assets.push(im8); //Black square


// Create and push the main stage.
// This stage will be the main game, we will do this later
// when we have a menu screen to work with.
var main_stage = new stage();
renderer.push(main_stage);

//Set up the tile system
//var non_ash = [[10, 10, 1],[5, 5, 2], [8, 1, 1, 'y',5]];
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
 
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
 //-----------------------------------------------------------
 //---------MAIN GAME FUNCTIONS-------------------------------
 //-----------------------------------------------------------
 
 function start_game(){
	MC = new main_character(tiles.playerX, tiles.playerY);
	EN1 = new enemy_a(100,100);
	EN2 = new enemy_a(200, 200);
	SC = new sound_control();
	main_stage.push(MC);
	main_stage.push(EN1);
	main_stage.push(EN2);
	main_stage.push(SC);
	main_stage.push(SC);

	//overlays
	dash_sprite = assets[2];
	dash_sprite.width = 64;
	dash_sprite.height = 64;
	
	melee_sprite = assets[3];
	melee_sprite.width = 64;
	melee_sprite.height = 64;
	
	MO = new overlay(10, 125, melee_sprite, "melee");
	main_stage.push(MO);
	
	DO = new overlay(10, 200, dash_sprite, "dash");
	main_stage.push(DO);
 }
 
 function reset_game(){
	MC.hp = MC.hpMax;
	MC.fp = Math.floor(MC.nextFp);
	main_stage.remove_enemies();
	
	EN1 = new enemy_a(100,100);
	EN2 = new enemy_a(200, 200);
	
	main_stage.push(EN1);
	main_stage.push(EN2);
 }

start_game();

