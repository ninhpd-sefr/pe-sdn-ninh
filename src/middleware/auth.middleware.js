const jwt = require('../helper/jwt.helper');

const checkIsLogin = async (req, res, next) => {
    try {
        const token = req.session.token;
        console.log(token)
        if (!token) {
            res.redirect('/login');
            return;
        }
        const payload = await jwt.verifyToken(token);
        if (!payload) {
            res.redirect('/login');
            return;
        }
        return next();
    } catch (error) {
        res.render('error', {
            message: error.message,
        });
    }
}

module.exports = {
    checkIsLogin
}