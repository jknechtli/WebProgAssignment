const fs = require('fs')

module.exports = (req, res) => {
  console.log('UpdateGroups')
  const oldGroups = require('./../storage/groups.json');

  if (!req.body) {
    return res.sendStatus(400);
  }

  const groups = req.body;

  // console.log('was: ', oldGroups)
  // console.log('now: ', groups)


  const jsonString = JSON.stringify(groups);

  fs.writeFile('./storage/groups.json', jsonString, err => {
    if (err) {
      console.log('Error writing file: ', err);
    } else {
      console.log('Successfully wrote file');
    }
  })

}