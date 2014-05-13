function init(){
	var MAX_ENERGY = 80.0;
	var TOTAL_TIME = 45.0;

    var stage = new createjs.Stage("demoCanvas");
	var dragger = new createjs.Container();
	var gameTime = TOTAL_TIME;  //set to max time of game, in seconds
	var	prev_time = getTimeInSec(); //time of previous tick
	var score = 0;
	//var energy = Math.random()*MAX_ENERGY/2 + MAX_ENERGY/50;
	var energy = 60;
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

	//Progress Bar
	var progress = new createjs.Shape();
    // progress.alpha = 0.5;
    var progressOutline = new createjs.Shape();
    progress.graphics.beginFill("#3c855c").drawRect(stage.canvas.width/2 - 150,stage.canvas.height-20,400*energy/MAX_ENERGY,20);
    progressOutline.graphics.beginStroke("#555").drawRect(stage.canvas.width/2 - 150,stage.canvas.height-20,400,20);
    stage.addChild(progress);
    stage.addChild(progressOutline);

	//Energy Label
	energyLabel = stage.addChild(new createjs.Text("Energy: "+(100*energy/MAX_ENERGY)+"%", "18px verdana", "#000"));
	energyLabel.lineHeight = 15;
	energyLabel.textBaseline = "top"
	energyLabel.x = 580;
	energyLabel.y = 480;

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
    work_spritedata = {images: ["work_NEW.png"], frames:{width:100, height:100},
		animations: {econ:0, speech:1, hw:2, essay:3, pset:4, preso:5, pset2:6, thing:7, email:8, project:9}};
    play_spritedata = {images: ["fun_NEW.png"], frames:{width:100, height:100},
		animations: {concert:0, travel:1, shop:2, game:3, date:4, coffee:5, party:6}};
    var userSpriteSheet  = new createjs.SpriteSheet(user_spritedata);
    var sleepSpriteSheet  = new createjs.SpriteSheet(sleep_spritedata);
    var workSpriteSheet  = new createjs.SpriteSheet(work_spritedata);
    var playSpriteSheet  = new createjs.SpriteSheet(play_spritedata);

    /*********************************************
	ADDING TASKS
	*********************************************/


    var red1 = createSprite(playSpriteSheet, "coffee", 1, 100,100, 0.0, false);
    var red2 = createSprite(playSpriteSheet,"shop", .9, 600, 370, 0.0, false);
    var red3 = createSprite(playSpriteSheet,"concert", 1.4, 490, 100, 0.0, false);
    var red4 = createSprite(playSpriteSheet,"travel", 1.3, 210,360, 0.0, false);
    var red5 = createSprite(playSpriteSheet,"game", 1,1100,300, 0.0, false);
    var red6 = createSprite(playSpriteSheet,"game", 1,400,150, null, 0.0, false);
    var red7 = createSprite(playSpriteSheet,"date", 1.2, 1010,40, 0.0, false);
    var red8 = createSprite(playSpriteSheet,"coffee", .7, 800, 400, 0.0, false);
    var red9 = createSprite(playSpriteSheet,"party", .8, 1100, 10, 0.0, false);

    var blk1 = createSprite(workSpriteSheet, "hw", 1, 200, 90, 0.0, true);
    var blk2 = createSprite(workSpriteSheet, "pset",1.1,650,175, 0.0, true);
    var blk3 = createSprite(workSpriteSheet, "essay",1.4, 700, 100, 0.0, true);
    var blk4 = createSprite(workSpriteSheet, "email",.8, 800, 275, 0.0, true);
    var blk5 = createSprite(workSpriteSheet, "project",1.1, 950,355, 0.0, true);
    var blk6 = createSprite(workSpriteSheet, "pset2", .7,1010,250, 0.0, true);
    var blk7 = createSprite(workSpriteSheet, "email",.6, 300, 200, 0.0, true);
    var blk8 = createSprite(workSpriteSheet, "email",.7, 500, 250, 0.0, true);
    var blk9 = createSprite(workSpriteSheet, "email",.6, 150, 280, 0.0, true);
    var blk10 = createSprite(workSpriteSheet, "preso",1.2, 330,300, 0.0, true);


 

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
	var main = createSprite(userSpriteSheet, "user", 1, 40, stage.canvas.height/2);
	main.alpha = 0.5;
	stage.addChild(main);

	//end sprite
 	var bed = createSprite(sleepSpriteSheet, "sleep", 1, stage.canvas.width-40, stage.canvas.height/2);
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

	// ADD PROGRESS BAR
	// var progress = new createjs.Shape(); // Remember to define the progress variable at the top!
 //    progress.graphics.beginStroke("#C33").drawRect(stage.canvas.width/2 - 400/2,stage.canvas.height-20,400,20);
 //    stage.addChild(progress);

    
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
			energyLabel.text = "Energy: "+Math.round((100*energy/MAX_ENERGY))+"%";
			updateEnergyBar();

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
		energyLabel.text = "Energy: "+Math.round(100*energy/MAX_ENERGY) + "%";
		updateEnergyBar();
		stage.update();
	}

	// Update the Energy progress bar
	function updateEnergyBar(){
		// Update Progress Bar
		progress.graphics.clear();
		if(energy/MAX_ENERGY < 0.15) {
    		progress.graphics.beginFill("#F9997c").drawRect(stage.canvas.width/2 - 150,stage.canvas.height-20,400*energy/MAX_ENERGY,20);
		} else {
			if(energy/MAX_ENERGY <= 0.33) {
				progress.graphics.beginFill("#ffec6c").drawRect(stage.canvas.width/2 - 150,stage.canvas.height-20,400*energy/MAX_ENERGY,20);
		} else {
			progress.graphics.beginFill("#3c855c").drawRect(stage.canvas.width/2 - 150,stage.canvas.height-20,400*energy/MAX_ENERGY,20);
		}
	}

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

	function createSprite(spriteSheet, spriteName, scale, xPos, yPos, timeAlive, isProductive){
		//default args
		xPos = xPos || 100;
		yPos = yPos || 100;
		timeAlive = timeAlive || 5.0;
		scale = scale || 1;
		timeAlive = scale; // This could be changed!


		var task = new createjs.Sprite(spriteSheet, spriteName);
		task.x = xPos;
		task.y = yPos;
		task.timeAlive = timeAlive; //TODO: Change for real game
		task.totalTimeAlive = timeAlive;
		task.scaleX = scale;
		task.scaleY = scale;

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

		return createSprite(spriteSheet, spriteName, scale, x, y, scale, isProductive);
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