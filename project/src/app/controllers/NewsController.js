class NewControlller {
    // GET /news
    index(req, res){
        res.render('newsAdmin', { layout: 'main.hbs' }); //giao diện chưa đăng nhập , vì header có đăng nhập
    }

    newsAdmin(req, res){
        res.render('newsAdmin', { layout: 'admin.hbs' });
        // res.render('news');
    }

    newsUser(req, res){
        res.render('newsUser', { layout: 'user.hbs' });
    }

    // GET /news/:slug
    show(req, res){
        res.send('news detail!!!');
    }
}

module.exports = new NewControlller();