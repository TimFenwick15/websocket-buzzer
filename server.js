const express = require('express')
const app = express()
app.use(express.static('.'))
//app.listen(1337)
const server = require('http').createServer()


// Params
let guests, votes, ids
function reset() {
  guests = 3
  votes = 0
  ids = []
}

// WebSocket
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({server: server})
wss.on('connection', ws => {
    ws.on('message', message => console.log(`got ${message}`))
    //ws.send('some data sent from the server')

    app.get('/buzz', (req, res) => {
      console.log('Got buzz request')
      //res.send('Server recieved buzz request')

      // What is the id of this request? Have we got one before?

      // If not, count it towards the vote fraction of total guests

      // When we exceed the min...
      ws.send('Server WS response to buzz request')
      res.send('got')
    })
})


// Clear voting record when notification of video change is recieved
app.get('/clear', (req, res) => {
  console.log('Got clear request')
  reset()
  res.send('got')
})
  


// Buzz request
/*app.get('/buzz', (req, res) => {
  console.log('Got buzz request')

  res.send('Server recieved buzz request')

  wss.on('message', ws => ws.send('Server WS response to buzz request'))

})*/


// Listen
server.on('request', app)
server.listen(1337)


