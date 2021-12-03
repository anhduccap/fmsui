const jwt = require('jsonwebtoken');

exports.checkToken = async (req, res, next) => {
    let token = req.cookies['auth-token'];
    if(!token) {
        return res.redirect('/auth');
    }
    try{
        let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.member_id = decoded.data.member_id;
        req.role = decoded.data.role;
        next();
    }
    catch(err) {
        next(err);
        return res.redirect('/auth');
    }
}