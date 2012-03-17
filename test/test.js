var app = require('../');

function init(route){
    route('GET', ['/user/', {id:/\d+/}], function (req, res, next) {
        var id = req.params.id;
		res.writeHead(200, {"Content-Type":"text/html"});
        res.end('<form action="/user/'+id+'", method="POST"><input name="name" ><input type="submit" value="submit"></form>');
    });
	
	route('POST', ['/user/', {id:/\d+/}], function (req, res, next) {
		var name = req.body.name;
		res.end(name);
	});
}

app.configure(function (use) {
    use(app.url());
    use(app.body());
    use(app.static(__dirname));
    use(app.router(init));
    use(app.error());
})
.listen(8080);