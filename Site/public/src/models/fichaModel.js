var database = require("../database/config")

function atualizarFicha(idFicha, ficha) {
    console.log("atualizando ficha:", idFicha)

    const promises = []

    const sqlFicha = `
        UPDATE ficha SET
            nomePersonagem = ?,
            jogador = ?,
            classe = ?,
            nivel = ?,
            aparencia = ?,
            personalidade = ?,
            historia = ?,
            objetivo = ?,
            imagem = ?,
            sentimental1 = ?,
            sentimental2 = ?,
            sentimental3 = ?,
            sentimental4 = ?
        WHERE idFicha = ?;
    `

    promises.push(
        database.executar(sqlFicha, [
            ficha.base.nome,
            ficha.base.jogador,
            ficha.base.classe,
            ficha.base.nivel,
            ficha.historia.aparencia,
            ficha.historia.personalidade,
            ficha.historia.historia,
            ficha.historia.objetivo,
            ficha.base.imagem,
            ficha.sentimental[0],
            ficha.sentimental[1],
            ficha.sentimental[2],
            ficha.sentimental[3],
            idFicha
        ])
    )

    const sqlStatus = `
        UPDATE statusFicha SET
            vidaAtual = ?, vidaMax = ?,
            sanidadeAtual = ?, sanidadeMax = ?,
            nenAtual = ?, nenMax = ?
        WHERE fkFicha = ?;
    `

    promises.push(
        database.executar(sqlStatus, [
            ficha.status.vida.atual,
            ficha.status.vida.max,
            ficha.status.sanidade.atual,
            ficha.status.sanidade.max,
            ficha.status.nen.atual,
            ficha.status.nen.max,
            idFicha
        ])
    )

    const sqlReacao = `
    UPDATE reacaoFicha SET
        defesa = ?,
        equipamento = ?,
        outrosDefesa = ?,
        bloqueio = ?,
        esquiva = ?,
        protecao = ?,
        resistencia = ?
    WHERE fkFicha = ?;
    `

    promises.push(
        database.executar(sqlReacao, [
            ficha.reacao.defesa,
            ficha.reacao.equipamento,
            ficha.reacao.outrosDefesa,
            ficha.reacao.bloqueio,
            ficha.reacao.esquiva,
            ficha.reacao.protecao,
            ficha.reacao.resistencia,
            idFicha
        ])
    )

    for (var nomeAtributo in ficha.atributos) {
        const valor = ficha.atributos[nomeAtributo]

        const sqlAtributo = `
            UPDATE fichaAtributo fa
            JOIN atributo a ON fa.fkAtributo = a.idAtributo
            SET fa.valor = ?
            WHERE fa.fkFicha = ? AND a.nome = ?;
        `

        promises.push(
            database.executar(sqlAtributo, [valor, idFicha, nomeAtributo])
        )
    }

    for (var nomePericia in ficha.pericias) {
        const p = ficha.pericias[nomePericia]

        const sqlPericia = `
            UPDATE fichaPericia fp
            JOIN pericia p ON fp.fkPericia = p.idPericia
            SET fp.bonus = ?, fp.treino = ?, fp.outros = ?
            WHERE fp.fkFicha = ? AND p.nome = ?;
        `

        promises.push(
            database.executar(sqlPericia, [
                p.bonus,
                p.treino,
                p.outros,
                idFicha,
                nomePericia
            ])
        )
    }

    const sqlDeleteHab = `DELETE FROM habilidade WHERE fkFicha = ?;`
    promises.push(database.executar(sqlDeleteHab, [idFicha]))

    for (var hab of ficha.habilidades) {
        const sqlHab = `
            INSERT INTO habilidade (fkFicha, nome, descricao, imagem)
            VALUES (?, ?, ?, ?);
        `
        promises.push(
            database.executar(sqlHab, [idFicha, hab.nome, hab.descricao, hab.imagem])
        )
    }

    const sqlDeleteItem = `DELETE FROM item WHERE fkFicha = ?;`
    promises.push(database.executar(sqlDeleteItem, [idFicha]))

    for (var item of ficha.inventario) {
        const sqlItem = `
            INSERT INTO item (fkFicha, nome, descricao, quantidade, imagem)
            VALUES (?, ?, ?, ?, ?);
        `
        promises.push(
            database.executar(sqlItem, [
                idFicha,
                item.nome,
                item.descricao,
                item.quantidade || 1,
                item.imagem
            ])
        )
    }

    return Promise.all(promises)
}

function carregarFicha(idFicha) {

    console.log("Carregando ficha:", idFicha)

    const ficha = {}

    return database.executar(`
        SELECT idFicha, nomePersonagem, jogador, classe, nivel, aparencia, personalidade, historia, objetivo, imagem, sentimental1, sentimental2, sentimental3, sentimental4
        FROM ficha WHERE idFicha = ?;
    `, [idFicha])

    .then(resultadoFicha => {
        ficha.base = resultadoFicha[0]

        return database.executar(`
            SELECT vidaAtual, vidaMax, sanidadeAtual, sanidadeMax, nenAtual, nenMax
            FROM statusFicha WHERE fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoStatus => {
        ficha.status = resultadoStatus[0]

        return database.executar(`
            SELECT
                defesa,
                equipamento,
                outrosDefesa,
                bloqueio,
                esquiva,
                protecao,
                resistencia
            FROM reacaoFicha
            WHERE fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoReacao => {
        ficha.reacao = resultadoReacao[0]

        return database.executar(`
            SELECT a.nome, fa.valor
            FROM fichaAtributo fa
            JOIN atributo a ON fa.fkAtributo = a.idAtributo
            WHERE fa.fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoAtributos => {
        ficha.atributos = {}

        for (var i = 0; i < resultadoAtributos.length; i++) {
            var nome = resultadoAtributos[i].nome
            var valor = resultadoAtributos[i].valor

            ficha.atributos[nome] = valor
        }

        return database.executar(`
            SELECT p.nome, fp.bonus, fp.treino, fp.outros
            FROM fichaPericia fp
            JOIN pericia p ON fp.fkPericia = p.idPericia
            WHERE fp.fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoPericias => {
        ficha.pericias = {}

        for (var i = 0; i < resultadoPericias.length; i++) {
            var nome = resultadoPericias[i].nome

            ficha.pericias[nome] = {
                bonus: resultadoPericias[i].bonus,
                treino: resultadoPericias[i].treino,
                outros: resultadoPericias[i].outros
            }
        }

        return database.executar(`
            SELECT nome, descricao, imagem
            FROM habilidade WHERE fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoHabilidades => {
        ficha.habilidades = resultadoHabilidades

        return database.executar(`
            SELECT nome, descricao, quantidade, imagem
            FROM item WHERE fkFicha = ?;
        `, [idFicha])
    })

    .then(resultadoItens => {
        ficha.inventario = resultadoItens

        return ficha
    })
}

module.exports = {
    atualizarFicha,
    carregarFicha
}
