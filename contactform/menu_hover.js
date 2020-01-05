$(function(){
    function is_touch_device() {
        return 'ontouchstart' in window        // works on most browsers
            || navigator.maxTouchPoints;       // works on IE10/11 and Surface
    };

    if(!is_touch_device() && $('.navbar-toggle:hidden')){
        $('.dropdown-menu', this).css('margin-top',0);
        $('.dropdown').hover(function(){
            $('.dropdown-toggle', this).trigger('click').toggleClass("disabled");
        });
    }
});