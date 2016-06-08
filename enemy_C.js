/*
 * @author Duunko
 */

function enemy_c(x, y){
	
	this.type = "enemy";
	
	this.sprite = assets["fly"];
	this.sprite.width = 160;
	this.sprite.height = 160;
	
	this.vision_range = 1200;
	
	this.move_direc = 'south';
	this.look_direc = 'south';
	
	this.mapX = x;
	this.mapY = y;
	
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
	
	this.hp = 10;
	
	this.t2 = 0;
	
	var en_pos = [[-50, 0],
					[tiles.WORLD_WIDTH + 50,0],
					[-50,tiles.WORLD_HEIGHT+50],
					[tiles.WORLD_WIDTH + 50, tiles.WORLD_HEIGHT+50]]; 
					
	this.attack_timer = 0;
	this.attack_interval = 120;
	
	this.update = function(){
		
        this.attack_timer++;
		
		if(this.hitbox.active != true){
			var distance = this.distanceToObject(MC);
			if (distance < this.vision_range){
				this.hitbox.active = true;
			}
		}
		
		
		if(this.stunned == false){
			
			if(this.hitbox.active == true){
			    if(this.attack_timer == this.attack_interval){
			    	var bull = new bullet(this.mapX + (this.sprite.width/2), this.mapY + 
			    	                      (this.sprite.height/2), 
			    	                       MC.mapX, MC.mapY, this.distanceToObject(MC));
			    	main_stage.push(bull);
			    	this.attack_timer = 0;
			    }
			    
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
		//rotation and drawing
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
		this.hp = 10;
		var int1 = getRandomInt(0,3);
		var int2 = getRandomInt(0,3);
		this.mapX = en_pos[int1][0];
		this.mapY = en_pos[int1][1];
		
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
			if(this.hp > -1){
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




function bullet(x, y, cx, cy, distance){
	this.type = 'bullet';
	this.sprite = new Image();
	this.depth = 0;
	this.sprite.width = 10;
	this.sprite.height = 10;
	this.mapX = x;
	this.mapY = y;
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.slopeX = (cx - x)/distance;
	this.slopeY = (cy - y)/distance;
	
	this.will_destroy = false;
	this.speed = 2;
    
    this.range = 800;
    this.dist = 0;
	
	this.hitbox = {
    	active:true,
    	shape:'circle',
    	offsetX:0,
    	offsetY:0,
    	width:10,
    	height:10,
    	col_data: new SAT.Circle(new SAT.Vector(this.mapX, this.mapY), 10)
    }
	
	this.update = function(){
		this.mapX += this.slopeX*this.speed;
		this.mapY += this.slopeY*this.speed;
		this.canvasX = toCanvasX(this.mapX);
	   this.canvasY = toCanvasY(this.mapY);
	   this.hitbox.col_data = new SAT.Circle(new SAT.Vector(this.mapX, this.mapY), 10);
	   this.dist += this.speed;
	   if(this.dist > this.range){
	    this.will_destroy = true;
	   }
		if(this.will_destroy == true){
			main_stage.destroy(this);
		}
		
	}
	
	this.draw = function(){
      context.beginPath();
      context.arc(this.canvasX, this.canvasY, 10, 0, 2 * Math.PI, false);
      context.fillStyle = 'white';
      context.fill();
	}
	
	this.collide = function(target){
		if(target.is_obstacle == true){
			main_stage.destroy(this);
		} else if(target == MC){
			this.will_destroy = true;
		}
	}
	
	this.collide_damage = function(){
		
	}
}