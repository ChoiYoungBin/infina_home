var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/FIRST', function(req, res, next) {
  res.send('respond with a resource FIRST...');
});

module.exports = router;
