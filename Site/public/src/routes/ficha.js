var express = require("express");
var router = express.Router();

var fichaController = require("../controller/fichaController");

router.put("/atualizar/:idFicha", function (req, res) {
    fichaController.atualizarFicha(req, res);
})

router.get("/carregar", function (req, res) {
    fichaController.carregarFicha(req, res);
})

module.exports = router