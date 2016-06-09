/**
 * @author bion719
 */

/* System for the tiles/environment of the game
 *
 */
 
function create_board(world_width, world_height, tile_size, non_ash){
	
	this.initial_generation = false;
	this.depth = 100000;
	this.TILE_TYPE_ASH = 0;
	this.TILE_TYPE_VOID = 1;
	this.TILE_TYPE_OBS = 2;
	this.TILE_TYPE_DEPO = 3;
	this.TILE_TYPE_DOOR = 4;
	this.TILE_TYPE_WASD = 5;
	this.TILE_TYPE_MOUSE = 6;
	this.TILE_TYPE_BRANCH = 7;
	this.TILE_TYPE_RIBS = 8;
	this.TILE_TYPE_SKULL = 9;
	this.TILE_TYPE_ENDDEPO = 10;

	this.NUM_TILE_TYPES = 11;
	
	
	//sprite_ash = assets["tile_ash"];
	//sprite_darkness = assets["black_square"];
	sprite_ash = assets.tile_ash;
	sprite_darkness = assets.enviro_rock;
	
	this.TILE_SPRITES = [sprite_ash, sprite_darkness];

	this.TILE_SIZE = tile_size;
	this.WORLD_WIDTH = world_width;
	this.WORLD_HEIGHT = world_height;

	this.TILES_IN_A_ROW = Math.floor(this.WORLD_WIDTH/this.TILE_SIZE);
	this.TILES_IN_A_COL = Math.floor(this.WORLD_HEIGHT/this.TILE_SIZE);

	this.VIEW_WIDTH = canvas.width;
	this.VIEW_HEIGHT = canvas.height;

	this.VIEW_TILE_WIDTH = Math.floor(this.VIEW_WIDTH / this.TILE_SIZE);
	this.VIEW_TILE_HEIGHT = Math.floor(this.VIEW_HEIGHT / this.TILE_SIZE);
	
	this.left;
	this.top;

	this.tileGrid = [];
	this.tiles = [];
	
	this.will_refresh = false;

	for(var i = 0; i < this.TILES_IN_A_ROW; i++){
		var column = new Array();
	  for(var j=0; j < this.TILES_IN_A_COL; j++){
		//column[j] = Math.floor(Math.random()*NUM_TILE_TYPES);
	    column[j] = 0;
	  } //INNER
	  this.tileGrid[i] = column;
	} //OUTER
	
	if (non_ash != undefined){
		for(var i = 0; i < non_ash.length; i++){
			if(non_ash[i].length == 3){
			    this.tileGrid[non_ash[i][0]][non_ash[i][1]] = non_ash[i][2];
			} else if(non_ash[i][3] == 'x'){
				for(var j = non_ash[i][0]; j < non_ash[i][0] + non_ash[i][4]; j++){
					this.tileGrid[j][non_ash[i][1]] = non_ash[i][2];
				}
			} else if(non_ash[i][3] == 'y'){
				for(var j = non_ash[i][1]; j < non_ash[i][1] + non_ash[i][4]; j++){
					this.tileGrid[non_ash[i][0]][j] = non_ash[i][2];
				}
			}
		}
	}
	
	this.update = function(){
		if(this.initial_generation == false){
	 	     for(var i = 0; i < this.tileGrid.length; i++){
	 	     	for(var j = 0; j < this.tileGrid.length; j++){
					if(this.tileGrid[i][j] == 0){
						var rando = Math.random();
						if(rando <= .2){
							var rando2 = Math.random();
							this.tileGrid[i][j] =  8; //Math.floor(rando2 * (9 - 7) + 7);
						} else {
							this.tileGrid[i][j] = 0;
						}
					}
	 	     		if(this.tileGrid[i][j] == 1){
	 	     			var obj = new obstacle(i*this.TILE_SIZE, j*this.TILE_SIZE, 'wall');
	 	     			main_stage.push(obj);
	 	     		} if(this.tileGrid[i][j] == 3){
	 	     		    var obj = new depo(i*this.TILE_SIZE, j*this.TILE_SIZE, false);
	 	     		    main_stage.push(obj);
	 	     		} if(this.tileGrid[i][j] == 4){
	 	     		    var obj = new level_door(i*this.TILE_SIZE, j*this.TILE_SIZE);
	 	     		    main_stage.push(obj);
					} if(this.tileGrid[i][j] == 5){
	 	     		    var obj = new floor_object(i*this.TILE_SIZE, j*this.TILE_SIZE, assets["wasd"], "move");
	 	     		    main_stage.push(obj);
					} if(this.tileGrid[i][j] == 6){
	 	     		    var obj = new floor_object(i*this.TILE_SIZE, j*this.TILE_SIZE, assets["mouse"], "attack");
	 	     		    main_stage.push(obj);
					} if(this.tileGrid[i][j] == 7){
	 	     		    var obj = new depo(i*this.TILE_SIZE, j*this.TILE_SIZE, true);
	 	     		    main_stage.push(obj);
					}
	 	     	}
		     }
			if(enemies[current_level] != undefined){
				for(var i = 0; i < enemies[current_level].length; i++){
					if(enemies[current_level][i][2] == 'a'){
						var obj = new enemy_a(enemies[current_level][i][0], enemies[current_level][i][1]);
						main_stage.push(obj);
					} else if(enemies[current_level][i][2] == 'b'){
						var obj = new enemy_b(enemies[current_level][i][0], enemies[current_level][i][1]);
						main_stage.push(obj);
					} else if(enemies[current_level][i][2] == 'c'){
						var obj = new enemy_c(enemies[current_level][i][0], enemies[current_level][i][1]);
						main_stage.push(obj);
					}
				}
			} 
			/*
			var door = new level_door(100, 100);
			main_stage.push(door);
			var flr_obj = new floor_object(300, 300, assets["wasd"]);
			main_stage.push(flr_obj);
			var flr_obj = new floor_object(375, 300, assets["mouse"]);
			main_stage.push(flr_obj);
			*/
			this.initial_generation = true;       
	    }
		 
		 
		//console.log(main_stage.check_num_enemies());
		
		if(MC.hp < 0){
			reset_game();
		}
		
	}
	
	this.refresh = function(){
		
		MC.mapX = levels[current_level][3];
 	   MC.mapY = levels[current_level][4];
 	   MC.canvasX = toCanvasX(MC.mapX);
 	   MC.canvasY = toCanvasY(MC.mapY);
		
		var new_world_width = levels[current_level][0];
		var new_world_height = levels[current_level][1];
		var new_non_ash = levels[current_level][2];
		
		this.initial_generation = false;
		main_stage.remove_obstacles();
	   this.WORLD_WIDTH = new_world_width;
	   this.WORLD_HEIGHT = new_world_height;

	   this.TILES_IN_A_ROW = Math.floor(this.WORLD_WIDTH/this.TILE_SIZE);
	   this.TILES_IN_A_COL = Math.floor(this.WORLD_HEIGHT/this.TILE_SIZE);

	   this.VIEW_WIDTH = canvas.width;
	   this.VIEW_HEIGHT = canvas.height;

	   this.VIEW_TILE_WIDTH = Math.floor(this.VIEW_WIDTH / this.TILE_SIZE);
	   this.VIEW_TILE_HEIGHT = Math.floor(this.VIEW_HEIGHT / this.TILE_SIZE);
	
	   this.left;
	   this.top;
	
	   this.tileGrid = [];
	   this.tiles = [];
		main_stage.remove_enemies();
		
	   for(var i = 0; i < this.TILES_IN_A_ROW; i++){
		   var column = new Array();
	         for(var j=0; j < this.TILES_IN_A_COL; j++){
					column[j] = 0;
	         } //INNER
	   this.tileGrid[i] = column;
	   } //OUTER
	
	    if (new_non_ash != undefined){
		    for(var i = 0; i < new_non_ash.length; i++){
			    if(new_non_ash[i].length == 3){
			    	console.log(this.tileGrid);
			    	console.log(new_non_ash[i][0] + " " + new_non_ash[i][1]);
			        this.tileGrid[new_non_ash[i][0]][new_non_ash[i][1]] = new_non_ash[i][2];
			    } else if(new_non_ash[i][3] == 'x'){
				    for(var j = new_non_ash[i][0]; j < new_non_ash[i][0] + new_non_ash[i][4]; j++){
					    this.tileGrid[j][new_non_ash[i][1]] = new_non_ash[i][2];
				    }
			    } else if(new_non_ash[i][3] == 'y'){
				    for(var j = new_non_ash[i][1]; j < new_non_ash[i][1] + new_non_ash[i][4]; j++){
					   this.tileGrid[new_non_ash[i][0]][j] = new_non_ash[i][2];
				    }
			   }
		    }
	    }
		 
		 console.log(this.tileGrid);
	}
	
	
	this.draw = function onEnterFrame(){
		
		if(panning == false){
			this.left = MC.canvasX - this.VIEW_WIDTH / 2;
			this.top = MC.canvasY - this.VIEW_HEIGHT / 2;
			this.right = MC.canvasX + this.VIEW_WIDTH / 2;
			this.bottom = MC.canvasY + this.VIEW_HEIGHT / 2;
		}
		
		MC.moveCanvasX = false;
		MC.moveCanvasY = false;
		
		if(this.left <= 0){ this.left = 0; MC.moveCanvasX = true; }
		if(this.top <= 0 && panning == false){ this.top = 0; MC.moveCanvasY = true; }
		
		if(this.bottom >= this.WORLD_HEIGHT){ this.top = this.WORLD_HEIGHT - this.VIEW_HEIGHT; MC.moveCanvasY = true;}
		if(this.right >= this.WORLD_WIDTH){ this.left = this.WORLD_WIDTH - this.VIEW_WIDTH; MC.moveCanvasX = true;}
      var leftTile = Math.floor(this.left / this.TILE_SIZE);
      var topTile = Math.floor(this.top / this.TILE_SIZE);
		
		var bottomTile = Math.floor(this.bottom / this.TILE_SIZE);
  
        var tileOffsetX = this.left % this.TILE_SIZE;
        var tileOffsetY = this.top % this.TILE_SIZE;
  
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        for(var i = 0; i < this.VIEW_TILE_WIDTH+1; i++){
  	        for(var j = 0; j < this.VIEW_TILE_HEIGHT+1; j++){
		        var tileSprite = this.TILE_SPRITES[0];
		        if(this.tileGrid.length - 1 >= leftTile+i){
			        if(this.tileGrid[leftTile+i].length - 1 >= topTile+j){
						if(this.tileGrid[leftTile+i][topTile+j] == 1){
							tileSprite = this.TILE_SPRITES[1];
			        }
		        }
		        
		        context.drawImage(tileSprite, i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
		       
				/*
				context.beginPath();
		        context.fillStyle = this.TILE_COLORS[tileColor];
		        context.fillRect(i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
				*/
				/*
				context.lineWidth = 3;
				context.strokeStyle = "#000000";
				context.strokeRect(i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
				*/
            }
        } 
      }
    }
	 
	
}