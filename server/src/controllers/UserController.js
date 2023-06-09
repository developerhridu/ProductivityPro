const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");

const usersFilePath = path.join(__dirname, '../database/users.json');

exports.registerUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        const users = JSON.parse(data);
        if (users.some((user) => user.email === email)) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const newUser = {
            firstName,
            lastName,
            email,
            password,
        };
        users.push(newUser);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Registration successful!' });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        const users = JSON.parse(data);
        const user = users.find((user) => user.email === email && user.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        const payload = { email: user.email };
        const token = jwt.sign(payload, 'SecretKey123456789', { expiresIn: '24h' });

        return res.status(200).json({ message: 'Login successful!', token });
    });
};

exports.userProfileDetails = (req, res) => {
    const email = req.headers['email'];
    if (!email) {
        return res.status(400).json({ error: 'Email not provided in request headers.' });
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const users = JSON.parse(data);
        const user = users.find((user) => user.email === email);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ user });
    });
};

exports.userProfileUpdate = (req, res) => {
    const email = req.headers['email'];
    const reqBody = req.body;

    if (!reqBody || Object.keys(reqBody).length === 0) {
        return res.status(400).json({ error: 'Request body is empty.' });
    }
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        const users = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const updatedUser = { ...users[userIndex], ...reqBody };
        users[userIndex] = updatedUser;

        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Profile updated successfully!', user: updatedUser });
        });
    });
};


