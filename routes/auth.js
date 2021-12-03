const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

// [GET] /auth
router.get('/', authController.loadLoginPage);

// [POST] /auth
router.post('/', authController.login);

module.exports = router;
