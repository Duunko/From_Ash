/**
 * @author bion719
 */

/* System for the tiles/environment of the game
 *
 */
 
function create_board(){
	
	TILE_TYPE_WATER = 0;
	TILE_TYPE_GRASS = 1;

	NUM_TILE_TYPES = 2;

	TILE_COLORS = ['#0000DD', '#00CC00'];

	TILE_SIZE = 50;
	WORLD_SIZE = 1000;
	WORLD_WIDTH = 1000;
	WORLD_HEIGHT = 700;

	TILES_IN_A_ROW = Math.floor(WORLD_WIDTH/TILE_SIZE);
	TILES_IN_A_COL = Math.floor(WORLD_HEIGHT/TILE_SIZE);

	VIEW_WIDTH = canvas.width;
	VIEW_HEIGHT = canvas.height;

	VIEW_TILE_WIDTH = Math.floor(VIEW_WIDTH / TILE_SIZE);
	VIEW_TILE_HEIGHT = Math.floor(VIEW_HEIGHT / TILE_SIZE);

	playerX = WORLD_WIDTH/2;
	playerY = WORLD_HEIGHT/2;
	//playerX = VIEW_WIDTH/2;
	//playerY = VIEW_HEIGHT/2;
	
	console.log(playerX);

	tileGrid = [];
	tiles = [];

	for(var i = 0; i < TILES_IN_A_ROW; i++){
		var column = new Array();
	  for(var j=0; j < TILES_IN_A_COL; j++){
		//column[j] = Math.floor(Math.random()*NUM_TILE_TYPES);
		if((i == 0 || j == 0) || (i == TILES_IN_A_ROW - 1 || j == TILES_IN_A_COL - 1)){
			column[j] = 0;
		}
		else{
			column[j] = 1;
		}
	  } //INNER
	  
	  tileGrid[i] = column;
	} //OUTER
}

function onEnterFrame(){
  
  var left = MC.mapX - VIEW_WIDTH / 2;
  var top = MC.mapY - VIEW_HEIGHT / 2;
  
  var leftTile = Math.floor(left / TILE_SIZE);
  var topTile = Math.floor(top / TILE_SIZE);
  
  var tileOffsetX = left % TILE_SIZE;
  var tileOffsetY = top % TILE_SIZE;
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  for(var i = 0; i < VIEW_TILE_WIDTH+1; i++){
  	for(var j = 0; j < VIEW_TILE_HEIGHT+1; j++){
		var tileColor = '#000000';
		if(tileGrid.length - 1 >= leftTile+i){
			if(tileGrid[leftTile+i].length - 1 >= topTile+i){
				var tileColor = tileGrid[leftTile+i][topTile +j];
			}
		}
		context.fillStyle = TILE_COLORS[tileColor];
		context.fillRect(i*TILE_SIZE - tileOffsetX, j*TILE_SIZE - tileOffsetY, TILE_SIZE, TILE_SIZE);
    }
  }
  
  context.fillStyle = 'white';
  context.fillRect(VIEW_WIDTH/2, VIEW_HEIGHT/2, 15, 15);
  
}