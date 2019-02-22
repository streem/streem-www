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
        var $active = $tabs.find('.tab.active');//.next('.tab').addClass('ac')

        $active.removeClass('active');
        $active.next('.tab').click();
        
        return false;
    });
});