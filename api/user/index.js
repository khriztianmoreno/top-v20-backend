const { Router } = require('express');

const {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetOneUser,
  handlerLoginUser,
} = require('./user.controller');

const router = Router();

router.post('/', handlerCreateUser);
router.get('/', handlerGetAllUsers);
router.get('/:id', handlerGetOneUser);
// TODO: Move to auth domain
router.post('/login', handlerLoginUser);

module.exports = router;
