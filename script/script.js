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
		game.physics.arcade.gravity.y = 300;

		/*window.addEventListener("deviceorientation", function(e){
			console.log(e.beta);
			console.log("up = " + up);
			console.log("down = " + down);
			// Handling device rotation
			if(e.beta > 80 && e.beta < 110)
				game.physics.arcade.gravity.y = 100;
			if(e.beta < -80 && e.beta > -110)
				game.physics.arcade.gravity.y = -100;
		}, true);*/
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
			setTimeout(function() {
				deepness = deepness + 1;
				addFlake(deepness);
			}, 10);
		}
	}

	$(document).on('click', '#up', function () {
		game.physics.arcade.gravity.y = -300;
	});
	$(document).on('click', '#down', function () {
		game.physics.arcade.gravity.y = 300;
	});
}
