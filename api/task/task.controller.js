const {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
} = require('./task.service');
const { eventCreateTask } = require('./task.event');

const { redisClient } = require('../../config/database');

async function handlerAllTask(req, res) {
  try {
    // 1 verificar si el dato esta en redis
    const reply = await redisClient.get(req.originalUrl);

    // 2 si esta en redis, devolverlo
    if (reply) {
      return res.json(JSON.parse(reply));
    }

    // 3. si no esta en redis, obtenerlo de la base de datos
    const tasks = await getAllTask();

    const expires = 60 * 60 * 24; // 24 hours

    // 4. guardarlo en redis
    await redisClient.set(req.originalUrl, JSON.stringify(tasks), {
      EX: expires,
    });

    // 5. devolverlo
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
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

    // emitir un evento para que el cliente sepa que se creo una nueva tarea
    eventCreateTask(task);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlerUpdateTask(req, res) {
  const { id } = req.params;
  const { body } = req;

  const task = await updateTask(id, body);

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
