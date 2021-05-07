var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'project'
});
connection.connect((error)=>{
    if(error){
        console.log(error)
    }else
    {
        console.log("mysql connected.....")
    }
});
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const publicDirectory =path.join(__dirname ,'./public');
console.log(__dirname);
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/prfile');
			} else {
				response.send( 'Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.get('/prfile', function(request, response) {
	if (request.session.loggedin) {
		response.send(`<h1 style="  color:gold; background: rgba(0, 0, 0, 0.1); text-align: center; margin: 350px 0;	" >Welcome to Username :` +request.session.username+`</h1>`);
		} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
app.post('/autho', function(request, response) {
    const {username ,email , password }=request.body;

		connection.query('insert into users set ?',{username:username ,email :email ,password:password}, function(error, results, fields) {
			if(error){
                console.log(error);
            }
            else
            {
                console.log('Account');
            }
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/index.html');
    		});
});
app.post('/act', function(request, response) {

var sql =" insert into produect values (null ,'"+ request.body.name +"','"+ request.body.address +"','"+ request.body.phone +"','"+ request.body.name_produect +"','"+ request.body.salary +"')";
connection.query(sql ,function(error, results, fields){
	if(error){
		console.log(error);
	}
	else
	{
		console.log('Account');
	}
	response.redirect('/index.html');
});
});



app.get('/index.html', function(request, response) {
    if (request.session.loggedin) {
        response.write()
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3001,()=>{
    console.log("server started on port 3001");
});