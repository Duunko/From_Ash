/**
 * @author Duunko
 */

function obstacle(x,y, type){
	this.depth = y;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
    this.type = type;
    console.log(type);
    if(this.type == 'environment'){
        this.sprite = assets[4];
    } else {
    	this.sprite = assets[7];
    }

	this.sprite.width = 64;
	this.sprite.height = 64;

	this.is_obstacle = true;
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){
		
		console.log(this.sprite);
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
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
	}
	
	this.collide = function(target){
		
	}
	
	this.collide_damage = function(target){
		
	}
	
}
