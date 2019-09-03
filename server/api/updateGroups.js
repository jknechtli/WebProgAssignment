const fs = require('fs')

/**
 * This will receive a list of groups, 
 * and then update the saved groups
 */
module.exports = (req, res) => {
  console.log('UpdateGroups')
  const oldGroups = require('./../storage/groups.json');

  if (!req.body) {
    return res.sendStatus(400);
  }

  const groups = req.body.map(g => ({
    name: g.name,
    channels: g.channels,
  }));

  // console.log('was: ', oldGroups)
  // console.log('now: ', groups)


  const jsonString = JSON.stringify(groups);

  fs.writeFile('./storage/groups.json', jsonString, err => {
    if (err) {
      console.log('Error writing file: ', err);
    } else {
      console.log('Successfully wrote groups to file');
    }
  })

  res.send(returnUsers);
}