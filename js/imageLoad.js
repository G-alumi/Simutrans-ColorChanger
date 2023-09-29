//画像読み込み
function imageLoad(jqForm,callback) {

	$(".canvas-initial").hide();
	$(".canvas-loading").show();

	const reader = new FileReader();

	reader.onload = function () {
		const srcImg = new Image();

		srcImg.onload = function () {
			const result = new ImageSrc(srcImg,filename);
			
			canvasMouse = { x: $(window).width / 2, y: $(window).height / 2, which: 0 };
			$("canvas").offset({ left: ($(window).width() - srcImg.width * scale) / 2, top: ($(window).height() - srcImg.height * scale) / 2 });
			drawCanvas(result);
			$(".canvas-loading").hide();
			callback(result);
		}
		srcImg.src = reader.result;
	}

	const filename = $(jqForm)[0].files[0].name;
	$(".fileForm").siblings("span").html(filename);

	reader.readAsDataURL($(jqForm)[0].files[0]);
}