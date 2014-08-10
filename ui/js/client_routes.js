var ClientRoutes = function($routeProvider,$locationProvider){
	console.log('client_routes.js');
	$routeProvider
	    .when('/site_mgmt_list_carousel',{
            templateUrl: 'views/admin/site_mgmt_home_screen_main.html'
        })
		.when('/site_mgmt_add_carousel',{
			templateUrl: 'views/admin/site_mgmt_home_screen_add_carousel.html'
		})
		.when('/site_mgmt_add_announcement',{
            templateUrl: 'views/admin/site_mgmt_add_announcement.html'
        })
        .when('/home',{
            templateUrl: 'views/home.html'
        })
        .when('/gallery',{
            templateUrl: 'views/gallery.html'
        })
        .when('/site_mgmt_gallery',{
            templateUrl: 'views/admin/site_mgmt_gallery_main.html'
        })
        .when('/site_mgmt_content_mgmt',{
            templateUrl: 'views/admin/site_mgmt_content_mgmt.html'
        })
        .when('/about_us',{
            templateUrl: 'views/about_us.html'
        })
        .when('/login',{
            templateUrl: 'views/login.html'
        })
		.otherwise({
      		redirectTo: '/'
    	});
	$locationProvider.html5Mode(true);
};