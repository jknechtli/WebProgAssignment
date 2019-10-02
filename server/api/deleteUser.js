const fs = require('fs')
/**
 * This receives a username.
 * The function then filters out any users with that username,
 * then save to the users
 */
module.exports = (db, app) => {
  app.delete('/api/user/:id/delete', (req, res) => {
    const username = req.params.id;
    console.log('DeleteUser: ', username)

    if (!req.body) {
      return res.sendStatus(400);
    }

    const collection = db.collection('users');
    //Delete a single item based on its unique ID.

    collection.deleteOne({ username }, (err, docs) => {
      //get a new listing of all items in the database and return to client.
      //  collection.find({}).toArray((err,data)=>{
      //console.log('data' + data);
      //   res.send(data);
      // });
      res.send({ ok: 1 });
    })

  });
}