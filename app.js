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

      });
    });
  }

  $('#users').on('click', 'li', function() {
    $('#control').css('display', 'block');

    // eb.send('register-chat', $(this).text());
  });

  $('#sendMessage').click(function() {
    eb.send('chat-message', $('#message').val());
  });

});
