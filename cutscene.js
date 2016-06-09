//this is the function that controls the ending cutscene of the game

function start_scene(dir, targetX, targetY){
	if(cutsceneStarted == false){
		console.log("start_scene called")
		MC.locked = true;
		MC.canvasXSpeed = 0;
		MC.canvasYSpeed = 0;
		
		//tiles.left+=50;
		SHEEP = new sheep(targetX, targetY-500, "t", "down", targetX, targetY);
		main_stage.push(SHEEP);
		SHEEP = new sheep(targetX, targetY+500, "t", "up", targetX, targetY);
		main_stage.push(SHEEP);
		SHEEP = new sheep(targetX+500, targetY, "t", "left", targetX, targetY);
		main_stage.push(SHEEP);
		
		cutsceneStarted = true;
		SC.battle.stop();
		SC.theme.play();
	}
}

function sheep(x, y, variant, dir, targetX, targetY){
	//sheep are dumb pieces for the cutscene
	//the "person" variant moves towards the depo until it collides with it
	this.type = "enemy";
	
	this.is_obstacle = true;
	
	this.stopped = false;
	this.giving = false;
	
	this.image_index = 0;
	this.image_speed_max = 7;  
	this.image_speed_counter = 0;
	
	this.up_walk = new Array; this.up_walk.push(assets["mc_up_1"]); this.up_walk.push(assets["mc_up_2"]); this.up_walk.push(assets["mc_up_3"]);
	
	this.down_walk = new Array; this.down_walk.push(assets["mc_down_1"]); this.down_walk.push(assets["mc_down_2"]); this.down_walk.push(assets["mc_down_3"]);
	
	this.right_walk = new Array; this.right_walk.push(assets["mc_right_1"]); this.right_walk.push(assets["mc_right_2"]); this.right_walk.push(assets["mc_right_3"]);
	
	this.left_walk = new Array; this.left_walk.push(assets["mc_left_1"]); this.left_walk.push(assets["mc_left_2"]); this.left_walk.push(assets["mc_left_3"]);
	
	this.left_give = new Array; this.left_give.push(assets["mc_give_left_1"]); this.left_give.push(assets["mc_give_left_2"]); this.left_give.push(assets["mc_give_left_3"]);
	
	this.right_give = new Array; this.right_give.push(assets["mc_give_right_1"]); this.right_give.push(assets["mc_give_right_2"]); this.right_give.push(assets["mc_give_right_3"]);
	
	this.active_animation = this.up_walk;
	
	if(dir == "down"){
		this.active_animation = this.down_walk;
	}
	else if(dir == "left"){
		this.active_animation = this.left_walk;
	}
	else if(dir == "right"){
		this.active_animation = this.right_walk;
	}
	else if(dir == "up"){
		this.active_animation = this.up_walk;
	}
	
	this.sprite = new Image();
	this.sprite.width = MC.sprite.width;
	this.sprite.height = MC.sprite.height;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	this.mapX = x;
	this.mapY = y;
	
	this.depth = -this.mapY;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.speed = 1.5;
	
	this.update = function(){
		this.moveTowards(targetX, targetY);
		
		if(this.image_index == 2 && this.giving == true){
			this.giving = false;
			storedFP++;
			
			//create sky object
			//slider(x, y, speed, targetX, targetY, sprite_src, s_w, s_h)
			panning = true;
			
			sky_obj = new slider(0, 0-canvas.height, 1, 0, 0, assets["sky"], canvas.width, canvas.height);
			main_stage.push(sky_obj);
		}
		
		if(panning == true){
			tiles.top -= 0.3;
			MC.canvasY += 0.3;
			this.canvasY++;
		}
		
		if(this.distanceToObject(targetX, targetY) < 100 && this.stopped == false){
			this.stopped = true;
			this.active_animation = this.left_give;
			this.giving = true;
			this.image_speed_counter = 30;
		}
		
		if(this.stopped == false){
			this.mapX += this.mapXSpeed * this.speed;
			this.mapY += this.mapYSpeed * this.speed;
			
			this.canvasX = toCanvasX(this.mapX);
			this.canvasY = toCanvasY(this.mapY);
		}
	}
	
	this.draw = function(){	
		if(this.stopped == false || this.giving == true){
			draw_animated_sprite(this.active_animation, this, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		else{
			context.drawImage(this.active_animation[0], this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
	}
	
	this.moveTowards = function(targetX, targetY){
		if(!isNaN(targetX)){
			var slopeX = targetX - this.mapX;
	        var slopeY = targetY - this.mapY;
			var distance = this.distanceToObject(targetX, targetY);
			this.mapXSpeed = slopeX / distance;
			this.mapYSpeed = slopeY / distance;
				
		}
		else{
			console.log("Nan detected");
		}
	}
	
	this.distanceToObject = function(targetX, targetY, offX, offY){
	    var slopeX = targetX - this.mapX;
	    if(offX != undefined){
	    	slopeX += offX * 32;
	    }
	    var slopeY = targetY - this.mapY;
	    if(offY != undefined){
	    	slopeY += offY * 32;
	    }
	    var distance = Math.sqrt(Math.pow((targetX - this.mapX), 2)
								+ Math.pow((targetY - this.mapY), 2));
	    return distance;
    }
	
	this.collide = function(target){
		if (target.is_obstacle == true){
			console.log("collided with obstacle");
			var response = new SAT.Response();
			SAT.testPolygonPolygon(this.hitbox.col_data.toPolygon(), target.hitbox.col_data.toPolygon(), response);
			this.canvasX -= response.overlapV.x;
			this.canvasY -= response.overlapV.y
			this.mapX = toMapX(this.canvasX);
			this.mapY = toMapY(this.canvasY);
	    } 
	}
	
	this.collide_damage = function(){
		
	}
	
	this.hitbox = {
    	active:false,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX - 15, this.mapY - 15), this.sprite.width - 30, this.sprite.height - 30)
    }
}

function slider(x, y, speed, targetX, targetY, sprite_src, s_w, s_h){
	//everything is in canvas
	this.canvasX = x;
	this.canvasY = y;
	
	this.canvasXSpeed = 0;
	this.canvasYSpeed = 0;
	
	this.sprite = sprite_src;
	this.sprite.width = s_w;
	this.sprite.height = s_h;
	
	this.speed = speed;
	
	this.depth = -9999999;
	
	this.shrinking = false;
	this.shrinkNum = 200;
	this.xAmount = this.sprite.width / this.shrinkNum;
	this.yAmount = this.sprite.height / this.shrinkNum;
	
	
	this.update = function(){
		
		if((this.sprite == assets["sky"] || this.sprite == assets["earth"]) && panning2 == true){
			this.canvasY -= 1;
		}
		
		else if(ending == false){
			
			this.moveTowards(targetX, targetY);
		
			this.canvasX += this.canvasXSpeed * this.speed;
			this.canvasY += this.canvasYSpeed * this.speed;
		}
		
		if(this.shrinking == true){
			
			if(this.sprite.width > 0 || this.sprite.height > 0){
				this.canvasX += this.xAmount;
				this.canvasY += this.yAmount;
				this.sprite.width -= this.xAmount;
				this.sprite.height -= this.yAmount;
			}
			else{
				this.shrinking = false;
				//make the sun appear
				sun_obj = new grower(this.canvasX, this.canvasY, 200, assets["sun"], 1, 1, 500, 500);
				main_stage.push(sun_obj);
				main_stage.destroy(this);
			}
		}
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
	
	this.moveTowards = function(targetX, targetY){
		if(!isNaN(targetX)){
			var slopeX = targetX - this.canvasX;
	        var slopeY = targetY - this.canvasY;
			var distance = this.distanceToObject(targetX, targetY);
			if(distance < 5){
				this.canvasX = targetX;
				this.canvasY = targetY;
				this.canvasXSpeed = 0;
				this.canvasYSpeed = 0;
				
				if(this.sprite == assets["sky"] && panning == true){
					//sky has completely covered screen
					panning = false;
					player_obj = new slider(canvas.width/2 - MC.sprite.width*2, 1000, 1, canvas.width/2 - MC.sprite.width*2, canvas.height/2 - MC.sprite.height, assets["mc_upgrade_4"], MC.sprite.width*4, MC.sprite.height*2);
					main_stage.push(player_obj);
				}
				if(this.sprite == assets["mc_upgrade_4"] && this.shrinking == false){
					//the winged player has reached the center of the screen
					this.shrinking = true;
				}
			}
			else{
				if(slopeX != 0){
					this.canvasXSpeed = slopeX / distance;
				}
				if(slopeY != 0){
					this.canvasYSpeed = slopeY / distance;
				}
			}
		}
		else{
			console.log("Nan detected");
		}
	}
	
	this.distanceToObject = function(targetX, targetY, offX, offY){
	    var slopeX = targetX - this.canvasX;
	    if(offX != undefined){
	    	slopeX += offX * 32;
	    }
	    var slopeY = targetY - this.canvasY;
	    if(offY != undefined){
	    	slopeY += offY * 32;
	    }
	    var distance = Math.sqrt(Math.pow((targetX - this.canvasX), 2)
								+ Math.pow((targetY - this.canvasY), 2));
	    return distance;
    }
}


function grower(x, y, speed, sprite_src, s_w, s_h, end_x, end_y){
	//everything is in canvas
	this.canvasX = x;
	this.canvasY = y;
	
	this.sprite = sprite_src;
	this.sprite.width = s_w;
	this.sprite.height = s_h;
	
	this.depth = -9999999;
	
	this.growing = true;
	this.growNum = speed;
	this.xAmount = end_x / this.growNum;
	this.yAmount = end_y / this.growNum;
	
	this.update = function(){
		
		if(panning2 == true){
			this.canvasY -= 1;
			if(this.canvasY + this.sprite.height/2 <= 0){
				panning2 = false;
				ending = true;
			}
		}
		
		if(this.growing == true){
			
			if(this.sprite.width < end_x && this.sprite.height < end_y){
				//this.canvasX += this.xAmount;
				//this.canvasY += this.yAmount;
				this.sprite.width += this.xAmount;
				this.sprite.height += this.yAmount;
			}
			else{
				this.growing = false;
				//sun grown to full
				panning2 = true;
				sky_obj = new slider(0, 0+canvas.height, 1, 0, 0, assets["sky"], canvas.width, canvas.height);
				main_stage.push(sky_obj);
				
				earth_obj = new slider(450, 0+canvas.height*1.3, 1, 0, 0, assets["earth"], 500, 500);
				main_stage.push(earth_obj);
			}
		}
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
}
