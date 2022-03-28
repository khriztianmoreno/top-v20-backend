const User = require('./user.model');

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function createUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

async function updateUser(id, user) {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

async function deleteUser(id) {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

async function getAllUsers() {
  const users = await User.find({}, '-password');
  return users;
}

async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
}

module.exports = {
  createUser,
  deleteUser,
  findOneUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
};
