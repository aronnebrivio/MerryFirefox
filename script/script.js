window.onload = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	game = new Phaser.Game(w, h, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});
	function preload() {
		game.load.image('flake', 'style/sprites/flake.png');
	}

	var flake;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		game.world.setBounds(0, 0, w, h);
		// Enabling the Arcade Physics system and setting gravity to 0
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
		
		// Adding flakes
		flakes=Array();
		for (i = 0; i < 100; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake');
			// Adding physic to the flakes
			game.physics.arcade.enableBody(flake, true);
		
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;

			flakes[flakes.length]=flake;
		}
	}
	
	function update(){
	    game.physics.arcade.collide(flakes,flakes);
	}
}


