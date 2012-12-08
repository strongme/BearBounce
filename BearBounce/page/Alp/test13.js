/**
 * @author 1
 */

$(function() {
	//alert(1/0);
	/*
	window.showModalDialog("http://www.baidu.com");
		alert("eval(4/12):"+eval(4/12));
		alert("eval('4/12'):"+eval("4/12"));
		alert("parseInt(4/12)"+parseInt(4/12));
		alert("parseInt('4/12')"+parseInt("4/12"));
		alert("parseFloat(4/12):"+parseFloat(4/12));
		alert("parseFloat('4/12')"+parseFloat("4/12"));*/
		
		var s = "汉字";
		//alert(s.length);
		
});

function link() {
	var xx = document.getElementsByName("xx")[0].value;
	var yy = document.getElementsByName("yy")[0];
	var innerYY = yy.innerHTML;
	innerYY = "<option value=''></option>"
	if(xx=="1") {
		innerYY += "<option value='3xx'>3xx</option><option value='4xx'>4xx</option>"
	}
	if(xx=="2") {
		innerYY += "<option value='5xx'>5xx</option><option value='6xx'>6xx</option>"
	}
	yy.innerHTML = innerYY;
}
