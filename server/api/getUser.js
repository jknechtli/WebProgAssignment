const fs = require('fs')
/**
 * This will receive a username,
 * and then return a user that matches that username
 */
module.exports = (req, res) => {

  fs.readFile('./storage/users.json', (error, userString) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }

    const users = JSON.parse(userString);

    const userId = req.params.id;

    const returnUser = users
      .filter(u => u.username == userId)
      .map(u => {
        const user = {};
        user.age = u.age;
        user.username = u.username;
        user.email = u.email;
        user.birthday = u.birthday;
        user.groups = u.groups;
        user.role = u.role;
        return user;
      })
    [0];

    res.send(returnUser);
  });
}