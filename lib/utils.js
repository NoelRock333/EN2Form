//var authToken = require('./auth-token');

module.exports = {
	requireAuthorization: function requireAuthorization(req, res, next) {
		var app = require('../app');
		var db = app.get('db');
		try {
			if(req.session.user){
				next();
			}
			else{
				res.redirect('/login');
			}
			/*var header = req.header('Authorization');
			var token = header.split(' ')[1];
			var payload = authToken.decode(token);
			db.users.findOne(payload.user_id, function (err, user) {
				if (err || !user) throw new Error(header);

				req.user = user;
				next();
			});*/
		} catch (e) {
			console.error('Invalid authorization token. ', e.message);
			res.redirect('/login');
			//next({status: 401});
		}
	},
	merge: function merge() {
		var dest = arguments[0];
		var length = arguments.length;
		var source;

		for (var i = 1;  i < length; i++) {
			source = arguments[i];
			Object.keys(source).forEach(function (k) {
				dest[k] = source[k];
			});
		}

		return dest;
	},
};