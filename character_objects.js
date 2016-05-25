/**
 * @author Duunko
 */

/* Basic character object
 * This is the object for the main character. Contains a sprite,
 * fire point value, hit point value, directional data (for bookeeping),
 * x and y coordinates, and an update and draw method. 
 * 
 * Also contains an attack() and special() method that are unimpelemented.
 * 
 */

function main_character(x, y ) {
	this.sprite = assets[0];
	this.sprite.width = 60;
	this.sprite.height = 80;
	
	this.up_walk = new Array;
	this.up_walk.push(assets["mc_up_1"]);
	this.up_walk.push(assets["mc_up_2"]);
	this.up_walk.push(assets["mc_up_3"]);
	
	this.down_walk = new Array;
	this.down_walk.push(assets["mc_down_1"]);
	this.down_walk.push(assets["mc_down_2"]);
	this.down_walk.push(assets["mc_down_3"]);
	
	this.right_walk = new Array;
	this.right_walk.push(assets["mc_right_1"]);
	this.right_walk.push(assets["mc_right_2"]);
	this.right_walk.push(assets["mc_right_3"]);
	
	this.left_walk = new Array;
	this.left_walk.push(assets["mc_left_1"]);
	this.left_walk.push(assets["mc_left_2"]);
	this.left_walk.push(assets["mc_left_3"]);
	
	this.image_index = 0;
	this.image_speed_max = 7;  
	this.image_speed_counter = 0;
	
	this.active_animation = this.up_walk;
	this.animated = false;
	
	this.fp = 30;
	this.nextFp = this.fp;
	
	this.meleeCost = 2;
	this.meleeCoolMax = 50;
	this.meleeCool = 0;
	
	this.dashCost = 4;
	this.dashCoolMax = 200;
	this.dashCool = 0;
	
	this.hpMax = 40;
	this.hp = this.hpMax;

	this.move_direc = 'south';
	this.look_direc = 'south';
	this.canvasX = canvas.width/2;
	this.canvasY = canvas.height/2;
	this.mapX = tiles.WORLD_WIDTH/2;
	this.mapY = tiles.WORLD_HEIGHT/2;
	
	this.vulnerable = true;
	this.safetyTimerMax = 30;
	this.safetyTimer = 0;
	
	//speed rounds up to the nearest multiple of the incriment
	this.speed = 6;
	this.speedInc = 0.5;
	
	this.canvasXSpeed = 0;
	this.mapXSpeed = 0;
	this.canvasYSpeed = 0;
	this.mapYSpeed = 0;
	
	this.can_melee = true;
	this.can_dash = true;
	
	this.dashing = false;
	this.dashTimer = 25;     //affects the distance
	this.dashXInc;
	this.dashYInc;
	this.dashWindD = 1.25;
	
	this.recently_checked = false;
	this.can_move_left = true;
	this.can_move_right = true;
	this.can_move_down = true;
	this.can_move_up = true;
	
	this.hitbox = {
    	active:true,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
    }
	
	this.attack_hitbox = false;

	
	this.update = function(){
		
		//animation handlers
		if(this.look_direc == 'west' && this.active_animation != this.left_walk){
			this.active_animation = this.left_walk;
		}
		if(this.look_direc == 'south' && this.active_animation != this.down_walk){
			this.active_animation = this.down_walk;
		}
		if(this.look_direc == 'north' && this.active_animation != this.up_walk){
			this.active_animation = this.up_walk;
		}
		if(this.look_direc == 'east' && this.active_animation != this.right_walk){
			this.active_animation = this.right_walk;
		}
		
		if(this.canvasXSpeed == 0 && this.canvasYSpeed == 0){
			this.animated = false;
			this.image_index = 0;
		}
		else{
			this.animated = true;
		}
		
		if(this.recently_checked == true){
			this.recently_checked = false;
		} else {
			this.can_move_down = true;
			this.can_move_up = true;
			this.can_move_left = true;
			this.can_move_right = true;
		}
	   
	    if(this.dashing == false){
			//reset the dashing values
			this.dashXInc = 0;
			this.dashYInc = 0;
		   
			if (keysPressed[RIGHT_KEY_CODE] == true) {
				if(this.can_move_right == true){
				    if(this.canvasX + this.sprite.width <= canvas.width){
					    //this.canvasX += this.speed;
					    if(this.canvasXSpeed < this.speed){ this.canvasXSpeed += this.speedInc }
				    }
				} else {
					this.canvasXSpeed = 0;
				}
			}
		   
			else {
			   if(this.canvasXSpeed > 0){ 
			   	   if(this.can_move_right == true){
			           this.canvasXSpeed -= this.speedInc 
			       } else {
			       	   this.canvasXSpeed = 0;
			       }
			   }
			}
		   
			if (keysPressed[LEFT_KEY_CODE] == true) {
				if(this.can_move_left == true){
				    if(this.canvasX > 0){
					    //this.canvasX -= this.speed;
					    if(this.canvasXSpeed > -this.speed){ this.canvasXSpeed -= this.speedInc;}
				    }
				} else {
					this.canvasXSpeed = 0;
				}
			}
		   
			else {
			   if(this.canvasXSpeed < 0){ 
			   	   if(this.can_move_left == true){
			   	       this.canvasXSpeed += this.speedInc;
			   	   } else {
			   	   	   this.canvasXSpeed = 0;
			   	   }
			   	}
			}
		   
			if (keysPressed[DOWN_KEY_CODE] == true) {
				if (this.can_move_down == true){
				    if(this.canvasY + this.sprite.height < canvas.height){
					    //this.canvasY += this.speed;
					    if(this.canvasYSpeed < this.speed){ this.canvasYSpeed += this.speedInc }
				    }
				} else {
					this.canvasYSpeed = 0;
				}
			}
			else{
				if(this.canvasYSpeed > 0){ 
					if (this.can_move_down == true){
					    this.canvasYSpeed -= this.speedInc 
					} else {
						this.canvasYSpeed = 0;
					}
			   }
			}
			
			if (keysPressed[UP_KEY_CODE] == true) {
				if (this.can_move_up == true){
				    if(this.canvasY > 0){
					    //this.canvasY -= this.speed;
					    if(this.canvasYSpeed > -this.speed){ this.canvasYSpeed -= this.speedInc }
				    }
				} else {
					this.canvasYSpeed = 0;
				}
			}
			else{
				if(this.canvasYSpeed  < 0){ 
					if (this.can_move_up == true){
					    this.canvasYSpeed += this.speedInc;
					} else {
						this.canvasYSpeed = 0;
					}
			    }
			}
	    }

	    else{
			//spawn fireball effect
			var f = new fireParticle(this.canvasX- this.sprite.width / 2, this.canvasY - this.sprite.height / 2, this.sprite.height, 10);
			main_stage.push(f);
			
			//wind-down proportionally for dash
			//assuming xSpeed is larger
			if(this.canvasXSpeed > 0){ this.canvasXSpeed -= this.dashXInc }
			if(this.canvasXSpeed < 0){ this.canvasXSpeed += this.dashXInc }
			
			if(this.canvasYSpeed > 0){ this.canvasYSpeed -= this.dashYInc }
			if(this.canvasYSpeed < 0){ this.canvasYSpeed += this.dashYInc }
	    }
	
	   
	    //if within bounds add directional changes
	    if(this.canvasX > 0 && this.canvasXSpeed < 0){
			this.canvasX += this.canvasXSpeed;
		}
		if(this.canvasX + this.sprite.width < canvas.width && this.canvasXSpeed > 0){
			this.canvasX += this.canvasXSpeed;
		}
		
		if(this.canvasY > 0 && this.canvasYSpeed < 0){
			this.canvasY += this.canvasYSpeed;
		}
		if(this.canvasY + this.sprite.height < canvas.height && this.canvasYSpeed > 0){
			this.canvasY += this.canvasYSpeed;
		}
		
		//failsafe for speed wind-down
		if(this.canvasXSpeed >= 0 && (this.canvasXSpeed < this.speedInc || this.canvasXSpeed < this.dashXInc)){
			this.canvasXSpeed = 0;
		}

		if(this.canvasYSpeed >= 0 && (this.canvasYSpeed < this.speedInc || this.canvasYSpeed < this.dashYInc)){
			this.canvasYSpeed = 0;
		}
		
		//re-enable dash
		if(this.dashing == true && (this.canvasXSpeed == 0 && this.canvasYSpeed == 0)){
			this.dashing = false;
		}
		
		this.mapX = toMapX(this.canvasX);
	    this.mapY = toMapY(this.canvasY);
		
		this.hitbox.col_data.pos.x = this.mapX;
		this.hitbox.col_data.pos.y = this.mapY;
		
		if(this.attack_hitbox != false){
			if (this.attack_hitbox.currframe < this.attack_hitbox.numFrames + 2){
				this.attack_hitbox.currframe++;
				this.attack_hitbox.xy1 = findc1(this.attack_hitbox);
			
		    if (this.attack_hitbox.currframe < this.attack_hitbox.numFrames + 1){
		        	this.attack_hitbox.xy2 = findc2(this.attack_hitbox);
		    }
		    var dat = new SAT.Vector(MC.canvasX + (MC.sprite.width / 2), MC.canvasY + (MC.sprite.height / 2));
		    this.attack_hitbox.col_data = new SAT.Polygon(new SAT.Vector(), [
		    this.attack_hitbox.xy1, this.attack_hitbox.xy2, 
		    dat]); 
		    }else {
			    MC.can_melee = true;
			    this.attack_hitbox = false;
			}
		}
		
		//-----------------------TIMERS-------------------------------------------------------------------------
		if(this.safetyTimer > 0){
			this.safetyTimer--;
		}
		else{
			this.vulnerable = true;
		}
		
		if(this.dashCool > 0){
			this.dashCool--;
		}
		
		if(this.meleeCool > 0){
			this.meleeCool--;
		}
		
	}//Update
	
    this.draw = function() {
    	//context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		if(this.animated == true){
			draw_animated_sprite(this.active_animation, this, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		else{
			context.drawImage(this.active_animation[this.image_index], this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		
		//drawing imaginary line from corners to mouse coordinates
		var mADTR = angleDeg(topRight.x,topRight.y,mouseX,mouseY);
		var mADTL = angleDeg(topLeft.x,topLeft.y,mouseX,mouseY);
		var mADBL = angleDeg(bottomLeft.x,bottomLeft.y,mouseX,mouseY);
		var mADBR = angleDeg(bottomRight.x,bottomRight.y,mouseX,mouseY);
		//drawing imaginary line from corners to character
		var cADTR = angleDeg(topRight.x,topRight.y,this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		var cADTL = angleDeg(topLeft.x,topLeft.y,this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		var cADBL = angleDeg(bottomLeft.x,bottomLeft.y,this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		var cADBR = angleDeg(bottomRight.x,bottomRight.y,this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		
		
		if(mADTL <= cADTL && mADTR > cADTR ){
			this.look_direc = 'north';
		} else if(mADTR < cADTR && mADBR > cADBR){
			this.look_direc = 'east';
		} else if(mADBR < cADBR && mADBL > cADBL){
			this.look_direc = 'south';
		} else {
			this.look_direc = 'west';
		}
		
		if (this.attack_hitbox != false){
			var posx = this.mapX + (this.sprite.width / 2);
			var posy = this.mapY + (this.sprite.height / 2);
		    context.fillStyle = '#CF0D42';
		    context.beginPath()
		    context.moveTo(this.attack_hitbox.col_data.points[2].x, this.attack_hitbox.col_data.points[2].y);
		    context.lineTo(this.attack_hitbox.col_data.points[0].x, this.attack_hitbox.col_data.points[0].y);
		    context.lineTo(this.attack_hitbox.col_data.points[1].x, this.attack_hitbox.col_data.points[1].y);
		    context.lineTo(this.attack_hitbox.col_data.points[2].x, this.attack_hitbox.col_data.points[2].y);
		    context.closePath();
		    context.fill();
			
			var f = new fireParticle(this.attack_hitbox.col_data.points[1].x - 7, this.attack_hitbox.col_data.points[1].y - 7, 15, 15);
			main_stage.push(f);
		}
		
		context.fillStyle = 'white';
		
		//fire point display
		context.font = '25px Verdana'; //font and size
		if(this.can_melee == false || this.dashing == true){
			context.fillStyle = '#CF0D42';
		}
		context.fillText("Fire Points: "+this.fp, 10, 50);
		
		context.fillStyle = 'white';
		context.fillText("Next Fire Points: "+Math.floor(this.nextFp), 10, 75);
		
		//hit point display
		if(this.safetyTimer > 0){
			context.fillStyle = '#CF0D42';
		} else {
			context.fillStyle = 'white';
		} 
		context.fillText("Hit Points: "+this.hp, 10, 100);
		
    }
    
    this.attack = function(){
		if((this.can_melee == true && this.meleeCool == 0) && this.fp >= this.meleeCost){

			var opt1 = this.look_direc;
			var direction = 180;
		    if (opt1 == 'west') {
			    direction = 90;
		    } else if (opt1 == 'south'){
			    direction = 0;
		    } else if (opt1 == 'east'){
			    direction = 270;
		    } 
			this.attack_hitbox = {
				active:true,
				shape:'arc',
				currframe:0,
				col_data:0,
				numFrames:10,
				radius:100,
				self:this,
				direc:direction,
				xy1:0,
				xy2:0
			}
		    
			this.can_melee = false;
			
			this.fp -= this.meleeCost;
			this.meleeCool = this.meleeCoolMax;
		}
    }
    
	this.dash = function(){
		if((this.dashing == false && this.dashCool == 0) && this.fp >= this.dashCost){
			//move towards
			//mouseX and mouseY
			var slopeX = mouseX - this.canvasX;
			var slopeY = mouseY - this.canvasY;
			var distance = Math.sqrt(Math.pow((mouseX - this.canvasX), 2)
								 + Math.pow((mouseY - this.canvasY), 2));
			
			this.dashXInc = slopeX / distance;
			this.dashYInc = slopeY / distance;
			
			this.canvasXSpeed = (this.dashXInc) * this.dashTimer;
			this.canvasYSpeed = (this.dashYInc) * this.dashTimer;
			
			this.dashXInc = Math.abs(this.dashXInc) * this.dashWindD;
			this.dashYInc = Math.abs(this.dashYInc) * this.dashWindD;
			
			this.dashing = true;
			
			this.fp -= this.dashCost;
			this.dashCool = this.dashCoolMax;
		}
	}
	
	this.on_hit = function(dmg){
		if(this.vulnerable == true){
			if(this.hp > 0){
				this.hp -= dmg;
				
				this.safetyTimer = this.safetyTimerMax;
				this.vulnerable = false;
			}
			else{
				this.die();
			}
		}
	}
	
	this.die = function(){
		//reset the game
		reset_game();
	}
	
    this.special = function(param){
    	
    }
    
    this.collide = function(target){
		if(this.dashing == false){
			if (target.is_obstacle != undefined){
				if(this.recently_checked == false){
				var response = new SAT.Response();
				SAT.testPolygonPolygon(this.hitbox.col_data.toPolygon(), target.hitbox.col_data.toPolygon(), response);
				
				this.mapX -= response.overlapV.x;
				this.mapY -= response.overlapV.y;
				 
				
				if(response.overlapV.x > 0){
					this.recently_checked = true;
					this.can_move_right = false;
				} else if(response.overlapV.x < 0){
					this.recently_checked = true;
					this.can_move_left = false;
				}
				if (response.overlapV.y > 0){
					this.recently_checked = true;
					this.can_move_down = false;
				} else if(response.overlapV.y < 0){
					this.recently_checked = true;
					this.can_move_up = false;
				}
				}
				
				this.canvasX = toCanvasX(this.mapX);
				this.canvasY = toCanvasY(this.mapY);
				
			
			} else {
			    MC.on_hit(5);
			}
		}
		else{
			
		}
    }
}
    
    function findc1 (obj) {
		var cx = MC.canvasX + (MC.sprite.width / 2);
		var cy = MC.canvasY + (MC.sprite.height / 2);
		if (obj.currframe < 3) {
			var newval = new SAT.Vector(Math.round(cx +(obj.radius * (Math.cos(degrees(45 + obj.direc))))),
				    Math.round(cy + (obj.radius * (Math.sin(degrees(45 + obj.direc))))));
		    //newval.x -= MC.mapX;
		    //newval.y -= MC.mapY;
			return newval;
		} else {
			var angle = (obj.currframe - 2) * (90 / obj.numFrames);
			var newval = new SAT.Vector(Math.round(cx + (obj.radius * (Math.cos(degrees(45 + obj.direc + angle))))),
				    Math.round(cy + (obj.radius * (Math.sin(degrees(45 + obj.direc + angle))))));
		   // newval.x -= MC.mapX;
		    //newval.y -= MC.mapY;
		    return newval;
		}
	}
	function findc2 (obj) {
		var cx = MC.canvasX + (MC.sprite.width / 2);
		var cy = MC.canvasY + (MC.sprite.height / 2);
		var angle = (obj.currframe) * (90 / obj.numFrames);
		var newval = new SAT.Vector(Math.round(cx + (obj.radius * (Math.cos(degrees(45 + obj.direc + angle))))),
				    Math.round(cy + (obj.radius * (Math.sin(degrees(45 + obj.direc + angle))))));
		//newval.x -= MC.mapX;
		//newval.y -= MC.mapY;
		return newval;
	}

function degrees(number){
	return number * Math.PI / 180;
}