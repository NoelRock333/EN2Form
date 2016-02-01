var express = require('express');
var router = express.Router();
var extend = require('util')._extend;
var moment = require('moment');
var utils = require('../lib/utils');
var passwordHash = require('password-hash');

//Formulario para llenar expediente de Endodocia
router.get('/', utils.requireAuthorization, function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user });
});

router.get('/expediente', utils.requireAuthorization, function(req, res, next) {
  res.render('form/expediente', { title: 'Expediente', user: req.session.user });
});

//Muestra formulario de login
router.get('/login', function(req, res, next) {
	res.render('form/login', { title: 'EN2Cloud login' });
});

//Crea sesión
router.post('/login', function(req, res, next) {
	var db = req.app.get('db');
	if(!req.body.email) return res.redirect('/login');
	db.ca_usuarios.findOne({ email: req.body.email }, function(err, user){
		if(err) return res.redirect('/login');
		if(passwordHash.verify('password123', user.password)){
			req.session.user = user;
			res.redirect('/');
		}
		else{
			res.redirect('/login');
		}
	});
});

//Destruye sesión
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/login');
	});
});

/*POST Form*/
router.post('/save', utils.requireAuthorization, function(req, res, next){

	function fillArray(name){
		var newArray = [];
		for(var i=0;i<4;i++){
			var property_name = name+"_"+(i+1);
			if(req.body[property_name])
				newArray.push(req.body[property_name]);
			else
				newArray.push("");
		}
		return newArray;
	}

	function toArray(variable){
		if(variable.constructor === Array){
			return variable;
		}
		else{
			var myArray = [variable];
			return myArray;
		}
	}

	var db = req.app.get('db');
	var expediente = {
		id_paciente: 		req.body.id_paciente,
		anestecia_previa: 	req.body.anestecia_previa || false,
		fecha_expediente: 	req.body.fecha_expediente ? moment(req.body.fecha_expediente, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
		id_referencia: 		req.body.id_referencia || null,
		edad_paciente: 		req.body.edad_paciente || null,
		piezas_dentales: 	req.body.piezas_dentales ? toArray(req.body.piezas_dentales.split(',')) : null,
		ids_alergias: 		req.body.alergias ? toArray(req.body.alergias) : null,
		otra_alergia: 		req.body.otra_alergia || null,
		enfermedad_dolores: req.body.enfermedad_dolores || null, 
		ultimos_medicamentos: req.body.ultimos_medicamentos || null,
		
		ids_problemas: 					req.body.problemas ? toArray(req.body.problemas) : null,
		ids_antecedentes_del_diente: 	req.body.antecendentes_diente ? toArray(req.body.antecendentes_diente) : null,
		otro_antecedentes_del_diente: 	req.body.otro_antecedente || null,
		ids_examen_clinico: 			req.body.examen_clinico ? toArray(req.body.examen_clinico) : null,
		ids_pulpa: 						req.body.pulpa ? toArray(req.body.pulpa) : null,
		ids_palpitacion_periapcial: 	req.body.palpacion_periapical ? toArray(req.body.palpacion_periapical) : null,
		ids_conducto_radicular_rx: 		req.body.conducto_radicular ? toArray(req.body.conducto_radicular) : null,
		ids_zona_periapcial_rx: 		req.body.zona_periapical ? toArray(req.body.zona_periapical) : null,
		ids_diagnostico_pulpar: 		req.body.diagnostico_pulpar ? toArray(req.body.diagnostico_pulpar) : null,
		ids_diagnostico_periapcial_presuncion: req.body.diagnostico_periapical_presuncion ? toArray(req.body.diagnostico_periapical_presuncion) : null,
		ids_interencion_indicada: 		req.body.intereccion_indicada ? toArray(req.body.intereccion_indicada) : null,
		
		conducto_unico: 			fillArray("conducto_unico"),
		conducto_mesio_vestibular: 	fillArray("conducto_mesio_vestibular"),
		conducto_disto_vestibular: 	fillArray("conducto_disto_vestibular"),
		conducto_distal: 			fillArray("conducto_distal"),
		conducto_mesio_lingual: 	fillArray("conducto_mesio_lingual"),
		conducto_palatino: 			fillArray("conducto_palatino"),
		conducto_vestibular: 		fillArray("conducto_vestibular"),
		conducto_mv2: 				fillArray("conducto_MV2"),
		conducto_disto_lingual: 	fillArray("conducto_disto_lingual"),
		conducto_mesial: 			fillArray("conducto_mesial"),

		pronostico: 			req.body.pronostico || false,
		nota_evolucion: 		req.body.nota_evolucion || null,
		
		id_usuario: 		req.session.user.id,
		id_clinica: 		1, //Dejamos un numero por defecto para primera fase, pero debe cambiarse
		id_titular: 		1  //Dejamos un numero por defecto para primera fase, pero debe cambiarse
	};

	db.ma_endodoncia.insert(expediente, function(err, data){
		console.log(err);
		if(err) return res.send(err);
		res.send(data);
	});
});

router.post('/nuevo_paciente', function(req, res, next){
	var db = req.app.get('db');
	req.body.fecha_nacimiento = req.body.fecha_nacimiento ? moment(req.body.fecha_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
	req.body.nombre_completo = `${req.body.nombre} ${req.body.apellido_paterno} ${req.body.apellido_materno}`.trim();
	db.ca_pacientes.insert(req.body, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.post('/nuevo_colega', function(req, res, next){
	var db = req.app.get('db');
	req.body.nombre 			= req.body.nombre || null;
	req.body.apellido_paterno 	= req.body.apellido_paterno || null;
	req.body.nombre_completo 	= `${req.body.nombre} ${req.body.apellido_paterno} ${req.body.apellido_materno}`.trim();
	db.ca_colegas.insert(req.body, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});




router.get('/colegas', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.find({}, function(err, data){
		if(err) return res.send(err);
		res.render('tables/colegas', { user: req.session.user, colegas: data });
	});
});

router.post('/colegas', function(req, res, next) {
	var db = req.app.get('db');
	db.run("SELECT * FROM ca_colegas WHERE lower(nombre_completo) LIKE '%"+req.body.query+"%'", function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.get('/colega/:id/edit', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.send(err);
		res.render('editors/colega', { user: req.session.user, colega: data });
	});
});

router.get('/colega/:id', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.put('/colega', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.update(req.body, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});



router.get('/pacientes', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.find({}, function(err, data){
		if(err) return res.send(err);
		res.render('tables/pacientes', { user: req.session.user, pacientes: data });
	});
});
router.post('/pacientes', function(req, res, next) {
	var db = req.app.get('db');
	db.run("SELECT * FROM ca_pacientes WHERE lower(nombre_completo) LIKE '%"+req.body.query+"%'", function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.get('/paciente/:id/edit', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		data.fecha_nacimiento = (data.fecha_nacimiento) ? moment(data.fecha_nacimiento).format('DD/MM/YYYY').toString() : '';
		res.render('editors/paciente', { user: req.session.user, paciente: data });
	});
});

router.get('/paciente/:id', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.put('/paciente', function(req, res, next) {
	var db = req.app.get('db');
	req.body.nombre 			= req.body.nombre || null;
	req.body.apellido_paterno 	= req.body.apellido_paterno || null;
	req.body.nombre_completo 	= `${req.body.nombre} ${req.body.apellido_paterno} ${req.body.apellido_materno}`.trim();
	req.body.fecha_nacimiento = (req.body.fecha_nacimiento) ? moment(req.body.fecha_nacimiento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
	db.ca_pacientes.update(req.body, function(err, data){
		if(err) return res.json(err);
		res.json(data);
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
