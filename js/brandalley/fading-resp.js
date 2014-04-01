jQuery.fn.scrollBottom = function () {
	return jQuery(document).height() - this.scrollTop() - this.height();
};
jQuery(document).bind("scroll", function() {
    var scrolly = jQuery(window).scrollBottom();
    var height = jQuery(document).height() - jQuery(window).height();
     jQuery("#full-screen-background-image").css("opacity", scrolly / height +0);
});