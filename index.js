const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000
const frequency = 2 * 1000
const displayRoom = 'displayRoom'

app.use(express.static('public'))
server.listen(port);

// make some action map

console.log("Server running at localhost:" + port)

// function called whenever a new client connects – socket refers to the
// individual that has connected
io.on('connection', function(socket) {
    // let the client know we're ready for them
    socket.emit('ready')

    // display screen will send us this socket command, and we'll know to forward them data
    socket.on('displayScreen', function(data) {
        socket.join(displayRoom)
    })

    socket.on('command', function(data) {
        // handle command sent from client
        // ensure they can't spam commands, both on frontend and backend
        // note, you can manage the state of a given client by
        // playing with the `socket` variable's parameters
        // for example: socket.sentInput = true
    })
})

function executeModeAction() {
    // todo, get mode action
    // also clear mode action

    io.to(displayRoom).emit('displayUpdate', {
        /* data here */
    })

    io.emit('resetTurn')
}

setInterval(executeModeAction, frequency)