var cardInfos= [];

var id;

document.addEventListener("DOMContentLoaded", () =>{
    fetchInstitutions();
    
    var btnFiltro = document.querySelector(".btnFiltro");
    btnFiltro.addEventListener('click', () =>{
        filtroInstituicao();

    });
});

function fetchInstitutions() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../control/buscaInstituicoes.php', true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            cardInfos = JSON.parse(xhr.responseText);
            console.log(cardInfos);
            cardCreator();
        } else {
            console.error('Error: ' + xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}


function cardCreator(){
    var card_container = document.querySelector(".container");
    if (card_container !=null) {
        for(let i =0;i<cardInfos.length;i++)
        {
            let temp = cardInfos[i];
            var newCard = document.createElement("div");
            newCard.classList.add('card');
            var img = gerarIconeAleatorio();
            newCard.appendChild(img);
            
            var titulo = document.createElement("p");
            titulo.classList.add("card-title");
            titulo.textContent = temp.titulo;

            newCard.appendChild(titulo);
            
        
            var newParag = document.createElement('p');
            newParag.textContent = temp.descricao;
            
            newCard.appendChild(newParag);

            newCard.addEventListener('click', () =>{
                window.location.href = 'instituicao.php?id=' + cardInfos[i].id;
            });
            card_container.appendChild(newCard);
        }
    }
}

function filtroInstituicao(){
    var filtro = document.querySelector("#instituicao-input");
    var container = document.querySelector(".container");
    if(filtro.value != ""){
        var cards = document.querySelectorAll(".card");
        var cardsFiltrados = [];
        

        for(let i =0;i<cards.length;i++){
            let card = cards[i];
            let title = card.querySelector(".card-title").textContent;
            console.log(title);
            if (title.toLowerCase().includes(filtro.value.toLowerCase())) {
                cardsFiltrados.push(card);
            }
        }
        
        container.innerHTML = "";
        for(let i =0;i<cardsFiltrados.length;i++){
            container.appendChild(cardsFiltrados[i]);
        }
    }else{
        container.innerHTML = "";
        cardCreator();
    }
}

function gerarIconeAleatorio() {
    const icones = [
        'fa-heart',
        'fa-hands-helping',
        'fa-gift',
        'fa-hand-holding-usd',
        'fa-hospital',
        'fa-users',
        'fa-child',
        'fa-seedling',
        'fa-star',
        'fa-flag',
        'fa-book',
        'fa-tree',
        'fa-cloud',
        'fa-sun',
        'fa-moon',
        'fa-star',
        'fa-globe',
        'fa-bicycle',
        'fa-car',
        'fa-plane',
        'fa-ship',
        'fa-train',
        'fa-briefcase',
        'fa-coffee',
        'fa-camera',
        'fa-bolt',
        'fa-bug',
        'fa-flask',
        'fa-rocket'
    ];

    const cores = [
        '#3498db', // Azul
        '#e74c3c', // Vermelho
        '#f39c12', // Amarelo
        '#e91e63', // Rosa
        '#ffffff', // Branco
        // Adicione mais cores conforme necessário
    ];

    const iconeEscolhido = icones[Math.floor(Math.random() * icones.length)];
    const corEscolhida = cores[Math.floor(Math.random() * cores.length)];

    // Crie o novo elemento <i> e adicione a classe de tamanho, ícone e cor
    const novoIcone = document.createElement('i');
    novoIcone.classList.add('fas', iconeEscolhido, 'fa-5x');
    novoIcone.style.color = corEscolhida;

    // Retorne o novo elemento <i>
    return novoIcone;
}
