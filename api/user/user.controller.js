const jsonwebtoken = require('jsonwebtoken');

const UserModel = require('./user.model');

const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} = require('./user.service');

async function handlerCreateUser(req, res) {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handlerGetAllUsers(req, res) {
  const users = await getAllUsers();

  res.status(201).json(users);
}

async function handlerGetUserByEmail(req, res) {
  const { email } = req.body;
  const user = getUserByEmail(email);

  if (!user) {
    return res.status(404);
  }

  return res.status(200).json(user);
}

async function handlerGetOneUser(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function handlerLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jsonwebtoken.sign(user.profile, 'M1S3CRETO12437SBJKDFGHSFS', {
      expiresIn: '2h',
    });

    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetUserByEmail,
  handlerGetOneUser,
  handlerLoginUser,
};
