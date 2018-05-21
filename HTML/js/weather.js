function getWeather(city){
	var cityID;

	function getFollowingHours(){
		cityID = $(".celsius").attr("data-city");
		$.ajax({
		type: "GET",
		dataType: "json",
		url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=5a735a8b17d55f5df1529d540097f348",
		success: function (data) {
			console.log(data);
			for (var i = 0; i < 4; i++) {
				$(".hour").eq(i).html(data.list[i].dt_txt.substring(11,16) + " H");
				$(".degree").eq(i).html(Math.round(data.list[i].main.temp - 275) + " °C");
				$(".hourImage").eq(i).attr("src", "http://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png");
				$(".nextDesc").eq(i).html(data.list[i].weather[0].main + ", " + data.list[i].weather[0].description);
			}
		},
		error: function(e){
			console.log(e);

		}
	})

	}

	$.ajax({
		type: "GET",
		dataType: "json",
		url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=dd287b611dcffbe88a0ad47b4b1f4de1",
		success: function (data) {
			console.log(data);
			$(".celsius").html(Math.round(data.main.temp - 275) + " °C"); //k-275 = c
			$(".fahrenheit").html(Math.round(data.main.temp * 9/5 - 459.67) + " °F"); //T(°F) = T(K) × 9/5 - 459.67
			$(".humidity").html("Humidity: " + data.main.humidity + "%");
			$(".wind").html("Wind Speed: " + data.wind.speed + "km/h");
			$(".visibility").html("Visibility: " + Math.round((data.visibility)/1000) + "km");
			$(".image").attr("src", "http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png")
			$(".celsius").attr("data-city", data.id);
			$(".weatherDesc").html("<b>" + data.weather[0].main + "</b>,<br/>" + data.weather[0].description);
			var iSunca = new Date(data.sys.sunrise*1000);
			$(".iSunca").html("Sunrise: " + iSunca.getHours() + ":" + iSunca.getMinutes() + " H");
			var aksam = new Date(data.sys.sunset*1000);
			$(".aksam").html("Sunset: " + aksam.getHours() + ":" + aksam.getMinutes() + " H");
			getFollowingHours();
			getFollowingDays(); 
			
		},
		error: function(e){
			console.log(e);
		}
	})



}
function getWeatherForIndex(city){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=dd287b611dcffbe88a0ad47b4b1f4de1",
		success: function (data) {
			console.log(data);
			$(".WeatherCard .loadImg").attr("src", "http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png");
			$(".WeatherCard .showMore").html(Math.round(data.main.temp - 275) + " °C " + "<b>" + data.weather[0].main + "</b>,<br/>" + data.weather[0].description + '<br><span class="clickForMore">Click the card for more details...</span>');
		},
		error: function(e){
			console.log(e);
		}
	})


}


var str = ""+window.location;
if (str.indexOf("weather.html")!=-1) {
	if(str.indexOf('city=')!=-1){
		var city = decodeURI(str.substring(str.indexOf("city=")+5));
		$(".topTitle").html(city);
		getWeather($(".topTitle").html());
	} else{
		$(".topTitle").html(geoplugin_city());
		getWeather(geoplugin_city());
	}
}




