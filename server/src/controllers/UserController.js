const path = require('path');
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../database/users.json');

exports.registerUser = (req, res) => {
    // Extract data from the request body
    const { firstName, lastName, email, password } = req.body;

    // Validate form fields
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Read the existing data from the JSON file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // Parse the JSON data
        const users = JSON.parse(data);

        // Check if the user already exists
        if (users.some((user) => user.email === email)) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Create a new user object
        const newUser = {
            firstName,
            lastName,
            email,
            password,
        };

        // Add the new user to the array
        users.push(newUser);

        // Write the updated data back to the JSON file
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Registration successful!' });
        });
    });
};
