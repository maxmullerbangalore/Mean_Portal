maxmuller.factory('homePageService', function($http) {
    console.log("homePageService");
    return {
        getCarouselList: function(){
            console.log("getCarouselList");
            var promise = $http.get('/rest/api/home/carousels').then(function(response){
                console.log("/rest/api/home/carousels");
            	return response.data;
            });
            return promise;
        }
    };
});