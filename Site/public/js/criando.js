
var idUsuario = sessionStorage.ID_USUARIO
var statusMax = {}
var classes = ""

if (!sessionStorage.ID_USUARIO) {
  alert("Você precisa estar logado!");
  window.location = "login.html";
}

function mundano() {

    classes = "mundano"
    statusMax =  {
        'vida': 150,
        'sanidade': 8,
        'nen': 0
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function fortificador() {

    classes = "fortificador"
    statusMax =  {
        'vida': 500,
        'sanidade': 15,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function transmutador() {

    classes = "transmutador"
    statusMax =  {
        'vida': 470,
        'sanidade': 15,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function emissor() {

    classes = "emissor"
    statusMax =  {
        'vida': 460,
        'sanidade': 16,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function manipulador() {

    classes = "manipulador"
    statusMax =  {
        'vida': 450,
        'sanidade': 17,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function conjurador() {

    classes = "conjurador"
    statusMax =  {
        'vida': 450,
        'sanidade': 16,
        'nen': 166
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function especialista() {

    classes = "especialista"
    statusMax =  {
        'vida': 420,
        'sanidade': 16,
        'nen': 186
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

}

function criacao() {
    if (classes == "") {
        mundano()
    }
    return {
        idUsuario: sessionStorage.ID_USUARIO,
        nome: inp_nome.value,
        jogador: inp_jogador.value,
        classe: classes,
        statusMax: statusMax,
        aparencia: inp_aparencia.value,
        personalidade: inp_personalidade.value,
        descricao: inp_descricao.value,
        objetivo: inp_objetivo.value,
        atributos: {
            agilidade: Number(agilidade.value),
            forca: Number(forca.value),
            intelecto: Number(intelecto.value),
            presenca: Number(presenca.value),
            vigor: Number(vigor.value)
        },
        reacao: {
            defesa: 10 + Number(agilidade.value),
            equipamento: 0,
            outrosDefesa: 0,
            bloqueio: 0,
            esquiva: 0,
            protecao: "",
            resistencia: ""
        },
    }
}

function criarFicha() {
    const ficha = criacao()

    fetch("/criar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ficha), 
    })
    .then(res => res.json())
    .then((dados) => {
        const idFicha = dados.idFicha

        sessionStorage.ID_FICHA = idFicha

        if (classes == "mundano") {
            window.location = "fichas.html?id=" + idFicha;
        } else if (classes == "fortificador") {
            window.location = "fichasF.html?id=" + idFicha;
        } else if (classes == "transmutador") {
            window.location = "fichasT.html?id=" + idFicha;
        } else if (classes == "emissor") {
            window.location = "fichasE.html?id=" + idFicha;
        } else if (classes == "manipulador") {
            window.location = "fichasM.html?id=" + idFicha;
        } else if (classes == "conjurador") {
            window.location = "fichasC.html?id=" + idFicha;
        } else if (classes == "especialista") {
            window.location = "fichasP.html?id=" + idFicha;
        }
    })
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