var express = require('express');
var router = express.Router();
var extend = require('util')._extend;
var moment = require('moment');
var utils = require('../lib/utils');
var passwordHash = require('password-hash');

router.get('/colegas', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.find({}, function(err, data){
		if(err) return res.send(err);
		res.render('colegas/colegas', { user: req.session.user, colegas: data });
	});
});

router.post('/colegas', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.run("SELECT * FROM ca_colegas WHERE lower(nombre_completo) LIKE '%"+req.body.query.toLowerCase()+"%'", function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

/*router.get('/colega', utils.requireAuthorization, function(req, res, next) {
	res.render('colegas/agregar');
});*/

router.get('/colega/:id/edit', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.send(err);
		res.render('colegas/editar', { user: req.session.user, colega: data });
	});
});

router.get('/colega/:id', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.findOne({ id: req.params.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.put('/colega', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.update(req.body, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

router.delete('/colega', utils.requireAuthorization, function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.destroy({ id: req.body.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

module.exports = router;