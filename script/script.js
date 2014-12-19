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

	var flake, flakes;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		game.world.setBounds(0, 0, w, h);
		// Enabling the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Handling device rotation
		window.addEventListener("deviceorientation", function(e){
			/*var x = e.gamma; // range [-90,90]
			var y = e.beta;  // range [-180,180]
			console.log("ok");
			game.physics.arcade.gravity.x += x/4;
			game.physics.arcade.gravity.y += y/8;*/
		
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
		flakes = [];
		for (i = 0; i < 100; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake');
			game.physics.arcade.enableBody(flake, true);
			//flake.body.mass = Math.floor((Math.random() * 2.5) + 1);
			console.log("flake number " + i + " mass: " + flake.body.mass);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;
			
			flakes[i] = flake;
		}
	}
	
	function update(){
	    game.physics.arcade.collide(flakes,flakes);
	}
}


