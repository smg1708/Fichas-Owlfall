function pegarFicha() {
    return {
        base: {
            nome: nome.value,
            jogador: jogador.value,
            classe: classe.value,
            nivel: Number(selectNivel.value)
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
            sentimental1.value,
            sentimental2.value,
            sentimental3.value,
            sentimental4.value
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
            historia: historia.value,
            objetivo: objetivo.value
        },
    
        atributos: {
            agil: agil.value,
            forc: forc.value,
            inte: inte.value,
            prec: prec.value,
            vigo: vigo.value,
            tran: tran.value,
            fort: fort.value,
            emis: emis.value,
            conj: conj.value,
            mani: mani.value
        }
    };
}

function salvarFicha() {
    const ficha = pegarFicha()

    fetch("/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ficha)
    })
}

// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }

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

function descricao() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "block";
}