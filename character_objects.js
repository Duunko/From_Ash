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
	this.sprite.src = 'https://image.freepik.com/free-icon/arrow-bold-down--ios-7-interface-symbol_318-34310.png'
	this.sprite.width = 40;
	this.sprite.height = 40;
	
	this.fp = 40;
	this.hp = 40;
	this.move_direc = 'south';
	this.look_direc = 'south';
	this.canvasX = canvas.width/2;
	this.canvasY = canvas.height/2;
	this.mapX = tiles.WORLD_WIDTH/2;
	this.mapY = tiles.WORLD_HEIGHT/2;
	
	this.speed = 5;
	this.speedInc = 0.5;
	
	this.canvasXSpeed = 0;
	//this.mapXSpeed = 0;
	this.canvasYSpeed = 0;
	//this.mapYSpeed = 0;
	
	
	this.update = function(){
	   
	   //console.log(this.mapX+" , "+this.mapY);
	   //console.log("left: "+tiles.left);
	   //console.log(toMapX(this.canvasX)+" , "+toMapY(this.canvasY));
	   console.log("this.ySpeed "+this.canvasYSpeed);
	   console.log("tiles.top "+tiles.top);
	   
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
	   
	   
	    if(this.canvasX > 0 && this.canvasX + this.sprite.width < canvas.width){
			this.canvasX += this.canvasXSpeed;
	    }
	    else{
		   if(this.canvasX < 0){ this.canvasX = 1 }
		   if(this.canvasX + this.sprite.width > canvas.width){ this.canvasX = canvas.width - this.sprite.width }
	    }
	   
	    if(this.canvasY > 0 && this.canvasY + this.sprite.height < canvas.height){
		   this.canvasY += this.canvasYSpeed;
	    }
	    
		this.mapX = toMapX(this.canvasX);
	    this.mapY = toMapY(this.canvasY);
		
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
		
		/* context.beginPath();
		context.moveTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.lineTo(mouseX,mouseY);
		context.strokeStyle = '#ff0000';
		context.stroke();
		context.moveTo(topLeft.x,topLeft.y);
		context.lineTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.stroke();
		context.moveTo(topRight.x,topRight.y);
		context.lineTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.stroke();	
		context.moveTo(bottomLeft.x,bottomLeft.y);
		context.lineTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.stroke();	
		context.moveTo(bottomRight.x,bottomRight.y);
		context.lineTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.stroke();	
		 */
		
		if(mADTL <= cADTL && mADTR > cADTR ){
			this.look_direc = 'north';
		} else if(mADTR < cADTR && mADBR > cADBR){
			this.look_direc = 'east';
		} else if(mADBR < cADBR && mADBL > cADBL){
			this.look_direc = 'south';
		} else {
			this.look_direc = 'west';
		}
		//placeholder for directions
		context.fillText(this.look_direc,10,100);
    }
    
    this.attack = function(){
    	
    }
	
    this.special = function(param){
    	
    }
}