function init(){
	var stage, red1,red2, blk1, blk2, dragger, oldX, oldY;

    var stage = new createjs.Stage("demoCanvas");

    //ADDING SHAPES

    var red1 = createCircle("red", 25, 400, 250);
    var red2 = createCircle("red", 25, 100, 100);
    
    var blk1 = createCircle("black", 25, 200, 300);
    var blk2 = createCircle("black", 25, 350, 100);

    shapes = {
    	r1 : red1,
    	r2 : red2,
    	b1 : blk1,
    	b2 : blk2
    };
    // console.log(shapes[1]);

    for(ref in shapes){
    	stage.addChild(shapes[ref]);
    }

    //MOUSE
	stage.mouseMoveOutside = true;

	//Sprite we control
	var main = createCircle("blue", 30, 250, 250);
	stage.addChild(main);
	stage.on("stagemousemove",function(evt){
		main.x = evt.stageX;
		main.y = evt.stageY;
		stage.update();
	});


	var dragger = new createjs.Container(); 




    stage.update();
};

/**
* Create filled circle with given color, size, at given location
* color: string with circle color ("red", "black")
* size: int for radius of circle
* xPos, yPos: x and y coordinates relative to upper left corner of canvas
*/
function createCircle(color, size, xPos, yPos){
	var circle = new createjs.Shape();

	//default args
	size = size || 50;
	xPos = xPos || 100;
	yPos = yPos || 100;

	circle.graphics.beginFill(color).drawCircle(0,0,size);
	circle.x = xPos;
	circle.y = yPos;
	return circle;
};
