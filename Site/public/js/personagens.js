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

                <button onclick="abrirFicha(${fichas[i].idFicha})">
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

if (!sessionStorage.ID_USUARIO) {
  alert("Você precisa estar logado!");
  window.location = "login.html";
}

function novo() {
    window.location = "criando.html"
}

function usuario() {
    window.location = "usuario.html"
}