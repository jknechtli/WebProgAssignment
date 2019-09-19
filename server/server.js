const express = require('express');
const app = express();
const http = require('http').Server(app)
const CORS = require('cors');
const io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const colName = 'product';
const client = new MongoClient(url);
const funOrders = require('./dbFunc/funOrders');

const bodyParser = require('body-parser');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());

app.use(CORS());

// app.allo

// app.use(express.static('http://localhost:4200'));
app.use(express.static(__dirname + '/www'));

client.connect((err) => {
  if (err) {
    console.log('ERROR: connecting to mongo: ', err);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);
  // console.log(db);
  const collection = db.collection(colName);
  // funOrders(client, collection);
  // console.log(collection.find({ id: '1' }));

  const server = http.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server started on ${host} port: ${port}`)
  })

  require(__dirname + '\\api\\auth')(db, app);
  require(__dirname + '\\api\\createUser')(db, corsOptions, app);
  require(__dirname + '\\api\\updateUserGroups')(db, app);
  require(__dirname + '\\api\\updateGroups')(db, app);
  require(__dirname + '\\api\\updateUser')(db, app);
  require(__dirname + '\\api\\getUser')(db, app);
  require(__dirname + '\\api\\getUsers')(db, corsOptions, app);
  require(__dirname + '\\api\\getGroups')(db, app);
  require(__dirname + '\\api\\deleteUser')(db, app);

  require('./socket')(io);

  // client.close();
})
// const socketService = require('.\\socket.js');
// socketService(io);