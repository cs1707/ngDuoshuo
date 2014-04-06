var app = angular.module("App", ['ngDuoshuo', 'ngRoute']);

app.config(["$routeProvider", "$duoshuoProvider", function($routeProvider, $duoshuoProvider){
	$duoshuoProvider
		.setShortName("cs1707");
	$routeProvider
		.when("/", {
			templateUrl: "0.html",
			controller: AppCtrl
		})
		.when("/1", {
			templateUrl: "1.html"
		})
		.when("/2", {
			templateUrl: "2.html"
		})
}])

function AppCtrl($scope){

}


