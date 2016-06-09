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
 
function fpBar(x, y, width, height){
	this.sprite = assets["hp_back"];
	this.sprite.width = width;
	this.sprite.height = height;
	this.depth = -10000;
	this.canvasX = x;
	this.canvasY = y;
	
	
	//create the overlay shade that will be used by the overlay
	//to display the remaining cooldown
	this.shade = assets["hp_front"];
	this.shade.width = width;
	this.shade.height = height;
	var chunk = 500 / MC.fpReturn;
	var chunk2 = (this.shade.width * chunk)/500;
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		var view = MC.fp*chunk;
		if(view > 500){
			view = 500;
		}
		var view2 = chunk2*MC.fp;
		if(view2 > this.shade.width){
			view2 = this.shade.width;
		}
		
		context.drawImage(this.shade, 0, 0, view, 500, this.canvasX, this.canvasY, view2, this.shade.height);
		context.fillStyle = 'white';
		context.font = "25px Verdana"
		context.fillText(MC.fp, this.canvasX + (this.sprite.width/2) - 10, this.canvasY + (this.sprite.height/2) + 10);
	}
}

function fireBar(x, y, width, height){
	this.sprite = assets["hp_back"];
	this.sprite.width = width;
	this.sprite.height = height;
	this.depth = -10000;
	this.canvasX = x;
	this.canvasY = y;
	
	
	//create the overlay shade that will be used by the overlay
	//to display the remaining cooldown
	this.shade = assets["fp_front"];
	this.shade.width = width;
	this.shade.height = height;
	var chunk = 500 / 100;
	var chunk2 = (this.shade.width * chunk)/500;
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
		var view = MC.nextFp*chunk;
		if(view > 500){
			view = 500;
		}
		var view2 = chunk2*MC.nextFp;
		if(view2 > this.shade.width){
			view2 = this.shade.width;
		}
		
		context.drawImage(this.shade, 0, 0, view, 500, this.canvasX, this.canvasY, view2, this.shade.height);
		context.fillStyle = 'white';
		context.font = "25px Verdana"
		context.fillText(MC.nextFp, this.canvasX + (this.sprite.width/2) - 10, this.canvasY + (this.sprite.height/2) + 10)
	}
	
}

function healthbar(x, y, width, height){
	this.canvasX = x;
	this.canvasY = y;
	this.depth = -1000000;
	this.width = width;
	this.height = height;
	this.mod = 0.125;
	this.chunk = (this.width)/MC.hp;
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		context.fillStyle = 'black';
		context.fillRect(this.canvasX, this.canvasY, this.width, this.height);
		var grd = context.createLinearGradient(this.canvasX, this.canvasY, this.canvasX + this.width, this.canvasY + this.height);
		grd.addColorStop(0, '#D42C0B');
		grd.addColorStop(1, '#D4870B');
		context.fillStyle = grd;
		context.fillRect(this.canvasX, this.canvasY, this.chunk*MC.hp, this.height);
		context.fillStyle = "white";
		context.fillText(MC.hp, this.canvasX + (this.width/2 - 10), this.canvasY + (this.height/2) + 10);
		
	}
	
}
