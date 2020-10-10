const abort = require('./abort');
const store = require('../data/store');

module.exports = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    return abort.unauthorized(res, 'Authorization header is expected');
  }

  const parts = auth.split(' ');
  if (parts[0].toLowerCase() !== 'bearer') {
    return abort.unauthorized(res, 'Authorization header must start with Bearer');
  } else if (parts.length === 1) {
    return abort.unauthorized(res, 'Token not found');
  } else if (parts.length > 2) {
    return abort.unauthorized(res, 'Authorization header must be bearer token');
  }

  const token = parts[1];
  const email = store.containsToken(token);
  if (email) {
    req.app.locals.email = email;
    next();
  } else {
    req.app.locals.email = '';
    return abort.unauthorized(res, 'Expired or invalid token');
  }
};
