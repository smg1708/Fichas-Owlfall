function verificar() {

    var nome = nome_input.value
    var email = email_input.value
    var senha = senha_input.value
    var senhaVerif = confirmacao_senha_input.value

    var listaCaracteres = ['@', '#', '$', '%', '&', '!', '*', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var temCaracter = false
    
    
    for (var i = 0; i < senha.length; i++) {
        if(listaCaracteres.includes(senha[i])) {
            temCaracter = true;
            break
        }
    }
    
    if (nome == "" || email == "" || senha == "" || senhaVerif == "") {
        alert("Verifique os campos")
    } else if (!(email.includes("@") && email.includes("."))) {
        alert("Email não é válido")
    } else if (senha != senhaVerif) {
        alert("Verifique as senhas, elas estão diferentes")
    } else if (senha.length < 5) {
        alert("Coloque uma senha com no mínimo 5 caracteres")
    } else if (!temCaracter) {
        alert("Coloque ao menos um caracter especial ou numero") 
    } else {
        cadastrar()
    }

}

function cadastrar() {

    var nome = nome_input.value
    var email = email_input.value
    var senha = senha_input.value

    fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso\nRedirecionando para login")
                setTimeout(() => {
                    window.location = "login.html";
                }, 1000);
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`Erro: ${resposta}`);
        })

    return false;

}

function usuario() {
    window.location = "usuario.html"
}