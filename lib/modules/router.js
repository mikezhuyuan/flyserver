var utils = require('../utils');

var router = module.exports = function (init) {
    var routes = [];

    init(function () {
        var args = utils.toArray(arguments);
        if(args.length === 2)
            args.shift(null);

        routes.push(args);    
    });

    return function (req, res, next) {
        var i, l, m, route, method, callback, patterns;
        
        for (i = 0, l = routes.length; i < l; i++) {
            route = routes[i];
            method = routes[i][0];
            patterns = routes[i][1];
            callback = routes[i][2];
           
            if (method && method[0] !== '*' && !~method.indexOf(req.method))
                continue;

            if (m = match(req.path, patterns)) {
                
                req.params = utils.extends(req.params, m);
                callback(req, res, next);
                return;
            }
        }
        
        next();
    };
};

function getFirstProp(obj){
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
	    } else {
	        v = getFirstProp(pattern);
	        if (!(m = v[1].exec(str)))
	            return false;
	        
	        r[v[0]] = m[0];
	        str = str.substring(m[0].length);
	    }
	}
	
	return str.length > 0 ? false : r;
}