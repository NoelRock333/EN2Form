var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form/expediente', { title: 'Express' });
});

router.get('/index/ejemplo', function(req, res, next) {
  res.render('form/ejemplo', { title: 'Formulario Ejemplo' });
});

router.post('/index/save-form', function(req, res, next) {
  var db = req.app.get('db');
  db.ma_endodoncia.insert(req.body, function(err, data){
    if(err) return res.send(err);
    res.send(req.body);
  });
});

module.exports = router;
