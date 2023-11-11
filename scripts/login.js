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
        let formData = document.querySelector('#loginForm');
        if(validarEmailSenha(emailInput,senhaInput)){
            fetch('../php/login.php',{
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                var jsonData = JSON.parse(data);
                console.log(data)
                // Verifique o JSON retornado para saber se o cadastro foi feito
                if (jsonData.result) {
                    //alert('Login realizado com Sucesso!')
                    window.location.href = '../pages/index.html';
                } else {
                    // Exiba a mensagem de erro retornada no elemento de aviso
                    novoErro('Erro ao realizar login!' , jsonData.message);
                    informarErro(erros);
                }
            })
            .catch((error) => {
                novoErro("Erro ao enviar requisição:", error);
                informarErro(erros);
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
