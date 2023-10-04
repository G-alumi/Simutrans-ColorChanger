function RclickMenu() {
	$(".RclickMenu-wrap").hide();
	$(document).on("click",function(e){
		$(".RclickMenu-wrap").hide();
	})
	$(".canvas-wrap").contextmenu(function (e) {
		if(src != null){
			$(".RclickMenu-wrap").show().offset({ top: e.clientY, left: e.clientX })
		}
	})

}