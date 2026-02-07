const fs = require("fs");
const path = require("path");
var fichaModel = require("../models/fichaModel");

function atualizarFicha(req, res) {
    console.log("BODY RECEBIDO:", req.body)
    const idFicha = req.params.idFicha
    const ficha = req.body

    if (!idFicha) {
        return res.status(400).send("ID da ficha não enviado")
    }

    fichaModel.atualizarFicha(idFicha, ficha)
        .then(resultado => 
            res.json(resultado)
        )
        .catch(erro => {
            console.error("Erro ao atualizar ficha:", erro)
            res.status(500).json({
                erro: true,
                mensagem: erro.sqlMessage || erro.message || "Erro interno no servidor"
            })
        })

}

function carregarFicha(req, res) {
    const idFicha = req.query.idFicha

    if (!idFicha) {
        return res.status(400).send("ID da ficha não enviado")
    }

    fichaModel.carregarFicha(idFicha)
        .then(resultado => 
            res.json(resultado)
        )
        .catch(erro => {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function inventarioVer(req, res) {
    const idFicha = req.params.idFicha;

    if (!idFicha) {
        return res.status(400).send("ID da ficha não informado!");
    }

    fichaModel.inventarioVer(idFicha)
        .then(resultado => {
            console.log(`Resultados encontrados: ${resultado.length}`);

            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(204).send([]);
            }
        })
        .catch(erro => {
            console.error("Erro ao carregar inventário:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function habilidadeVer(req, res) {
    var idFicha = req.params.idFicha;

    if (idFicha == undefined) {
        res.status(400).send("Fichas não foram carregadas!");
    } else {

        fichaModel.inventarioVer(idFicha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    }   else {
                        res.status(403).send("Inventario não foi carregado!");
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

function confirmarHab(req, res) {
    var idFicha = req.body.idFicha
    var nome = req.body.nome
    var descricao = req.body.descricao
    var imagem = req.body.imagem

    if (nome == undefined || descricao == undefined || idFicha == undefined) {
        res.status(400).send("Alguma credencial importante não enviada!");
    } else {
        fichaModel.confirmarHab(idFicha, nome, descricao, imagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da Habilidade! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function confirmarInv(req, res) {
    var idFicha = req.body.idFicha
    var nome = req.body.nome
    var descricao = req.body.descricao
    var imagem = req.body.imagem

    if (nome == undefined || descricao == undefined || idFicha == undefined) {
        res.status(400).send("Alguma credencial importante não enviada!");
    } else {
        fichaModel.confirmarInv(idFicha, nome, descricao, imagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ) .catch(
                function(erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do item! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function salvarImagemFicha(req, res) {
  var idFicha = req.body.idFicha;
  const novaImagem = req.file?.filename;
  
  if (!idFicha || !novaImagem) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  fichaModel.buscarImagemFicha(idFicha)
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

      return fichaModel.salvarImagemFicha(idFicha, novaImagem);
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

function buscarImagemFicha(req, res) {
  const idFicha = req.params.idFicha;

  fichaModel.buscarImagemFicha(idFicha)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].imagem) {
        res.json({ imagem: resultado[0].imagem });
      } else {
        res.json({ imagem: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

function salvarImagemSentimental1(req, res) {
  var idFicha = req.body.idFicha;
  const novaImagemSentimental1 = req.file?.filename;
  
  if (!idFicha || !novaImagemSentimental1) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  fichaModel.buscarImagemSentimental1(idFicha)
    .then(resultado => {
      const imagemAntigaSentimental1 = resultado[0]?.sentimental1;

      if (imagemAntigaSentimental1 && imagemAntigaSentimental1 !== "usuario.png") {
        const caminhoImagemSentimental1 = path.join(__dirname, "../../assets/imgsBd", imagemAntigaSentimental1);

        fs.unlink(caminhoImagemSentimental1, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntigaSentimental1);
          }
        });
      }

      return fichaModel.salvarImagemSentimental1(idFicha, novaImagemSentimental1);
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

function buscarImagemSentimental1(req, res) {
  const idFicha = req.params.idFicha;

  fichaModel.buscarImagemFicha(idFicha)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].sentimental1) {
        res.json({ sentimental1: resultado[0].sentimental1 });
      } else {
        res.json({ sentimental1: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

function salvarImagemSentimental2(req, res) {
  var idFicha = req.body.idFicha;
  const novaImagemSentimental2 = req.file?.filename;
  
  if (!idFicha || !novaImagemSentimental2) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  fichaModel.buscarImagemSentimental2(idFicha)
    .then(resultado => {
      const imagemAntigaSentimental2 = resultado[0]?.sentimental2;

      if (imagemAntigaSentimental2 && imagemAntigaSentimental2 !== "usuario.png") {
        const caminhoImagemSentimental2 = path.join(__dirname, "../../assets/imgsBd", imagemAntigaSentimental2);

        fs.unlink(caminhoImagemSentimental2, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntigaSentimental2);
          }
        });
      }

      return fichaModel.salvarImagemSentimental2(idFicha, novaImagemSentimental2);
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

function buscarImagemSentimental2(req, res) {
  const idFicha = req.params.idFicha;

  fichaModel.buscarImagemFicha(idFicha)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].sentimental2) {
        res.json({ sentimental2: resultado[0].sentimental2 });
      } else {
        res.json({ sentimental2: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

function salvarImagemSentimental3(req, res) {
  var idFicha = req.body.idFicha;
  const novaImagemSentimental3 = req.file?.filename;
  
  if (!idFicha || !novaImagemSentimental3) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  fichaModel.buscarImagemSentimental3(idFicha)
    .then(resultado => {
      const imagemAntigaSentimental3 = resultado[0]?.sentimental3;

      if (imagemAntigaSentimental3 && imagemAntigaSentimental3 !== "usuario.png") {
        const caminhoImagemSentimental3 = path.join(__dirname, "../../assets/imgsBd", imagemAntigaSentimental3);

        fs.unlink(caminhoImagemSentimental3, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntigaSentimental3);
          }
        });
      }

      return fichaModel.salvarImagemSentimental3(idFicha, novaImagemSentimental3);
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

function buscarImagemSentimental3(req, res) {
  const idFicha = req.params.idFicha;

  fichaModel.buscarImagemFicha(idFicha)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].sentimental3) {
        res.json({ sentimental3: resultado[0].sentimental3 });
      } else {
        res.json({ sentimental3: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

function salvarImagemSentimental4(req, res) {
  var idFicha = req.body.idFicha;
  const novaImagemSentimental4 = req.file?.filename;
  
  if (!idFicha || !novaImagemSentimental4) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada" });
  }

  fichaModel.buscarImagemSentimental4(idFicha)
    .then(resultado => {
      const imagemAntigaSentimental4 = resultado[0]?.sentimental4;

      if (imagemAntigaSentimental4 && imagemAntigaSentimental4 !== "usuario.png") {
        const caminhoImagemSentimental4 = path.join(__dirname, "../../assets/imgsBd", imagemAntigaSentimental4);

        fs.unlink(caminhoImagemSentimental4, (err) => {
          if (err) {
            console.log("Erro ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem antiga apagada:", imagemAntigaSentimental4);
          }
        });
      }

      return fichaModel.salvarImagemSentimental4(idFicha, novaImagemSentimental4);
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

function buscarImagemSentimental4(req, res) {
  const idFicha = req.params.idFicha;

  fichaModel.buscarImagemFicha(idFicha)
    .then(resultado => {
      if (resultado.length > 0 && resultado[0].sentimental4) {
        res.json({ sentimental4: resultado[0].sentimental4 });
      } else {
        res.json({ sentimental4: null });
      }
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
    atualizarFicha,
    carregarFicha,
    confirmarHab,
    confirmarInv,
    salvarImagemFicha,
    buscarImagemFicha,
    salvarImagemSentimental1,
    buscarImagemSentimental1,
    salvarImagemSentimental2,
    buscarImagemSentimental2,
    salvarImagemSentimental3,
    buscarImagemSentimental3,
    salvarImagemSentimental4,
    buscarImagemSentimental4,
    inventarioVer,
    habilidadeVer
}