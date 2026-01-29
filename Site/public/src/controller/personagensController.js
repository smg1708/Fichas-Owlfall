var personagensModel = require("../models/personagensModel");

function mostrarPersonagens(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Fichas não foram carregadas!");
    } else {

        personagensModel.mostrarPersonagens(idUsuario)
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

module.exports = {
    mostrarPersonagens
}