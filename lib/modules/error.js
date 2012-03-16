var error = module.exports = function() {
	return function (req, res, next) {
		if (req.err) {
			console.log(req.err);
			res.writeHead(req.err.code || 500);
			return res.end();
		}
		
		next();
	};
};