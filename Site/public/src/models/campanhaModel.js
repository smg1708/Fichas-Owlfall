var database = require("../database/config")

function confirmar(idUsuario, nome, descricao) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        insert into campanha (nome, descricao, fkMestre) values (?, ?, ?);
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, descricao, idUsuario]);
}

function confirmarCodigo(idUsuario, codigo) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        insert into campanha_usuario (fkCampanha, fkUsuario)
        select idCampanha, ? from campanha
        where codigo = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario, codigo]);
}

function mostrar(idUsuario) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select idCampanha, nome, DATE_FORMAT(criadoEm, '%d/%m/%Y') as criado from campanha
            where fkMestre = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)

}

module.exports = {
    confirmar,
    confirmarCodigo,
    mostrar
}