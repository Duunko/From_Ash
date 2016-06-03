/**
 * @author Duunko
 */

function level_door(x, y){
	
	this.sprite = assets["black_square"];
	
	this.is_obstacle = false;
	
	this.sprite.width = 200;
	this.sprite.height = 200;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.hitbox = {
    	active:true,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
    }
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){	
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.hz);
	}
	
	this.collide = function(target){
		if(target == MC){
			if(keysPressed[ACTION_KEY_CODE]){
				console.log("moving to next level")
				current_level += 1;
				tiles.refresh();
			}
		}
	}
	
	this.collide_damage = function(){
		//this is called when the enemy collides with the melee
		//console.log("damage");
		//if not stunned
		
	}
	
	this.die = function(){
		
	}
}
