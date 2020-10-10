const router = require('express').Router();
const justify = require('../bin/justify');
const abort = require('../bin/abort');
const generateToken = require('../bin/generateToken');
const auth = require('../bin/auth');

router.post('/justify', auth, (req, res) => {
  const data = req.body;
  let justifiedText;

  if (Object.keys(data).length === 0) {
    return abort.badRequest(res);
  }

  try {
    justifiedText = justify(data, req.app.locals.email);
  } catch (e) {
    if (e.message === 'Qota limit reached') {
      return abort.paymentRequired(res);
    } else {
      return abort.internalServer(res, 'Internal Server Error');
    }
  }

  return res.json({
    success: true,
    data: justifiedText
  });
});

router.post('/token', (req, res) => {
  const { email } = req.body;
  let token;

  try {
    token = generateToken(email);
  } catch (e) {
    if (e.message === 'Invalid email address') {
      return abort.badRequest(res);
    } else {
      return abort.internalServer(res, e.message); //We are sending the exact message for debugging purposes only
    }
  }

  return res.json({
    success: true,
    token
  });
});

router.all('*', ({ res }) => {
  return abort.notFound(res);
});

module.exports = router;
