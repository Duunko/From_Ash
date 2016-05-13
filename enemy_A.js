/**
 * @author Bion719
 */

/* Basic character object
 * This is the object for the basic enemy type. Contains a sprite,
 * fire point value, hit point value, directional data (for bookeeping),
 * x and y coordinates, and an update and draw method. 
 * 
 * Also contains an attack() and special() method that are unimpelemented.
 * 
 */
 
function enemy_a(x, y){
	this.sprite = new Image();
	this.sprite.src = 'http://people.ucsc.edu/~djchambe/cm120/sun.png';
	this.sprite.width = 40;
	this.sprite.height = 40;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.speed = 5;
	
	this.hp = 40;
	
	this.update = function(){
		//if main character is alive
		moveTowards(MC);
	}
	
	this.draw = function(){
		
	}
	
	this.moveTowards = function(target){
		target.x;
		target.y;
	}
	
	this.attack = function(){
		
	}
	
	this.destroy = function(){
		
	}
}