var express = require("express");
var router = express.Router();

var mestreController = require("../controller/mestreController");

router.get("/carregarCodigo/:idCampanha", function (req, res) {
    mestreController.carregarCodigo(req, res);
})

router.put('/imagemCampanha', upload.single('fotoCampanha'), (req, res) => {
    mestreController.salvarImagemCampanha(req, res);
});

router.get('/imagemCampanha/:idFicha', mestreController.buscarImagemFicha);

module.exports = router;