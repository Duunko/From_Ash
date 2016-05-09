/**
 * @author Duunko
 */

/* Basic character object
 * This is the object for the main character. Contains a sprite,
 * fire point value, hit point value, directional data (for bookeeping),
 * x and y coordiantes, and an update and draw method. 
 * 
 * Also contains an attack() and special() method that are unimpelemented.
 * 
 */

function main_character(x, y) {
	this.sprite = new Image();
	this.sprite.src = 'https://image.freepik.com/free-icon/arrow-bold-down--ios-7-interface-symbol_318-34310.png'
	
	this.fp = 40;
	this.hp = 40;
	this.move_direc = 'south';
	this.look_direc = {x:0, y:0};
	this.x = x;
	this.y = y;
	
	this.update = function(){
		if (keysPressed[RIGHT_KEY_CODE] == true) {
         this.x += 2;
       }
       if (keysPressed[LEFT_KEY_CODE] == true) {
          this.x -= 2;
       }
       if (keysPressed[DOWN_KEY_CODE] == true) {
         this.y += 2;
       }
       if (keysPressed[UP_KEY_CODE] == true) {
         this.y -= 2;
       }
	}
	
    this.draw = function() {
    	context.drawImage(this.sprite, this.x, this.y, 40, 40);
    }
    
    this.attack = function(){
    	
    }
    this.special = function(param){
    	
    }
	
	
}