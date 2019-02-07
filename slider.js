

function initSlider() {
	const elements = document.getElementsByClassName('slider');
	for (const elSlider of elements) {
		const elBar = elSlider.getElementsByTagName("bar")[0];
		const elValue = elSlider.getElementsByTagName("value")[0];
		const elInput = elSlider.getElementsByTagName("input")[0];
		elSlider.addEventListener("input", () => {
			elValue.innerText = elInput.value;
			const w = Math.round(100 * (elInput.value) / (elInput.max));
			elBar.style.width = `${w}%`;
			console.info(w);

		});
	}
}

addEventListener("load", () => initSlider());