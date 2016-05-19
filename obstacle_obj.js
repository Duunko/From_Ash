/**
 * @author Duunko
 */

function obstacle(x,y, type){
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	this.image = 0;
	this.type = type;
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){
		
	}
	
	
}
