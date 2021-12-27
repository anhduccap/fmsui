const express = require('express');
const router = express.Router();

const middlewares = require('../helpers/middlewares');
const adminController = require('../controllers/admin');

/* GET home page. */
router.get('/', adminController.getHomePage);

module.exports = router;
