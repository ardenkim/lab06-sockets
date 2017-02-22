"use strict";
var net = require("net");
var ip = require("ip");
;
var server = net.createServer();
var clients = [];
server.on('connection', function (socket) {
    clients.push(socket);
    socket.write('Hello you!\n');
    socket.on('data', function (data) {
        var echo = data.toString().toUpperCase();
        if (echo === 'EXIT') {
            socket.write("Goodbye!");
            socket.end();
        }
        else {
            socket.write("Did you say '" + echo + "'?");
        }
    });
    socket.on('close', function () {
        console.log("Connection closed");
    });
    function broadcast(message) {
        clients.forEach(function (client) {
            if (client !== socket)
                client.write(message);
        });
    }
});
server.on('listening', function () {
    var addr = server.address();
    console.log('server listening on port %d', addr.port);
});
server.listen({
    host: ip.address(),
    port: 3000
});
