$(function() {
/*
	$("#alp").blur(function() {
		var value = $("#alp").val();
		$("#alpimg").attr("src","img/"+value+".png");		
	});*/
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(screen.width/2,screen.height/2);
	
	//setInterval(paint,100);
	mouseC();
	arcP();
	arcQ();
	//circleP();
});


function arcQ () {
 	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(0,0);
	context.moveTo(0,200);
	context.lineWidth = 0.01;
	context.lineTo(1400,200);
	context.stroke();
	var i=0;
	var y=0;
	context.moveTo(0,200);

	for(i=0;i<3600;i+=2) {
		y = Math.sin(i*100000);
		singlepaint(context,i,y);
		context.lineTo(i
			,y*10+200);
		context.stroke();
	}
}

function circleP() {
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(0,0);
	context.moveTo(600,400);
	var c = 600;
	var r = 1;
	for(var i=0;i<50;i++) {
		var start = 0;
		var end = 0;
		if(i%2==0) {
			start = 0;
			end = Math.PI;
		}else {
			start = Math.PI;
			end = 2*Math.PI;
		}
		context.arc(c-r,400,2*r,start,end,true);
		r *=2;
		context.stroke();
	}
	
}




function singlepaint(context,i) {
	var y = Math.sin(i*100000);
	context.beginPath();
	context.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',0.1)';
	context.arc(i,y*100+200,20,0,2*Math.PI,true);
	context.fill();
}

function arcP() {
	
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(0,0);
	context.beginPath();
	context.strokeStyle = "rgb(182,0,0)";
	context.moveTo(200,200);
	context.lineTo(300,300);
	context.lineTo(100,400);
	context.stroke();
	context.beginPath();
	context.moveTo(200,200);
	context.strokeStyle = "rgb(0,255,43)";
	context.arcTo(300,300,100,400,50);
	context.stroke();
	context.beginPath();
	context.strokeStyle = "rgb(45,255,0)";
	context.moveTo(200,200);
	context.arcTo(300,300,100,400,80);
	context.stroke();
	context.beginPath();
	context.strokeStyle = "rgb(123,255,0)";
	context.moveTo(200,200);
	context.arcTo(300,300,100,400,100);
	context.stroke();
	context.beginPath();
	context.moveTo(200,200);
	context.strokeStyle = "rgb(0,255,255)";
	context.arcTo(300,300,100,400,150);
	context.stroke();
	
}




function mouseC() {
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(0,0);
	var flag = false;
	$("#rec").mousedown(function() {
		flag = true;
	});
	$("#rec").mouseup(function() {
		flag = false;
		$("title").html("LOSE FOCUS");
		//context.clearRect(0,0,screen.width,screen.height);		
	});
	$("#rec").mousemove(function(e) { 
		context.save();
		if(flag) {
			$("title").html(e.originalEvent.x+","+e.originalEvent.y);
			var x = e.originalEvent.x;
			var y = e.originalEvent.y;
			context.moveTo(x,y);
			context.beginPath();
			context.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',0.3)';
			context.arc(x,y,30,0,2*Math.PI,true);
			context.fill();
		}
		context.restore();
	});
	
	
}




function getSign(angle, x_y) {
	var xFlag = [1, 1, 0, -1, -1, -1, 0, 1, 1];
	var yFlag = [0, 1, 1, 1, 0, -1, -1, 1, 0];
	if (angle > 360) {
		angle = angle % 360;
	}
	var m = angle/45
	if (x_y == "x")
		return xFlag[m];
	else
		return yFlag[m];
}



function paint(context) {
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(screen.width/2,screen.height/2);
	//context.clearRect(0,0,screen.width,screen.height);
	var length = 350;
	var oldX = 0;
	var oldY = 0;
	var isFirst = true;
	for (var i = 0; i < 10; i++) {
		var angle = i * 45;
		var newX = oldX + getSign(angle, "x") * Math.sqrt((Math.pow(((length / (Math.pow((Math.sqrt(2)), i))) / 2), 2)) / 2);
		var newY = oldY + getSign(angle, "y") * Math.sqrt((Math.pow(((length / (Math.pow((Math.sqrt(2)), i))) / 2), 2)) / 2);
		context.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',0.3)';
		context.lineTo(newX, newY);
		context.fillRect(0, 0, (length / (Math.pow((Math.sqrt(2)), i))), (length / (Math.pow((Math.sqrt(2)), i))));
		oldX = newX;
		oldY = newY;
		context.rotate(45 * Math.PI / 180);
	}
	
}


function patin_2() {
	$("#rec").attr("width",screen.width);
	$("#rec").attr("height",screen.height);
	var mycanvas = document.getElementById("rec");
	var context = mycanvas.getContext("2d");
	context.translate(screen.width/2,screen.height/2);
	context.strokeStyle = "rgba(32,0,0,1)";

	for(var i=0;i<8;i++) {
		context.moveTo(0,0);
		context.rotate(45*Math.PI/180);
		context.lineTo(0,200);
		context.stroke();
	}
	context.beginPath();
	context,moveTo(0,0);
	context.arc(0,0,200,0,2*Math.PI,true);
	context.stroke();
}
