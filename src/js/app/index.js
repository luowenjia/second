require(['jquery', 'handlebars'], function($, handle) {
    $.ajax({
        url: '/api/buy',
        dataType: 'json',
        success: function(data) {
            var source = $('#handle').html();
            var template = handle.compile(source);
            var html = template(data);
            $('.wrap').html(html)
        }
    })
})