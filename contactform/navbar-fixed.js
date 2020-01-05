class StickyNavigation {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = $('.sticky-tabs-container').height();
        $('.sticky-tabs-container').css("height", this.tabContainerHeight + 'px');
        let self = this;
        $('.sticky-tab').click(function() {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => {
            this.onScroll();
        });
        $(window).resize(() => {
            this.onResize();
        });
    }
    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        if (!$('.sticky-tabs-container').hasClass('sticky-tabs-container--top')) {
            scrollTop = scrollTop - this.tabContainerHeight;
        }
        $('html, body').animate({
            scrollTop: scrollTop
        }, 600);
    }
    onResize() {
        this.addInlineHeight();
    }
    addInlineHeight() {
        var newHeight = $('.sticky-tabs-container').height() + 'px';
        $('.sticky-tabs-container').css("height", newHeight);
    }
    onScroll() {
        this.checkTabContainerPosition();
        this.updateSecondaryNavigation();
    }
    checkTabContainerPosition() {
        let offset = $('.sticky-tabs').offset().top + $('.sticky-tabs').height() - this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $('.sticky-tabs-container').addClass('sticky-tabs-container--top');
        } else {
            $('.sticky-tabs-container').removeClass('sticky-tabs-container--top');
        }
    }
    updateSecondaryNavigation() {
        var tabContainerHeight = this.tabContainerHeight;
        $('html, section').each(function() {
            var actual = $(this),
                actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
                actualAnchor = $('.sticky-tabs').find('a[href="#' + actual.attr('id') + '"]');
            if ((actual.offset().top - tabContainerHeight <= $(window).scrollTop()) && (actual.offset().top + actualHeight - tabContainerHeight > $(window).scrollTop())) {
                actualAnchor.addClass('active');
            } else {
                actualAnchor.removeClass('active');
            }
        });
    }
}
new StickyNavigation();

$('#year').html(new Date().getFullYear());