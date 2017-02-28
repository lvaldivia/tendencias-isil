Goal = function(game, x, y, key){
	Phaser.Sprite.call(this,game,x,y,key);
	this.game = game;
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	this.body.allowGravity = false;
}

Goal.prototype = 
		Object.create(Phaser.Sprite.prototype);

Goal.prototype.constructor = Goal;

Goal.prototype.update = function(){

}