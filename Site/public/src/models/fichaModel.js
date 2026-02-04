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
            anotacoes = ?,
            aparencia = ?,
            personalidade = ?,
            descricao = ?,
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
            ficha.historia.anotacoes,
            ficha.historia.aparencia,
            ficha.historia.personalidade,
            ficha.historia.descricao,
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

    const Atributos = {
        agil: "agilidade",
        forc: "força",
        inte: "intelecto",
        prec: "presença",
        vigo: "vigor",
        tran: "transmutador",
        fort: "fortificador",
        emis: "emissor",
        conj: "conjurador",
        mani: "manipulador",
        espe: "especialista"
    }

    const sqlAtributo = `
        UPDATE fichaAtributo fa
        JOIN atributo a ON fa.fkAtributo = a.idAtributo
        SET fa.valor = ?
        WHERE fa.fkFicha = ? AND a.nome = ?;
    `

    for (var nomeAtributo in ficha.atributos) {
        const valor = Number(ficha.atributos[nomeAtributo])
        const nomeBanco = Atributos[nomeAtributo]

        if (!nomeBanco) {
            console.log("Atributo ignorado:", nomeAtributo)
            continue
        }

        promises.push(
            database.executar(sqlAtributo, [valor, idFicha, nomeBanco])
        )
    }

    const Pericias = {
        adestramento: "adestramento",
        artes: "artes",
        atletismoAcrobacia: "atletismoAcrobacia",
        ciencias: "ciencias",
        diplomacia: "diplomacia",
        enganacao: "enganacao",
        fortitude: "fortitude",
        furtividade: "furtividade",
        iniciativa: "iniciativa",
        intimidacao: "intimidacao",
        investigacao: "investigacao",
        luta: "luta",
        medicina: "medicina",
        percepcao: "percepcao",
        pilotagem: "pilotagem",
        pontaria: "pontaria",
        profissao: "profissao",
        reflexos: "reflexos",
        sobrevivencia: "sobrevivencia",
        espirito: "espirito"
    }

    const sqlPericia = `
    INSERT INTO fichaPericia (fkFicha, fkPericia, bonus, treino, outros)
    VALUES (?, (SELECT idPericia FROM pericia WHERE nome = ?), ?, ?, ?)
    ON DUPLICATE KEY UPDATE bonus = VALUES(bonus), treino = VALUES(treino), outros = VALUES(outros);
    `

    for (let nomePericia in ficha.pericias) {
        const p = ficha.pericias[nomePericia]
        const nomeBanco = Pericias[nomePericia]

        if (!nomeBanco) continue

        const bonus = Number(p.bonus) || 0
        const treino = Number(p.treino) || 0
        const outros = Number(p.outros) || 0

        promises.push(
            database.executar(sqlPericia, [idFicha, nomeBanco, bonus, treino, outros])
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
        SELECT idFicha, nomePersonagem, jogador, classe, nivel, anotacoes, aparencia, personalidade, descricao, objetivo, imagem, sentimental1, sentimental2, sentimental3, sentimental4
        FROM ficha WHERE idFicha = ?;
    `, [idFicha])

    .then(resultadoFicha => {
        ficha.base = resultadoFicha[0]

        return database.executar(`
            SELECT vidaAtual, vidaMax, sanidadeAtual, sanidadeMax, nenAtual, nenMax, vidaBase, sanidadeBase, nenBase
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

function confirmarHab(idFicha, nome, descricao, imagem) {

    var instrucaoSql = `
        insert into habilidade ( fkFicha, nome, descricao, imagem) values (?, ?, ?, ?);
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idFicha, nome, descricao, imagem]);
}

function confirmarInv(idFicha, nome, descricao, imagem) {
    var instrucaoSql = `
        insert into item ( fkFicha, nome, descricao, imagem) values (?, ?, ?, ?);
    `
    console.log("executando a instrucaoSQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [idFicha, nome, descricao, imagem]);
}

function salvarImagemFicha(idFicha, imagem) {
  
  const instrucao = `
    update ficha set imagem = ?
      where idFicha = ?;
  `;

  return database.executar(instrucao, [imagem, idFicha]);

}

function buscarImagemFicha(idFicha) {

  const sql = `
    select imagem from ficha 
      where idFicha = ${idFicha};
  `;

  return database.executar(sql);

}

function salvarImagemSentimental1(idFicha, imagem) {
  
  const instrucao = `
    update ficha set sentimental1 = ?
      where idFicha = ?;
  `;

  return database.executar(instrucao, [imagem, idFicha]);

}

function buscarImagemSentimental1(idFicha) {

  const sql = `
    select sentimental1 from ficha 
      where idFicha = ${idFicha};
  `;

  return database.executar(sql);

}

function salvarImagemSentimental2(idFicha, imagem) {
  
  const instrucao = `
    update ficha set sentimental2 = ?
      where idFicha = ?;
  `;

  return database.executar(instrucao, [imagem, idFicha]);

}

function buscarImagemSentimental2(idFicha) {

  const sql = `
    select sentimental2 from ficha 
      where idFicha = ${idFicha};
  `;

  return database.executar(sql);

}

function salvarImagemSentimental3(idFicha, imagem) {
  
  const instrucao = `
    update ficha set sentimental3 = ?
      where idFicha = ?;
  `;

  return database.executar(instrucao, [imagem, idFicha]);

}

function buscarImagemSentimental3(idFicha) {

  const sql = `
    select sentimental3 from ficha 
      where idFicha = ${idFicha};
  `;

  return database.executar(sql);

}

function salvarImagemSentimental4(idFicha, imagem) {
  
  const instrucao = `
    update ficha set sentimental4 = ?
      where idFicha = ?;
  `;

  return database.executar(instrucao, [imagem, idFicha]);

}

function buscarImagemSentimental4(idFicha) {

  const sql = `
    select sentimental4 from ficha 
      where idFicha = ${idFicha};
  `;

  return database.executar(sql);

}

module.exports = {
    atualizarFicha,
    carregarFicha,
    confirmarHab,
    confirmarInv,
    salvarImagemFicha,
    buscarImagemFicha,
    salvarImagemSentimental1,
    buscarImagemSentimental1,
    salvarImagemSentimental2,
    buscarImagemSentimental2,
    salvarImagemSentimental3,
    buscarImagemSentimental3,
    salvarImagemSentimental4,
    buscarImagemSentimental4
}
