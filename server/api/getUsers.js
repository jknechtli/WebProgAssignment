const cors = require('cors')
/**
 * This will return all users that are saved
 */
module.exports = (db, corsOptions, app) => {
  app.get('/api/users', cors(corsOptions), (req, res) => {
    console.log('getUser')
    // const users = require('./../storage/users.json');

    const collection = db.collection('users');
    collection.find({}).toArray((err, data) => {
      if (!err) {
        res.send(data);
      }
      else {
        console.log('ERROR: getting users: ', err)
        res.send(err);
      }
    })
  });
}