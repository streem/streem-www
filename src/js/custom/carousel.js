$(function() {
    
    $('.carousel').each(function() {
        var $carousel = $(this);
        var cid = $carousel.attr('id');
        var $pages = $carousel.find('.carousel-page');
        var currentPageIndex = 0;

        function changePage(changeAmount) {
            var pageCount = $pages.length;
            var oldPageIndex = currentPageIndex;
            
            if (pageCount <= 1) return;

            currentPageIndex += changeAmount;
            while(currentPageIndex < 0) currentPageIndex += pageCount;
            while(currentPageIndex >= $pages.length) currentPageIndex -= pageCount;

            loadPage(currentPageIndex, oldPageIndex);
        }

        function preparePageElements($page) {
            $page.find('video[data-play]').each(function() {
                this.currentTime = 0;
                this.play();
            });
        }

        function loadPage(newPage, oldPage) {
            if (oldPage >= 0 && oldPage < $pages.length) {
                $pages.eq(oldPage).stop().fadeOut(function() {
                    loadPage(newPage);
                });
            } else {

                // Find any tabs that control this and update their active state
                $('[data-carousel-control*="' + cid + '"]').removeClass('active');
                $('[data-carousel-control*="' + cid + '"][data-carousel-goto="' + newPage + '"]').addClass('active');

                var $newPage = $pages.eq(newPage);

                // Change our page and update height
                preparePageElements($newPage);
                $newPage.stop().fadeIn();
            }
        }

        $pages.hide().first().show();

        $carousel
            .on('click', '[data-carousel-next]', function() {
                changePage(+1);
                return false;
            })
            .on('click', '[data-carousel-prev]', function() {
                changePage(-1);
                return false;
            })
            
            $('body').on('click', '[data-carousel-control*="' + cid + '"][data-carousel-goto]', function() {
                var $this = $(this);
                
                var gotoPage = $this.data('carousel-goto');
                loadPage(gotoPage, currentPageIndex);
                currentPageIndex = gotoPage;
        
                return false;
            });
    })
});