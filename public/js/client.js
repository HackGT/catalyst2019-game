var socket = io()
var buttons = document.getElementsByTagName('button')
for (var i = 0; i <buttons.length; i++) {
    buttons[i].onclick = vote
}
socket.on('ready', function(data) {
  // we've established a connection with the server
})

function handleInput(voteDirection) {
  socket.emit('command', {
    direction: voteDirection
  })
}

function vote(event) {
    var button = event.target
    var voteDirection = button.id
    setButtonStatus(true)

    handleInput(voteDirection)
}
function setButtonStatus(isDisabled) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = isDisabled
    }
}
socket.on('resetTurn', function() {
  // clear state, etc. to allow input again
  console.log("reset turn")
  setButtonStatus(false)
})
