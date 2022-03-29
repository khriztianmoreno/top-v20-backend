const jsonwebtoken = require('jsonwebtoken');

const { getUserByEmail } = require('../api/user/user.service');

/**
 * Validate JWT
 * @param {String} token
 * @returns {Object} payload
 */
async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, 'secret_token');
    return payload;
  } catch (error) {
    console.log('🚀 ~ file: auth.service.js ~ line 13 ~ validateToken ~ error', error);
    return null;
  }
}

async function isAuthenticated(req, res, next) {
  // 1. req.headers -> authorization
  const authHeader = req.headers.authorization;
  // 2. If (authHeader)
  if (!authHeader) {
    return res.status(401).end();
  }
  // 3. split para obtener el token
  const [, token] = authHeader.split(' ');
  // 4. validar el token
  const payload = await validateToken(token);

  // 5. if token falsy -> decir q no esta authori
  if (!payload) {
    return res.status(401).end();
  }

  // 6. buscar el usuario por el email del payload del token
  const user = await getUserByEmail(payload.email);

  if (!user) {
    return res.status(401).end();
  }

  // 7. agregar ese usuario al req.user
  req.user = user;
  // 8. siga al siguiente middleware next()
  next();
  return null;
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} payload
 * @returns {String} token
 */
function signToken(payload) {
  const token = jsonwebtoken.sign(payload, 'secret_token', {
    expiresIn: '2h',
  });

  return token;
}

module.exports = {
  isAuthenticated,
  signToken,
};
