function rangeEvents() {

	function rangeSelect(jqButton, event) {
		$(".rangeSelect div.button").removeClass("selected");
		$(jqButton).addClass("selected");
	}

	function changeExecute(event) {
		if (src != null) {
			changeColor();
		}
	}

	$(".rangeSelect div.button").on("click", function (e) {
		rangeSelect(this, e);
	});

	$(".changeExecute").on("click", function (e) {
		changeExecute(e);
	})

	$(".canvasMark").on("click", function (e) {
		$(this).toggleClass("selected");
		if (src != null) {
			drawCanvas(src);
		}
	})
}