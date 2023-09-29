//canvas描画処理
function drawCanvas(imageSrc, selectFlg) {
	const imageData = imageSrc.imageData;
	const srcW = imageSrc.width;
	const srcH = imageSrc.height;
	const canvasFlg = imageSrc.pixFlg;

	const viewCanvas = $("#canvas-main");
	const viewCtx = viewCanvas.get(0).getContext("2d");

	const beginW = viewCanvas.width() == 0 ? srcW * scale : viewCanvas.width();
	const beginH = viewCanvas.height() == 0 ? srcH * scale : viewCanvas.height();

	//選択範囲表示
	const opacity = 0.5;
	const markFlg = $(".canvasMark").hasClass("selected")
	const colorIndex = getColorIndex();
	const existSelectFlg = typeof selectFlg !== "undefined";

	for (let index = 0; index < canvasFlg.length; index++) {
		if (existSelectFlg && selectFlg[index]) {
			//マウス選択中エリア #FF0000 を透明度で合成する
			const pixelOpacity = imageData.data[index * 4 + 3] / 255;
			imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (255 * opacity);
			imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
			imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (0 * opacity);
			imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
		} else if (canvasFlg[index]) {
			if (markFlg) {
				//目立たせる設定中は選択済エリアの特殊色を #FF0000 に
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
				if (noChange) {
					const pixelOpacity = imageData.data[index * 4 + 3] / 255;
					imageData.data[index * 4 + 0] = (imageData.data[index * 4 + 0] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					imageData.data[index * 4 + 1] = (imageData.data[index * 4 + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					imageData.data[index * 4 + 2] = (imageData.data[index * 4 + 2] * (1 - opacity) * pixelOpacity) + (255 * opacity);
					imageData.data[index * 4 + 3] = (imageData.data[index * 4 + 3] * (1 - opacity)) + (255 * opacity);
				}
			} else {
				//選択済エリア #0000FF を透明度で合成
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
		const bufferCtx = buffer[0].getContext("2d");
		bufferCtx.putImageData(imageData, 0, 0);
	
	if (scale <= 1) {
		viewCanvas.attr("width", srcW);
		viewCanvas.attr("height", srcH);
		viewCtx.drawImage(buffer[0], 0, 0);
	} else {
		viewCanvas.attr("width", srcW * scale);
		viewCanvas.attr("height", srcH * scale);

		viewCtx.imageSmoothingEnabled = false;
		viewCtx.drawImage(buffer[0], 0, 0, srcW * scale, srcH * scale);
	}

	//cssの表示サイズ指定など
	viewCanvas.width(srcW * scale);
	viewCanvas.height(srcH * scale);
	const offset = viewCanvas.offset();
	const x = canvasMouse.x - (canvasMouse.x - offset.left) * (srcW * scale / beginW);
	const y = canvasMouse.y - (canvasMouse.y - offset.top) * (srcH * scale / beginH);
	viewCanvas.offset({ top: y, left: x });
}
