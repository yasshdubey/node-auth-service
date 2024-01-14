require('dotenv').config
const { User, Token } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        const { name, username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, username, password: hashedPassword });
            res.json({ user, message: 'User registered successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error registering user.' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Find the user by username in the database
            const user = await User.findOne({ where: { username, is_active: 1 } });

            // Check if the user exists
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            // Check if the passwords match
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate a new JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, { expiresIn: '1h' });

            // Store the token in the database
            await Token.create({ userId: user.id, token });

            // Respond with the token
            res.json({ user, token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new AuthController();
