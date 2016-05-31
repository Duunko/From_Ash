/**
 * @author Duunko
 */

function obstacle(x,y, type){
	this.depth = y;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	console.log(this.mapX + " " + this.mapY + " " + this.canvasX + " " + this.canvasY);
    this.type = type;
    if(this.type == 'environment'){
        this.sprite = assets["enviro_tree"];
    } else {
    	this.sprite = assets["black_square"];
    }

	this.sprite.width = 64;
	this.sprite.height = 64;

	this.is_obstacle = true;
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, 64, 64);
		//context.fillStyle = '#CF0D42';
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.sprite.width, this.sprite.height);
		
	}
	
	this.hitbox = {
		active:true,
    	shape:'rectangle',
    	offsetX:32,
    	offsetY:32,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX - 1, this.mapY - 1), this.sprite.width + 2, this.sprite.height + 2)
	}
	
	this.collide = function(target){
		
	}
	
	this.collide_damage = function(target){
		
	}
	
}
