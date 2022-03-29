const { Router } = require('express');

const {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetOneUser,
} = require('./user.controller');

const router = Router();

router.post('/', handlerCreateUser);
router.get('/', handlerGetAllUsers);
router.get('/:id', handlerGetOneUser);

module.exports = router;
