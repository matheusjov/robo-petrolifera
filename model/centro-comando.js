/**
* Created by matheus on 28/06/16.
*/
'use strict';

class CentroComando {

  constructor(nome, roboto) {
    this.nome = nome;
    this.roboto = roboto;
    this.roboto.conectar(this);
  }

  get onStatusChange() {
    return this._onStatusChange;
  }

  set onStatusChange(onStatusChange){
    this._onStatusChange = onStatusChange;
  }

  enviarNotificacao(comando) {
    if (this._onStatusChange)
    this._onStatusChange(comando);
  }

  enviarComandos(comandos) {
    return this.roboto.enviarComandos(comandos);
  }

  desconectar() {
    this.roboto.desconectar(this);
  }
}

module.exports = CentroComando;
