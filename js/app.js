function getRandInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        //check boundaries or "boxes" around player and enemy
        if (enemy.x < player.x + 50 &&
            enemy.x + 50 > player.x &&
            enemy.y < player.y + 50 &&
            enemy.y + 50 > player.y) {
                player.restart();
        }
    });
}

// Enemies our player must avoid
var Enemy = function() {
    //choose one of three possible roads for enemy to patrol
    this.road = getRandInt(1, 3);

    //set enemy starting (x,y) coordinates
    this.x = getRandInt(0, -505);
    this.y = this.road * 75;

    //pick a speed for enemy
    this.speed = getRandInt(50, 150);

    //image for enemy
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    //when enemy moves off screen, reset x position
    if (this.x > 505) {
        this.x = -303;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.restart();
}

Player.prototype.restart = function() {
    //reset player to starting position
    this.xDim = 101;
    this.yDim = 80;

    this.x = this.xDim * 2;
    this.y = this.yDim * 4;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    checkCollisions();
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0)
                this.x -= 101;
            break;
        case 'right':
            if (this.x < 404)
                this.x += 101;
            break;
        case 'up':
            if (this.y < 150)
                this.restart();
            else if (this.y > 83) {
                this.y -= 83;    
            }
            break;
        case 'down':
            if (this.y < 375)
                this.y += 83;
            break;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];


//create enemies
for (var i = 0; i < 8; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

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
