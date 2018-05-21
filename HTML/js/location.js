function populateCards(city) {
	var map;
	var service;
	var infowindow;
	var userLatLng = {lat:geoplugin_latitude(), lng:geoplugin_longitude()};

	function initialize(codedlat, codedlng) {
		var mapCenter;
		
		if (codedlat) {
			userLatLng.lat = codedlat;
			userLatLng.lng = codedlng;			
		}

		mapCenter = new google.maps.LatLng(userLatLng.lat, userLatLng.lng);

		map = new google.maps.Map(document.getElementById('map'), {
			center: mapCenter,
	    	zoom: 15
	  	});

		var foodRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	type: ['restaurant']
		};

		var accomodationRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	name: 'Hotel'
		};

		var poisRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: 'top sights in' + $(".topTitle").html()
		};

		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(foodRequest, food);
		service.nearbySearch(poisRequest, pois);
		service.nearbySearch(accomodationRequest, hotels);
	}

	function food(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		var rand = Math.floor(Math.random() * Math.floor(3));
	  	    var image = (results[rand].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}));
	  	    $(".foodCard .loadImg").attr("src", image);
	  	    $(".foodCard .showMore").html("Found " + results.length + "+ resuts <br> <span class='clickForMore'> Click the card for more details...</span>");
		}
	}

	function hotels(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		var rand = Math.floor(Math.random() * Math.floor(3));
	  	    var image = (results[rand].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}));
	  	    $(".accomodationCard .loadImg").attr("src", image);
	  	    $(".accomodationCard .showMore").html("Found " + results.length + "+ resuts <br> <span class='clickForMore'> Click the card for more details...</span>");	
		}
	}

	function pois(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		var rand = Math.floor(Math.random() * Math.floor(3));
	  	    var image = (results[rand].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}));
	  	    $(".landmarksCard .loadImg").attr("src", image);
	  	    $(".landmarksCard .showMore").html("Found " + results.length + "+ resuts <br> <span class='clickForMore'> Click the card for more details...</span>");
		}
	}

	if (city) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': city}, function(results, status) {
		    if (status === 'OK') {
		        var ll = ""+results[0].geometry.location+"";
		        initialize(ll.substring(1, ll.indexOf(',')), ll.substring(ll.indexOf(',')+2, ll.length-1));
		    }
		})
	} else{
		initialize();
	}
}

//display users location in titlebar
var str = ""+window.location;
if(str.indexOf('city=')!=-1){
	var city = decodeURI(str.substring(str.indexOf("city=")+5));
	$(".topTitle").html(city);
	populateCards($(".topTitle").html());
	getWeatherForIndex($(".topTitle").html());
} else{
	$(".topTitle").html(geoplugin_city());
	populateCards();
	getWeatherForIndex(geoplugin_city());
}

$(".accomodationCard").on("click", function(){
	window.location = "accomodation.html?city=" + $(".topTitle").html();
})
$(".landmarksCard").on("click", function(){
	window.location = "landMarks.html?city=" + $(".topTitle").html();
})
$(".foodCard").on("click", function(){
	window.location = "placeToEat.html?city=" + $(".topTitle").html();
})
$(".WeatherCard").on("click", function(){
	window.location = "weather.html?city=" + $(".topTitle").html();
})

