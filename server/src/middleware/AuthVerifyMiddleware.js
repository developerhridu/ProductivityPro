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

        const userID = decoded.userID;

        if (!userID) {
            return res.status(401).json({ status: 'unauthorized' });
        }

        console.log(userID);
        req.headers.userID = userID;

        next();
    });
};
