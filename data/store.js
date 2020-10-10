const store = function() {
  var data = {};

  const addToken = function(email, token) {
    data[email] = {
      ...data[email],
      token
    };
  };

  const getToken = function(email) {
    return data[email].token;
  };

  const containsEmail = function(email) {
    return email in data;
  };

  const containsToken = function(token) {
    for (let email in data) {
      if (token === data[email].token) {
        return email;
      }
    }
    return false;
  };

  const getCount = function(email) {
    return data[email].count || 0;
  };

  const setCount = function(email, count) {
    data[email].count = count;
  };

  return {
    addToken,
    getToken,
    containsEmail,
    containsToken,
    getCount,
    setCount
  };
};

module.exports = store();
