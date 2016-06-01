/**
 * @author Duunko
 */

function depo(x, y){
	this.depth = y;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
   this.sprite = assets["enviro_tree"];
	this.sprite.width = 64;
	this.sprite.height = 64;

	this.is_obstacle = true;
	
	this.in_range = false;
	this.depo_ready = true;
	
	this.update = function(){
		if(this.in_range == true){
			if(keysPressed[ACTION_KEY_CODE] == true){
				if(this.depo_ready == true){
					MC.fp -= 1;
					MC.nextFp += 1;
					console.log("deposited points");
					this.depo_ready = false;
				}
			}
			else{
				this.depo_ready = true;
			}
		}
		
		this.canvasX = toCanvasX(this.mapX);
	    this.canvasY = toCanvasY(this.mapY);
		
		this.in_range = false;
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
		if(target == MC){
			this.in_range = true;
		}
	}
	
	this.collide_damage = function(target){
		
	}
	
}
