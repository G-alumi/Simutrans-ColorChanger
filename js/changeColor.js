function changeColor() {
	$(".canvas-loading").show();
	let colorIndex = getColorIndex();
	console.log(colorIndex)
	for (let pix_i = 0; pix_i < canvasFlg.length; pix_i++) {
		if (canvasFlg[pix_i]) {
			for (let c_i of colorIndex) {
				if (SPcolors[c_i][0] == srcImageData.data[pix_i * 4 + 0] &&
					SPcolors[c_i][1] == srcImageData.data[pix_i * 4 + 1] &&
					SPcolors[c_i][2] == srcImageData.data[pix_i * 4 + 2]) {
					srcImageData.data[pix_i * 4]--;
					break;
				}
			}
		}
	}
	drawCanvas(srcImageData);
	$(".canvas-loading").hide();
}