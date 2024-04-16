const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // res.json({ msg: res.headers['authorization'] });
    if (req.headers['authorization']) { // Use square brackets to access header value
        const token = req.headers['authorization']; // Use square brackets to access header value
        if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let role = decoded.user.role;
            console.log(role);
            if(role !== 'user'){
                return res.status(401).json({ error: 'Access denied' });
            }else{
                req.userId = decoded.user.id; // for use in dashboard and other controller after login
                next();
            }
        } catch (error) {
            res.status(401).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'You don\'t have any access this route. Please contact with admin to grant access.' });
    }
};

module.exports = verifyToken;