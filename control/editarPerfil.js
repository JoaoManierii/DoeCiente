document.addEventListener('DOMContentLoaded', function(){
    const btnSubmit = document.querySelector('#btnSubmit');
    inputs = new Array();
    inptusEditados = new Array();
    activeInputs();
    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        salvarEditarPerfil();
    });

    // const btnExcluir = document.querySelector('#btnExcluir');
    // btnExcluir.addEventListener('click', function(e){
    //     e.preventDefault();
    //     excluirPerfil(); 
    // });
});

var inputs;
var inptusEditados;
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const fundacao = document.querySelector('#fundacao');
const sobre = document.querySelector('#sobre');
const chavepix = document.querySelector('#chavepix');
const telefone = document.querySelector('#telefone');
const endereco = document.querySelector('#endereco');
const ong = document.querySelector('#ong');


function openDialog() {
    var dialog = document.getElementById('customDialog');
    dialog.style.display = 'flex';
}

function closeDialog() {
    var dialog = document.getElementById('customDialog');
    dialog.style.display = 'none';
    
}

function confirmDialog() {
    excluirPerfil();
    closeDialog();
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

function excluirPerfil(){
    var senha = document.getElementById('senha');

    let form = new FormData();
    form.append('senha', senha.value);

    fetch('/control/excluirPerfil.php', {
        method: 'POST',
        body: form
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
                    alert('Perfil excluído com sucesso!');                    
                    location.href = '/control/closeSession.php'; // Substitua pelo redirecionamento desejado após a exclusão
                } else {
                    alert(jsonData.message);
                }
            } else {
                console.error('Resposta do servidor não contém um JSON válido.');
            }
        } else {
            console.error('Resposta do servidor está vazia.');
        }
    })
    .catch(error => {
        console.error('Houve um problema com a operação de exclusão:', error);
    });
}

function salvarEditarPerfil(){

    let usuario = false;
    let perfil = false;

    for(let i = 0; i < inptusEditados.length; i++){
        if(i == 0){
            usuario = true;
            perfil = true;
        }
        else if(i == 1){
            usuario = true;
        }
        else if(i == 2){
            perfil = true;

        }
        else if(i == 3){
            perfil = true;

        }
        else if(i == 4){
            perfil = true;

        }
        else if(i == 5){
            perfil = true;

        }
        else if(i == 6){
            perfil = true;

        }
        else if(i == 7){
            perfil = true;

        }
    }

    if(usuario){
        const formUsuario = new FormData();
        formUsuario.append('nome', nome.value);
        formUsuario.append('email', email.value);

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
            console.log(data);
            // Verifica se a resposta não está vazia
            if (data.trim() !== '') {
                // Tenta fazer o parsing do JSON
                const jsonData = JSON.parse(data);
                // Verifica se o parsing foi bem-sucedido
                if (jsonData.result) {
                    if (jsonData.result) {
                        alert('Nome e email alterado com sucesso!');
                        location.href =  + 'editarPerfil.html';
                    } else {
                        alert(jsonData.message);
                        perfil = false;
                        location.href =  + 'editarPerfil.html';
                    }
                } else {
                    console.error('Resposta do servidor não contém um JSON válido.');
                    perfil = false;
                    location.href =  + 'editarPerfil.html';
                }
            } else {
                console.error('Resposta do servidor está vazia.');
                perfil = false;
                location.href =  + 'editarPerfil.html';
            }
        })
        .catch(error => {
            console.error('Houve um problema com a operação de busca:', error);
            perfil = false;
            location.href =  + 'editarPerfil.html';
        });
    }
    
    if(perfil){
        const formPerfil = new FormData();
        formPerfil.append('nome', nome.value);
        formPerfil.append('fundacao', fundacao.value);
        formPerfil.append('ong', ong.value);
        formPerfil.append('endereco', endereco.value);
        formPerfil.append('chavepix', chavepix.value);
        formPerfil.append('telefone', telefone.value);
        formPerfil.append('sobre', sobre.value);

        fetch('../../control/editarPerfil.php', {
            method: 'POST',
            body: formPerfil
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Use text() para obter o corpo da resposta
        })
        .then(data => {
            console.log(data);
            // Verifica se a resposta não está vazia
            if (data.trim() !== '') {
                // Tenta fazer o parsing do JSON
                const jsonData = JSON.parse(data);
                // Verifica se o parsing foi bem-sucedido
                if (jsonData.result) {
                    if (jsonData.result) {
                        alert('Perfil alterado com sucesso!');
                    } else {
                        alert(jsonData.message);
                        location.href =  + 'editarPerfil.html';
                    }
                } else {
                    console.error('Resposta do servidor não contém um JSON válido.');
                    location.href =  + 'editarPerfil.html';
                }
            } else {
                console.error('Resposta do servidor está vazia.');
                location.href =  + 'editarPerfil.html';
            }
        })
        .catch(error => {
            console.error('Houve um problema com a operação de busca:', error);
            location.href =  + 'editarPerfil.html';
        });
    }
}
