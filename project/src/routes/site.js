const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const Middlewares = require('../app/middlewares/Middlewares');
const newsController = require('../app/controllers/NewsController');

// router.get('/search', siteController.search);
router.get('/contact', siteController.contact);
router.get('/introduce', siteController.introduce);
router.get('/new', newsController.index);


router.get('/login', siteController.login);
router.post('/login', siteController.loginPost);

router.get('/private', Middlewares.checkLogin, (req, res, next)=>{
    const role = req.data.role;
        if (role === 'user') {
            res.redirect('/private/homeUser');
        }else if (role === 'admin') {
            res.redirect('/private/homeAdmin');  // vào home có thamh điều hướng được
        } 
        else {
             res.status(403).send('Bạn không có quyền truy cập');
        }
    });
    
router.get('/private/homeAdmin', Middlewares.checkLogin, Middlewares.checkRoleAdmin, siteController.homeAdmin);
router.get('/private/introduceAdmin', Middlewares.checkLogin, Middlewares.checkRoleAdmin, siteController.introduceAdmin);
router.get('/private/contactAdmin', Middlewares.checkLogin, Middlewares.checkRoleAdmin, siteController.contactAdmin);
router.get('/private/newsAdmin', Middlewares.checkLogin, Middlewares.checkRoleAdmin, newsController.newsAdmin);

router.get('/private/homeUser', Middlewares.checkLogin, Middlewares.checkRoleUser, siteController.homeUser);
router.get('/private/introduceUser', Middlewares.checkLogin, Middlewares.checkRoleUser, siteController.introduceUser);
router.get('/private/contactUser', Middlewares.checkLogin, Middlewares.checkRoleUser, siteController.contactUser);
router.get('/private/newsUser', Middlewares.checkLogin, Middlewares.checkRoleUser, newsController.newsUser);

router.get('/private/logout',siteController.logout);

router.get('/', siteController.index);


module.exports = router;