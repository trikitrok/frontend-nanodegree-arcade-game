"use strict";

// Enemies our player must avoid
var Enemy = function() {
	this.yByRow = {
		1: 60,
		2: 140,
		3: 220
	};
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
	ctx.drawImage(Resources.get(this.sprite), this.position.x, this.computeY());
};

Enemy.prototype.moveToRoadStartWithRandomSpeed = function() {
	this.position = {};
	this.position.x = randomX();
	this.position.row = randomRow();
	this.speed = randomSpeed();

	function randomRow() {
		return 1 + Math.floor(Math.random() * 3);
	}

	function randomSpeed() {
		return 50 * (1 + Math.floor(Math.random() * 3));
	}

	function randomX() {
		return -100 * Math.floor(Math.random() * 2)
	}
};

Enemy.prototype.computeY = function() {
	return this.yByRow[this.position.row];
}

Enemy.prototype.collidesWith = function(player) {
	return this.position.row == player.row() &&
		(this.position.x + 80) > player.position.x &&
		this.position.x < (player.position.x + 80);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.yByRow = [-10, 72, 154, 236, 318, 420];
	this.box = {
		minX: 3,
		maxX: 403,
		minRow: 0,
		maxRow: 5
	};
	this.sprite = 'images/char-boy.png';
	this.position = {
		x: this.box.minX,
		row: this.box.maxRow
	};
};

Player.prototype.update = function() {

};

Player.prototype.row = function() {
	return this.position.row;
}

Player.prototype.computeY = function() {
	return this.yByRow[this.position.row];
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.position.x, this.computeY());
};

Player.prototype.handleInput = function(direction) {
	if (direction) {
		var displacement = computeDisplacement(direction),
			possiblePosition = move(this.position, displacement);
		this.position = wrapPosition(possiblePosition, this.box);
	}

	function move(position, displacement) {
		return {
			x: position.x + displacement.x,
			row: position.row + displacement.row
		};
	}

	function computeDisplacement(direction) {
		var displacementByDirection = {
			'left': {
				x: -100,
				row: 0
			},
			'up': {
				x: 0,
				row: -1
			},
			'right': {
				x: 100,
				row: 0
			},
			'down': {
				x: 0,
				row: 1
			}
		};
		return displacementByDirection[direction];
	}

	function wrapPosition(position, box) {
		if (position.row < box.minRow) {
			position.row = box.minRow;
		}

		if (position.row > box.maxRow) {
			position.row = box.maxRow;
		}

		if (position.x < box.minX) {
			position.x = box.minX;
		}

		if (position.x > box.maxX) {
			position.x = box.maxX;
		}
		return position;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function initializeCharacters() {
	var enemiesNumber = 4;
	allEnemies = createEnemies(enemiesNumber);
	player = new Player();

	function createEnemies(enemiesNumber) {
		var i, enemies = [];
		for (i = 0; i < enemiesNumber; i++) {
			enemies.push(new Enemy());
		}
		return enemies;
	}
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