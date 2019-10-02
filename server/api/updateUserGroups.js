/**
 * This receives a list of users that have had their groups altered.
 * The function then updates the groups of all users
 *  */
module.exports = (db, app) => {
  app.post('/api/groups/users', (req, res) => {
    console.log('UpdateGroups with users')

    const groups = req.body;

    console.log('Groups: ', groups)
    const collection = db.collection('groups');

    groups.forEach(group => {

      const channels = group.channels.map(channel => ({
        name: channel.name,
        users: channel.users
      }))

      collection.updateOne({ name: group.name }, { $set: { channels } }, () => {
        // Do something after update?
      })
    });
    res.send({ 'ok': true });
  });
}