// Enemies our player must avoid
var Enemy = function() {
	this.position = {};
	this.sprite = 'images/enemy-bug.png';
	this.moveToRoadStartWithRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.position.x += this.speed * dt;
	if (this.position.x > 500) {
		this.moveToRoadStartWithRandomSpeed();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

Enemy.prototype.moveToRoadStartWithRandomSpeed = function() {
	this.position.x = randomX();
	this.position.y = randomY();
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

Enemy.prototype.collidesWith = function(player) {
	return player.position.x <= (this.position.x + 50) &&
		(player.position.x + 50) > this.position.x;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.box = {
		minX: 3,
		maxX: 403,
		minY: -10,
		maxY: 415
	};
	this.sprite = 'images/char-boy.png';
	this.position = {
		x: this.box.minX,
		y: this.box.maxY
	};
};

Player.prototype.update = function() {

}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

Player.prototype.handleInput = function(direction) {
	if (direction) {
		var displacement = computeDisplacement(direction),
			possiblePosition = move(this.position, displacement);
		this.position = wrapPosition(possiblePosition, this.box);
	}

	function move(position, displacement) {
		return {
			x: position.x + displacement.x,
			y: position.y + displacement.y
		};
	}

	function computeDisplacement(direction) {
		var displacementByDirection = {
			'left': {
				x: -100,
				y: 0
			},
			'up': {
				x: 0,
				y: -85
			},
			'right': {
				x: 100,
				y: 0
			},
			'down': {
				x: 0,
				y: 85
			}
		};
		return displacementByDirection[direction];
	}

	function wrapPosition(position, box) {
		if (position.y < box.minY) {
			position.y = box.minY;
		}

		if (position.y > box.maxY) {
			position.y = box.maxY;
		}

		if (position.x < box.minX) {
			position.x = box.minX;
		}

		if (position.x > box.maxX) {
			position.x = box.maxX;
		}
		return position;
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

function initializeCharacters() {
	allEnemies = createEnemies(5);
	player = new Player();
}

var allEnemies, player;

initializeCharacters();

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