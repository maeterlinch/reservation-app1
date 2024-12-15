const jwt = require('jsonwebtoken');
const User = require('../model/user');
const config = require('../config');

function notAuthorized(res) {
  return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'You need to login!' }] });
}

exports.authMiddleware = async function(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return notAuthorized(res);
  }

  try {
    const decodedToken = jwt.verify(token.split(' ')[1], config.SECRET);
    const foundUser = await User.findById(decodedToken.userId);

    if (!foundUser) {
      return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'User does not exist!' }] });
    }

    next();
  } catch (err) {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] });
  }
};
