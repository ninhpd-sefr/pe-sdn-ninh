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

const checkLoginApi = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verifyToken(token);
    if (!payload) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();

}

module.exports = {
    checkIsLogin,
    checkLoginApi
}