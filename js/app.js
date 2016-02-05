// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    /*Variables applied to each of our instances go here,
    we've provided one for you to get started

    The image/sprite for our enemies, this uses
    a helper we've provided to easily load images*/
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/* Update the enemy's position, required method for game
Parameter: dt, a time delta between ticks */
Enemy.prototype.update = function (dt) {
    /* You should multiply any movement by the dt parameter
    which will ensure the game runs at the same speed for
    all computers. */
    this.x += dt * this.speed;

    //Reset enemy location if it crosses canvas width
    if (this.x > ctx.canvas.width) {
        this.x = 0;
        //Randomize Y location when enemy return to canvas
        this.y = Math.random() * 180 + 60;
        var speed = Math.random() * 100 + 150;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Now write your own player class
 This class requires an update(), render() and
 a handleInput() method.*/
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function (str) {

};

Player.prototype.handleInput = function (keycode) {
    switch (keycode) {
        case 'left':
            if (this.x < 0) {
                this.x += 0;
            } else {
                this.x = this.x - 83;
            }
            break;

        case 'up':
            if (this.y < 0) {
                this.y += 0;
            } else {
                this.y = this.y - 101;
            }
            break;

        case 'right':
            if (this.x > ctx.canvas.width - 83) {
                this.x += 0;
            } else {
                this.x = this.x + 83;
            }
            break;

        case 'down':

            if (this.y > ctx.canvas.height - 250) {
                this.y += 0;
            } else {
                this.y = this.y + 101;
            }
            break;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* Now instantiate your objects.
 Place all enemy objects in an array called allEnemies
 Place the player object in a variable called player */

/* This listens for key presses and sends the keys to your
 Player.handleInput() method. You don't need to modify this. */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/* This Function generates enemy object based on number parameter */
var generateEnemy = function (number) {
    var allEnemies = [];
    for (var i = 0; i < number; i++) {
        //x can be between 0 and 505
        var x = Math.random() * 505;
        //generate random number between 60 and 240 (3 rows of tiles)
        var y = Math.random() * 180 + 60;
        //generate random speed between 150-250
        var speed = Math.random() * 100 + 150;
        var enmy = new Enemy(x, y, speed);
        allEnemies.push(enmy);
    }
    return allEnemies;
};

var numberOfEnemies = 4;
var allEnemies = [];
var playerResetX = 200;
var playerResetY = 400;
var player = new Player(playerResetX, playerResetY);
/*var e1 = new Enemy(6, 60, 150);
var e2 = new Enemy(350, 60 * 4, 205);
allEnemies.push(e1);
allEnemies.push(e2);*/
allEnemies = generateEnemy(numberOfEnemies);
