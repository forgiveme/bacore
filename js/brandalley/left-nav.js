jQuery(document).ready(function($) {
  jQuery("#leftnav > li > a").on("click", function(e){
    if(jQuery(this).parent().has("ul")) {
      e.preventDefault();
    }
    
	if(jQuery(this).hasClass("nullos")) {
		 jQuery('.nullos').removeClass("open");	
		 jQuery('.nullos').unbind('click');
    }
	
    if(!jQuery(this).hasClass("open")) {
      // hide any open menus and remove all other classes
      jQuery("#leftnav li ul").slideUp(350);
      jQuery("#leftnav li a").removeClass("open");
      
      // open our new menu and add the open class
      jQuery(this).next("ul").slideDown(350);
      jQuery(this).addClass("open");
    }
    
    else if(jQuery(this).hasClass("open")) {
      jQuery(this).removeClass("open");
      jQuery(this).next("ul").slideUp(350);
    }
  });
});