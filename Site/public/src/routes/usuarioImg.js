var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
const usuarioImgController = require('../controller/usuarioImgController');

router.put('/imagem', upload.single('fotoPersonagem'), (req, res) => {
    usuarioImgController.salvarImagem(req, res);
});

router.get('/imagem/:idUsuario', usuarioImgController.buscarImagem);

module.exports = router;