/**
 * @author Bion719
 */

/* The function fireParticle will create a particle effect every step
 * Taking in:
 * x, y
 * radius
 * time resting
 *
 */
 
function fireParticle(x, y, r, t, use){
	if(use == "dash"){
		this.sprite = new Image();
	    this.sprite.src = assets["mc_dash_ball"].src;
		this.sprite.width = r * 2;
		this.sprite.height = r * 2;
	}
	else {
		this.sprite = new Image();
		this.sprite.src = 'http://people.ucsc.edu/~djchambe/cm120/fireball.png';
		this.sprite.width = r * 2;
		this.sprite.height = r * 2;
	}
	
	this.canvasX = x;
	this.canvasY = y;
	
	this.mapX = toMapX(this.canvasX);
	this.mapY = toMapY(this.canvasY);
	
	this.timer = t;
	
	this.shrinker = this.sprite.width / this.timer;
	console.log("shrinker: "+this.shrinker)
	
	this.update = function(){
		if(this.timer> 0){
			this.timer--;
			this.sprite.width -= this.shrinker;
			this.sprite.height -= this.shrinker;
			this.mapX += this.shrinker / 2;
			this.mapY += this.shrinker / 2;
		}
		else{
			this.destroy();
		}
		
		this.canvasX = toCanvasX(this.mapX);
		this.canvasY = toCanvasY(this.mapY);
	}
	
	this.draw = function(){
		if(use == "dash"){
			context.save();
			context.translate(this.canvasX + this.sprite.width/2, this.canvasY + this.sprite.height/2);
			context.rotate(this.rotateEnemy()*(Math.PI/180) + Math.PI/2);
			context.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2, this.sprite.width, this.sprite.height);
			context.restore();
		}
		else{
			context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		}
	}
	
	this.destroy = function(){
		//console.log(main_stage);
		main_stage.destroy(this);
	}
	
	this.rotateEnemy = function(){
		var tm = angleDeg(MC.particleStartX, MC.particleStartY, MC.particleTargetX, MC.particleTargetY);
		if(tm < 0){
			tm = 360 - (-tm);
		}
		return tm
	}
}