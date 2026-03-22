var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');

var mestreController = require("../controller/mestreController");

router.get("/carregar/:idCampanha", function (req, res) {
    mestreController.carregarCampanha(req, res);
})

router.get("/carregarCodigo/:idCampanha", function (req, res) {
    mestreController.carregarCodigo(req, res);
})

router.get("/carregarEdicao/:idCampanha", function (req, res) {
    mestreController.carregarEdicao(req, res);
})

router.put('/imagemCampanha', upload.single('fotoCampanha'), (req, res) => {
    mestreController.salvarImagemCampanha(req, res);
});

router.get('/imagemCampanha/:idCampanha', mestreController.buscarImagemCampanha);

router.put("/editar/:idCampanha", function (req, res) {
    mestreController.editar(req, res);
});

module.exports = router;