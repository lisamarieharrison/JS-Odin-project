var bunkerImg = new Image();
var groundImg = new Image();
var missileImg = new Image();
var enemyMissile = [];
enemyMissile.left = 10; //set number of enemy missiles to start with
enemyMissile.active = 0;

bunkerImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/bunker.png"
groundImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/ground.png"
missileImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/missile.png"
var imgArr = [bunkerImg, groundImg, missileImg];

//set start locations for bunkers and missiles
bunkerImg.locationX = [1, 100, 200];
bunkerImg.locationY = 185;
missileImg.locationXBunker1 = [10, 15, 20, 25, 30]
missileImg.locationYBunker1 = [205, 195, 210, 190, 200]

$(document).ready(function() {

	loadImg();
	generateEnemyMissiles()
	launchEnemyMissile();
	step();

	canvas.addEventListener('click', launchMissile);

});

function loadImg() {

 	var imgLoaded = 0;
	for (var i = 0; i < 3; i++) {
		imgArr[i].onload = function() {
			imgLoaded += 1;
			if (imgLoaded == 3) {
				displayCanvas();
				drawMissiles();
			}
		}
	}

}

function displayCanvas() {
	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 

	//make black sky
	c.fillStyle = "black";
	c.fillRect(0, 0, 250, 250); 

	//draw ground
	c.drawImage(groundImg, 1, 200);

	//add three bunkers
	for (var i = 0; i < 3; i++) {
		c.drawImage(bunkerImg, bunkerImg.locationX[i], 185);
	}

	return canvas;
}

function drawMissiles() {
	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 

	//add 5 missiles to each bunker
	for (var i = 0; i < 5; i++) {
		c.drawImage(missileImg, missileImg.locationXBunker1[i], missileImg.locationYBunker1[i]);
	}

}

function launchMissile(e) {
	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 

	var x = e.x
	var y = e.y

	x -= canvas.offsetLeft;
  	y -= canvas.offsetTop;

	console.log("Missile Launched!")

	var dx = x - missileImg.locationXBunker1[1];
	var dy = missileImg.locationYBunker1[1] - y;
	missileImg.angle = Math.atan(dy/dx);

	missileImg.newLocationX = missileImg.locationXBunker1[1] + Math.cos(missileImg.angle);
	missileImg.newLocationY = missileImg.locationYBunker1[1] - Math.sin(missileImg.angle);

	//remove used missile from bunker
	missileImg.locationXBunker1.splice(0, 1);
	missileImg.locationYBunker1.splice(0, 1);

}

//generate starting locations for 10 missiles
function generateEnemyMissiles() {

	enemyMissile.X = [];
	enemyMissile.Y = [];
	enemyMissile.angle = [];
	enemyMissile.NewX = [];
	enemyMissile.NewY = [];

	for (var i = 0; i < 10; i++) { 
		enemyMissile.X[i] = Math.floor((Math.random() * 250) + 1); //random starting location of enemy missile
		enemyMissile.Y[i] = 0;
		var dx = missileImg.locationXBunker1[1] - enemyMissile.X[i];
		var dy = 0 - missileImg.locationYBunker1[1];
		enemyMissile.angle[i] = Math.atan(dy/dx);
	}

}

function launchEnemyMissile() {

	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d');
	c.drawImage(missileImg, enemyMissile.X[0], enemyMissile.Y[0]);
	enemyMissile.active += 1

	for (var i = 0; i < (enemyMissile.active - 1); i++) { 

		enemyMissile.NewX[i] = enemyMissile.X[i] - Math.cos(enemyMissile.angle[i]);
		enemyMissile.NewY[i] = enemyMissile.Y[i] + Math.sin(enemyMissile.angle[i]);
	}

	enemyMissile.X.splice(0, 1);
	enemyMissile.Y.splice(0, 1);
	enemyMissile.left -= 1

}

function step() {
	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 

	requestAnimationFrame(step);

	//remove current missile images
	c.clearRect(missileImg.newLocationX,missileImg.newLocationY,missileImg.newLocationX + missileImg.width ,missileImg.newLocationY + missileImg.height);
	c.clearRect(enemyMissile.NewX, enemyMissile.NewY, enemyMissile.NewX + missileImg.width, enemyMissile.NewY + missileImg.height);
	
	//redraw the background with fired missile removed
	displayCanvas();
	drawMissiles();

	//make new coordinates and redraw fired missile
	missileImg.newLocationX = missileImg.newLocationX + Math.cos(missileImg.angle);
	missileImg.newLocationY = missileImg.newLocationY - Math.sin(missileImg.angle);

	for (var i = 0; i < (enemyMissile.active - 1); i++) {
		enemyMissile.NewX[i] = enemyMissile.NewX[i] - Math.cos(enemyMissile.angle[i]);
		enemyMissile.NewY[i] = enemyMissile.NewY[i] + Math.sin(enemyMissile.angle[i]);
		c.drawImage(missileImg, enemyMissile.NewX[i], enemyMissile.NewY[i]);
	}

	c.drawImage(missileImg, missileImg.newLocationX, missileImg.newLocationY);

}

//launch enemy missile every 5 seconds
setInterval(function(){
	launchEnemyMissile();
}, 5000);





