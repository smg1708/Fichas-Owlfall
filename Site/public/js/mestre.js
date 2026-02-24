// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }
let uploadAtivo = false;
let codigo = null;

window.onload = () => {
    const idCampanha = sessionStorage.ID_CAMPANHA;
    
    fetch(`/ImagemCampanha/${idCampanha}`)
        .then(res => res.json())
        .then(dados => {
            const imagemCampanha = document.getElementById("imgCampanha");

            if (dados.imagem) {
                if (imagemCampanha) { 
                imagemCampanha.src = `/assets/imgsBd/${dados.imagem}`;
                }
            } else {
                if (imagemCampanha) { 
                    imagemCampanha.src = `/assets/imgs/campanhas/background.png`;
                }
            }
    });
    
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
        })
        .catch(err => {
            console.log("Erro ao carregar código:", err);
            codigo = null;
    });
}

function salvarImagemCampanha() {
    var foto = inpImagemCampanha.files[0]
    
    const formData = new FormData();
    formData.append('idFicha', sessionStorage.ID_FICHA);
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
      })
    .catch(
        err => console.log(err)
    );
}

function mudarImagemCampanha() {
    inpImagemCampanha.click();
}

function usuario() {
    window.location = "usuario.html"
}

function convidar() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    if (!codigo) {
        codigo = ""
        for (let i = 0; i < 6; i++) {
            codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
        }
        codigoConvite.innerHTML = `${codigo}`
        addCodigo.style.display = "flex"

        fetch("/cadastrarCodigo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },body: JSON.stringify({
                idCampanha: sessionStorage.ID_CAMPANHA,
                codigoServer: codigo
            })
        })
        .then(function(resposta) {
            console.log("resposta: " + resposta);
    
            if (resposta.ok) {
                return resposta.json();
            } else {
                alert("Houve um erro ao tentar criar o convite da campanha!")
                throw "Houve um erro ao tentar criar o convite da campanha!";
            }
        })
        .then(function(dados) {
            sessionStorage.ID_CAMPANHA = dados.idCampanha;
            alert("Você criou a campanha com sucesso!")
        })
        .catch(function(resposta) {
            console.log("Erro: " + resposta)
        })
    } else {
        codigoConvite.innerHTML = `${codigo}`
        addCodigo.style.display = "flex"
    }
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

function editar() {
    edit.style.display = "flex"
}

function fecharEdicao() {
    edit.style.display = "none";
}

function fecharEditar() {
    edit.style.display = "none";
}