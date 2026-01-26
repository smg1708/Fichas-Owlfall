var database = require("../database/config")

function salvarImagem(idUsuario, imagem) {
  
  const instrucao = `
    update usuario set imagem = ?
      where idUsuario = ?;
  `;

  return database.executar(instrucao, [imagem, idUsuario]);

}

function buscarImagem(idUsuario) {

  const sql = `
    select imagem from usuario 
      where idUsuario = ${idUsuario};
  `;

  return database.executar(sql);

}


module.exports = {
  salvarImagem,
  buscarImagem
}