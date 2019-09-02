const fs = require('fs')

module.exports = (req, res) => {
  const users = require('./../storage/users.json');

  if (!req.body) {
    return res.sendStatus(400);
  }

  const email = req.body.email;
  // customer.upwd = req.body.upwd;
  // customer.valid = false;

  // console.log(users);

  users.forEach(user => {
    if (email === user.email) {
      user.age = req.body.age;
      user.username = req.body.username;
      user.birthday = req.body.birthday;
      user.groups = req.body.groups;
    }
  });

  const jsonString = JSON.stringify(users);

  fs.writeFile('./../storage/user.json', jsonString, err => {
    if (err) {
      console.log('Error writing file: ', err);
    } else {
      console.log('Successfully wrote file');
    }
  })

}