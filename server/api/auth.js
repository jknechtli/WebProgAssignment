
const users = require('./../storage/users.json');

module.exports = (req, res) => {
  console.log('auth')

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
}