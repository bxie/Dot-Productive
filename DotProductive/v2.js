var width = 1200;
var height = 500;

user_spritedata = {images: ["user32.png"], frames:{width:32, height:32},
	animations: {user:0}};
sleep_spritedata = {images: ["sleep32.jpg"], frames:{width:32, height:32},
	animations: {sleep:0}};
work_spritedata = {images: ["work_NEW.png"], frames:{width:100, height:100},
	animations: {econ:0, speech:1, hw:2, essay:3, pset:4, preso:5, pset2:6, thing:7, email:8, project:9}};
play_spritedata = {images: ["sofuckinghotitwillburnyourhand.png"], frames:{width:100, height:100},
	animations: {coffee:0, concert:1, date:2, shop:3, party:4, game:5, travel:6}};
var userSpriteSheet  = new createjs.SpriteSheet(user_spritedata);
var sleepSpriteSheet  = new createjs.SpriteSheet(sleep_spritedata);
var workSpriteSheet  = new createjs.SpriteSheet(work_spritedata);
var playSpriteSheet  = new createjs.SpriteSheet(play_spritedata);

/*********************************************
LEVELS HERE
*********************************************/
l1 = {
	// level 1

    circles: {
    	r1 : createSprite(playSpriteSheet, "coffee", 1, 100,100, 0.0, false),
    	r2 : createSprite(playSpriteSheet,"shop", .9, 600, 370, 0.0, false),
    	r3 : createSprite(playSpriteSheet,"concert", 1.4, 490, 100, 0.0, false),
    	r4 : createSprite(playSpriteSheet,"travel", 1.3, 210,360, 0.0, false),
    	r5 : createSprite(playSpriteSheet,"game", 1,1100,300, 0.0, false),
    	r6 : createSprite(playSpriteSheet,"game", 1,400,150, null, 0.0, false),
    	r7 : createSprite(playSpriteSheet,"date", 1.2, 1000,55, 0.0, false),
    	r8 : createSprite(playSpriteSheet,"coffee", .7, 800, 400, 0.0, false),
    	r9 : createSprite(playSpriteSheet,"party", .8, 1090, 25, 0.0, false),
    	b1 : createSprite(workSpriteSheet, "hw", 1, 200, 90, 2, true),
    	b2 : createSprite(workSpriteSheet, "pset",1.1,650,175, 3, true),
    	b3 : createSprite(workSpriteSheet, "essay",1.4, 700, 100, 3, true),
    	b4 : createSprite(workSpriteSheet, "email",.8, 800, 275, 1, true),
    	b5 : createSprite(workSpriteSheet, "project",1.1, 950,355, 3, true),
    	b6 : createSprite(workSpriteSheet, "pset2", .7,1010,250, 1, true),
    	b7 : createSprite(workSpriteSheet, "email",.6, 300, 200, 1, true),
    	b8 : createSprite(workSpriteSheet, "email",.7, 500, 250, 1, true),
    	b9 : createSprite(workSpriteSheet, "email",.6, 150, 280, 1, true),
    	b10 : createSprite(workSpriteSheet, "preso",1.2, 330,300, 2, true)
    },

	time: 45,
	start_energy: 60,
	max_energy: 80
};
l2 = {
    
    circles: {

	     red1 : createSprite(playSpriteSheet, "coffee", .8, 34,80, 0.0, false),
	     red2 : createSprite(playSpriteSheet,"shop", .9, 600, 370, 0.0, false),
	     red3 : createSprite(playSpriteSheet,"concert", 1, 490, 100, 0.0, false),
	     red4 : createSprite(playSpriteSheet,"travel", 1.3, 210, 360, 0.0, false),
	     red5 : createSprite(playSpriteSheet,"game", 1,400,150, null, 0.0, false),
	     red6 : createSprite(playSpriteSheet,"coffee", .7, 850, 400, 0.0, false),

	     blk1 : createSprite(workSpriteSheet, "hw", 1, 200, 90, 0.0, true),
	     blk2 : createSprite(workSpriteSheet, "pset",1.1,1000, 375, 0.0, true),
	     blk3 : createSprite(workSpriteSheet, "essay",1.4, 700, 100, 0.0, true),
	     blk4 : createSprite(workSpriteSheet, "email",.5, 600, 100, 0.0, true),
	     blk5 : createSprite(workSpriteSheet, "project", 2, 700, 240, 0.0, true),
	     blk6 : createSprite(workSpriteSheet, "pset2", .7,1010, 250, 0.0, true),
	     blk7 : createSprite(workSpriteSheet, "email",.5, 300, 100, 0.0, true),
	     blk8 : createSprite(workSpriteSheet, "email",.5, 100, 250, 0.0, true),
	     blk9 : createSprite(workSpriteSheet, "email",.5, 150, 280, 0.0, true),
	     blk10 : createSprite(workSpriteSheet, "preso",1.2, 330,300, 0.0, true),
	     blk11 : createSprite(workSpriteSheet, "hw", 1.5, 500, 240, 0.0, true),
    },

	time: 45,
	start_energy: 60,
	max_energy: 80
};
l3 = {
	// level 3
    
    circles: {
    	 red1 : createSprite(playSpriteSheet, "coffee", .5, 1000, 100, 0.0, false),
     red2 : createSprite(playSpriteSheet,"shop", .5, 600, 100, 0.0, false),
     red3 : createSprite(playSpriteSheet,"concert", .5, 400, 100, 0.0, false),
     red4 : createSprite(playSpriteSheet,"travel", .5, 100, 100, 0.0, false),

     blk1 : createSprite(workSpriteSheet, "hw", 1, 200, 90, 0.0, true),
     blk2 : createSprite(workSpriteSheet, "pset",1.1,650,175, 0.0, true),
     blk3 : createSprite(workSpriteSheet, "essay",1.4, 900, 250, 0.0, true),
     blk4 :createSprite(workSpriteSheet, "email",.5, 100, 400, 1.0, true),
     blk5  :createSprite(workSpriteSheet, "project",2, 400, 250, 3.0, true),
     blk6  :createSprite(workSpriteSheet, "pset2", .7,1050, 250, 0.0, true),
     blk7  :createSprite(workSpriteSheet, "email",.5, 300, 500, 0.0, false),
     blk8  :createSprite(workSpriteSheet, "email",.5, 900, 400, 2.0, true),
     blk9  :createSprite(workSpriteSheet, "email",.5, 1100, 400, 0.0, true),
     blk10 : createSprite(workSpriteSheet, "preso",1.2, 330, 300, 0.0, true),
    },

	time: 45,
	start_energy: 60,
	max_energy: 80
};

var current_level= 1;
var max_level = 3; //after max level, just plays randomly

level_order = {
	1: l1,
	2: l2,
	3: l3
};

function start_level(lvl, circles, time, total_energy, start_energy){

	current_level +=1;
	console.log("Start energy: "+ start_energy);

	//default
	if(!time) time = 45;
	if(!total_energy) total_energy = 100;
	if(!start_energy)  start_energy = 75;

	lvl.MAX_ENERGY = total_energy;
	lvl.TOTAL_TIME = time;

    lvl.stage = new createjs.Stage("demoCanvas");
	var dragger = new createjs.Container();
	var gameTime = lvl.TOTAL_TIME;  //set to max time of game, in seconds
	lvl.prev_time = getTimeInSec(); //time of previous tick
	var score = 0;
	//var energy = Math.random()*MAX_ENERGY/2 + MAX_ENERGY/50;
	lvl.energy = start_energy;
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

	var prodTime = 0.0;
	var procTime = 0.0;

	/*********************************************
	LABELS
	*********************************************/

	//Progress Bar
	var progress = new createjs.Shape();
    var progressOutline = new createjs.Shape();
    progress.graphics.beginFill("#3c855c").drawRect(width/2 - 150,height-20,400*lvl.energy/lvl.MAX_ENERGY,20);
    progressOutline.graphics.beginStroke("#555").drawRect(width/2 - 150,height-20,400,20);
    lvl.stage.addChild(progress);
    lvl.stage.addChild(progressOutline);

	//Energy Label
	energyLabel = lvl.stage.addChild(new createjs.Text("energy: "+(100*lvl.energy/lvl.MAX_ENERGY)+"%", "18px arial", "#000"));
	energyLabel.lineHeight = 15;
	energyLabel.textBaseline = "top"
	energyLabel.x = 580;
	energyLabel.y = 478;

	

	

    /*********************************************
	ADDING TASKS
	*********************************************/



    for(ref in circles){
    	circles[ref].scaleX = circles[ref].startScale;
    	circles[ref].scaleY = circles[ref].startScale;
    	circles[ref].timeAlive = circles[ref].totalTimeAlive;
    	temp = createClickable(circles[ref]);
    	lvl.stage.addChild(temp);
    }

    //Time Label
	timeLabel = lvl.stage.addChild(new createjs.Text("time left: "+lvl.prev_time, "18px arial", "#000"));
	timeLabel.lineHeight = 15;
	timeLabel.textBaseline = "top"
	timeLabel.x = 10;
	timeLabel.y = 10;

    //Score Label
	scoreLabel = lvl.stage.addChild(new createjs.Text("score: "+score, "18px arial", "#000"));
	scoreLabel.lineHeight = 15;
	scoreLabel.textBaseline = "top"
	scoreLabel.x = 1120;
	scoreLabel.y = 10;

	//Level Label
	levelLabel = lvl.stage.addChild(new createjs.Text("level: "+(current_level-1), "bold 18px arial", "#000"));
	levelLabel.lineHeight = 15;
	levelLabel.textBaseline = "top"
	levelLabel.x = 590;
	levelLabel.y = 10;

	//End Label
	endLabel = lvl.stage.addChild(new createjs.Text("", "bold 18px arial", "#000"));
	endLabel.lineHeight = 15;
	endLabel.textBaseline = "top"
	endLabel.x = 590;
	endLabel.y = 230;


    //MOUSE
	lvl.stage.mouseMoveOutside = true;

	//Sprite we control
	var main = createSprite(userSpriteSheet, "user", 1, 40, height/2);
	main.alpha = 0.5;
	main.stageX = main.x + 16;
	main.stageY = main.y + 16;
	lvl.stage.addChild(main);

	//end sprite
 	var bed = createSprite(sleepSpriteSheet, "sleep", 1, lvl.stage.canvas.width-40, lvl.stage.canvas.height/2);
	var bed_container = new createjs.Container();
	bed_container.addChild(bed);

	var bed_container = new createjs.Container();
	bed_container.addChild(bed);
	bed_container.on("click", function(evt){
		console.log("Clicked on end!");
		is_moving = true;
			//goal = dragger.getObjectUnderPoint();
			goal = evt.target;
			goal.stageX = evt.stageX;
			goal.stageY = evt.stageY;
			goal.timeAlive = 0.0;
			console.log(evt.target.x);
			console.log(goal.x);

			if (main.stageX > goal.stageX){ //has to go to left
				moving_left = true;
			}
			else{
				moving_left = false;
			}
			slope = (goal.stageY-main.stageY)/(goal.stageX-main.stageX); //origin in upper left!

			lvl.stage.update();

		end_game = true;
	});
	lvl.stage.addChild(bed_container);

    
    lvl.stage.update();

    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setPaused(false);
	
	//called every time step
	function tick(event) {

		//paused if game ends (get to bed, out of energy, time)
		if(createjs.Ticker.getPaused()==false){ // replace with createjs.Ticker.getPaused()==true
			//ensures time and energy are both > 0, trigger end game
			//console.log(prev_time);
			if(lvl.energy<0.0 || gameTime<=0){
				console.log("OUT OF TIME OR ENERGY!");
				scoreLabel.text = "score: "+ score ;
				if (lvl.energy<0.0) {endLabel.text = "OUT OF ENERGY!\n"}
					else {endLabel.text = "OUT OF TIME!\n"}
				endLabel.text = endLabel.text+"Productive Time: "+Math.round(prodTime)/2 + "\nFun Time: "+Math.round(procTime)/2;
				lvl.stage.update();
				createjs.Ticker.setPaused(true);
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
							incrementScore(goal);
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
							prodTime = prodTime + .5;
						}
						else{
							updateEnergy(1.5);
							procTime = procTime + .5;
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
					main.stageX = main.x+16;
					main.y=main.y+sign*x_inc*slope;
					main.stageY = main.y+16;
				}
			}
			//end game: if main has arrived at bed 
			if(end_game && goal==null){
				scoreLabel.text = "score: "+ score ;
				endLabel.text = "Good Night!\n"
				endLabel.text = endLabel.text+"Productive Time: "+Math.round(prodTime)/2 + "\nFun Time: "+Math.round(procTime)/2;

				createjs.Ticker.setPaused(true);
				lvl.stage.update();
				createjs.Ticker.removeAllEventListeners();
				
			}

			var delta = getTimeInSec() - lvl.prev_time;
			lvl.prev_time = getTimeInSec();
			gameTime = gameTime - delta;
			lvl.energy = lvl.energy - delta*energy_multiplier;
			timeLabel.text = "time left: "+ Math.round(gameTime);
			energyLabel.text = "energy: "+Math.round((100*lvl.energy/lvl.MAX_ENERGY))+"%";
			updateEnergyBar();

			lvl.stage.update(event);
		}
	};

    //makes a shape clickable
    function createClickable(shape){
		dragger.addChild(shape);

		dragger.on("click",function(evt){
			end_game=false; //fix bug where game ends when click on bed then click away
			is_moving = true;
			//goal = dragger.getObjectUnderPoint();
			goal = evt.target;
			goal.stageX = evt.stageX;
			goal.stageY = evt.stageY;
			//console.log(evt.target);
			//console.log(goal.x);

			if (main.stageX > goal.stageX){ //has to go to left
				moving_left = true;
			}
			else{
				moving_left = false;
			}
			slope = (goal.stageY-main.stageY)/(goal.stageX-main.stageX); //origin in upper left!


			lvl.stage.update();
		});

		return dragger;
	}

	//determines if main has reached destination
	function has_arrived(){
		return (Math.abs(main.stageX - goal.stageX) < threshold && 
			Math.abs(main.stageY - goal.stageY) < threshold)
	}


	//Increase energy by delta
	function updateEnergy(delta){
		lvl.energy = Math.min(lvl.MAX_ENERGY, lvl.energy + delta); //energy never exceeds max
		energyLabel.text = "Energy: "+Math.round(100*lvl.energy/lvl.MAX_ENERGY) + "%";
		updateEnergyBar();
		lvl.stage.update();
	}

	// Update the Energy progress bar
	function updateEnergyBar(){
		// Update Progress Bar
		progress.graphics.clear();
		if(lvl.energy/lvl.MAX_ENERGY < 0.15) {
    		progress.graphics.beginFill("#F9997c").drawRect(width/2 - 150,height-20,400*lvl.energy/lvl.MAX_ENERGY,20);
		} else {
			if(lvl.energy/lvl.MAX_ENERGY <= 0.33) {
				progress.graphics.beginFill("#ffec6c").drawRect(width/2 - 150,height-20,400*lvl.energy/lvl.MAX_ENERGY,20);
		} else {
			progress.graphics.beginFill("#3c855c").drawRect(width/2 - 150,height-20,400*lvl.energy/lvl.MAX_ENERGY,20);
		}
	}

	}

	//adds 1 to score and updates label
	function incrementScore(task){
		score = score + task.value;
		scoreLabel.text = "Score: "+ score;
		lvl.stage.update();
	}



	
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

//
function next_level(){
	console.log('next level');
	// current_level+=1;
	//if level is defined
	// lvl = create_random_level();
	createjs.Ticker.setPaused(true);
	createjs.Ticker.removeAllEventListeners();
	if (current_level<=max_level){
		level = level_order[current_level];
	} else {
		level = create_random_level();
	}
	start_level(level, level.circles, level.time, level.max_energy, level.start_energy);
};

function replay_level(){
	current_level-=1;
	next_level();
}
function prev_level(){
	current_level = Math.max(1, current_level-2);
	next_level();
}

function createSprite(spriteSheet, spriteName, scale, xPos, yPos, value, isProductive){
	//default args
	xPos = xPos || 100;
	yPos = yPos || 100;
	scale = scale || 1;
	timeAlive = scale; // This could be changed!
	value = value || 1;

	var task = new createjs.Sprite(spriteSheet, spriteName);
	task.x = xPos;
	task.y = yPos;

	task.timeAlive = timeAlive; //TODO: Change for real game
	task.totalTimeAlive = timeAlive;
	task.startScale = scale;
	task.scaleX = scale;
	task.scaleY = scale;
	task.value = value;

	if(isProductive){ task.isWork=true; }
	else{ task.isWork = false; }

	return task;
};

function create_random_level(){
	lvl = {
		circles:{
			red1 : createRandomSprite(playSpriteSheet, "coffee", false),
		     red2 : createRandomSprite(playSpriteSheet,"shop", false),
		     red3 : createRandomSprite(playSpriteSheet,"concert", false),
		     red4 : createRandomSprite(playSpriteSheet,"travel", false),
		     red5 : createRandomSprite(playSpriteSheet,"game", false),
		     red6 : createRandomSprite(playSpriteSheet,"coffee",  false),

		     blk1 : createRandomSprite(workSpriteSheet, "hw", true),
		     blk2 : createRandomSprite(workSpriteSheet, "pset", true),
		     blk3 : createRandomSprite(workSpriteSheet, "essay", true),
		     blk4 : createRandomSprite(workSpriteSheet, "email",true),
		     blk5 : createRandomSprite(workSpriteSheet, "project", true),
		     blk6 : createRandomSprite(workSpriteSheet, "pset2",  true),
		     blk7 : createRandomSprite(workSpriteSheet, "email",true),
		     blk8 : createRandomSprite(workSpriteSheet, "email",true),
		     blk9 : createRandomSprite(workSpriteSheet, "email",true),
		     blk10 : createRandomSprite(workSpriteSheet, "preso",true),
		     blk11 : createRandomSprite(workSpriteSheet, "hw", true),
		},
		time: 45,
		start_energy: 60,
		max_energy: 80
	};
	return lvl;
};

//create sprite at random location and random scale.
function createRandomSprite(spriteSheet, spriteName, isProductive){
	var max_scale = 1.5;
	var min_scale = 0.6;
	scale = Math.random()*(max_scale-min_scale)+min_scale;
	var value = 0;
	if (isProductive) {
		if (scale>1) {
			value = 3;
		} else if (scale<.75) {
			value = 1;
		} else {
			value = 2;
		}
	}
	
	rand_coord = get_random_location();
	x = rand_coord[0];
	y = rand_coord[1];

	return createSprite(spriteSheet, spriteName, scale, x, y, value, isProductive);
};

//gets location within canvas
function get_random_location(){setTimeout(function() {}, 10);
	var padding = 100; //stay at least 50 px away from each edge
	x = Math.round(Math.random()*(width-padding*2)+padding);
	y = Math.round(Math.random()*(height-padding*2)+padding);
	// console.log ([x,y]);
	return [x,y]

};

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