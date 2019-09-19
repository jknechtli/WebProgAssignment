
const cors = require('cors')
/**
 * This receives a user.
 * The function checks if the user exists.
 * If it does, it will update the user.
 * if not, it will add the user.
 */
module.exports = (db, corsOptions, app) => {
  app.post('/api/user', cors(corsOptions), (req, res) => {
    console.log('CreateUser')

    if (!req.body) {
      return res.sendStatus(400);
    }

    const username = req.body.username;

    const collection = db.collection('users');
    //check for duplicate id's
    collection.find({ 'username': username }).count((err, count) => {
      if (count == 0) { //if no duplicate

        const user = {
          username: req.body.username,
          email: req.body.email,
          role: req.body.role,
          groups: req.body.groups,
          birthday: req.body.birthday,
          password: req.body.password,
        }

        collection.insertOne(user, (err, dbres) => {

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