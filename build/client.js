'use strict';
var ip = require("ip");
var net = require('net'), readline = require('readline'), client = new net.Socket(), io = readline.createInterface(process.stdin, process.stdout);
client.on('data', function (data) {
    console.log("data recieved: " + data + "\n");
});
client.on('close', function () {
    console.log("server closed");
    process.exit(0);
});
var HOST = ip.address();
var PORT = 3000;
client.connect(PORT, HOST, function () {
    console.log("connected to: " + HOST + ":" + PORT);
    client.write("Hello server, I'm the client!");
});
