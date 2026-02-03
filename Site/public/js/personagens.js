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
                
                <img src="/assets/imgsBd/${fichas[i].imagem}">

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


function novo() {
    window.location = "criando.html"
}

function usuario() {
    window.location = "usuario.html"
}