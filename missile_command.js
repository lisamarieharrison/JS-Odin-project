var bunkerImg = new Image();
var groundImg = new Image();
var missileImg = new Image();

bunkerImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/bunker.png"
groundImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/ground.png"
missileImg.src = "C:/Users/Lisa/Documents/code/JS-odin-mc/week09-missilecommand/images/missile.png"

missileImg.locationXBunker1 = [10, 15, 20, 25, 30]
missileImg.locationYBunker1 = [205, 195, 210, 190, 200]

$(document).ready(function() {

	displayCanvas();

	canvas.addEventListener('click', launchMissile);

});

//run display canvas outside of document ready once all images have loaded
//add listener to check if images have loaded

function displayCanvas() {
	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 
	c.fillStyle = "black";
	c.fillRect(0, 0, 250, 250); 

	//draw ground
	groundImg.onload = function() {
		c.drawImage(groundImg, 1, 200);
	}

	//add three bunkers
	bunkerImg.onload = function() {
		c.drawImage(bunkerImg, 1, 185);
		c.drawImage(bunkerImg, 100, 185);
		c.drawImage(bunkerImg, 200, 185);
	}

	//get background information for removing images


	//add 5 missiles to each bunker
	missileImg.onload = function() {
	}	

	for (var i = 0; i < 5; i++) {
		c.drawImage(missileImg, missileImg.locationXBunker1[i], missileImg.locationYBunker1[i]);
	}

	return canvas;
}


function launchMissile(e) {

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

	step();

}

function step() {

	var canvas = document.getElementById('canvas'); 
	var c = canvas.getContext('2d'); 

	requestAnimationFrame(step);


	//remove current image
	c.clearRect(missileImg.newLocationX,missileImg.newLocationY,missileImg.newLocationX + missileImg.width ,missileImg.newLocationY + missileImg.height );
	displayCanvas();

	//make new coordinates
	missileImg.newLocationX = missileImg.newLocationX + Math.cos(missileImg.angle);
	missileImg.newLocationY = missileImg.newLocationY - Math.sin(missileImg.angle);

	c.drawImage(missileImg, missileImg.newLocationX, missileImg.newLocationY);

}








