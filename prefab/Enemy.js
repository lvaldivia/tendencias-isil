Enemy = function(game, x, y, key, velocity ,tilemap){
	Phaser.Sprite.call(this,game,x,y,key);

	this.game = game;
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
}

Enemy.prototype = 
		Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){

}
