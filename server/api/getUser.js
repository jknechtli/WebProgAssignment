
module.exports = (req, res) => {
  const users = require('./../storage/users.json');


  const userId = req.params.id;

  const returnUser = users
    .filter(u => u.username == userId)
    .map(u => {
      const user = {};
      user.age = u.age;
      user.username = u.username;
      user.email = u.email;
      user.birthday = u.birthday;
      user.groups = u.groups;
      user.role = u.role;
      return user;
    })
  [0];

  res.send(returnUser);
}