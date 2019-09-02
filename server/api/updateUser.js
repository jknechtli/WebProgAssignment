const fs = require('fs')

module.exports = (req, res) => {
  const users = require('./../storage/users.json');

  if (!req.body) {
    return res.sendStatus(400);
  }

  const username = req.body.username;
  // customer.upwd = req.body.upwd;
  // customer.valid = false;

  // console.log(users);

  let found = false;

  users.forEach(user => {
    if (username === user.username) {
      found = true;
      user.age = req.body.age;
      user.email = req.body.email;
      user.birthday = req.body.birthday;
      user.groups = req.body.groups;
    }
  });

  if (!found) {
    users.push(
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        groups: req.body.groups,
        birthday: req.body.birthday,
      }
    )
  }

  const jsonString = JSON.stringify(users);

  fs.writeFile('./../storage/user.json', jsonString, err => {
    if (err) {
      console.log('Error writing file: ', err);
    } else {
      console.log('Successfully wrote file');
    }
  })

}