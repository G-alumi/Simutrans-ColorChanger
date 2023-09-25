//画像読み込み
function imageLoad(jqForm, callback) {
	const srcCanvas = $("<canvas></canvas>");
	const viewCanvas = $("#canvas-main");
	let canvasFlg

	$(".canvas-initial").hide();
	$(".canvas-loading").show();

	const reader = new FileReader();

	reader.onload = function () {
		const srcImg = new Image();

		srcImg.onload = function () {

			//ダミーキャンバス新規作成
			srcCanvas.attr("width", srcImg.width);
			srcCanvas.attr("height", srcImg.height);
			const srcCtx = srcCanvas.get(0).getContext("2d");
			srcCtx.drawImage(srcImg, 0, 0);
			//キャンバスフラグ作成
			canvasFlg = Array(srcImg.width * srcImg.height).fill(false);

			canvasMouse = { x: $(window).width / 2, y: $(window).height / 2, which: 0 };
			viewCanvas.offset({ left: ($(window).width() - srcImg.width * scale) / 2, top: ($(window).height() - srcImg.height * scale) / 2 });

			$(".canvas-loading").hide();

			callback(srcCtx.getImageData(0,0,srcImg.width,srcImg.height), canvasFlg);
		}
		srcImg.src = reader.result;
	}

	$(jqForm).parent("label").html($(jqForm).val().split("\\").reverse()[0] + $(jqForm).parent("label").html());
	reader.readAsDataURL($(jqForm)[0].files[0]);
}