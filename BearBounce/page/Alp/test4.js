var img = new Image();
img.src = "img/longimg.jpg";
var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30;
var scale = 1.05;
var y = -4.5;

var dx = 0.75;
var imgW = img.width * scale;
var imgH = img.height * scale;
var x = 0;
if (imgW > CanvasXSize) {
	x = CanvasXSize - imgW;
}
var clearX;
var clearY;
if (imgW > CanvasXSize) {
	clearX = imgW;
} else {
	clearX = CanvasXSize;
}
if (imgH > CanvasYSize) {
	clearY = imgH;
} else {
	clearY = CanvasYSize;
}
var context;
$(function() {
	init();
});
function init() {
	context = document.getElementById("canvas").getContext("2d");
	setInterval(draw, speed);
}

function draw() {
	context.clearRect(0, 0, clearX, clearY);
	if (imgW <= CanvasXSize) {
		if (x > CanvasXSize) {
			x = 0;
		}
		if (x > (CanvasXSize - imgW)) {
			context.drawImage(img, x - CanvasXSize + 1, y, imgW, imgH);
		} else {
			if (x > CanvasXSize) {
				x = CanvasXSize - imgW;
			}
			if (x > (CanvasXSize - imgW)) {
				context.drawImage(img, x - imgW + 1, y, imgW, imgH);
			}
		}
	}
	context.drawImage(img, x, y, imgW, imgH);
	x += dx;
}

