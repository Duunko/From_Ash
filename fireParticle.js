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
 
function fireParticle(x, y, r, t){
	this.sprite = new Image();
	this.sprite.src = 'http://people.ucsc.edu/~djchambe/cm120/fireball.png';
	this.sprite.width = r * 2;
	this.sprite.height = r * 2;
	
	this.mapX = x;
	this.mapY = y;
	
	this.canvasX = toCanvasX(this.mapX);
	this.canvasY = toCanvasY(this.mapY);
	
	this.timer = t;
	
	this.shrinker = this.sprite.width / this.timer;
	
	this.update = function(){
		if(this.timer> 0){
			this.timer--;
			this.sprite.width -= this.shrinker;
			this.sprite.height -= this.shrinker;
		}
		else{
			this.destroy();
		}
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
	
	this.destroy = function(){
		//console.log(main_stage);
		var i = main_stage.owned_objects.indexOf(this);
		main_stage.owned_objects.splice(i, 1);
	}
}