/**
 * Main application routes
 */
const healthcheck = require('./api/healthcheck');
const task = require('./api/task');
const user = require('./api/user');

function routes(app) {
  // API Routes
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/tasks', task);
  app.use('/api/users', user);
}

module.exports = routes;
