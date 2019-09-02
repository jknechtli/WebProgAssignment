const express = require('express');
const app = express();
const http = require('http').Server(app)
const CORS = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(CORS());

app.use(express.static(__dirname + '/www'));

const server = http.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server started on ${host} port: ${port}`)
})

app.post('/api/auth', require(__dirname + '\\api\\auth'))
app.post('/api/user', require(__dirname + '\\api\\updateUser'))
app.post('/api/groups', require(__dirname + '\\api\\updateGroups'))
app.get('/api/user/:id', require(__dirname + '\\api\\getUser'))
app.get('/api/users', require(__dirname + '\\api\\getUsers'))
app.get('/api/groups', require(__dirname + '\\api\\getGroups'))

