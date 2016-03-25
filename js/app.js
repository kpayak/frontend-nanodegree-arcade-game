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
    this.x += Math.ceil(dt * this.speed);

    //Reset enemy locations once they crosses canvas width
    if (this.x > ctx.canvas.width) {
        this.x = 0;
        //Randomize Y location when enemy return to canvas 
        //Y location is chosen from 3 rows at (60,45,225)
        var enemyYLoc = [60, 145, 225];
        var y = Math.ceil(Math.random() * 3 + 0);
        this.y = enemyYLoc[y - 1];
        //Randomize speed of enemy every time it reappears on the canvas
        //speed = randomNumber*base + offset
        this.speed = Math.random() * enemySpeedBase + enemySpeedOffset;
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

//Draw player on the screen
Player.prototype.update = function (str) {

    //Get X and Y coordinates and find which block the player lies in
    var playerXTile = Math.ceil(this.x / 101);
    var playerYTile = Math.ceil(this.y / 83);

    //Reset player when it reaches water

    if (playerYTile == 0) {
        this.x = playerResetX;
        this.y = playerResetY;
        //Increment score when player reaches water.
        score += 20;
        updateScore("green");
    }
};

//Find whether player and enemy are in the same tile
//Tiles are between 240 < y < 60
//Width of each tile = 101
var detectCollision = function (Player, allEnemies) {

    //Get player location
    var playerXTile = Math.ceil(Player.x / 101);
    var playerYTile = Math.ceil(Player.y / 83);

    //Check against each enemy, if its location is same as player location.
    for (e in allEnemies) {

        //Get enemy location on the board.
        var enemyXTile = Math.floor(allEnemies[e].x / 75);
        var enemyYTile = Math.floor(allEnemies[e].y / 60);
        if ((playerXTile == enemyXTile) && (playerYTile == enemyYTile)) {

            //Once player and enemy cross, player location is reset and score is decremented.
            Player.y = 400;

            /*This if statement takes care of the part when player score is 
            about to get zero */
            if (score == 20) {
                score -= 20;
                console.log("Game over");
                //set play variable to false to stop animation loop.
                play = false;
                //Game over dialog appears when score = 0
                var gameDialog = document.getElementById('game-over-dialog');
                gameDialog.className += 'active';
            } else {
                //Decrement score when player and enemy crosses.
                score -= 20;
            }

            //update score in red when collision is detected.
            updateScore("red");
        }
    }
};

/* This method updates the Score div:
    in Green: if the player crosses over and reaches the water 
    in Red: if there is a collision between player and any enemy */
var updateScore = function (color) {
    var scoretext = document.getElementById('score');
    scoretext.className += color;

    //Sets the desired color for 700ms and then remove it.
    setTimeout(function () {
        scoretext.className = "";
    }, 700);
}


/*  This method updates player location based on keystroke. 
    Left arrow:     Decrement X Location by 101 (1 Tile) 
    Right Arrow:    Increment X Location by 101 (1 Tile)
    Up Arrow:       Decrement Y location by 83 (1 Tile)
    Down Arrow:     Increment Y location by 83 (1 Tile) */
Player.prototype.handleInput = function (keycode) {
    switch (keycode) {
    case 'left':
        if (this.x < 0) {
            this.x += 0;
        } else {
            this.x = this.x - 101;
        }
        break;

    case 'up':
        if (this.y < 0) {
            this.y += 0;
        } else {
            this.y = this.y - 83;
        }
        break;

    case 'right':
        if (this.x > ctx.canvas.width - 105) {
            this.x += 0;
        } else {
            this.x = this.x + 101;
        }
        break;

    case 'down':

        if (this.y > ctx.canvas.height - 250) {
            this.y += 0;
        } else {
            this.y = this.y + 83;
        }
        break;
    }
};

//Render player on canvas.
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

/* This Function generates enemies (bugs).
    Number of enemies is defined by 'number' variable 
    Number of bugs is controlled by hardness level. */
var generateEnemy = function (number) {
    var allEnemies = [];
    for (var i = 0; i < number; i++) {
        //Randomize X Location, x can be between 0 and 505
        var x = Math.ceil(Math.random() * 505);
        //Randomize Y Location. Generate random number from 60, 145, 225
        var enemyYLoc = [60, 145, 225];
        var y = Math.ceil(Math.random() * 3 + 0);
        //generate random speed of each speed.
        var speed = Math.random() * enemySpeedBase + enemySpeedOffset;
        var enmy = new Enemy(x, enemyYLoc[y - 1], speed);
        allEnemies.push(enmy);
    }
    return allEnemies;
};

//Function to update score div.
var displayScore = function () {
    document.getElementById('score').innerHTML = score;
}


/*  Difficulty selection logic 
    Once user clicks on one of the buttons the div disappears by adding class dismiss.
    For each difficulty level, number of bugs and bug speed is varied.
*/


/*  Event Listeners for EASY, MEDIUM & HARD Buttons 
    Sets Difficulty level according to the button clicked. */

//EASY
document.getElementById('easy-button').addEventListener('click', function () {
    console.log("Easy");
    play = true;
    //console.log("Play in level sel():" + play);
    numberOfEnemies = 2;
    enemySpeedBase = 75;
    enemySpeedOffset = 75;
    //Remove Dialog once button is clicked and difficulty is set
    document.getElementById('difficulty-level').className += 'dismiss';
});

//MEDIUM
document.getElementById('medium-button').addEventListener('click', function () {
    play = true;
    numberOfEnemies = 3;
    enemySpeedBase = 150;
    enemySpeedOffset = 50;
    //Remove Dialog once button is clicked and difficulty is set
    document.getElementById('difficulty-level').className += 'dismiss';
});

//HARD
document.getElementById('hard-button').addEventListener('click', function () {
    play = true;
    numberOfEnemies = 5;
    enemySpeedBase = 150;
    enemySpeedOffset = 150;
    //Remove Dialog once button is clicked and difficulty is set
    document.getElementById('difficulty-level').className += 'dismiss';
});



//Global Variables

//number of bugs: required for generateEnemy function
var numberOfEnemies = 4;

//Variables to control bug speed
var enemySpeedBase = 100;
var enemySpeedOffset = 150;

var allEnemies = [];

//player reset coordinates
var playerResetX = 200;
var playerResetY = 400;

//Create Enemies and Player
var player = new Player(playerResetX, playerResetY);
allEnemies = generateEnemy(numberOfEnemies);

//Initialize score to 100
var score = 100;

//Play variable controls whether animation starts or not. True: Start Animating, Fale: Stop Animating.
//Initiazed to false, set to true when user selects difficulty level.
var play = true;