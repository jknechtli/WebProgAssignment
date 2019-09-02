
module.exports = (req, res) => {
  const users = require('./../storage/users.json');

  const returnUsers = users.map(u => {
    const user = {};
    // console.log(u.groups)
    user.age = u.age;
    user.username = u.username;
    user.email = u.email;
    user.birthday = u.birthday;
    user.groups = u.groups;
    user.role = u.role;
    return user;
  });

  res.send(returnUsers);
}