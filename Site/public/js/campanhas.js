if (!sessionStorage.ID_USUARIO) {
  alert("Você precisa estar logado!");
  window.location = "login.html";
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