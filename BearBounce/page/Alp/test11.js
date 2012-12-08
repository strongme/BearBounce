$(function() {
	$("#tag").focus(function() {
			$("#tag").val("");
		});
		$("#show_advanced").toggle(function() {
			$(".advanced").show();
		}, function() {
			$(".advanced").hide();
		});
		$("#quick_find").click(function() {
			$("#quick_frame").css("display","inherit");
			$("#quick_find").css("background","url(img/find_icon.png) 100% -137px");
			$(".fast").css("background","url(img/find_icon.png) 0 -41px");
			$("#interest_frame").css("display","none");
			$("#interest_find").css("background","url(img/find_icon.png) no-repeat 100% -218px");
			$(".interest").css("background","url(img/find_icon.png) -80px 0");
			$("#quick_find").css("color","rgba(85,170,255,0.8)");
			$("#interest_find").css("color","white");
		});
		$("#interest_find").click(function() {
			$("#interest_frame").css("display","inherit");
			$("#quick_find").css("background","url(img/find_icon.png) 100% -218px");
			$(".fast").css("background","url(img/find_icon.png) 0 0");
			$("#quick_frame").css("display","none");
			$("#interest_find").css("background","url(img/find_icon.png) no-repeat 100% -137px");
			$(".interest").css("background","url(img/find_icon.png) -80px -43px");
			$("#quick_find").css("color","white");
			$("#interest_find").css("color","rgba(85,170,255,0.8)");
		});
			
});
