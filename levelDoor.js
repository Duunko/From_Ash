/**
 * @author Duunko
 */

function level_door(x, y){
	
	this.sprite = assets["door_closed"];
	this.sprite2 = assets["door_open"];
	
	this.is_obstacle = false;
	
	this.sprite.width = 75;
	this.sprite.height = 75;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.used = false;
	this.open = false;
	
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
		
		if(main_stage.check_num_enemies() == 0){
			this.open = true;
		}
		else{
			this.open = false;
		}
	}
	
	this.draw = function(){
		if(this.open == true){
			context.drawImage(this.sprite2, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		else{
			context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.hz);
	}
	
	this.collide = function(target){
		if(target == MC){
			if(keysPressed[ACTION_KEY_CODE] && this.open == true){
				console.log("moving to next level")
				current_level += 1;
				tiles.refresh();
				this.used = true;
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
