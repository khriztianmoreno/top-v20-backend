const { getUserByEmail } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

async function handlerLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user.profile);

    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  handlerLoginUser,
};
