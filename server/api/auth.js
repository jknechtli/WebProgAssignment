const fs = require('fs')
// const users = require('./../storage/users.json');

/**
 * This receives an email and password,
 * and checks if the email and password match a current user.
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
    customer.email = req.body.email;
    customer.password = req.body.password;

    // console.log(product);
    const collection = db.collection('users');
    //check for duplicate id's
    collection.find(customer).limit(1).toArray((err, users) => {
      if (users.length == 0) {
        res.send({ success: 0, topnum: 0 });
      } else {
        //On send back highest used number.
        // collection.find({}, { sort: { id: -1 }, limit: 1 }).toArray(function (err, items) {
        //   console.log(items[0].id);
        // res.send({ success: 0, topnum: items[0].id });
        // });
        const user = users[0];
        user.valid = true;
        res.send(user);

        //res.send({'success':0});
      }
    });

  });
}