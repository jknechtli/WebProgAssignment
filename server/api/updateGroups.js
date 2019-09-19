const fs = require('fs')

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
    return res.sendStatus(400);

    const groups = req.body.map(g => ({
      name: g.name,
      channels: g.channels,
    }));

    const jsonString = JSON.stringify(groups);

    fs.writeFile('./storage/groups.json', jsonString, err => {
      if (err) {
        console.log('Error writing file: ', err);
      } else {
        console.log('Successfully wrote groups to file');
      }
    })

    res.send(returnUsers);
  });
}