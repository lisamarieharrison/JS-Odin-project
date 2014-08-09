var currentImage = 1;

$(document).ready(function() {

	$('#rightArrow').on('click', next)
	$('#leftArrow').on('click', previous)
	$('#dot1').on('click', move1)
	$('#dot2').on('click', move2)
	$('#dot3').on('click', move3)

});

function next() {
	$("#dot" + currentImage).css("background-color", "white"); //change current dot colour back to white
	if (currentImage <= 2) {
		currentImage = currentImage + 1
	} else {
		currentImage = 1
		$("#imageDiv").css({marginLeft:'600px'})
	}
	$("#imageDiv").animate({marginLeft:'-=600px'}, "fast"); //slide image left
	$("#dot" + currentImage).css("background-color", "black"); //change new dot colour to black
};

function previous() {
	$("#dot" + currentImage).css("background-color", "white"); //change current dot colour back to white
	if (currentImage >= 2) {
		currentImage = currentImage - 1
	} else {
		currentImage = 3
		$("#imageDiv").css({marginLeft:'-1800px'})
	}
	$("#imageDiv").animate({marginLeft:'+=600px'}, "fast"); //slide image left
	$("#dot" + currentImage).css("background-color", "black"); //change new dot colour to black
};

function move1() {
	$("#dot" + currentImage).css("background-color", "white"); //change current dot colour back to white
	if (currentImage == 2) {
		$("#imageDiv").animate({marginLeft:'+=600px'}, "fast"); //slide image left
	}
	if (currentImage == 3) {
		$("#imageDiv").animate({marginLeft:'+=1200px'}, "fast"); //slide image left
	}
	currentImage = 1
	$("#dot" + currentImage).css("background-color", "black"); //change new dot colour to black	
}

function move2() {
	$("#dot" + currentImage).css("background-color", "white"); //change current dot colour back to white
	if (currentImage == 1) {
		$("#imageDiv").animate({marginLeft:'-=600px'}, "fast"); //slide image left
	}
	if (currentImage == 3) {
		$("#imageDiv").animate({marginLeft:'+=600px'}, "fast"); //slide image left
	}
	currentImage = 2
	$("#dot" + currentImage).css("background-color", "black"); //change new dot colour to black	
}

function move3() {
	$("#dot" + currentImage).css("background-color", "white"); //change current dot colour back to white
	if (currentImage == 1) {
		$("#imageDiv").animate({marginLeft:'-=1200px'}, "fast"); //slide image left
	}
	if (currentImage == 2) {
		$("#imageDiv").animate({marginLeft:'-=600px'}, "fast"); //slide image left
	}
	currentImage = 3
	$("#dot" + currentImage).css("background-color", "black"); //change new dot colour to black	
}