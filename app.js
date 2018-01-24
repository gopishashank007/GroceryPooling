var express = require('express');
var routes = require('./routes'); //express.Router();
var http = require('http');
var path = require('path');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var opn = require('opn');

//load customers route
//var customers = require('./routes/customers');
var account = require('./routes/account');
var location = require('./routes/location');
var trip = require('./routes/trip');
var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

app.set('port', process.env.PORT || 1234);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.bodyParser());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//app.use(express.urlencoded());
app.use(methodOverride());//'X-HTTP-Method-Override'
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(

    connection(mysql, {

        host: 'localhost', //'localhost',
        user: 'root',
      //  password: '',
        port : 3306, //port mysql
        database: 'rider'

    }, 'pool') //or single

);

//app.get('/', routes.index);
app.get('/', account.login);
app.post('/', account.checklogin);

app.get('/register', account.register);
app.post('/register', account.registersave);

app.get('/showrider', account.login);
app.get('/showdriver', account.login);
app.get('/showrider/:id', location.showrider);
app.get('/showdriver/:id', location.showdriver);

app.get('/showdriveraccept', trip.showaccept);
app.post('/showrider', trip.pending);
app.post('/showdriver', trip.request);
app.post('/showdriver/accept', trip.accept);


/*app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);*/

app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    opn('http://localhost:' + app.get('port') + '/');
});
