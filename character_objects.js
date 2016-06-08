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

function main_character(x, y) {
	this.sprite = new Image();
	this.sprite.width = 128;
	this.sprite.height = 175;
	
	this.up_walk = new Array; this.up_walk.push(assets["mc_up_1"]); this.up_walk.push(assets["mc_up_2"]); this.up_walk.push(assets["mc_up_3"]);
	
	this.down_walk = new Array; this.down_walk.push(assets["mc_down_1"]); this.down_walk.push(assets["mc_down_2"]); this.down_walk.push(assets["mc_down_3"]);
	
	this.right_walk = new Array; this.right_walk.push(assets["mc_right_1"]); this.right_walk.push(assets["mc_right_2"]); this.right_walk.push(assets["mc_right_3"]);
	
	this.left_walk = new Array; this.left_walk.push(assets["mc_left_1"]); this.left_walk.push(assets["mc_left_2"]); this.left_walk.push(assets["mc_left_3"]);
	
	this.up_melee = new Array; this.up_melee.push(assets["mc_melee_up_1"]); this.up_melee.push(assets["mc_melee_up_2"]); this.up_melee.push(assets["mc_melee_up_3"]); this.up_melee.push(assets["mc_melee_up_4"]);
	
	this.down_melee = new Array; this.down_melee.push(assets["mc_melee_down_1"]); this.down_melee.push(assets["mc_melee_down_2"]); this.down_melee.push(assets["mc_melee_down_3"]); this.down_melee.push(assets["mc_melee_down_4"]);

	this.right_melee = new Array; this.right_melee.push(assets["mc_melee_right_1"]); this.right_melee.push(assets["mc_melee_right_2"]); this.right_melee.push(assets["mc_melee_right_3"]); this.right_melee.push(assets["mc_melee_right_4"]);

	this.left_melee = new Array; this.left_melee.push(assets["mc_melee_left_1"]); this.left_melee.push(assets["mc_melee_left_2"]); this.left_melee.push(assets["mc_melee_left_3"]); this.left_melee.push(assets["mc_melee_left_4"]);
	
	this.death = new Array; /*this.death.push(assets["mc_death_1"]);*/ this.death.push(assets["mc_death_2"]); this.death.push(assets["mc_death_3"]); this.death.push(assets["mc_death_4"]); this.death.push(assets["mc_death_5"]); this.death.push(assets["mc_death_6"]); this.death.push(assets["mc_death_7"]); this.death.push(assets["mc_death_8"]);

	this.upgrade = new Array; this.upgrade.push(assets["mc_upgrade_1"]); this.upgrade.push(assets["mc_upgrade_2"]); this.upgrade.push(assets["mc_upgrade_3"]); this.upgrade.push(assets["mc_upgrade_4"]); this.upgrade.push(assets["mc_upgrade_5"]); this.upgrade.push(assets["mc_upgrade_6"]);
		this.upgrade.push(assets["mc_upgrade_7"]); this.upgrade.push(assets["mc_upgrade_8"]); this.upgrade.push(assets["mc_upgrade_9"]); this.upgrade.push(assets["mc_upgrade_10"]);
	
	this.right_dash = new Array; this.right_dash.push(assets["mc_dash_right"], assets["mc_dash_right"]); this.right_dash.push(assets["mc_right_1"]);
	this.left_dash = new Array; this.left_dash.push(assets["mc_dash_left"], assets["mc_dash_left"]); this.left_dash.push(assets["mc_left_1"]);
	this.up_dash = new Array; this.up_dash.push(assets["mc_dash_up"], assets["mc_dash_up"]); this.up_dash.push(assets["mc_up_1"]);
	this.down_dash = new Array; this.down_dash.push(assets["mc_dash_down"], assets["mc_dash_down"]); this.down_dash.push(assets["mc_down_1"]);
	
	this.image_index = 0;
	this.image_speed_max = 7;  
	this.image_speed_counter = 0;
	
	this.active_animation = this.up_walk;
	this.animating = false;              //whether a high priority animation is active (not walking)
	this.walking = true;
	
	this.fp = 30;
	this.nextFp = 30;
	
	this.meleeCost = 2;
	this.meleeCoolMax = 30;
	this.meleeCool = 0;
	
	this.dashCost = 4;
	this.dashCoolMax = 150;
	this.dashCool = 0;
	
	this.beamCost = 8;
	this.beamCoolMax = 200;
	this.beamCool = 0;
	
	this.hpMax = 40;
	this.hp = this.hpMax;

	this.move_direc = 'south';
	this.look_direc = 'south';
	this.canvasX = canvas.width/2;
	this.canvasY = canvas.height/2;
	this.mapX;
	this.mapY;
	this.depth;
	
	this.moveCanvasX = false;
	this.moveCanvasY = false;
	
	this.vulnerable = true;
	this.safetyTimerMax = 30;
	this.safetyTimer = 0;
	
	//speed rounds up to the nearest multiple of the incriment
	this.speed = 12.1;
	this.speedInc = 1;
	
	this.canvasXSpeed = 0;
	this.mapXSpeed = 0;
	this.canvasYSpeed = 0;
	this.mapYSpeed = 0;
	
	this.can_melee = true;
	this.can_dash = true;
	this.can_beam = true;
	
	this.dashing = false;
	this.dashTimer = 45;     //affects the distance
	this.dashXInc;
	this.dashYInc;
	this.dashWindD = 2.5;
	
	this.particleStartX = 0;
	this.particleStartY = 0;
	this.particleTargetX = 0;
	this.particleTargetY = 0;
	
	this.beaming = false;
	this.aiming = false;
	this.beamLength = 500;
	this.beamGerth = 10;
	this.beamDuration = 50;
	this.beamTimer = this.beamDuration;
	
    this.xfunc;
	this.yfunc;
	
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
    	col_data: new SAT.Box(new SAT.Vector(this.mapX + 24, this.mapY + 40), this.sprite.width - 48, this.sprite.height - 60)
    }
	
	this.attack_hitbox = false;

	
	this.update = function(){
		
		//walking animation handlers
		if(this.walking == true){
			if(this.look_direc == 'west'){
				this.active_animation = this.left_walk;
			}
			if(this.look_direc == 'south'){
				this.active_animation = this.down_walk;
			}
			if(this.look_direc == 'north'){
				this.active_animation = this.up_walk;
			}
			if(this.look_direc == 'east'){
				this.active_animation = this.right_walk;
			}
			
			//if not moving, stop animating
			if(this.canvasXSpeed == 0 && this.canvasYSpeed == 0){
				this.animating = false;
				this.image_index = 0;
			}
			else{
				this.animating = true;
			}
		}
		
		/* if(current_level == 1){
			EN1 = new enemy_a(200, 200);
			main_stage.push(EN1);
			if(EN1.hp <= 0){
				current_level += 1;
			}
			*/
		
		if(this.recently_checked == true){
			this.recently_checked = false;
		} else {
			this.can_move_down = true;
			this.can_move_up = true;
			this.can_move_left = true;
			this.can_move_right = true;
		}
		
		if (keysPressed[BEAM_KEY_CODE] == true){
			//BEAM IS TURNED OFF FOR THURSDAY AND FRIDAY TESTIN
			//MC.beam();
		}
	   
	    if(this.dashing == false && this.active_animation != this.death){
			//reset the dashing values
			this.dashXInc = 0;
			this.dashYInc = 0;
		   
			if (keysPressed[RIGHT_KEY_CODE] == true) {
				if(this.canvasX + this.sprite.width <= canvas.width){
					//this.canvasX += this.speed;
					if(this.canvasXSpeed < this.speed){ this.canvasXSpeed += this.speedInc }
				}
			}
		   
			else {
			    if(this.canvasXSpeed > 0){ 
					this.canvasXSpeed -= this.speedInc 
			    }
			}
		   
			if (keysPressed[LEFT_KEY_CODE] == true) {
				if(this.canvasX > 0){
					//this.canvasX -= this.speed;
					if(this.canvasXSpeed > -this.speed){ this.canvasXSpeed -= this.speedInc;}
				}
			}
		   
			else {
			    if(this.canvasXSpeed < 0){ 
			   	    this.canvasXSpeed += this.speedInc;
			   	}
			}
		   
			if (keysPressed[DOWN_KEY_CODE] == true) {
				if(this.canvasY + this.sprite.height < canvas.height){
					//this.canvasY += this.speed;
				    if(this.canvasYSpeed < this.speed){ this.canvasYSpeed += this.speedInc }
			    }
			}
			else{
				if(this.canvasYSpeed > 0){ 
					this.canvasYSpeed -= this.speedInc; 
			   }
			}
			
			if (keysPressed[UP_KEY_CODE] == true) {
				if(this.canvasY > 0){
					//this.canvasY -= this.speed;
					if(this.canvasYSpeed > -this.speed){ this.canvasYSpeed -= this.speedInc }
				}
			}
			else{
				if(this.canvasYSpeed  < 0){ 
					this.canvasYSpeed += this.speedInc;
			    }
			}
	    }

	    else if(this.active_animation != this.death){
			//spawn fireball effect
			var f = new fireParticle(this.canvasX- this.sprite.width / 2, this.canvasY - this.sprite.height / 2, this.sprite.height, 10, "dash");
			main_stage.push(f);
			
			//wind-down proportionally for dash
			//assuming xSpeed is larger
			if(this.canvasXSpeed > 0){ this.canvasXSpeed -= this.dashXInc }
			if(this.canvasXSpeed < 0){ this.canvasXSpeed += this.dashXInc }
			
			if(this.canvasYSpeed > 0){ 
				this.canvasYSpeed -= this.dashYInc; 
			}
			if(this.canvasYSpeed < 0){ 
				this.canvasYSpeed += this.dashYInc;
			}	
	    }
	   
	    //if within bounds add directional changes
	   if((this.canvasX > 0 && this.canvasXSpeed < 0) && this.can_move_left){
		   if(this.moveCanvasX){
				this.canvasX += this.canvasXSpeed;
		   }
		   else{
			   this.canvasX += this.canvasXSpeed / 2;
		   }
		   
		}
		if((this.canvasX + this.sprite.width < canvas.width && this.canvasXSpeed > 0) && this.can_move_right){
			if(this.moveCanvasX){
				this.canvasX += this.canvasXSpeed;
		    }
		    else{
			   this.canvasX += this.canvasXSpeed / 2;
		    }
		}
		
		if((this.canvasY > 0 && this.canvasYSpeed < 0) && this.can_move_up){
			if(this.moveCanvasY){
				this.canvasY += this.canvasYSpeed;
		    }
		    else{
			   this.canvasY += this.canvasYSpeed / 2;
		    }
		    renderer.need_sort = true;
		}
		if((this.canvasY + this.sprite.height < canvas.height && this.canvasYSpeed > 0) && this.can_move_down){
			if(this.moveCanvasY){
				this.canvasY += this.canvasYSpeed;
		    }
		    else{
			   this.canvasY += this.canvasYSpeed / 2;
		    }
		    renderer.need_sort = true;
		}
		
		//failsafe for speed wind-down
		if(this.canvasXSpeed >= 0 && (this.canvasXSpeed < this.speedInc || this.canvasXSpeed < this.dashXInc)){
			this.canvasXSpeed = 0;
		}

		if(this.canvasYSpeed >= 0 && (this.canvasYSpeed < this.speedInc || this.canvasYSpeed < this.dashYInc)){
			this.canvasYSpeed = 0;
		}
		
		//re-enable dash when dash ends
		if(this.dashing == true && (this.canvasXSpeed == 0 && this.canvasYSpeed == 0)){
			this.dashing = false;
			//start playing dash animation
			this.animating = true;
		}
		
		this.mapX = toMapX(this.canvasX);
	    this.mapY = toMapY(this.canvasY);
	    
	    this.depth = -(this.mapY - 20);
		
		this.hitbox.col_data.pos.x = this.mapX + 24;
		this.hitbox.col_data.pos.y = this.mapY + 70;
		
		if(this.attack_hitbox != false && this.attack_hitbox.shape == 'arc'){
			if (this.attack_hitbox.currframe < this.attack_hitbox.numFrames + 4){
				this.attack_hitbox.currframe++;
				this.attack_hitbox.xy1 = findc1(this.attack_hitbox);
			
		   if (this.attack_hitbox.currframe < this.attack_hitbox.numFrames + 1){
		       this.attack_hitbox.xy2 = findc2(this.attack_hitbox);
		   }
		   var dat = new SAT.Vector(MC.canvasX + (MC.sprite.width / 2), MC.canvasY + (MC.sprite.height / 2));
		   this.attack_hitbox.col_data = new SAT.Polygon(new SAT.Vector(), [
		   this.attack_hitbox.xy1, this.attack_hitbox.xy2,dat]); 
		   } else {
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
		
		if(this.beaming == true && this.aiming == false){
			if(this.beamTimer > 0){
				this.beamTimer--;
				console.log(this.beamTimer);
			}
			else{
				this.beaming = false;
				this.attack_hitbox = false;
				this.beamTimer = this.beamDuration;
			}
		}
		
		if(this.aiming == true && keysPressed[BEAM_KEY_CODE] == false){
			this.aiming = false;
			this.attack_hitbox = {
				    active:true,
				    shape:'polygon',
				    col_data:0,
				    self:this,
				    type:'beam'
			}
			var xad1 = this.beamStartX - this.mapX - this.sprite.width/2;
			var xad2 = this.beamEndX - this.mapX - this.sprite.width/2;
			var yad1 = this.beamStartY - this.mapY - this.sprite.height/2;
			var yad2 = this.beamEndY - this.mapY - this.sprite.height/2;
			console.log(xad1 + " " + xad2);
			console.log(yad2 + " " + yad1);
			var xDiff = xad2 - xad1;
			var yDiff = yad2 - yad1;
			console.log(xDiff + " " + yDiff);
			var angle = radians(Math.atan2(xDiff, yDiff));
			console.log(angle);
			if (angle < 0){
				angle = 360 +angle;
			}
			console.log("adjusted angle: " + angle);
			var dist = Math.sqrt((xDiff*xDiff) + (yDiff*yDiff));
			console.log(dist);
			var p1 = [this.beamGerth, 0];
			var p2 = [this.beamGerth, dist];
			rotate_counter(p1, angle);
			rotate_counter(p2, angle);
			console.log(xad1 + " " + yad1);
			console.log(xad2 + " " + yad2);
			console.log(p1[0] + " " + p1[1]);
			console.log(p2[0] + " " + p2[1]);
			var adx1 = p1[0] + this.mapX + this.sprite.width/2;
			var adx2 = p2[0] + this.mapX + this.sprite.width/2;
			var ady1 = p1[1] + this.mapY + this.sprite.height/2;
			var ady2 = p2[1] + this.mapY + this.sprite.height/2; 
			this.attack_hitbox.col_data = new SAT.Polygon(new SAT.Vector(), [
			new SAT.Vector(this.beamStartX, this.beamStartY),
			new SAT.Vector(adx1, ady1),
			new SAT.Vector(adx2, ady2),
			new SAT.Vector(this.beamEndX, this.beamEndY)]);
			
			
		}
		
	}//Update
	
    this.draw = function() {
    	//drawing the player sprite
		if(this.animating == true){
			draw_animated_sprite(this.active_animation, this, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		else{
			context.drawImage(this.active_animation[this.image_index], this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
		
		//if beam active, draw beam
		if(this.beaming == true && this.aiming == true){
			context.beginPath();
			context.moveTo(toCanvasX(this.beamStartX), toCanvasY(this.beamStartY));
			context.lineTo(toCanvasX(this.beamEndX), toCanvasY(this.beamEndY));
			context.lineWidth = this.beamGerth;
			if(this.aiming == false){
				context.strokeStyle = '#ff0000';
			}
			else{
				context.strokeStyle = '#000000';
			}
			context.stroke();
		} else if(this.beaming == true && this.aiming == false){
			console.log(this.attack_hitbox.col_data.points[0].x + " " + this.attack_hitbox.col_data.points[0].y);
			console.log(this.attack_hitbox.col_data.points[1].x + " " + this.attack_hitbox.col_data.points[1].y);
			console.log(this.attack_hitbox.col_data.points[2].x + " " + this.attack_hitbox.col_data.points[2].y);
			console.log(this.attack_hitbox.col_data.points[3].x + " " + this.attack_hitbox.col_data.points[3].y);
			context.beginPath();
			context.moveTo(toCanvasX(this.attack_hitbox.col_data.points[0].x), toCanvasY(this.attack_hitbox.col_data.points[0].y));
			context.lineTo(toCanvasX(this.attack_hitbox.col_data.points[1].x), toCanvasY(this.attack_hitbox.col_data.points[1].y));
			context.lineTo(toCanvasX(this.attack_hitbox.col_data.points[2].x), toCanvasY(this.attack_hitbox.col_data.points[2].y));
			context.lineTo(toCanvasX(this.attack_hitbox.col_data.points[3].x), toCanvasY(this.attack_hitbox.col_data.points[3].y));
			context.lineTo(toCanvasX(this.attack_hitbox.col_data.points[0].x), toCanvasY(this.attack_hitbox.col_data.points[0].y));
			context.closePath();
			context.fill(); 
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
		
		if (this.attack_hitbox != false && this.attack_hitbox.shape == 'arc'){
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
			
			var f = new fireParticle(this.attack_hitbox.col_data.points[1].x - 7, this.attack_hitbox.col_data.points[1].y - 7, 30, 15);
			main_stage.push(f);
		}
		
		context.fillStyle = 'white';
		
		//fire point display
		context.font = '25px Verdana'; //font and size
		if(this.can_melee == false || this.dashing == true){
			context.fillStyle = '#000000ddsd';
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
		
		//context.fillStyle = 'orange';
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.h);
		
    }
    
    this.attack = function(){
		if((this.can_melee == true && this.meleeCool == 0) && this.fp >= this.meleeCost){

			var opt1 = this.look_direc;
			var direction = 180;
			this.walking = false;
			this.animating = true;
		    if (opt1 == 'west') {
			    direction = 90;
				this.active_animation = this.left_melee;
		    } else if (opt1 == 'south'){
			    direction = 0;
				this.active_animation = this.down_melee;
		    } else if (opt1 == 'east'){
			    direction = 270;
				this.active_animation = this.right_melee;
		    } else if (opt1 == 'north'){
				direction = 180;
				this.active_animation = this.up_melee;
			}
			this.attack_hitbox = {
				active:true,
				shape:'arc',
				currframe:0,
				col_data:0,
				numFrames:16,
				radius:200,
				self:this,
				direc:direction,
				xy1:0,
				xy2:0,
				type:'melee'
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
			this.particleTargetX = mouseX;
			this.particleTargetY = mouseY;
			this.particleStartX = this.canvasX;
			this.particleStartY = this.canvasY;
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
			
			//animation
			//show a still image that is higher priority to walking
			this.walking = false;
			//this.animating = true;
			if(this.look_direc == "south"){ this.active_animation = this.down_dash; }
			if(this.look_direc == "north"){ this.active_animation = this.up_dash; }
			if(this.look_direc == "west"){ this.active_animation = this.left_dash; }
			if(this.look_direc == "east"){ this.active_animation = this.right_dash; }
			console.log("active animation made dash")
		}
	}
	
	this.beam = function(){
		console.log("Beam called");
		if(this.dashing == false && this.fp >= this.beamCost){
			//Create a beam of set length in the direction
			//of mousex and mousey
			this.beaming = true;
			this.aiming = true;
			
			this.beamStartX = this.mapX + this.sprite.width/2;
			this.beamStartY = this.mapY + this.sprite.height/2;
			
			var slopeX = toMapX(mouseX) - this.beamStartX;
			var slopeY = toMapY(mouseY) - this.beamStartY;
			var distance = Math.sqrt(Math.pow((mouseX - this.beamStartX), 2)
								 + Math.pow((mouseY - this.beamStartY), 2));
			
			var beamXInc = slopeX / distance;
			var beamYInc = slopeY / distance;
			
			this.beamEndX = this.beamStartX + beamXInc * this.beamLength;
			this.beamEndY = this.beamStartY + beamYInc * this.beamLength;
		}
	}
	
	this.on_hit = function(dmg){
		if(this.vulnerable == true){
			if(this.hp > 0){
				this.hp -= dmg;
				
				this.safetyTimer = this.safetyTimerMax;
				this.vulnerable = false;
			}
			else if(this.active_animation != this.death){
				this.die();
			}
		}
	}
	
	this.die = function(){
		this.walking = false
		this.animating = true;
		this.active_animation = this.death;
		this.canvasXSpeed = 0;
		this.canvasYSpeed = 0;
		//set this animation to play slower
		this.image_speed_counter = 20;
	}
	
	this.end_animation = function(target){
		//called when the current animation ends
		if(target == "melee"){
			this.animating = false;
			this.walking = true;
		}
		if(target == "death"){
			this.animating = false;
			this.walking = true;
			reset_game();
		}
		if(target == "dash"){
			this.animating = false;
			this.walking = true;
		}
	}
	
    this.special = function(param){
    	
    }
    
    this.collide = function(target){
		if(this.dashing == false){
			if (target.is_obstacle == true){
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
				
			
			} else if(target.type == "enemy"){
			    MC.on_hit(5);
			} else if(target.type == 'bullet'){
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
		if (obj.currframe < 5) {
			var newval = new SAT.Vector(Math.round(cx +(obj.radius * (Math.cos(degrees(45 + obj.direc))))),
				    Math.round(cy + (obj.radius * (Math.sin(degrees(45 + obj.direc))))));
		    //newval.x -= MC.mapX;
		    //newval.y -= MC.mapY;
			return newval;
		} else {
			var angle = (obj.currframe - 4) * (90 / obj.numFrames);
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

function radians(number){
	return number *  180 / Math.PI;
}

function rotate_counter(ar, angle){
	var tx = ar[0];
	var ty = ar[1];
	ar[0] = ((tx * Math.cos(angle)) - (ty * (Math.sin(angle))));
	ar[1] = ((tx * Math.sin(angle)) + (ty * Math.cos(angle))); 
}
