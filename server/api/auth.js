
// const users = [
//   {
//     username: 'joel',
//     birthday: '15/09/1998',
//     age: '20',
//     email: 'abc@com.au',
//     password: '123',
//     valid: undefined,
//     role: 15
//   },
//   {
//     username: 'dave',
//     birthday: '15/09/1987',
//     age: '31',
//     email: 'dave@com.au',
//     password: 'farrow',
//     valid: undefined,
//     role: 10
//   },
//   {
//     username: 'nish',
//     birthday: '15/09/1993',
//     age: '25',
//     email: 'nish@com.au',
//     password: 'ant',
//     valid: undefined,
//     role: 5
//   },
// ];

const users = require('./../storage/users.json');

module.exports = (req, res) => {

  if (!req.body) {
    return res.sendStatus(400);
  }

  const customer = {};
  customer.email = req.body.email;
  customer.upwd = req.body.upwd;
  customer.valid = false;

  console.log(typeof (users), users);

  users.forEach(user => {
    if (req.body.email === user.email && req.body.upwd === user.upwd) {
      customer.valid = true;
      customer.age = user.age;
      customer.username = user.username;
      customer.birthday = user.birthday;
      customer.email = user.email;
      customer.password = '';
    }
  });

  res.send(customer);
}