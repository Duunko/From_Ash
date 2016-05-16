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
	this.sprite = new Image();
	this.sprite.src = assets[0];
	this.sprite.width = 60;
	this.sprite.height = 80;
	
	this.fp = 40;
	
	this.meleeCost = 1;
	this.meleeCoolMax = 50;
	this.meleeCool = 0;
	
	this.dashCost = 2;
	this.dashCoolMax = 200;
	this.dashCool = 0;
	
	this.hp = 40;
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
	   
	   //console.log(this.mapX+" , "+this.mapY);
	   //console.log("left: "+tiles.left);
	   //console.log(toMapX(this.canvasX)+" , "+toMapY(this.canvasY));
	   //console.log("this.xSpeed "+this.canvasXSpeed+ " ,this.ySpeed "+this.canvasYSpeed);
	   //console.log(MC.canvasX+" , "+MC.canvasY);
	   
	    if(this.dashing == false){
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
			   if(this.canvasXSpeed > 0){ this.canvasXSpeed -= this.speedInc }
			}
		   
			if (keysPressed[LEFT_KEY_CODE] == true) {
				if(this.canvasX > 0){
					//this.canvasX -= this.speed;
					if(this.canvasXSpeed > -this.speed){ this.canvasXSpeed -= this.speedInc }
				}
			}
		   
			else {
			   if(this.canvasXSpeed < 0){ this.canvasXSpeed += this.speedInc }
			}
		   
			if (keysPressed[DOWN_KEY_CODE] == true) {
				if(this.canvasY + this.sprite.height < canvas.height){
					//this.canvasY += this.speed;
					if(this.canvasYSpeed < this.speed){ this.canvasYSpeed += this.speedInc }
				}
			}
			else{
				if(this.canvasYSpeed > 0){ this.canvasYSpeed -= this.speedInc }
			}
			
			if (keysPressed[UP_KEY_CODE] == true) {
				if(this.canvasY > 0){
					//this.canvasY -= this.speed;
					if(this.canvasYSpeed > -this.speed){ this.canvasYSpeed -= this.speedInc }
				}
			}
			else{
				if(this.canvasYSpeed  < 0){ this.canvasYSpeed += this.speedInc }
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
		    //console.log(dat);
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
			console.log("invulnerable");
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
    	context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
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
		}
		
		context.fillStyle = 'white';
		//placeholder for directions
		context.fillText(this.look_direc,10,100);
		
		//fire point display
		context.font = '25px Verdana'; //font and size
		if(this.can_melee == false){
			context.fillStyle = '#CF0D42';
		}
		context.fillText("Fire Points: "+this.fp, 10, 50);
		
		//hit point display
		if(this.safetyTimer > 0){
			context.fillStyle = '#CF0D42';
		} else {
			context.fillStyle = 'white';
		} 
		context.fillText("Hit Points: "+this.hp, 10, 75);
    }
    
    this.attack = function(){
		if(this.can_melee == true && this.meleeCool == 0){

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
			console.log(this.meleeCool);
		}
    }
    
	this.dash = function(){
		if(this.dashing == false && this.dashCool == 0){
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
				console.log("MC took "+dmg+" damage");
				console.log("New health is "+this.hp);
				
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
		console.log("you are dead");
	}
	
    this.special = function(param){
    	
    }
    
    this.collide = function(){
    	console.log("collided with enemy");
		MC.on_hit(5);
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