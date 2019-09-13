const fs = require('fs')
/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (req, res) => {
  console.log('UpdateUser')

  fs.readFile('./storage/users.json', (error, userString) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }

    const users = JSON.parse(userString);


    if (!req.body) {
      return res.sendStatus(400);
    }

    const username = req.body.username;
    let found = false;

    users.forEach(user => {
      if (username === user.username) {
        found = true;
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
          password: req.body.password,
        }
      )
    }

    const jsonString = JSON.stringify(users);

    fs.writeFile('./storage/users.json', jsonString, err => {
      if (err) {
        console.log('Error writing file: ', err);
      } else {
        console.log('Successfully wrote file');
      }
    })

    res.send(users);
  });
}