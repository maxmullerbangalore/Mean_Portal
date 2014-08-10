maxmuller.controller('LandingPageController', function($scope,$rootScope,$location){
	console.log('LandingPageController..');

	$scope.onLogout = function(){
		console.log('onLogout');
		$rootScope.isAdmin = false;
		$rootScope.isUserLoggedIn = false;
		$location.path("home");
	};

});