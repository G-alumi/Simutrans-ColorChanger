
function getColorIndex() {
	let result = [];
	$(".pallet").each(function () {
		if ($(this).hasClass("selected")) {
			result.push($(this).index());
		}
	})
	return result;
}

function palletEvents() {
	function generatePallet() {
		for (let color of SPcolors) {
			const html = `<div class="pallet">
			<div class="pallet-colorBox" style="background-color: rgb(${color[0]},${color[1]},${color[2]});"></div>
			<div class="pallet-colorCode">${color.join()}</div>
		</div>`;
			$("#pallet_area").append(html);
		}
	}

	function selectColor(event, jq, lastIndex) {
		$(jq).toggleClass("selected");
		const index = $(".pallet").index(jq);

		if (event.shiftKey) {
			const max = Math.max(lastIndex, index);
			const min = Math.min(lastIndex, index);
			if ($(".pallet").eq(lastIndex).hasClass("selected")) {
				for (let i = min; i <= max; i++) {
					$(".pallet").eq(i).addClass("selected");
				}
			} else {
				for (let i = min; i <= max; i++) {
					$(".pallet").eq(i).removeClass("selected");
				}
			}
		}

		$("#allSelectColor").addClass("selected");
		$(".pallet").each(function () {
			if (!$(this).hasClass("selected")) {
				$("#allSelectColor").removeClass("selected");
			}
		})

		if (src != null) {
			drawCanvas(src);
		}
	}

	function selectAllColor() {
		$("#allSelectColor").toggleClass("selected");
		if ($("#allSelectColor").hasClass("selected")) {
			$(".pallet").addClass("selected");
		} else {
			$(".pallet").removeClass("selected");
		}

		if (src != null) {
			drawCanvas(src);
		}
	}

	generatePallet();
	let lastIndex = null;

	$("#allSelectColor").on("click", function () {
		selectAllColor();
	});

	$("#allRemoveColor").on("click", function () {
		$(".pallet").removeClass("selected");
		$("#allSelectColor").removeClass("selected");
		if (src != null) {
			drawCanvas(src);
		}
	});

	$(".pallet").on("click", function (e) {
		selectColor(e, this, lastIndex);

		lastIndex = $(".pallet").index(this);
	})
}