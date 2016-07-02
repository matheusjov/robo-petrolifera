/**
* Created by matheus on 28/06/16.
*/
'use strict';

(function (io, document) {
  var socket = io.connect('http://localhost:3000');

  var inputFeedback = document.getElementById('feedback');
  var inputComandos = document.getElementById('comandos');
  var botaoAndar = document.getElementById('andar');
  var botaoProcurar = document.getElementById('procurar');
  var botaoEnviar = document.getElementById('enviar');
  var gifanda = document.getElementById('gifanda');
  var gifprocura = document.getElementById('gifprocura');
  var gifocupado = document.getElementById('gifocupado');
  var gifrecuperado = document.getElementById('gifrecuperado');
  var gifcheio = document.getElementById('gifcheio');
  var gifextrair = document.getElementById('gifextrair');
  var comandos = [];

  gifanda.style.display = "none";
  gifprocura.style.display = "none";
  gifocupado.style.display = "none";
  gifrecuperado.style.display = "none";
  gifcheio.style.display = "none";
  gifextrair.style.display = "none";

  socket.on('connect', function (data) {
    console.log('Conexão online!');

    socket.emit('statusInicial', '');

  });

  socket.on('feedback', function(data) {
    if (data == "andar") {
      gifanda.style.display = "block";
      gifprocura.style.display = "none";
      gifocupado.style.display = "none";
      gifrecuperado.style.display = "none";
      gifextrair.style.display = "none";
      var feed = "Andando";
    } else if (data == "procurar") {
      gifanda.style.display = "none";
      gifprocura.style.display = "block";
      gifocupado.style.display = "none";
      gifrecuperado.style.display = "none";
      gifextrair.style.display = "none";
      feed = "Procurando";
    } else if (data == "extrair") {
      gifanda.style.display = "none";
      gifprocura.style.display = "none";
      gifocupado.style.display = "none";
      gifrecuperado.style.display = "none";
      gifextrair.style.display = "block";
      feed = "Extraindo"
    } else if (data == "recuperar"){
      gifanda.style.display = "none";
      gifprocura.style.display = "none";
      gifocupado.style.display = "none";
      gifrecuperado.style.display = "block";
      gifextrair.style.display = "none";
      feed = "Recuperando";
    } else if (data == "Ocupado!") {
      gifanda.style.display = "none";
      gifprocura.style.display = "none";
      gifocupado.style.display = "block";
      gifrecuperado.style.display = "none";
      gifcheio.style.display = "none";
      gifextrair.style.display = "none";
      feed = "Ocupado";
    } else if (data == "cheio") {
      gifanda.style.display = "none";
      gifprocura.style.display = "none";
      gifocupado.style.display = "none";
      gifrecuperado.style.display = "none";
      gifcheio.style.display = "block";
      gifextrair.style.display = "none";
      botaoAndar.disabled = true;
      botaoProcurar.disabled = true;
      botaoEnviar.disabled = true;
      feed = "Cheio"
    } else if (data == 'teste'){
      feed = 'charles';
    }

    inputFeedback.innerHTML  = 'O robô está: ' + feed;
    console.log('O robo está: ' + data);
  });

  botaoAndar.onclick = function () {
    inputComandos.value = inputComandos.value += 'A';
    comandos.push('andar');
  };

  botaoProcurar.onclick = function () {
    inputComandos.value = inputComandos.value += 'P';
    comandos.push('procurar');
  };

  botaoEnviar.onclick = function () {
    if (inputComandos.value != "") {
      socket.emit('comandos', comandos);
      inputComandos.value = "";
      comandos = [];
    }else{
      alert("informe os comandos")
    }
  };

})(io, document);
