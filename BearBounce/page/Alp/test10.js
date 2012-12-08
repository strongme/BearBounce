$(function() {
	
	
	
	
	
});

	/*
	var ob = Object.create(null);
		var age = 0;
		Object.defineProperties(ob,
			{
				'name':{
					value:"Walter",
					writable:true,
					configurable:true,
					enumerable:true
				},
				'tel':{
					value:"5288880",
					writable:true,
					configurable:true,
					enumerable:true
				},
				'email':{
					value:"hot120@live.cn",
					writable:true,
					configurable:true,
					enumerable:true
				},
				'age':{
					get:function() {return age+1;},
					set:function(value) {age = value;},
					enumerable:true,
					configurable:true
				},
				'birth_year':{
					get:function() {
						var now = new Date();
						var year = now.getFullYear();
						var birth = year - this.age;
						return birth;
					},
					set:function(value) {
						var now = new Date();
						var year = now.getFullYear();
						this.age = year - value;
					}
				}
			}
			);
		alert(ob.name);
		alert(ob.tel);
		alert(ob.email);
		alert(ob.age);
		ob.age = 10;
		alert(ob.age);
		alert(ob.birth_year);
		ob.birth_year = 1990;
		alert(ob.age);
		
		
		var walter = {
			name:"Walter",
			age:23,
			email:"624917867@qq.com",
			get birth_year() {
				var now = new Date();
						var year = now.getFullYear();
						var birth = year - this.age;
						return birth;
			},
			set birth_year(value) {
				var now = new Date();
						var year = now.getFullYear();
						this.age = year - value;
			}
		};
		alert(walter.age);
		alert(walter.birth_year);
		*/