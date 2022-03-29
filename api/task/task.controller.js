const {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
} = require('./task.service');

async function handlerAllTask(req, res) {
  const tasks = await getAllTask();
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
  const { id } = req.params;
  const task = await deleteTask(id);

  if (!task) {
    res.status(404).json({ message: `Task not found with id: ${id}` });
  } else {
    res.json(task);
  }
}

async function handlerCreateTask(req, res) {
  const newTask = {
    ...req.body,
    // eslint-disable-next-line no-underscore-dangle
    userId: req.user._id,
  };

  if (!newTask.title) {
    res.status(400).json({ message: 'Title is required' });
  }

  if (!newTask.description) {
    res.status(400).json({ message: 'Description is required' });
  }

  try {
    const task = await createTask(newTask);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlerUpdateTask(req, res) {
  const { id } = req.params;
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
};
