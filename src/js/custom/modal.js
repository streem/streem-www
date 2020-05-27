(function() {
    var html = document.getElementsByTagName('html')[0];
    var locked = false;
    var offsetMemory = 0;

    window.showModal = function($modal) {
        $modal.addClass('show').hide().fadeIn(function() {
            $(this).find('.animate').addClass('reveal');

            if (locked) return;

            html.style.overflowY = 'hidden';
            offsetMemory = window.pageYOffset || document.documentElement.scrollTop;
            locked = true;
        });
    }

    window.closeModal = function($modal) {
        $modal.fadeOut(function() { 
            $(this).find('.animate').removeClass('reveal'); 
        });

        html.style.overflowY = 'auto';
        locked = false;

        setTimeout(function() {
            window.scrollTo(0, offsetMemory);
        }, 10);
    }

})();



$(function() {

    

    $('body')
        .on('click', '[data-modal-close]', function() {
            closeModal($(this).closest('.modal'));
            return false;
        })
        .on('click', '[data-modal-show]', function() {
            showModal($($(this).data('modal-show')));
            return false;
        });

    $('.modal[data-show]').each(function() {
        showModal($(this));
    })
});
