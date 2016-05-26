/* Author BION719 */


function load_sprites(){
	
	var mc_up_1 = new Image();  mc_up_1.src = 'images/walk_top/phoenix_away1.png';
	var mc_up_2 = new Image();  mc_up_2.src = 'images/walk_top/phoenix_away2.png';
	var mc_up_3 = new Image();  mc_up_3.src = 'images/walk_top/phoenix_away3.png';

	var mc_down_1 = new Image();  mc_down_1.src = 'images/walk_down/phoenix_walkforward1.png';
	var mc_down_2 = new Image();  mc_down_2.src = 'images/walk_down/phoenix_walkforward2.png';
	var mc_down_3 = new Image();  mc_down_3.src = 'images/walk_down/phoenix_walkforward3.png';

	var mc_right_1 = new Image();  mc_right_1.src = 'images/walk_right/phoenix_walkright1.png';
	var mc_right_2 = new Image();  mc_right_2.src = 'images/walk_right/phoenix_walkright2.png';
	var mc_right_3 = new Image();  mc_right_3.src = 'images/walk_right/phoenix_walkright3.png';

	var mc_left_1 = new Image();  mc_left_1.src = 'images/walk_left/phoenix_walkleft1.png';
	var mc_left_2 = new Image();  mc_left_2.src = 'images/walk_left/phoenix_walkleft2.png';
	var mc_left_3 = new Image();  mc_left_3.src = 'images/walk_left/phoenix_walkleft3.png';

	var mc_melee_left_1 = new Image();  mc_melee_left_1.src = 'images/melee_left/phoenix_leftmelee1.png';
	var mc_melee_left_2 = new Image();  mc_melee_left_2.src = 'images/melee_left/phoenix_leftmelee2.png';
	var mc_melee_left_3 = new Image();  mc_melee_left_3.src = 'images/melee_left/phoenix_leftmelee3.png';
	var mc_melee_left_4 = new Image();  mc_melee_left_4.src = 'images/melee_left/phoenix_leftmelee4.png';

	var mc_melee_right_1 = new Image();  mc_melee_right_1.src = 'images/melee_right/phoenix_rightmelee1.png';
	var mc_melee_right_2 = new Image();  mc_melee_right_2.src = 'images/melee_right/phoenix_rightmelee2.png';
	var mc_melee_right_3 = new Image();  mc_melee_right_3.src = 'images/melee_right/phoenix_rightmelee3.png';
	var mc_melee_right_4 = new Image();  mc_melee_right_4.src = 'images/melee_right/phoenix_rightmelee4.png';

	var mc_melee_up_1 = new Image();  mc_melee_up_1.src = 'images/melee_top/phoenix_backmelee1.png';
	var mc_melee_up_2 = new Image();  mc_melee_up_2.src = 'images/melee_top/phoenix_backmelee2.png';
	var mc_melee_up_3 = new Image();  mc_melee_up_3.src = 'images/melee_top/phoenix_backmelee3.png';
	var mc_melee_up_4 = new Image();  mc_melee_up_4.src = 'images/melee_top/phoenix_backmelee4.png';

	var mc_melee_down_1 = new Image();  mc_melee_down_1.src = 'images/melee_down/phoenix_melee1.png';
	var mc_melee_down_2 = new Image();  mc_melee_down_2.src = 'images/melee_down/phoenix_melee2.png';
	var mc_melee_down_3 = new Image();  mc_melee_down_3.src = 'images/melee_down/phoenix_melee3.png';
	var mc_melee_down_4 = new Image();  mc_melee_down_4.src = 'images/melee_down/phoenix_melee4.png';

	var sScorpion = new Image();
	sScorpion.src = 'images/enemies/seascorpion.png';

	var gui_dash = new Image();
	gui_dash.src = 'images/gui/dash_overlay.png';
	var gui_melee = new Image();
	gui_melee.src = 'images/gui/melee_overlay.png';

	var enviro_tree = new Image();
	enviro_tree.src = 'images/environment/treestump_nest1.png';

	var gui_shade = new Image();
	gui_shade.src = 'images/gui/overlay_cover.png';

	var tile_ash = new Image();
	tile_ash.src = 'images/environment/ash_tile.png';

	var black_square = new Image();
	black_square.src = 'images/black_square.png';

	assets2.push(mc_up_1);     //0
	
	assets = {
		mc_up_1: mc_up_1,
		mc_up_2: mc_up_2,
		mc_up_3: mc_up_3,
		mc_down_1: mc_down_1,
		mc_down_2: mc_down_2,
		mc_down_3: mc_down_3,
		mc_right_1: mc_right_1,
		mc_right_2: mc_right_2,
		mc_right_3: mc_right_3,
		mc_left_1: mc_left_1,
		mc_left_2: mc_left_2,
		mc_left_3: mc_left_3,
		
		mc_melee_down_1: mc_melee_down_1,
		mc_melee_down_2: mc_melee_down_2,
		mc_melee_down_3: mc_melee_down_3,
		mc_melee_down_4: mc_melee_down_4,
		mc_melee_left_1: mc_melee_left_1,
		mc_melee_left_2: mc_melee_left_2,
		mc_melee_left_3: mc_melee_left_3,
		mc_melee_left_4: mc_melee_left_4,
		mc_melee_right_1: mc_melee_right_1,
		mc_melee_right_2: mc_melee_right_2,
		mc_melee_right_3: mc_melee_right_3,
		mc_melee_right_4: mc_melee_right_4,
		mc_melee_up_1: mc_melee_up_1,
		mc_melee_up_2: mc_melee_up_2,
		mc_melee_up_3: mc_melee_up_3,
		mc_melee_up_4: mc_melee_up_4,
		
		sScorpion: sScorpion,
		
		gui_dash: gui_dash,
		gui_melee: gui_melee,
		gui_shade: gui_shade,
		
		enviro_tree: enviro_tree,
		tile_ash: tile_ash,
		black_square: black_square,
	}
	
	var count = 0;
	
	for (var property in assets) {
		if (assets.hasOwnProperty(property)) {
			count++;
		}
	}
	console.log(count + " sprites to load");
	
	var loaded = 0;
	
	for (var property in assets) {
		if (assets.hasOwnProperty(property)) {
			assets[property].onload = function () {
				console.log("image loaded");
				loaded++;
				if (loaded == count){
					console.log("all images loaded");
				}
			}
		}
	}
}