var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var map;
var addMarker;
var largeInfowindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 10
    });
    argeInfowindow = new google.maps.InfoWindow();
    addMarker = function(data) {
    	marker = new google.maps.Marker({
	    	position: data.location,
    		map: map
    	});
    }
}

var viewModel = function() {
	var self = this;

	this.locationList = ko.observableArray([]);
	locations.forEach(function(locationItem, map) {
		//console.log(locationItem.title)
		self.locationList.push(Location(locationItem)) ;
	});
}

var Location = function(data) {
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

	

	this.lat = ko.observable(data.location.lat);
	this.lng = ko.observable(data.location.lng);
	this.title = ko.observable(data.title);
	console.log(data.title);
	this.marker = addMarker(data);
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

// var locations = [
//           {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
//           {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
//           {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
//           {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
//           {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
//           {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
// ];


// var viewModel = function() {
// 	var largeInfowindow = new google.maps.InfoWindow();
//     var bounds = new google.maps.LatLngBounds();

// 	var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 40.7413549, lng: -73.9980244},
//           zoom: 13
//     });

// 	var self = this;
// 	var markers = [];
// 	var i = 0;
// 	this.locationList = ko.observableArray([]);
// 	locations.forEach(function(locationItem) {
// 		locationMarker = new Location(locationItem, i++);
// 		self.locationList.push(locationMarker);

// 		locationMarker.marker.addListener('click', function() {
// 			populateInfoWindow(this, this.largeInfowindow);
//         });

//         this.bounds.extend(locationMarker.marker.position);
// 	});

// 	this.map.fitBounds(bounds);

// 	function populateInfoWindow(marker, infowindow) {
//         // Check to make sure the infowindow is not already opened on this marker.
//         if (infowindow.marker != marker) {	
//         	infowindow.marker = marker;
//           	console.log(marker.title)
//           	infowindow.setContent('<div>' + marker.title + '</div>');
//           	infowindow.open(map, marker);
//           	infowindow.addListener('closeclick', function() {
//             infowindow.marker = null;
//         });
//     }
// }

// var Location = function(data, i) {
// 	this.title = ko.observable(data.title);
// 	this.location = ko.observable(data.location);
// 	this.marker = ko.computed(function(i){
// 		return new google.maps.Marker({
// 			position: data.location,
//             title: data.title,
//             animation: google.maps.Animation.DROP,
//             id: i
//           });
// 	}, this);
// }


// ko.applyBindings(new viewModel());




	//console.log('The first element is ' + locationList()[0].lat);

	

	//var i = 0;
	// self.locationList().forEach(function(location) {
	// 	var marker = new google.maps.Marker({
 //          position: locationList()[i],
 //          map: map,
 //          title: 'First Marker!'
 //    	});
 //    	i++;
	// });