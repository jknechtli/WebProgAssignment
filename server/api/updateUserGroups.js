const fs = require('fs')
/**
 * This receives a list of users that have had their groups altered.
 * The function then updates the groups of all users
 *  */
module.exports = (req, res) => {
  console.log('UpdateUser')
  const users = require('./../storage/users.json');

  if (!req.body) {
    return res.sendStatus(400);
  }

  const username = req.body.username;
  let found = false;

  users.forEach(user => {
    req.body.forEach(({ username, groups }) => {
      if (username === user.username) {
        user.groups = groups;
      }
    })
  });

  const jsonString = JSON.stringify(users);

  fs.writeFile('./storage/users.json', jsonString, err => {
    if (err) {
      console.log('Error writing file: ', err);
    } else {
      console.log('Successfully wrote file');
    }
  })

  res.send(users)
}