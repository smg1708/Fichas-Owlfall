if (!sessionStorage.ID_USUARIO) {
  alert("Você precisa estar logado!");
  window.location = "login.html";
}

window.onload = () => {
  carregarFicha()

  const idFicha = sessionStorage.ID_FICHA;

  fetch(`/imagemFicha/${idFicha}`)
    .then(res => res.json())
    .then(dados => {
      const imagemFicha = document.getElementById("imgPersonagem");

      if (dados.imagem) {
        if (imagemFicha) { 
          imagemFicha.src = `/assets/imgsBd/${dados.imagem}`;
        }
      } else {
        if (imagemFicha) { 
            imagemFicha.src = `/assets/imgs/todos/usuario.png`;
        }
      }

    });

  fetch(`/imagemSentimental1/${idFicha}`)
    .then(res => res.json())
    .then(dados => {
      const sentimental1 = document.getElementById("sentimental1");

      if (dados.sentimental1) {
        if (sentimental1) { 
          sentimental1.src = `/assets/imgsBd/${dados.sentimental1}`;
        }
      } else {
        if (sentimental1) { 
            sentimental1.src = `/assets/imgs/todos/usuario.png`;
        }
      }

    });

  fetch(`/imagemSentimental2/${idFicha}`)
    .then(res => res.json())
    .then(dados => {
      const sentimental2 = document.getElementById("sentimental2");

      if (dados.sentimental2) {
        if (sentimental2) { 
          sentimental2.src = `/assets/imgsBd/${dados.sentimental2}`;
        }
      } else {
        if (sentimental2) { 
            sentimental2.src = `/assets/imgs/todos/usuario.png`;
        }
      }

    });

  fetch(`/imagemSentimental3/${idFicha}`)
    .then(res => res.json())
    .then(dados => {
      const sentimental3 = document.getElementById("sentimental3");

      if (dados.sentimental3) {
        if (sentimental3) { 
          sentimental3.src = `/assets/imgsBd/${dados.sentimental3}`;
        }
      } else {
        if (sentimental3) { 
            sentimental3.src = `/assets/imgs/todos/usuario.png`;
        }
      }

    });

  fetch(`/imagemSentimental4/${idFicha}`)
    .then(res => res.json())
    .then(dados => {
      const sentimental4 = document.getElementById("sentimental4");

      if (dados.sentimental4) {
        if (sentimental4) { 
          sentimental4.src = `/assets/imgsBd/${dados.sentimental4}`;
        }
      } else {
        if (sentimental4) { 
            sentimental4.src = `/assets/imgs/todos/usuario.png`;
        }
      }

    });
};

var ultimaFicha = null
var timeoutSave = null

const idFicha = sessionStorage.ID_FICHA;

document.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("change", marcarAlteracao)
    el.addEventListener("input", marcarAlteracao)
})

function subirVida() {
    vidaAtual.value = Number(vidaAtual.value) + 1
}

function subirMaisVida() {
    vidaAtual.value = Number(vidaAtual.value) + 5
}

function subirSanidade() {
    sanidadeAtual.value = Number(sanidadeAtual.value) + 1
}

function subirMaisSanidade() {
    sanidadeAtual.value = Number(sanidadeAtual.value) + 5
}

function subirNen() {
    nenAtual.value = Number(nenAtual.value) + 1
}

function subirMaisNen() {
    nenAtual.value = Number(nenAtual.value) + 5
}

function abaixarVida() {
    vidaAtual.value = Number(vidaAtual.value) - 1
}

function abaixarMaisVida() {
    vidaAtual.value = Number(vidaAtual.value) - 5
}

function abaixarSanidade() {
    sanidadeAtual.value = Number(sanidadeAtual.value) - 1
}

function abaixarMaisSanidade() {
    sanidadeAtual.value = Number(sanidadeAtual.value) - 5
}

function abaixarNen() {
    nenAtual.value = Number(nenAtual.value) - 1
}

function abaixarMaisNen() {
    nenAtual.value = Number(nenAtual.value) - 5
}


function mudarImagemFicha() {
    inpImagemPersonagem.click();
}

function mudarImagemSentimental1() {
    inpImagemSentimental1.click();
}

function mudarImagemSentimental2() {
    inpImagemSentimental2.click();
}

function mudarImagemSentimental3() {
    inpImagemSentimental3.click();
}

function mudarImagemSentimental4() {
    inpImagemSentimental4.click();
}

function salvarImagemFicha() {
    var foto = inpImagemPersonagem.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
    formData.append('fotoFicha', foto)

    fetch("/imagemFicha", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const imagemFicha = document.getElementById("imgPersonagem");
  
        if (imagemFicha) {
            imagemFicha.src = `${dados.imagem}`;
        }
      })
    .catch(
        err => console.log(err)
    );
}

function salvarImagemSentimental1() {
    var foto = inpImagemSentimental1.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
    formData.append('fotoSentimental1', foto)

    fetch("/imagemSentimental1", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const sentimental1 = document.getElementById("sentimental1");
  
 	if (sentimental1) {
        sentimental1.src = `${dados.sentimental1}`
      }
    })
    .catch(
        err => console.log(err)
    );
}

function salvarImagemSentimental2() {
    var foto = inpImagemSentimental2.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
    formData.append('fotoSentimental2', foto)

    fetch("/imagemSentimental2", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const sentimental2 = document.getElementById("sentimental2");
  
 	if (sentimental2) {
        sentimental2.src = `${dados.sentimental2}`
      }
    })
    .catch(
        err => console.log(err)
    );
}

function salvarImagemSentimental3() {
    var foto = inpImagemSentimental3.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
    formData.append('fotoSentimental3', foto)

    fetch("/imagemSentimental3", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const sentimental3 = document.getElementById("sentimental3");
  
 	if (sentimental3) {
        sentimental3.src = `${dados.sentimental3}`
      }
    })
    .catch(
        err => console.log(err)
    );
}

function salvarImagemSentimental4() {
    var foto = inpImagemSentimental4.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
    formData.append('fotoSentimental4', foto)

    fetch("/imagemSentimental4", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const sentimental4 = document.getElementById("sentimental4");
  
 	if (sentimental4) {
        sentimental4.src = `${dados.sentimental4}`
      }
    })
    .catch(
        err => console.log(err)
    );
}

function getPericia(dados, nome) {
    return dados.pericias?.[nome] ?? { bonus: 0, treino: 0, outros: 0 }
}

function carregarFicha() {
    const inpAnotacoes = document.getElementById("anotacoes")
    const inpAparencia = document.getElementById("aparencia")
    const inpPersonalidade = document.getElementById("personalidade")
    const inpDescricao = document.getElementById("descricao")
    const inpObjetivo = document.getElementById("objetivo")

    fetch(`/carregar?idFicha=${idFicha}`,{
    })
    .then(function(resposta){
        return resposta.json()
    })
    .then(function(dados){
        console.log(dados)

            if (dados.base.imagem) {
                if (dados.base.imagem.startsWith("http")) {
                    imgPersonagem.src = dados.base.imagem
                } else {
                    imgPersonagem.src = `/assets/imgsBd/${dados.base.imagem}`
                }
            } if (dados.base.sentimental1) {
                if (dados.base.sentimental1.startsWith("http")) {
                    sentimental1.src = dados.base.sentimental1
                } else {
                    sentimental1.src = `/assets/imgsBd/${dados.base.sentimental1}`
                }
            } if (dados.base.sentimental2) {
                if (dados.base.sentimental2.startsWith("http")) {
                    sentimental2.src = dados.base.sentimental2
                } else {
                    sentimental2.src = `/assets/imgsBd/${dados.base.sentimental2}`
                }
            } if (dados.base.sentimental3) {
                if (dados.base.sentimental3.startsWith("http")) {
                    sentimental3.src = dados.base.sentimental3
                } else {
                    sentimental3.src = `/assets/imgsBd/${dados.base.sentimental3}`
                }
            } if (dados.base.sentimental4) {
                if (dados.base.sentimental4.startsWith("http")) {
                    sentimental4.src = dados.base.sentimental4
                } else {
                    sentimental4.src = `/assets/imgsBd/${dados.base.sentimental4}`
                }
            }
            nome.value = dados.base.nomePersonagem
            jogador.value = dados.base.jogador
            classe.value = dados.base.classe
            selectNivel.value = dados.base.nivel
            
            vidaAtual.value = dados.status.vidaAtual
            vidaMax.value = dados.status.vidaMax
            sanidadeAtual.value = dados.status.sanidadeAtual
            sanidadeMax.value = dados.status.sanidadeMax
            nenAtual.value = dados.status.nenAtual
            nenMax.value = dados.status.nenMax
            
            defesa.value = dados.reacao.defesa
            equip.value = dados.reacao.equipamento
            outrosDef.value = dados.reacao.outrosDefesa
            bloqueioDef.value = dados.reacao.bloqueio
            esquivaDef.value = dados.reacao.esquiva
            protecao.value = dados.reacao.protecao
            resistencia.value = dados.reacao.resistencia

            inpAnotacoes.value = dados.base.anotacoes
            inpAparencia.value = dados.base.aparencia
            inpPersonalidade.value = dados.base.personalidade
            inpDescricao.value = dados.base.descricao
            inpObjetivo.value = dados.base.objetivo

            const adestramento = getPericia(dados, "adestramento")
                bonusAdestramento.value = adestramento.bonus
                treinoAdestramento.value = adestramento.treino
                outrosAdestramento.value = adestramento.outros

            const artes = getPericia(dados, "artes")
                bonusArtes.value = artes.bonus
                treinoArtes.value = artes.treino
                outrosArtes.value = artes.outros

            const atletismoAcrobacia = getPericia(dados, "atletismoAcrobacia")
                bonusAtleteAcrob.value = atletismoAcrobacia.bonus
                treinoAtleteAcrob.value = atletismoAcrobacia.treino
                outrosAtleteAcrob.value = atletismoAcrobacia.outros

            const ciencias = getPericia(dados, "ciencias")
                bonusCiencias.value = ciencias.bonus
                treinoCiencias.value = ciencias.treino
                outrosCiencias.value = ciencias.outros

            const diplomacia = getPericia(dados, "diplomacia")
                bonusDiplomacia.value = diplomacia.bonus
                treinoDiplomacia.value = diplomacia.treino
                outrosDiplomacia.value = diplomacia.outros

            const enganacao = getPericia(dados, "enganacao")
                bonusEnganacao.value = enganacao.bonus
                treinoEnganacao.value = enganacao.treino
                outrosEnganacao.value = enganacao.outros

            const fortitude = getPericia(dados, "fortitude")
                bonusFortitude.value = fortitude.bonus
                treinoFortitude.value = fortitude.treino
                outrosFortitude.value = fortitude.outros

            const furtividade = getPericia(dados, "furtividade")
                bonusFurtividade.value = furtividade.bonus
                treinoFurtividade.value = furtividade.treino
                outrosFurtividade.value = furtividade.outros

            const iniciativa = getPericia(dados, "iniciativa")
                bonusIniciativa.value = iniciativa.bonus
                treinoIniciativa.value = iniciativa.treino
                outrosIniciativa.value = iniciativa.outros

            const intimidacao = getPericia(dados, "intimidacao")
                bonusIntimidacao.value = intimidacao.bonus
                treinoIntimidacao.value = intimidacao.treino
                outrosIntimidacao.value = intimidacao.outros

            const investigacao = getPericia(dados, "investigacao")
                bonusInvestigacao.value = investigacao.bonus
                treinoInvestigacao.value = investigacao.treino
                outrosInvestigacao.value = investigacao.outros

            const luta = getPericia(dados, "luta")
                bonusLuta.value = luta.bonus
                treinoLuta.value = luta.treino
                outrosLuta.value = luta.outros

            const medicina = getPericia(dados, "medicina")
                bonusMedicina.value = medicina.bonus
                treinoMedicina.value = medicina.treino
                outrosMedicina.value = medicina.outros

            const percepcao = getPericia(dados, "percepcao")
                bonusPercepcao.value = percepcao.bonus
                treinoPercepcao.value = percepcao.treino
                outrosPercepcao.value = percepcao.outros

            const pilotagem = getPericia(dados, "pilotagem")
                bonusPilotagem.value = pilotagem.bonus
                treinoPilotagem.value = pilotagem.treino
                outrosPilotagem.value = pilotagem.outros

            const pontaria = getPericia(dados, "pontaria")
                bonusPontaria.value = pontaria.bonus
                treinoPontaria.value = pontaria.treino
                outrosPontaria.value = pontaria.outros

            const profissao = getPericia(dados, "profissao")
                bonusProfissao.value = profissao.bonus
                treinoProfissao.value = profissao.treino
                outrosProfissao.value = profissao.outros

            const reflexos = getPericia(dados, "reflexos")
                bonusReflexos.value = reflexos.bonus
                treinoReflexos.value = reflexos.treino
                outrosReflexos.value = reflexos.outros

            const sobrevivencia = getPericia(dados, "sobrevivencia")
                bonusSobrevivencia.value = sobrevivencia.bonus
                treinoSobrevivencia.value = sobrevivencia.treino
                outrosSobrevivencia.value = sobrevivencia.outros

            const espirito = getPericia(dados, "espirito")
                bonusEspirito.value = espirito.bonus
                treinoEspirito.value = espirito.treino
                outrosEspirito.value = espirito.outros

            agil.value = dados.atributos.agilidade
            forc.value = dados.atributos.força
            inte.value = dados.atributos.intelecto
            prec.value = dados.atributos.presença
            vigo.value = dados.atributos.vigor
            espe.value = dados.atributos.especialista
            tran.value = dados.atributos.transmutador
            fort.value = dados.atributos.fortificador
            emis.value = dados.atributos.emissor
            conj.value = dados.atributos.conjurador
            mani.value = dados.atributos.manipulador
            
    })
}

function marcarAlteracao() {
    clearTimeout(timeoutSave)

    timeoutSave = setTimeout(() => {
        const fichaAtual = pegarFicha()

        if (JSON.stringify(fichaAtual) !== JSON.stringify(ultimaFicha)) {
            ultimaFicha = fichaAtual
            atualizarFicha()
        }
    }, 1500)
}

function pegarFicha() {
    const ficha = {
        idFicha: sessionStorage.ID_FICHA,
        base: {
            imagem: imgPersonagem.src,
            nome: nome.value,
            jogador: jogador.value,
            classe: classe.value,
            nivel: Number(selectNivel.value),
            anotacoes: anotacoes.value,
            aparencia: aparencia.value,
            personalidade: personalidade.value,
            descricao: descricao.value,
            objetivo: objetivo.value
        },
    
        status: {
            vida: {
            atual: Number(vidaAtual.value),
            max: Number(vidaMax.value)
            },
            sanidade: {
            atual: Number(sanidadeAtual.value),
            max: Number(sanidadeMax.value)
            },
            nen: {
            atual: Number(nenAtual.value),
            max: Number(nenMax.value)
            }
        },
    
        reacao: {
            defesa: Number(defesa.value),
            equipamento: Number(equip.value),
            outrosDefesa: Number(outrosDef.value),
            bloqueio: Number(bloqueioDef.value),
            esquiva: Number(esquivaDef.value),
            protecao: protecao.value,
            resistencia: resistencia.value
        },
    
        sentimental: [
            sentimental1.src,
            sentimental2.src,
            sentimental3.src,
            sentimental4.src
        ],
    
        pericias: {
            adestramento: {
            bonus: bonusAdestramento.value,
            treino: treinoAdestramento.value,
            outros: outrosAdestramento.value
            },
            artes: {
            bonus: bonusArtes.value,
            treino: treinoArtes.value,
            outros: outrosArtes.value
            },
            atletismoAcrobacia: {
            bonus: bonusAtleteAcrob.value,
            treino: treinoAtleteAcrob.value,
            outros: outrosAtleteAcrob.value
            },
            ciencias: {
            bonus: bonusCiencias.value,
            treino: treinoCiencias.value,
            outros: outrosCiencias.value
            },
            diplomacia: {
            bonus: bonusDiplomacia.value,
            treino: treinoDiplomacia.value,
            outros: outrosDiplomacia.value
            },
            enganacao: {
            bonus: bonusEnganacao.value,
            treino: treinoEnganacao.value,
            outros: outrosEnganacao.value
            },
            fortitude: {
            bonus: bonusFortitude.value,
            treino: treinoFortitude.value,
            outros: outrosFortitude.value
            },
            furtividade: {
            bonus: bonusFurtividade.value,
            treino: treinoFurtividade.value,
            outros: outrosFurtividade.value
            },
            iniciativa: {
            bonus: bonusIniciativa.value,
            treino: treinoIniciativa.value,
            outros: outrosIniciativa.value
            },
            intimidacao: {
            bonus: bonusIntimidacao.value,
            treino: treinoIntimidacao.value,
            outros: outrosIntimidacao.value
            },
            investigacao: {
            bonus: bonusInvestigacao.value,
            treino: treinoInvestigacao.value,
            outros: outrosInvestigacao.value
            },
            luta: {
            bonus: bonusLuta.value,
            treino: treinoLuta.value,
            outros: outrosLuta.value
            },
            medicina: {
            bonus: bonusMedicina.value,
            treino: treinoMedicina.value,
            outros: outrosMedicina.value
            },
            percepcao: {
            bonus: bonusPercepcao.value,
            treino: treinoPercepcao.value,
            outros: outrosPercepcao.value
            },
            pilotagem: {
            bonus: bonusPilotagem.value,
            treino: treinoPilotagem.value,
            outros: outrosPilotagem.value
            },
            pontaria: {
            bonus: bonusPontaria.value,
            treino: treinoPontaria.value,
            outros: outrosPontaria.value
            },
            profissao: {
            bonus: bonusProfissao.value,
            treino: treinoProfissao.value,
            outros: outrosProfissao.value
            },
            reflexos: {
            bonus: bonusReflexos.value,
            treino: treinoReflexos.value,
            outros: outrosReflexos.value
            },
            sobrevivencia: {
            bonus: bonusSobrevivencia.value,
            treino: treinoSobrevivencia.value,
            outros: outrosSobrevivencia.value
            },
            espirito: {
            bonus: bonusEspirito.value,
            treino: treinoEspirito.value,
            outros: outrosEspirito.value
            }
        },
    
        habilidades: [
            {
            nome: nomeHab.value,
            descricao: descricaoHab.value,
            imagem: imagemHab.value
            }
        ],
    
        inventario: [
            {
            nome: nomeInv.value,
            descricao: descricaoInv.value,
            imagem: imagemInv.value
            }
        ],
    
        historia: {
            anotacoes: anotacoes.value,
            aparencia: aparencia.value,
            personalidade: personalidade.value,
            descricao: descricao.value,
            objetivo: objetivo.value
        },
    
        atributos: {
            agil: agil.value,
            forc: forc.value,
            inte: inte.value,
            prec: prec.value,
            vigo: vigo.value,
            espe: espe.value,
            tran: tran.value,
            fort: fort.value,
            emis: emis.value,
            conj: conj.value,
            mani: mani.value
        }
    };
    return ficha 
}

function atualizarFicha() {
    const ficha = pegarFicha()

    fetch(`/atualizar/${ficha.idFicha}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ficha)
    })
    .then(res => 
        res.json()
    )
    .then(data => 
        console.log("Ficha salva:", data)
    )
    .catch(err => 
        console.error(err)
    )
}

function usuario() {
    window.location = "usuario.html"
}

function novaHab() {
    criandoHabId.style.display = "flex"
}

function fecharCriacaoHab() {
    criandoHabId.style.display = "none";
}

function novaInv() {
    criandoInvId.style.display = "flex"
}

function fecharCriacaoInv() {
    criandoInvId.style.display = "none";
}

function pericias() {
    periciasTotal.style.display = "block";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "none";
}

function habilidades() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "block";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "none";
}

function inventario() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "block";
    descricaoTotal.style.display = "none";
}

function descricaoBtn() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "block";
}