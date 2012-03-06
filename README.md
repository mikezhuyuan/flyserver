# Fly server

  Fly server is a very simple HTTP server to be used for quick testing purposes. It is only designed for developers in production environment.
  It has modules to extend its behaviors like static files, router etc.
  
```js
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
```