document.addEventListener('DOMContentLoaded', function(){
    const btnSubmit = document.querySelector('#btnSubmit');

    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        salvarEditarPerfil();
    });

    const btnExcluir = document.querySelector('#btnExcluir');
    btnExcluir.addEventListener('click', function(e){
        e.preventDefault();
        excluirPerfil(); 
    });
});

function excluirPerfil(){
    const form = document.querySelector('#formEditarPerfil');

    fetch('excluirPerfil.php', {
        method: 'POST',
        body: new FormData(form)
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
            if (jsonData && typeof jsonData.result !== 'undefined') {
                if (jsonData.result) {
                    alert('Perfil excluído com sucesso!');
                    
                    location.href = '../../control/closeSession.php'; // Substitua pelo redirecionamento desejado após a exclusão
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
    const form = document.querySelector('#formEditarPerfil');

    fetch('../../control/editarPerfil.php', {
        method: 'POST',
        body: new FormData(form)
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
            if (jsonData && typeof jsonData.result !== 'undefined') {
                if (jsonData.result) {
                    alert('Perfil editado com sucesso!');
                    location.href =  + 'editarPerfil.html';
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
        console.error('Houve um problema com a operação de busca:', error);
    });
}