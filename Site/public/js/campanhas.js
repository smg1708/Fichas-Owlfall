// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }

const idUsuario = sessionStorage.ID_USUARIO;

window.onload = mostrar;

function confirmar() {

    codigo = ""
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 6; i++) {
        codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
    }

    if (nome.value.trim() == "") {
        alert("Nome da campanha vazio!!!");
        return
    } else {
        fetch("/campanha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: sessionStorage.ID_USUARIO,
                nome: nome.value,
                descricao: descricao.value,
                codigo: codigo
            })
        })    .then(resposta => {
            if (!resposta.ok) {
                throw "Erro ao cadastrar campanha";
            }
            return resposta.json();
        })
        .then(dados => {
            alert("Campanha cadastrada com sucesso");
            criandoId.style.display = "none";
    
            sessionStorage.ID_FICHA = dados.idFicha;
        })
        .catch(err => {
            console.log("Erro:", err);
        });
    }

}

function confirmarCodigo() {
    const codigo = carregarCodigo.value
    if (!codigo.trim()) {
        alert("Informe o codigo da campanha!!!");
        return
    } else {
        fetch("/cadastrarCampanha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify({
                idUsuario: sessionStorage.ID_USUARIO,
                codigoServer: codigo
            })
        })
        .then(function(resposta) {
            console.log("resposta: " + resposta);
    
            if (resposta.ok) {
                return resposta.json();
            } else {
                alert("Houve um erro ao tentar entrar na campanha!")
                throw "Houve um erro ao tentar entrar na campanha!";
            }
        })
        .then(function(dados) {
            sessionStorage.ID_CAMPANHA = dados.idCampanha;
            alert("Você entrou na campanha com sucesso!")
        })
        .catch(function(resposta) {
            console.log("Erro: " + resposta)
        })
    }

}

function mostrar() {
    var mensagem = "";

    fetch(`/mostrarCampanhas/${idUsuario}`, {
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (campanhas) {
        boxCampanha.innerHTML = "";

        for (var i = 0; i < campanhas.length; i++) {
          mensagem += `
            <div class="boxFichaCampanhas">
                <img src="/assets/imgsBd/${campanhas[i].imagem}">

                <div class="infoCampanha">
                    <span><b>${campanhas[i].nome}</b></span>
                    <span id="registro">Registro: ${campanhas[i].criado || "???"}</span>
                <button onclick="abrirCampanha(${campanhas[i].idCampanha})">
                    Acessar Campanha
                </button>
                </div>
            </div>
        `}
        boxCampanha.innerHTML = mensagem;
    });
}

function abrirCampanha(idCampanha) {
    sessionStorage.ID_CAMPANHA = idCampanha

    window.location = "mestre.html?id=" + idCampanha;
}

function entrar() {
    addCodigo.style.display = "flex"
}

function fecharCodigo() {
    addCodigo.style.display = "none";
}

function fecharCriacaoCodigo() {
    addCodigo.style.display = "none";
}

function usuario() {
    window.location = "usuario.html"
}

function novo() {
    criandoId.style.display = "flex"
}

function fecharCriacao() {
    criandoId.style.display = "none";
}

// <div class="boxFichaCampanhas">
//     <img src="/assets/imgsBd/${fichas[i].imagem}">
// 
//     <div class="infoCampanha">
//         <span><b>${fichas[i].nome}</b></span>
//         <span>Classe: ${fichas[i].classe || "???"}</span>
// 
//     <button onclick="abrirFicha(${fichas[i].idFicha})">
//         Acessar Ficha
//     </button>
//     </div>
// </div>