window.onload = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	game = new Phaser.Game(w, h, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});
	function preload() {
		game.load.image('flake1', 'assets/flake1.png');
		game.load.image('flake2', 'assets/flake2.png');
		game.load.image('flake3', 'assets/flake3.png');
		game.load.image('logo', 'assets/merrylogo1.png');
	}

	var flake, flakes, max=60;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		game.world.setBounds(0, 0, w, h);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		logo = game.add.sprite(w/2-150, h/2-80, 'logo');
		logo.scale.setTo(0.6, 0.6);
		flakes = [];
		addFlakes(false);
		
		// Handling device rotation
		window.addEventListener("deviceorientation", function(e){		
			// Handling device up-down rotation
			if(e.beta > 80 && e.beta <= 110)
				game.physics.arcade.gravity.y = 150;
			else if(e.beta > 55 && e.beta <= 80)
				game.physics.arcade.gravity.y = 75;
			else if(e.beta > 20 && e.beta <= 55)
				game.physics.arcade.gravity.y = 25;
			else if(e.beta < -20 && e.beta >= -55)
				game.physics.arcade.gravity.y = -25;
			else if(e.beta < -55 && e.beta >= -80)
				game.physics.arcade.gravity.y = -75;
			else if(e.beta < -80 && e.beta > -110)
				game.physics.arcade.gravity.y = -150;
			else
				game.physics.arcade.gravity.y = 0;
			// Handling device left-right rotation
			if(e.gamma > 80 && e.gamma <= 110)
				game.physics.arcade.gravity.x = 150;
			else if(e.gamma > 55 && e.gamma <= 80)
				game.physics.arcade.gravity.x = 75;
			else if(e.gamma > 20 && e.gamma <= 55)
				game.physics.arcade.gravity.x = 25;
			else if(e.gamma < -20 && e.gamma >= -55)
				game.physics.arcade.gravity.x = -25;
			else if(e.gamma < -55 && e.gamma >= -80)
				game.physics.arcade.gravity.x = -75;
			else if(e.gamma < -80 && e.gamma > -110)
				game.physics.arcade.gravity.x = -150;
			else
				game.physics.arcade.gravity.x = 0;
		}, true);
		
		// Handlink shake event
		var myShakeEvent = new Shake({
			threshold: 15 // shake strength
		});
		myShakeEvent.start();

		window.addEventListener('shake', function(e) {
			addFlakes(true);
		}, false);
	}
	
	function update(){
		// Currently disabled for bad performances
	    game.physics.arcade.collide(flakes,flakes);
	}
	
	// Adding flakes
	function addFlakes(rm) {
		if(rm) {
			for (i = 0; i < max; i++) {
				flakes[i].destroy();
			}
		}
		for (i = 0; i < max/3; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake1');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.22, 0.22);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;

			flakes[i] = flake;
		}
		for (i = max/3; i < max/3*2; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake2');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.18, 0.18);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;
		
			flakes[i] = flake;
		}
		for (i = max/3*2; i < max; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake3');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.15, 0.15);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;
		
			flakes[i] = flake;
		}
	}
}


