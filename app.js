$(function() {
  var eb = new vertx.EventBus('http://localhost:9090/eventbus');

  eb.onopen = function() {
    $('#status').click(function() {
      var username = $('#username').val()
      eb.send("register-user", username, function(incoming) {
        $('#login').html('<h1> . : ' + username + ' - Connected : . </h1>');

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
  });
});
