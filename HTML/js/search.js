$(".searchButton").click(function () {
	if($(".searchBox").val()!= "") {
    	window.location = "./index.html?city="+$(".searchBox").val();
    }
});
$(".searchBox").keypress(function (event) {
	if (event.key == "Enter" && $(".searchBox").val()!= "") {
		window.location = "./index.html?city="+ $(".searchBox").val();	
	}
})