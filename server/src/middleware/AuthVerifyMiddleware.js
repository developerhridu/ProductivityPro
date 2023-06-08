const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['token'];

    jwt.verify(token, 'SecretKey123456789', (err, decoded) => {
        if (err) {
            console.log(token);
            res.status(401).json({ status: 'unauthorized' });
        } else {
            const email = decoded['data'];
            console.log(email);
            req.headers.email = email;

            // Generate a new token for the authenticated user
            const newToken = jwt.sign({ data: email }, 'SecretKey123456789', { expiresIn: '1h' });
            req.headers['token'] = newToken;

            next();
        }
    });
};
