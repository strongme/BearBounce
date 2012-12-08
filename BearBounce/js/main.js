/**
 * @author Walter
 */
//Variables to handle game parameters
var gameloopId;
var speed = 2;
var horizontalSpeed = speed;
var verticalSpeed = -speed;
var screenWidth;
var screenHeight;
var ctx;
var gameRunning = false;
var frameCount = 0;
var showBounds = false;
var frameCountId = 0;
var score = 0;
var lives = 0;

//Create and load sounds
var boing1 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_1.mp3");
var boing2 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_2.mp3");
var boing3 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_3.mp3");
var boing4 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_4.mp3");
var boing5 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_5.mp3");
var crowdgroan = new Audio("http://jacebook.co.uk/share/html5/sounds/crowdgroan.mp3");

//Create images
var mushroomImg = new Image();
var mushroomWobbleImg = new Image();
var backgroundForestImg = new Image();
var bearEyesOpenImg = new Image();
var bearEyesClosedImg = new Image();
var flowerImg = new Image();
var leafImg = new Image();
var acornImg = new Image();
var scoreImg = new Image();
var bonusImg = new Image();
var owl1 = new Image();
var owl2 = new Image();
var multiPoint = 0;
var currentBonusImage = 0;
var delayCount=0;
//var showBonus = false;
var bonusStarted;
var bonusActive = false;

//Baddy
var BADDY_OFF = 0;
var BADDY_FLYING = 1;
var BADDY_HIT = 3;
var baddyX = 480;
var baddyStatus = BADDY_OFF;
var currentBaddyImage = 0;
var baddyImages = new Array();

//Lives Object
var livesImages = new Array();
	
//bonus images
var bonusImages = new Array();

var soundType = "wav";
if(navigator.userAgent.toLowerCase().indexOf('chrome')>-1) {
	soundType = "mp3";
}

//Create and load sounds 
var boing1 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_1." + soundType);
var boing2 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_2." + soundType);
var boing3 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_3." + soundType);
var boing4 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_4." + soundType);
var boing5 = new Audio("http://jacebook.co.uk/share/html5/sounds/boing_5." + soundType);
var crowdgroan = new Audio("http://jacebook.co.uk/share/html5/sounds/crowdgroan." + soundType);
var collisionPrize = new Audio("http://jacebook.co.uk/share/html5/sounds/collisionPrize." + soundType);
var collisionStarPrize = new Audio("http://jacebook.co.uk/share/html5/sounds/collisionStarPrize." + soundType);
var groan = new Audio("http://jacebook.co.uk/share/html5/sounds/groan." + soundType);
var newLevel = new Audio("http://jacebook.co.uk/share/html5/sounds/newLevel." + soundType);
var owl = new Audio("http://jacebook.co.uk/share/html5/sounds/owl." + soundType);
var squawk = new Audio("http://jacebook.co.uk/share/html5/sounds/squawk." + soundType);

//set background sound of birds,loop and reduce volume
var birds = new Audio("http://jacebook.co.uk/share/html5/sounds/birds." + soundType);
birds.loop = true;
birds.volume = 0.1;

var mushroom = new Mushroom();

var animal = new Animal();

var prizes = new Array();

var baddy = new Baddy();
baddy.x = 125;
baddy.y = 480;


function init() {
	loadImages();
	initSettings();
	addEventHandlers();
	startGame();
	startFPSCounter();
}

function startGame() {
	score = 0;
	lives = 3;
	startLevel(1);
}

function startLevel(level) {
	initPrizes();
}

function addEventHandlers() {
	$("#container").mousemove(function(e) {
		mushroom.x = e.pageX - (mushroom.image.width/2);
	});
	$("#BtnImgStart").click(function() {
		toggleGameplay();
	});
	
	$("#showBounds").click(function() {
		showBounds = !showBounds;
		gameLoop();
	});
}

function initSettings() {
	ctx = document.getElementById("canvas").getContext("2d");
	
	screenWidth = parseInt($("#canvas").attr("width"));
	screenHeight = parseInt($("#canvas").attr("height"));
	
	mushroom.x = parseInt(screenWidth/2);
	mushroom.y = screenHeight-40;
	
	animal.x = parseInt(screenWidth/2);
	animal.y = parseInt(screenHeight/2);
}

	//load all images for game
	function loadImages()
	{
		
		mushroomImg.src = "images/mushroom.png";
		mushroomWobbleImg.src = "images/mushroom2.png";
		backgroundForestImg.src = "images/background.jpg";
		bearEyesOpenImg.src = "images/bear_eyesopen.png";
		bearEyesClosedImg.src = "images/bear_eyesclosed.png";
		flowerImg.src = "images/flower.png";
		acornImg.src = "images/acorn.png";
		leafImg.src = "images/leaf.png";
		scoreImg.src = "images/score.png";
		owl1.src = "images/owl1.png";
		owl2.src = "images/owl2.png";
		
		//load combo bonus images
		for(var x=0; x<3; x++)
		{
			bonusImages[x] = new Image();	
			bonusImages[x].src = "images/comboBonus" + (x + 1) + ".png";
		}
		
		//load lives images
		for(var x=0; x<6; x++)
		{
			livesImages[x] = new Image();	
			livesImages[x].src = "images/lives" + x + ".png";
		}
		
		baddy.image = owl1;
		baddy.altImg = owl2;
		mushroom.image = mushroomImg;
		mushroom.squashedImg = mushroomWobbleImg;
		animal.image = bearEyesClosedImg;
		animal.eyesOpenImg = bearEyesOpenImg;
		
		//Wait for background image to load and then call gameLoop to draw initial stage
		backgroundForestImg.onload = function(){gameLoop(); };
		
	}

$(function() {
	init();
});

