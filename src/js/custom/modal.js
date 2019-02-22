$(function() {
    $('body')
        .on('click', '[data-modal-close]', function() {
            $(this).closest('.modal').fadeOut();
            return false;
        })
        .on('click', '[data-modal-show]', function() {
            $($(this).data('modal-show')).addClass('show').hide().fadeIn();
            return false;
        });
});
