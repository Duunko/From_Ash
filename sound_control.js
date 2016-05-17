/**
 * @author Duunko
 */
function sound_control(){
	this.depth = -1000000;
	this.loaded = false;
    var sound = new Howl({
        urls: ['music/battle.ogg'],
        loop: true,
        volume: 0.5
    });
    
    this.update = function(){
    	if (this.loaded == false){
    		sound.play();
    		this.loaded = true;
    	}
    }
    this.draw = function(){
    	
    }
    
    this.destroy = function(){
    	sound.stop();
    }
}