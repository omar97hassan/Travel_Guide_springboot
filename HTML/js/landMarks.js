var infoWindows = [];
var marker = [];
function populateCards(city) {
	var map;
	var service;
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
	    	zoom: 12
	  	});

		var landMarksRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: "top sights in " + $(".topTitle").html()
		};
		var natureRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: "parks and nature near " + $(".topTitle").html()
		};
		var religionRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: "place of worship in " + $(".topTitle").html()
	    	//query: "historic sights" + $(".topTitle").html()
		};
		var museumRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: "museums in " + $(".topTitle").html()
		};
		var libraryRequest = {
	    	location: mapCenter,
	    	radius: '20000',
	    	query: "lbraries in " + $(".topTitle").html()
		};

		service = new google.maps.places.PlacesService(map);
		service.textSearch(museumRequest, landMarks);
		service.textSearch(libraryRequest, landMarks);
		service.textSearch(landMarksRequest, landMarks);
		service.textSearch(natureRequest, landMarks);
		service.textSearch(religionRequest, landMarks);
	}

	function landMarks(results, status) {
	  	if (status == google.maps.places.PlacesServiceStatus.OK) {
	  		console.log(results);

	  		//$(".landMarksCards").html("");
	  		for (var i = 0; i < results.length; i++){
	  		
            if (results[i].photos) {

            var numOfStars = Math.round(results[i].rating);
            var ratingHTML;
            switch(numOfStars) {
			    case 1:
			        ratingHTML = "<i class='fa fa-star'></i>";
			        break;
			    case 2:
			        ratingHTML = "<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>";
			        break;
			    case 3:
			        ratingHTML = "<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>";
			        break;
			    case 4:
			        ratingHTML = "<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>";
			        break;
			    case 5:
			        ratingHTML = "<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"+"<i class='fa fa-star'></i>"
			        break;
			    default:
			        ratingHTML = "<i class='fa fa-star-half'></i> Not Rated";
			}

            var pattern = '<div class="col-xs-12 col-md-4 grid-item">\
                        <div class="card placeCard" data-search="'+results[i].name+' '+ results[i].formatted_address +'">\
                          <img class="card-img-top placePhoto" src="'+ results[i].photos[0].getUrl({'maxWidth': 400, 'maxHeight': 300}) +'" alt="Card image cap">\
                          <div class="card-body">\
                            <div class="card-text">\
                                <h3 class="placeName">'+ results[i].name +'</h3>\
                                <h6 ><span class="fa fa-map-marker-alt"></span><span class="placeAddress">'+ results[i].formatted_address +'</span></h6>\
                                <p></p>\
                                <p> Rating: <span class="ratingStars">'+ ratingHTML +'</span> </p>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
                }
             console.log(pattern);

             $(".landMarksCards").append(pattern);
             $(".placeCard").on("click", function(){
				var search = $(this).attr("data-search");
				window.location = "https://www.google.ba/search?q="+search;
			});
            	
             marker[i] = new google.maps.Marker({
		          map: map,
        		  position: results[i].geometry.location,
        		  title: results[i].name
        	  });

             var contentString = '<div id="content">'+ results[i].name + '</div>'
             
              infoWindows[i] = new google.maps.InfoWindow({
    			content: contentString
  				});

  			marker[i].addListener('click', function() {
    			infoWindows[i].open(map, this);
  			});


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


$(".moreOpt").on("click", function(){
	$("#map").css("height", "400px");
})