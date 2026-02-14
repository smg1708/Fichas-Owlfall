
var idUsuario = sessionStorage.ID_USUARIO
var statusMax = {}
var classes = ""

if (!sessionStorage.ID_USUARIO) {
  alert("Você precisa estar logado!");
  window.location = "login.html";
}

function mundano() {

    const vigorValor = Number(vigor.value)
    classes = "mundano"
    statusMax =  {
        'vida': 150 + vigorValor,
        'sanidade': 8,
        'nen': 0
    }
    
    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="fort" value="0">
        <input type="hidden" id="tran" value="0">
        <input type="hidden" id="emis" value="0">
        <input type="hidden" id="conj" value="0">
        <input type="hidden" id="mani" value="0">
    `

}

function fortificador() {

    const vigorValor = Number(vigor.value)
    classes = "fortificador"
    statusMax =  {
        'vida': 500 + vigorValor,
        'sanidade': 15,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="fort" value="1">
        <input type="hidden" id="tran" value="0">
        <input type="hidden" id="emis" value="0">
        <input type="hidden" id="conj" value="-1">
        <input type="hidden" id="mani" value="-1">
    `

}

function transmutador() {

    const vigorValor = Number(vigor.value)
    classes = "transmutador"
    statusMax =  {
        'vida': 470 + vigorValor,
        'sanidade': 15,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="tran" value="1">
        <input type="hidden" id="fort" value="0">
        <input type="hidden" id="conj" value="0">
        <input type="hidden" id="emis" value="-1">
        <input type="hidden" id="mani" value="-2">
    `

}

function emissor() {

    const vigorValor = Number(vigor.value)
    classes = "emissor"
    statusMax =  {
        'vida': 460 + vigorValor,
        'sanidade': 16,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="emis" value="1">
        <input type="hidden" id="fort" value="0">
        <input type="hidden" id="mani" value="0">
        <input type="hidden" id="tran" value="-1">
        <input type="hidden" id="conj" value="-2">
    `

}

function manipulador() {

    const vigorValor = Number(vigor.value)
    classes = "manipulador"
    statusMax =  {
        'vida': 450 + vigorValor,
        'sanidade': 17,
        'nen': 156
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="mani" value="1">
        <input type="hidden" id="emis" value="0">
        <input type="hidden" id="fort" value="-1">
        <input type="hidden" id="conj" value="-1">
        <input type="hidden" id="tran" value="-2">
    `

}

function conjurador() {

    const vigorValor = Number(vigor.value)
    classes = "conjurador"
    statusMax =  {
        'vida': 450 + vigorValor,
        'sanidade': 16,
        'nen': 166
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="conj" value="1">
        <input type="hidden" id="tran" value="0">
        <input type="hidden" id="fort" value="-1">
        <input type="hidden" id="mani" value="-1">
        <input type="hidden" id="emis" value="-2">
    `

}

function especialista() {

    const vigorValor = Number(vigor.value)
    classes = "especialista"
    statusMax =  {
        'vida': 420 + vigorValor,
        'sanidade': 16,
        'nen': 186
    }

    atributosId.style.display = "none"
    classesId.style.display = "none"
    caracteristicasId.style.display = "flex"

    completarEscondido.innerHTML = `
        <input type="hidden" id="espe" value="1">
        <input type="hidden" id="mani" value="0">
        <input type="hidden" id="conj" value="0">
        <input type="hidden" id="tran" value="-1">
        <input type="hidden" id="emis" value="-1">
        <input type="hidden" id="fort" value="-2">
    `

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
        anotacoes: document.getElementById("inp_anotacoes").value,
        aparencia: document.getElementById("inp_aparencia").value,
        personalidade: document.getElementById("inp_personalidade").value,
        descricao: document.getElementById("inp_descricao").value,
        objetivo: document.getElementById("inp_objetivo").value,
        atributos: {
            agilidade: Number(agilidade.value),
            forca: Number(forca.value),
            intelecto: Number(intelecto.value),
            presenca: Number(presenca.value),
            vigor: Number(vigor.value),
            transmutador: Number(tran.value),
            fortificador: Number(fort.value),
            emissor: Number(emis.value),
            conjurador: Number(conj.value),
            manipulador: Number(mani.value)
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