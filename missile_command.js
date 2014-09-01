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

	//add 5 missiles to each bunker
	missileImg.onload = function() {
		for (var i = 0; i < 5; i++) {
			c.drawImage(missileImg, missileImg.locationXBunker1[i], missileImg.locationYBunker1[i]);
		}
	}	

	return(canvas);

}

function launchMissile(e) {

	var x = e.x
	var y = e.y

	x -= canvas.offsetLeft;
  	y -= canvas.offsetTop;

	console.log("Missile Launched!")
	console.log([x, y]);
}
















