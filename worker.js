var sw = self

function handle(session, port, data) {
  if (data[1] == 'self-destruct') {
    setTimeout(100, function() {
      console.log('exited')
      sw.close()
    })
  }

  console.log('number of subscriptions was ' + session.subscriptions.size)
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
  x({target: port, data: ['???', 'connected']})
  port.onmessage = x
}
