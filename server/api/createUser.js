const fs = require('fs')

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const colName = 'product';
const client = new MongoClient(url);
const funOrders = require('./dbFunc/funOrders');

/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, app) => {
  app.post('/api/user', (req, res) => {
    console.log('UpdateUser')

    fs.readFile('./storage/users.json', (error, userString) => {

      // client.connect((err) => {
      //   if (!err) {
      //     console.log("Connected successfully to server");
      //     const db = client.db(dbName);
      //     // console.log(db);
      //     const collection = db.collection(colName);
      //     funOrders(client, collection);
      //     // console.log(collection.find({ id: '1' }));
      //     client.close();
      //   }
      // })


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
  });
}