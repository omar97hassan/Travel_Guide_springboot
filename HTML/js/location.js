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
	    	radius: '500',
	    	type: ['restaurant']
		};

		var accomodationRequest = {
	    	location: mapCenter,
	    	radius: '500',
	    	name: 'Hotel'
		};

		var poisRequest = {
	    	location: mapCenter,
	    	radius: '500',
	    	//type: ['museum']
	    	name: 'Museum'
		};

		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(foodRequest, food);
		service.nearbySearch(poisRequest, pois);
		service.nearbySearch(accomodationRequest, hotels);
	}

	function food(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		$(".foodCard .card-text").html("");
	  		for (var i = 0; i < results.length; i++) {
	  			if (results[i].photos) {
		  			$(".foodCard .card-text").append("<img src='" + results[i].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}) + "' width='100%'>");  				
	  			} else{
	  				$(".foodCard .card-text").append("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxuJkO8J3Bzk_Gsaw-vRaE3UlPdFmVGmP_ih0kX5zpql5iHVugw'  width='100%'>");
	  			}
	  			$(".foodCard .card-text").append("<p>"+results[i].name+"</p>");
	  		}
		}
	}

	function hotels(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		$(".accomodationCard .card-text").html("");
	  		for (var i = 0; i < results.length; i++) {
	  			if (results[i].photos) {
		  			$(".accomodationCard .card-text").append("<img src='" + results[i].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}) + "' width='100%'>");  				
	  			} else{
	  				$(".accomodationCard .card-text").append("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxuJkO8J3Bzk_Gsaw-vRaE3UlPdFmVGmP_ih0kX5zpql5iHVugw'  width='100%'>");
	  			}
	  			$(".accomodationCard .card-text").append("<p>"+results[i].name+"</p>");
	  		}
		}
	}

	function pois(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);
	  		$(".landmarksCard .card-text").html("");
	  		for (var i = 0; i < results.length; i++) {
	  			if (results[i].photos) {
		  			$(".landmarksCard .card-text").append("<img src='" + results[i].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}) + "' width='100%'>");  				
	  			} else{
	  				$(".landmarksCard .card-text").append("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxuJkO8J3Bzk_Gsaw-vRaE3UlPdFmVGmP_ih0kX5zpql5iHVugw'  width='100%'>");
	  			}
	  			$(".landmarksCard .card-text").append("<p>"+results[i].name+"</p>");
	  		}
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
} else{
	$(".topTitle").html(geoplugin_city());
	populateCards();
}
/*
if($(".topTitle").html() == "Travel Guide"){
	$(".topTitle").html(geoplugin_city());
	populateCards();
} else{
	populateCards($(".topTitle").html());
}
*/