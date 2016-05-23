//animations

//array of sprites
//reference to the object it is being called from

//each animated object must have the following variables to work

//image_index
//image_speed_max   (The gap between each image switching to the next in the animation)
//image_speed_counter

function draw_animated_sprite(spr_arr, owner, cX, cY, spr_w, spr_h){
	
	if(owner.image_speed_counter > 0){
		owner.image_speed_counter--;
	}
	else{
		if(owner.image_index < spr_arr.length-1){
			owner.image_index++;
		}
		else{
			owner.image_index = 0;
		}
		
		owner.image_speed_counter = owner.image_speed_max;
	}
	
	context.drawImage(spr_arr[owner.image_index], cX, cY, spr_w, spr_h);
}