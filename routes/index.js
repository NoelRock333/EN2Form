var express = require('express');
var router = express.Router();
var extend = require('util')._extend;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form/expediente', { title: 'Express' });
});


/*POST Form*/
router.post('/save', function(req, res, next){
	var db = req.app.get('db');
	var expediente = {
		ids_problemas: req.body.problemas,
		ids_alergias: req.body.alergias,
		ids_antecedentes_del_diente: req.body.antecendentes_diente,
		otro_antecedentes_del_diente: req.body.otro_antecedente,
		ids_examen_clinico: req.body.examen_clinico,
		ids_pulpa: req.body.pulpa,
		ids_palpitacion_periapcial: req.body.palpacion_periapical,
		ids_conducto_radicular_rx: req.body.conducto_radicular,
		ids_zona_periapcial_rx: req.body.zona_periapical,
		ids_diagnostico_pulpar: req.body.diagnostico_pulpar,
		ids_diagnostico_periapcial_presuncion: req.body.diagnostico_periapical_presuncion,
		ids_interencion_indicada: req.body.intereccion_indicada
	};
	expediente = extend(expediente,req.body);

	db.ma_endodoncia.insert(expediente, function(err, data){
		if(err) return res.send(err);
		res.send(data);
	});
});

router.get('/index/ejemplo', function(req, res, next) {
  res.render('form/ejemplo', { title: 'Formulario Ejemplo' });
});

router.post('/index/save-form', function(req, res, next) {
	var db = req.app.get('db');
	db.ma_endodoncia.insert(req.body, function(err, data){
		if(err) return res.send(err);
		res.send(data);
	});
});

module.exports = router;
