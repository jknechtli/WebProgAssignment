
module.exports = (io) => {
  // let sockets = [];

  io.on('connection', (socket) => {
    // sockets.push(socket);

    console.log(`User ${socket.id} connected`);

    socket.on('disconnect', () => {
      // sockets = sockets.filter(x => x != socket);
      console.log(`User ${socket.id} disconnected`);
    });

    socket.on('chat-message', (msg) => {
      console.log(`User ${socket.id} sent: ${msg}`);
      // for (let socket of sockets) {
      socket.emit('chat-message', msg);
      socket.broadcast.emit('chat-message', msg);
      // }
    });
  });
}