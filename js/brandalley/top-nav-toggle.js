jQuery(document).ready(function($) {
	jQuery( "#nav li" ).bind('mouseenter', function(){
		if(jQuery(".add-nav li").hasClass('active'))
		{
			jQuery(".add-nav li").removeClass('active');
		}
		jQuery(".add-nav .drop").attr("style", "display:none");
		jQuery(".add-nav .drop").addClass("js-slide-hidden");
	});
});
