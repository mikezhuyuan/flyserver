var qs = require('querystring');

module.exports = function () {
    return function (req, res, next) {
        if (req.method === 'GET')
            return next();

        var buf = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) { buf += chunk });
        req.on('end', function () {
            var mime = req.headers['content-type'];

            if ('application/x-www-form-urlencoded' === mime)
                req.body = qs.parse(buf);
            else if('application/json' === mime)
                req.body = JSON.parse(buf);

            next();
        });
    };
};
