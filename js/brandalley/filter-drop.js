jQuery(document).ready(function($) {
		  jQuery("button").click(function(){
			//get collapse content selector
			var collapse_content_selector = jQuery(this).attr('href');					
 
			//make the collapse content to be shown or hides
			var toggle_switch = jQuery(this);
			jQuery(collapse_content_selector).slideToggle(function(){
			  if(jQuery(this).css('display')=='none'){
				jQuery("button").removeClass("open");
			  }else{
				jQuery("button").addClass("open");
			  }
			});
		  });
 
		});	