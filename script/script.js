var s1 = "<canvas id='my_canvas' widht='";
var s2 = "' height='";
var s3 = "'></canvas>";

var MerryFirefox = {};

MerryFirefox.printFlake = function (deepness) {
	var flake = Physics.body('circle', {
		x: (Math.random()*10000)%(w-5),
		y: 5,
		radius: 5
	});
	world.add(flake);
	world.render();
	if (deepness < 50) {
		setTimeout(function() {
			console.log(deepness)
			deepness++;
			printFlake(deepness);
		}, 500);
	}
}

$(document).ready(function() {
	var h = $("body").height();
	var w = $("body").width();
	$("body").append(s1 + w + s2 + h + s3);
	
	Physics(function(world) {
		var renderer = Physics.renderer('canvas', {
			el: 'my_canvas', // id of the canvas element
			width: w,
			height: h
		});
		world.add(renderer);

		(function printFlake (deepness) {
	var flake = Physics.body('circle', {
		x: (Math.random()*10000)%(w-5),
		y: 5,
		radius: 5
	});
	world.add(flake);
	world.render();
	if (deepness < 50) {
		setTimeout(function() {
			console.log(deepness);
			deepness = deepness + 1;
			printFlake(deepness);
		}, 10);
	}
})(0)

		// subscribe to ticker to advance the simulation
		Physics.util.ticker.on(function(time, dt){
			world.step(time);
		});
		// start the ticker
		Physics.util.ticker.start();

		// Every steps, it renders
		world.on('step', function(){
			world.render();
		});

		// Let's add gravity
		world.add(Physics.behavior('constant-acceleration'));

		// Let's define the bounds of the world
		var bounds = Physics.aabb(0, 0, w, h);

		// Let's add an edge collision detection
		world.add( Physics.behavior('edge-collision-detection', {
			aabb: bounds,
			restitution: 0.3
		}) );
		// Ensure objects bounce when edge collision is detected
		world.add( Physics.behavior('body-impulse-response') );
	});
});
