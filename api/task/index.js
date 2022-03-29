const { Router } = require('express');

const {
  handlerAllTask,
  handlerOneTask,
  handlerDeleteTask,
  handlerCreateTask,
  handlerUpdateTask,
} = require('./task.controller');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');

const router = Router();

router.get('/', handlerAllTask);
router.get('/:id', handlerOneTask);
router.delete('/:id', hasRole(['admin']), handlerDeleteTask);
router.post('/', isAuthenticated(), handlerCreateTask);
router.patch('/:id', handlerUpdateTask);

module.exports = router;
