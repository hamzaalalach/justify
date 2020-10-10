const router = require('express').Router();
const justify = require('../bin/justify');

router.post('/justify', (req, res) => {
  const data = req.body;
  res.send(justify(data));
});

module.exports = router;
