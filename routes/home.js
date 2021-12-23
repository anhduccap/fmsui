const express = require('express');
const router = express.Router();
const axios = require('axios');

const homeController = require('../controllers/home');
const middlewares = require('../helpers/middlewares');

/* GET home page. */
router.get('/', middlewares.checkToken, homeController.homepage);

/* GET statistic page. */
router.get('/stat', middlewares.checkToken, homeController.getPlayerStat);

/* GET line up suggestion page. */
router.get('/lineup', middlewares.checkToken, homeController.lineupSuggestion);




router.get('/test', (req, res) => {
    res.render('index');
});


module.exports = router;
