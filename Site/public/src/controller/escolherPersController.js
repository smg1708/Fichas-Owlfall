var escolherPersModel = require("../models/escolherPersModel");

function mostrarPersonagens(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Fichas não foram carregadas!");
    } else {

        escolherPersModel.mostrarPersonagens(idUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    }   else {
                        res.status(403).send("Fichas não foram carregadas!");
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

function escolher(req, res) {
    var idFicha = req.body.idFicha;
    var idCampanha = req.body.idCampanha

    if (!idFicha) {
        res.status(400).send("Usuário não autenticado");
    } else if (!idCampanha || !idCampanha.trim()) {
        return res.status(401).send("Seu codigo está undefined!");
    } else {
        escolherPersModel.escolher(idFicha, idCampanha)
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
    mostrarPersonagens,
    escolher
}