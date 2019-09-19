const fs = require('fs')
/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, app) => {
  app.put('/api/user/:id', (req, res) => {
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

      const username = req.params.id;

      users.forEach(user => {
        if (username === user.username) {
          user.age = req.body.age;
          user.email = req.body.email;
          user.birthday = req.body.birthday;
        }
      });

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
  });
}