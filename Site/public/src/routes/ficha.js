var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
var fichaController = require("../controller/fichaController");

router.put("/atualizar/:idFicha", function (req, res) {
    fichaController.atualizarFicha(req, res);
})

router.get("/carregar", function (req, res) {
    fichaController.carregarFicha(req, res);
})

router.get("/mostrarInv/:idFicha", function (req, res) {
    fichaController.inventarioVer(req, res);
});

router.get("/mostrarHab/:idFicha", function (req, res) {
    fichaController.habilidadeVer(req, res);
})

router.post("/habilidade", function (req, res) {
    fichaController.confirmarHab(req, res);
})

router.post("/inventario", function (req, res) {
    fichaController.confirmarInv(req, res);
})

router.put('/imagemFicha', upload.single('fotoFicha'), (req, res) => {
    fichaController.salvarImagemFicha(req, res);
});

router.get('/imagemFicha/:idFicha', fichaController.buscarImagemFicha);

router.put('/imagemSentimental1', upload.single('fotoSentimental1'), (req, res) => {
    fichaController.salvarImagemSentimental1(req, res);
});

router.get('/imagemSentimental1/:idFicha', fichaController.buscarImagemSentimental1);

router.put('/imagemSentimental2', upload.single('fotoSentimental2'), (req, res) => {
    fichaController.salvarImagemSentimental2(req, res);
});

router.get('/imagemSentimental2/:idFicha', fichaController.buscarImagemSentimental2);

router.put('/imagemSentimental3', upload.single('fotoSentimental3'), (req, res) => {
    fichaController.salvarImagemSentimental3(req, res);
});

router.get('/imagemSentimental3/:idFicha', fichaController.buscarImagemSentimental3);

router.put('/imagemSentimental4', upload.single('fotoSentimental4'), (req, res) => {
    fichaController.salvarImagemSentimental4(req, res);
});

router.get('/imagemSentimental4/:idFicha', fichaController.buscarImagemSentimental4);

module.exports = router