var express = require("express");
var router = express.Router();

var escolherPersController = require("../controller/escolherPersController");

router.get("/mostrar/:idUsuario", function (req, res) {
    escolherPersController.mostrarPersonagens(req, res);
})

router.post("/cadastrarFicha", function (req, res) {
    escolherPersController.escolher(req, res);
})

module.exports = router;