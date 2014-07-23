var http  = require('../index.js').http,
io        = require('socket.io')(http),
 _        = require('underscore'),
utils     = require('../lib/utils.js'),
Hotel     = require('../lib/hotel.js')

var hotel = new Hotel(io.sockets.adapter)

io.on('connection', function(socket) {
 
  socket.on('create room', function(url) {
    //#todo: verify url
    //if url is not valid:
    //socket.emit('create room res', null) return
 
    //if url is valid:
    var roomID = utils.generateID()
    socket.emit('create room res', roomID)
    rooms.addRoom(roomID, url)
  })


  socket.on('join room', function(roomID) {
    socket.join(roomID)
  })

  socket.on('leave room', function(roomID) {
    socket.leave(roomID) 
    hotel.delEmptyRoom(roomID)
  })


  socket.on('disconnect', function() {
    //when user disconnects, if room is empty, remove it!
    console.log(socket.adapter.rooms)
    //if room empty
    //remove from io.sockets.adapter.rooms
    //remove from urls
  })


  socket.on('protocol', function(msg) {
    socket.emit('echo', msg)
  })

  socket.on('info', function() {
    console.log(io.sockets.adapter)
  })


  //use only for testing purposes.
  socket.on('test interface', function() {
    socket.emit('test res', hotel.listRooms())
  })

})

exports.io = io
