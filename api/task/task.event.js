const { socket } = require('../../config/socket');

function eventCreateTask(task) {
  socket.io.emit('task:create', task);
}

function eventGetAllTask(tasks) {
  socket.io.emit('task:getAll', tasks);
}

function eventUpdateTask(task) {
  socket.io.emit('task:update', task);
}

function eventDeleteTask(task) {
  socket.io.emit('task:delete', task);
}

module.exports = {
  eventCreateTask,
  eventGetAllTask,
  eventUpdateTask,
  eventDeleteTask,
};
