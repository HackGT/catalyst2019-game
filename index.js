const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000
const frequency = 1.5 * 1000
const displayRoom = 'displayRoom'

app.use(express.static('public'))
server.listen(port);

// make some action map
var voteMap = {}
var count = 0
function initializeMap() {
    voteMap = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    }
}
initializeMap()


console.log("Server running at localhost:" + port)

// function called whenever a new client connects – socket refers to the
// individual that has connected
io.on('connection', function(socket) {
    console.log('new connect')
    // let the client know we're ready for them
    socket.emit('ready')

    // display screen will send us this socket command, and we'll know to forward them data
    socket.on('displayScreen', function(data) {
        socket.join(displayRoom)
    })

    socket.on('command', function(data) {
        console.log(data)
        var direction = data.direction
        console.log(direction)
        if (direction in voteMap) {
            voteMap[direction]++
            count++
        }
        if (count == 5) {
            executeModeAction()
        }

        // handle command sent from client
        // ensure they can't spam commands, both on frontend and backend
        // note, you can manage the state of a given client by
        // playing with the `socket` variable's parameters
        // for example: socket.sentInput = true
    })
})


function findMode() {
    var modeKey = "left"
    var totalVote = 0
    for (var key in voteMap) {
        totalVote += voteMap[key]
        if (voteMap[key] > voteMap[modeKey]) {
            modeKey = key
        }
    }
    return (totalVote == 0) ? null : modeKey
}
function executeModeAction() {
    // todo, get mode action
    // also clear mode action
    var mode = findMode()
    count = 0
    if (mode != null) {
        initializeMap()
        io.to(displayRoom).emit('displayUpdate', {
            /* data here */
            direction: mode
        })
    }
    io.emit('resetTurn')
}

// setInterval(executeModeAction, frequency)
