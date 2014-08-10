maxmuller.controller('SiteMgmtAnnouncement',function($scope,$http){
    console.log("sm_announcement_controller#SiteMgmtAnnouncement");

    $('#announcementEditor').summernote({
          height: 700,
          focus: true
    });

    $scope.onAnnouncementSave = function(){
        console.log("sm_announcement_controller#onAnnouncementSave");
        $scope.announcementHTML = $('#announcementEditor').code();
                                                     console.log($scope.announcementHTML);
    };
});