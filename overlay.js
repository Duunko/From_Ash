/**
 * @author Bion719
 */

/* The function creates and manages an overlay with displays the 
 * cooldown of attacks, the fire-point cost and the button used
 * Taking in:
 * x, y
 * sprite
 * 
 *
 */
 
function overlay(x, y, spr, target){
	this.sprite = spr;
	this.sprite.width = 64;
	this.sprite.height = 64;
	
	this.canvasX = x;
	this.canvasY = y;
	
	//create the overlay shade that will be used by the overlay
	//to display the remaining cooldown
	this.shade = new Image();
	this.shade.src = assets["gui_shade"].src;
	this.shade.width = this.sprite.width;
	this.shade.height = this.sprite.height;
	
	this.update = function(){
		
		if(target == "melee"){
			if(MC.fp > MC.meleeCost){
				var theirPer = (MC.meleeCool / MC.meleeCoolMax);
			}
			else{
				var theirPer = 1;
			}
		}
		
		if(target == "dash"){
			if(MC.fp > MC.dashCost){
				var theirPer = (MC.dashCool / MC.dashCoolMax);
			}
			else{
				var theirPer = 1;
			}
		}
		this.shade.height = theirPer * this.sprite.height;
		
		//console.log(this.shade.height + " , "+ theirPer);
		//console.log(MC.meleeCool + " , "+ MC.meleeCoolMax);
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		context.drawImage(this.shade, this.canvasX, this.canvasY, this.shade.width, this.shade.height);
	}
	
}