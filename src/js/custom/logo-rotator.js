$(function() {
    var logosPerPage = 4;
    var staggerDelay = 400;
    var pageDelay = 6000;
    var duration = 500;

    // Find all of our auto-rotating logo lists on the page
    $('.logo-list.auto-rotate').each(function() {
        var $list = $(this);
        var $logos = $list.find('.logo-wrapper');

        var currentPage = 0;
        var pageCount = Math.ceil($logos.length / logosPerPage);

        function showCurrentPage() {
            // Make sure all current logos are hidden
            $logos.hide();

            // Figure out which logos to show
            var start = currentPage * logosPerPage;
            for(var i = 0; i < logosPerPage; i++) {
                var index = start + i;

                $logos.eq(index).css('opacity', 0).show().stop().delay(staggerDelay * i).animate({ opacity: 1 }, duration);
            }
        }

        function hideCurrentPage(callback) {
            var start = currentPage * logosPerPage;
            var logosOnPage = Math.min($logos.length - start, logosPerPage);

            var finishCount = 0;


            for(var i = 0; i < logosOnPage; i++) {
                var index = start + i;

                $logos.eq(index).stop().delay(staggerDelay * i).animate(
                    { opacity: 0 }, 
                    {
                        duration: duration,
                        complete: function() {
                            if (++finishCount == logosOnPage) {
                                callback();
                            }
                        }
                    });
            }
        }

        showCurrentPage();

        setInterval(function() {
            hideCurrentPage(function() {
                if (++currentPage >= pageCount) currentPage = 0;
                showCurrentPage();
            });
        }, pageDelay);
    });
});