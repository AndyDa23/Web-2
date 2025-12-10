const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // твоя модель User

const SECRET = 'SUPER_SECRET_KEY'; // лучше в .env

exports.register = async ({ email, password }) => {
  // проверка, есть ли пользователь
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('User already exists');

  // хэширование пароля
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });

  // генерируем JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '24h' });
  return { user: { id: user.id, email: user.email }, token };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Wrong password');

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '24h' });
  return { user: { id: user.id, email: user.email }, token };
};
