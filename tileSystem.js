/**
 * @author bion719
 */

/* System for the tiles/environment of the game
 *
 */
 
function create_board(world_width, world_height, tile_size){
	
	this.depth = 100000;
	this.TILE_TYPE_WATER = 0;
	this.TILE_TYPE_GRASS = 1;

	this.NUM_TILE_TYPES = 2;

	this.TILE_COLORS = ['#0000DD', '#00CC00'];

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
		if((i == 0 || j == 0) || (i == this.TILES_IN_A_ROW - 1 || j == this.TILES_IN_A_COL - 1)){
			column[j] = 0;
		}
		else{
			column[j] = 1;
		}
	  } //INNER
	  
	  this.tileGrid[i] = column;
	} //OUTER
	
	this.update = function(){
		
	}
	
	this.draw = function onEnterFrame(){
  
        this.left = MC.mapX - this.VIEW_WIDTH / 2;
        this.top = MC.mapY - this.VIEW_HEIGHT / 2;
		this.right = MC.mapX + this.VIEW_WIDTH / 2;
		this.bottom = MC.mapY + this.VIEW_HEIGHT / 2;
		
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
		        var tileColor = '#000000';
		        if(this.tileGrid.length - 1 >= leftTile+i){
			        if(this.tileGrid[leftTile+i].length - 1 >= topTile+j){
				        var tileColor = this.tileGrid[leftTile+i][topTile +j];
			        }
		        }
				context.beginPath();
		        context.fillStyle = this.TILE_COLORS[tileColor];
		        context.fillRect(i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
				context.lineWidth = 3;
				context.strokeStyle = "#000000";
				context.strokeRect(i*this.TILE_SIZE - tileOffsetX, j*this.TILE_SIZE - tileOffsetY, this.TILE_SIZE, this.TILE_SIZE);
            }
        }
  
        context.fillStyle = 'white';
        context.fillRect(this.VIEW_WIDTH/2, this.VIEW_HEIGHT/2, 15, 15);
  
    }
	
}

