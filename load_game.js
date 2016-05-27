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
	
	//load the main character
	MC = new main_character();
	
	//load the game world
	var non_ash = [[10, 10, 1],[4, 4, 3], [8, 2, 1, 'y',5]];
	tiles = new create_board(900, 900, 64, non_ash);
	
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