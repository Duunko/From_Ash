/**
 * @author Duunko
 */

function depo(x, y){
	this.depth = y;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.empty = assets["enviro_tree_1"]; 
    
	this.sprite = new Array; this.sprite.push(assets["enviro_tree_2"]); this.sprite.push(assets["enviro_tree_3"]);
	
	this.image_index = 0;
	this.image_speed_max = 7;  
	this.image_speed_counter = 0;
	
	this.width = 128;
	this.height = 128;

	this.is_obstacle = true;
	
	this.in_range = false;
	this.depo_ready = true;
	
	this.update = function(){
		if(this.in_range == true){
			if(keysPressed[ACTION_KEY_CODE] == true){
				console.log("depo log")
				if(this.depo_ready == true){
					MC.nextFp -= 1;
					storedFP += 1;
					console.log("deposited points");
					this.depo_ready = false;
				}
			}
			else{
				this.depo_ready = true;
			}
		}
		
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
		
		this.in_range = false;
	}
	
	this.draw = function(){
		if(storedFP > 0){
			draw_animated_sprite(this.sprite, this, this.canvasX, this.canvasY, this.width, this.height);
		}
		else{
			context.drawImage(this.empty, this.canvasX, this.canvasY, this.width, this.height);
		}
		
		//context.fillStyle = '#CF0D42';
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.sprite.width, this.sprite.height);
		
	}
	
	this.hitbox = {
		active:true,
    	shape:'rectangle',
    	offsetX:32,
    	offsetY:32,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX + 20, this.mapY + 56), this.sprite.width - 40, this.sprite.height - 56)
	}
	
	this.collide = function(target){
		console.log("collided with MC");
		if(target == MC){
			this.in_range = true;
			console.log("collided with MC");
		}
	}
	
	this.collide_damage = function(target){
		
	}
	
}
