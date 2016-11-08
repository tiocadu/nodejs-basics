var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var fs = require('fs');

// Create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: false}));

var upload = multer({dest: '/tmp/'}).single('file');

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

app.post('/process_post', function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

// method to handle file upload
app.post('/file_upload', multer({ dest: '/tmp'}).single('file'), function (req, res) {
    console.log(JSON.stringify(req.file));
    console.log(req.file.filename);
    console.log(req.file.path);
    console.log(req.file.mimetype);
    var file = __dirname + '/' + req.file.filename;

    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            }else{
                response = {
                    message: 'File uploaded succesfully',
                    filename: req.file.filename
                };
            };
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

app.get('/', function (req, res) {
    console.log('Got a GET request for the homepage');
    res.send('Hello GET');
});

app.post('/', function (req, res) {
    console.log('Got a POST request for the homepage');
    res.send('Hello POST');
});

app.delete('/del_user', function (req, res) {
    console.log('Got a DELETE request for /del_user');
    res.send('Hello DELETE');
});

app.get('/list_user', function (req, res) {
    console.log('Got a GET request for /list_user');
    res.send('Page Listing');
});

app.get('/ab*cd', function (req, res) {
    console.log('Got a GET request for /ab*cd');
    res.send('Page Pattern Match');
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});