jQuery(document).ready(function($) {
    jQuery('.group').hide();
    jQuery('#selectMe').change(function () {
        jQuery('.group').hide();
        jQuery('#'+jQuery(this).val()).show();
    })
});
