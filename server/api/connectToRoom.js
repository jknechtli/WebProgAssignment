
module.exports = (io, app, addNamespace, namespaces) => {
  // let sockets = [];
  app.get('/api/connect/:group/:channel', (req, res) => {

    const group = req.params.group;
    const channel = req.params.channel;

    const room = `${group}:${channel}`;

    const nsp = io.of(room);

    nsp.on('connection', (socket) => {
      // sockets.push(socket);

      console.log(`User ${socket.id} connected to room: ${room}`);

      socket.on('disconnect', () => {
        // sockets = sockets.filter(x => x != socket);
        console.log(`User ${socket.id} disconnected from room: ${room}`);
      });

      socket.on('chat-message', (msg) => {
        console.log(`User ${socket.id} sent: ${msg}`);
        // for (let socket of sockets) {
        socket.emit('chat-message', msg);
        socket.broadcast.emit('chat-message', msg);
        // }
      });
    });

    res.send({ ok: true });

    addNamespace(nsp);
  });
}