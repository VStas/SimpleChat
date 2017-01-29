var koa = require('koa');
var koaStatic = require('koa-static');

var app = koa();

app.use(koaStatic('web/dist'));

app.use(function *() {
    this.body = 'Hello!';
});

app.listen(3000);
