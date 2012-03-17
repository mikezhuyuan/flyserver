var fs = require('fs'), 
    mime = require('../mime.js')
    path = require('path');

module.exports = function (base) {
    base = base || __dirname;
    return function (req, res, next) {
        var pathname = req.url.pathname, ext = path.extname(path).toLowerCase();

        fs.readFile(base + pathname, function (err, data) {
            if (err) {
                return next({ "code": 404, "err": err });
            }

            res.writeHead(200, { "Content-Type": mime[ext] });
            res.end(data);
        });
    };
};