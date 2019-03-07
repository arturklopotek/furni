angular
  .module('app', []);

angular
  .module('app')
  .component('slider', {
    templateUrl: 'src/slider.template.html',
    bindings: { 
    	min: "<",
    	max: "<",
    	step: "<",
    },
    require: {
        ngModel: '^ngModel'
    },
    controller: SliderController
  });


function SliderController($scope) {

	this.$onInit = () => {
		this.ngModel.$render = () => {
		    this.value = this.ngModel.$viewValue;
		};
		$scope.$watch(() => this.value, (value) => {
		    this.ngModel.$setViewValue(value);
		});
		this.step = this.step || 1;
    };

	this.width = () => {
		const p = this.value / this.max * 100;
		return `${p}%`;
	}

	this.onSlide = (sliderValue) => {
		const value = Math.round(sliderValue * this.max / this.step) * this.step;
		this.value = Math.max(this.min, value);
	}
}
