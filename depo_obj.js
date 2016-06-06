/**
 * @author Duunko
 */

function depo(x, y){

	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.sprite = assets["enviro_tree_1"]; 
	this.sprite.width = 128;
	this.sprite.height = 128;
	this.depth = -(y + 56);
    
	this.flaming = new Array; this.flaming.push(assets["enviro_tree_2"]); this.flaming.push(assets["enviro_tree_3"]);
	
	this.passUI = assets["gui_e"];
	this.inheritUI = assets["gui_r"];
	this.passUI.width = 150;
	this.passUI.height = 50;
	this.inheritUI.width = 150;
	this.inheritUI.height = 50;
	
	this.image_index = 0;
	this.image_speed_max = 7;  
	this.image_speed_counter = 0;

	this.is_obstacle = true;
	
	this.in_range = false;
	this.depo_ready_e = true;
	this.depo_ready_r = true;
	
	this.range_dist = 30;
	
	this.update = function(){
		if(this.in_range == true){
			if(keysPressed[ACTION_KEY_CODE] == true){
				if(this.depo_ready_e == true){
					MC.nextFp -= 1;
					storedFP += 1;
					this.depo_ready_e = false;
				}
			}
			else{
				this.depo_ready_e = true;
			}
			
			if(keysPressed[RETRIEVE_KEY_CODE] == true){
				if(this.depo_ready_r == true){
					storedFP -= 1;
					MC.fp += 1;
					this.depo_ready_r = false;
				}
			}
			else{
				this.depo_ready_r = true;
			}
		}
		
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
		
		if(MC.canvasX < this.canvasX - this.range_dist || MC.canvasX > this.canvasX + this.range_dist + this.sprite.width || MC.canvasY < this.canvasY - this.range_dist || MC.canvasY > this.canvasY + this.range_dist + this.sprite.height){
			this.in_range = false;
		}
	}
	
	this.draw = function(){
		if(storedFP > 0){
			draw_animated_sprite(this.flaming, this, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
			if(this.in_range){
				context.drawImage(this.inheritUI, this.canvasX + 100, this.canvasY - 50, this.passUI.width, this.passUI.height);
				context.fillText(storedFP, this.canvasX + 50, this.canvasY - 50);
			}
		}
		else{
			context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		if(this.in_range){
			context.drawImage(this.passUI, this.canvasX - 100, this.canvasY - 50, this.passUI.width, this.passUI.height);
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
    	col_data: new SAT.Box(new SAT.Vector(this.mapX /*+ 10*/, this.mapY /*+ 56*/), this.sprite.width /*- 40*/, this.sprite.height /*- 56*/)
	}
	
	this.collide = function(target){
		if(target == MC){
			this.in_range = true;
		}
	}
	
	this.collide_damage = function(target){
		
	}
	
}
