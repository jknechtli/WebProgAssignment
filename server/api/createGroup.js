
const cors = require('cors')
/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, corsOptions, app) => {
  app.post('/api/group', cors(corsOptions), (req, res) => {
    console.log('CreateUser')

    if (!req.body) {
      return res.sendStatus(400);
    }

    const group = req.body;
    console.log("\n\nGroup:", group)
    console.log("\n\n")

    const collection = db.collection('groups');
    //check for duplicate id's
    collection.find({ 'name': group.name }).count((err, count) => {
      if (count == 0) { //if no duplicate

        const groupToAdd = {
          name: group.name,
          channels: group.channels.map(channel =>
            ({
              name: channel.name,
              users: channel.users
            })
          )
        }

        collection.insertOne(groupToAdd, (err, dbres) => {

          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items inserted and no error message
          res.send({ 'num': num, err: null });
        })
      } else {
        //On Error send back error message
        res.send({ 'num': 0, 'err': "duplicate item" });
      }
    });
  });
}