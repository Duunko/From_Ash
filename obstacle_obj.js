/**
 * @author Duunko
 */

function obstacle(x,y, type){
	this.depth = -(y - 20);
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	console.log(this.mapX + " " + this.mapY + " " + this.canvasX + " " + this.canvasY);
    this.type = type;
    if(this.type == 'environment'){
        this.sprite = assets["enviro_tree"];
    } else {
    	this.sprite = assets["black_square2"];
    }

	this.sprite.width = 96;
	this.sprite.height = 96;

	this.is_obstacle = true;
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
	    
	    if(this.canvasX < 0 || this.canvasX > canvas.width){
	    	if(this.canvasY < 0 || this.canvasY > canvas.height){
	    		this.hitbox.active = false;
	    	} else {
	    		this.hitbox.active = true;
	    	}
	    } else {
	    	this.hitbox.active = true;
	    }
	}
	
	this.draw = function(){
		//context.drawImage(this.sprite, this.canvasX, this.canvasY, 64, 64);
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
    	col_data: new SAT.Box(new SAT.Vector(this.mapX + 8, this.mapY + 10), this.sprite.width -16, this.sprite.height - 10)
	}
	
	this.collide = function(target){
		
	}
	
	this.collide_damage = function(target){
		
	}
	
}
