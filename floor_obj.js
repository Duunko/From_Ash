/**
 * @author Bion719
 */

/* This function displays an images on the floor
 * 
 *
 */
 
function floor_object(x, y, spr){
	this.sprite = spr;
	this.sprite.width = 144;
	this.sprite.height = 128;
	
	this.is_obstacle = false;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
	}
	
	this.destroy = function(){
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
}