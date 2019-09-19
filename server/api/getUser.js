const fs = require('fs')
/**
 * This will receive a username,
 * and then return a user that matches that username
 */
module.exports = (db, app) => {
  app.get('/api/user/:id', (req, res) => {

    if (!req.body) {
      return res.sendStatus(400)
    }

    const username = req.params.id;
    //Create objectID from passed in+id
    const collection = db.collection('users');
    collection.find({ username }).limit(1).toArray((err, docs) => {
      //send to client and array of items limited to 1.
      console.log(docs);
      res.send(docs);
    })
  });
}