var mestreModel = require("../models/mestreModel");

function carregarCampanha(req, res) {
    var idCampanha = req.params.idCampanha;

    if (idCampanha == undefined) {
        res.status(400).send("Campanha não foi carregada!");
    } else {

        mestreModel.carregarCampanha(idCampanha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    }   else {
                        res.status(403).send("Campanha não foi carregada!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao tentar carregar! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function convidar(req, res) {
    var idCampanha = req.body.idCampanha;
    var codigo = req.body.codigoServer

    if (!idCampanha) {
        res.status(400).send("Id da campanha não enviado");
    } else if (!codigo || !codigo.trim()) {
        return res.status(401).send("Seu codigo está undefined!");
    } else {
        mestreModel.convidar(idCampanha, codigo)
            .then(
                function(resultado) {
                    res.json(resultado)
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "Houve um erro ao entrar na campanha! Erro: " + erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

module.exports = {
    carregarCampanha,
    convidar
}