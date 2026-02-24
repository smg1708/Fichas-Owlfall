var campanhaModel = require("../models/campanhaModel");

function confirmar(req, res) {
    var idUsuario = req.body.idUsuario;
    var nome = req.body.nome
    var descricao = req.body.descricao

    if (!nome || !nome.trim()) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!idUsuario) {
        return res.status(401).send("Usuário não autenticado");
    } else {
        campanhaModel.confirmar(idUsuario, nome, descricao)
            .then(resultado => {
                res.json({ idCampanha: resultado.insertId });
            })
            .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao criar a campanha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function confirmarCodigo(req, res) {
    var idUsuario = req.body.idUsuario;
    var codigo = req.body.codigoServer

    if (!idUsuario) {
        res.status(400).send("Usuário não autenticado");
    } else if (!codigo || !codigo.trim()) {
        return res.status(401).send("Seu codigo está undefined!");
    } else {
        campanhaModel.confirmarCodigo(idUsuario, codigo)
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

function mostrar(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Campanhas não foram carregadas!");
    } else {

        campanhaModel.mostrar(idUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    }   else {
                        res.status(403).send("Campanhas não foram carregadas!");
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
    confirmar,
    confirmarCodigo,
    mostrar
}