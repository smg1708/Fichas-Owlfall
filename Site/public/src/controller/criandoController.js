var criandoModel = require("../models/criandoModel");

function criarFicha(req, res) {
    const ficha = req.body

    if (!ficha) {
        return res.status(400).send("dados de criação, não enviados")
    } 
    if (!ficha.idUsuario || !ficha.nome || !ficha.jogador || !ficha.classe || !ficha.atributos) {
        return res.status(400).send("dados obrigatorios para criação, não enviados")
    }

    console.log("FICHA RECEBIDA:", ficha)

    criandoModel.criarFicha(ficha)
        .then(resultado => {
            res.json({
                idFicha: resultado.insertId
            })
        })
        .catch(erro => {
            console.log("Erro ao criar ficha:", erro)
            res.status(500).json({ erro: erro.sqlMessage || erro })
        })
}

module.exports = {
    criarFicha
}
