let src;
let srcImageData;
let canvasFlg;
let canvasMouse = { x: 0, y: 0, which: 0 };
let scale = 1;

$(function () {
	$(".canvas-loading").hide();
	$(".help").hide();
	sidebarEvents();
	palletEvents();
	rangeEvents();
	canvasEvents();
	canvasSelectEvents();
	RclickMenu();
	
	$(".img-save").on("click", function(){
		saveImage();
	})

	//画像読み込み処理
	$(document).on("change", ".fileForm", function () {
		imageLoad(this,function(imageData){
			src = imageData;
		});
	});

	//右クリック無効化
	 $(document).on('contextmenu', function() {
         return false;
     });

});