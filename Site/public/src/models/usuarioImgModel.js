var database = require("../database/config")

function salvarImagemPerfil(idUsuario, imagem) {
  
  const instrucao = `
    update usuario set imagem = ?
      where idUsuario = ?;
  `;

  return database.executar(instrucao, [imagem, idUsuario]);

}

function buscarImagemPerfil(idUsuario) {

  const sql = `
    select imagem from usuario 
      where idUsuario = ${idUsuario};
  `;

  return database.executar(sql);

}


module.exports = {
  salvarImagemPerfil,
  buscarImagemPerfil
}