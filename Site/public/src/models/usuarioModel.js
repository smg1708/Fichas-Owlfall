var database = require("../database/config")

function cadastrar(nome, email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        insert into usuario (nome, email, senha) values (?, ?, ?);
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email, senha]);
}

function autenticar(email, senha) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco"
    )
    var instrucaoSql = `
        select idUsuario, nome, email usuario from usuario
            where email = ? and senha = ?
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

module.exports = {
    cadastrar,
    autenticar
}