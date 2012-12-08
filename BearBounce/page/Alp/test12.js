$(function() {
	var speed = 11;
	var img = new Image();
	img.src = "img/icon.png";
	var width = img.width;
	var height = img.height;
	$("#goLeft").click(function() {
		var xNow = $("#test").css("background-position-x");
		xNow = xNow.substring(0,xNow.length-2);
		var numX = parseInt(xNow);
		numX = numX-speed;
		if(numX<-width) numX = -width;
		$("#test").css("background-position-x",numX+"px");
	});
	$("#goRight").click(function() {
		var xNow = $("#test").css("background-position-x");
		xNow = xNow.substring(0,xNow.length-2);
		var numX = parseInt(xNow);
		numX = numX+speed;
		if(numX>width) numX = width;
		$("#test").css("background-position-x",numX+"px");
	});
	$("#goUp").click(function() {
		var yNow = $("#test").css("background-position-y");
		yNow = yNow.substring(0,yNow.length-2);
		var numY = parseInt(yNow);
		numY = numY-speed;
		if(numY<-height) numY = -height;
		$("#test").css("background-position-y",numY+"px");
	});
	$("#goDown").click(function() {
		var yNow = $("#test").css("background-position-y");
		yNow = yNow.substring(0,yNow.length-2);
		var numY = parseInt(yNow);
		numY = numY+speed;
		if(numY>height) numY = height;
		$("#test").css("background-position-y",numY+"px");
	});
});
