maxmuller.directive('mmHtmlRender',function(){
	console.log('maxmuller#mmHtmlRender');
	return{
		restrict: 'EA',
		link: function(scope,element,attributes){
			var htmlText = attributes.contentText;
			console.log('htmlText - ' + htmlText);
			$(element).html(htmlText);
		}
    };
});