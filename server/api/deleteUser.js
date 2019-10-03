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
      if (err) {
        res.send({ ok: false });
        throw err
      }
      else {
        res.send({ ok: true });
      }
    })

  });
}