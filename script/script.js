window.onload = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	var game = new Phaser.Game(w, h, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		render: render
	});
	function preload() {
		// Sprites here ...
		game.load.image('flake', 'style/sprites/flake.png');
	}

	var flake;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		//  We're going to be using physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 0;
		game.physics.arcade.gravity.x = 0;

		// Handling device rotation
		window.addEventListener("deviceorientation", function(e){
			// Handling device up-down rotation
			if(e.beta > 80 && e.beta <= 110)
				game.physics.arcade.gravity.y = 300;
			else if(e.beta > 55 && e.beta <= 80)
				game.physics.arcade.gravity.y = 200;
			else if(e.beta > 20 && e.beta <= 55)
				game.physics.arcade.gravity.y = 100;
			else if(e.beta < -20 && e.beta >= -55)
				game.physics.arcade.gravity.y = -100;
			else if(e.beta < -55 && e.beta >= -80)
				game.physics.arcade.gravity.y = -200;
			else if(e.beta < -80 && e.beta > -110)
				game.physics.arcade.gravity.y = -300;
			else
				game.physics.arcade.gravity.y = 0;
			// Handling device left-right rotation
			if(e.alpha > 80 && e.alpha <= 110)
				game.physics.arcade.gravity.x = 300;
			else if(e.alpha > 55 && e.alpha <= 80)
				game.physics.arcade.gravity.x = 200;
			else if(e.alpha > 20 && e.alpha <= 55)
				game.physics.arcade.gravity.x = 100;
			else if(e.alpha < -20 && e.alpha >= -55)
				game.physics.arcade.gravity.x = -100;
			else if(e.alpha < -55 && e.alpha >= -80)
				game.physics.arcade.gravity.x = -200;
			else if(e.alpha < -80 && e.alpha > -110)
				game.physics.arcade.gravity.x = -300;
			else
				game.physics.arcade.gravity.x = 0;
		}, true);
		// Adding sprite
		addFlake(0);
	}
	function render() {
	}

	function addFlake(deepness) {
		flake = game.add.sprite((Math.random()*10000)%w, 0, 'flake');
		// Adding physic to sprite1
		game.physics.enable( [ flake ], Phaser.Physics.ARCADE);
		flake.body.collideWorldBounds = true;
		// Coefficente di rimbalzo
		flake.body.bounce.y = 0;
		// Gravità singolo fiocco (= peso)
		flake.body.gravity.y = -(Math.random()*100)%80;

		if (deepness < 100) {
			//setTimeout(function() {
				deepness = deepness + 1;
				addFlake(deepness);
			//}, 10);
		}
	}

	/*$(document).on('click', '#up', function () {
		game.physics.arcade.gravity.y = -300;
	});
	$(document).on('click', '#down', function () {
		game.physics.arcade.gravity.y = 300;
	});
	$(document).on('click', '#right', function () {
		game.physics.arcade.gravity.x = 300;
	});
	$(document).on('click', '#left', function () {
		game.physics.arcade.gravity.x = -300;
	});
	$(document).on('click', '#stop_up_down', function () {
		game.physics.arcade.gravity.y = 0;
	});
	$(document).on('click', '#stop_left_right', function () {
		game.physics.arcade.gravity.x = 0;
	});*/
}
