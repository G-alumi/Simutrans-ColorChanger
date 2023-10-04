function canvasEvents() {
	let canvasLastMouse = { x: 0, y: 0 };
	let lastWheel = null;
	//ホイール回転
	function zoomCanvas(event) {
		if (src != null) {
			let now = new Date().getTime();
			if (now - lastWheel < 20 && now != null) {
				return;
			}
			lastWheel = now;
			moveAmount = event.originalEvent.deltaY;
			if (moveAmount < 0) {
				if (scale < 1) {
					scale = 1;
					drawCanvas(src);
					console.log("倍率:", scale);
				} else if (scale < 10) {
					scale++;
					drawCanvas(src);
					console.log("倍率:", scale);
				}
			} else if (0 < moveAmount) {
				if (1 < scale) {
					scale--;
					drawCanvas(src);
					console.log("倍率:", scale);
				} else if (scale == 1) {
					scale = 0.5;
					drawCanvas(src);
					console.log("倍率:", scale);
				}
			}
		}
	}

	//canvas移動
	function moveCanvas() {
		const viewCanvas = $("#canvas-main");
		let moveX = canvasLastMouse.x - canvasMouse.x;
		let moveY = canvasLastMouse.y - canvasMouse.y;
		let offset = viewCanvas.offset();
		viewCanvas.offset({ top: offset.top - moveY, left: offset.left - moveX })
	}

	//canvasエリア上のマウスカーソル移動
	function movemMouseOnCanvas(event) {
		canvasMouse.x = event.pageX;
		canvasMouse.y = event.pageY;
		if (event.which == 2) {
			moveCanvas();
		}
		canvasLastMouse.x = canvasMouse.x;
		canvasLastMouse.y = canvasMouse.y;
	}

	//ドラッグ移動開始
	function dragBeginOnCanvas(event) {
		if (canvasMouse.which == 0) {
			canvasMouse.which = event.which;
			$(".canvas-wrap").off("wheel");
		}
	}

	//ドラッグを離すかフォーカスが離れる
	function dragEndOnCanvas(event) {
		canvasMouse.which = 0;
		$(".canvas-wrap").on("wheel", function (e) {
			zoomCanvas(e);
		});
	}


	$(".canvas-wrap").on("wheel", function (e) {
		zoomCanvas(e);
	});

	$(".canvas-wrap").on("mousemove", function (e) {
		movemMouseOnCanvas(e);
	});

	$(".canvas-wrap").on("mousedown", function (e) {
		dragBeginOnCanvas(e);
	});

	$(".canvas-wrap").on("mouseup mouseout", function (e) {
		dragEndOnCanvas(e);
	});
}