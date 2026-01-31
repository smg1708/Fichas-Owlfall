var fichaModel = require("../models/fichaModel");

function atualizarFicha(req, res) {
    const idFicha = req.params.idFicha
    const ficha = req.body

    if (!idFicha) {
        return res.status(400).send("ID da ficha não enviado")
    }

    fichaModel.atualizarFicha(idFicha, ficha)
        .then(resultado => 
            res.json(resultado)
        )
        .catch(erro => {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function carregarFicha(req, res) {
    const idFicha = req.query.idFicha

    if (!idFicha) {
        return res.status(400).send("ID da ficha não enviado")
    }

    fichaModel.carregarFicha(idFicha)
        .then(resultado => 
            res.json(resultado)
        )
        .catch(erro => {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    atualizarFicha,
    carregarFicha
}