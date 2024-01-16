// middleware/authMiddleware.js
require('dotenv').config
const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const storedToken = await Token.findOne({ where: { userId: decoded.userId, token } });

    if (!storedToken) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach the user information to the request for further processing
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = { authenticateToken };
