$(function() {
    $("#bglong").load(function() {
        alert("图片加载完成");
    });
   // oo();
   //var dateNow = new Date();
   var timerId;
    $("#name").blur(function() {
        
        if($("#name").val()=="") {
            timerId = setInterval(flash,600);
        }else {
            var color = $("#c").val();
            $("#name").css("border", "1px inset #139bec");
            clearInterval(timerId);
        }
    });
});
var flag = false;
function flash() {
        if (flag) {
            flag = false;
            $("#name").css("border", "1px inset #139bec");
        } else {
            flag = true;
            $("#name").css("border", "6px inset #139bec");
        }
}


function oo() {
    
    var o = {x: "don't change this value"};
   // document.write(o.x);
    var o1 = {
        $name :"Smash",
        x :{
            m :"Benz",
            n :"Jeep"           
        },
        y:90,
        "s":"Jacl Me",
        doDisplay : function() {
            alert(this.y);
        }
    };
    o1.y = 100;
    alert(o1.x.m);
    o1.doDisplay();
    var a = new Animal();
    alert(a.name);
    alert(o1["s"]);
    o1.smile = "Fac";
    alert(o1.smile);
    alert(delete o1.smile);
    alert(o1.smile);
    alert("O1 has toString property:"+o1.hasOwnProperty("toString"));
    alert(o1.ss!=undefined);
    var me = undefined;
    var you = null;
    alert(me !==undefined);
    alert(you === undefined);
    alert(you === null);
    alert(you == null);
   alert(o1.$name);
}

function Animal() {
    Animal.prototype.name = "Animal";
    Animal.bark = "YES";
}
function Dog() {
    Dog.prototype = new Animal();
}
