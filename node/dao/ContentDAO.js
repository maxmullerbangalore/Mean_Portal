// mongojs driver
var mongojs = require('mongojs');
// mongodb connection uri
var mongoDBConnURI = null;

// set the DB connection
exports.setDBConnection = function(connectionURI){
    console.log("GalleryDAO#setDBConnection URI - " + connectionURI);
    mongoDBConnURI = connectionURI;
    contentCollection = mongojs.connect(mongoDBConnURI,["Contents"]);
};

// Get the list of Sections. For now its hard coded
exports.getSections = function(successCB,failureCB){
    console.log("ContentDAO#getSections");
    // Find the list of all sections
    var sections = [
        {
            _id:1,
            sectionName:'About Us'
        },{
            _id:2,
            sectionName:'Announcements'
        },{
            _id:3,
            sectionName:'Facilities'
        },{
            _id:4,
            sectionName:'Events'
        },{
            _id:5,
            sectionName:'Achievements'
        },{
            _id:6,
            sectionName:'Schedule'
        }
    ];
    console.log("GalleryDAO#getSections Sections - " + sections);
    successCB(sections);
};

exports.getContentList = function(sectionID,successCB,failureCB){
    console.log("ContentDAO#getContentList Section ID = " + sectionID);
    contentCollection.Contents.find({section_id:sectionID},function(error,contentList){
        if(error) {
            console.log("ContentDAO#getContentList.Error when fetching the list of contents");
            console.log("ContentDAO#getContentList.Error Details - " + error);
            failureCB(error);
        }
        else if (!contentList) {
            console.log("ContentDAO#getContentList.No Contents exists in DB");
            successCB(null);
        }
        else {
            successCB(contentList);
        }
    });
};

// Get Sorted Content List
exports.getSortedContentList = function(sectionID,successCB,failureCB){
    console.log("ContentDAO#getSortedContentList Section ID = " + sectionID);
    contentCollection.Contents.find({section_id:sectionID}).sort({createdDate:1},function(error,contentList){
        if(error) {
            console.log("ContentDAO#getContentList.Error when fetching the list of contents");
            console.log("ContentDAO#getContentList.Error Details - " + error);
            failureCB(error);
        }
        else if (!contentList) {
            console.log("ContentDAO#getContentList.No Contents exists in DB");
            successCB(null);
        }
        else {
            successCB(contentList);
        }
    });
};


// Get Content Details
exports.getContentDetails = function(contentID,successCB,failureCB){
    console.log("ContentDAO#getContentDetails Content ID = " + contentID);
    contentCollection.Contents.find({_id:mongojs.ObjectId(contentID)},function(error,content){
        if(error) {
            console.log("ContentDAO#getContentDetails.Error when fetching the content details");
            console.log("ContentDAO#getContentDetails.Error Details - " + error);
            failureCB(error);
        }
        else if (!content) {
            console.log("ContentDAO#getContentDetails.No Content Details exists in DB");
            successCB(null);
        }
        else {
            successCB(content);
        }
    });
};

// Delete Content
exports.deleteContent = function(contentID,successCB,failureCB) {
    console.log("ContentDAO#deleteContent ID - " + contentID);
    // Delete the Album_Images
    contentCollection.Contents.remove({_id:mongojs.ObjectId(contentID)},function(error){
        if(error) {
            console.log("GalleryDAO#deleteContent.Error while deleting the Content");
            failureCB(error);
        }
        else {
            successCB();
        }
    });
};

// Update Content
exports.updateContent = function(contentID,updatedContentJSON,successCB,failureCB) {
    console.log("ContentDAO#updateContent ID - " + contentID);
    contentCollection.Contents.update({_id:mongojs.ObjectId(contentID)},updatedContentJSON,function(error,updatedDoc){
        if(error){
            console.log("ContentDAO#updateContent.Error when saving the content");
            console.log("ContentDAO#updateContent.Error Details - " + error);
            failureCB(error);
        }
        else if (!updatedDoc) {
            console.log("ContentDAO#updateContent.Unable to update");
            successCB(null);
        }
        else {
            successCB(updatedDoc);
        }
    });
};

// Save Content
exports.saveContent = function(saveContentJSON,successCB,failureCB) {
    console.log("ContentDAO#saveContent - " + saveContentJSON);
    contentCollection.Contents.save(saveContentJSON,function(error,savedDoc){
        if(error){
            console.log("ContentDAO#saveContent.Error when saving the content");
            console.log("ContentDAO#saveContent.Error Details - " + error);
            failureCB(error);
        }
        else if (!savedDoc) {
            console.log("ContentDAO#saveContent.Unable to save");
            successCB(null);
        }
        else {
            successCB(savedDoc);
        }
    });
};