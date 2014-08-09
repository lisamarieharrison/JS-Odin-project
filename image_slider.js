var currentImage = 1;

$(document).ready(function() {

	$('#pictureFrame').on('click', next)

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


