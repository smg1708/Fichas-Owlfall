console.log("ID do usuário:", sessionStorage.ID_USUARIO);

function mudarImagemPerfil() {
    inpImagem.click();
}

function salvarImagemPerfil() {
    var foto = inpImagem.files[0]
    
    const formData = new FormData();
    formData.append('idUsuario', sessionStorage.ID_USUARIO);
    formData.append('fotoPerfil', foto)

    fetch("/imagemPerfil", {
        method: "PUT",
        body: formData
    })
    .then(
        res => res.json()
    )
    .then( dados => {
        console.log("Imagem salva:", dados);
        
        const imgPerfil = document.getElementById("imgPerfil");
        const imgPerfilNav = document.getElementById("imgPerfilNav");
  
        if (imgPerfil) imgPerfil.src = `../assets/imgsBd/${dados.imagem}`;
        if (imgPerfilNav) imgPerfilNav.src = `../assets/imgsBd/${dados.imagem}`;
      })
    .catch(
        err => console.log(err)
    );
}

window.onload = () => {
  const idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/imagemPerfil/${idUsuario}`)
    .then(res => res.json())
    .then(dados => {
      const imgPerfil = document.getElementById("imgPerfil");
      const imgPerfilNav = document.getElementById("imgPerfilNav");

      if (dados.imagem) {
        if (imgPerfil) { 
          imgPerfil.src = `../assets/imgsBd/${dados.imagem}`;
        }
        if (imgPerfilNav) { 
          imgPerfilNav.src = `../assets/imgsBd/${dados.imagem}`;
        }
      } else {
        if (imgPerfil) { 
          imgPerfil.src = `/assets/imgs/todos/usuario.png`;
        }
        if (imgPerfilNav) { 
          imgPerfilNav.src = `/assets/imgs/todos/usuario.png`;
        }
      }
      
    });
};

function usuario() {
    window.location = "usuario.html"
}