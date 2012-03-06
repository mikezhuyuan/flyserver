var parse = require('url').parse,
    path = require('path');

module.exports = function(){
	return function (req, res, next) {
		req.path = parse(req.url).pathname;
		req.ext = path.extname(req.path);

		next();
	};
};