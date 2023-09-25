function showSidebarDetails(jq) {
	const index = $(".sidebar-icon-opens .icon").index(jq) - 1;
	$(".sidebar-detail").show();
	$(".sidebar-detail h2").addClass("sidebar-detail-hidden");
	if (0 <= index) {
		$(".sidebar-detail h2").eq(index).removeClass("sidebar-detail-hidden");
	}
}

function closeSidebarDetails(jq) {
	$(".sidebar-detail").hide();
}

function showDetais(jq) {
	$(".sidebar-detail h2").not(jq).addClass("sidebar-detail-hidden");
	$(jq).toggleClass("sidebar-detail-hidden");
}

function sidebarEvents() {

	$(".sidebar-icon-opens .icon").on("click", function () {
		showSidebarDetails(this);
	});

	$(".sidebar-detail-close").on("click", function () {
		closeSidebarDetails(this);
	});

	$(".sidebar-detail h2").on("click", function () {
		showDetais(this);
	});
}