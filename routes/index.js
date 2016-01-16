var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form/expediente', { title: 'Express' });
});

/*POST Form*/
router.post('/save', function(req, res, next){
	console.log(req);
	res.write("datos enviados");
});

module.exports = router;
