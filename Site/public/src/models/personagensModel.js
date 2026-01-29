var database = require("../database/config")

function mostrarPersonagens(idUsuario) {
    console.log("ACESSEI A VISUALIZAÇÃO DOS PERSONAGENS MODEL \n \n\t\t > Se aqui der erro, e alguma credencial do banco");
    
    var sql = `
        select nomePersonagem, classe, imagem, DATE_FORMAT(criado, '%d/%m/%Y') as criado from vw_personagens
            where fkUsuario = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql)

}

module.exports = {
    mostrarPersonagens
};