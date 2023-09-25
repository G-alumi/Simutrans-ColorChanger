//canvas描画処理
function drawCanvas(argImageData, selectFlg) {
	//imageData初期化
	const imageData = new ImageData(argImageData.width, argImageData.height);
	for (let index = 0; index < imageData.data.length; index++) {
		imageData.data[index] = argImageData.data[index];
	}

	const viewCanvas = $("#canvas-main");
	const viewCtx = viewCanvas.get(0).getContext("2d");
	const srcW = imageData.width;
	const srcH = imageData.height;

	const beginW = viewCanvas.width() == 0 ? srcW * scale : viewCanvas.width();
	const beginH = viewCanvas.height() == 0 ? srcH * scale : viewCanvas.height();

	//選択範囲表示
	const opacity = 0.5
	const markFlg = $(".canvasMark").hasClass("selected")
	const colorIndex = getColorIndex()
	for (let index = 0; index < canvasFlg.length; index++) {
		if (typeof selectFlg !== "undefined" && selectFlg[index]) {
			const pixelOpacity = imageData.data[index * 4 + 3] / 255;
			imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (255 * opacity);
			imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
			imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (0 * opacity);
			imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
		} else if (canvasFlg[index]) {
			if (markFlg) {
				let noChange = true
				for (let c_i of colorIndex) {
					if (SPcolors[c_i][0] == imageData.data[index * 4 + 0] &&
						SPcolors[c_i][1] == imageData.data[index * 4 + 1] &&
						SPcolors[c_i][2] == imageData.data[index * 4 + 2]) {
						imageData.data[index * 4 + 0] = 255;
						imageData.data[index * 4 + 1] = 0;
						imageData.data[index * 4 + 2] = 0;
						imageData.data[index * 4 + 3] = 255;
						noChange = false;
						break;
					}
				}
				if(noChange){
					const pixelOpacity = imageData.data[index * 4 + 3] / 255;
					imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (255 * opacity);
					imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
				}
			}else{
				const pixelOpacity = imageData.data[index * 4 + 3] / 255;
				imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (0 * opacity);
				imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
				imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (255 * opacity);
				imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
			}
		}
	}

	//canvas描画
	const buffer = $("<canvas></canvas>");
	buffer.attr("width", srcW);
	buffer.attr("height", srcH);
	const bufferCtx = buffer.get(0).getContext("2d");
	bufferCtx.putImageData(imageData, 0, 0);
	if (scale <= 1) {
		viewCanvas.attr("width", srcW);
		viewCanvas.attr("height", srcH);
		viewCtx.drawImage(buffer.get(0), 0, 0);
	} else {
		viewCanvas.attr("width", srcW * scale);
		viewCanvas.attr("height", srcH * scale);

		viewCtx.imageSmoothingEnabled = false;
		viewCtx.drawImage(buffer.get(0), 0, 0, srcW * scale, srcH * scale);
	}

	//cssの表示サイズ指定など
	viewCanvas.width(srcW * scale);
	viewCanvas.height(srcH * scale);
	const offset = viewCanvas.offset();
	const x = canvasMouse.x - (canvasMouse.x - offset.left) * (srcW * scale / beginW);
	const y = canvasMouse.y - (canvasMouse.y - offset.top) * (srcH * scale / beginH);
	viewCanvas.offset({ top: y, left: x });
}
