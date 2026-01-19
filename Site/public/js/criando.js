function criarFicha() {
    window.location = "fichasT.html"
}

function atributos() {
    atributosId.style.display = "flex"
    classesId.style.display = "none"
    caracteristicasId.style.display = "none"
}

function classe() {
    atributosId.style.display = "none"
    classesId.style.display = "flex"
    caracteristicasId.style.display = "none"
}

function caracteristicas() {
    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"
}