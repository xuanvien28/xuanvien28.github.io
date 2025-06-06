const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');
const Middlewares = require('../app/middlewares/Middlewares');



router.get('/',  newsController.index)
router.get('/private/newsAdmin', Middlewares.checkLogin, Middlewares.checkRoleAdmin, newsController.newsAdmin);


router.get('/:slug', newsController.show)




module.exports = router;