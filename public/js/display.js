var socket = io()

socket.on('ready', function(data) {
  // we've established a connection with the server
  socket.emit('displayScreen')
})

socket.on('displayUpdate', function(data) {
    console.log('display update')
})