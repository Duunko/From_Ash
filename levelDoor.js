/**
 * @author Duunko
 */

function level_door(x, y){
	
	this.sprite = assets["door_closed"];
	this.sprite2 = assets["door_open"];
	
	this.is_obstacle = false;
	
	this.sprite.width = 128;
	this.sprite.height = 170;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.used = false;
	this.open = false;
	this.in_range = false;
	
	this.passUI = assets["gui_door"];
	this.passUI.width = 50;
	this.passUI.height = 50;
	this.range_dist = 30;
	
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
		
		this.canvasX = toCanvasX(this.mapX);
	   this.canvasY = toCanvasY(this.mapY);
		
		if(MC.canvasX < this.canvasX - this.range_dist || MC.canvasX > this.canvasX + this.range_dist + this.sprite.width || MC.canvasY < this.canvasY - this.range_dist || MC.canvasY > this.canvasY + this.range_dist + this.sprite.height){
			this.in_range = false;
		}
	}
	
	this.draw = function(){
		if(this.open == true){
			context.drawImage(this.sprite2, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		else{
			context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.hz);
		
		if(this.in_range){
				context.drawImage(this.passUI, this.canvasX + 75, this.canvasY - 50, this.passUI.width, this.passUI.height);
		}
	}
	
	this.collide = function(target){
		if(target == MC){
			this.in_range = true;
			if(keysPressed[ACTION_KEY_CODE] && this.open == true){
				console.log("moving to next level")
				current_level += 1;
				tiles.refresh();
				this.used = true;
			}
			
		}
	}
	
	this.collide_damage = function(){
		
	}
	
	this.die = function(){
		
	}
}
