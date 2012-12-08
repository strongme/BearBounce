$(function(){
	$("#canvas").attr("width",screen.width-450);
	$("#canvas").attr("height",screen.height);
	init();
});

function init() {
	clock();
	setInterval(clock,10);
}

function clock() {
	var headImg = new Image();
	var centerX = 200;
	var centerY = 200;
	var now = new Date();
	var context = document.getElementById('canvas').getContext('2d');
	context.clearRect(0,0,screen.width,screen.height);
	context.save();
	context.translate(screen.width/2-200,screen.height/2);
	//context.scale(0.4,0.4);
	context.rotate(-Math.PI/2);
	context.strokeStyle = "black";
	context.fillStyle = "white";
	context.lineWidth = 8;
	context.lineCap = "round";
	
	//Hour marks
	context.save();
	for(var i=0;i<12;i++) {
		context.beginPath();
		context.rotate(Math.PI/6);
		context.moveTo(centerX+25, 0);
		context.lineTo(centerX+45, 0);
		context.strokeStyle = "rgb(34,54,123)";
		context.stroke();

	}
	context.restore();
	

	// Minute marks
	context.save();
	context.lineWidth = 5;
	for ( i = 0; i < 60; i++) {
		if (i % 5 != 0) {
			context.beginPath();
			context.moveTo(centerX+42, 0);
			context.lineTo(centerX+45, 0);
			context.stroke();
		}
		context.rotate(Math.PI / 30);
	}
	context.restore(); 


	var sec = now.getSeconds();
	var min = now.getMinutes();
	var hr = now.getHours();
	hr = hr >= 12 ? hr - 12 : hr;

	context.fillStyle = "black"; 

	// write Hours
	context.save();
	context.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
	context.lineWidth = 14;
	context.beginPath();
	context.moveTo(-20, 0);
	context.lineTo(centerX-40, 0);
	context.stroke();
	context.restore();

	// write Minutes
	context.save();
	context.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
	context.lineWidth = 10;
	context.beginPath();
	context.moveTo(-28, 0);
	context.lineTo(centerX+10, 0);
	context.stroke();
	context.restore();

	// Write seconds
	context.save();
	context.rotate(sec * Math.PI / 30);
	context.strokeStyle = "#D40000";
	context.fillStyle = "#D40000";
	context.lineWidth = 6;
	context.beginPath();
	context.moveTo(-30, 0);
	context.lineTo(centerX+8, 0);
	context.stroke();
	context.beginPath();
	context.arc(0, 0, 10, 0, Math.PI * 2, true);
	context.fill();
	context.beginPath();
	context.arc(centerX+20, 0, 10, 0, Math.PI*2, true);
	context.stroke();
	context.fillStyle = "#555";
	context.arc(0, 0, 3, 0, Math.PI * 2, true);
	context.fill();
	if(sec%5==0) {
		$("#headImg").attr("src","img/"+sec/5+".png");
		//$("#headImg").css("display","block");
		$("#headImg").slideDown(100);
	}else {
		//$("#headImg").css("display","none");
		$("#headImg").slideUp(100);
	}
	context.restore();

	context.beginPath();
	context.lineWidth = 14;
	context.strokeStyle = '#325FA2';
	context.arc(0, 0, centerX+67, 0, Math.PI * 2, true);
	context.stroke();

	context.restore(); 

}
