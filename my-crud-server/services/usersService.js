let users = [];
let nextId = 1;

exports.getAll = () => users;

exports.getById = (id) => users.find(u => u.id === id);

exports.create = ({ name, email }) => {
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  return newUser;
};

exports.update = (id, { name, email }) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  user.name = name;
  user.email = email;
  return user;
};

exports.delete = (id) => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  return users.splice(index, 1)[0];
};
