var express = require("express");
var router = express.Router();

var fichaController = require("../controller/fichaController");

router.post("/salvar", function (req, res) {
    fichaController.salvar(req, res);
})

module.exports = router