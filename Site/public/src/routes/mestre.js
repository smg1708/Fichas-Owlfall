var express = require("express");
var router = express.Router();

var mestreController = require("../controller/mestreController");

router.post("/cadastrarCodigo", function (req, res) {
    mestreController.convidar(req, res);
})

router.get("/carregarCodigo/:idCampanha", function (req, res) {
    mestreController.carregarCampanha(req, res);
})

module.exports = router;