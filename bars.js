/**
 * @author Bion719
 */

/* The function creates and manages an overlay with displays the 
 * cooldown of attacks, the fire-point cost and the button used
 * Taking in:
 * x, y
 * sprite
 * 
 *
 */
 
function healthBar(x, y, spr, target){
	this.sprite = spr;
	
	this.canvasX = x;
	this.canvasY = y;
	
	//create the overlay shade that will be used by the overlay
	//to display the remaining cooldown
	this.shade = new Image();
	this.shade.src = assets["gui_shade"].src;
	this.shade.width = this.sprite.width;
	this.shade.height = this.sprite.height;
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		//context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		//context.drawImage(this.shade, this.canvasX, this.canvasY, this.shade.width, this.shade.height);
	}
}

function fireBar(x, y, spr, target){
	this.sprite = spr;
	
	this.canvasX = x;
	this.canvasY = y;
	
	//create the overlay shade that will be used by the overlay
	//to display the remaining cooldown
	this.shade = new Image();
	this.shade.src = assets["gui_shade"].src;
	this.shade.width = this.sprite.width;
	this.shade.height = this.sprite.height;
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		//context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		//context.drawImage(this.shade, this.canvasX, this.canvasY, this.shade.width, this.shade.height);
	}
}