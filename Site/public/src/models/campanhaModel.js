var database = require("../database/config")

function confirmar(idUsuario, nome, descricao, codigo) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoCampanha = `
        insert into campanha (nome, descricao, fkMestre, codigo) values (?, ?, ?, ?);
    `

    console.log("executando a instrucaoSQL: \n" + instrucaoCampanha);
    return database.executar(instrucaoCampanha, [nome, descricao, idUsuario, codigo]);
}

function confirmarCodigo(idUsuario, codigo) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        insert into usuarioCampanha (fkUsuario, fkCampanha)
        values (?, (select idCampanha FROM campanha where codigo = ?));
    `;
    return database.executar(instrucaoSql, [idUsuario, codigo]);
}

function mostrar(idUsuario) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select 
            c.idCampanha,
            c.nome,
            c.imagem,
            date_format(c.criadoEm, '%d/%m/%Y') as criado
        from usuarioCampanha uc
        join campanha c 
            on uc.fkCampanha = c.idCampanha
        where uc.fkUsuario = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)

}

function buscarIdCampanha(idUsuario) {
    console.log(
        "ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        select * from campanha
	        where fkMestre = 1
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function debug(idUsuario, idCampanha) {
    console.log("ACESSEI A CAMPANHA MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");   
    
    var sql = `
    insert into usuarioCampanha (fkUsuario, fkCampanha) values (${idUsuario}, ${idCampanha});
    ` 
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)
}

module.exports = {
    confirmar,
    confirmarCodigo,
    mostrar,
    debug,
    buscarIdCampanha
}