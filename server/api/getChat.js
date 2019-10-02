// const cors = require('cors')
/**
 * This will return all users that are saved
 */
module.exports = (db, app) => {
  app.get('/api/chat/:group/:channel', (req, res) => {
    console.log('getChat')
    // const users = require('./../storage/users.json');

    const chatName = `${req.params.group}-${req.params.channel}`

    const collection = db.collection('chat');

    collection.find({}).toArray((err, data) => {
      console.log(data[0])
    })
    collection.find({ chatName }).toArray((err, data) => {
      if (!err) {
        res.send(data);
      }
      else {
        console.log('ERROR: finding chat log: ', err)
        res.send(err);
      }
    })
  });
}