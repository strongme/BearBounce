
var o = {
	name: "Jarry",
	age: 25
};


$(function() {

	//alert(o.name);	//=>Jarry
	var text = document.createTextNode("HA");
	document.body.appendChild(text);
	
	$("body").append($("<h1>Wommer</h1>"))	
	if(window.localStorage)
		//alert("Support");
		
	testArgu("as",43,true);
});

function testArgu() {
  alert(arguments.length);
}

function aj() {
	$.ajax({
		type: "GET",
		url : "data.json",
		dataType : "json",
		success : function(data) {
			alert(data);
			var content = "<ul>";
			for(var i=0;i<data.length;i++) {
				content += "<li>"+data[i].name+"</li>";
				content += "<li>"+data[i].email+"</li>";
				content += "<li>"+data[i].gender+"</li>";
			}
			content += "</ul>"
			$("#content").html(content);
		}
	});
	
}
