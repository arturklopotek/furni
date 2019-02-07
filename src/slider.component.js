angular
  .module('app', []);

angular
  .module('app')
  .component('slider', {
    templateUrl: 'src/slider.template.html',
    bindings: { 
    	min: "<",
    	max: "<"
    },
    require: {
        ngModel: '^ngModel'
    },
    controller: SliderController
  });

function SliderController($scope) {

	this.$onInit = () => {
		this.ngModel.$render = () => {
		    this.model = this.ngModel.$viewValue;
		};
		$scope.$watch(() => this.model, (value) => {
		    this.ngModel.$setViewValue(value);
		});
    };

	this.width = () => {
		const p = (this.model / this.max) * 100;
		return `${p}%`;
	}
}