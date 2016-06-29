/**
* Created by matheus on 28/06/16.
*/
'use strict';

let express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    roboto = require('./model/roboto'),
    CentroComando = require('./model/centro-comando');

app.use('/', express.static('public'));

io.on('connection', function(client) {
  console.log('Nova conexão');

  let centroComando = new CentroComando(client.id, roboto);

  centroComando.onStatusChange = (comando) => {
    client.emit('feedback', comando);
  };

  client.on('comandos', function(comandos) {
    if(!centroComando.enviarComandos(comandos)) {
      client.emit('feedback', 'Ocupado!');
    }
  });

  client.on('disconnect', function () {
    centroComando.desconectar();
    console.log('Conexão encerrada');
  });
});

server.listen(3000, function () {
  console.log('Centro de controne disponível na porta 3000!');
});
