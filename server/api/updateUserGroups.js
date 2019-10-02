// const fs = require('fs')
/**
 * This receives a list of users that have had their groups altered.
 * The function then updates the groups of all users
 *  */
module.exports = (db, app) => {
  app.post('/api/groups/users', (req, res) => {
    console.log('UpdateUser')

    fs.readFile('./storage/users.json', (error, userString) => {

      if (error) {
        return res.sendStatus(400);
      }
      // return

      const groups = req.body;
      // let found = false;

      const collection = db.collection('groups');
      //check for duplicate id's
      // collection.find({}).toArray((err, groups) => {

      groups.forEach(group => {

        const channels = group.channels.map(channel => ({
          name: channel.name,
          users: channel.users
        }))

        collection.updateOne({ name: group.name }, { $set: { channels } }, () => {
          //Return a response to the client to let them know the delete was successful
        })
      });
      res.send({ 'ok': username });
      // })

      // users.forEach(user => {
      //   req.body.forEach(({ username, groups }) => {
      //     if (username === user.username) {
      //       user.groups = groups;
      //     }
      //   })
      // });

      // const jsonString = JSON.stringify(users);

      // fs.writeFile('./storage/users.json', jsonString, err => {
      //   if (err) {
      //     console.log('Error writing file: ', err);
      //   } else {
      //     console.log('Successfully wrote file');
      //   }
      // })

      res.send(users)
    });
  });
}


const cors = require('cors')
/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, corsOptions, app) => {
  app.post('/api/group', cors(corsOptions), (req, res) => {
    console.log('CreateUser')

    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = req.body;
    console.log("\n\nGroup:", group)
    console.log("\n\n")

    const collection = db.collection('groups');
    //check for duplicate id's
    collection.find({ 'name': group.name }).count((err, count) => {
      if (count == 0) { //if no duplicate

        const groupToAdd = {
          name: group.name,
          channels: group.channels.map(channel =>
            ({
              name: channel.name,
              users: channel.users
            })
          )
        }

        collection.insertOne(groupToAdd, (err, dbres) => {

          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items inserted and no error message
          res.send({ 'num': num, err: null });
        })
      } else {
        //On Error send back error message
        res.send({ 'num': 0, 'err': "duplicate item" });
      }
    });
  });
}