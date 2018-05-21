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
    window.location = "./index.html";
});
$(".sideSearchBtn").click(function() {
    window.location = "./search.html";
});
$(".sideAboutBtn").click(function() {
    window.location = "./about.html";
});


////////////////////////////////////////////////////////////////////
