var express = require("express");
var router = express.Router();

var criandoController = require("../controller/criandoController");

router.post("/criar", function (req, res){
    criandoController.criarFicha(req, res)
})

module.exports = router