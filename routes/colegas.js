var express = require('express');
var router = express.Router();
var extend = require('util')._extend;
var moment = require('moment');
var utils = require('../lib/utils');
var passwordHash = require('password-hash');

router.get('/colegas', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.find({}, function(err, data){
		if(err) return res.send(err);
		res.render('tables/colegas', { user: req.session.user, colegas: data });
	});
});

router.post('/colegas', function(req, res, next) {
	var db = req.app.get('db');
	db.run("SELECT * FROM ca_colegas WHERE lower(nombre_completo) LIKE '%"+req.body.query.toLowerCase()+"%'", function(err, data){
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

router.delete('/colega', function(req, res, next) {
	var db = req.app.get('db');
	db.ca_colegas.destroy({ id: req.body.id }, function(err, data){
		if(err) return res.json(err);
		res.json(data);
	});
});

module.exports = router;