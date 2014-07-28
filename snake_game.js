var length = 40; //set grid to 40*40 cells
var SnakeX = [20] //start snake at cell [20, 20]
var SnakeY = [20]
var headLocationX = 20
var headLocationY = 20
var keyType = 100 //start snake going right
var foodLocationX = Math.floor((Math.random() * 40) + 1) //start food location in random place
var foodLocationY = Math.floor((Math.random() * 40) + 1) //start food location in random place
var highScore = 1

$(document).ready(function() {
	drawGame()
})

function drawGame() {
	//draw grid
	var grid = $('#grid').empty();
	for (var i = 0; i < length; i++) {
		for (var j = 0; j < length; j++) {
			grid.append('<div class="cell" id="cell_'+ i + j +'">');
		}
	}
	//draw snake
	for (var i = 0; i < SnakeX.length; i++) {
		var bodySegments = SnakeX[i] + (SnakeY[i] - 1)*40;
		$('.cell:nth-child(' + bodySegments + ')').css({"background-color": "black"});
		$('.cell:nth-child(' + bodySegments + ')').css({"border": "1px solid black"});
	}
	//draw food
	var foodLocation = foodLocationX + (foodLocationY - 1)*40;
	$('.cell:nth-child(' + foodLocation + ')').css({"background-color": "red"});
	$('.cell:nth-child(' + foodLocation + ')').css({"border": "1px solid red"});
}

//listen for key press
$(document).keypress(function(e){
	keyType = e.keyCode; //save key type pressed
});

//snake movements
function snakeMove(){

	if (keyType == 119){ //W
		headLocationY = headLocationY - 1;	
	}
	if (keyType == 97){ //A
		headLocationX = headLocationX - 1;	
	}
	if (keyType == 115){ //S
		headLocationY = headLocationY + 1;	
	}
	if (keyType == 100){ //D
		headLocationX = headLocationX + 1;	
	}

	SnakeX.splice(0, 0, headLocationX); //add head
	SnakeY.splice(0, 0, headLocationY); //add head
	SnakeX.pop(); //remove tail
	SnakeY.pop(); //remove tail


	//check if food has been eaten
	if (headLocationX == foodLocationX & headLocationY == foodLocationY) {

		//add segment to head end of snake without removing tail to make longer
		SnakeX.splice(0, 0, headLocationX);
		SnakeY.splice(0, 0, headLocationY); 
		headLocationX = SnakeX[0]
		headLocationY = SnakeY[0]

		//change food location to random place
		foodLocationX = Math.floor((Math.random() * 40) + 1);
		foodLocationY = Math.floor((Math.random() * 40) + 1);

		//increase high score
		if (SnakeX.length > highScore) {
			highScore = highScore + 1
			$('#highScore').text("High Score: " + highScore);
		}

	}

	//check if snake has gone off the board
	if (headLocationX ==  -1 | headLocationX == (length + 1) | headLocationY == -1 | headLocationY == (length + 1)) {
		endGame()
	}

	//check if snake has bitten self
	for (var i = 2; i < SnakeX.length; i++) {
		if (headLocationX ==  SnakeX[i] & headLocationY == SnakeY[i]) {
			endGame()		
		}	
	}

	drawGame();
};


//move snake automatically
var interval = setInterval(
     function(){
     	var i = 1;
          if (i == 1) {            
            	i = i + 1;
            	snakeMove();
            }
    },
    100  //snake speed
);

//end the game if snake goes off board or into self
function endGame() {
	clearInterval(interval); //stop interval from running
	//remove snake
	SnakeX = null;
	SnakeY = null;
	//remove
	var grid = $('#grid').empty();
	grid.append('<p id="gameOver">');	
	grid.css({"background-color": "red"});
	$('#gameOver').text('GAME OVER');
	grid.append('<button id="restart">');
	$('#restart').text("Restart");

	//restart if button is pressed
	$('#restart').on('click', function() {
		length = 40; //set grid to 40*40 cells
		SnakeX = [20] //start snake at cell [20, 20]
		SnakeY = [20]
		headLocationX = 20
		headLocationY = 20
		keyType = 100 //start snake going right
		foodLocationX = Math.floor((Math.random() * 40) + 1) //start food location in random place
		foodLocationY = Math.floor((Math.random() * 40) + 1) //start food location in random place
		$('#grid').css({"background-color": "white"});
		drawGame();

		//restart interval
		interval = setInterval(
     		function(){
     			var i = 1;
          		if (i == 1) {            
            	i = i + 1;
            	snakeMove();
            }
		},
		10000  //snake speed
		);
	});
}


