jQuery(document).ready(function($) {
jQuery('.targetDiv').hide();
jQuery('.targetDiv').first().show();
jQuery('.showSingle').first().addClass('selected');
jQuery('.showSingle').click(function () {
    jQuery('.targetDiv').hide();
    jQuery('.showSingle').removeClass('selected');
    jQuery('#div' + jQuery(this).attr('target')).show();
    jQuery(this).addClass('selected');
});
});

jQuery(document).ready(function($) {
    jQuery('.slideshowabout').cycle({
		fx:     'fade', 
		speed:   300, 
		timeout: 2000, 
		next:   '.slideshowabout', 
		pause:   1 
	});
});