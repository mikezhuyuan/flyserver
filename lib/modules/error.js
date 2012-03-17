var error = module.exports = function() {
	return function (err, req, res, next) {		
		res.writeHead( (err && err.code) || 500);
		res.end();
	};
};