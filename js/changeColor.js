function changeColor() {
	$(".canvas-loading").show();
	let colorIndex = getColorIndex();
	for (let pix_i = 0; pix_i < src.pixFlg.length; pix_i++) {
		if (src.pixFlg[pix_i]) {
			for (let c_i of colorIndex) {
				if (SPcolors[c_i][0] == src.data[pix_i * 4 + 0] &&
					SPcolors[c_i][1] == src.data[pix_i * 4 + 1] &&
					SPcolors[c_i][2] == src.data[pix_i * 4 + 2]) {
					src.data[pix_i * 4]--;
					break;
				}
			}
		}
	}
	drawCanvas(src);
	$(".canvas-loading").hide();
}