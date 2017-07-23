var locations = [
    {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
    {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
    {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    {title: '230 Fifth Rooftop Bar', location: {lat: 40.744390, lng: -73.988327}},
    {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var map;
var markersArray = [];
var markerMap = [];

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function initMap() {
    var i = 0;
    var self = this;
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 12
    });

    loc = {lat: 40.7713024, lng: -73.9632393};

    locations.forEach(function (locationItem) {
        var newMarker = initmarkers(locationItem);
        markersArray.push(newMarker);
        //markerMap.push({title: marker.title, marker: marker});
        initPopup(newMarker, locationItem);
        enableBounce(newMarker);
        bounds.extend(markersArray[i++].position);
    });

    map.fitBounds(bounds);
}

function googleError() {
    alert("Something went wrong! Google maps not loaded.");
}

//Add bounce affect to a marker location
function enableBounce(marker) {
    marker.addListener('click', function () {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1400);
    });
}

//Returns a marker for a given location object
function initmarkers(location) {
    marker = new google.maps.Marker({
        position: location.location,
        map: map,
        title: location.title,
        animation: google.maps.Animation.DROP,
    });

    return marker;
}

function setMarkerInvisible(marker) {
    marker.setVisbile(false);
}

//Initializes popup windows for the markers
function initPopup(marker, locationItem) {
    var largeInfowindow = new google.maps.InfoWindow();
    marker.addListener('click', function () {
        populateInfoWindow(this, largeInfowindow, locationItem);
    });
}

//Clears all the markers
function setMarkersInvisible() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setVisible(false);
    }
}

function setMarkerVisible(title) {
    console.log(markersArray);
    for (var i = 0; i < markersArray.length; i++) {
        if(markersArray[i].title == title) {
            markersArray[i].setVisible(true);
            return markersArray[i];
        }
    }
}

function populateInfoWindow(marker, infowindow, locationItem) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var list;
        var fullList = '<div>' + marker.title + '</div><br/><strong>Related NY Times Articles:</strong><br/>';
        var nytimeurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + locationItem.title + '&sort=newest&api-key=dfb69fab279a46ce8919e44988a3db76';
        $.getJSON(nytimeurl, function (data) {
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                list = '<a href="' + article.web_url + '"">' + article.headline.main + '</a><br/>';
                fullList = fullList + list;
            }
            infowindow.setContent(fullList);

        }).error(function () {
            alert("Something went wrong!");
        });


        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.setMarker = null;
        });
    }
}

var viewModel = function () {
    var self = this;
    var i = 0;
    this.locationList = ko.observableArray([]);
    this.filteredLocationList = ko.observableArray([]);
    this.myObservableArray = ko.observableArray();
    self.articleList = ko.observableArray();


    self.selectedValue = ko.observable();
    self.myObservableArray.push({title: 'Choose a marker'});
    self.myObservableArray.push({title: 'All'});


    locations.forEach(function (locationItem, map) {
        self.locationList.push(new Location(locationItem));
        self.filteredLocationList.push(new Location(locationItem));
        self.myObservableArray.push(new Location(locationItem));
    });


    self.selectedValue.subscribe(function (newValue) {
        if (newValue.title !== 'Choose a marker' && newValue.title !== 'All') {
            lateral = newValue.lat();
            lngtd = newValue.lng();
            title = newValue.title();
            
            self.filteredLocationList([]);
            self.articleList([]);
            self.filteredLocationList.push(new Location({title: newValue.title(), location: {lat:newValue.lat(), lng:newValue.lng()}}));
            
            newValue = {lat: lateral, lng: lngtd};
            setMarkersInvisible();
            marker = setMarkerVisible(title);
            initPopup(marker, {title: title, location: newValue});
            enableBounce(marker);
        }

        else if (newValue.title == 'All') {
            setMarkersInvisible();
            self.filteredLocationList([]);
            locations.forEach(function (locationItem) {
                largeInfowindow = new google.maps.InfoWindow();
                var newMarker = setMarkerVisible(locationItem.title);
                initPopup(newMarker, locationItem);
                enableBounce(newMarker);
                self.filteredLocationList.push(new Location(locationItem));
            });

        }
    });

    this.setLocation = function (clickedLocation) {
        var largeInfowindow = new google.maps.InfoWindow();
        setMarkersInvisible();
        lateral = clickedLocation.lat();
        lngtd = clickedLocation.lng();
        loc = {lat: lateral, lng: lngtd};
        marker = setMarkerVisible(clickedLocation.title());
        enableBounce(marker);
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow, {title: clickedLocation.title()});
        });

        tempfunc = function () {
            var nytimeurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + clickedLocation.title() + '&sort=newest&api-key=dfb69fab279a46ce8919e44988a3db76';
            $.getJSON(nytimeurl, function (data) {
                articles = data.response.docs;
                for (var i = 0; i < articles.length; i++) {
                    var article = articles[i];
                    self.articleList.push({url: article.web_url, headline: article.headline.main});
                }
            }).error(function () {
                alert("Something went wrong!");
            });
        };
        tempfunc();
        self.articleList([]);
    };

};

var Location = function (data) {
    this.lat = ko.observable(data.location.lat);
    this.lng = ko.observable(data.location.lng);
    this.title = ko.observable(data.title);
};


ko.applyBindings(new viewModel());