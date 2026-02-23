// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }

function confirmar() {

    fetch("/campanha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: sessionStorage.ID_USUARIO,
            nome: nome.value,
            descricao: descricao.value,
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

function confirmarCodigo() {
    codigo = carregarCodigo.value

    fetch("/cadastrarCampanha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify({
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

        sessionStorage.ID_USUARIO = dados[0].idUsuario;
        sessionStorage.ID_FICHA = dados[0].idFicha;
        sessionStorage.ID_CAMPANHA = dados[0].idCampanha;

        alert("Você entrou na campanha com sucesso!")

    })
    .catch(function(resposta) {
        console.log("Erro: " + resposta)
    })
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

// <!-- <div class="boxFichaCampanhas">
//     <img src="/assets/imgsBd/${fichas[i].imagem}">

//     <div class="infoCampanha">
//         <span><b>${fichas[i].nome}</b></span>
//         <span>Classe: ${fichas[i].classe || "???"}</span>

//     <button onclick="abrirFicha(${fichas[i].idFicha})">
//         Acessar Ficha
//     </button>
//     </div>
// </div> -->