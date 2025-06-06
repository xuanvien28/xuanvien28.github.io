// app/middlewares/showUser.js
const jwt = require('jsonwebtoken');
const Account = require('../models/Accounts');

async function showUser(req, res, next) {
    const token = req.cookies.token;
    res.locals.user = null;

    if (token) {
        try {
            const decoded = jwt.verify(token, 'mk');
            const user = await Account.findById(decoded._id);
            if (user) {
                res.locals.user = {
                    username: user.username,
                    role: user.role
                };
            }
        } catch (err) {
            console.error('Token không hợp lệ:', err.message);
        }
    }

    next();
}

module.exports = showUser;
