var error = module.exports = function() {
	return function (req, res, next) {
		if (req.err) {
			console.dir(req.err);
			res.writeHead(req.err.code || 500);
			return res.end();
		}
		
		next();
	};
};