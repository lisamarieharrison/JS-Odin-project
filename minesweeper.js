var boardDim = 9
var bombLocationX = new Array;
var bombLocationY = new Array;
var bombLocation = new Array;
var neighborBombs = 0


//create board
$(document).ready(function() {
	var grid = $('#grid').empty();
	for (var i = 0; i < boardDim; i++) {
		for (var j = 0; j < boardDim; j++) {
			grid.append('<div class="cell" id="cell_'+ i + j +'">');
			neighborBombs = neighborBombs.slice(0)
		}
	}

	bombSet()
	bombShow()

});


//choose bomb locations
function bombSet() {
	for (var i = 0; i < 10; i++) {
		bombLocationX[i] = Math.floor((Math.random() * boardDim) + 1);
		bombLocationY[i] = Math.floor((Math.random() * boardDim) + 1);
	}	

	return {
        bombLocationX: bombLocationX,
        bombLocationY: bombLocationY
    }; 

}

//display bombs for debugging
function bombShow() {
	for (var i = 0; i < bombLocationX.length; i++) {
		bombLocation[i] = bombLocationX[i] + (bombLocationY[i])*boardDim;
		$('.cell:nth-child(' + bombLocation[i] + ')').css("background-color", "red");
	}
}


//find number of neighbor bombs
for (var i = 0; i < boardDim; i++) {
	for (var j = 0; j < boardDim; j++) {
		var cellLocation = i + j*boardDim;
		for (var k = 0; k < bombLocation.length; k++) {
			if (i == bombLocationX[k] & j == bombLocationY[k]) {
				neighborBombs[cellLocation] = neighborBombs[cellLocation] + 1 
			}
		}
		console.log(cellLocation)

	}
}








