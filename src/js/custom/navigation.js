(function() {
    var pinThreshold = 10;
    var isNavPinned = false;

    function refreshPinState() {
        var y = window.scrollY;
        if (y > pinThreshold && !isNavPinned) {
            isNavPinned = true;
            $('header').addClass('pin');
        } else if (y < pinThreshold && isNavPinned) {
            $('header').removeClass('pin');
            isNavPinned = false;
        }
    }

    if ($('header').hasClass('pin') == false) {
        window.addEventListener('scroll', refreshPinState);
        refreshPinState();
    }

    var isMobileMenuSetup = false;
    var mobileNavOpen = false;
    $('.nav-toggle').click(function() {

        // Perform our first time setup to create our mobile navigation since someone wants to open
        // it for display.
        if (isMobileMenuSetup === false) {
            isMobileMenuSetup = true;
            $('<div class="mobile-nav"></div>').prependTo('body').append($('header nav')).hide();
        }

        mobileNavOpen = !mobileNavOpen;
        $(this).toggleClass('active', mobileNavOpen);
        $('.mobile-nav').toggleClass('open', mobileNavOpen);
        $('header').toggleClass('open', mobileNavOpen);

        if (mobileNavOpen) {
            $('.mobile-nav').stop().fadeIn();
        } else {
            $('.mobile-nav').stop().fadeOut();
        }
    });

    $('.intercom-launcher').on('click', function() {
        Intercom('show');
        return false;
    });
})();