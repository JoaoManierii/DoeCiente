var btnEnviar;

document.addEventListener('DOMContentLoaded', () =>{
    btnEnviar = document.querySelector('#btnEnviar');
    btnEnviar.addEventListener('click',(e)=>{
        e.preventDefault();
        let form = document.querySelector('#cadastroForm');
        if(validaDados()){
            fetch("../php/cadastro.php",{
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                var jsonData = JSON.parse(data);
                // Verifique o JSON retornado para saber se o cadastro foi feito
                if (jsonData.success) {
                    alert('Cadastro realizado com Sucesso!')
                    // Redirecione para a tela inicial em caso de sucesso
                } else {
                    // Exiba a mensagem de erro retornada no elemento de aviso
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar requisição:", error);
                // Trate erros de rede ou servidor aqui
            });
        }else{
            //mensagem de erro
        }
    })
})

function validaDados(){ 
    let terms = document.querySelector('#termos')
    if(terms = 'true'){
        let dadosValidos = true;
        let mensagemErro = '';
        let email = document.querySelector('#inputEmail');
        let nome = document.querySelector('#inputNome');
        let senha = document.querySelector('#senha');
        let confSenha = document.querySelector('#senhad');

        //adicionar demais vallidações
        if(senha.textContent != confSenha.textContent){
            dadosValidos = false;
            mensagemErro += 'As senhas não coincidem';
        }
        
    }else{
        informarErro('Para continuar e necessario aceitar os termos.');
        return false;
    }
}

function informarErro(erro){

}