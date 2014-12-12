// List of Seattle Traffic Cameras

"use strict";

$(document).ready(function(){
	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var infowindow = new google.maps.InfoWindow();
	
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
    .done(function(data) {
        data.forEach(function(location) {
        	var icon = 'img/map-marker.png';
            var marker = new google.maps.Marker({
                position: {
                    lat: (Number)(location.location.latitude),
                    lng: (Number)(location.location.longitude)
                },
                map: map,
				title: location.cameralabel,
				icon: icon
            });
            google.maps.event.addListener(marker, 'click', function() {
            	map.panTo(marker.getPosition());
            	infowindow.open(map, this);
                var string = '<p>' + location.cameralabel + '</p> <img src="' + location.imageurl.url + '"/>';
                infowindow.setContent(string);
            });
            google.maps.event.addListener(map, 'click', function() {
            	infowindow.close();
            });
            $('#search').bind('search keyup', function() {
				var search = this.value.toLowerCase();
				var cameraLabel = location.cameralabel.toLowerCase();
				if (cameraLabel.indexOf(search) < 0) {
					marker.setMap(null);
				} else {
					marker.setMap(map);
				}
	        });
        });

    })
    .fail(function(error) {
		alert('Unable to retrieve requested data.');
    })
});