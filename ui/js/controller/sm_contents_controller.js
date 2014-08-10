maxmuller.controller('SiteMgmtContents',function($scope,contentService){
    console.log("SiteMgmtContents..");
    $scope.sectionList = [];
    $scope.contentList = [];
    $scope.selectedSection = 'Select Section';
    $scope.sectionID='';

    $scope.isSave = true;
    $scope.isUpdate = false;

    $scope.selectedContent = {};

    // Get the list of sections
    var sections = contentService.getSectionList();
    sections.then(function(data){
        console.log("No of sections returned - " + data.length);
        console.dir(data);
        $scope.sectionList = data;
    });

    $scope.onDropDownChange = function(element) {
        console.log("SiteMgmtContents#onDropDownChange");
        $scope.sectionID = element.selectedSection;
        // get the list of contents for the section id
        var contents = contentService.getContentList($scope.sectionID);
        contents.then(function(data){
            console.log("No of contents returned - " + data.length);
            console.dir(data);
            $scope.contentList = data;
        });        
    };

    // Save the Content
    $scope.onContentSave = function(){
        console.log("SiteMgmtContents#onContentSave");
        if($scope.sectionID < 1) {
            alert('select section');
            return false;
        }
        $scope.contentHTML = $('#contentMgmtEditor').code();
        console.log($scope.contentHTML);
        var contentJSON = {
            sectionID:$scope.sectionID,
            contentText:$scope.contentHTML
        };
        $scope.contentList = contentService.saveContent(contentJSON);
        console.dir($scope.contentList);
    };

    // Update the Content
    $scope.onContentUpdate = function(){
        console.log("SiteMgmtContents#onContentUpdate");
        if($scope.sectionID < 1) {
            alert('select section');
            return false;
        }
        $scope.contentHTML = $('#contentMgmtEditor').code();
        console.log($scope.contentHTML);
        var contentJSON = {
            section_id:$scope.selectedContent.entity.section_id,
            content_html:$scope.contentHTML,
            createdDate:$scope.selectedContent.entity.createdDate,
            updatedDate:new Date()
        };
        var contentID = $scope.selectedContent.entity._id;
        console.dir(contentJSON);
        $scope.contentList = contentService.updateContent(contentID,contentJSON);
        console.dir($scope.contentList);
        $scope.isSave = true;
        $scope.isUpdate = false;
    };    

    // Display the contents on Edit
    $scope.onContentEdit = function(selectedRow){
        console.log("SiteMgmtContents#onContentEdit");
        console.dir(selectedRow);
        // console.log('HTML - ' + selectedRow.entity.content_html);
        console.log('HTML - ' + selectedRow.entity._id);
        $('#contentMgmtEditor').code(selectedRow.entity.content_html);
        $scope.isSave = false;
        $scope.isUpdate = true;
        $scope.selectedContent = selectedRow;
    };

    // Content Delete
    $scope.onContentDelete = function(selectedRow){
        console.log("SiteMgmtContents#onContentDelete");
        var selectedContent = selectedRow.entity._id;
        var isDeleted = contentService.deleteContent(selectedContent);
        isDeleted.then(function(){
            // Retrieve the list of contents & update the grid
            var contents = contentService.getContentList($scope.sectionID);
            contents.then(function(data){
                console.log("No of contents returned - " + data.length);
                console.dir(data);
                $scope.contentList = data;

                // Reset editor
                $scope.isSave = true;
                $scope.isUpdate = false;
                $('#contentMgmtEditor').code("");
            });    
        });
    };

    // Grid displaying the list of contents
    $scope.contentGridOptions={
        data:'contentList',
        rowHeight:50,
        columnDefs: [
            {field:'createdDate', displayName:'Created On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'createdDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'updatedDate', displayName:'Updated On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'updatedDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'content_html', displayName:'Contents',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span class="contentEllipses">{{row.getProperty(\'content_html\')}}</span></div>'},
            {field:'edit', displayName:'Edit',width:50,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="onContentEdit(row)"></i></a></div>'},
            {field:'delete', displayName:'Delete',width:50,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onContentDelete(row)"></i></a></div>'}
        ],
        multiSelect: false,
        enableRowSelection:false,
        selectedItems: []
    };

});