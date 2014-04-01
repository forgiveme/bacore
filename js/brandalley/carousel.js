var $j = jQuery.noConflict();

(function( $j ){
    var $this;  
    var options;
    var numOfSlides;
    var autoSlideshow = true;
    var methods = {
        init : function(data) {
            options = data;
            $this = $j(this).find('div:first');
            numOfSlides = $j(this).find('li').length;
            if(numOfSlides <= 1){
                $j(this).find('.arrow').remove();
                $j(this).css({
                    height : $j(this).parent().height(),
                    width  : $j(this).parent().width()
                });                
            } else {
                
                $j(this).find('._left').on('click', function(){
                    methods.moveLeft();
                });

                $j(this).find('._right').on('click', function(){
                    methods.moveRight();
                });
                
                var timeoutId;
                $j(this).mouseover(
                    function(){
                        clearTimeout(timeoutId);
                        $j(this).find('.arrow').fadeIn('fast');
                        autoSlideshow=false;
                    })
                  $j(this).mouseleave(  function(){
                        $j(this).find('.arrow').fadeOut('slow');
                        timeoutId = setTimeout(function(){autoSlideshow=true;}, options.autoScrollInterval * 2);                        
                    }
                );                 
            }                                    
               
            $this.css({
                width : ($j(this).find('li').length+2) * options.width,
                marginLeft : 0
            });
            $this.find('ul li img').css({
                height : options.height,
                width  : options.width
            });      
            
            if(numOfSlides == 2){
                $this.find('ul').append($this.find('li').clone());
            }                       
            
            if(options.auto == true && numOfSlides > 1){
                methods.autoScroll();
            }
        },
        moveLeft : function(){
     
			
			
			
			 var li = $this.find('li:last').clone();          
            $this.find('li:last').remove();
            li.find('img').css({opacity : 0});
            $this.find('ul').prepend(li);
            li.find('img').animate({
                opacity : 1
            }, options.throttle);
			
			
        },
        moveRight : function(){        
                  var li = $this.find('li:first');
            var liClone = li.clone();
            li.find('img').animate({
                opacity : 0 
            }, options.throttle, function(){
                $this.find('ul').append(liClone);
                li.remove();
            });
        },
        autoScroll : function(){
            if(autoSlideshow == true){
                methods.moveRight();
            }
            setTimeout(methods.autoScroll, options.autoScrollInterval);
        }
    };
    $j.fn.baSlideshow = function( method ) {    
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $j.error( 'Method ' +  method + ' does not exist on jQuery.baSlideshow' );
        }      
    };
})( jQuery );