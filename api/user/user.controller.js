const crypto = require('crypto');

const {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} = require('./user.service');

const { sendMailSendGrid } = require('../../utils/emails');

async function handlerCreateUser(req, res) {
  const newUser = req.body;
  try {
    const hash = crypto.createHash('sha256')
      .update(newUser.email)
      .digest('hex');

    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24; // 24 hours
    const user = await createUser(newUser);

    const email = {
      from: '"no reply 👻" <cristian.moreno@makeitreal.camp>',
      to: user.email,
      subject: 'Activate your account Template',
      template_id: 'd-649011f35b854690a0e5f47de11eb2f2',
      dynamic_template_data: {
        firstName: user.firstName,
        lastName: user.lastName,
        url: `http://localhost:3002/activate/${hash}`,
      },
    };

    await sendMailSendGrid(email);

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

module.exports = {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetUserByEmail,
  handlerGetOneUser,
};
