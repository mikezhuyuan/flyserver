var http = require('http'),
    fs = require('fs');

var modules_folder = 'modules';

exports.configure = function (config) {
    var pipeline = [], server;

    config(function(module){
        pipeline.push(module);
    });

    server = http.createServer(function (req, res) {
        var i = 0, l = pipeline.length;

        function next(err) {
            if (i >= l) {
                res.writeHead(500);
                return res.end();
            }

            pipeline[i++](req, res, next);
        }

        next();
    });

    return server;
};

fs.readdirSync(__dirname + '/'+modules_folder+'').forEach(function (filename) {
    if (/\.js$/.test(filename)) {
        var name = filename.substr(0, filename.lastIndexOf('.'));
        exports.__defineGetter__(name, function () {
            return require('./'+modules_folder+'/' + name);
        });
    }
});