def server = vertx.createHttpServer()

server.requestHandler { req ->
  if (req.uri == '/') {
    req.response.sendFile('index.html')
  }
  if (req.uri == '/vertxbus.js') req.response.sendFile('vertxbus.js')
  if (req.uri == '/jquery.js') req.response.sendFile('bower_components/jquery/jquery.js')
  if (req.uri == '/sockjs.js') req.response.sendFile('bower_components/sockjs/sockjs.js')
}

vertx.createSockJSServer(server).bridge(prefix: '/eventbus', [[:]], [[:]])

def eb = vertx.eventBus
eb.registerHandler("register-user") { message ->
  eb.publish("new-connection", message.body)
}

server.listen(9090)
