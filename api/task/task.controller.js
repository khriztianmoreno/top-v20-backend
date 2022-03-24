const {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
} = require('./task.service')

async function handlerAllTask(req, res) {
  const tasks = await getAllTask();
  console.log("🚀 ~ file: task.controller.js ~ line 11 ~ handlerAllTask ~ tasks", tasks)
  res.json(tasks);
}

async function handlerOneTask(req, res) {
  const { id } = req.params;
  const task = await getOneTask(id);

  if (!task) {
    res.status(404).json({ message: `Task not found with id: ${id}` });
  } else {
    res.json(task);
  }
}

async function handlerDeleteTask(req, res) {
  const id = req.params.id;
  const task = await deleteTask(id);

  if (!task) {
    res.status(404).json({ message: `Task not found with id: ${id}` });
  } else {
    res.json(task);
  }
}

function handlerCreateTask(req, res) {
  const newTask = req.body;

  if (!newTask.title) {
    res.status(400).json({ message: 'Title is required' });
  }

  if (!newTask.description) {
    res.status(400).json({ message: 'Description is required' });
  }

  const task = createTask(newTask);

  return res.status(201).json(task);
}

function handlerUpdateTask(req, res) {
  const id = req.params.id;
  const { body } = req;

  const task = updateTask(id, body);

  if (!task) {
    res.status(404).json({ message: `Task not found with id: ${id}` });
  } else {
    res.json(task);
  }
}

module.exports = {
  handlerAllTask,
  handlerOneTask,
  handlerDeleteTask,
  handlerCreateTask,
  handlerUpdateTask,
}
