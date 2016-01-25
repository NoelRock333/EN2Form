var jwt = require('jwt-simple');

module.exports = {
  encode: function encode(payload) {
	payload.exp == payload.exp || moment().add('days', 7).valueOf();

	return jwt.encode(payload, process.env.JWT_SECRET);
  },

  decode: function decode(token) {
	return jwt.decode(token, process.env.JWT_SECRET);
  }
};