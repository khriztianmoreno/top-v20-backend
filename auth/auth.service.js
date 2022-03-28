const jsonwebtoken = require('jsonwebtoken');

/**
 * Validate JWT
 * @param {String} token
 * @returns {Object} payload
 */
async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, 's3cr3t_k3y@!!');
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} payload
 * @returns {String} token
 */
function signToken(payload) {
  const token = jsonwebtoken.sign(payload, 's3cr3t_k3y@!!', {
    expiresIn: '2h',
  });

  return token;
}

module.exports = {
  signToken,
};
