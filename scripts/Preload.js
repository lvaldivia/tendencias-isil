Preload = function(game){

}

Preload.prototype = {
	preload:function(){
		this.game.load.image('gameTiles','assets/images/tiles_spritesheet.png');
		this.game.load.tilemap('demo','assets/levels/demo-level.json',
				null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level1','assets/levels/level1.json',
			null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level2','assets/levels/level2.json',
			null, Phaser.Tilemap.TILED_JSON);
		this.game.load.spritesheet('player',
			'assets/images/player_spritesheet.png',28,30,5,1,1);
		this.game.load.image('slime','assets/images/slime.png');
		this.game.load.image('goal','assets/images/goal.png');
	},
	create:function(){
		this.game.state.start('Game');
	}
}