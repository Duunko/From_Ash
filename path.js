/**
 * @author Duunko
 */

function path(bound_obj, argar){
	this.obj = bound_obj;
	this.args = argar;
	this.argind = 0;
	this.point = new SAT.Vector(this.args[this.argind], this.args[this.argind + 1]);
	this.argind += 2;
	this.mapX = this.point.pos.x;
	this.mapY = this.point.pos.y;
	
	this.next = function(){
		this.point = new SAT.Vector(this.args[argind], this.args[argind + 1]);
	    this.argind += 2;
	    this.mapX = this.point.pos.x;
	    this.mapY = this.point.pos.y;
	}
}
