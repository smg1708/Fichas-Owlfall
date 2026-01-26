const fs = require("fs");
const path = require("path");
var usuarioImgModel = require("../models/usuarioImgModel");

function salvarImagemPerfil(req, res) {
  var idUsuario = req.body.idUsuario;
  const novaImagem = req.file?.filename;
  
  if (!idUsuario || !novaImagem) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  usuarioImgModel.buscarImagemPerfil(idUsuario)
    .then(resultado => {
      const imagemAntiga = resultado[0]?.imagem;

      if (imagemAntiga && imagemAntiga !== "usuario.png") {
        const caminhoImagem = path.join(__dirname, "../../assets/imgsBd", imagemAntiga);

        fs.unlink(caminhoImagem, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntiga);
          }
        });
      }

      return usuarioImgModel.salvarImagemPerfil(idUsuario, novaImagem);
    })
    .then(resultado => {
      res.status(200).json({
        msg: "Imagem enviada com sucesso",
        imagem: novaImagem
      });
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  }

function buscarImagemPerfil(req, res) {
  const idUsuario = req.params.idUsuario;

  usuarioImgModel.buscarImagemPerfil(idUsuario)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].imagem) {
        res.json({ imagem: resultado[0].imagem });
      } else {
        res.json({ imagem: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  salvarImagemPerfil,
  buscarImagemPerfil
};