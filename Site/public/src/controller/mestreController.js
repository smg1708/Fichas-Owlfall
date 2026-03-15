var mestreModel = require("../models/mestreModel");

function carregarCampanha(req, res) {
    var idCampanha = req.params.idCampanha;

    if (idCampanha == undefined) {
        res.status(400).send("Campanha não foi carregada!");
    } else {

        mestreModel.carregarCampanha(idCampanha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    }   else {
                        res.status(403).send("Campanha não foi carregada!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao tentar carregar! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function convidar(req, res) {
    var idCampanha = req.body.idCampanha;
    var codigo = req.body.codigoServer

    if (!idCampanha) {
        res.status(400).send("Id da campanha não enviado");
    } else if (!codigo || !codigo.trim()) {
        return res.status(401).send("Seu codigo está undefined!");
    } else {
        mestreModel.convidar(idCampanha, codigo)
            .then(
                function(resultado) {
                    res.json(resultado)
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "Houve um erro ao entrar na campanha! Erro: " + erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

function salvarImagemCampanha(req, res) {
  var idCampanha = req.body.idCampanha;
  const novaImagem = req.file?.filename;
  
  if (!idCampanha || !novaImagem) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  mestreModel.buscarImagemCampanha(idCampanha)
    .then(resultado => {
      const imagemAntiga = resultado[0]?.imagem;

      if (imagemAntiga && imagemAntiga !== "background.png") {
        const caminhoImagem = path.join(__dirname, "../../assets/imgsBd", imagemAntiga);

        fs.unlink(caminhoImagem, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntiga);
          }
        });
      }

      return mestreModel.salvarImagemCampanha(idCampanha, novaImagem);
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

function buscarImagemCampanha(req, res) {
  const idCampanha = req.params.idCampanha;

  mestreModel.buscarImagemCampanha(idCampanha)
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
    carregarCampanha,
    convidar,
    salvarImagemCampanha,
    buscarImagemCampanha
}