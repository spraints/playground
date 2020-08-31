var sw = self

function handle(session, port, data) {
  if (data[1] == 'self-destruct') {
    setTimeout(100, function() { sw.close() })
  }

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

sw.onconnect = function(e) {
  var port = e.ports[0]
  port.onmessage = x
}
