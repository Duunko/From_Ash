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


function anim(){
	var args = arguments;
	this.sprite = args[0];
	console.log(this.sprite);
	var c_arg = 0;
	this.canvasX = 0;
	this.canvasY = 0;
	this.sprite.width = canvas.width;
	this.sprite.height = canvas.height;
	this.lastAlpha = 0;
	this.alphaInc = 0.025;
	console.log(renderer.stages);
	var keypresstimer = 15;
	
	this.update = function(c_stage){
		if(this.lastAlpha < 1){
			this.lastAlpha += this.alphaInc;
		}
		keypresstimer++;
		if(anyKeyPress == true){
			if(keypresstimer >= 15){
			    c_arg++;
			    if(c_arg >= args.length){
				    over.will_destroy = true;
			    } else {
				    this.sprite = args[c_arg];
				    this.lastAlpha = 0;
			    }
			    keypresstimer = 0;
			} 
		}
	}
	
	this.draw = function(){
        context.globalAlpha = this.lastAlpha;
		context.drawImage(this.sprite, this.canvasX, this.canvasY, this.sprite.width, this.sprite.height);
	    context.globalAlpha = 1;
	}
}
