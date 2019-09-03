const fs = require('fs')
/**
 * This receives a username.
 * The function then filters out any users with that username,
 * then save to the users
 */
module.exports = (req, res) => {
  const userId = req.params.id;
  console.log('DeleteUser: ', userId)

  fs.readFile('./storage/users.json', (error, userString) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }

    let users = JSON.parse(userString);

    if (!req.body) {
      return res.sendStatus(400);
    }

    users = users.filter(user => userId !== user.username);

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