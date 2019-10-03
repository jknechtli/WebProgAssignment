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

    const userCollection = db.collection('users');

    userCollection.find({ username }).limit(1).toArray(async (err, users) => {
      if (err) {
        res.send({ user: null });
        throw err;
      }
      else {
        //send the user to client
        const user = users[0];
        console.log('found user: ', user.username);
        res.send(user);
      }
    })
  });
}
