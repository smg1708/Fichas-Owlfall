// if (!sessionStorage.ID_USUARIO) {
//   alert("Você precisa estar logado!");
//   window.location = "login.html";
// }

function usuario() {
    window.location = "usuario.html"
}

function novaHab() {
    criandoHabId.style.display = "flex"
}

function fecharCriacaoHab() {
    criandoHabId.style.display = "none";
}

function novaInv() {
    criandoInvId.style.display = "flex"
}

function fecharCriacaoInv() {
    criandoInvId.style.display = "none";
}

function pericias() {
    periciasTotal.style.display = "block";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "none";
}

function habilidades() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "block";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "none";
}

function inventario() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "block";
    descricaoTotal.style.display = "none";
}

function descricao() {
    periciasTotal.style.display = "none";
    habilidadesTotal.style.display = "none";
    inventarioTotal.style.display = "none";
    descricaoTotal.style.display = "block";
}