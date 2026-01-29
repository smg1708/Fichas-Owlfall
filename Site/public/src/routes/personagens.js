var express = require("express");
var router = express.Router();

var personagensController = require("../controller/personagensController");

router.get("/mostrar/:idUsuario", function (req, res) {
    personagensController.mostrarPersonagens(req, res);
})

module.exports = router;