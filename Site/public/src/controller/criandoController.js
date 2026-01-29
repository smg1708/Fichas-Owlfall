var criandoModel = require("../models/criandoModel");

function criarFicha(req, res) {
    const ficha = req.body

    if (!ficha) {
        res.status(400).send("dados de criação, não enviados")
    } else if(!ficha.idUsuario || !ficha.nome || !ficha.jogador || !ficha.classe || !ficha.atributos) {
        res.status(400).send("dados obrigatorios para criação, não enviados")
    } else {
        criandoModel.criarFicha(ficha)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao criar a ficha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            );
    }
}

module.exports = {
    criarFicha
}