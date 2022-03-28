const Task = require('./task.model');

/**
 * Get all tasks
 * @returns all tasks
 */
function getAllTask() {
  return Task.find({}, { title: 1 });
}

/**
 * Get task by id
 * @param {string} id Indentifier of the task to be filtered
 * @returns task
 */
async function getOneTask(id) {
  const task = await Task.findById(id)
    .populate({ path: 'userId', select: 'firstName lastName' });

  return task;
}

/**
 * Delete a task
 * @param {String} id Identifier of the task to be deleted
 * @returns task deleted
 */
async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id);
  return task;
}

/**
 * Create a new Task
 * @param {Object} Task Task to create
 * @returns Task created
 */
function createTask(task) {
  return Task.create(task);
}

/**
 * Update a task
 * @param {string} id Indentifier of the task to be updated
 * @param {Object} task Body of the task to be updated
 * @returns task updated
 */
async function updateTask(id, task) {
  const updatedTask = await Task.findByIdAndUpdate(id, task);
  return updatedTask;
}

module.exports = {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
};
