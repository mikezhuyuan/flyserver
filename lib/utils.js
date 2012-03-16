var util = require('util');

var toString = Object.prototype.toString;

exports.extends = function(a, b) {
	a = a || {};
	for(var p in b)
		if(!(p in a))
			a[p] = b[p];
	
	return a;
};

exports.isArray = util.isArray;

exports.isString = function(obj){
	return toString.call(obj) === '[object String]';
};

exports.isDate = util.isDate;

exports.isRegExp = util.isRegExp;

exports.toArray = function(args){
    return Array.prototype.slice.apply(args);
};