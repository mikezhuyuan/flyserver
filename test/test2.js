var app = require('../');

function init(route){
    route('*', ['/user/', {id:/\d+/}], function (req, res, next) {
        console.log(req.params);
        console.log(req.body);
        res.end('<form action="/user/1"></form>');
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