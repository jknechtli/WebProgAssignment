const fs = require('fs')
/**
 * This will return all users that are saved
 */
module.exports = (req, res) => {
  // const users = require('./../storage/users.json');

  fs.readFile('./storage/users.json', (error, userString) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }
    fs.readFile('./storage/groups.json', (gError, groupString) => {

      if (gError) {
        console.log(JSON.parse(gError));
        return
      }

      const users = JSON.parse(userString);
      const groups = JSON.parse(groupString);

      const returnUsers = users.map(u => {

        const userGroups = groups.filter(g => g.users.some(user => user == u.name))

        const user = {};
        user.age = u.age;
        user.username = u.username;
        user.email = u.email;
        user.birthday = u.birthday;
        user.role = u.role;

        user.groups = userGroups.map(g => {
          g.channels = g.channels.filter(c => c.users.some(cu => cu == u.username))
          return g;
        })

        return user;
      });

      res.send(returnUsers);
    })
  });
}