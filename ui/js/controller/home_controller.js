maxmuller.controller('HomePageController',function($scope,homePageService){
	console.log("HomePageController");

	// change carousel image every 5s
	$scope.carouselInterval = 5000;

	// Initialize to empty array
    $scope.carouselList = [];

	var carousels = homePageService.getCarouselList();
	carousels.then(function(data){
		console.log("CarouselGridController#getCarouselList#then");
		console.dir(data);
		$scope.carouselList = data;
	});


});
