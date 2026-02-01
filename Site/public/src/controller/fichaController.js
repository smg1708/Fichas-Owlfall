var fichaModel = require("../models/fichaModel");

function atualizarFicha(req, res) {
    console.log("BODY RECEBIDO:", req.body)
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
            console.error("Erro ao atualizar ficha:", erro)
            res.status(500).json({
                erro: true,
                mensagem: erro.sqlMessage || erro.message || "Erro interno no servidor"
            })
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