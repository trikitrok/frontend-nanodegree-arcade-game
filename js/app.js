// Enemies our player must avoid
var Enemy = function() {
	this.sprite = 'images/enemy-bug.png';
	this.moveToRoadStartWithRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	if (this.x > 500) {
		this.moveToRoadStartWithRandomSpeed();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.moveToRoadStartWithRandomSpeed = function() {
	this.x = randomX();
	this.y = randomY();
	this.speed = randomSpeed();

	function randomY() {
		var ysOnRoad = [60, 140, 220];
		return ysOnRoad[Math.floor(Math.random() * 3)];
	}

	function randomSpeed() {
		return 50 * (1 + Math.floor(Math.random() * 3));
	}

	function randomX() {
		return -100 * Math.floor(Math.random() * 2)
	}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.MINIMUM_X = 3;
	this.MAXIMUM_X = 403;
	this.MINIMUM_Y = -10;
	this.MAXIMUM_Y = 415;
	this.sprite = 'images/char-boy.png';
	this.x = this.MINIMUM_X;
	this.y = this.MAXIMUM_Y;
};

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
	if (direction) {
		move.call(this, direction);
		wrapPosition.call(this);
		console.log(this.x + " - " + this.y);
	}

	function move(direction) {
		if (direction === 'left') {
			this.x -= 100;
		} else if (direction === 'up') {
			this.y -= 85;
		} else if (direction === 'right') {
			this.x += 100;
		} else if (direction === 'down') {
			this.y += 85;
		}
	}

	function wrapPosition() {
		if (this.y < this.MINIMUM_Y) {
			this.y = this.MINIMUM_Y;
		}

		if (this.y > this.MAXIMUM_Y) {
			this.y = this.MAXIMUM_Y;
		}

		if (this.x < this.MINIMUM_X) {
			this.x = this.MINIMUM_X;
		}

		if (this.x > this.MAXIMUM_X) {
			this.x = this.MAXIMUM_X;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function createEnemies(enemiesNumber) {
	var i, enemies = [];
	for (i = 0; i < enemiesNumber; i++) {
		enemies.push(new Enemy());
	}
	return enemies;
}

var allEnemies = createEnemies(5);

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('click', function(e) {
	console.log(getMousePos(canvas, e)),
		console.log({
			x: e.clientX,
			y: e.clientY
		})

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
});