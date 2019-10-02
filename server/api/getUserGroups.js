


module.exports = (db, app) => {
  app.get('/api/user/:id/groups', (req, res) => {
    console.log('CreateUser')

    if (!req.body) {
      return res.sendStatus(400);
    }

    const username = req.params.id;

    const groupCollection = db.collection('groups');

    groupCollection.find({}).toArray((err, groups) => {

      console.log("--------------------");
      console.log("Groups: ", groups);

      groups = groups.filter(group =>
        group.channels.some(channel =>
          channel.users.some(user => user === username)
        )
      )

      groups.forEach(group =>
        group.channels = group.channels.filter(channel =>
          channel.users.some(user => user === username)
        )
      );

      console.log("Groups: ", groups);

      res.send(groups);
    })
  })
}