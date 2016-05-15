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
	
	this.speed = 1;
	
	this.hp = 40;
	
	this.update = function(){
		if(MC.hp > 0){
			this.moveTowards(MC);
		}
		
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		console.log("mapX: " + this.mapX + " mapY: " + this.mapY);
	}
	
	this.moveTowards = function(target){
		//always following
		if(target.mapX > this.mapX){
			this.mapX += this.speed;
		}else if(target.mapX == this.mapX){
			this.mapX = this.mapX;
		}else if(target.mapX < this.mapX){
			this.mapX -= this.speed;
		}
		
		if(target.mapY > this.mapY){
			this.mapY += this.speed;
		}else if(target.mapY == this.mapY){
			this.mapY = this.mapY;
		}else if(target.mapY < this.mapY){
			this.mapY -= this.speed;
		}
	}
	
	this.attack = function(){
		
	}
	
	this.destroy = function(){
		
	}
}