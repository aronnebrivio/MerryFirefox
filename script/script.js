// Some useful variables
var up = false;
var down = false;
var s = "<marquee direction='down' scrollamount='";
var s1 = "' style='top: 0px; left: ";
var s2 = "%; height: ";
var s3 = "%;'>*</marquee>";

$(document).ready(function() {

	window.addEventListener("deviceorientation", function(e){
		console.log(e.beta);
		console.log("up = " + up);
		console.log("down = " + down);
		// Handling device rotation
		if(down) {
			if(e.beta > 80 && e.beta < 110)
				up=true;
		}
		if(e.beta < -80 && e.beta > -110)
			down=true;
		if(up && down){
			console.log("UP & DOWN!!!");
			letItSnow();
			down=false;
			up=false;
		}
	}, true);

});
	
function letItSnow() {
	for(var i = 0; i < 50; i++) {
		$('body').append(s + parseInt(Math.random() * 100)%13 + s1 + parseInt(Math.random() * 100) + s2 + parseInt(Math.random() * 100) + s3);
	}
	// Snow will stop falling after 10 seconds
	setTimeout(function () {
		$('marquee').remove();
	}, 10000);
}