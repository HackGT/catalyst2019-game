var socket = io()

socket.on('ready', function(data) {
  // we've established a connection with the server
})

function handleInput(someArgs) {
  socket.emit('command', {
    // put command data from input here
  })
}

socket.on('resetTurn', function() {
  // clear state, etc. to allow input again
  console.log("reset turn")
})