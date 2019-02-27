window.showModal = function($modal) {
    $modal.addClass('show').hide().fadeIn(function() {
        $(this).find('.animate').addClass('reveal');
    });
}

$(function() {
    $('body')
        .on('click', '[data-modal-close]', function() {
            $(this).closest('.modal').fadeOut(function() { $(this).find('.animate').removeClass('reveal'); });
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
