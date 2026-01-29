var database = require("../database/config")

function criarFicha(ficha) {
    console.log("ACESSEI O MODEL DE CRIAÇÃO DE FICHA")

    const { idUsuario, nome, jogador, classe, statusMax, aparencia, personalidade, descricao, objetivo, atributos } = ficha

    const sqlFicha = `
        INSERT INTO ficha (fkUsuario, nomePersonagem, jogador, classe, aparencia, personalidade, historia, objetivo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `

    return database.executar(sqlFicha, [idUsuario, nome, jogador, classe, aparencia, personalidade, descricao, objetivo])
        .then(resultadoFicha => {
            const idFicha = resultadoFicha.insertId

            const sqlStatus = `
                INSERT INTO statusFicha (fkFicha, vidaAtual, vidaMax, sanidadeAtual, sanidadeMax, nenAtual, nenMax)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `

            return database.executar(sqlStatus, [
                idFicha,
                statusMax.vida, statusMax.vida,
                statusMax.sanidade, statusMax.sanidade,
                statusMax.nen, statusMax.nen
            ])
            .then(() => {
                const promises = []

                for (var nomeAtributo in atributos) {
                    const valor = atributos[nomeAtributo]

                    const sqlAtributo = `
                        INSERT INTO fichaAtributo (fkFicha, fkAtributo, valor)
                        SELECT ?, idAtributo, ?
                        FROM atributo
                        WHERE nome = ?;
                    `

                    promises.push(
                        database.executar(sqlAtributo, [idFicha, valor, nomeAtributo])
                    )
                }

                return Promise.all(promises)
            })
        })
}

module.exports = {
    criarFicha
}
