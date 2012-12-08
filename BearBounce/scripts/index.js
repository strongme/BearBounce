/**
 * @author Walter
 */
//Variables to handle game parameters
var gameloopId;
var speed = 2;
var horizontalSpeed = speed;
var verticalSpeed = speed;
var screenWidth;
var screenHeight;
var ctx;
var gameRunning = false;
var bearX = 100;
var bearY = 100;
var mushroomX;
var mushroomY;
var bearAngle = 0;

var MUSHROOM_BOING_STATUS = 1;
var MUSHROOM_NORMAL_STATUS = 2;
var mushroomStatus = MUSHROOM_NORMAL_STATUS;
var mushroomWobble = false;
var mushroomWobbleCount = 0;


//Create Images
var mushroomImg = new Image();
var mushroomWobbleImg = new Image();
var backgroundForestImg = new Image();
var bearEyesOpenImg = new Image();
var bearEyesClosedImg = new Image();

//Create and load sounds
var boing1 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_1.mp3");
var boing2 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_2.mp3");
var boing3 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_3.mp3");
var boing4 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_4.mp3");
var boing5 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_5.mp3");
var crowdgroan = new Audio("http://jacebook.co.uk/share/html5/sounds/crowdgroan.mp3");

//Wait for Dom to load and init game
function init() {
	initSettings();
	loadImages();
	
	//add event handler to surrounding DIV to monitor mouse move
	$("#container").mousemove(function(e) {
		mushroomX = e.pageX;
	});
	//add event handler for clicking on start/stop button and tog
	$("#ss").click(function() {
		toggleGameplay();
	});
}

function initSettings() {
	//Get a handle to the 2d context of the canvas
	ctx = document.getElementById("canvas").getContext("2d");
	//Calculate the screen width and height
	screenWidth = parseInt($("#canvas").attr("width"));
	screenHeight = parseInt($("#canvas").attr("height"));
	
	//center mushroom on the horizonal axis
	mushroomX = parseInt(screenWidth/2);
	mushroomY = screenHeight - 40;
}

//load all images for game
function loadImages () {
  mushroomImg.src = "./img/mushroom2.png";
  mushroomWobbleImg.src = "./img/mushroom.png";
  backgroundForestImg.src = "./img/background.jpg";
  bearEyesOpenImg.src = "./img/bear_eyesopen.png";
  bearEyesClosedImg.src = "./img/bear_eyesclosed.png";
}

//Main game loop ,it all happens here
function gameLoop() {
	//Clear the screen
	ctx.clearRect(0,0,screenWidth,screenHeight);
	//Move the bear in the current direction
	bearX += horizontalSpeed;
	bearY += verticalSpeed;
	
	//Draw the background forest
	ctx.drawImage(backgroundForestImg,0,0);
	drawMushroom();
	drawAnimal();
	hasHit();
	

}

function drawAnimal() {
  	ctx.save();
	//ctx.translate(bearX+(bearEyesClosedImg.width/2),bearY+(bearEyesClosedImg.height/2));
	//adjust the angle according to the horizonal speed
	bearAngle += horizontalSpeed;
	if(bearAngle<0) 
		bearAngle = 360;
	else if(bearAngle>360)
		bearAngle = 0;
		
	//Perform the rotation based on the current angle 
	//ctx.rotate(bearAngle*Math.PI/180);
	

	//Draw the bear(if he's going down open eyes!) 
	if(verticalSpeed>0) {
		ctx.drawImage(bearEyesOpenImg,bearX,bearY);
	}else {
		ctx.drawImage(bearEyesClosedImg,bearX,bearY);
	}
	
	ctx.restore();
}
function hasHit() {
	//检测熊是否达到顶部
	if(bearY<0) {
		verticalSpeed = speed;
	}
	//检测熊是否达到右边界
	if(bearX>screenWidth-bearEyesOpenImg.width) {
		boing2.play();
		horizontalSpeed = -speed;
	}
	//检测是否熊碰到左边界
	if(bearX<0) {
		boing3.play();
		horizontalSpeed = speed;
	}
	//检测熊是否碰到底部
	if(bearY>screenHeight-bearEyesOpenImg.height) {
		//弹回去
		crowdgroan.play();
		verticalSpeed = -speed;
		toggleGameplay();
	}
	//检测熊是否碰到了蘑菇
	if((bearY>(screenHeight - 60)) && (bearX + bearEyesOpenImg.width > mushroomX && bearX < (mushroomX + mushroomImg.width))) {
		
		if(bearX<mushroomX+mushroomImg.width*0.25) {
			horizontalSpeed = -speed;
		}else if(bearX<mushroomX+mushroomImg.width*0.5) {
			horizontalSpeed = -parseInt(speed/2);
		}else if(bearX<mushroomX+mushroomImg.width*0.75) {
			horizontalSpeed = parseInt(speed/2);
		}else {
			horizontalSpeed = speed;
		}
		
		boing1.play();
		mushroomStatus = MUSHROOM_BOING_STATUS;
		verticalSpeed = -speed;
	}
}
function drawMushroom() {
		//Draw the mushroom
	if(mushroomStatus == MUSHROOM_NORMAL_STATUS) {
		ctx.drawImage(mushroomImg,mushroomX,mushroomY);
	}else {
		//toggle the wobble 
		mushroomWobble = !mushroomWobble;
		//increment wobble count
		mushroomWobbleCount++;
		if(mushroomWobbleCount>50) {
			mushroomStatus = MUSHROOM_NORMAL_STATUS;
			mushroomWobble = false;
			mushroomWobbleCount = 0;
		}
		
		if(mushroomWobble) {
			ctx.drawImage(mushroomWobbleImg,mushroomX,mushroomY);
		}else {
			ctx.drawImage(mushroomImg,mushroomX,mushroomY);
		}
	}
}

//start/stop the game loop
function toggleGameplay() {
	gameRunning = !gameRunning;
	
	if(gameRunning) {
		clearInterval(gameloopId);
		gameloopId = setInterval(gameLoop,10);
	}else {
		clearInterval(gameloopId);
	}
}


$(function() {
	init();
});
