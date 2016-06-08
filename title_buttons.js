/**
 * @author Duunko
 */

function title_button(x,y, width, height, which){
	this.canvasX = x;
	this.canvasY = y;
	this.type = which;
	if(which == 1){
		this.sprite = new Image(); this.sprite.src = 'images/gui/title_button.png';
	} else if(which == 2){
	    this.sprite = new Image(); this.sprite.src = 'images/gui/Title_button_2.png';
	} 
	this.sprite.width = width;
	this.sprite.height = height;
	this.col_data = new SAT.Box(new SAT.Vector(x, y), width, height);
	
	this.update = function(){
		
	}
	
	this.draw = function(){
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	}
}
