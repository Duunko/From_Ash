/**
 * @author Duunko
 */

function path(bound_obj, x1, y1, x2, y2, x3, y3){
	this.obj = bound_obj;
	this.mapX = x1;
	this.mapY = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x3 = x3;
	this.y3 = y3;
	
	this.next = function(){
		this.mapX = this.x2;
		this.mapY = this.y2;
	}
}
