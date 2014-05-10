function init(){

    var stage = new createjs.Stage("demoCanvas");
	var is_moving = false;
	var moving_left = false;
	var goalX = -1.0;
	var goalY = -1.0;
	var threshold = 5.0; //to account for noise in the system
	var slope = -1.0;
	var step_size = 5.0;

    //create circle params: color, size, xPos, yPos, timeAlive, isProductive
    var red1 = createCircle("red", 30, 250, 250);    
    var blk1 = createCircle("black", 50, 100, 400);
	var main = createCircle("blue", 30, 40, stage.canvas.height/2);

    shapes = {
    	r1 : red1,
    	b1 : blk1,
    	main: main
    };

    for(ref in shapes){
    	console.log(ref);
    	temp = createClickable(shapes[ref]);
    	stage.addChild(temp);
    }   


    createjs.Ticker.on("tick", tick);
	function tick(event) {
		if(is_moving==true){
			if (has_arrived()==true){
				is_moving==false;
			}
			else{
				var sign = 1.0; //+1 or -1
				if(moving_left==true){sign=-1.0;}
				//console.log("MOVING!"+slope);
				main.x= main.x+sign*step_size;
				main.y=main.y+sign*step_size*slope;
			}
		}

		stage.update(event);
	};


	/**
	* Create filled circle with given color, size, at given location
	* color: string with circle color ("red", "black")
	* size: int for radius of circle
	* xPos, yPos: x and y coordinates relative to upper left corner of canvas
	*/
	function createCircle(color, size, xPos, yPos){
		var circle = new createjs.Shape();

		circle.graphics.beginFill(color).drawCircle(0,0,size);
		circle.x = xPos;
		circle.y = yPos;
		return circle;
	};

	//makes shape clickable
	function createClickable(shape){
		var dragger = new createjs.Container();
		dragger.addChild(shape);

		dragger.on("click", function(evt){
			is_moving = true;
			goalX = evt.target.x;
			goalY = evt.target.y;

			if (main.x > goalX){ //has to go to left
				moving_left = true;
			}
			else{
				moving_left = false;
			}
			slope = (goalY-main.y)/(goalX-main.x); //origin in upper left!
		});
		return dragger;
	};

	//determines if main has reached destination
	function has_arrived(){
		return (Math.abs(main.x - goalX) < threshold && 
			Math.abs(main.y - goalY) < threshold)
	}

	stage.update();
};
