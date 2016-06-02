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
	
	var mc_death_1 = new Image(); mc_death_1.src = 'images/death/phoenix_death1.png';
	var mc_death_2 = new Image(); mc_death_2.src = 'images/death/phoenix_death2.png';
	var mc_death_3 = new Image(); mc_death_3.src = 'images/death/phoenix_death3.png';
	var mc_death_4 = new Image(); mc_death_4.src = 'images/death/phoenix_death4.png';
	var mc_death_5 = new Image(); mc_death_5.src = 'images/death/phoenix_death5.png';
	var mc_death_6 = new Image(); mc_death_6.src = 'images/death/phoenix_death6.png';
	var mc_death_7 = new Image(); mc_death_7.src = 'images/death/phoenix_death7.png';
	var mc_death_8 = new Image(); mc_death_8.src = 'images/death/phoenix_death8.png';
	
	var mc_upgrade_1 = new Image(); mc_upgrade_1.src = 'images/upgrade/phoenix_upgrade1.png';
	var mc_upgrade_2 = new Image(); mc_upgrade_2.src = 'images/upgrade/phoenix_upgrade2.png';
	var mc_upgrade_3 = new Image(); mc_upgrade_3.src = 'images/upgrade/phoenix_upgrade3.png';
	var mc_upgrade_4 = new Image(); mc_upgrade_4.src = 'images/upgrade/phoenix_upgrade4.png';
	var mc_upgrade_5 = new Image(); mc_upgrade_5.src = 'images/upgrade/phoenix_upgrade5.png';
	var mc_upgrade_6 = new Image(); mc_upgrade_6.src = 'images/upgrade/phoenix_upgrade6.png';
	var mc_upgrade_7 = new Image(); mc_upgrade_7.src = 'images/upgrade/phoenix_upgrade7.png';
	var mc_upgrade_8 = new Image(); mc_upgrade_8.src = 'images/upgrade/phoenix_upgrade8.png';
	var mc_upgrade_9 = new Image(); mc_upgrade_9.src = 'images/upgrade/phoenix_upgrade9.png';
	var mc_upgrade_10 = new Image(); mc_upgrade_10.src = 'images/upgrade/phoenix_upgrade10.png';
	
	var mc_dash_ball = new Image(); mc_dash_ball.src = 'images/dash/dash.png';
	var mc_dash_right = new Image(); mc_dash_right.src = 'images/dash/phoenix_dash_right.png';
	var mc_dash_left = new Image(); mc_dash_left.src = 'images/dash/phoenix_dash_left.png';
	var mc_dash_down = new Image(); mc_dash_down.src = 'images/dash/phoenix_dash_down.png';
	var mc_dash_up = new Image(); mc_dash_up.src = 'images/dash/phoenix_dash_up.png';
	
	
	var sScorpion = new Image();
	sScorpion.src = 'images/enemies/seascorpion.png';
	
	var fly = new Image();
	fly.src = 'images/enemies/fly.png'

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
	
	var enviro_rock = new Image();
	enviro_rock.src = 'images/environment/rock.png';

	var black_square = new Image();
	black_square.src = 'images/black_square.png';
	
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
		
		mc_death_1: mc_death_1,
		mc_death_2: mc_death_2,
		mc_death_3: mc_death_3,
		mc_death_4: mc_death_4,
		mc_death_5: mc_death_5,
		mc_death_6: mc_death_6,
		mc_death_7: mc_death_7,
		mc_death_8: mc_death_8,
		
		mc_upgrade_1: mc_upgrade_1,
		mc_upgrade_2: mc_upgrade_2,
		mc_upgrade_3: mc_upgrade_3,
		mc_upgrade_4: mc_upgrade_4,
		mc_upgrade_5: mc_upgrade_5,
		mc_upgrade_6: mc_upgrade_6,
		mc_upgrade_7: mc_upgrade_7,
		mc_upgrade_8: mc_upgrade_8,
		mc_upgrade_9: mc_upgrade_9,
		mc_upgrade_10: mc_upgrade_10,
		
		mc_dash_ball: mc_dash_ball,
		mc_dash_right: mc_dash_right,
		mc_dash_left: mc_dash_left,
		mc_dash_down: mc_dash_down,
		mc_dash_up: mc_dash_up,
		
		sScorpion: sScorpion,
		fly: fly,
		
		gui_dash: gui_dash,
		gui_melee: gui_melee,
		gui_shade: gui_shade,
		
		enviro_tree: enviro_tree,
		enviro_rock: enviro_rock,
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
	
	var loaded_imgs = 0;
	
	for (var property in assets) {
		if (assets.hasOwnProperty(property)) {
			assets[property].onload = function () {
				console.log("image loaded");
				loaded_imgs++;
				if (loaded_imgs == count){
					console.log("all images loaded");
					//start_game();
					LS.loaded();
				}
			}
		}
	}
}