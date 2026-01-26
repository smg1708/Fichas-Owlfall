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