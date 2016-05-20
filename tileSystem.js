/**
 * @author bion719
 */

/* System for the tiles/environment of the game
 *
 */
 
function create_board(world_width, world_height, tile_size, non_ash){
	
	var initial_generation = false;
	this.depth = 100000;
	this.TILE_TYPE_ASH = 0;
	this.TILE_TYPE_VOID = 1;
	this.TILE_TYPE_OBS = 2;

	this.NUM_TILE_TYPES = 3;
	
	sprite_ash = new Image();
	sprite_ash.src = 'http://people.ucsc.edu/~djchambe/cm120/ash_tile.png';
	sprite_darkness = new Image();
	sprite_darkness.src = 'https://c1.staticflickr.com/5/4034/4544827697_6f73866999_b.jpg';
	sprite_darkness.width = 64;
	sprite_darkness.height = 64;
	
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

	this.playerX = this.WORLD_WIDTH/2;
	this.playerY = this.WORLD_HEIGHT/2;
	//playerX = VIEW_WIDTH/2;
	//playerY = VIEW_HEIGHT/2;
	
	this.left;
	this.top;
	
	console.log(this.playerX);

	this.tileGrid = [];
	this.tiles = [];

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
			this.tileGrid[non_ash[i][0]][non_ash[i][1]] = non_ash[i][2];
		}
	}
	
	this.update = function(){
		
	}
	
	this.draw = function onEnterFrame(){
  
        this.left = MC.canvasX - this.VIEW_WIDTH / 2;
        this.top = MC.canvasY - this.VIEW_HEIGHT / 2;
		this.right = MC.canvasX + this.VIEW_WIDTH / 2;
		this.bottom = MC.canvasY + this.VIEW_HEIGHT / 2;
		
		if(this.left <= 0){ this.left = 0 }
		if(this.top <= 0){ this.top = 0 }
		
		if(this.bottom >= this.WORLD_HEIGHT){ this.top = this.WORLD_HEIGHT - this.VIEW_HEIGHT}
		if(this.right >= this.WORLD_WIDTH){ this.left = this.WORLD_WIDTH - this.VIEW_WIDTH}
  
        var leftTile = Math.floor(this.left / this.TILE_SIZE);
        var topTile = Math.floor(this.top / this.TILE_SIZE);
		
		var bottomTile = Math.floor(this.bottom / this.TILE_SIZE);
  
        var tileOffsetX = this.left % this.TILE_SIZE;
        var tileOffsetY = this.top % this.TILE_SIZE;
  
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        for(var i = 0; i < this.VIEW_TILE_WIDTH+1; i++){
  	        for(var j = 0; j < this.VIEW_TILE_HEIGHT+1; j++){
		        var tileSprite = this.TILE_SPRITES[0];
		        var drawObs = false;
		        if(this.tileGrid.length - 1 >= leftTile+i){
			        if(this.tileGrid[leftTile+i].length - 1 >= topTile+j){
						if(this.tileGrid[leftTile+i][topTile+j] == 1){
							tileSprite = this.TILE_SPRITES[1];
						} else if(this.tileGrid[leftTile+i][topTile+j] == 2){
							drawObs = true;
						}
						
			        }
		        }
		        
		        context.drawImage(tileSprite, i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
		        if(initial_generation == false){
		            if (drawObs == true){
		        	    var newObs = new obstacle(i*this.TILE_SIZE, j*this.TILE_SIZE, "test");
		        	    main_stage.push(newObs);
		            }
		        }
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
        
        initial_generation = true;
    }
	
}

