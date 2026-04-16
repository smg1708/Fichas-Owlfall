var database = require("../database/config")

function carregarCodigo(idCampanha) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select codigo from campanha
            where idCampanha = ?;
    `;
    
    return database.executar(sql, [idCampanha]);

}

function carregarEdicao(idCampanha) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select nome, descricao from campanha
            where idCampanha = ?;
    `;
    
    return database.executar(sql, [idCampanha]);

}

function carregarCampanha(idCampanha) {

    var instrucaoSql = `
        SELECT nome, descricao FROM campanha
          WHERE idCampanha = ${idCampanha};
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
      where idCampanha = ?;
  `;

  return database.executar(sql, [idCampanha]);
}

function editar(idCampanha, dados) {

    const sql = `
        UPDATE campanha SET
            nome = '${dados.nome}',
            descricao = '${dados.descricao}'
        WHERE idCampanha = ?;
    `;

    return database.executar(sql, [idCampanha]);
}

function mostrarPersonagens(idCampanha) {
    console.log("ACESSEI A VISUALIZAÇÃO DOS PERSONAGENS MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        SELECT 
            f.idFicha,
            f.nomePersonagem,
            f.classe,
            f.imagem,
            u.nome AS jogador,
            DATE_FORMAT(f.criado, '%d/%m/%Y') AS criado
        FROM ficha f
        JOIN fichaCampanha fc ON fc.fkFicha = f.idFicha
        JOIN usuario u ON u.idUsuario = f.fkUsuario
        WHERE fc.fkCampanha = ${idCampanha};
    `;
    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)

}

module.exports = {
    carregarCodigo,
    carregarEdicao,
    carregarCampanha,
    salvarImagemCampanha,
    buscarImagemCampanha,
    mostrarPersonagens,
    editar
}