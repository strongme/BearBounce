var ball = $("#ball");
ball.horizontalSpeed = -30;
ball.verticalSpeed = 30;
var speed = "160";
var runnging = false;
var sound1 = new Audio("../../audio/boing_2.mp3");
var sound2 = new Audio("../../audio/boing_3.mp3");
var sound3 = new Audio("../../audio/boing_4.mp3");
var sound4 = new Audio("../../audio/crowdgroan.mp3");
$(function() {
	$("#paddleA").css("top","20px");
	$("#paddleB").css("top","20px");
	runnging = true;
	$(document).keypress(monitor);
	
	setInterval(monitorForBall,100);
});

function monitor(e) {
	//alert(e.which);
	switch(e.which) {
		case 115:
			//S
			move($("#paddleA"),"0",speed);
			break;
		case 119:
			//W
			move($("#paddleA"),"0","-"+speed);
			break;
		case 56:
			//8
			move($("#paddleB"),"0","-"+speed);
			break;
		case 50:
			move($("#paddleB"),"0",speed);
			break;
		default:
			break;
	}
}

function move(paddle,horizontal,vertical) {
	var oldLeft = paddle.css("left");
	var oldTop = paddle.css("top");
	var left = parseInt(oldLeft)+parseInt(horizontal);
	var top = parseInt(oldTop)+parseInt(vertical);
	paddle.css("left",left);
	if(top<0) {
		paddle.css("top",0);
		return;
	}
	if(top>parseInt($("#platform").css("height"))-parseInt($(".paddle").css("height"))) {
		paddle.css("top",parseInt($("#platform").css("height"))-parseInt($(".paddle").css("height")));
		return;		
	}
	paddle.css("top",top);
}

function monitorForBall() {
	
	if(runnging) {
		var oldTop = parseInt($("#ball").css("top"));				
		var oldLeft = parseInt($("#ball").css("left"));
		var top = oldTop + ball.verticalSpeed;
		var left = oldLeft + ball.horizontalSpeed;
		$("#ball").css("top",top);
		$("#ball").css("left",left);
		
		var leftBall = parseInt(ball.css("left")); 
		var leftBall_ = parseInt(ball.css("left"))+parseInt($("#ball").css("width"));
		var topBall =parseInt(ball.css("top"));
		var topBall_ = parseInt(ball.css("top"))+parseInt($("#ball").css("height"));
		var leftPaddleA = parseInt($("#paddleA").css("left"))+parseInt($(".paddle").css("width"));
		var topPaddleA = parseInt($("#paddleA").css("top"));	
		var topPaddleA_ = parseInt($("#paddleA").css("top"))+parseInt($(".paddle").css("height"));
		var leftPaddleB = parseInt($("#paddleB").css("left"));
		var topPaddleB = parseInt($("#paddleB").css("top"));
		var topPaddleB_ = parseInt($("#paddleB").css("top"))+parseInt($(".paddle").css("height"));
		var bottom = parseInt($("#platform").css("height"))-parseInt($("#ball").css("height"));
		
		
		//touch top?
		if(topBall<=0) {
			ball.verticalSpeed = -ball.verticalSpeed;
			sound1.play();			
		}
		//touch bottom	
		if(topBall>=bottom) {
			ball.verticalSpeed = -ball.verticalSpeed;
			sound2.play();				
		}
		//touch paddleA  
		if(leftBall<=leftPaddleA) {
			if((topBall>=topPaddleA && topBall_<=topPaddleA_)||(topBall_>=topPaddleA && topBall_<=topPaddleA_)||(topBall<=topPaddleA_ && topBall>=topPaddleA)) {
				ball.horizontalSpeed = -ball.horizontalSpeed;
				sound3.play();
			}else {
				//out of safe area
				sound4.play();
				runnging = false;
			}
		}
		//touch paddleB
		if(leftBall_>=leftPaddleB) {
			if((topBall>=topPaddleB && topBall_<=topPaddleB_)||(topBall_>=topPaddleB && topBall_<=topPaddleB_)||(topBall>=topPaddleB && topBall<=topPaddleB_)) {
				ball.horizontalSpeed = -ball.horizontalSpeed;
				sound3.play();
			}else {
				//out of safe area
				sound4.play();
				runnging = false;
			}
		}
	}
}
