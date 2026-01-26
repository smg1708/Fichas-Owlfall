var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
const usuarioImgController = require('../controller/usuarioImgController');

router.put('/imagemPerfil', upload.single('fotoPerfil'), (req, res) => {
    usuarioImgController.salvarImagemPerfil(req, res);
});

router.get('/imagemPerfil/:idUsuario', usuarioImgController.buscarImagemPerfil);

module.exports = router;