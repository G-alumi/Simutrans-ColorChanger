let srcImageData;
let canvasFlg;
let canvasMouse = { x: 0, y: 0, which: 0 };
let scale = 1;

const SPcolors = [
	[107,107,107],
	[155,155,155],
	[179,179,179],
	[201,201,201],
	[87,101,111],
	[127,155,241],
	[255,255,83],
	[255,33,29],
	[1,221,1],
	[227,227,255],
	[193,177,209],
	[77,77,77],
	[255,1,127],
	[1,1,255],
	[36,75,103],
	[57,94,124],
	[76,113,145],
	[96,132,167],
	[116,151,189],
	[136,171,211],
	[156,190,233],
	[176,210,255],
	[123,88,3],
	[142,111,4],
	[161,134,5],
	[189,157,7],
	[198,180,8],
	[217,203,10],
	[236,226,11],
	[255,249,13]
];

$(function () {
	$(".canvas-loading").hide();
	sidebarEvents();
	palletEvents();
	rangeEvents();
	canvasEvents();
	canvasSelectEvents();

	//画像読み込み処理
	$(document).on("change", ".fileForm", function () {
		
		imageLoad(this,function(imageData,flg){
			srcImageData = imageData;
			canvasFlg = flg;
			drawCanvas(srcImageData);
			$(".img-save").on("click", function(){
				const srcW = imageData.width;
				const srcH = imageData.height;
				const buffer = $("<canvas></canvas>");
				buffer.attr("width", srcW);
				buffer.attr("height", srcH);
				const bufferCtx = buffer.get(0).getContext("2d");
				bufferCtx.putImageData(imageData, 0, 0);

				const dlAnker = $("<a></a>");
				dlAnker.attr("href",buffer.get(0).toDataURL("image/png"));
				dlAnker.attr("download","image.png");
				dlAnker[0].click();
				console.log(buffer.get(0).toDataURL("image/png"))
			})
		});
	});

	//右クリック無効化
	// $(document).on('contextmenu', function() {
    //     return false;
    // });

});
