const express = require('express');
const router = express.Router();
const axios = require('axios');

const homeController = require('../controllers/home');
const middlewares = require('../helpers/middlewares');

/* GET home page. */
router.get('/', middlewares.checkToken, homeController.homepage);

module.exports = router;
