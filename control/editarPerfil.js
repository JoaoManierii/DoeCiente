document.addEventListener('DOMContentLoaded', function(){
    const btnSubmit = document.querySelector('#btnSubmit');
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const fundacao = document.querySelector('#fundacao');
    const sobre = document.querySelector('#sobre');
    const chavepix = document.querySelector('#chavepix');
    const telefone = document.querySelector('#telefone');
    const endereco = document.querySelector('#endereco');
    const ong = document.querySelector('#ong');
    loadData();
    inputs = new Array();
    inptusEditados = new Array();
    activeInputs();
    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        salvarEditarPerfil();
    });
});



var inputs;
var inptusEditados;


function loadData(){
    fetch('/control/getPerfil.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Use text() para obter o corpo da resposta
    })
    .then(data => {
        const dados = JSON.parse(data);
        nome.value = dados.nome;
        email.value = dados.email;
        if(dados.result){
            fundacao.value = dados.fundacao;
            sobre.value = dados.sobre;
            chavepix.value = dados.chavepix;
            telefone.value = dados.telefone;
            endereco.value = dados.endereco;
            ong.value = dados.ong;
        }
    })
    .catch(error => {
        console.error('Houve um problema com a operação de busca:', error);
    }
    );

}


function activeInputs(){
    inputs = {nome, email, fundacao, sobre, chavepix, telefone, endereco, ong}


    for(let i = 0; i < inputs.length; i++){
        inputs[i].readOnly = true;
        inputs[i].style.backgroundColor = "#f2f2f2";
        inputs[i].addEventListener('click', function(){
            inputs[i].readOnly = false;
            inputs[i].style.backgroundColor = "#ffffff";
            inptusEditados.push(inputs[i]);
        });
    }
}

function salvarEditarPerfil(){
    const formUsuario = new FormData();
    formUsuario.append('nome', nome.value);
    formUsuario.append('email', email.value);
    formUsuario.append('nome', nome.value);
    formUsuario.append('fundacao', fundacao.value);
    formUsuario.append('ong', ong.value);
    formUsuario.append('endereco', endereco.value);
    formUsuario.append('chavepix', chavepix.value);
    formUsuario.append('telefone', telefone.value);
    formUsuario.append('sobre', sobre.value);

    fetch('/control/editarPerfil.php', {
        method: 'POST',
        body: formUsuario
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Use text() para obter o corpo da resposta
    })
    .then(data => {
        // Verifica se a resposta não está vazia
        if (data.trim() !== '') {
            // Tenta fazer o parsing do JSON
            const jsonData = JSON.parse(data);
            // Verifica se o parsing foi bem-sucedido
            if (jsonData.result) {
                if (jsonData.result) {
                    alert('Dados alterados com sucesso');
                    location.href =  + '/view/pages/editarPerfil.html';
                } else {
                    alert(jsonData.message);
                    location.href =  + '/view/pages/editarPerfil.html';
                }
            } else {
                console.error('Resposta do servidor não contém um JSON válido.');
                location.href =  + '/view/pages/editarPerfil.html';
            }
        } else {
            console.error('Resposta do servidor está vazia.');
            location.href =  + '/view/pages/editarPerfil.html';
        }
    })
    .catch(error => {
        console.error('Houve um problema com a operação de busca:', error);
        location.href =  + '/view/pages/editarPerfil.html';
    });

}
