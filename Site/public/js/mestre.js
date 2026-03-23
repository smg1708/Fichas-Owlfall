// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }
let uploadAtivo = false;
let codigo = null;

window.onload = () => {
    carregarCampanha()
    carregarImagem()
    mostrarPersonagens()
}

function salvarImagemCampanha() {
    var foto = inpImagemCampanha.files[0]
    
    const formData = new FormData();
    formData.append('idCampanha', sessionStorage.ID_CAMPANHA);
    formData.append('fotoCampanha', foto)

    fetch("/imagemCampanha", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const imagemCampanha = document.getElementById("imgCampanha");
  
        if (imagemCampanha) {
            imagemCampanha.src = `${dados.imagem}`;
        }
        carregarImagem()
      })
    .catch(
        err => console.log(err)
    );
}

function carregarImagem() {
    const idCampanha = sessionStorage.ID_CAMPANHA;

    fetch(`/imagemCampanha/${idCampanha}`)
        .then(res => res.json())
        .then(dados => {
            const imagemCampanha = document.getElementById("imgCampanha");

            if (dados.imagem) {
                if (imagemCampanha) { 
                    imagemCampanha.src = `/imgsBd/${dados.imagem}`;
                }
            } else {
                if (imagemCampanha) { 
                    imagemCampanha.src = `/assets/imgs/campanhas/background.png`;
                }
            }
    });
}

function mudarImagemCampanha() {
    inpImagemCampanha.click();
}

function usuario() {
    window.location = "usuario.html"
}

function convidar() {
    const idCampanha = sessionStorage.ID_CAMPANHA;

    fetch(`/carregarCodigo/${idCampanha}`)
        .then(res => {
            if (!res.ok) return null;
            return res.json();
        })
        .then(dados => {
            if (dados && dados.length > 0 && dados[0].codigo) {
                codigo = dados[0].codigo;
            } else {
                codigo = null;
            }
            console.log(codigo)
            codigoConvite.innerHTML = `${codigo}`
            addCodigo.style.display = "flex"
        })
        .catch(err => {
            console.log("Erro ao carregar código:", err);
            codigo = null;
    });
}

function carregarCampanha() {
    const idCampanha = sessionStorage.ID_CAMPANHA;
    
    fetch(`/carregar/${idCampanha}`)
    .then(res => res.json())
    .then(dados => {
    
        const campanha = dados[0]
        console.log(campanha)
    
        document.getElementById("nomeCampanha").innerHTML = campanha.nome
    
    })
}

function mostrarPersonagens() {
    const idCampanha = sessionStorage.ID_CAMPANHA;
    var mensagem = "";

    fetch(`/mostrarFichaCampanha/${idCampanha}`, {
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (fichas) {
        boxPersonagens.innerHTML = "";

        for (var i = 0; i < fichas.length; i++) {
          mensagem += `
            <div class="box-ficha-personagens">
                
                <img src="${fichas[i].imagem}">

                <div class="info-personagem">
                    <span><b>${fichas[i].nomePersonagem}</b></span>
                    <span id="classe">${primeiraLetraMaiuscula(fichas[i].classe || "???")}</span>
                    <span id="registro">Registro: ${fichas[i].criado || "???"}</span>

                <button onclick="abrirFicha(${fichas[i].idFicha}, '${fichas[i].classe}')">
                    Acessar Ficha
                </button>
                </div>
            </div>
        `}
        boxPersonagens.innerHTML = mensagem;
    });
}

function primeiraLetraMaiuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function abrirFicha(idFicha, classe) {
  sessionStorage.ID_FICHA = idFicha

  classe = classe.toLowerCase()

  if (classe == "mundano") {
    window.location = "fichas.html?id=" + idFicha;
  } else if (classe == "fortificador") {
    window.location = "fichasF.html?id=" + idFicha;
  } else if (classe == "transmutador") {
    window.location = "fichasT.html?id=" + idFicha;
  } else if (classe == "emissor") {
    window.location = "fichasE.html?id=" + idFicha;
  } else if (classe == "manipulador") {
    window.location = "fichasM.html?id=" + idFicha;
  } else if (classe == "conjurador") {
    window.location = "fichasC.html?id=" + idFicha;
  } else if (classe == "especialista") {
    window.location = "fichasP.html?id=" + idFicha;
  } else {
    alert("Classe inválida: " + classe)
  }
}

function editar() {
    const idCampanha = sessionStorage.ID_CAMPANHA;
    edit.style.display = "flex"

    fetch(`/carregarEdicao/${idCampanha}`)
        .then(res => {
            if (!res.ok) return null;
            return res.json();
        })
        .then(dados => {
            nomeEditar.value = dados[0].nome
            descricaoEditar.value = dados[0].descricao
        })
        .catch(err => {
            console.log("Erro ao carregar edicao:", err);
    });
}

function confirmarEdicao() {
    const edicao = {
        nome: document.getElementById("nomeEditar").value,
        descricao: document.getElementById("descricaoEditar").value
    }

    console.log(edicao)
    
    const idCampanha = sessionStorage.ID_CAMPANHA;
    
    fetch(`/editar/${idCampanha}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(edicao)
    })
    .then(res => res.json())
    .then(dados => {
        console.log("Editado:", dados)
        fecharEdicao()
        carregarCampanha()
    })
    .catch(err => console.log(err))
}

function adicionar() {
    window.location = "escolherPers.html"
}

function fecharCriacaoCodigo() {
    addCodigo.style.display = "none";
}

function foto() {
    addFoto.style.display = "flex"
}

function fecharCriacaoFoto() {
    addFoto.style.display = "none";
}

function fecharEdicao() {
    edit.style.display = "none";
}