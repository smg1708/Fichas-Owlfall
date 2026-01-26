console.log("ID do usuário:", sessionStorage.ID_USUARIO);

function mudarImagem() {
    inpImagem.click();
}

function salvarImagem() {
    var foto = inpImagem.files[0]
    
    const formData = new FormData();
    formData.append('idUsuario', sessionStorage.ID_USUARIO);
    formData.append('fotoPersonagem', foto)

    fetch("/imagem", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        imgPerfil.src = `../assets/imgsBd/${dados.imagem}`
        imgPerfilNav.src = `../assets/imgsBd/${dados.imagem}`
    })
    .catch(
        err => console.log(err)
    );
}

window.onload = () => {
  const idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/imagem/${idUsuario}`)
    .then(res => res.json())
    .then(dados => {
      const imgPerfil = document.getElementById('imgPerfil');
      const imgPerfilNav = document.getElementById('imgPerfilNav');

      if (dados.imagem) {
        imgPerfil.src = `../assets/imgsBd/${dados.imagem}`;
        imgPerfilNav.src = `../assets/imgsBd/${dados.imagem}`;
      } else {
        imgPerfil.src = `/assets/imgs/todos/usuario.png`;
        imgPerfilNav.src = `/assets/imgs/todos/usuario.png`;
      }
    });
};

function usuario() {
    window.location = "usuario.html"
}