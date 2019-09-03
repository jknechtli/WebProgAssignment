const fs = require('fs')
/**
 * This returns all groups
 */
module.exports = (req, res) => {
  // const groups = require('./../storage/groups.json');


  fs.readFile('./storage/groups.json', (error, groupstring) => {

    if (error) {
      console.log(JSON.parse(error));
      return
    }

    const groups = JSON.parse(groupstring);

    const returnGroups = groups.map(g => {
      const group = {};
      group.name = g.name;
      group.channels = g.channels;
      return group;
    });

    res.send(returnGroups);
  });
}