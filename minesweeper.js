var boardDim = 9
var bombLocationX = new Array;
var bombLocationY = new Array;
var bombLocation = new Array;
var neighborBombs = Array.apply(null, new Array(boardDim*boardDim)).map(Number.prototype.valueOf,0);
var foundBombs = new Array;

//create board
$(document).ready(function() {
	var grid = $('#grid').empty();
	for (var j = 0; j < boardDim; j++) {
		for (var i = 0; i < boardDim; i++) {
			var cellLocation = i + j*boardDim;
			grid.append('<div class="cell" id='+ cellLocation +'>');
		}
	}

	bombSet()
	findNeighborBombs()

	$("#grid").on('click', showNeighborBombs);
	$("#grid").mousedown(rightClick);


});


//choose bomb locations
function bombSet() {
	for (var i = 0; i < 10; i++) {
		bombLocationX[i] = Math.floor((Math.random() * boardDim) + 1);
		bombLocationY[i] = Math.floor((Math.random() * boardDim) + 1);
		//check that there is not already a bomb at that location
		if (i > 0) {
			for (var j = 0; j < i; j++) {
				if (bombLocationX[i] == bombLocationX[j] & bombLocationY[i] == bombLocationY[j]) {
					i = i - 1; //if there is already a bomb at that location, re-choose the position
				}
			}
		}
	}	

	for (var i = 0; i < bombLocationX.length; i++) {
		bombLocation[i] = bombLocationX[i] + (bombLocationY[i] - 1)*boardDim;
	}

}

//display bombs for debugging
function bombShow() {
	for (var i = 0; i < bombLocationX.length; i++) {
		bombLocation[i] = bombLocationX[i] + (bombLocationY[i] - 1)*boardDim;
		$('.cell:nth-child(' + bombLocation[i] + ')').css("background-color", "blue");	
	}
}

function findLocations(x, y) {
	 var z = x + (y-1)*boardDim;
	 return(z);
}

//find number of neighbor bombs
function findNeighborBombs() {
	for (var i = 1; i < 10; i++) {
		for (var j = 1; j < 10; j++) {
			var cellLocation = i + (j-1)*boardDim;
			var neighborLocation = findNeighborCells(i, j);
			//add to neighborBombs array for each neighborLocation that contains a bomb
			for (var k = 0; k < neighborLocation.length; k++) {
				for (var p = 0; p < bombLocation.length; p++) {
					if (neighborLocation[k] == bombLocation[p]) {
						neighborBombs[cellLocation - 1] = neighborBombs[cellLocation - 1] + 1;
					}
				}
			}
		}
	}
}


function showNeighborBombs(e) {
	var cellNum = parseInt(e.target.id);
	var nthChild = cellNum + 1
	var currentText = $('.cell:nth-child(' + nthChild + ')').text()

	//display number of bombs in vicinity
	$('.cell:nth-child(' + nthChild + ')').text(neighborBombs[cellNum]);

	//find ith and jth reference
	var iRef = new Array;
	var jRef = new Array;
	for (var i = 1; i <=9; i++) {
		iRef.push(i, i, i, i, i, i, i, i, i)
	}
	for (var j = 1; j <=9; j++) {
		jRef.push(1, 2, 3, 4, 5, 6, 7, 8, 9)
	}

	//display all bordering values that are zero
	if (neighborBombs[cellNum] == 0) {
		var newCell  = findNeighborCells(jRef[cellNum], iRef[cellNum]);
		var checkedCells = jQuery.makeArray(newCell);
		while (newCell.length > 0) {
			for (var i = 0; i < newCell.length; i++) {
				$('.cell:nth-child(' + newCell[i] + ')').text(neighborBombs[newCell[i] - 1]);
				if (neighborBombs[newCell[i] - 1] == 0) {
					var newNeighbour = jQuery.makeArray(findNeighborCells(jRef[newCell[i] - 1], iRef[newCell[i] - 1]))
					newCell.splice(i, 1);
					for (j = 0; j < newNeighbour.length; j++) {
						if (checkedCells.indexOf(newNeighbour[j]) == -1) {
							newCell.push(newNeighbour[j]);
							checkedCells.push(newNeighbour[j]);
						}
					}
				} else {
					newCell.splice(i, 1);
					i = i - 1
				}
			}
		}
	}

	//if the current cell is marked as "M"
	if (currentText == "M") {
		var removeIndex = foundBombs.indexOf(nthChild);
		foundBombs.splice(removeIndex, 1)
		$('.cell:nth-child(' + nthChild + ')').css("background-color", "white");	
	}

	//check if user clicked on a bomb
	for (var i = 0; i < bombLocation.length; i++) {
		if (nthChild == bombLocation[i]) {
			loseGame();
		}
	}

	//check if all bombs have been marked correctly
	winCheck();
}


function rightClick(event) {
	if (event.which == 3) {
		var cellNum = parseInt(event.target.id);
		var nthChild = cellNum + 1;

		var currentText = $('.cell:nth-child(' + nthChild + ')').text()

		//if the cell is currently not marked "M"
		if (currentText == "") {
			$('.cell:nth-child(' + nthChild + ')').text("M");
			foundBombs.push(nthChild);
			$('.cell:nth-child(' + nthChild + ')').css("background-color", "yellow");
			winCheck();
		}

		//if the cell is currently marked "M"
		if (currentText == "M") {
			$('.cell:nth-child(' + nthChild + ')').text("");
			foundBombs.splice(foundBombs.indexOf(nthChild), 1);
			$('.cell:nth-child(' + nthChild + ')').css("background-color", "white");
			winCheck();
		}
	}
}


function winCheck() {

	//check if all bombs have been marked
	if (foundBombs.length == bombLocation.length) {
		var winCount = 0;
		for (var i = 0; i < foundBombs.length; i++) {
			for (var j = 0; j < bombLocation.length; j++) {
				if (foundBombs[i] == bombLocation[j]) {
					winCount = winCount + 1;
				}
			}
		}
		if (winCount == bombLocation.length) {
			$('h1').text("You Win!");
			bombShow();
		}
	}
}

function findNeighborCells(i, j) {
	var neighborLocation = new Array;
	for (var n = i -1; n < i + 2; n++) {
		for (var m = j -1; m < j + 2; m++) {
			if (n > 0 & n <= boardDim) {
				if (m > 0 & m <= boardDim) {
					neighborLocation.push(findLocations(n, m));
				}
			}
		}
	}
	return(neighborLocation);
}

function loseGame() {
	$('#grid').css("background-color", "red");	
	$('h1').text("You Lose!");
	bombShow()	
}