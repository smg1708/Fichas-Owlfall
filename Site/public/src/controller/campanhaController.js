var campanhaModel = require("../models/campanhaModel");

function confirmar(req, res) {
    var idUsuario = req.body.idUsuario;
    var nome = req.body.nome
    var descricao = req.body.descricao
    var codigo = req.body.codigo

    if (!nome || !nome.trim()) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!idUsuario) {
        return res.status(401).send("Usuário não autenticado");
    } else if (!codigo) {
        res.status(400).send("Seu codigo está undefined!");
    } else {
        campanhaModel.confirmar(idUsuario, nome, descricao, codigo)
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
        return res.status(400).json({ erro: "idUsuario indefinido" });
    }

    campanhaModel.mostrar(idUsuario)
        .then(function (resultado) {

            console.log(`Resultados encontrados: ${resultado.length}`);

            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.json([]);
            }

        })
        .catch(function (erro) {
            console.log("Erro:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function buscarIdCampanha(req,res) {
    var idUsuario = req.body.idUsuario;

    if (!idUsuario) {
        res.status(400).send("Usuário não autenticado");
    } else {
        campanhaModel.buscarIdCampanha(idUsuario)
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

function debug(req, res) {
    var idUsuario = req.body.idUsuario;
    var idCampanha = req.body.idCampanha

    if (!idUsuario) {
        res.status(400).send("Usuário não autenticado");
    } else if (!idCampanha) {
        return res.status(401).send("Seu codigo está undefined!");
    } else {
        campanhaModel.debug(idUsuario, idCampanha)
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
    confirmar,
    confirmarCodigo,
    mostrar,
    buscarIdCampanha,
    debug
}