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
	this.look_direc = {x:0, y:0};
	this.canvasX = canvas.width/2;
	this.canvasY = canvas.height/2;
	this.mapX = tiles.WORLD_WIDTH/2;
	this.mapY = tiles.WORLD_HEIGHT/2;
	
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.speed = 10;
	
	this.update = function(){
	   
	   console.log(this.mapX+" , "+this.mapY);
	   if (keysPressed[RIGHT_KEY_CODE] == true) {
		 if(this.canvasX + this.sprite.width < canvas.width){
			this.canvasX += this.speed;
		 }
		 if(this.mapX < tiles.WORLD_WIDTH){
			this.mapX += this.speed;
		 }
       }
       if (keysPressed[LEFT_KEY_CODE] == true) {
		  if(this.canvasX > 0){
			this.canvasX -= this.speed;
		  }
		  if(this.mapX > 0){
			  this.mapX -= this.speed;
		  }
       }
       if (keysPressed[DOWN_KEY_CODE] == true) {
		 if(this.canvasY + this.sprite.height < canvas.height){
			this.canvasY += this.speed;
		 }
		 if(this.mapY < tiles.WORLD_HEIGHT){
			this.mapY += this.speed;
		 }
       }
       if (keysPressed[UP_KEY_CODE] == true) {
		 if(this.canvasY > 0){
			this.canvasY -= this.speed;
		 }
		 if(this.mapY > 0){
			this.mapY -= this.speed;
		 }

       }
	}
	
    this.draw = function() {
    	context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		//drawing line from character to mouse coordinates
		context.beginPath();
		context.moveTo(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2);
		context.lineTo(mouseX,mouseY);
		context.strokeStyle = '#ff0000';
		context.stroke();		
    }
    
    this.attack = function(){
    	
    }
    this.special = function(param){
    	
    }
	
	
}