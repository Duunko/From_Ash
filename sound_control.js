/**
 * @author Duunko
 */
function sound_control(){
	this.depth = -1000000;
    
	this.battle = new Howl({
        urls: ['music/battle.ogg'],
        loop: true,
        volume: 0.5
    });
	
	this.theme = new Howl({
        urls: ['music/theme_p1.ogg'],
        loop: true,
        volume: 0.5
    });
	
	this.death = new Howl({
        urls: ['music/death.ogg'],
        loop: false,
        volume: 0.5
    });
	
	this.fire = new Howl({
        urls: ['music/fire.mp3'],
        loop: false,
        volume: 0.5
    });
	
	this.hit_enemy = new Howl({
        urls: ['music/hit_enemy.ogg'],
        loop: false,
        volume: 0.5
    });
    
    this.update = function(){
    	
    }
    this.draw = function(){
    	
    }
	this.switch = function(){
		
	}
    
    this.destroy = function(){
    	this.battle.stop();
    }
}