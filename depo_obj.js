/**
 * @author Duunko
 */

function depo(x, y, big){

	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	if(big == false){
		this.sprite = assets["enviro_tree_1"]; 
		this.sprite.width = 208;
		this.sprite.height = 208;
		this.depth = -(y + 100);
		
		this.flaming = new Array; this.flaming.push(assets["enviro_tree_2"]); this.flaming.push(assets["enviro_tree_3"]); this.flaming.push(assets["enviro_tree_4"]); //this.flaming.push(assets["enviro_tree_3"]);
	}
	else{
		this.sprite = assets["end_tree_1"]; 
		this.sprite.width = 242;
		this.sprite.height = 391;
		this.depth = -(y + 150);
		
		this.flaming = new Array; this.flaming.push(assets["end_tree_2"]); this.flaming.push(assets["end_tree_3"]); this.flaming.push(assets["end_tree_4"]); //this.flaming.push(assets["end_tree_3"]);
		
		storedFP = 0;
	}
	
	this.passUI = assets["gui_e"];
	this.inheritUI = assets["gui_r"];
	this.passUI.width = 150;
	this.passUI.height = 50;
	this.inheritUI.width = 150;
	this.inheritUI.height = 50;
	
	this.image_index = 0;
	this.image_speed_max = 13;  
	this.image_speed_counter = 0;

	this.is_obstacle = true;
	
	this.in_range = false;
	this.depo_ready_e = true;
	this.depo_ready_e_max = 15;
	this.depo_ready_e_timer = this.depo_ready_e_max;
	this.depo_ready_r = true;
	this.depo_ready_r_max = 15;
	this.depo_ready_r_timer = this.depo_ready_r_max;
	
	this.range_dist = 30;
	
	this.update = function(){
		if(this.in_range == true){
			if(keysPressed[ACTION_KEY_CODE] == true){
				if(this.depo_ready_e == true){
					if(big == false && MC.nextFp > 0){
						MC.nextFp -= 1;
						storedFPNext += 1;
						this.depo_ready_e = false;
					}
					else if(big == true){
						//begin the cutscene
						if(MC.canvasX < this.canvasX){
							start_scene("left", this.mapX + this.sprite.width/2 - 50, this.mapY+this.sprite.height - 100);
						}
						else{
							start_scene("right", this.mapX + this.sprite.width/2 - 50, this.mapY+this.sprite.height - 100);
						}
					}
				}
			}
			else{
				this.depo_ready_e = true;
			}
			
			if(keysPressed[RETRIEVE_KEY_CODE] == true){
				if(this.depo_ready_r == true && storedFPNow > 0){
					storedFPNow -= 1;
					MC.fp += 1;
					this.depo_ready_r = false;
				}
			}
			else{
				this.depo_ready_r = true;
			}
		}
		if(panning == true){
			this.mapX = toMapX(this.canvasX);
			this.mapY = toMapY(this.canvasY);
		}
		this.canvasX = toCanvasX(this.mapX);
	   this.canvasY = toCanvasY(this.mapY);
		
		
		if(MC.canvasX < this.canvasX - this.range_dist || MC.canvasX > this.canvasX + this.range_dist + this.sprite.width || MC.canvasY < this.canvasY - this.range_dist || MC.canvasY > this.canvasY + this.range_dist + this.sprite.height){
			this.in_range = false;
		}
		
		if(panning == true && big == true){
			this.canvasY+=1;
		}
		
		if(this.depo_ready_e == false){
			if(this.depo_ready_e_timer > 0){
				this.depo_ready_e_timer--;
			}
			else{
				this.depo_ready_e_timer = this.depo_ready_e_max;
				this.depo_ready_e = true;
			}
		}
		if(this.depo_ready_r == false){
			if(this.depo_ready_r_timer > 0){
				this.depo_ready_r_timer--;
			}
			else{
				this.depo_ready_r_timer = this.depo_ready_r_max;
				this.depo_ready_r = true;
			}
		}
	}
	
	this.draw = function(){
		if(storedFPNow + storedFPNext > 0){
			draw_animated_sprite(this.flaming, this, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
			if(this.in_range){
				context.drawImage(this.inheritUI, this.canvasX + 150, this.canvasY - 25, this.passUI.width, this.passUI.height);
				context.fillText(storedFPNow + storedFPNext, this.canvasX + 100, this.canvasY - 33);
			}
		}
		else{
			context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		if(this.in_range){
			context.drawImage(this.passUI, this.canvasX - 50, this.canvasY - 25, this.passUI.width, this.passUI.height);
		}
		
		//context.fillStyle = '#CF0D42';
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.h);
		
	}
	
	this.hitbox = {
		active:true,
    	shape:'rectangle',
    	offsetX:32,
    	offsetY:32,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX + 10, this.mapY + 100), this.sprite.width - 20, this.sprite.height - 130)
	}
	
	this.collide = function(target){
		if(target == MC){
			this.in_range = true;
		}
	}
	
	this.collide_damage = function(target){
		
	}
	
}
