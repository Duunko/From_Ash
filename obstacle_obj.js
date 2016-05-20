/**
 * @author Duunko
 */

function obstacle(x,y, type){
	this.depth = y;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	this.sprite = new Image()
	this.sprite.src = assets[4];
	this.sprite.width = 64;
	this.sprite.height = 64;
	this.type = type;
	this.is_obstacle = true;
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){
		console.log(this.mapX + " " + this.mapY);
		context.drawImage(this.sprite, this.canvasX - 32, this.canvasY - 32, 96, 96);
		context.fillStyle = '#CF0D42';
		context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.sprite.width, this.sprite.height);
		
	}
	
	this.hitbox = {
		active:true,
    	shape:'rectangle',
    	offsetX:32,
    	offsetY:32,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
	}
	
	this.collide = function(target){
		
	}
	
	this.collide_damage = function(target){
		
	}
	
}
