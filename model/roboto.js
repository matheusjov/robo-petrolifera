/**
* Created by matheus on 28/06/16.
*/
'use strict';

const _ENV = require('../env')
, _STATUS = require('./status')
, _COMANDOS = require('./comandos');

class Roboto {

  constructor() {
    this.carga = 0;
    this.filaDeComandos = [];
    this.centraisDeComandos = [];
    this.status = _STATUS.PRONTO;
    this.encontrouPetroleo = false;
  }

  andar() {
    this.notificarCentrais(_COMANDOS.ANDAR);
    setTimeout(() => {
      this.executarComando();
    }, _ENV.TEMPO_ANDAR);
  }

  procurar() {
    this.notificarCentrais(_COMANDOS.PROCURAR);
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        this.extrair();
      } else {
        this.executarComando();
      }
    }, _ENV.TEMPO_PROCURAR);
  }

  extrair() {
    this.notificarCentrais(_COMANDOS.EXTRAIR);
    setTimeout(() => {
      if (++this.carga >= _ENV.CAPACIDADE_MAXIMA) {
        this.status = _STATUS.CHEIO;
      }

      this.executarComando();
    }, _ENV.TEMPO_EXTRAIR);
  }

  notificarCentrais(comando) {
    this.centraisDeComandos.forEach(central => {
      central.enviarNotificacao(comando);
    });
  };

  executarComando() {
    if (this.status == _STATUS.CHEIO) {
      this.notificarCentrais(_STATUS.CHEIO)
      this.filaDeComandos = [];
      this.centraisDeComandos = [];
    } else {
      let comando = this.filaDeComandos.shift();
      if (comando) {
        this.status = _STATUS.OCUPADO;
        this[comando]();
      } else if (this.status == _STATUS.OCUPADO) {
        this.status = _STATUS.RECUPERANDO;
        this.notificarCentrais(_COMANDOS.RECUPERAR);
        setTimeout(() => {
          this.status = _STATUS.PRONTO
          this.executarComando();
        }, _ENV.TEMPO_RECUPERAR);
      }
    }
  }

  enviarComandos(comandos) {
    if (this.status == _STATUS.OCUPADO || this.status == _STATUS.CHEIO) {
      return false;
    } else {
      comandos.forEach(comando => {
        this.filaDeComandos.push(comando);
      });

      if (this.status == _STATUS.PRONTO) {
        this.executarComando();
      }

      return true;
    }
  }


  conectar(centroComando) {
    this.centraisDeComandos.push(centroComando);
  }

  desconectar(centroComando) {
    var index = this.centraisDeComandos.indexOf(centroComando);
    if (index > -1) {
      this.centraisDeComandos.splice(index, 1);
    }
  }

}

const _SINGLETON = new Roboto();

module.exports = _SINGLETON;
