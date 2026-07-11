const { jwtVerify, SignJWT } = require('jose');

const SECRET_STR = process.env.JWT_SECRET || 'dev-only-secret-change-me';
const SECRET = new TextEncoder().encode(SECRET_STR);

const signToken = async (payload, { expiresIn = '7d' } = {}) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET);

const authenticateJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice('Bearer '.length);
  try {
    const { payload } = await jwtVerify(token, SECRET);
    req.user = payload; // { id, username, iat, exp }
    next();
  } catch (_err) {
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = { authenticateJwt, signToken, SECRET };
