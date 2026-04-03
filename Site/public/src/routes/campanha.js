var express = require("express");
var router = express.Router();

var campanhaController = require("../controller/campanhaController");

router.post("/campanha", function (req, res) {
    campanhaController.confirmar(req, res);
})

router.post("/cadastrarCampanha", function (req, res) {
    campanhaController.confirmarCodigo(req, res);
})

router.get("/mostrarCampanhas/:idUsuario", function (req, res) {
    campanhaController.mostrar(req, res);
})

router.get("/buscarIdCampanha/:idUsuario", function (req, res) {
    campanhaController.buscarIdCampanha(req, res);
})

router.post("/debugUsuario", function (req, res) {
    campanhaController.debug(req, res);
})

module.exports = router;