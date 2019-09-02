module.exports = (req, res) => {
  console.log('GetGroups')
  const groups = require('./../storage/groups.json');

  const returnGroups = groups.map(g => {
    const group = {};
    group.name = g.name;
    group.channels = g.channels;
    return group;
  });

  res.send(returnGroups);
}