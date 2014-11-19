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
				game.physics.arcade.gravity.y = 200;
			else if(e.beta > 55 && e.beta <= 80)
				game.physics.arcade.gravity.y = 100;
			else if(e.beta > 20 && e.beta <= 55)
				game.physics.arcade.gravity.y = 50;
			else if(e.beta < -20 && e.beta >= -55)
				game.physics.arcade.gravity.y = -50;
			else if(e.beta < -55 && e.beta >= -80)
				game.physics.arcade.gravity.y = -100;
			else if(e.beta < -80 && e.beta > -110)
				game.physics.arcade.gravity.y = -200;
			else
				game.physics.arcade.gravity.y = 0;
			// Handling device left-right rotation
			if(e.gamma > 80 && e.gamma <= 110)
				game.physics.arcade.gravity.x = 200;
			else if(e.gamma > 55 && e.gamma <= 80)
				game.physics.arcade.gravity.x = 100;
			else if(e.gamma > 20 && e.gamma <= 55)
				game.physics.arcade.gravity.x = 50;
			else if(e.gamma < -20 && e.gamma >= -55)
				game.physics.arcade.gravity.x = -50;
			else if(e.gamma < -55 && e.gamma >= -80)
				game.physics.arcade.gravity.x = -100;
			else if(e.gamma < -80 && e.gamma > -110)
				game.physics.arcade.gravity.x = -200;
			else
				game.physics.arcade.gravity.x = 0;
		}, true);
		// Adding sprite
		addFlake(0);
	}
	function render() {
	}

	function addFlake(deepness) {
		flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake');
		// Adding physic to sprite1
		game.physics.enable( [ flake ], Phaser.Physics.ARCADE);
		flake.body.collideWorldBounds = true;
		// Mass of the flake
		flake.body.mass = (Math.random()*100)%10;
		flake.body.solid = true;
		// Coefficente di rimbalzo
		flake.body.bounce.y = 0;
		// Gravità singolo fiocco (= peso)
		//flake.body.gravity.y = (Math.random()*100)%50;
		// No overlap with other flakes while creating them
		if (flake.body.embedded) {
			flake.body.destroy();
			deepness = deepness - 1;
		}
		if (deepness < 100) {
			//setTimeout(function() {
				deepness = deepness + 1;
				addFlake(deepness);
			//}, 10);
		}
	}
}
