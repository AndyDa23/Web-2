let users = [];
let nextId = 1;

exports.getAll = () => users;

exports.getById = (id) => users.find(u => u.id === Number(id));

exports.create = ({ username, email, password }) => {
  const newUser = {
    id: nextId++,
    username,
    email,
    password
  };
  users.push(newUser);
  return newUser;
};

exports.update = (id, { username, email, password }) => {
  const user = users.find(u => u.id === Number(id));
  if (!user) return null;
  if (username !== undefined) user.username = username;
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.password = password;
  return user;
};

exports.delete = (id) => {
  const index = users.findIndex(u => u.id === Number(id));
  if (index === -1) return null;
  return users.splice(index, 1)[0];
};
