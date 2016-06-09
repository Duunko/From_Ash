/**
 * @author Duunko
 */

function credits(c_stage){
	this.sprite = assets['credits'];
	this.canvasX = 0;
	this.canvasY = 0;
	this.sprite.width = canvas.width;
	this.sprite.height = canvas.height;
	
	this.update = function(){
		if(anyKeyPress == true){
			c_stage.will_destroy = true;
		}
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
	
}
