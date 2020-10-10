const crypto = require('crypto');
const store = require('../data/store');

module.exports = email => {
  if (!/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
    throw new Error('Invalid email address');
  }

  if (store.containsEmail(email)) {
    return store.getToken(email);
  }

  const newToken = crypto.randomBytes(20).toString('hex');
  store.addToken(email, newToken);

  return newToken;
};
