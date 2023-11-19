var btnEnviar;
var erros = [];

document.addEventListener('DOMContentLoaded', () =>{
    btnEnviar = document.querySelector('#btnEnviar');
    btnEnviar.addEventListener('click',(e)=>{
        e.preventDefault();
        let formData = new FormData(document.querySelector('#cadastroForm'));
        console.log("Form Data:", formData); // Adicione esta linha para depuração
        erros = [];
        if(validaDados()){
            fetch("cadastro.php",{
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('response: ' , response);
                return response.text(); // Use text() para obter o corpo da resposta
            })
            .then(data => {
                console.log('data:  ',data);
                if (data.trim() !== '') {
                    var jsonData = JSON.parse(data);
                    if (jsonData && typeof jsonData.result !== 'undefined') {
                        // Verifique o JSON retornado para saber se o cadastro foi feito
                        if (jsonData.result) {
                            alert('Cadastro realizado com Sucesso!')
                            window.location.href = 'login.html';
                        } else {
                            // Exiba a mensagem de erro retornada no elemento de aviso
                            novoErro('Erro ao realizar cadastro!' , jsonData.message);
                            informarErro(erros);
                        }
                    } else {
                        console.error('Resposta do servidor não contém um JSON válido.');
                    }
                } else {
                    console.error('Resposta do servidor está vazia.');
                }
            })
            .catch((error) => {
                novoErro("Erro ao enviar requisição:", error);
                console.error('Houve um problema com a operação de cadastro:', error);
                informarErro(erros);
            });
        }else{
            informarErro(erros);
        }
    })
})

function validaDados(){ 
    let terms = document.querySelector('#termos')
    
    let dadosValidos = true;
    
    let email = document.querySelector('#email');
    let nome = document.querySelector('#nome');
    let senha = document.querySelector('#senha');
    let confSenha = document.querySelector('#senhad');

    //valida termos
    if(!terms.checked){
        dadosValidos = false;
        novoErro('Para continuar e necessario aceitar os termos. ');
    }
    // Valida nome
    if (nome.value.length < 3) {
        dadosValidos = false;
        novoErro('Nome deve ter pelo menos 3 caracteres.');
    }
    // Valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        dadosValidos = false;
        novoErro('Email não e valido. ');
    }
    // Valida senha
    if(senha.value != confSenha.value){
        dadosValidos = false;
        novoErro('As senhas não coincidem. ');
    }

    if(senha.value.length < 4 ) {
        dadosValidos = false;
        novoErro('Senha incorreta. ');
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
    const divAlerta = document.querySelector('#alerta');
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