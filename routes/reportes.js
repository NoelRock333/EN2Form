var express = require('express');
var router = express.Router();
var extend = require('util')._extend;
var moment = require('moment');
var utils = require('../lib/utils');
var passwordHash = require('password-hash');

router.get('/reportes/reporte', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_usuarios.find({}, function(err, usuarios){
		if(err) return next(err);
		res.render('reportes/reporte', { title: 'Reporte', user: req.session.user, usuarios: usuarios });
	});
});

router.get('/reportes/:id_usuario/count', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ma_endodoncia.find({ id_usuario: req.params.id_usuario }, function(err, expedientes){
		if(err) return next(err);
		if(expedientes)
			res.json({count: expedientes.length});
		else
			res.json({count: 0});
	});
});


module.exports = router;
