var currentImage = 1;

$(document).ready(function() {

	$('#rightArrow').on('click', next)
	$('#leftArrow').on('click', previous)

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
