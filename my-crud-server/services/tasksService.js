let tasks = [];
let nextId = 1;

exports.getAll = () => tasks;
exports.getById = (id) => tasks.find(t => t.id === id);
exports.create = ({ title, userId }) => {
  const newTask = { id: nextId++, title, completed: false, userId };
  tasks.push(newTask);
  return newTask;
};
exports.update = (id, { title, completed }) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return task;
};
exports.delete = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  return tasks.splice(index, 1)[0];
};
