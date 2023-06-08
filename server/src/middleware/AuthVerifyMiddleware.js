const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['token'];

    if (!token) {
        return res.status(401).json({ status: 'unauthorized' });
    }

    jwt.verify(token, 'SecretKey123456789', (err, decoded) => {
        if (err) {
            // console.log(token);
            return res.status(401).json({ status: 'unauthorized' });
        }

        const email = decoded.email;

        if (!email) {
            return res.status(401).json({ status: 'unauthorized' });
        }

        console.log(email);
        req.headers.email = email;

        next();
    });
};
