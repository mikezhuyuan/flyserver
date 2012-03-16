var url = require('url');

module.exports = function () {
    return function (req, res, next) {
        req.originalUrl = req.url;
        req.url = url.parse(req.url, true);

        next();
    };
};