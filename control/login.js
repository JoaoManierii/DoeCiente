var btnLogin;

var erros = [];


document.addEventListener('DOMContentLoaded',()=>{
    btnLogin = document.querySelector('#btnLogin');
    btnLogin.addEventListener('click',(e)=>{
        e.preventDefault();
        
        erros = [];
        const emailInput = document.querySelector('#email');
        const senhaInput = document.querySelector('#senha');
        //realizar tentativa de login
        if(validarEmailSenha(emailInput,senhaInput)){
            let formData = new FormData();
            formData.append('email', emailInput.value);
            formData.append('senha', senhaInput.value);
            fetch("/control/login.php",{
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Use text() para obter o corpo da resposta
            })
            .then(data => {
                try {
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
        
                    if (jsonData.result) {
                        window.location.href = '/view/pages/editarPerfil.html';
                    } else {
                        novoErro('Erro ao realizar login!', jsonData.message);
                        informarErro(erros);
                    }
                } catch (error) {
                    novoErro('Erro ao processar a resposta do servidor.');
                    informarErro(erros);
                    console.log(error);
                }
            })
            .catch((er) => {
                novoErro("Erro ao enviar solicitaçãp tente novamente mais tarde");
                informarErro(erros);
                console.log(er);
            });
        }else{
            informarErro(erros);
        }
    })
    
})

function validarEmailSenha(email, senha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let dadosValidos = true;

    if (!emailRegex.test(email.value)) {
        novoErro("Email inválido");
        dadosValidos = false;
    }

    if (senha.value.length < 4) {
        novoErro("Senha inválida. A senha deve conter pelo menos 3 letras e ou números.");
        dadosValidos = false;
    }

    // Valida se há erros
    if (!dadosValidos) {
        return false;
    }
    else return dadosValidos;
}


function novoErro(erro){
    erros.push(erro);
}


function informarErro(mensagens){
    let divAlerta = document.querySelector('#alerta');
    divAlerta.innerHTML = '';

    let listaErros = document.createElement('ul');
    mensagens.forEach(mensagem => {
        let itemErro = document.createElement('li');
        itemErro.textContent = mensagem;
        listaErros.appendChild(itemErro);
    });

    divAlerta.appendChild(listaErros);
    divAlerta.style.display = 'block';
}
