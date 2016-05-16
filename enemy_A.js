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
	
	this.self = this;
	
	
	this.hp = 40;
	
	this.update = function(){
		if(MC.hp > 0){
			this.moveTowards(MC);
		}
		
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
		
	    this.hitbox.col_data.pos.x = this.mapX;
		this.hitbox.col_data.pos.y = this.mapY;
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
<<<<<<< HEAD
		//console.log("mapX: " + this.mapX + " mapY: " + this.mapY);
		
=======
		console.log("mapX: " + this.mapX + " mapY: " + this.mapY);
>>>>>>> origin/master
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
	
	this.collide = function(){
		console.log("collide");
	}
	
	this.collide_damage = function(){
		console.log("damage");
	}
	
	this.hitbox = {
    	active:true,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
    }
}