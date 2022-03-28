const { Router } = require('express');

const { index } = require('./healthcheck.controller');

const router = Router();

router.get('/', index);

module.exports = router;
