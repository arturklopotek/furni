angular
  .module('app')
  .controller('AppController', AppController);

function AppController($scope) {

	$scope.params = {
		d: 240,
		w: 320,
		h: 200,
		ortho: false
	};

	$scope.$watch("params", (newParams) => {
		Object.assign(Params, newParams);
	}, true);

	this.download = () => {
		window.location = "files/Ryczka_Sikorska-Dlugaj.dxf";
	}

	this.changeView = () => {
		$scope.params.ortho = !$scope.params.ortho;
	}
}
