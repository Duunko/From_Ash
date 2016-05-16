/**
 * @author Bion719
 */

/* Basic character object
 * This is the object for the basic enemy type. Contains a sprite,
 * fire point value, hit point value, directional data (for bookeeping),
 * x and y coordinates, and an update and draw method. 
 * 
 * Also contains an attack() and special() method that are unimpelemented.
 * 
 */
 
function enemy_a(x, y){
	this.sprite = new Image();
	this.sprite.src = assets[1];
	this.sprite.width = 40;
	this.sprite.height = 40;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.speed = 3;
	this.mapXSpeed = 0;
	this.mapYSpeed = 0;
	
	this.self = this;
	
	this.stunned = false;
	this.stunTimerMax = 25;
	this.stunTimer = 0;
	this.knockbackSpeed = 6;
	
	this.vulnerable = true;
	
	this.hp = 10;
	
	this.update = function(){
		if(this.stunned == false){
			if(MC.hp > 0){
				this.moveTowards(MC);
			}
			this.mapX += this.mapXSpeed * this.speed;
			this.mapY += this.mapYSpeed * this.speed;
		}
		else{
			this.mapX += this.mapXSpeed * this.knockbackSpeed;
			this.mapY += this.mapYSpeed * this.knockbackSpeed;
		}
		
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
		
	   this.hitbox.col_data.pos.x = this.mapX;
		this.hitbox.col_data.pos.y = this.mapY;
		
		//------------TIMERS-----------------
		if(this.stunTimer > 0){
			this.stunTimer--;
		}
		else{
			this.stunned = false;
		}
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
	
	this.moveTowards = function(target){
		if(!isNaN(target.mapX)){
			var slopeX = target.mapX - this.mapX;
			var slopeY = target.mapY - this.mapY;
				
			var distance = Math.sqrt(Math.pow((target.mapX - this.mapX), 2)
								+ Math.pow((target.mapY - this.mapY), 2));
				
			this.mapXSpeed = slopeX / distance;
			this.mapYSpeed = slopeY / distance;
				
		}
		else{
			console.log("Nan detected");
		}
	}
	
	this.knockback = function(){
		this.mapXSpeed = -this.mapXSpeed;
		this.mapYSpeed = -this.mapYSpeed;
		
		this.stunned = true;
		this.stunTimer = this.stunTimerMax;
	}
	
	this.attack = function(){
		
	}
	
	this.destroy = function(){
		this.hp = 10;
		this.mapX = -this.sprite.width;
		this.mapY = -this.sprite.width;
		var a = new enemy_a(this.mapX, this.mapY-50);
		main_stage.push(a);
	}
	
	this.collide = function(){
		
	}
	
	this.collide_damage = function(){
		//this is called when the enemy collides with the melee
		//console.log("damage");
		//if not stunned
		if(this.stunned == false){
			this.knockback();
			this.on_hit(5);
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
		console.log("enemy has died");		
	}
	
	this.hitbox = {
    	active:true,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX, this.mapY), this.sprite.width, this.sprite.height)
    }
}