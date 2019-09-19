const fs = require('fs')
/**
 * This will receive a username,
 * and then return a user that matches that username
 */
module.exports = (db, app) => {
  app.get('/api/user/:id', (req, res) => {

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

        const userId = req.params.id;
        const userGroups = groups.filter(g => g.users.some(user => user == userId))


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
      })
    });
  });
}