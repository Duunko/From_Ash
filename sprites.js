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
	
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	var mc_give_right_2 = new Image(); mc_give_right_2.src = 'images/theEnd/phoenix_giveright2.png';
	var mc_give_right_3 = new Image(); mc_give_right_3.src = 'images/theEnd/phoenix_giveright3.png';
	
	var mc_give_left_1 = new Image(); mc_give_left_1.src = 'images/theEnd/phoenix_giveleft1.png';
	var mc_give_left_2 = new Image(); mc_give_left_2.src = 'images/theEnd/phoenix_giveleft2.png';
	var mc_give_left_3 = new Image(); mc_give_left_3.src = 'images/theEnd/phoenix_giveleft3.png';
	
	/*
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	var mc_give_right_1 = new Image(); mc_give_right_1.src = 'images/theEnd/phoenix_giveright1.png';
	*/
	var mc_dash_ball = new Image(); mc_dash_ball.src = 'images/dash/dash.png';
	var mc_dash_right = new Image(); mc_dash_right.src = 'images/dash/phoenix_dash_right.png';
	var mc_dash_left = new Image(); mc_dash_left.src = 'images/dash/phoenix_dash_left.png';
	var mc_dash_down = new Image(); mc_dash_down.src = 'images/dash/phoenix_dash_down.png';
	var mc_dash_up = new Image(); mc_dash_up.src = 'images/dash/phoenix_dash_up.png';
	
	var hp_back = new Image(); hp_back.src = 'images/gui/feather_healthbar1.png';
	var hp_front = new Image(); hp_front.src = 'images/gui/feather_healthbar2.png';
	var fp_front = new Image(); fp_front.src = 'images/gui/firepower_hb.png';
	
	var credits = new Image(); credits.src = 'images/Credits.png';
	
	
	var sScorpion = new Image();
	sScorpion.src = 'images/enemies/seascorpion.png';
	var sScorpionFlash = new Image(); sScorpionFlash.src = 'images/enemies/seascorpion_flash.png';
	
	var fly = new Image();
	fly.src = 'images/enemies/fly.png'
	var fly_flash = new Image(); fly_flash.src = 'images/enemies/fly_flash.png';
	
	var centipede = new Image();
	centipede.src = 'images/enemies/decay.png';
	var centipede_flash = new Image(); centipede_flash.src = 'images/enemies/decay_flash.png';

	var gui_dash = new Image();
	gui_dash.src = 'images/gui/dash_overlay.png';
	var gui_melee = new Image();
	gui_melee.src = 'images/gui/melee_overlay.png';
	
	var gui_e = new Image();
	gui_e.src = 'images/gui/pass_on_gui.png';
	var gui_r = new Image();
	gui_r.src = 'images/gui/inherit_gui.png';

	var enviro_tree_1 = new Image(); enviro_tree_1.src = 'images/environment/treestump_nest1.png';
	var enviro_tree_2 = new Image(); enviro_tree_2.src = 'images/environment/treestump_nest2.png';
	var enviro_tree_3 = new Image(); enviro_tree_3.src = 'images/environment/treestump_nest3.png';
	var enviro_tree_4 = new Image(); enviro_tree_4.src = 'images/environment/treestump_nest4.png';
	
	//the end stuff
	var end_tree_1 = new Image(); end_tree_1.src = 'images/theEnd/collectivepotential.png';
	var end_tree_2 = new Image(); end_tree_2.src = 'images/theEnd/collectivepotential_1.png';
	var end_tree_3 = new Image(); end_tree_3.src = 'images/theEnd/collectivepotential_2.png';
	var end_tree_4 = new Image(); end_tree_4.src = 'images/theEnd/collectivepotential_3.png';
	
	var sky = new Image(); sky.src = 'images/theEnd/sky.png';
	
	var sun_1 = new Image(); sun_1.src = 'images/theEnd/phoenix_sun1.png';
	var sun_2 = new Image(); sun_2.src = 'images/theEnd/phoenix_sun2.png';
	var sun_3 = new Image(); sun_3.src = 'images/theEnd/phoenix_sun3.png';
	
	var earth = new Image(); earth.src = 'images/theEnd/phoenix_earth.png';

	var gui_shade = new Image();
	gui_shade.src = 'images/gui/overlay_cover.png';

	var tile_ash = new Image();
	tile_ash.src = 'images/environment/ash_tile.png';
	
	var tile_branch = new Image();
	tile_branch.src = 'images/environment/branch_tile.png';
	
	var tile_skull = new Image();
	tile_skull.src = 'images/environment/skull_tile.png';
	
	var tile_ribs = new Image();
	tile_ribs.src = 'images/environment/ribs_tile.png';
	
	var enviro_rock = new Image();
	enviro_rock.src = 'images/environment/rock_tile.png';
	
	var door_open = new Image();
	door_open.src = 'images/environment/gate_2.png';
	var door_closed = new Image();
	door_closed.src = 'images/environment/gate.png';
	
	var wasd = new Image();
	wasd.src = 'images/gui/wasd.png';
	var mouse = new Image();
	mouse.src = 'images/gui/mouse.png';
	var gui_dock = new Image(); gui_dock.src = 'images/gui/Gui_dock.png'

	var black_square = new Image();
	black_square.src = 'images/black_square.png';
	var black_square2 = new Image();
	black_square2.src = 'images/black_square2.png';
	
	var lives = new Image(); lives.src = 'images/gui/lives.png';
	var cross = new Image(); cross.src = 'images/gui/cross.png';
	
	var text1 = new Image(); text1.src = 'images/text/text1.png';
	var text2 = new Image(); text2.src = 'images/text/text2.png';
	var text3 = new Image(); text3.src = 'images/text/text3.png';
	var text4 = new Image(); text4.src = 'images/text/text4.png';
	var text5 = new Image(); text5.src = 'images/text/text5.png';
	var text6 = new Image(); text6.src = 'images/text/text6.png';
	var text7 = new Image(); text7.src = 'images/text/text7.png';
	var text8 = new Image(); text8.src = 'images/text/text8.png';
	
	var melee_flame = new Image(); melee_flame.src = 'images/melee_flame.png';
	
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
		
		mc_give_left_1: mc_give_left_1,
		mc_give_left_2: mc_give_left_2,
		mc_give_left_3: mc_give_left_3,
		
		mc_give_right_1: mc_give_right_1,
		mc_give_right_2: mc_give_right_2,
		mc_give_right_3: mc_give_right_3,
		
		sScorpion: sScorpion,
		fly: fly,
		centipede:centipede,
		
		gui_dash: gui_dash,
		gui_melee: gui_melee,
		gui_shade: gui_shade,
		
		gui_e: gui_e,
		gui_r: gui_r,
		
		enviro_tree_1: enviro_tree_1,
		enviro_tree_2: enviro_tree_2,
		enviro_tree_3: enviro_tree_3,
		enviro_tree_4: enviro_tree_4,
		
		end_tree_1: end_tree_1,
		end_tree_2: end_tree_2,
		end_tree_3: end_tree_3,
		end_tree_4: end_tree_4,
		
		sky: sky,
		
		sun_1: sun_1,
		sun_2: sun_2,
		sun_3: sun_3,
		
		earth: earth,
		
		door_open: door_open,
		door_closed: door_closed,
		
		enviro_rock: enviro_rock,
		tile_ash: tile_ash,
		tile_branch: tile_branch,
		tile_ribs: tile_ribs,
		tile_skull: tile_skull,
		black_square: black_square,
		black_square2: black_square2,
		
		wasd: wasd,
		mouse: mouse,
		
		hp_front:hp_front,
		hp_back:hp_back,
		fp_front:fp_front,
		
		credits:credits,
		
		gui_dock:gui_dock,
		
		lives:lives,
		cross:cross,
		
		text1:text1,
		text2:text2,
		text3:text3,
		text4:text4,
		text5:text5,
		text6:text6,
		text7:text7,
		text8:text8,
		melee_flame:melee_flame,
		
		fly_flash:fly_flash,
		centipede_flash:centipede_flash,
		sScorpionFlash:sScorpionFlash
		
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