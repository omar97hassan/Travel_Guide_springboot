function search (){
	var recentTrips;
	if (localStorage.getItem('recentTrips')) {
		recentTrips = JSON.parse(localStorage.getItem('recentTrips'));
	}else{
		recentTrips = {cities:[]};
	}
		recentTrips.cities.unshift($(".searchBox").val());
		recentTrips.cities = recentTrips.cities.slice(0,5);
		localStorage.setItem('recentTrips', JSON.stringify(recentTrips));			
		window.location = "./index.html?city="+ $(".searchBox").val();
}

$(".searchButton").click(function () {
	if($(".searchBox").val()!= "") {
    	search();
    }
});
$(".searchBox").keypress(function (event) {
	if (event.key == "Enter" && $(".searchBox").val()!= "") {
		search();
	}
})
