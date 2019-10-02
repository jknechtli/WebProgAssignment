/**
 * This receives an username and password,
 * and checks if the username and password match a current user.
 * If they do, this will return the user with valid == true.
 * If not, this will return the received data with valid == false.
 */
module.exports = (db, app) => {
  app.post('/api/auth', (req, res) => {
    console.log('auth')

    if (!req.body) {
      return res.sendStatus(400)
    }

    const customer = {};
    customer.username = req.body.username;
    customer.password = req.body.password;

    const collection = db.collection('users');

    collection.find(customer).limit(1).toArray((err, users) => {
      if (users.length == 0) {
        res.send({ success: 0, topnum: 0 });
      } else {
        const user = users[0];
        user.valid = true;
        res.send(user);

      }
    });

  });
}