maxmuller.controller('AboutUsController',function($scope,contentService){
	console.log('AboutUsController');
	
	$scope.contentList = [];

	// Get the list of contents ordered by Date
	var contents = contentService.getSortedContentList(1);
	contents.then(function(data){
        console.log("No of contents returned - " + data.length);
        $scope.contentList = data;
    });
});