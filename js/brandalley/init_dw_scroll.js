function init_dw_Scroll() {
    // arguments: id of scroll area div, id of content div
    var wndo = new dw_scrollObj('wn', 'lyr1');
    // args: id, axis ('v' or 'h'), eType (event type for arrows), 
    // bScrollbar (include track and dragBar? true or false)
    wndo.buildScrollControls('scrollbar', 'v', 'mouseover', true);
}
// if code supported, link in the style sheet (optional) and call the init function onload
// also check that the lyr1 div is on the page to suppress errors
if ( dw_scrollObj.isSupported() && document.getElementById("lyr1") ) {
    dw_Event.add( window, 'load', init_dw_Scroll);
}