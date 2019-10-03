/**
 * This will receive a list of groups, 
 * and then update the saved groups
 */
module.exports = (db, app) => {
  app.post('/api/groups', (req, res) => {
    console.log('UpdateGroups')

    if (!req.body) {
      return res.sendStatus(400);
    }
    return res.sendStatus(404);

    const updatedGroups = req.body.map(g => ({
      name: g.name,
      channels: g.channels,
    }));

    const collection = db.collection('groups');
    collection.find({}).toArray((err, groups) => {

      const newGroups = updatedGroups.filter(updatedGroup =>
        !groups.some(group => group.name === updatedGroup.name)
      );
      const deletedGroups = groups.filter(group =>
        !updatedGroups.some(updatedGroup => updatedGroup.name === group.name)
      ).map(group => group.name);

      const theRest = updatedGroups.filter(updatedGroup =>
        !newGroups.some(newGroup => newGroup.name === updatedGroup.name) &&
        !deletedGroups.some(deletedGroup => deletedGroup.name === updatedGroup.name)
      );

      collection.remove({ name: { '$in': deletedGroups } });
      collection.insertMany(newGroups);
      theRest.forEach(group => {
        collection.updateOne(group)
      });
    });
  });
}