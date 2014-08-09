var currentImage = 1;

$(document).ready(function() {

	$('#imageDiv').on('click', next)

});

function next() {
	if (currentImage <= 2) {
		currentImage = currentImage + 1
		$("#imageDiv").animate({marginLeft:'-=600px'}, "fast");
	} else {
		currentImage = 1
		$("#imageDiv").animate({marginLeft:'+=1200px'}, "fast");
	}
	console.log(currentImage);
	return(currentImage);
};