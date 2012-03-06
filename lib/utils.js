var toString = Object.prototype.toString;

exports.extends = function(a, b) {
	a = a || {};
	for(var p in b)
		if(!(p in a))
			a[p] = b[p];
	
	return a;
};

exports.isArray = function(obj){
	return toString.call(obj) === '[object Array]';
};

exports.isString = function(obj){
	return toString.call(obj) === '[object String]';
};

exports.isDate = function(obj){
	return toString.call(obj) === '[object Date]';
};

exports.isRegExp = function(obj){
    return toString.call(obj) === '[object RegExp]';
};

exports.toArray = function(args){
    return Array.prototype.slice.apply(args);
};