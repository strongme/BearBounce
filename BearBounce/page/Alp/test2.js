$(function(){
	
	init();
});

var earth = new Image();
var moon = new Image();
var sun = new Image();

function init() {
	earth.src = "img/earth.png";
	moon.src = "img/moon.png";
	sun.src = "img/sun.png";	
	setInterval(draw,1);
}

function draw() {
	var context = document.getElementById('canvas').getContext('2d');
	context.globalCompositeOperation = 'destination-over';
	context.clearRect(0,0,300,300);	
	
	context.fillStyle = 'rgba(0,0,0,0.4)';
	context.strokeStyle = 'rgba(0,153,255,0.4)';
	context.save();
	context.translate(150,150);
	//Earth
	var time = new Date();
	context.rotate(((2*Math.PI)/60)*time.getSeconds()+((2*Math.PI)/60000)*time.getMilliseconds());
	context.translate(105,0);
	//context.fillRect(0,-12,50,24);
	context.drawImage(earth,-20,-20,30,30);
	
	//Moon
	context.save();
	context.rotate(((2*Math.PI)/60)*time.getSeconds()+((2*Math.PI)/60000)*time.getMilliseconds());		
	context.translate(0,28.5);
	context.drawImage(moon,-3.5,-3.5,10,10);
	context.restore();
	
	context.restore();
	context.beginPath();
	context.arc(150,150,105,0,Math.PI*2,false);
	context.stroke();
	
	context.drawImage(sun,115,115,70,70);
	
}
