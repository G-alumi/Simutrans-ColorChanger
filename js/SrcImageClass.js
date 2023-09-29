class ImageSrc {
	//ソースのImageData
	#imageData;
	//ファイル名
	name;
	//選択状態フラグ
	pixFlg;

	//コンストラクタ
	//フォームから各値を初期化
	constructor(image, name) {
		const buffer = $("<canvas></canvas>");
		buffer.attr("width", image.width);
		buffer.attr("height", image.height);
		const bufferCtx = buffer.get(0).getContext("2d");
		bufferCtx.drawImage(image, 0, 0);

		this.#imageData = bufferCtx.getImageData(0, 0, image.width, image.height);

		this.name = name;
		this.pixFlg = new Array(this.width * this.height).fill(false);
	}

	//キャンバスで取得
	getCanvas() {
		const buffer = $("<canvas></canvas>");
		buffer.attr("width", this.width);
		buffer.attr("height", this.height);
		const bufferCtx = buffer[0].getContext("2d");
		bufferCtx.putImageData(this.#imageData, 0, 0);

		return buffer[0];
	}

	set data(u8array) {
		const end = Math.min(this.#imageData.data.length, u8array.length)
		for (let index = 0; index < end; index++) {
			this.#imageData.data[index] = u8array[index];
		}
	}
	get imageData() {
		const result = new ImageData(this.width, this.height);
		for (let index = 0; index < this.data.length; index++) {
			result.data[index] = this.data[index];
		}
		return result;
	}
	get data() {
		return this.#imageData.data;
	}
	get width() {
		return this.#imageData.width;
	}
	get height() {
		return this.#imageData.height;
	}
}