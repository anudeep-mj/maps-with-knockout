var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var map;
var mmarker;
var largeInfowindow;
function initMap() {
    var i = 0;
    var self = this;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
    });

    //loc = {lat: 40.7713024, lng: -73.9632393};

    // locations.forEach(function(locationItem) {
    // 	largeInfowindow = new google.maps.InfoWindow();
    // 	var newMarker = initmarkers(locationItem.location)
    // });
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

	locations.forEach(function(locationItem, map) {
		self.locationList.push( new Location(locationItem)) ;
		self.myObservableArray.push(locationItem.location);
	});

	//self.selectedValue = ko.observable();
	self.selectedValue.subscribe(function(newValue) {
     	alert("The new value is " + newValue);
     	//self.locationList([]);
	});
}

var Location = function(data) {
	this.lat = ko.observable(data.location.lat);
	this.lng = ko.observable(data.location.lng);
	this.title = ko.observable(data.title);
	//initmarkers(data.location);

	this.marker = new google.maps.Marker({
          position: data.location,
          map: map,
          title: data.title,
          animation: google.maps.Animation.DROP,
    });
    // this.marker.addListener('click', function() {
    //     populateInfoWindow(this, largeInfowindow);
    // });
}


ko.applyBindings(new viewModel());