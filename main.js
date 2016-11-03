/* First script in learning nodejs*/

var http = require("http");
var express = require("express");
var fs = require("fs");

var events = require("events");

http.createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200: OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send response body
    response.end('Hello World, Bitches!')
}).listen(8081);

// Initial message of the server
console.log("Server running at http://127.0.0.1:8081/");

var data = fs.readFile('text.txt', function(err, data) {
    if (err) {
        console.log(err.stack);
        return console.error(err);
    }

    console.log(data.toString());
});

console.log('THE END');


// Events tuto
// creating an event emitter object
var eventEmitter = new events.EventEmitter();

// creating a event handler
var connectHandler = function connected() {
    console.log('connection succesful.');

    // Firing the data_received event
    eventEmitter.emit('data_received');
}

// bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

// bind the data_received event with anonymous function
eventEmitter.on('data_received', function() {
    console.log('data received succesfully.');
});

// firing the connection event
eventEmitter.emit('connection');
console.log('End of program!');





console.log('###### Start of listeners example! ######')
// listener 1
var listener1 = function listener1() {
    console.log('listener1 executed');
}

// listener 2
var listener2 = function listener2() {
    console.log('listener2 executed');
}

// bind the connection event with the listener1 function
eventEmitter.addListener('connection', listener1);

// bind the connection event with the listener2 function
eventEmitter.on('connection', listener2);


var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " Listeners listening to connection event");


// Fire connection event
eventEmitter.emit('connection');

// Remove the biding of listener1 function
eventEmitter.removeListener('connection', listener1);
console.log('Listener1 will not listen now.');

//Fire the connection event
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " Listeners listening to connection event");

console.log('###### END OF EXAMPLE #######');

console.log('###### START BUFFER EXAMPLE #######');
buf = new Buffer(256);
len = buf.write("Simply Easy Learning");
console.log("Octets written: " + len);

console.log(buf.toString('ascii'));
console.log(buf.toString('ascii', 0, 5));
console.log(buf.toString('utf8', 0, 5));
console.log(buf.toString(undefined, 0, 5));

var json = buf.toJSON(buf);
// console.log(json);


var buff1 = new Buffer('Primeira parte ');
var buff2 = new Buffer('Segunda parte');
var buff3 = Buffer.concat([buff1, buff2]);
console.log('buff3 content: '+ buff3.toString());

console.log('###### END BUFFER EXAMPLE #######');
console.log('###### START STREAM EXAMPLE #######');
var data = '';

var readerStream = fs.createReadStream('text.txt');
readerStream.setEncoding('UTF8');

readerStream.on('data', function(chunk) {
    data += chunk;
});

readerStream.on('end', function() {
    console.log('stream received: ' + data);
});

readerStream.on('error', function(err) {
    console.log(err.stack);
});

console.log('###### END STREAM EXAMPLE #######');

console.log('###### BEGIN WRITE TO STREAM EXAMPLE #######');
var writerStream = fs.createWriteStream('output.txt');
data = 'New data different from ipsum lorien'
writerStream.write(data, 'UTF8');
writerStream.end();

// handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log('Write completed.');
});

writerStream.on('error', function(err) {
    console.log(err.stack);
});

console.log('###### END WRITE TO STREAM EXAMPLE #######');

console.log('###### BEGIN PIPING STREAM EXAMPLE #######');
writerStream = fs.createWriteStream('output.txt');
readerStream.pipe(writerStream);
writerStream.end();
console.log('###### END PIPING STREAM EXAMPLE #######');