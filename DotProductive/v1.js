function init(){
	var stage, red1,red2, blk1, blk2, dragger, oldX, oldY;

	var height = 500;
	var width = 1000;

    var stage = new createjs.Stage("demoCanvas");
	var dragger = new createjs.Container();
	var total_time = 100.0;  //set to max time of game, in seconds
	var	start_time = getTimeInSec();
	var score = 0
	var energy = 100

	//Time
	timeLabel = stage.addChild(new createjs.Text("Time: "+start_time, "14px monospace", "#000"));
	timeLabel.lineHeight = 15;
	timeLabel.textBaseline = "top"
	timeLabel.x = 10;
	timeLabel.y = 10;

	//Energy
	energyLabel = stage.addChild(new createjs.Text("Energy: "+energy, "14px monospace", "#000"));
	energyLabel.lineHeight = 15;
	energyLabel.textBaseline = "top"
	energyLabel.x = 180;
	energyLabel.y = 10;

	//Score
	scoreLabel = stage.addChild(new createjs.Text("Score: "+score, "14px monospace", "#000"));
	scoreLabel.lineHeight = 15;
	scoreLabel.textBaseline = "top"
	scoreLabel.x = 350;
	scoreLabel.y = 10;

	//updates time
	createjs.Ticker.on("tick", tick);
	function tick(event) {
		var delta = getTimeInSec() - start_time;
		timeLabel.text = "Time Left: "+ Math.round(total_time - delta);
		stage.update(event);
	};

    //ADDING SHAPES

    var red1 = createCircle("red", 25, 400, 250, 0,0, false);
    var red2 = createCircle("red", 25, 100, 100, 0.0, false);
    
    var blk1 = createCircle("black", 25, 200, 300, 0.0, true);
    var blk2 = createCircle("black", 25, 350, 100, 0.0, true);

    shapes = {
    	r1 : red1,
    	r2 : red2,
    	b1 : blk1,
    	b2 : blk2
    };
    // console.log(shapes[1]);

    for(ref in shapes){
    	temp = createClickable(shapes[ref]);
    	stage.addChild(temp);
    }   


    //MOUSE
	stage.mouseMoveOutside = true;

	//Sprite we control
	var main = createCircle("blue", 30, 40, height/2);
	stage.addChild(main);

	//main follows mouse
	// stage.on("stagemousemove",function(evt){
	// 	main.x = evt.stageX;
	// 	main.y = evt.stageY;
	// 	stage.update();
	// });

    stage.update();

    function createClickable(shape){
		var dragger = new createjs.Container();
		dragger.addChild(shape);

		dragger.on("click",function(evt){
			main.x = evt.stageX;
			main.y = evt.stageY;
			target = dragger.getObjectUnderPoint();
			if(target.timeAlive<0.0001){
				//productive object
				if(target.isWork==true){
					incrementScore()
					console.log("GOT A POINT! Now at "+score);
				}
				//energy object
				else{
					console.log("More Energy!");
					updateEnergy(15);
				}
				console.log("About to remove "+target);
				dragger.removeChild(target);				
			}


			console.log(target);

			stage.update();
		});

		return dragger;
	}

	//Increase energy by delta
	function updateEnergy(delta){
		energy = energy + delta;
		energyLabel.text = "Energy: "+energy;
		stage.update();
	}

	function incrementScore(){
		score = score + 1;
		scoreLabel.text = "Score: "+ score;
		stage.update();
	}
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

function getTimeInSec(){
	return createjs.Ticker.getTime()/1000
};

/**
Next Steps:

X -Figure out how to determine which shapes are being touched (Container.getObjectUnderPoint()...may require all objects to be in same container)
X -Associate scores/attributes with shapes (type associates with points or energy)
X -Energy and time measured (ticker?)
 -Time alive decreases when main and other obj touching
 -Remove obj when no more timeAlive
 -Have "main" hover between points (speed dependent on energy)
X -Point counter
*/