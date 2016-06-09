/**
 * @author Bion719
 */

/* This function displays an images on the floor
 * 
 *
 */
 
function floor_object(x, y, spr, text){
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
		context.font = "25px Verdana";
		context.fillStyle = "#3B3B3B"
		context.fillText(text, this.canvasX + 30, this.canvasY+this.sprite.height + 20);
	}
}