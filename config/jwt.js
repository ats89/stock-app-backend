const jwt = require('jsonwebtoken');

const createToken = user => jwt.sign({
  id: user.id,
  username: user.username,
  admin: user.admin,
}, process.env.JWT_SECRET, { expiresIn: '1w' });

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
