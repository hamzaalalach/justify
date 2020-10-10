const router = require('express').Router();
const justify = require('../bin/justify');
const abort = require('../bin/abort');

router.post('/justify', (req, res) => {
  const data = req.body;
  res.send(justify(data));
});

router.all('*', ({ res }) => {
  abort.notFound(res);
});

module.exports = router;
