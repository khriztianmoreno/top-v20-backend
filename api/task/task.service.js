const TaskModel = require('./task.model')

function getAllTask() {
  return TaskModel.find();
}

async function getOneTask(id) {
  const task = await TaskModel.findById(id)

  if (!task) {
    return null;
  }

  return task;
}

async function deleteTask(id) {
  const task = await TaskModel.findByIdAndDelete(id)

  if (!task) {
    return null;
  }

  return task;
}

function createTask(task) {
  // task.id = tasks.length + 1;
  // task.completed = false;

  // tasks.push(task);

  return task;
}

function updateTask(id, task) {
  // const oldTask = tasks.find(task => task.id === Number(id));

  // if (!oldTask) {
  //   return null;
  // }

  // tasks.forEach(oldTask => {
  //   if (oldTask.id === Number(id)) {
  //     oldTask.title = task.title;
  //     oldTask.description = task.description;
  //     oldTask.completed = task.completed;
  //   }
  // });

  return task;
}

module.exports = {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
}
