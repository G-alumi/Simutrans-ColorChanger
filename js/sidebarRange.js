function rangeEvents() {

	function rangeSelect(jqButton, event) {
		$(".rangeSelect div.button").removeClass("selected");
		$(jqButton).addClass("selected");
	}

	function changeExecute(event) {
		if (src != null) {
			$(".canvas-loading").show();
			src.set();
			drawCanvas(src);
			$(".canvas-loading").hide();
		}
	}

	$(".rangeSelect div.button").on("click", function (e) {
		rangeSelect(this, e);
	});

	$(".changeExecute").on("click", function (e) {
		changeExecute(e);
	});

	$(".canvasMark").on("click", function (e) {
		$(this).toggleClass("selected");
		if (src != null) {
			src.setView();
			drawCanvas(src);
		}
	});

	$(".canvasCutoff").on("click", function (e) {
		$(this).toggleClass("selected");
		if (src != null) {
			src.setView();
			drawCanvas(src);
		}
	});
}