var app = require('../');

function init(route){
    route('GET', ['/user/', { firstname: /\w+/ }, '-', { lastname: /\w+/}], function (req, res, next) {	    	    
        res.end(JSON.stringify(req.params));
	});
}

app.configure(function(use){
    use(app.basic());
    use(app.static(__dirname));
    use(app.router(init));
    use(app.error());
})
.listen(8080);