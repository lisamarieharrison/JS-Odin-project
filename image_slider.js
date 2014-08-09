var currentImage = 1;

$(document).ready(function() {

	$('#pictureFrame').on('click', next)

});

function next() {
	if (currentImage <= 2) {
		currentImage = currentImage + 1
	} else {
		currentImage = 1
		$("#imageDiv").css({marginLeft:'600px'})
	}
	$("#imageDiv").animate({marginLeft:'-=600px'}, "fast");
	console.log(currentImage);
	return(currentImage);
};

