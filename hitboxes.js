/**
 * @author Duunko
 */

function hitbox(shape, opt1, opt2, opt3, opt4, opt5, opt6) {
	this.depth = -100;
	this.active = false;
	if (shape == 'arc') {
		this.direc = 180;
		if (opt1 == 'west') {
			this.direc = 90;
		} else if (opt1 == 'south'){
			this.direc = 0;
		} else if (opt1 == 'east'){
			this.direc = 270;
		} 
		this.numFrames = opt2;
		this.shape = shape;
		this.currframe = 0;
	    this.radius = 60;
	    var self = this;
		this.xy1 = findc1(self);
		this.xy2 = 0;
		this.col_data = 0;
	} else if (shape == 'rectangle'){
		this.sprite = new Image();
		this.shape = shape;
		this.bound_object = opt1;
		this.offsetX = opt2;
		this.offsetY = opt3;
		this.canvasX = this.bound_object.canvasX + this.offsetX;
		this.canvasY = this.bound_object.canvasY + this.offsetY;
		this.mapX = toMapX(this.canvasX);
		this.mapY = toMapY(this.canvasY);
		this.sprite.width = opt4;
		this.sprite.height = opt5;
		this.type = opt6;
		this.col_data = new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height);
		
	} else if (shape == 'circle'){
		this.sprite = new Image();
		this.shape = shape;
		this.bound_object = opt1;
		this.offsetX = opt2;
		this.offsetY = opt3;
		this.canvasX = this.bound_object.canvasX + this.offsetX;
		this.canvasY = this.bound_object.canvasY + this.offsetY;
		this.mapX = toMapX(this.canvasX);
		this.mapY = toMapY(this.canvasY);
		this.sprite.height = opt4;
		this.sprite.width = opt4;
		this.radius = opt4;
		this.type = opt5;
		this.col_data = new SAT.Circle(new SAT.Vector(this.mapX, this.mapY), this.radius);
	}
	
	this.update = function(){
		if (this.shape == 'arc'){
			if (this.currframe < this.numFrames + 2){
				this.currframe++;
				this.xy1 = findc1(self);
		        if (this.currframe < this.numFrames + 1){
		        	this.xy2 = findc2(self);
		        }
		        var dat = new SAT.Vector(MC.canvasX + (MC.sprite.width / 2), MC.canvasY + (MC.sprite.height / 2))
		        console.log(dat);
		        this.col_data = new SAT.Polygon(new SAT.Vector(), [
		        this.xy1, this.xy2, 
		        dat]);
			} else {
				MC.can_melee = true;
				this.destroy();
			}
		} else if(this.shape == 'rectangle'){
			this.canvasX = this.bound_object.canvasX + this.offsetX;
		    this.canvasY = this.bound_object.canvasY + this.offsetY;
		    this.mapX = toMapX(this.canvasX);
		    this.mapY = toMapY(this.canvasY);
		    this.col_data.pos.x = this.mapX;
		    this.col_data.pos.y = this.mapY;
		} else if (this.shape == 'circle'){
			this.canvasX = this.bound_object.canvasX + this.offsetX;
		    this.canvasY = this.bound_object.canvasY + this.offsetY;
		    this.mapX = toMapX(this.canvasX);
		    this.mapY = toMapY(this.canvasY);
		    this.col_data.pos.x = this.mapX;
		    this.col_data.pos.y = this.mapY;
		}
		
	}
	
	this.draw = function(){
		if (this.shape == 'arc'){
		    context.fillStyle = '#CF0D42';
		    context.beginPath()
		    context.moveTo(this.col_data.points[2].x, this.col_data.points[2].y);
		    context.lineTo(this.col_data.points[0].x, this.col_data.points[0].y);
		    context.lineTo(this.col_data.points[1].x, this.col_data.points[1].y);
		    context.lineTo(this.col_data.points[2].x, this.col_data.points[2].y);
		    context.closePath();
		    context.fill();
			
			//fire effect
			var f = new fireParticle(this.col_data.points[1].x, this.col_data.points[1].y, 10, 10);
			main_stage.push(f);
			//var f2 = new fireParticle(this.col_data.points[1].x, this.col_data.points[1].y, 10, 10);
			//main_stage.push(f2);
			
		} /*else if(this.shape == 'rectangle'){
			console.log("canvas values: " + this.canvasX + " " + this.canvasY);
			context.fillStyle = '#CF0D42';
			context.fillRect(this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
			context.fill();
		} */
	}
	
	function findc1 (self) {
		var cx = MC.canvasX + (MC.sprite.width / 2);
		var cy = MC.canvasY + (MC.sprite.height / 2);
		if (self.currframe < 3) {
			var newval = new SAT.Vector(Math.round(cx +(self.radius * (Math.cos(degrees(45 + self.direc))))),
				    Math.round(cy + (self.radius * (Math.sin(degrees(45 + self.direc))))));
			return newval;
		} else {
			var angle = (self.currframe - 2) * (90 / self.numFrames);
			return new SAT.Vector(Math.round(cx + (self.radius * (Math.cos(degrees(45 + self.direc + angle))))),
				    Math.round(cy + (self.radius * (Math.sin(degrees(45 + self.direc + angle))))));
		}
	}
	function findc2 (self) {
		var cx = MC.canvasX + (MC.sprite.width / 2);
		var cy = MC.canvasY + (MC.sprite.height / 2);
		var angle = (self.currframe) * (90 / self.numFrames);
		return new SAT.Vector(Math.round(cx + (self.radius * (Math.cos(degrees(45 + self.direc + angle))))),
				    Math.round(cy + (self.radius * (Math.sin(degrees(45 + self.direc + angle))))));
	}
	
	this.destroy = function(){
		main_stage.destroy(self);
	}
}




function degrees(number){
	return number * Math.PI / 180;
}




