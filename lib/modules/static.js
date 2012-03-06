var fs = require('fs'), 
    mime = require('../mime.js');

module.exports = function(base){
	base = base || __dirname;
	return function (req, res, next) {
		var path = req.path;

		fs.readFile(base + path, function (err, data) {
			if (err) {
				req.err = { "code": 404, "err": err };
				return next();
			}

			res.writeHead(200, { "Content-Type": mime[req.ext.toLowerCase()] });
			res.end(data);
		});
	}
};