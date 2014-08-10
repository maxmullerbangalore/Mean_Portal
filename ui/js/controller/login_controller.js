maxmuller.controller('LoginController', function($http,$scope,$location,$rootScope){
	console.log('LoginController..');

	$scope.credentials = {
		userID:"",
		password:""
	};

	$scope.onLogin = function(){
		console.log('onLogin');
		console.dir($scope.credentials);
		$http({
                method: 'POST',
                url: '/rest/api/login/userLogin',
                data: $scope.credentials
        }).success(function(response){
            console.log('LoginController#onLogin#Success');
            console.log(response);
            if(response.status && response.status == 'SUCCESS') {
            	$rootScope.isAdmin = true;
				$rootScope.isUserLoggedIn = true;
				$location.path("home");	
            }
            else {
				console.log('LoginController#onLogin. Invalid Credentials');
            }
        })
        .error(function(response){
            console.log('LoginController#onLogin#Error');
        });
	};

	$scope.onCancel = function(){
		console.log('onCancel');
		$location.path("home");
	};

});