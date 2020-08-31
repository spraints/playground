function handle(session, port, data) {
  session.subscriptions.set(port, true)
  for (var sub of session.subscriptions.keys()) {
    sub.postMessage(data)
  }
}

function doThings() {
  var session = {subscriptions: new Map()}
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
