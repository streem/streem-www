$(function() {
    $('body')
        .on('click', '[data-modal-close]', function() {
            $(this).closest('.modal').fadeOut(function() { $(this).find('.animate').removeClass('reveal'); });
            return false;
        })
        .on('click', '[data-modal-show]', function() {
            $($(this).data('modal-show')).addClass('show').hide().fadeIn(function() {
                $(this).find('.animate').addClass('reveal');
            });
            return false;
        });
});
