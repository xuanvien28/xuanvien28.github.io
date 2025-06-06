const Courses = require('../models/Courses'); // import model Course
const Account = require('../models/Accounts'); // import model Course
const jwt = require('jsonwebtoken'); // import jwt

class SiteControlller {

    
    async index(req, res){    //home gốc
         res.render('home');
    }

    async introduce(req, res){ //giới thiệu gốc
         res.render('introduce');
    }

    // GET /news/:slug
    search(req, res){
        res.render('search');
    }

    contact(req, res){
        res.render('contact');
    }

    login(req, res) {
        res.render('login', { error: '', username: '', password: '' });
    }
    async homeAdmin(req, res){
         res.render('home', { layout: 'admin.hbs' });
    }

    async contactAdmin(req, res){
         res.render('contact', { layout: 'admin.hbs' });
    }

    async introduceAdmin(req, res){
         res.render('introduce', { layout: 'admin.hbs' });
    }

    async homeUser(req, res){
         res.render('home', { layout: 'user.hbs' });
    }

    async contactUser(req, res){
         res.render('contact', { layout: 'user.hbs' });
    }
    
    async introduceUser(req, res){
         res.render('introduce', { layout: 'user.hbs' });
    }

    async logout(req, res) {
        res.clearCookie('token'); // Xóa cookie token
        res.redirect('/login'); // Chuyển hướng về trang đăng nhập
    }

    async loginPost(req, res, next) {
        // const {username, password} = req.body;
        var username = req.body.username;
        var password = req.body.password;

        Account.findOne({          //db.Accounts.find({})  ===SELECT * FROM  users.
            username : username, 
            password : password
        })      
            .then(data => {   //data là object kết quả từ database {}
                console.log(data);
                if (!data) {
                return res.status(400).json({ error: 'Tài khoản không tồn tại' });
                }

                // So sánh mật khẩu
                if (data.password !== password) {
                return res.status(400).json({ error: 'Sai mật khẩu' });
                }
                if (data) { // nếu tìm thấy tài khoản
                    const token = jwt.sign({_id : data._id}, 'mk')  // truyền data và secret để tạo token
                    
                    res.cookie('token', token, { httpOnly: true });// Lưu token vào cookie 
                    
                    // return res.redirect('/private');

                    const redirectUrl = req.cookies.redirectAfterLogin || '/private';
                    res.clearCookie('redirectAfterLogin');
                    return res.redirect(redirectUrl);

                } 
            })
            .catch(err=>{
                console.error(err); // in ra lỗi
                res.status(500).json({ error: 'Lỗi máy chủ' }) // lỗi server
            }); 
        }
     

       
}

module.exports = new SiteControlller();