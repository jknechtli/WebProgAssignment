/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, app) => {
  app.put('/api/user/:id', (req, res) => {
    console.log('UpdateUser')

    if (!req.body) {
      return res.sendStatus(400)
    }

    const username = req.params.id;

    const collection = db.collection('users');
    collection.updateOne({ username }, { $set: { age: req.body.age, email: req.body.email, birthday: req.body.birthday, role: req.body.role } }, (err, data) => {
      //Return a response to the client to let them know the update was successful
      if (err) {
        res.send({ 'ok': false });
        throw err;
      }
      else {
        res.send({ 'ok': username });
      }
    })
  });
}