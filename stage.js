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
    
    this.always_update = true;
    this.always_draw = true;
    
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
	
	onEnterFrame();
	
	for(var i = 0; i < renderer.stages.length; i++){
	    if(renderer.stages[i].always_update == true || renderer.stages[i].always_draw == true){
		    for (var j = 0; j < renderer.stages[i].owned_objects.length; j++){
		        if(renderer.stages[i].always_update == true){
		        	renderer.stages[i].owned_objects[j].update();
		        }
		        if (renderer.stages[i].always_draw == true) {
		        	if(renderer.need_sort == true){
		        	    sort_array(renderer.stages[i].owned_objects);
		        	    renderer.need_sort = false;
		        	}
		        	renderer.stages[i].owned_objects[j].draw();
		        }
		    }
		
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
