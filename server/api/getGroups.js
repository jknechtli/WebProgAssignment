/**
 * This returns all groups
 */
module.exports = (db, app) => {
  app.get('/api/groups', (req, res) => {

    console.log('getGroups');

    const collection = db.collection('groups');
    collection.find({}).toArray((err, data) => {
      if (!err) {
        res.send(data);
      }
    });
  });
}