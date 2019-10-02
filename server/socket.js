var url = require('url');
module.exports = (io, db) => {
  // let sockets = [];

  io.on('connection', (socketOld) => {
    // sockets.push(socket);

    var ns = url.parse(socketOld.handshake.url, true).query.ns;

    // console.log('nsps: ', Object.keys(io.nsps))
    const exists = Object.keys(io.nsps).some(nsp => nsp === '/' + ns)
    if (!exists) {
      io.of(ns).on('connection', (socket) => {

        console.log(`User ${socket.id.split('#')[1]} connected to ${ns}`);
        // console.log('nameSpace :', ns)
        // fire event when socket connecting
        // ev.emit('socket.connection route.'+routeName, socket);
        // console.log('hit');

        // @todo: add more if needed
        // on('message') -> ev.emit(...)


        // socket.on('connectRoom', (newRoom) => {
        //   console.log(`User ${socket.id.split('#')[1]} joined ${newRoom}`);
        //   socket.join(newRoom);
        //   room = newRoom;
        // })

        socket.on('disconnect', () => {
          // sockets = sockets.filter(x => x != socket);
          // socket.leave(room);
          console.log(`User ${socket.id.split('#')[1]} disconnected`);
        });

        socket.on('chat-message', (msg) => {
          console.log(`User ${socket.id.split('#')[1]}(${msg.user}) sent: ${msg.message} to: ${ns}`);
          // for (let socket of sockets) {
          // console.log

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
            console.log(`Successfully added: "${log.message}" by "${log.user}" to "${log.chatName}"`);
            let num = dbres.insertedCount;
            console.log(num);
            //send back to client number of items inserted and no error message
            // res.send({ 'num': num, err: null });
          })

          socket.emit('chat-message', msg);
          socket.broadcast.emit('chat-message', msg);
          // }
        });
      });
    }
  });
}