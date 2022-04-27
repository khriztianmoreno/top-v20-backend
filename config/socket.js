const socketio = require('socket.io');

const socket = {};

function connectSocket(server) {
  const options = {
    cors: {
      origin: true,
    },
  };
  const io = socketio(server, options);

  socket.io = io;
}

module.exports = {
  connectSocket,
  socket,
};
