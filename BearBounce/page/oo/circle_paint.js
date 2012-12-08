/**
 * @author Walter
 */
var context = document.getElementById("circle").getContext("2d");
var radiusOfSpot = 1;
var isUp = true;
$(function() {
	var width = window.screen.width;
	var height = window.screen.height;
	$("#circle").attr("width",width);
	$("#circle").attr("height",height);
	context.translate(parseInt($("#circle").attr("width"))/2, parseInt($("#circle").attr("height"))/2);
	//setInterval(paint,100);	
	setInterval(getUpAndDownNum,1);
});

function paint() {
	for (var i = 1; i < 10; i++) {
		context.save();
		context.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ',255)';
		for (var j = 0; j < i * 6; j++) {
			context.rotate(Math.PI * 2 / (i * 6));
			context.beginPath();
			context.arc(0, i * 200, radiusOfSpot, 0, Math.PI * 2, true);
			context.fill();
		}
		context.restore();
	}
}

function getUpAndDownNum() {
	if(isUp) {
		radiusOfSpot++;
	}else {
		radiusOfSpot--;
	}
	if(radiusOfSpot<=0) {
		isUp = true;
		radiusOfSpot =  1;		
		return;
	}
	if(radiusOfSpot>10) {
		isUp = false;
		radiusOfSpot =10;		
		return;
	}
	paint();
}



