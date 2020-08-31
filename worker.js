function handle(session, port, data) {
  session.subscriptions[port] = true
  for (var sub of session.subscriptions) {
    sub.postMessage(data)
  }
}

function doThings() {
  var session = {subscriptions: {}}
  return function(e) {
    var port = e.target
    var data = e.data
    handle(session, port, data)
  }
}

var x = doThings()

self.onconnect = function(e) {
  var port = e.ports[0]
  port.onmessage = x
}
