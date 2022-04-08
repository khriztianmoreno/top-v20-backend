const jsonwebtoken = require('jsonwebtoken');
const compose = require('composable-middleware');

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
    return null;
  }
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose().use(
    async (req, res, next) => {
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
    },
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(allowRoles = []) {
  // 1. verficar que este autenticado
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const { role } = req.user;

      if (!allowRoles.includes(role)) {
        return res.status(403).send('Forbidden');
      }

      next();
      return null;
    });
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
  hasRole,
  signToken,
};
