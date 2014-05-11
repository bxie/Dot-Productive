function init(){
	var MAX_ENERGY = 100.0;
	var TOTAL_TIME = 100.0;

    var stage = new createjs.Stage("demoCanvas");
	var dragger = new createjs.Container();
	var gameTime = TOTAL_TIME;  //set to max time of game, in seconds
	var	prev_time = getTimeInSec(); //time of previous tick
	var score = 0;
	//var energy = Math.random()*MAX_ENERGY/2 + MAX_ENERGY/50;
	var energy = 100;
	var energy_multiplier = 1.0; //At each second, energy drops this amount
	var energy_dist_multiplier = 0.05; //for calculating energy loss from travel distance

	//for gliding
	var is_moving = false;
	var moving_left = false;
	var threshold = 5.0; //to account for noise in the system
	var slope = -1.0;
	var step_size = 10.0;
	var goal = null;

	/*********************************************
	LABELS
	*********************************************/

	//Time Label
	timeLabel = stage.addChild(new createjs.Text("Time: "+prev_time, "14px monospace", "#000"));
	timeLabel.lineHeight = 15;
	timeLabel.textBaseline = "top"
	timeLabel.x = 10;
	timeLabel.y = 10;

	//Energy Label
	energyLabel = stage.addChild(new createjs.Text("Energy: "+energy, "14px monospace", "#000"));
	energyLabel.lineHeight = 15;
	energyLabel.textBaseline = "top"
	energyLabel.x = 180;
	energyLabel.y = 10;

	//Score Label
	scoreLabel = stage.addChild(new createjs.Text("Score: "+score, "14px monospace", "#000"));
	scoreLabel.lineHeight = 15;
	scoreLabel.textBaseline = "top"
	scoreLabel.x = 350;
	scoreLabel.y = 10;

	/*********************************************
	Sprite Data
	*********************************************/

    user_spritedata = {images: ["user32.png"], frames:{width:32, height:32}};
    sleep_spritedata = {images: ["sleep32.png"], frames:{width:32, height:32}};
    work_spritedata = {images: ["linedpaperpencil32.png"], frames:{width:32, height:32}};
    play_spritedata = {images: ["cardgame32.png"], frames:{width:32, height:32}};
    var userSpriteSheet  = new createjs.SpriteSheet(user_spritedata);
    var sleepSpriteSheet  = new createjs.SpriteSheet(sleep_spritedata);
    var workSpriteSheet  = new createjs.SpriteSheet(work_spritedata);
    var playSpriteSheet  = new createjs.SpriteSheet(play_spritedata);

    /*********************************************
	ADDING TASKS
	*********************************************/


    var red1 = createRandomSprite(playSpriteSheet, 1, 0.0, false);
    var red2 = createRandomSprite(playSpriteSheet, 2, 0.0, false);
    var red3 = createRandomSprite(playSpriteSheet, 1.5, 0.0, false);
    var red4 = createRandomSprite(playSpriteSheet, 1, 0.0, false);
    var red5 = createRandomSprite(playSpriteSheet, null, 0.0, false);
    var red6 = createRandomSprite(playSpriteSheet, null, 0.0, false);
    var red7 = createRandomSprite(playSpriteSheet, null, 0.0, false);
    var red8 = createRandomSprite(playSpriteSheet, null, 0.0, false);
    var red9 = createRandomSprite(playSpriteSheet, null, 0.0, false);

    var blk1 = createRandomSprite(workSpriteSheet, null, 0.0, true);
    var blk2 = createRandomSprite(workSpriteSheet, null, 0.0, true);
    var blk3 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk4 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk5 = createRandomSprite(workSpriteSheet, 3, 0.0, true);
    var blk6 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk7 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk8 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk9 = createRandomSprite(workSpriteSheet, 1, 0.0, true);
    var blk10 = createRandomSprite(workSpriteSheet, 1, 0.0, true);

	/*********************************************
	ADDING SHAPES
	*********************************************/


    var rand_x = get_random_location();
    var rand_y = rand_x[1];
    var rand_x = rand_x[0];

    // var red1 = createRandomCircle("red", null, 0.0, false);
    // var red2 = createRandomCircle("red", 25, 0.0, false);
    // var red3 = createRandomCircle("red", null, 0.0, false);
    // var red4 = createRandomCircle("red", null, 0.0, false);
    // var red5 = createRandomCircle("red", 25, 0.0, false);
    // var red6 = createRandomCircle("red", null, 0.0, false);
    // var red7 = createRandomCircle("red", null, 0.0, false);
    // var red8 = createRandomCircle("red", 25, 0.0, false);
    // var red9 = createRandomCircle("red", null, 0.0, false);
    
    // var blk1 = createRandomCircle("black", 25, 0.0, true);
    // var blk2 = createRandomCircle("black", null, 0.0, true);
    // var blk3 = createRandomCircle("black", null, 0.0, true);
    // var blk4 = createRandomCircle("black", null, 0.0, true);
    // var blk5 = createRandomCircle("black", 25, 0.0, true);
    // var blk6 = createRandomCircle("black", 25, 0.0, true);
    // var blk7 = createRandomCircle("black", null, 0.0, true);
    // var blk8 = createRandomCircle("black", null, 0.0, true);
    // var blk9 = createRandomCircle("black", null, 0.0, true);
    // var blk10 = createRandomCircle("black", 25, 0.0, true);
 

    shapes = {
    	r1 : red1,
    	r2 : red2,
    	r3 : red3,
    	r4 : red4,
    	r5 : red5,
    	r6 : red6,
    	r7 : red7,
    	r8 : red8,
    	r9 : red9,
    	b1 : blk1,
    	b2 : blk2,
    	b3 : blk3,
    	b4 : blk4,
    	b5 : blk5,
    	b6 : blk6,
    	b7 : blk7,
    	b8 : blk8,
    	b9 : blk9,
    	b10 : blk10
    };
    // console.log(shapes[1]);

    for(ref in shapes){
    	temp = createClickable(shapes[ref]);
    	stage.addChild(temp);
    }   



    //MOUSE
	stage.mouseMoveOutside = true;

	//Sprite we control
	// var main = createCircle("blue", 30, 40, stage.canvas.height/2);
	// stage.addChild(main);
	var main = createSprite(userSpriteSheet, 40, stage.canvas.height/2);
	stage.addChild(main);

	//end sprite
	// var bed = createCircle("green", 30, stage.canvas.width-40, stage.canvas.height/2);
 	var bed = createSprite(sleepSpriteSheet, stage.canvas.width-40, stage.canvas.height/2);
	var bed_container = new createjs.Container();
	bed_container.addChild(bed);
	bed_container.on("click", function(evt){
		console.log("GAME OVER!");
	});
	stage.addChild(bed);

    stage.update();

    createjs.Ticker.on("tick", tick);
	function tick(event) {
		//handles gliding between objects
		if(is_moving==true && !!goal){
			console.log("is moving and goal");
			if (has_arrived()==true){
				is_moving==false;
				if(goal.timeAlive<0.0001){
					//productive object
					if(goal.isWork==true){
						incrementScore()
						//console.log("GOT A POINT! Now at "+score);
					}
					//energy object
					else{
						//console.log("More Energy!");
						updateEnergy(15);
					}			
				}	
				console.log("About to remove:");
				dragger.removeChild(goal);	
				console.log(goal);
				goal = null;
			}
			else{
				var x_inc = calcXInc();
				var sign = 1.0; //+1 or -1
				if(moving_left==true){sign=-1.0;}
				//console.log("MOVING!"+slope);
				main.x= main.x+sign*x_inc;
				main.y=main.y+sign*x_inc*slope;
			}
		}

		var delta = getTimeInSec() - prev_time;
		prev_time = getTimeInSec();
		gameTime = gameTime - delta;
		energy = (energy - delta) * energy_multiplier;
		timeLabel.text = "Time Left: "+ Math.round(gameTime);
		energyLabel.text = "Energy: "+Math.round(energy);

		stage.update(event);
	};

    //makes a shape clickable
    function createClickable(shape){
		// var dragger = new createjs.Container();
		dragger.addChild(shape);

		dragger.on("click",function(evt){
			is_moving = true;
			//goal = dragger.getObjectUnderPoint();
			goal = evt.target;
			console.log(evt.target.x);
			console.log(goal.x);

			if (main.x > goal.x){ //has to go to left
				moving_left = true;
			}
			else{
				moving_left = false;
			}
			slope = (goal.y-main.y)/(goal.x-main.x); //origin in upper left!

			//console.log(calcDistance(oldX, oldY, main.x, main.y));

			//calculating and updating energy loss from travelling
			// dist = calcDistance(oldX, oldY, main.x, main.y);
			// e_delta = -1.0 * calc_travel_energy(dist);
			// console.log(e_delta);
			// updateEnergy(e_delta);			

			stage.update();
		});

		return dragger;
	}

	//determines if main has reached destination
	function has_arrived(){
		return (Math.abs(main.x - goal.x) < threshold && 
			Math.abs(main.y - goal.y) < threshold)
	}


	//Increase energy by delta
	function updateEnergy(delta){
		energy = energy + delta;
		energyLabel.text = "Energy: "+energy;
		stage.update();
	}

	//adds 1 to score and updates label
	function incrementScore(){
		score = score + 1;
		scoreLabel.text = "Score: "+ score;
		stage.update();
	}

	//Calculates energy loss
	//Energy Loss = (dist)*(energy_dist_multiplier)*(tiredness)
	//tiredness = log(1+MAX_ENERGY-energy)+1
	function calc_travel_energy(dist){
		tiredness = Math.log(1+ (MAX_ENERGY-energy)/MAX_ENERGY)+1; 
		console.log(tiredness);
		return dist * energy_dist_multiplier*tiredness;
	}

	//gets location within canvas
	function get_random_location(){
		var padding = 50; //stay at least 50 px away from each edge
		x = Math.round(Math.random()*(stage.canvas.width-padding*2)+padding);
		y = Math.round(Math.random()*(stage.canvas.height-padding*2)+padding);
		// console.log ([x,y]);
		return [x,y]

	};
	/**
	* Create filled circle with given color, size, at given location
	* color: string with circle color ("red", "black")
	* size: int for radius of circle
	* xPos, yPos: x and y coordinates relative to upper left corner of canvas
	* isProductive: True if dot is productive (gets you score)
	*/
	function createCircle(color, size, xPos, yPos, timeAlive, isProductive){
		var circle = new createjs.Shape();

		//default args
		size = size || 50;
		xPos = xPos || 100;
		yPos = yPos || 100;
		timeAlive = timeAlive || 5.0;

		circle.graphics.beginFill(color).drawCircle(0,0,size);
		circle.x = xPos;
		circle.y = yPos;
		circle.timeAlive = 0.0; //TODO: Change for real game

		if(isProductive){ circle.isWork=true; }
		else{ circle.isWork = false; }
		
		return circle;
	};

	function createSprite(spriteSheet, xPos, yPos, timeAlive, isProductive){
		//default args
		xPos = xPos || 100;
		yPos = yPos || 100;
		timeAlive = timeAlive || 5.0;

		var task = new createjs.Sprite(spriteSheet);
		task.x = xPos;
		task.y = yPos;
		task.timeAlive = 0.0; //TODO: Change for real game

		if(isProductive){ task.isWork=true; }
		else{ task.isWork = false; }

		return task;
	};

	//create circle at random location (with random size?);
	function createRandomCircle(color, size, timeAlive, isProductive){
		var max_size = 80; //max bubble size
		var min_size = 10;
		//default args
		size = size || Math.round(Math.random()*(max_size-min_size)+min_size); //size between 10 and 100
		timeAlive = timeAlive || 5.0;

		rand_coord = get_random_location();
		x = rand_coord[0];
		y = rand_coord[1];
		return createCircle(color, size, x, y, timeAlive, isProductive);
	};

	//create sprite at random location and given scale
	function createRandomSprite(spriteSheet, scale, timeAlive, isProductive){
		var max_scale = 3;
		var min_scale = 0.5;
		scale = scale || Math.round(Math.random()*(max_scale-min_scale)+min_scale);
		
		rand_coord = get_random_location();
		x = rand_coord[0];
		y = rand_coord[1];

		task = createSprite(spriteSheet, x, y, timeAlive, isProductive);
		task.scaleX = scale;
		task.scaleY = scale;

		return task;
	};


	//makes it so travel amount specified by "step_size" variable each time step
	// x_inc = sqrt(step^2 / (1+slope)^2)
	function calcXInc(){
		return Math.sqrt(Math.pow(step_size,2) / (1+Math.pow(slope, 2)));
	};
};

function getTimeInSec(){
	return createjs.Ticker.getTime()/1000
};

//Distance between two coordinates
function calcDistance(startX, startY, endX, endY){
	return Math.sqrt( Math.pow(startX-endX,2) + Math.pow(startY-endY,2) );
}

/**
Next Steps:

X -Figure out how to determine which shapes are being touched (Container.getObjectUnderPoint()...may require all objects to be in same container)
X -Associate scores/attributes with shapes (type associates with points or energy)
X -Energy and time measured (ticker?)
 -Time alive decreases when main and other obj touching
X -Remove obj when no more timeAlive
 -Have "main" hover between points (speed dependent on energy)
X -Point counter
*/