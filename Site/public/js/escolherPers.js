// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }

const idUsuario = sessionStorage.ID_USUARIO;

window.onload = mostrarPersonagens;

function mostrarPersonagens() {
    var mensagem = "";

    fetch(`/mostrar/${idUsuario}`, {
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

                <button onclick="selecionarFicha(${fichas[i].idFicha}, '${fichas[i].classe}')">
                    Escolher Ficha
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

function selecionarFicha() {
    fetch("/cadastrarFicha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify({
            idFicha: sessionStorage.ID_FICHA,
            idCampanha: sessionStorage.ID_CAMPANHA
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

    window.location = "mestre.html?id=" + sessionStorage.ID_CAMPANHA;
}


function novo() {
    window.location = "criando.html"
}

function usuario() {
    window.location = "usuario.html"
}