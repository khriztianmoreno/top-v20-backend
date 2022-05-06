const { getUserByEmail, findOneUser } = require('../../api/user/user.service');
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

    return res.status(200).json({ token, profile: user.profile });
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function handlerVerifyAccount(req, res) {
  const { token } = req.params;

  try {
    const user = await findOneUser({ passwordResetToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Token' });
    }

    if (Date.now() > user.passwordResetExpires) {
      return res.status(400).json({ message: 'Token expired' });
    }

    user.isActive = true;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();
    const jwtToken = signToken(user.profile);

    return res.status(200).json({ message: 'Account verified', token: jwtToken });
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  handlerLoginUser,
  handlerVerifyAccount,
};
