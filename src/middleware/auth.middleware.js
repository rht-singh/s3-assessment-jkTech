const { webToken } = require('../utils');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (token) {
        const { userId } = await webToken.verifyToken(token);
        if (userId) {
          req.userId = userId;
          next();
        } else res.json({ success: false, error: 'Invalid token' });
      } else res.json({ success: false, error: 'Unauthorized access' });
    } else res.json({ success: false, error: 'Unauthorized access' });
  } catch (err) {
    res.json({ success: false, error: 'Unauthorized access' });
  }
};

module.exports = auth;
