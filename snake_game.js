$(document).ready(function() {
	var board =	[];
	var length = 40;
	for (var i = 0; i < length; i++) {
    	board[i] = new Array(40);
	}
	for (var i = 0; i < 40; i++) {
		for (var j = 0; j < 40; j++) {
			board[i, j] = "";
			$('#grid').append('<div class="cell" id="cell_'+ i + j +'">');
		}
	}
	$('#cell_2020').css({"background-color": "black"}); //start snake at cell [20, 20]
})



