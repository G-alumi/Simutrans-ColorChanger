function rangeEvents(){

	function rangeSelect(jqButton,event){
		$(".rangeSelect div.button").removeClass("selected");
		$(jqButton).addClass("selected");
	}

	function changeExecute(event){
		if(canvasFlg!=null){
			changeColor();
		}
	}

	$(".rangeSelect div.button").on("click",function(e){
		rangeSelect(this,e);
	});

	$(".changeExecute").on("click",function(e){
		changeExecute(e);
	})

	$(".canvasMark").on("click",function(e){
		$(this).toggleClass("selected");
		if(srcImageData!=null){
			drawCanvas(srcImageData);
		}
	})
}