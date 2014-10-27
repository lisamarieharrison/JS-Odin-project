var latitude = -34.397
var longitude = 150.644
var zoomLevel = 8

$(document).ready(function() {
	initialize(latitude, longitude, zoomLevel);
});

function initialize(latitude, longitude, zoomLevel) {
  	var mapOptions = {
    	zoom: zoomLevel,
    	center: new google.maps.LatLng(latitude, longitude)
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var marker = new google.maps.Marker({
	    position: mapOptions.center,
	    map: map,
	    title: String([latitude, longitude]),
	    draggable: true,
	})

	var infowindow = new google.maps.InfoWindow({
	    content: String([latitude, longitude]),
	    minWidth: 200
	});

	google.maps.event.addListener(marker, 'click', (function () {
	    infowindow.open(map, marker);
	}));

}

function findLocation() {

	latitude = document.getElementById('latitudeInput').value;
	longitude = document.getElementById('longitudeInput').value;
	zoomLevel = 15

	initialize(latitude, longitude, zoomLevel);
}

$(document).keydown(function(e) {
  if (13 == e.keyCode) {
  	findLocation();
  }
});

function reset(){
	latitude = -34.397
	longitude = 150.644
	zoomLevel = 8
	initialize(latitude, longitude, zoomLevel);
}



