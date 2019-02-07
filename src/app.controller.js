angular
  .module('app')
  .controller('AppController', AppController);

function AppController($scope) {

	$scope.params = {
		d: 240,
		w: 320,
		h: 200
	};

	$scope.$watch("params", (newParams) => {
		Object.assign(Params, newParams);
	}, true);
}
