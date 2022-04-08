const { Router } = require('express');

const { handlerLoginUser, handlerVerifyAccount } = require('./local.controller');

const router = Router();

// /auth/local/login
router.post('/login', handlerLoginUser);
// /auth/local/forgot-password
// /auth/local/verify-account/10d55ffeeb9fe7c5a56fd311edabcbcc1a139aae17698862baa0460be05316b0
router.get('/verify-account/:token', handlerVerifyAccount);

module.exports = router;
