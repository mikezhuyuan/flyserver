var utils = require('../utils');

var router = module.exports = function (init) {
    var routes = [];

    init(function () { //normalize
        var args = utils.toArray(arguments);
        //['/url'], function
        if (utils.isArray(args[0]))
            args.shift(null);

        //'GET', 'url', function
        if (!utils.isArray(args[1]))
            args.splice(1, args.length -2, args.slice(1, args.length - 1));
        
        routes.push(args);
    });

    return function (req, res, next) {
        var i, l, m, route, method, callback, patterns;

        for (i = 0, l = routes.length; i < l; i++) {
            route = routes[i];
            method = route[0], patterns = route[1], callback = route[2];

            if ((method === '*' || ~method.indexOf(req.method)) 
                && (m = match(req.url.pathname, patterns))) {

                req.params = utils.extends(req.params, m);
                callback(req, res, next);
                
                return;
            }
        }

        next();
    };
};

function getRegex(obj) {
    if (utils.isRegExp(obj))
        return [null, obj];

	for(var p in obj)
		return [p, obj[p]];
}

function match(str, patterns){
	var i,l,m, v, pattern, r = {};

	for (i = 0, l = patterns.length; i < l; i++) {
	    pattern = patterns[i];
	
	    if (utils.isString(pattern)) {
	        if (str.indexOf(pattern) !== 0)
	            return false;

	        str = str.substring(pattern.length);
	    } 
        else {
            v = getRegex(pattern);
	        if (!(m = v[1].exec(str)))
	            return false;
	        
	        v[0] && (r[v[0]] = m[0]);
	        str = str.substring(m[0].length);
	    }
	}
	
	return str.length > 0 ? false : r;
}