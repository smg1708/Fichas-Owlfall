var usuarioImgModel = require("../models/usuarioImgModel");

function salvarImagem(req, res) {
  var idUsuario = req.body.idUsuario;
  const imagem = req.file.filename;
  
  if (!idUsuario) {
    return res.status(400).json({ erro: "ID do usuário não recebido" });
  }

  if (!imagem) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  usuarioImgModel.salvarImagem(idUsuario, imagem)
  .then(resultado => {
    res.status(200).json({
      msg: "Imagem enviada com sucesso",
      imagem: imagem
    });
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
}

function buscarImagem(req, res) {
  const idUsuario = req.params.idUsuario;

  usuarioImgModel.buscarImagem(idUsuario)
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
  salvarImagem,
  buscarImagem
}