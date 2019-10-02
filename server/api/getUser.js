
/**
 * This will receive a username,
 * and then return a user that matches that username
 */
module.exports = (db, app) => {
  app.get('/api/user/:id', (req, res) => {

    if (!req.body) {
      return res.sendStatus(400)
    }

    const username = req.params.id;
    //Create objectID from passed in+id
    const userCollection = db.collection('users');

    userCollection.find({ username }).limit(1).toArray(async (err, users) => {
      //send to client and array of items limited to 1.
      const user = users[0];
      console.log('user: ', user);

      // getUserGroups(db, username).then(groups => {
      //   console.log('group after group: ', groups);

      //   user.groups = groups
      //   console.log('user after group: ', user);
      res.send(user);
      // });


    })
  });
}

// const getUserGroups = async (db, username, collection) => {
//   const groupCollection = db.collection('groups');
//   return collection.find({}).toArray((err, groups) => {

//     console.log("--------------------");
//     console.log("Groups: ", groups);

//     groups = groups.filter(group =>
//       group.channels.some(channel =>
//         channel.users.some(user => user === username)
//       )
//     )

//     groups.forEach(group =>
//       group.channels = group.channels.filter(channel =>
//         channel.users.some(user => user === username)
//       )
//     );

//     console.log("Groups: ", groups);

//     return groups;
//   })
// }