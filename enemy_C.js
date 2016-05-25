/**
 * @author Duunko
 */

function enemy_c(x, y){
	
	this.type = "enemy";
	
	this.sprite = assets["sScorpion"];
	this.sprite.width = 96;
	this.sprite.height = 96;
	
	this.vision_range = 800;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.speed = 1;
	this.mapXSpeed = 0;
	this.mapYSpeed = 0;
	
	this.self = this;
	
	this.stunned = false;
	this.stunTimerMax = 25;
	this.stunTimer = 0;
	this.knockbackSpeed = 6;
	
	this.vulnerable = true;
	
	this.hp = 10;
	
	var en_pos = [[-50, 0],
					[tiles.WORLD_WIDTH + 50,0],
					[-50,tiles.WORLD_HEIGHT+50],
					[tiles.WORLD_WIDTH + 50, tiles.WORLD_HEIGHT+50]]; 
	
	this.update = function(){
		
		if(this.hitbox.active != true){
			var distance = this.distanceToObject(MC);
			if (distance < this.vision_range){
				this.hitbox.active = true;
			}
		}
		
		
		if(this.stunned == false){
			
			if(this.hitbox.active == true){
			    this.moveTowards(MC);
			
			    this.mapX += this.mapXSpeed * this.speed;
			    this.mapY += this.mapYSpeed * this.speed;
			}
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
			var distance = this.distanceToObject(target);
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
		var int1 = getRandomInt(0,3);
		var int2 = getRandomInt(0,3);
		this.mapX = en_pos[int1][0];
		this.mapY = en_pos[int1][1];
		var a = new enemy_a(en_pos[int2][0], en_pos[int2][1]);
		main_stage.push(a);
		
		MC.nextFp += 0.5;
	}
	
	this.collide = function(target){
		if (target.is_obstacle != undefined){
				var response = new SAT.Response();
				SAT.testPolygonPolygon(this.hitbox.col_data.toPolygon(), target.hitbox.col_data.toPolygon(), response);
				this.canvasX -= response.overlapV.x;
				this.canvasY -= response.overlapV.y
				this.mapX = toMapX(this.canvasX);
				this.mapY = toMapY(this.canvasY);
	   } else if(target.type == "enemy"){
	   	        var response = new SAT.Response();
				SAT.testPolygonPolygon(this.hitbox.col_data.toPolygon(), target.hitbox.col_data.toPolygon(), response);
				this.canvasX -= response.overlapV.x;
				this.canvasY -= response.overlapV.y
				this.mapX = toMapX(this.canvasX);
				this.mapY = toMapY(this.canvasY);
	   } else if(target == MC){
			if(MC.dashing == true){
				this.knockback();
				this.on_hit(5);
			}
		}
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
    
    this.distanceToObject = function(target){
	    var slopeX = target.mapX - this.mapX;
	    var slopeY = target.mapY - this.mapY;
	    var distance = Math.sqrt(Math.pow((target.mapX - this.mapX), 2)
								+ Math.pow((target.mapY - this.mapY), 2));
	    return distance;
    }
}

function bullet(x, y, angle){
	
}
