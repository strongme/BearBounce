function MyFunc() {
	MyFunc.prototype.stringVal = "Jack";
};

function Circle(radius) {
	Circle.prototype.radius = radius;
	Circle.prototype.getRadius = function() {
		return this.radius;
	};
	Circle.prototype.getCircumference = function() {
		var cir = this.radius*2*3.14;
		return cir;
	};
	Circle.prototype.getArea = function() {
		return this.radius*this.radius*3.14;
	};
	this.getDescription = function() {
		return "I am a Circle !";
	};
}

$(function() {
	var my = new MyFunc();
	//alert(my.stringVal);
	// my.stringVal = "Hello OO JS";
	//alert(my.stringVal);
	// var circle = new Circle(500);
	// alert(circle.getRadius());
	// alert(circle.getCircumference());
	// alert(circle.getArea());
	// alert(circle.getDescription());
	// var num = new Number(6);
	// num.getDouble = function() {return this*2;};
	// alert(num.getDouble());
	alert(my.prototype);
	
	
});

