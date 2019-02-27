$(function() {
    var options = {};
    if (location.search.length > 0) {
        var params = location.search.substr(1).split('&');
        for(var i = 0; i < params.length; i++) {
            var tokens = params[i].split('=');
            if (tokens.length !== 2) continue;
            options[tokens[0]] = tokens[1];
        }
    }

    if (options.submit === 'true') {
        showModal($('#modal-request-received'));
    }

    if (window.location.href.indexOf('submit=') === -1) {
        var connector = window.location.href.indexOf('?') == -1 ? '?' : '&';
        $('#retURL').val(window.location.href + connector + 'submit=true');
    }
});