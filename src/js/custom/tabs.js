$(function() {
    $(document).on('click', '.tab', function() {
        var $this = $(this);
        var $wrapper = $this.closest('.tabs');

        var $active = $wrapper.find('.tab.active');
        if ($active[0] == this) return false;

        // TODO: fade out old content
        // TODO: show new content

        $active.removeClass('active');
        $this.addClass('active');

        //$($(this).data('selector'))
        return false;
    });

    $(document).on('click', '[data-tab-next]', function() {
        var $tabs = $(this.getAttribute('data-tab-next'));
        var $active = $tabs.find('.tab.active');

        $active.removeClass('active');
        
        var $next = $active.next('.tab');
        if ($next.length === 0) $next = $active.closest('.tabs').find('.tab:first-child');
        $next.click();
        
        return false;
    });
});