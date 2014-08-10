maxmuller.directive('summerNoteEditor',function(galleryService){
	console.log('maxmuller#summerNoteEditor');
	return{
		restrict: 'EA',
		link: function(scope,element,attributes){
			console.log('maxmuller#summerNoteEditor#');
			// Summer Note Text Editor
			$(element).summernote({
                      height: attributes.editorHeight,
                      focus: attributes.editorFocus
            });
		}
    };
});