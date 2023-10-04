class ImageSrc {
	static get SPcolors() {
		return [
			[107, 107, 107],
			[155, 155, 155],
			[179, 179, 179],
			[201, 201, 201],
			[87, 101, 111],
			[127, 155, 241],
			[255, 255, 83],
			[255, 33, 29],
			[1, 221, 1],
			[227, 227, 255],
			[193, 177, 209],
			[77, 77, 77],
			[255, 1, 127],
			[1, 1, 255],
			[36, 75, 103],
			[57, 94, 124],
			[76, 113, 145],
			[96, 132, 167],
			[116, 151, 189],
			[136, 171, 211],
			[156, 190, 233],
			[176, 210, 255],
			[123, 88, 3],
			[142, 111, 4],
			[161, 134, 5],
			[189, 157, 7],
			[198, 180, 8],
			[217, 203, 10],
			[236, 226, 11],
			[255, 249, 13]
		];
	}

	//指定したサイズのキャンバスを生成して返す(標準搭載しろ)
	static createCanvas(w, h) {
		const canvas = $("<canvas></canvas>");
		canvas.attr("width", w);
		canvas.attr("height", h);
		return canvas[0];
	}

	//imageDataをコピーする
	static copyImageData(imageData) {
		const imageW = imageData.width;
		const imageH = imageData.height;
		const buffer = this.createCanvas(imageW, imageH);
		const bufferCtx = buffer.getContext("2d");
		bufferCtx.putImageData(imageData, 0, 0);

		return bufferCtx.getImageData(0, 0, imageW, imageH);
	}

	//ソースのImageData
	#imageData;
	//表示用データ
	//目立たせる処理とか選択範囲を反映したもの
	#viewData;
	//ファイル名
	name;
	//選択状態フラグ
	pixFlg;

	//コンストラクタ
	//フォームから各値を初期化
	constructor(image, name) {
		const buffer = ImageSrc.createCanvas(image.width, image.height);
		const bufferCtx = buffer.getContext("2d");
		bufferCtx.drawImage(image, 0, 0);

		this.#imageData = bufferCtx.getImageData(0, 0, image.width, image.height);
		this.#viewData = bufferCtx.getImageData(0, 0, image.width, image.height);

		this.name = name;
		this.pixFlg = new Array(this.width * this.height).fill(false);
	}

	//選択範囲の選択中特別色を置き換える
	set() {
		console.time("set");
		let src = this.#imageData;
		let colorIndex = getColorIndex();
		for (let pix_i = 0; pix_i < this.pixFlg.length; pix_i++) {
			if (this.pixFlg[pix_i]) {
				for (let c_i of colorIndex) {
					const data_i = pix_i * 4;
					if (ImageSrc.SPcolors[c_i][0] == src.data[data_i + 0] &&
						ImageSrc.SPcolors[c_i][1] == src.data[data_i + 1] &&
						ImageSrc.SPcolors[c_i][2] == src.data[data_i + 2]) {
						src.data[data_i]--;
						break;
					}
				}
			}
		}
		this.setView();
		console.timeEnd("set");
	}

	//ビューを条件に合わせて更新
	setView() {
		console.time("setView");
		const opacity = 0.5;
		const markFlg = $(".canvasMark").hasClass("selected");
		const colorIndex = getColorIndex();
		const src = this.#imageData;
		const view = this.#viewData;
		const size = this.pixFlg.length;

		for (let pix_i = 0; pix_i < size; pix_i++) {
			const data_i = pix_i * 4;
			//選択済エリア #0000FF を透明度で合成
			if (this.pixFlg[pix_i]) {
				if (markFlg) {
					//目立たせる設定中は選択済エリアの特殊色を #FF0000 に
					let noChange = true
					for (let c_i of colorIndex) {
						if (ImageSrc.SPcolors[c_i][0] == src.data[data_i + 0] &&
							ImageSrc.SPcolors[c_i][1] == src.data[data_i + 1] &&
							ImageSrc.SPcolors[c_i][2] == src.data[data_i + 2]) {
							view.data[data_i + 0] = 255;
							view.data[data_i + 1] = 0;
							view.data[data_i + 2] = 0;
							view.data[data_i + 3] = 255;
							noChange = false;
							break;
						}
					}
					if (noChange) {
						const pixelOpacity = src.data[data_i + 3] / 255;
						view.data[data_i + 0] = (src.data[data_i + 0] * (1 - opacity) * pixelOpacity) + (0 * opacity);
						view.data[data_i + 1] = (src.data[data_i + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
						view.data[data_i + 2] = (src.data[data_i + 2] * (1 - opacity) * pixelOpacity) + (255 * opacity);
						view.data[data_i + 3] = (src.data[data_i + 3] * (1 - opacity)) + (255 * opacity);
					}
				} else {
					const pixelOpacity = src.data[data_i + 3] / 255;
					view.data[data_i + 0] = (src.data[data_i + 0] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					view.data[data_i + 1] = (src.data[data_i + 1] * (1 - opacity) * pixelOpacity) + (0 * opacity);
					view.data[data_i + 2] = (src.data[data_i + 2] * (1 - opacity) * pixelOpacity) + (255 * opacity);
					view.data[data_i + 3] = (src.data[data_i + 3] * (1 - opacity)) + (255 * opacity);
				}
			} else {
				view.data[data_i + 0] = src.data[data_i + 0];
				view.data[data_i + 1] = src.data[data_i + 1];
				view.data[data_i + 2] = src.data[data_i + 2];
				view.data[data_i + 3] = src.data[data_i + 3];
			}
		}
		console.timeEnd("setView");
	}

	//imageDataの各フィールドを呼び出せるようにするためのゲッター・セッター
	//imageDataをこのクラスで置き換えたため、width,heightもゲッターを整備

	//直接Uint8arrayを代入できるようにしている
	set data(u8array) {
		const end = Math.min(this.#imageData.data.length, u8array.length)
		for (let index = 0; index < end; index++) {
			this.#imageData.data[index] = u8array[index];
		}
	}
	//新規で配列を生成して返却
	get data() {
		return new Uint8Array(this.#imageData.data);
	}
	get width() {
		return this.#imageData.width;
	}
	get height() {
		return this.#imageData.height;
	}

	//新規でimageDataを作成して返却
	get imageData() {
		return ImageSrc.copyImageData(this.#imageData);
	}
	get viewData() {
		return ImageSrc.copyImageData(this.#viewData);
	}

	//imageDataを描画したキャンバスを返却
	//(旧getCanvas())
	get canvas() {
		const buffer = ImageSrc.createCanvas(this.width, this.height);
		const bufferCtx = buffer.getContext("2d");
		bufferCtx.putImageData(this.#imageData, 0, 0);

		return buffer;
	}
}