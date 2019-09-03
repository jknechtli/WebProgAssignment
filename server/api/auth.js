const fs = require('fs')
// const users = require('./../storage/users.json');

/**
 * This receives an email and password,
 * and checks if the email and password match a current user.
 * If they do, this will return the user with valid == true.
 * If not, this will return the received data with valid == false.
 */
module.exports = (req, res) => {
  console.log('auth')

  fs.readFile('./storage/users.json', (error, userString) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }

    const users = JSON.parse(userString);

    if (!req.body) {
      return res.sendStatus(400);
    }

    const customer = {};
    customer.email = req.body.email;
    customer.password = req.body.password;
    customer.valid = false;

    users.forEach(user => {
      if (req.body.email === user.email && req.body.password === user.password) {
        customer.valid = true;
        customer.age = user.age;
        customer.username = user.username;
        customer.birthday = user.birthday;
        customer.email = user.email;
        customer.password = '';
        customer.role = user.role;
      }
    });

    res.send(customer);
  });
}