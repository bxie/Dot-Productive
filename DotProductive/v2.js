function init(){
	var MAX_ENERGY = 50.0;
	var TOTAL_TIME = 45.0;

    var stage = new createjs.Stage("demoCanvas");
	var dragger = new createjs.Container();
	var gameTime = TOTAL_TIME;  //set to max time of game, in seconds
	var	prev_time = getTimeInSec(); //time of previous tick
	var score = 0;
	//var energy = Math.random()*MAX_ENERGY/2 + MAX_ENERGY/50;
	var energy = 75;
	var energy_multiplier = 1.5; //At each second, energy drops this amount
	var energy_dist_multiplier = 0.05; //for calculating energy loss from travel distance

	//for gliding
	var is_moving = false;
	var moving_left = false;
	var threshold = 5.0; //to account for noise in the system
	var slope = -1.0;
	var step_size = 10.0;
	var goal = null;

	var end_game = false; //true if bed clicked on
	var time_alive_inc = 0.1; //must be >0
	var scale_factor = 0.4 // between 0 and 1 not inclusive

	/*********************************************
	LABELS
	*********************************************/

	//Time Label
	timeLabel = stage.addChild(new createjs.Text("Time Left: "+prev_time, "18px verdana", "#000"));
	timeLabel.lineHeight = 15;
	timeLabel.textBaseline = "top"
	timeLabel.x = 10;
	timeLabel.y = 10;

	//Energy Label
	energyLabel = stage.addChild(new createjs.Text("Energy: "+energy, "18px verdana", "#000"));
	energyLabel.lineHeight = 15;
	energyLabel.textBaseline = "top"
	energyLabel.x = 180;
	energyLabel.y = 10;

	//Score Label
	scoreLabel = stage.addChild(new createjs.Text("Score: "+score, "18px verdana", "#000"));
	scoreLabel.lineHeight = 15;
	scoreLabel.textBaseline = "top"
	scoreLabel.x = 350;
	scoreLabel.y = 10;

	user_spritedata = {images: ["user32.png"], frames:{width:32, height:32},
		animations: {user:0}};
    sleep_spritedata = {images: ["sleep32.png"], frames:{width:32, height:32},
		animations: {sleep:0}};
    work_spritedata = {images: ["work.jpg"], frames:{width:100, height:100},
		animations: {econ:0, speech:1, hw:2, essay:3, pset:4, preso:5, pset2:6, thing:7, email:8, project:9}};
    play_spritedata = {images: ["fun.jpg"], frames:{width:100, height:100},
		animations: {concert:0, travel:1, shop:2, game:3, date:4, coffee:5, party:6}};
    var userSpriteSheet  = new createjs.SpriteSheet(user_spritedata);
    var sleepSpriteSheet  = new createjs.SpriteSheet(sleep_spritedata);
    var workSpriteSheet  = new createjs.SpriteSheet(work_spritedata);
    var playSpriteSheet  = new createjs.SpriteSheet(play_spritedata);

    /*********************************************
	ADDING TASKS
	*********************************************/


    var red1 = createRandomSprite(playSpriteSheet, "party", null, 0.0, false);
    var red2 = createRandomSprite(playSpriteSheet,"shop", null, 0.0, false);
    var red3 = createRandomSprite(playSpriteSheet,"concert", null, 0.0, false);
    var red4 = createRandomSprite(playSpriteSheet,"travel", null, 0.0, false);
    var red5 = createRandomSprite(playSpriteSheet,"game", null, 0.0, false);
    var red6 = createRandomSprite(playSpriteSheet,"game", null, 0.0, false);
    var red7 = createRandomSprite(playSpriteSheet,"date", null, 0.0, false);
    var red8 = createRandomSprite(playSpriteSheet,"coffee", null, 0.0, false);
    var red9 = createRandomSprite(playSpriteSheet,"party", null, 0.0, false);

    var blk1 = createRandomSprite(workSpriteSheet, "hw", null, 0.0, true);
    var blk2 = createRandomSprite(workSpriteSheet, "pset",null, 0.0, true);
    var blk3 = createRandomSprite(workSpriteSheet, "essay",null, 0.0, true);
    var blk4 = createRandomSprite(workSpriteSheet, "email",null, 0.0, true);
    var blk5 = createRandomSprite(workSpriteSheet, "project",null, 0.0, true);
    var blk6 = createRandomSprite(workSpriteSheet, "pset2",null, 0.0, true);
    var blk7 = createRandomSprite(workSpriteSheet, "email",null, 0.0, true);
    var blk8 = createRandomSprite(workSpriteSheet, "email",null, 0.0, true);
    var blk9 = createRandomSprite(workSpriteSheet, "email",null, 0.0, true);
    var blk10 = createRandomSprite(workSpriteSheet, "preso",null, 0.0, true);


 

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
	var main = createSprite(userSpriteSheet, "user", 40, stage.canvas.height/2);
	main.alpha = 0.5;
	stage.addChild(main);

	//end sprite
 	var bed = createSprite(sleepSpriteSheet, "sleep", stage.canvas.width-40, stage.canvas.height/2);
	var bed_container = new createjs.Container();
	bed_container.addChild(bed);

	var bed_container = new createjs.Container();
	bed_container.addChild(bed);
	bed_container.on("click", function(evt){
		console.log("Clicked on end!");
		is_moving = true;
			//goal = dragger.getObjectUnderPoint();
			goal = evt.target;
			goal.timeAlive = 0.0;
			console.log(evt.target.x);
			console.log(goal.x);

			if (main.x > goal.x){ //has to go to left
				moving_left = true;
			}
			else{
				moving_left = false;
			}
			slope = (goal.y-main.y)/(goal.x-main.x); //origin in upper left!

			stage.update();

		end_game = true;
	});
	stage.addChild(bed_container);

    stage.update();

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setPaused(false);
	
	//called every time step
	function tick(event) {
		//console.log(createjs.Ticker.getPaused());

		//paused if game ends (get to bed, out of energy, time)
		if(createjs.Ticker.getPaused()==false){ // replace with createjs.Ticker.getPaused()==true
			//ensures time and energy are both > 0, trigger end game
			//console.log(prev_time);
			if(energy<0.0 || prev_time>TOTAL_TIME){
				console.log("OUT OF TIME OR ENERGY!");
				scoreLabel.text = "Score: "+ score + "     ~OUT OF TIME OR ENERGY!~";
				stage.update();
				createjs.Ticker.setPaused(true)
			}

			//handles gliding between objects
			if(is_moving==true && !!goal){
				//console.log("is moving and goal");
				//at goal object. updates points or energy
				if(has_arrived()==true){
					is_moving==false;
					if(goal.timeAlive<0.5){
						//productive object
						if(goal.isWork==true){
							incrementScore()
							//console.log("GOT A POINT! Now at "+score);
						}
						//energy object
						else{
							//console.log("More Energy!");
							//updateEnergy(15);
						}
						//console.log("About to remove:");
						dragger.removeChild(goal);	
						goal = null;			
					}
					else{
						console.log("shrinking!");
						if(goal.isWork){
							updateEnergy(-1);
						}
						else{
							updateEnergy(1.5)
						}
						goal.timeAlive -= time_alive_inc;
						goal.scaleX=goal.timeAlive;
						goal.scaleY=goal.timeAlive;
					}	
				}	
				//calculate travel direction
				else{
					var x_inc = calcXInc();
					var sign = 1.0; //+1 or -1
					if(moving_left==true){sign=-1.0;}
					//console.log("MOVING!"+slope);
					main.x= main.x+sign*x_inc;
					main.y=main.y+sign*x_inc*slope;
				}
			}
			//end game: if main has arrived at bed 
			if(end_game && goal==null){
				scoreLabel.text = "Final Score: "+ score + "   Good Night!";
				stage.update();
				createjs.Ticker.setPaused(true);
			}

			var delta = getTimeInSec() - prev_time;
			prev_time = getTimeInSec();
			gameTime = gameTime - delta;
			energy = energy - delta*energy_multiplier;
			timeLabel.text = "Time Left: "+ Math.round(gameTime);
			energyLabel.text = "Energy: "+Math.round(energy);

			stage.update(event);
		}
	};

    //makes a shape clickable
    function createClickable(shape){
		// var dragger = new createjs.Container();
		dragger.addChild(shape);

		dragger.on("click",function(evt){
			end_game=false; //fix bug where game ends when click on bed then click away
			is_moving = true;
			//goal = dragger.getObjectUnderPoint();
			goal = evt.target;
			//console.log(evt.target);
			//console.log(goal.x);

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
		energy = Math.min(MAX_ENERGY, energy + delta); //energy never exceeds max
		energyLabel.text = "Energy: "+energy;
		stage.update();
	}

	//adds 1 to score and updates label
	function incrementScore(){
		score = score + 1;
		scoreLabel.text = "Score: "+ score;
		stage.update();
	}


	// //Calculates energy loss
	// //Energy Loss = (dist)*(energy_dist_multiplier)*(tiredness)
	// //tiredness = log(1+MAX_ENERGY-energy)+1
	// function calc_travel_energy(dist){
	// 	tiredness = Math.log(1+ (MAX_ENERGY-energy)/MAX_ENERGY)+1; 
	// 	console.log(tiredness);
	// 	return dist * energy_dist_multiplier*tiredness;
	// }

	//gets location within canvas
	function get_random_location(){setTimeout(function() {}, 10);
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
		timeAlive = timeAlive || size;

		circle.graphics.beginFill(color).drawCircle(0,0,size);
		circle.x = xPos;
		circle.y = yPos;
		circle.timeAlive = size; //TODO: Change for real game
		circle.totalTimeAlive = size;

		if(isProductive){ circle.isWork=true; }
		else{ circle.isWork = false; }
		
		return circle;
	};

	//create circle at random location (with random size?);
	function createRandomCircle(color, size, timeAlive, isProductive){
		var max_size = 80; //max bubble size
		var min_size = 10;
		//default args
		size = size || Math.round( 	Math.random()*(max_size-min_size)+min_size); //size between 10 and 100
		timeAlive = timeAlive || 5.0;

		rand_coord = get_random_location();
		x = rand_coord[0];
		y = rand_coord[1];
		return createCircle(color, size, x, y, size, isProductive);
	}

	function createSprite(spriteSheet, spriteName, xPos, yPos, timeAlive, isProductive){
		//default args
		xPos = xPos || 100;
		yPos = yPos || 100;
		timeAlive = timeAlive || 5.0;


		var task = new createjs.Sprite(spriteSheet, spriteName);
		task.x = xPos;
		task.y = yPos;
		task.timeAlive = timeAlive; //TODO: Change for real game
		task.totalTimeAlive = timeAlive;

		if(isProductive){ task.isWork=true; }
		else{ task.isWork = false; }

		return task;
	};

	//create sprite at random location and given scale
	function createRandomSprite(spriteSheet, spriteName, scale, timeAlive, isProductive){
		var max_scale = 1.5;
		var min_scale = 0.6;
		scale = scale || Math.random()*(max_scale-min_scale)+min_scale;
		
		rand_coord = get_random_location();
		x = rand_coord[0];
		y = rand_coord[1];

		task = createSprite(spriteSheet, spriteName, x, y, scale, isProductive);
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