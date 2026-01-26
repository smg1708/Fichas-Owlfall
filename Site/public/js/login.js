function entrar() {
    var email = email_input.value
    var senha = senha_input.value

    fetch("/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    })
        .then(function(resposta) {
            console.log("resposta: " + resposta);

            if (resposta.ok) {
                return resposta.json();
            } else {
                alert("Houve um erro ao tentar realizar o login! \n Verifique suas credenciais")
                throw "Houve um erro ao tentar realizar o Login!";
            }
        })
        .then(function(dados) {

            sessionStorage.ID_USUARIO = dados[0].idUsuario;
            sessionStorage.NOME_USUARIO = dados[0].nome;
            sessionStorage.EMAIL_USUARIO = dados[0].email;

            alert("Login realizado com sucesso")

            setTimeout(() => {
                window.location = "personagens.html";
            }, 1000);
            
        })
        .catch(function(resposta) {
            console.log("Erro: " + resposta)
        })

    return false

}

function usuario() {
    window.location = "usuario.html"
}

