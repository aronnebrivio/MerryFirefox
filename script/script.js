window.onload = function() {
	var s = "<marquee direction='down' scrollamount='"
	var s1 = "' style='top: 0px; left: "
	var s2 = "%; height: "
	var s3 = "%;'>*</marquee>"
	for(var i = 0; i < 100; i++) {
		$('body').append(s + parseInt(Math.random() * 100)%13 + s1 + parseInt(Math.random() * 100) + s2 + parseInt(Math.random() * 100) + s3);
	}
}