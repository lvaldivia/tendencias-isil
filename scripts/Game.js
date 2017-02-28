Game = function(game){

}

Game.prototype = {
	init:function(level){
		this.level = level || 0;
		this.changeNextLevel = true;
		this.levelmap = 'demo';
		if(this.level>0){
			this.levelmap = 'level'+level;
		}
	},
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 200;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.loadLevel();
	},
	loadLevel:function(){
		this.map = this.game.add.tilemap(this.levelmap);
		this.map.addTilesetImage('tiles_spritesheet','gameTiles');

		this.collisionLayer = this.map.createLayer('collisionLayer');
		this.backgroundLayer = this.map.createLayer('backgroundLayer');

		this.game.world.sendToBack(this.backgroundLayer);

		this.map.setCollisionBetween(1,156,true,'collisionLayer');
		this.collisionLayer.resizeWorld();

		var playerData = this.findObjectsByType('player',this.map,'objectsLayer');

		this.player = this.game.add.sprite(playerData[0].x,playerData[0].y,'player');
		this.game.physics.arcade.enable(this.player);
		this.game.camera.follow(this.player);
		this.player.anchor.setTo(0.5);
		this.player.animations.add('walking',[0,1,2,1],6,true);


		var enemyData = this.findObjectsByType('enemy',this.map,'objectsLayer');
		this.enemyGroup = this.game.add.group();
		enemyData.forEach(function(data){
			var enemy = new Enemy(this.game,data.x,data.y,'slime');
			//var enemy = this.game.add.sprite(data.x,data.y,'player');
			this.enemyGroup.add(enemy);
		},this);
		this.goalGroup = this.game.add.group();
		var goalData = this.findObjectsByType('goal',this.map,
			'objectsLayer');
		this.goal = new Goal(this.game,goalData[0].x,goalData[0].y,'goal');
		this.goalGroup.add(this.goal);
	},


	update:function(){
		//this.game.physics.arcade.collide(this.goal,this.collisionLayer);
		this.game.physics.arcade.overlap(this.player,this.goal,
				this.changeLevel,null,this);
		this.game.physics.arcade.collide(this.player,this.collisionLayer);
		this.game.physics.arcade.collide(this.enemyGroup,this.collisionLayer);
		this.player.body.velocity.x = 0;
		if(this.cursors.up.isDown && this.player.body.blocked.down){
			//console.log(this.player.body.onFloor());
			//mas izi :D
			this.player.body.velocity.y -= 200;
		}
		if(this.cursors.left.isDown){
			this.player.body.velocity.x =-200;
			this.player.animations.play('walking');
			this.player.scale.setTo(1,1);
		}
		else if(this.cursors.right.isDown){
			this.player.scale.setTo(-1,1);
			this.player.body.velocity.x=200;
			this.player.animations.play('walking');
		}else {
			this.player.frame = 3;
			this.player.animations.stop();
		}
	},
	findObjectsByType: function(targetType, tilemap, layer){
		var result = [];
		tilemap.objects[layer].forEach(function(element){
			if(element.properties.type == targetType) {
				element.y -= tilemap.tileHeight; 
				result.push(element);
			}
		}, this);
		return result;
	},
	changeLevel:function(){
		if(this.changeNextLevel){
			this.changeNextLevel = false;
			this.level++;
			this.game.state.start('Game',true,false,this.level);
			console.log('change level');
		}
	}

}