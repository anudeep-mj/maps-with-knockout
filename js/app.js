var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var map;
var markersArray = [];

function initMap() {
    var i = 0;
    var self = this;
    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 12
    });

    loc = {lat: 40.7713024, lng: -73.9632393};

    locations.forEach(function(locationItem) {
    	var newMarker = initmarkers(locationItem.location)
    	markersArray.push(newMarker);
    	// newMarker.addListener('click', function() {
     //        populateInfoWindow(this, largeInfowindow);
     //    });

    	bounds.extend(markersArray[i++].position);
    });

    map.fitBounds(bounds);
}


function initmarkers(location){
	this.marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'asdf',
          animation: google.maps.Animation.DROP,
    });

    return this.marker;
}

function clearOverlays() {
	for (var i = 0; i < markersArray.length; i++ ) {
		markersArray[i].setMap(null);
	}
  markersArray.length = 0;
}

function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
       	});
    }
}

var viewModel = function() {
	var self = this;
	var i = 0;
	this.locationList = ko.observableArray([]);
	this.myObservableArray = ko.observableArray();
        
    self.selectedValue = ko.observable();
    self.myObservableArray.push('Choose a marker');
    self.myObservableArray.push('All');


	locations.forEach(function(locationItem, map) {
		self.locationList.push( new Location(locationItem)) ;
		self.myObservableArray.push(locationItem.location);
	});

	self.selectedValue.subscribe(function(newValue) {	
		if(newValue !== 'Choose a marker' && newValue !== 'All') {
			clearOverlays();
			marker = initmarkers(newValue);
			markersArray.push(marker);
		}

		else if(newValue == 'All') {
			clearOverlays();
			locations.forEach(function(locationItem) {
    			largeInfowindow = new google.maps.InfoWindow();
    			var newMarker = initmarkers(locationItem.location)
    			markersArray.push(newMarker);
    		});
		}
	});

	function currentLoc(loc) {
		this.loc.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
		})
	}

	this.setLocation = function(clickedLocation) {
		var largeInfowindow = new google.maps.InfoWindow();
		clearOverlays();
		console.log(clickedLocation)
		console.log(clickedLocation.title())
		//console.log(clickedLocation.lat())
		lateral = clickedLocation.lat();
		lngtd = clickedLocation.lng();
		loc = {lat: lateral, lng: lngtd};
		console.log(loc);
		var marker = new google.maps.Marker({
            map: map,
            position: loc,
            title: clickedLocation.title(),
            animation: google.maps.Animation.DROP,
        });
        markersArray.push(marker);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

		//marker = initmarkers(loc);
		//alert('yay')
		//currentLoc(clickedLocation)
	}
}

var Location = function(data) {
	this.lat = ko.observable(data.location.lat);
	this.lng = ko.observable(data.location.lng);
	this.title = ko.observable(data.title);
	//console.log(data.title);
	// this.marker = new google.maps.Marker({
 //          position: data.location,
 //          map: map,
 //          title: data.title,
 //          animation: google.maps.Animation.DROP,
 //    });
    // this.marker.addListener('click', function() {
    //     populateInfoWindow(this, largeInfowindow);
    // });
}


ko.applyBindings(new viewModel());