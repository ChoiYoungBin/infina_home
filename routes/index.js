var express = require('express');
var i18n = require('i18n');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  title_msg = i18n.__('hello');
  res.render('index', { title: 'Express:' + title_msg });
});

router.get('/first', function(req, res, next) {
  res.render('index', { title: 'Express First' });
});

module.exports = router;
