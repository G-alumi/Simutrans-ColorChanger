function saveImage(){
		const dlAnker = $("<a></a>");
		dlAnker.attr("href",src.getCanvas().toDataURL("image/png"));
		dlAnker.attr("download",src.name);
		dlAnker[0].click();
}