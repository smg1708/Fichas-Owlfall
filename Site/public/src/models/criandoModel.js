var database = require("../database/config")

function criarFicha(ficha) {
    console.log("ACESSEI O MODEL DE CRIAÇÃO DE FICHA")

    const { idUsuario, nome, jogador, classe, statusMax, anotacoes, aparencia, personalidade, descricao, objetivo, atributos, reacao } = ficha

    const sqlFicha = `
        INSERT INTO ficha (fkUsuario, nomePersonagem, jogador, classe, anotacoes, aparencia, personalidade, descricao, objetivo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `

    return database.executar(sqlFicha, [idUsuario, nome, jogador, classe, anotacoes, aparencia, personalidade, descricao, objetivo])
        .then(resultadoFicha => {
            const idFicha = resultadoFicha.insertId

            const sqlStatus = `
                INSERT INTO statusFicha (fkFicha, vidaAtual, vidaMax, sanidadeAtual, sanidadeMax, nenAtual, nenMax, vidaBase, sanidadeBase, nenBase)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `

            return database.executar(sqlStatus, [
                idFicha,
                statusMax.vida, statusMax.vida,
                statusMax.sanidade, statusMax.sanidade,
                statusMax.nen, statusMax.nen,
                statusMax.vida,
                statusMax.sanidade,
                statusMax.nen,
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

                const sqlReacao = `
                    INSERT INTO reacaoFicha (
                        fkFicha, defesa, equipamento, outrosDefesa, bloqueio, esquiva, protecao, resistencia
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                `

                promises.push(
                    database.executar(sqlReacao, [
                        idFicha,
                        reacao.defesa,
                        reacao.equipamento,
                        reacao.outrosDefesa,
                        reacao.bloqueio,
                        reacao.esquiva,
                        reacao.protecao,
                        reacao.resistencia
                    ])
                )
                return Promise.all(promises).then(() =>{
                    return { insertId: idFicha }
                })
            })
        })
}

module.exports = {
    criarFicha
}