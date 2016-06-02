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
	//Tutorial Levels
	//levels.push([960,960,undefined,400,300]);
	levels.push([960, 960, [[6, 4, 3]], 300, 300]);
	levels.push([960,960,[[10, 9, 1],[2, 3, 1, 'x', 4],[8, 4, 1, 'y',2],[4,10,1,'x',2]], 300, 300]);

	
	//Main Levels
	levels.push([1280,1280,[[10,9,1],[12,12,1],[2,2,1,'y',5],[14,2,1],[14,3,1]],100,30]);
	levels.push([1280,1280,[[11,11,1],[4,7,1,'y',6],[4,6,3],[10,2,1,'x',3]],100,100]);
	levels.push([1280,1280,[[9,7,1,'y',3],[3,3,1,'y',2],[10,2,3],[10,4,1,'x',3],[2,10,1,'x',2]],100,100]);
	levels.push([1088,1088,[[13,4,1,'y',5],[3,3,1,'y',4],[13,1,3],[10,4,1,'x',3],[9,9,1,'x',5]],600,400]);
	levels.push([1280,1088,[[2,2,1,'y',3],[6,2,1,'y',3],[10,2,1,'y',3],[14,2,1,'y',3],
									[2,9,1,'y',3],[6,9,1,'y',3],[10,9,1,'y',3],[14,9,1,'y',3],
									[1,10,3]],100,400]);
    //Enemies
    //Each index in this array counts as a level.
    //The arrays will have this format: 
    //[[x,y,"type"], [x,y,"type"]]
    //An example: [[20, 20, "a"]] will create an enemy A at 20,20
    //Only use enemy A for now, we can add more later
    
	//enemies = [];
    //enemies.push([[600, 600, 'a']])
    
	current_level = 0;
	
	/* if(current_level == 1){
		EN1 = new enemy_a(200, 200);
		main_stage.push(EN1);
		if(EN1.hp <= 0){
			current_level += 1;
		}
	} */
	
	/* if(current_level == 0){
		context.fillText('Try out your moves!',100,50);
		context.fillText('WASD to move and mouse clicks to attack!',100,75);
	} */
	
	/* if(current_level == 2){
		context.fillText('You can deposit fire points for later use.',100,50);
		context.fillText('Press "E" on the tree stump to deposit your points.',100,75);
	} */
	
	//load the game world
	tiles = new create_board(levels[current_level][0], levels[current_level][1],64, levels[current_level][2]);
	
	//load the main character
	MC = new main_character(levels[current_level][3], levels[current_level][4]);
	
	//load the starting enemies
	
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