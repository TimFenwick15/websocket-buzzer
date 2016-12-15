const express = require('express')
const app = express()
app.use(express.static('.'))
const server = require('http').createServer()


// Params
const props =  {
  guests: 3,
  votes: 0,
  ids: [],
  reset: function() {
    this.guests = 3
    this.votes = 0
    this.ids = []
  }
}


// WebSocket
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({server: server})
wss.on('connection', ws => {
    //ws.on('message', message => console.log(`got ${message}`))
    app.get('/buzz', (req, res) => {
      let voteRequired = Math.ceil(props.guests / 2)
      let message = `You've voted already!`
      if (!props.ids.includes(req.ip)) {
        message = `Vote accepted!`
        props.ids.push(req.ip)
        props.votes++
        if (props.votes >= voteRequired)
          ws.send('skip video')
      }
      res.send(`${message} ${props.votes} / ${voteRequired}`)
    })
})


// Clear voting record when notification of video change is recieved
app.get('/clear', (req, res) => {
  console.log('Got clear req')
  props.reset()
  res.send('got')
})
  

// Listen
server.on('request', app)
server.listen(1337)


