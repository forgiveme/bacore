jQuery(document).ready(function($) {
    // This will fire when document is ready:
    jQuery(window).resize(function() {
        // This will fire each time the window is resized:
        if(jQuery(window).width() < 600) {
            // if larger or equal
            jQuery('.holder.top').remove();
        } 
    }).resize(); // This will simulate a resize to trigger the initial run.
});