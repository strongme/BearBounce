/**
 * @author Walter
 */

//Base definition of a game object
function GameObject() {
	this.x = 0;
	this.y = 0;
	this.image = null;
}

//Animal Object extends from GameObject
function Animal() {};
Animal.prototype = new GameObject();
Animal.prototype.angle = 0;
Animal.prototype.eyesOpenImage = null;

//Mushroom Object extends from GameObject
function Mushroom() {};
Mushroom.prototype = new GameObject();
Mushroom.prototype.boing = false;
Mushroom.prototype.wobble = false;
Mushroom.prototype,wobbleCount = 0;
Mushroom.prototype.squashedImage = null;
Mushroom.prototype.startBoing = null;
Mushroom.prototype.lastBoing = null;

//Prize Object extends from GameObject
function Prize() {};
Prize.prototype = new GameObject();
Prize.prototype.row = 0;
Prize.prototype.col = 0;
Prize.prototype.hit = false;
Prize.prototype.angle = 0;
Prize.prototype.spinning = false;

//baddy
function Baddy() {};
Baddy.prototype = new GameObject();
Baddy.prototype.angle = 0;
Baddy.prototype.altImg = null;

//Check 2 object intersect
function checkIntersect(object1,object2,overlap) {
	//		x-Axis						x-Axis
	//	A1-------->B1	C1			A2--------B2	C2
	//  +-----------+	^			+----------+	^				
	//	|object1	|	|y-Axis		|          |	|y-Axis	       
	//	|			|	|			|          |	|
	//	+-----------+	D1			+----------+	D2	
	A1 = object1.x + overlap;
	B1 = object1.x = object1.image.width - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y +object1.image.height - overlap;
	
	A2 = object2.x + overlap;
    B2 = object2.x + object2.image.width - overlap;
    C2 = object2.y + overlap;
    D2 = object2.y + object2.image.height - overlap;
    
    if((A1>A2&&A1<B2||B1>A2&&B1<B2)&&(C1>C2&&C1<D2||D1>C2&&D1<D2)) 
    	return true;
    else
    	return false;
}

//需要全局变量  ctx
function showObjectBounds(gameObject,transitionX,transitionY) {
	if(showBounds) {
		if(typeof(transitionX)!='undefined') {
			rectX = transitionX;
		}else {
			rectX = gameObject.x;
		}
		if(typeof(transitionY)!='undefined') {
			rectY = transitionY;
		}else {
			rectY = gameObject.y;
		}
		ctx.save();
		ctx.strokeStyle = '#f00';
		ctx.lineWidth = '2';
		ctx.strokeRect(rectX,rectY,gameObject.x,gameObject.y);
		ctx.restore();
	}
}

//需要全局变量 prizes数组
function initPrizes() {
	var count = 0;
	for(var x=0;x<3;x++) {
		for(var y=0;y<23;y++) {
			prize = new Prize();
			if(x==0)
				prize.image = flowerImg;
			if(x==1)
				prize.image = acornImg;
			if(x==2)
				prize.image = leafImg;
			prize.row = x;
			prize.col = y;
			prize.x = 20*prize.col+10;
			prize.y = 30*prize.row+20;	
			prizes[count] = prize;
			count++;
		}
	}
}

//需要全局变量prizes 数组
function drawPrizes() {
	for(var x=0;x<prizes.length;x++) {
		currentPrize = prizes[x];
		if(!currentPrize.hit) {
			if(currentPrize.spinning) {
				currentPrize.angle += 10;
				ctx.save();
				ctx.translate(currentPrize.x + (currentPrize.image.width/2), currentPrize.y + (currentPrize.image.height/2));
				ctx.rotate(currentPrize.angle*Math.PI/180);
				ctx.drawImage(currentPrize.image, - (currentPrize.image.width/2), - (currentPrize.image.width/2));
                showObjectBounds(currentPrize, - (currentPrize.image.width/2), - (currentPrize.image.width/2));
                ctx.restore();
                if(currentPrize.angle==360)
                	currentPrize.hit = true;
                	multiPoint++;
                	if(multiPoint>3) {
                		//we've hit more that 3 prizes in a row, so add bonus and show bonus sign
						score += (3-currentPrize.row) * (multiPoint);
						showBonus();
                	}else {
                		score += (3-currentPrize.row);
                	}
                	if(allPrizesHit()) {
                		newLevel.play();
                		gameOver();
                	}
			}else {
				ctx.drawImage(currentPrize.image,prizes[x].x,prizes[x].y);
				showObjectBounds(currentPrize);
			}
		}
	}
}

//是否击中所有
function allPrizesHit() {
	for(var x=0;x<prizes.length;x++) {
		checkPrize = prizes[x];
		if(checkPrize.hit == false) {
			return false;
		}
	}
	return true;
}

//需要全局变量ctx
function drawMushroom() {
	showObjectBounds(mushroom);
	if(!mushroom.isboing) {
		ctx.drawImage(mushroom.image,mushroomImg.x,mushroomImg.y);
	}else {
		
		//calculate difference in time since last boing
		var sinceLastBoing = (new Date().getTime() - mushroom.lastBoing);
		var sinceStartBoing = (new Date().getTime() - mushroom.startBoing);
		mushroom.wobble = !mushroom.wobble;
		if(sinceLastBoing > 40){
			//toggle the wobble!
			mushroom.wobble = !mushroom.wobble;
			mushroom.lastBoing = new Date().getTime();
		}
		//Stop wobbling after 500msec
		if(sinceStartBoing > 500){
			mushroom.boing = false;
			mushroom.wobble = false;
		}
		if(mushroom.wobble)
            ctx.drawImage(mushroom.squashedImg, mushroom.x, mushroom.y);
        else
            ctx.drawImage(mushroom.image, mushroom.x, mushroom.y);
	}
}

//需要全局变量ctx
function drawAnimal() {
	ctx.save();
	ctx.translate(animal.x+(animal.image.width/2),animal.y+(animal.image.height/2));
	Animal.angle += horizontalSpeed;
	if(animal.angle<0) animal.angle = 360;
	else if(animal.angle>360) animal.angle = 0;
	ctx.rotate(animal.angle * Math.PI/180);
	//记得测试padding
	showObjectBounds(animal, - (animal.image.width/2), - (animal.image.width/2));
	if(verticalSpeed>0) {
        ctx.drawImage(animal.eyesOpenImg, - (animal.eyesOpenImg.width/2), - (animal.eyesOpenImg.width/2));
    } else
    {
        ctx.drawImage(animal.image, - (animal.image.width/2), - (animal.image.width/2));
    }
    ctx.restore();
}

//draw score
function drawScore(){
	ctx.drawImage(scoreImg, screenWidth-(scoreImg.width),0);
	ctx.font = "12pt Arial";
	ctx.fillText("" + score, 425, 25);  
}
//draw lives
function drawLives(){
	//livesImg.src = "images/lives"+lives+".png";
	ctx.drawImage(livesImages[lives], 0, 0);
}

//需要全局animal变量,使用全局水平速度 horizonalSpeed和垂直速度 verticalSpeed
function hasAnimalHitEdge() {
	
	//是否碰到右边墙体
	if(animal.x>screenWidth-animal.image.width) {
		boing2.play();
		if(horizontalSpeed>0) 
			horizontalSpeed = -horizontalSpeed;
	}
	//是否碰到左边墙体
	if(animal.x<0) {
		boing3.play();
		if(horizontalSpeed<0)
			horizontalSpeed = -horizontalSpeed;
	}
	//是否碰到底部墙体
	if(animal.y>screenHeight-animal.image.height) {
		
		verticalSpeed = -speed;
		multiPoint = 0;
		toggleGameplay();
		setTimeout(function() {
			if(lives != 0){
				//Place the animal on top of the mushroom
				animal.x = parseInt(screenWidth/2);
				animal.y = parseInt(screenHeight/2);
				$("#BtnImgStart").show();
				gameLoop();
			}
		},2000);
		lives -= 1;
		if(lives>0) {
			groan.play();
			drawLives();
		}else {
			crowdgroan.play();
			gameOver();
		}
	}
	//是否碰到顶部墙体
	if(animal.y<0) {
		boing4.play();
		verticalSpeed = speed;
	}
}

//检测熊是否碰到蘑菇 需要全局变量 animal 和 mushroom
function hasAnimalHitMushroom() {
	if(checkIntersect(animal,mushroom,5)) {
		if(animal.x+animal.image.width/2<(mushroomImg.x+mushroom.image.width*0.25)) {
			horizontalSpeed = -speed;
		}else if(animal.x+animal.image.width/2<(mushroomImg.x+mushroom.image.width*0.5)) {
			horizontalSpeed = -speed/2;
		}else if(animal.x+animal.image.width/2<(mushroomImg.x+mushroom.image.width*0.75)) {
			horizontalSpeed = speed/2;
		}else {
			horizontalSpeed = speed;
		}
	}else {
		horizontalSpeed = speed;
	}
	boing1.play();
	mushroom.startBoing = new Date().getTime();
	mushroom.lastBoing = mushroom.lastBoing;
	mushroom.boing = true;
	verticalSpeed = -speed;
	multiPoint = 0;
}

//检测熊碰到礼物 需要全局 prizes数组变量 和animal
function hasAnimalHitPrize() {
	for(var x=0;x<prizes.length;x++) {
		var prize = prizes[x];
		if(!prize.hit) {
			if(checkIntersect(prize,animal,0)) {
				alert("hit prize");
				prize.spinning = true;
				verticalSpeed = speed;
				if(prize.row==0) {
					collisionStartPrize.play();
				}else {
					collisionPrize.play();
				}
			}
		}
	}
}


function showBaddy() {
		
	if(baddyStatus == BADDY_OFF){
		setTimeout(changeBaddyImage, 100);
		baddyStatus = BADDY_FLYING;
	}
}

function drawBaddy()
{
	
	//If the baddy (owl) is currently sleeping then gamble on it coming back
	if(baddyStatus == BADDY_OFF){
	//Pick a number between 1 and 100
		shallWeStart = Math.floor(Math.random()*100);
	
	//Is this your card?
		if (shallWeStart == 50)
			showBaddy();
	}

//Check if the animal has hit the baddy
	if(checkIntersect(baddy, animal, 5)){
	//If not already done, change the horizontal speed of the animal
		if(baddyStatus != BADDY_HIT)
			horizontalSpeed = -horizontalSpeed;
	
	//Update new status, send animal down and squawk
		baddyStatus = BADDY_HIT;
		verticalSpeed = speed;
		squawk.play();
	}

//If sleeping reset x co-ordinate
	if(baddyStatus == BADDY_OFF)
		baddy.x = 500;

//If baddy (owl) is flying, then move it from right to left
	if(baddyStatus == BADDY_FLYING)
		baddy.x -=2;

//If baddy (owl) is hit then send him crashing down
	if(baddyStatus == BADDY_HIT){
		baddy.y +=2;
	//If he's gone beyond the ground then reset
	if(baddy.y > 320){
		baddyStatus = BADDY_OFF;
		baddy.x = 500;
		baddy.y = 125;
	}
}

//If baddy(owl) has flown past without being hit, then rest the x position, update the status and play a hoot!
	if(baddy.x < -20){
		baddyStatus = BADDY_OFF;
		owl.play();
		baddy.x = 500;
	}

//If baddy (owl) isn't asleep then draw him
	if(baddyStatus != BADDY_OFF){
	//rotate flap wings i.e. alternate images
		if(currentBaddyImage == 0)
			currentBaddy = baddy.image;
		else
			currentBaddy = baddy.altImg;

//If he's not hit just draw as normal
		if(baddyStatus != BADDY_HIT){
			showObjectBounds(baddy, baddy.x, baddy.y);
			ctx.drawImage(currentBaddy, baddy.x, baddy.y);	
		}else{
	//He's been hit so rotate him as he flies out of control!
			ctx.save();

	//Translate to the center of the bear (i.e. the point about which we are going to perform the rotation
			ctx.translate(baddy.x + (baddy.image.width/2), baddy.y + (baddy.image.height/2));
	
	//Adjust the angle according to the horizontal speed
			baddy.angle += 7;
	
			if(baddy.angle < 0) baddy.angle=360;
			else if(baddy.angle>360) baddy.angle=0;
	
	//Perform the rotation based on the current bear angle
			ctx.rotate(baddy.angle * Math.PI/180);
				
			showObjectBounds(baddy, - (baddy.image.width/2), - (baddy.image.width/2));
		
			ctx.drawImage(currentBaddy, - (baddy.image.width/2), - (baddy.image.width/2));
		
			ctx.restore();
		}
	}
}

//if not alseep calls itself to alternate current baddy image
function changeBaddyImage()
{
	currentBaddyImage++;
	
	if(currentBaddyImage == 2)
		currentBaddyImage = 0;
	
	if(baddyStatus != BADDY_OFF)
		setTimeout(changeBaddyImage, 100);
	
}

function drawBonus()
{
	if(bonusActive)
		ctx.drawImage(bonusImages[currentBonusImage], 200, 150);	
}

function changeBonusImage()
{
	currentBonusImage++;
	
	if(currentBonusImage == 3)
		currentBonusImage = 0;
			
	now = new Date().getTime();
	if((now-bonusStarted) < 1000)
	{
		setTimeout(changeBonusImage, 50);
	}
	else
	{
		bonusActive = false;
	}
}
/*
 *	1.clear the screen
 *	2.move the animals x and y position
 *	3.draw the background
 * 	4.draw the prizes
 * 	5.draw the mushroom
 * 	6.draw the animal
 * 	7.check if the animal has hit the edge
 * 	8.check if the animal has hit hte mushroom
 * 	9.check if the animal has hit the prize
 * */
//Main game loop 需要全局变量 ctx animal
function gameLoop() {
	
	//clear the screen
	ctx.clearRect(0,0,screenWidth,screenHeight);
	
	//move bear x and y in the current direction
	animal.x += horizontalSpeed;
	animal.y += verticalSpeed;
	
	//draw background
	ctx.drawImage(backgroundForestImg,0,0);
	
	drawScore();
	
	drawLives();
	//draw prize
	drawPrizes();
	
	drawBaddy();
	
	drawBonus();
	//draw mushroom depending on it current status
	drawMushroom();
	
	//draw animal 
	drawAnimal();
	
	//check collision for animal 
	hasAnimalHitEdge();
	hasAnimalHitMushroom();
	hasAnimalHitPrize();
	frameCount++;
}

//start/stop the game loop 全局 gameRunning and gameloopId
function toggleGameplay() {
	gameRunning = !gameRunning;
	if(gameRunning) {
		$("#BtnImgStart").hide();
		birds.play();
		startGameTimer();
	}else {
		birds.pause();
	}
}

function gameOver() {
	gameRunning = false;
	birds.pause();
	
	alert("Game Over");
}
//Start game timer, i.e. setTimeout that calls itself taking into account the
//actual real difference in time. 

function startGameTimer() {
	var start = new Date().getTime(),time = 0;
	function timer() {
		time += 15;
		var diff = (new Date().getTime() - start) - time;
		if(gameRunning) {
			gameLoop();
			window.setTimeout(timer,(15-diff));
		}
	}
	window.setTimeout(timer,15);
}

//fps counter
function startFPSCounter() {
	var start = new Date().getTime(),
	time = 0;
	function instance() {
		time += 1000;
		fps();
		var diff = (new Date().getTime() - start) - time;
        window.setTimeout(instance, (1000 - diff));
	}
	window.setTimeout(instance,1000);
}
	
//fps display
function fps() {
	$("#fps").html(frameCount+" fps");
	frameCount = 0;
}	

























