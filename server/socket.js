var url = require('url');

module.exports = (io, db) => {

  io.on('connection', (socketOld) => {

    var ns = url.parse(socketOld.handshake.url, true).query.ns;

    // console.log('nsps: ', Object.keys(io.nsps))
    const exists = Object.keys(io.nsps).some(nsp => nsp === '/' + ns)

    if (!exists) {
      io.of(ns).on('connection', (socket) => {
        console.log(`User ${socket.id.split('#')[1]} connected to ${ns}`);

        socket.on('disconnect', () => {
          console.log(`User ${socket.id.split('#')[1]} disconnected`);
        });

        socket.on('chat-message', (msg) => {
          console.log(`User ${socket.id.split('#')[1]}(${msg.user}) sent: ${msg.message} to: ${ns}`);

          const today = new Date();
          const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date + ' ' + time;

          const log = {
            chatName: ns,
            user: msg.user,
            message: msg.message,
            time: dateTime
          }

          const collection = db.collection('chat');
          collection.insertOne(log, (err, dbres) => {

            if (err) throw err;
            console.log(`Successfully added message by "${log.user}" to "${log.chatName}"`);
            let num = dbres.insertedCount;
          })

          socket.emit('chat-message', msg);
          socket.broadcast.emit('chat-message', msg);
        });
      });
    }
  });
}