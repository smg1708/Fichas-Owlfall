// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }
let uploadAtivo = false;
let codigo = null;

window.onload = () => {
    const idCampanha = sessionStorage.ID_CAMPANHA;
    
    fetch(`/imagemCampanha/${idCampanha}`)
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