//canvas描画処理
function drawCanvas(imageSrc, selectFlg) {
	const imageData = imageSrc.viewData;
	const srcW = imageSrc.width;
	const srcH = imageSrc.height;
	const canvasFlg = imageSrc.pixFlg;

	const viewCanvas = $("#canvas-main");
	const viewCtx = viewCanvas[0].getContext("2d");

	const beginW = viewCanvas.width() == 0 ? srcW * scale : viewCanvas.width();
	const beginH = viewCanvas.height() == 0 ? srcH * scale : viewCanvas.height();

	//選択範囲表示
	const opacity = 0.5;
	const existSelectFlg = typeof selectFlg !== "undefined";

	if (existSelectFlg) {
		for (let index = 0; index < canvasFlg.length; index++) {
			if (selectFlg[index]) {
				//マウス選択中エリア #FF0000 を透明度で合成する
				const pixelOpacity = imageData.data[index * 4 + 3] / 255;
				imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (255 * opacity);
				imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
				imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (0 * opacity);
				imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
			}
		}
	}

	//canvas描画
	const buffer = ImageSrc.createCanvas(srcW, srcH);
	const bufferCtx = buffer.getContext("2d");
	bufferCtx.putImageData(imageData, 0, 0);

	if (scale <= 1) {
		viewCanvas.attr("width", srcW);
		viewCanvas.attr("height", srcH);
		viewCtx.drawImage(buffer, 0, 0);
	} else {
		viewCanvas.attr("width", srcW * scale);
		viewCanvas.attr("height", srcH * scale);

		viewCtx.imageSmoothingEnabled = false;
		viewCtx.drawImage(buffer, 0, 0, srcW * scale, srcH * scale);
		if (8 < scale) {
			viewCtx.strokeStyle = "#6c6c6c";
			viewCtx.lineWidth = 1;
			for (let x = 0; x < srcW; x++) {
				viewCtx.beginPath();
				viewCtx.moveTo(x * scale, 0);
				viewCtx.lineTo(x * scale, srcH * scale);
				viewCtx.stroke();
			}
			for (let y = 0; y < srcH; y++) {
				viewCtx.beginPath();
				viewCtx.moveTo(0, y * scale);
				viewCtx.lineTo(srcW * scale, y * scale);
				viewCtx.stroke();
			}
		}
	}

	//cssの表示サイズ指定など
	viewCanvas.width(srcW * scale);
	viewCanvas.height(srcH * scale);
	const offset = viewCanvas.offset();
	const x = canvasMouse.x - (canvasMouse.x - offset.left) * (srcW * scale / beginW);
	const y = canvasMouse.y - (canvasMouse.y - offset.top) * (srcH * scale / beginH);
	viewCanvas.offset({ top: y, left: x });
}
