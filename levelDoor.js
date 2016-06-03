/**
 * @author Duunko
 */

function level_door(x, y){
	
	this.sprite = assets["black_square"];
	
	this.sprite.width = 200;
	this.sprite.height = 200;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.update = function(){
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){	
		
	}
	
	this.collide = function(target){
		if(target == MC){
			console.log("MC collided with door");
		}
	}
	
	this.collide_damage = function(){
		//this is called when the enemy collides with the melee
		//console.log("damage");
		//if not stunned
		
		console.log('collided');
		
		if (MC.attack_hitbox.shape == 'arc'){
			if(this.stunned == false){
			    this.knockback();
			    this.on_hit(5);
		    }
		} else if(MC.attack_hitbox.shape == 'polygon'){
			this.knockback();
			this.on_hit(10);
		}
		
	}
	
	this.on_hit = function(dmg){
		if(this.vulnerable == true){
			if(this.hp > 0){
				this.hp -= dmg;
				console.log("EN took "+dmg+" damage");
				console.log("New health is "+this.hp);
			}
			else{
				this.die();
				this.destroy();
			}
		}
	}
	
	this.die = function(){
		
	}
	
	this.hitbox = {
    	active:false,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
    }
    
}
