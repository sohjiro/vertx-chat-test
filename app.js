$(function() {
  var eb = new vertx.EventBus('http://localhost:9090/eventbus');

  eb.onopen = function() {
    $('#status').click(function() {
      eb.send("register-user", $('#username').val(), function(incoming) {
        $('#login').css('display', 'none');
        $('#logged').html('<h1> . : ' + $('#username').val() + ' - Connected : . </h1>');

        $.each(incoming.users, function() {
          $('#users').append('<li>' + this + '</li>');
        });

        eb.registerHandler('new-presence', function(message) {
          $('#users').append('<li>' + message + '</li>');
        });

        eb.registerHandler($('#username').val(), function(data) {
          if($('div#' + data.from).length == 0) {
            var windowMessages = $('#original').clone().attr('id', data.from).css('display', 'block');
            $('#window').append(windowMessages);
          }

          $('#' + data.from + ' .messages').append('<p>' + data.from + ' : ' +  data.message + '</p>');
        });

      });
    });
  }

  $('#users').on('click', 'li', function() {
    var windowMessages = $('#original').clone().attr('id', $(this).text()).css('display', 'block');
    $('#window').append(windowMessages);
  });

  $('#window').on('click', 'button', function() {
    var messageTo = $(this).parent().attr('id');
    eb.send('chat-message', {
      from : $('#username').val(),
      message : $(this).siblings().filter('input').val(),
      to : messageTo
    }, function(data) {
      $('#' + messageTo + ' .messages').append('<p>' + data.from + ' : ' +  data.message + '</p>');
    });
  });

});
