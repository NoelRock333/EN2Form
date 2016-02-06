var express = require('express');
var router = express.Router();
var extend = require('util')._extend;
var moment = require('moment');
var utils = require('../lib/utils');
var passwordHash = require('password-hash');


router.get('/pacientes', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.find({}, function(err, data){
		if(err) return res.send(err);
		res.render('pacientes/pacientes', { user: req.session.user, pacientes: data });
	});
});

router.post('/pacientes', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.run("SELECT * FROM ca_pacientes WHERE lower(nombre_completo) LIKE '%"+req.body.query.toLowerCase()+"%'", function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.get('/paciente/:id/edit', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		data.fecha_nacimiento = (data.fecha_nacimiento) ? moment(data.fecha_nacimiento).format('DD/MM/YYYY').toString() : '';
		res.render('pacientes/paciente', { user: req.session.user, paciente: data });
	});
});

router.get('/paciente/:id', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_pacientes.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.put('/paciente', utils.requireAuthorization, function(req, res, next) {
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

router.delete('/paciente', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ma_endodoncia.find({ id_paciente: req.body.id }, function(err, expedientes){
		if(err) return res.json(err);
		if(expedientes.length > 0){
			res.json({message: "Existen expedientes ligados a ese usuario"});
		}
		else {
			db.ca_pacientes.destroy({ id: req.body.id }, function(err, data){
				if(err) return res.json(err);
				res.json(data);
			});
		}
	});
});
module.exports = router;