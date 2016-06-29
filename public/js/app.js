/**
 * Created by matheus on 28/06/16.
 */
(function (io, document) {
    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function (data) {
        console.log('Conexão online!');
    });

    socket.on('feedback', function(data) {
        console.log('O robo está: ' + data);
    });

    var inputComandos = document.getElementById('comandos');
    var botaoAndar = document.getElementById('andar');
    var botaoProcurar = document.getElementById('procurar');
    var botaoEnviar = document.getElementById('enviar');
    var comandos = [];

    botaoAndar.onclick = function () {
        inputComandos.value = inputComandos.value += 'A';
        comandos.push('andar');
    };

    botaoProcurar.onclick = function () {
        inputComandos.value = inputComandos.value += 'P';
        comandos.push('procurar');
    };

    botaoEnviar.onclick = function () {
        inputComandos.value = "";
        socket.emit('comandos', comandos);
    };
})(io, document);