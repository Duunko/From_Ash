/**
 * @author Bion719
 */
 
 /* The simple object to display the load screen */
 
function load_game(){
	var load_screen = new Image(); load_screen.src = 'images/load_screen.png'; load_screen.width = canvas.width; load_screen.height = canvas.height;
	var title_screen = new Image(); title_screen.src = 'images/title_screen.png'; title_screen.width = canvas.width; title_screen.height = canvas.height;
	LS = new load_screen_obj(0, 0, load_screen, title_screen);
	title_stage = new stage(true);
	renderer.push(title_stage);
	title_stage.push(LS);
	b1 = new title_button(80, 600, 300, 150, 1);
	b2 = new title_button(950, 600, 300, 150, 2);
	title_stage.push(b1);
	title_stage.push(b2);
	
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
	//Doors are 4
	//5 and 6 are wasd and mouse input tiles on the floor, respectively
	//Default is 0
	//If you want to add more obstacle types, ask me I'll do it.
	levels = [];
	//Tutorial Levels
	//MIN SIZE 1344/864
	levels.push([1344,1344,[[5, 2, 4], [3, 5, 5], [5, 5, 6]],400,300]);
	levels.push([1344,1344, [[6, 4, 3], [4, 2, 4]], 400, 500]);
	levels.push([1344,1344,[[10, 9, 1],[2, 3, 1, 'x', 4],[8, 4, 1, 'y',2],[12,1,1],[4,10,1,'x',2], [11, 7, 4]], 200, 100]);

	
	//Main Levels
	levels.push([1344,1344,[[10,9,1],[12,12,1],[2,2,1,'y',5],[10,2,1],[10,3,1],[6,0,4]],1344/2,1344/2]);
	levels.push([1344,1344,[[11,11,1],[4,7,1,'y',6],[10,2,1,'x',3], [2, 1, 4]],500,500]);
	levels.push([1536,1536,[[9,7,1,'y',3],[3,3,1,'y',2],[10,4,1,'x',3],[2,10,1,'x',2], [4, 2, 4]],500,500]);
	levels.push([1344,1344, [[6, 4, 3], [4, 2, 4]], 400, 500]);
	levels.push([1536,1728,[[13,4,1,'y',5],[3,3,1,'y',4],[10,4,1,'x',3],[9,9,1,'x',5], [4, 2, 4]],800,500]);
	levels.push([1536,1536,[[2,2,1,'y',3],[6,2,1,'y',3],[10,2,1,'y',3],[11,2,1,'y',3],
									[2,9,1,'y',3],[6,9,1,'y',3],[10,9,1,'y',3],[11,9,1,'y',3],
									[13, 2, 4]],500,500]);
									
	levels.push([1536,1536,[[0,8,1,'x',4],[7,8,1,'x',4],[10,0,1,'y',3],[11,2,1,'y',3],
									[13, 8, 4]],500,550]);
	//levels.push([1344,1344, [[6, 4, 3], [4, 2, 4]], 400, 500]);
	levels.push([1536,1536,[[3,4,1,'x',2],[3,5,1,'x',2],[7,0,1,'y',4],[7,8,1,'y',4],[11,2,1,'y',3],
									[10, 10, 4]],300,550]);
									
	levels.push([1344, 1344, [[6, 4, 3]], 500, 500]);
	
	
   //Enemies
   //Each index in this array counts as a level.
   //The arrays will have this format: 
   //[[x,y,"type"], [x,y,"type"]]
   //An example: [[20, 20, "a"]] will create an enemy A at 20,20
   //Only use enemy A for now, we can add more later							
	//final level
	
    
	enemies = [];
	enemies.push(undefined);
	enemies.push(undefined);
   enemies.push([[1100, 500, 'a'],[400, 500, 'a']]);
	enemies.push([[600, 200, 'a'],[900, 900, 'b']]);
	enemies.push([[800, 100, 'b'],[300, 100, 'b'],[300, 111, 'b']]);
	
	enemies.push([[800, 100, 'b'],[500, 100, 'b'],[300, 1344/2, 'b']]);
	enemies.push(undefined);
	enemies.push([[800, 100, 'b'],[300, 100, 'a'],[300, 1344/2, 'b']]);
	enemies.push([[100, 200, 'b'],[300, 200, 'b'],[600, 222, 'b'],
					  [100, 900, 'b'],[300, 900, 'b'],[600, 922, 'b']]);
	enemies.push([[100, 100, 'a'],[300, 100, 'a'],[400, 992, 'b'],[700, 992, 'b'],[550, 992, 'b']]);
	enemies.push([[100, 100, 'a'],[300, 100, 'a'],[400, 992, 'b'],[700, 992, 'b'],[1000, 222, 'b']]);
	
    
	current_level = 0;	
	
	//load the game world
	tiles = new create_board(levels[current_level][0], levels[current_level][1],96, levels[current_level][2]);
	
	//load the main character
	MC = new main_character(levels[current_level][3], levels[current_level][4]);
	
	//load the starting enemies
	
	//load the sound system
	SC = new sound_control();
	
	//load the overlays
	var dash_sprite = assets["gui_dash"];
	
	var melee_sprite = assets["gui_melee"];
	
	MO = new overlay(40, 700, melee_sprite, "melee");
	DO = new overlay(200, 700, dash_sprite, "dash");
	
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
		title_stage.destroy(this);
	}
	
	this.update = function(){
		if(anyKeyPress == true){
			
		}
	}
	
	this.draw = function(){
		context.drawImage(this.active_sprite, this.canvasX, this.canvasY, this.active_sprite.width, this.active_sprite.height);
	}
	
	this.loaded = function(){
		this.active_sprite = this.sprite2;
	}
}