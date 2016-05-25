/**
 * @author Duunko
 */

/* stage
 * Creates a stage instance that holds all objects on a current game state.
 * Has always_update and always_draw fields that allow for interaction with
 * the draw loop. If the top parameter is passed to the stage it will be drawn
 * over the game underneath it, keeping the previous stage's update loop running.
 * 
 * variables: owned_objects, always_update, always_draw, on_top
 * functions: push, pop, get
 * 
*/
function stage(top) {
    this.owned_objects = [];
    this.push = function(obj) { this.owned_objects.push(obj);}
    this.pop = function() {this.owned_objects.pop();}  
    this.destroy = function(obj) {
    	var i = this.owned_objects.indexOf(obj);
        this.owned_objects.splice(i, 1);
    }
    if(!top){
    	this.on_top = false;
    } else {
        this.on_top = true;
    } 
    this.get = function(obj){
    	return this.owned_objects[this.owned_objects.indexOf(obj)];
    }
    
    this.remove_enemies = function(){
    	var removal_array = [];
    	for(var i = 0; i < this.owned_objects.length; i++){
    		if(this.owned_objects[i].type == "enemy"){
    			removal_array.push(i);
    		}
    	}
    	for(var i = 0; i < removal_array.length; i++){
    		this.owned_objects.splice(removal_array[i], 1);
    		for(var j = 0; j < removal_array.length; j++){
    			removal_array[j] -= 1;
    		}
    	}
    }
    
    this.always_update = true;
    this.always_draw = true;
    
    this.clear = function(){
    	this.owned_objects = [];
    }
    
}

/* make_loop
 * This function is an interface function that allows for renderer
 * to work with intervals while maintaining data encapsulation.
 */

function make_loop(renderer, time){
	setInterval(function(){ game_draw(renderer)}, time);
}
 
 /* renderer
  * This function creates a renderer object that holds the current
  * context, canvas, and stages. Acts as a special container for the
  * purposes of drawing multiple layers of data.
  * 
  * variables: ctx, can, stages, need_sort
  * functions: push, pop
  */
 
function renderer(canvas, context) {
	this.ctx = context;
	this.can = canvas;
	this.stages = [];
	this.need_sort = false;
	this.push = function(obj) { 
		if(this.stages.length != 0){
		    this.stages[this.stages.length - 1].always_update = false;
		    if(obj.on_top == true)  {
			    this.stages[this.stages.length - 1].always_draw = true;
		    } else {
			    this.stages[this.stages.length - 1].always_draw = false;
		    }
		}
		this.stages.push(obj);
	}
    this.pop = function() {
    	this.stages.pop();
    	this.stages[this.stages.length - 1].always_update = true;
    	this.stages[this.stages.length - 1].always_draw = true;
    } 
}

/* game_draw
 * Takes a renderer as an argument and draws the context.
 * Try not to call this function, it will be called in the 
 * game loop.
 * 
 * Objects require two fields to be drawn, update() and draw(). 
 * An optional third "depth" field is also used, and if it is absent
 * depth is set to 0.
 * 
 */

function game_draw(renderer) {
	renderer.ctx.clearRect(0, 0, renderer.can.width, renderer.can.height);
	renderer.ctx.fillStyle = 'white';
	renderer.ctx.fillRect(0, 0, renderer.can.width, renderer.can.height);
	renderer.ctx.fill();
	
	//this draws the tiles to the floor
	
	for(var i = 0; i < renderer.stages.length; i++){
	    if(renderer.stages[i].always_update == true || renderer.stages[i].always_draw == true){
	    	if (renderer.stages[i].owned_objects.indexOf(MC) != -1){
	    		renderer.stages[i].owned_objects[renderer.stages[i].owned_objects.indexOf(MC)].update();
	    	}
		    for (var j = 0; j < renderer.stages[i].owned_objects.length; j++){
		        if(renderer.stages[i].always_update == true){
		        	if(renderer.stages[i].owned_objects[j] != MC){
		        	    renderer.stages[i].owned_objects[j].update();
		        	}
		        }
		       
		    } //For1
		    for(var j = 0; j < renderer.stages[i].owned_objects.length; j++){
		    	if(renderer.stages[i].owned_objects[j].hitbox == undefined){
		    		//console.log(renderer.stages[i].owned_objects[j]);
		    		//console.log("nohitbox");
		    		continue;
		    	}
		    	for(var k = j + 1; k < renderer.stages[i].owned_objects.length; k++){
		    		if(renderer.stages[i].always_update == true){
		    			if(renderer.stages[i].owned_objects[k].hitbox == undefined){
		    				//console.log('nohitbox2');
		    				continue;
		    			}
		    			//console.log('hitbox');
		    	
		    			var check1 = renderer.stages[i].owned_objects[j].hitbox.shape;
		    			var check2 = renderer.stages[i].owned_objects[k].hitbox.shape;
		    		    if (check1 == 'rectangle' && check2 == 'rectangle'){
		    		    	var response = new SAT.Response();
		    		    	var t1 = renderer.stages[i].owned_objects[j].hitbox.col_data.toPolygon();
		    		    	var t2 = renderer.stages[i].owned_objects[k].hitbox.col_data.toPolygon();
					        if(SAT.testPolygonPolygon(t1, t2, response)){
							        renderer.stages[i].owned_objects[j].collide(renderer.stages[i].owned_objects[k]);
							        renderer.stages[i].owned_objects[k].collide(renderer.stages[i].owned_objects[j]);
						        }
						}else if (check1 == 'rectangle' && check2 == 'circle'){
					        var response = new SAT.Response();
					        if(SAT.testPolygonCircle(renderer.stages[i].owned_objects[j].hitbox.col_data.toPolygon(),
						        renderer.stages[i].owned_objects[k].hitbox.col_data, response)){
							        renderer.stages[i].owned_objects[j].collide(renderer.stages[i].owned_objects[k]);
							        renderer.stages[i].owned_objects[k].collide(renderer.stages[i].owned_objects[j]);
						        }
			            }else if (check1 == 'circle' && check2 == 'rectangle'){
					        var response = new SAT.Response();
					        if(SAT.testCirclePolygon(renderer.stages[i].owned_objects[j].hitbox.col_data,
						        renderer.stages[i].owned_objects[k].hitbox.col_data.toPolygon(), response)){
							        renderer.stages[i].owned_objects[j].collide(renderer.stages[i].owned_objects[k]);
							        renderer.stages[i].owned_objects[k].collide(renderer.stages[i].owned_objects[j]);
						        }
				        } 
				        if(renderer.stages[i].owned_objects[j] == MC || renderer.stages[i].owned_objects[k] == MC){
				            if(MC.attack_hitbox != false){
				                if (renderer.stages[i].owned_objects[k].attack_hitbox != undefined){
					                var response = new SAT.Response();
					                if(SAT.testPolygonPolygon(renderer.stages[i].owned_objects[j].hitbox.col_data.toPolygon(),
						                renderer.stages[i].owned_objects[k].attack_hitbox.col_data, response) == true){
							                renderer.stages[i].owned_objects[j].collide_damage(); 
						            }
				                } else if (renderer.stages[i].owned_objects[j].attack_hitbox != undefined){
					                var response = new SAT.Response();
					                //console.log(renderer.stages[i].owned_objects[j].attack_hitbox.col_data);
					                var respo = renderer.stages[i].owned_objects[k].hitbox.col_data;
					                var newpo = new SAT.Box(new SAT.Vector(toCanvasX(respo.pos.x), toCanvasY(respo.pos.y)), 
					                respo.w, respo.h).toPolygon();
					                //console.log(newpo);
					                if(renderer.stages[i].owned_objects[j].attack_hitbox != undefined){                
					                    if(SAT.testPolygonPolygon(renderer.stages[i].owned_objects[j].attack_hitbox.col_data,
						                    newpo, response) == true){
							                    renderer.stages[i].owned_objects[k].collide_damage();
						                }
						            }
						            //console.log(response);
				                }
				            }
				        }
		    	    }
		    	}
		    	
		    } //For2
		    for(var j = 0; j < renderer.stages[i].owned_objects.length; j++){
		    	 if (renderer.stages[i].always_draw == true) {
		        	if(renderer.need_sort == true){
		        	    sort_array(renderer.stages[i].owned_objects);
		        	    renderer.need_sort = false;
		        	}
		        	if (renderer.stages[i].owned_objects[j] != undefined){
		        		if(renderer.stages[i].owned_objects[j].canvasX != undefined && 
		        			renderer.stages[i].owned_objects[j].canvasY != undefined) {
		        				// Check to see if the canvasX of an object is inside the canvas.
		        				if (renderer.stages[i].owned_objects[j].canvasX +
		        					renderer.stages[i].owned_objects[j].sprite.width > 0
		        					||  renderer.stages[i].owned_objects[j].canvasX  < canvas.width){
		        						renderer.stages[i].owned_objects[j].draw();
		        						// Else check canvasY
		        					} else if (renderer.stages[i].owned_objects[j].canvasY +
		        					           renderer.stages[i].owned_objects[j].sprite.height > 0
		        					           ||  renderer.stages[i].owned_objects[j].canvasY  < 
		        					           canvas.height){
		        						   renderer.stages[i].owned_objects[j].draw();
		        					}
		        				
		        			} else {
		        				renderer.stages[i].owned_objects[j].draw();
		        			}
		        	}
		        }
		    } //For3
		
		}
		
	}
	
	
}

/* A comparison function for depth sorting.
 */

function compare_depth(a,b) {
  var dep1 = a.depth;
  if (dep1 == undefined){
      dep1 = 0;
  }
  var dep2 = b.depth;
  if (dep2 == undefined){
      dep2 = 0;
  }
  if (dep1 > dep2)
    return -1;
  else if (dep1 < dep2)
    return 1;
  else 
    return 0;
}
//Sorts array by depth.
function sort_array(input){
    input.sort(compare_depth);	
}
