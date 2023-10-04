function saveImage(){
	if(src !=null){
		const dlAnker = $("<a></a>");
		dlAnker.attr("href",src.canvas.toDataURL("image/png"));
		dlAnker.attr("download",src.name);
		dlAnker[0].click();
	}
}