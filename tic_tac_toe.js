var playerTurn = 1;

$(document).ready(function() {

	$("#board").on('click', placeSymbol);

});


function placeSymbol(e) {
	var divNum = e.target.id;

	//write symbol
	if (playerTurn == 1) {
		$("#" + divNum).text("X");
	}

	if (playerTurn == 2) {
		$("#" + divNum).text("O");
	}

	//change player turn
	if (playerTurn == 1) {
		playerTurn = 2;
	} else {
		playerTurn = 1;
	}

	checkWin()
}

function checkWin(){



	if ($("#1").text() == "O" & $("#2").text() == "O" & $("#3").text() == "O"){
		console.log("win");
	}

	if ($("#4").text() == "O" & $("#5").text() == "O" & $("#6").text() == "O"){
		console.log("win");
	}

	if ($("#7").text() == "O" & $("#8").text() == "O" & $("#9").text() == "O"){
		console.log("win");
	}
}

