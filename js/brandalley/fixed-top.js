jQuery(document).ready(function($) {
	jQuery('input').focus(function() {
		jQuery('#header.header').addClass('active');
		jQuery('#wrapper').addClass('active');
	})
	jQuery('input').blur(function() {
		jQuery('#header.header').removeClass('active');
		jQuery('#wrapper').removeClass('active');
	})
});