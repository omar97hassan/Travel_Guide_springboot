//alert("selam");
$(".appNav").on("click", function () {
    $(".sideBarWrap").removeClass("hideDarknes");
    $(".sideBar").removeClass("hideSideBar");

    $(".sideBarWrap").addClass("showDarknes");
    $(".sideBar").addClass("showSideBar");
});

function hideSideBar() {
    $(".sideBarWrap").addClass("hideDarknes");
    $(".sideBar").addClass("hideSideBar");
    setTimeout(function () {
        $(".sideBarWrap").removeClass("showDarknes");
        $(".sideBar").removeClass("showSideBar");
    }, 500);

}

$(".closeSideBar").on("click", function () {
    hideSideBar();
});
$(".sideBarWrap").click(function () {
    hideSideBar();
}).children().click(function (e) {
    return false;
});

//sideBar items:
$(".sideHomeBtn").click(function() {
    var str = window.location+"";
    if (str.indexOf("accomodation.html")!=-1 || str.indexOf("landMarks.html")!=-1 || str.indexOf("placeToEat.html")!=-1 || str.indexOf("weather.html")!=-1 ) {
    window.location = "./index.html?city=" + $(".topTitle").html();
}else{
    window.location = "./index.html";
    }
});
$(".sideSearchBtn").click(function() {
    window.location = "./search.html";
});
$(".sideAboutBtn").click(function() {
    window.location = "./about.html";
});




//hide favorites
$(".sideFavBtn").css("display", "none");
$(".sideFeatBtn").css("display", "none");
//add reacent btn


/*/////////////////////////////////*/
//modal for recent trips

function showRecentTripsInModal () {
    var recentTrips = JSON.parse(localStorage.getItem('recentTrips'));
    for (var i = 0; i < recentTrips.cities.length; i++) {
        var pattern = '<a href="index.html?city='+recentTrips.cities[i]+'"><h3 class="recentCity" >'+recentTrips.cities[i] + '</h3></a>';
        $(".listOfRecent").append(pattern)  //recentTrips[i]
    }
}

function hideRecentModal() {
    $(".recentModalWrap").removeClass("showDarknesR");
    $(".recentModal").removeClass("showRecentModal");
}

function showRecentModal(){
    $(".recentModalWrap").addClass("showDarknesR");
    $(".recentModal").addClass("showRecentModal");
}

$(".recentModalWrap, .closeRecentModal").on("click", function(){
    hideRecentModal();
}).children().click(function (e) {
    
});
$(".sideHistoryBtn").click(function() {
    showRecentModal();
});

showRecentTripsInModal();