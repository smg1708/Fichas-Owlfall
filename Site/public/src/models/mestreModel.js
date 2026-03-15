var database = require("../database/config")

function carregarCampanha(idCampanha) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select codigo from campanha
            where idCampanha = ?;
    `;
    
    return database.executar(sql, [idCampanha]);

}

function convidar(idCampanha, codigo) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        update campanha set codigo = ?
        where idCampanha = ?;
    `;
    return database.executar(instrucaoSql, [codigo, idCampanha]);
}

function salvarImagemCampanha(idCampanha, imagem) {
  
  const instrucao = `
    update campanha set imagem = ?
      where idCampanha = ?;
  `;

  return database.executar(instrucao, [imagem, idCampanha]);

}

function buscarImagemCampanha(idCampanha) {

  const sql = `
    select imagem from campanha 
      where idCampanha = ${idCampanha};
  `;

  return database.executar(sql);

}

module.exports = {
    carregarCampanha,
    convidar,
    salvarImagemCampanha,
    buscarImagemCampanha
}