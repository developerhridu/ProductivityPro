import fs from 'fs';
import path from 'path';



const usersFilePath = path.resolve(__dirname, '/user.json');

export const registerUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Read existing user data from JSON file
    let users = [];
    try {
        users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    } catch (error) {
        console.error('Error reading user data from JSON file:', error);
    }

    // Check if email already exists
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists. Please choose a different email.' });
    }

    // Create user object
    const user = {
        id: generateID(),
        firstName,
        lastName,
        email,
        password,
    };

    // Add new user to the array
    users.push(user);

    // Save updated user array to JSON file
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf8');
        res.sendStatus(200);
    } catch (error) {
        console.error('Error writing user data to JSON file:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

// Helper function to generate a unique ID
function generateID() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

