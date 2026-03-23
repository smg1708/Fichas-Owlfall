var database = require("../database/config")

function mostrarPersonagens(idUsuario) {
    console.log("ACESSEI A VISUALIZAÇÃO DOS PERSONAGENS MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select idFicha, nomePersonagem, classe, imagem, DATE_FORMAT(criado, '%d/%m/%Y') as criado from vw_personagens
            where fkUsuario = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)
}

function escolher(idFicha, idCampanha) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        insert into fichaCampanha (fkFicha, fkCampanha)
        values (?, ?);
    `;
    return database.executar(instrucaoSql, [idFicha, idCampanha]);
}

module.exports = {
    mostrarPersonagens,
    escolher
};