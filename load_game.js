/**
 * @author Bion719
 */
 
 /* The simple object to display the load screen */
 
function load_game(){
	var load_screen = new Image(); load_screen.src = 'images/load_screen.png'; load_screen.width = canvas.width; load_screen.height = canvas.height;
	var title_screen = new Image(); title_screen.src = 'images/title_screen.png'; title_screen.width = canvas.width; title_screen.height = canvas.height;
	LS = new load_screen_obj(0, 0, load_screen, title_screen);
	main_stage.push(LS);
	
	load_sprites();
	
	//Load all stages
	//Each level has five fields, except the first level doesnt use 4 and 5
	//Fields are: Level width, level height, obstacles with format of [row, column, type],
	//Starting X of MC and starting Y of MC
	//IMPORTANT NOTE!! The starting width and height cannot be larder than 1/2 of the canvas width
	//and height!! Because of how our tile system is set up if its any larger than that stuff breaks.
	//Current numbers for obstacle types:
	//Walls are 1
	//Depots are 3
	//Default is 0
	//If you want to add more obstacle types, ask me I'll do it.
	levels = [];
	levels.push([900, 900, [[10, 10, 1],[4, 4, 3], [8, 2, 1, 'y',5]], 400, 300]);
	levels.push([900, 900, [[10, 9, 1],[3, 4, 3], [8, 4, 1, 'y',2]], 300, 300]);
	current_level = 0;
	
	
	

	
	//load the game world
	tiles = new create_board(levels[current_level][0], levels[current_level][1],64, levels[current_level][2]);
	
	//load the main character
	MC = new main_character(levels[current_level][3], levels[current_level][4]);
	
	//load the starting enemies
	EN1 = new enemy_a(100,100);
	EN2 = new enemy_a(200, 200);
	
	//load the sound system
	SC = new sound_control();
	
	//load the overlays
	var dash_sprite = assets["gui_dash"];
	
	var melee_sprite = assets["gui_melee"];
	
	MO = new overlay(10, 125, melee_sprite, "melee");
	DO = new overlay(10, 200, dash_sprite, "dash");
	
	console.log("all objects loaded");
} 
 
function load_screen_obj(x, y, spr, spr2){
	this.sprite = spr;
	this.sprite2 = spr2;
	this.active_sprite = this.sprite;
	
	this.canvasX = x;
	this.canvasY = y;
	
	this.depth = 1;
	
	this.ready = false;
	
	this.destroy = function(){
		main_stage.destroy(this);
	}
	
	this.update = function(){
		if(anyKeyPress == true){
			start_game();
			this.destroy();
		}
	}
	
	this.draw = function(){
		context.drawImage(this.active_sprite, this.canvasX, this.canvasY, this.active_sprite.width, this.active_sprite.height);
	}
	
	this.loaded = function(){
		this.active_sprite = this.sprite2;
	}
}