//device is in normal position
top=false;

//device is in top-down position 
down=false;
$(document).ready(function() {
	console.log("Loaded.");
	window.addEventListener("deviceorientation", function(e){
		if(e.beta>80||e.beta<110)
		    top=true;
		if(e.beta<-80 && e.beta>-110)
		    down=true;
		if(top&&down){
		    down=false;
		    top=false;
		    doSmt();
		}
	}, true);
	//window.ondevicemotion = function() {
		var s = "<marquee direction='down' scrollamount='"
		var s1 = "' style='top: 0px; left: "
		var s2 = "%; height: "
		var s3 = "%;'>*</marquee>"
		for(var i = 0; i < 50; i++) {
			$('body').append(s + parseInt(Math.random() * 100)%13 + s1 + parseInt(Math.random() * 100) + s2 + parseInt(Math.random() * 100) + s3);
		}
	//}
});
