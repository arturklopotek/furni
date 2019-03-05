angular
  .module('app')
  .directive('onSlide', () => ({
  	restrict: "A",
  	link: function($scope, $element, $attrs) {
  		$element.on("mousedown", (event) => {
			slider = event.target;
			updateFunc = (value) => {
				const func = $scope.$eval($attrs.onSlide);
				$scope.$apply(() => func(value));
			}
			updateFunc(event.offsetX / slider.offsetWidth);
  		});
  		$element.on("touchstart", (event) => {
			slider = event.target;
			updateFunc = (value) => {
				const func = $scope.$eval($attrs.onSlide);
				$scope.$apply(() => func(value));
			}
			updateFunc((event.touches[0].clientX - slider.offsetLeft) / slider.offsetWidth);
  		});
  	}
  }));


let slider, updateFunc;
window.addEventListener('mouseup', (e) => {
	slider = null;
});
window.addEventListener('touchend', (e) => {
	slider = null;
});

window.addEventListener('mousemove', (e) => {
	if (slider) {
		let value = (e.x - slider.offsetLeft) / slider.offsetWidth;
		value = Math.max(0, Math.min(1, value));
		updateFunc(value);
	}
});
window.addEventListener('touchmove', (e) => {
	if (slider) {
		let clientX = e.touches[0].clientX;
		let value = (clientX- slider.offsetLeft) / slider.offsetWidth;
		value = Math.max(0, Math.min(1, value));
		updateFunc(value);
	}
});
