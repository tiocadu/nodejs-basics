var http = require('http');
var fs = require('fs');
var url = require('url');

// create a server
http.createServer( function(request, response) {
    // parse the request containing file name
    var pathname = url.parse(request.url).pathname;

    // print the name of the file for which request is made
    console.log('Request for ' + pathname + ' received.');

    // read the requested file content from file system
    fs.readFile(pathname.substr(1), function (err, data) {
        if(err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // Write the content of the file to response body
            response.write(data.toString());
        }

        // send the response body
        response.end();
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');