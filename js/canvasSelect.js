function canvasSelectEvents() {
	let begin = null;

	//座標格納用　限界値超えないようにする
	function setPosition(event) {
		const srcW = src.width;
		const srcH = src.height;
		const currentX = Math.floor(event.offsetX / scale);
		const currentY = Math.floor(event.offsetY / scale);

		const x = currentX < srcW ? currentX : srcW - 1;
		const y = currentY < srcH ? currentY : srcH - 1;

		return { x: x, y: y }
	}

	//座標からフラグ作成
	function generateSelectFlg(begin, end) {
		let result = Array(src.pixFlg.length).fill(false);

		const minX = Math.min(begin.x, end.x);
		const minY = Math.min(begin.y, end.y);
		const maxX = Math.max(begin.x, end.x);
		const maxY = Math.max(begin.y, end.y);

		const imgW = src.width;

		for (let y = minY; y < maxY; y++) {
			const row = y * imgW;
			result = result.fill(true, row + minX, row + maxX);
		}
		return result;

	}

	//範囲指定の選択状態取得
	function getRangeSelect() {
		let result = null
		$(".rangeSelect div.button").each(function () {
			if ($(this).hasClass("selected")) {
				result = $(this).index();
				return false;
			}
		})
		return result;
	}

	//選択開始
	function selectBegin(event) {
		if (event.which == 1) {
			begin = setPosition(event);
		} else {
			begin = null;
		}
	}

	//選択終了
	function selectEnd(event) {
		if (begin != null) {
			const end = setPosition(event);
			const generateFlg = generateSelectFlg(begin, end);
			switch (getRangeSelect()) {
				case 0:	//新規
					src.pixFlg = generateFlg;
					break;
				case 1:	//追加
					for (let index = 0; index < src.pixFlg.length; index++) {
						src.pixFlg[index] = src.pixFlg[index] || generateFlg[index];
					}
					break;
				case 2:	//削除
					for (let index = 0; index < src.pixFlg.length; index++) {
						src.pixFlg[index] = src.pixFlg[index] && !generateFlg[index];
					}
					break;
				default:
					break;
			}
			drawCanvas(src);
		}
		begin = null;
	}

	//選択キャンセル(画面外など)
	function selectCancel(event) {
		begin = null;
	}

	//選択中
	function selectMove(event) {
		if (begin != null) {
			const end = setPosition(event);
			drawCanvas(src, generateSelectFlg(begin, end));
		}
	}

	$("canvas").on("mousedown", function (e) {
		selectBegin(e);
	});

	$("canvas").on("mouseup", function (e) {
		selectEnd(e);
	});

	$("canvas").on("mousemove", function (e) {
		selectMove(e);
	})
	$(document).on("mouseleave", function (e) {
		selectCancel(e);
	});
}