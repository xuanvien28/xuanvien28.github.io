const Account = require('../models/Accounts'); // import model Course
const jwt = require('jsonwebtoken'); // import jwt

class Middlewares {
    checkLogin(req, res, next) {
        const token = req.cookies.token; // Lấy token từ cookie
       
        // if (!token) {
        //     return res.status(401).send('Bạn cần đăng nhập');
        // }

        if (!token) {
            res.cookie('redirectAfterLogin', req.originalUrl, { httpOnly: true });
            return res.redirect('/login');
        }

        try {
            const idUser = jwt.verify(token, 'mk'); // Xác thực token

            Account.findOne({ _id: idUser._id }) // Tìm user theo id
                .then(data => {
                    if (data) {
                        req.data = data; // Lưu user vào request
                        next();
                    } else {
                        res.status(401).send('Không tìm thấy tài khoản');
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Lỗi khi truy cập tài khoản');
                });

        } catch (err) {
            return res.status(401).send('Token không hợp lệ');
        }
    }

    checkRoleUser(req, res, next) {
        const role = req.data.role;
        if (role === 'user') {
            next();
        } else {
            res.status(403).json({ error: 'Không có phân quyền' });
        }
    }

    checkRoleAdmin(req, res, next) {
        const role = req.data.role;
        if (role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Không có phân quyền' });
        }
    }

}

module.exports = new Middlewares();

