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
	
	this.type = "enemy";
	
	this.sprite = assets["sScorpion"];
	this.sprite.width = 180;
	this.sprite.height = 180;
	
	this.vision_range = 800;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	this.mapX = x;
	this.mapY = y;
	
	this.depth = -this.mapY;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.speed = 1;
	this.mapXSpeed = 0;
	this.mapYSpeed = 0;
	
	this.path = 0;
	
	this.self = this;
	
	this.stunned = false;
	this.stunTimerMax = 25;
	this.stunTimer = 0;
	this.knockbackSpeed = 6;
	
	this.vulnerable = true;
	
	this.hp = 14;
	
	this.t2 = 0;
	
	this.attack_timer = 0;
	
	var en_pos = [[-50, 0],
					  [tiles.WORLD_WIDTH + 50,0],
					  [-50,tiles.WORLD_HEIGHT+50],
					  [tiles.WORLD_WIDTH + 50, tiles.WORLD_HEIGHT+50]]; 
	
	this.update = function(){
		
		this.attack_timer++;
		
		if(this.hitbox.active != true){
			var distance = this.distanceToObject(MC);
			if (distance < this.vision_range){
				this.hitbox.active = true;
			}
		}
		
		
		if(this.stunned == false){
			
			if(this.hitbox.active == true && MC.active_animation != MC.death){
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
		
	    this.hitbox.col_data.pos.x = this.mapX + 15;
		this.hitbox.col_data.pos.y = this.mapY + 15;
		
		//------------TIMERS-----------------
		if(this.stunTimer > 0){
			this.stunTimer--;
		}
		else{
			this.stunned = false;
		}
		
		this.depth = -this.mapY;
	}
	
	this.draw = function(){	
		//rotation and drawing
		//context.fillStyle = '#CF0D42';
		//context.fillRect(toCanvasX(this.hitbox.col_data.pos.x), toCanvasY(this.hitbox.col_data.pos.y), this.hitbox.col_data.w, this.hitbox.col_data.h);
		context.save();
		context.translate(this.canvasX + this.sprite.width/2, this.canvasY + this.sprite.height/2);
		context.rotate(this.rotateEnemy()*(Math.PI/180) + Math.PI/2);
		context.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2, this.sprite.width, this.sprite.height);
		context.restore();
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
	
	this.rotateEnemy = function(){
		var tm = angleDeg(this.canvasX + this.sprite.width/2,this.canvasY + this.sprite.height/2,
								MC.mapX,MC.mapY); //* (Math.PI/180);
		if(tm < 0){
			tm = 360 - (-tm);
		}
		return tm
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
		//enemies_killed += 1;
		//this.hp = 10;
		//var int1 = getRandomInt(0,3);
		//var int2 = getRandomInt(0,3);
		//this.mapX = en_pos[int1][0];
		//this.mapY = en_pos[int1][1];
		//var a = new enemy_a(en_pos[int2][0], en_pos[int2][1]);
		//main_stage.push(a);
	
		MC.nextFp += 5;
		main_stage.destroy(this);
	}
	
	this.collide = function(target){
		if (target.is_obstacle == true){
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
				this.destroy();
			}
		}
	}
	
	this.hitbox = {
    	active:false,
    	shape:'rectangle',
    	offsetX:0,
    	offsetY:0,
    	width:this.sprite.width,
    	height:this.sprite.height,
    	col_data: new SAT.Box(new SAT.Vector(this.mapX - 15, this.mapY - 15), this.sprite.width - 30, this.sprite.height - 30)
    }
    
    this.distanceToObject = function(target, offX, offY){
	    var slopeX = target.mapX - this.mapX;
	    if(offX != undefined){
	    	slopeX += offX * 32;
	    }
	    var slopeY = target.mapY - this.mapY;
	    if(offY != undefined){
	    	slopeY += offY * 32;
	    }
	    var distance = Math.sqrt(Math.pow((target.mapX - this.mapX), 2)
								+ Math.pow((target.mapY - this.mapY), 2));
	    return distance;
    }
}


