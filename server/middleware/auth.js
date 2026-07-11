const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice('Bearer '.length);
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid or expired token' });
    }
    req.user = payload; // { id, username }
    next();
  });
};

module.exports = { authenticateJwt, SECRET };
