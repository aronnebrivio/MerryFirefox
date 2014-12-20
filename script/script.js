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
	}

	var flake, flakes;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		game.world.setBounds(0, 0, w, h);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		flakes = [];
		addFlakes(false);
		
		// Handling device rotation
		window.addEventListener("deviceorientation", function(e){
			/*var x = e.gamma; // range [-90,90]
			var y = e.beta;  // range [-180,180]
			console.log("ok");
			game.physics.arcade.gravity.x += x/4;
			game.physics.arcade.gravity.y += y/8;*/
		
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
	    game.physics.arcade.collide(flakes,flakes);
	}
	
	// Adding flakes
	function addFlakes(rm) {
		if(rm) {
			for (i = 0; i < 100; i++) {
				flakes[i].destroy();
			}
		}
		for (i = 0; i < 33; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake1');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.2, 0.2);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;

			flakes[i] = flake;
		}
		for (i = 33; i < 66; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake2');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.15, 0.15);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;
		
			flakes[i] = flake;
		}
		for (i = 66; i < 100; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake3');
			flake.angle = Math.floor((Math.random()*45)+1);
			flake.scale.setTo(0.12, 0.12);
			game.physics.arcade.enableBody(flake, true);
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;
		
			flakes[i] = flake;
		}
	}
}


