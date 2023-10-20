var cardInfos = [
    {
        titulo: "Instituto AyrtonSenna",
        descricao: "O Instituto Ayrton Senna é uma organização dedicada a melhorar a qualidade da educação no Brasil. Fundado em homenagem ao lendário piloto de Fórmula 1, Ayrton Senna, o instituto busca promover o desenvolvimento de crianças e jovens por meio de programas educacionais inovadores.",
        img: "../imagens/ayrtonSenna.jpg"
    },
    {
        titulo: "Crianca Esperanca",
        descricao: "O Criança Esperança é uma parceria entre a TV Globo e a UNESCO. Este projeto tem como objetivo arrecadar fundos para apoiar projetos sociais que beneficiam crianças e jovens em situação de vulnerabilidade no Brasil. O site permite que as pessoas façam doações para causas relacionadas à educação, cultura, esporte e saúde.",
        img: "../imagens/criancaEsperanca.jpg"
    },
    {
        titulo: "Cruz Vermelha",
        descricao: "A sua missão é aliviar o sofrimento humano, proteger as vidas e a saúde das pessoas e preservar a dignidade humana, sobretudo durante conflitos armados e outras emergências. O Movimento está presente em todos os países e conta com o apoio de milhões de voluntários.",
        img: "../imagens/cruzVermelha.jpg"
    },
    {
        titulo: "Médicos Sem Fronteiras",
        descricao: "Médicos Sem Fronteiras é uma organização médica humanitária internacional que fornece assistência médica em áreas de conflito, crises humanitárias e desastres naturais em todo o mundo. O site brasileiro permite que as pessoas façam doações para apoiar o trabalho vital da organização em situações de emergência e necessidade médica.",
        img: "../imagens/medicoSemFronteiras.jpg"
    },
    {
        titulo: "Hospital de Cancer de Barretos",
        descricao: "Hospital de Amor, anteriormente conhecido como Hospital de Câncer de Barretos, é uma instituição de saúde filantrópica brasileira especializada no tratamento e prevenção de câncer com sede em Barretos, São Paulo.",
        img: "../imagens/hospitaldCancer.jpg"
    },
    {
        titulo: "Instituto Ronald MC Donald",
        descricao: "O Instituto Ronald McDonald é uma instituição que trabalha para melhorar a vida de crianças e adolescentes com câncer no Brasil. Eles arrecadam fundos para apoiar projetos que visam a melhoria do tratamento e da qualidade de vida de jovens pacientes com câncer.",
        img: "../imagens/mcDonalds.jpg"
    }
];


document.addEventListener("DOMContentLoaded", () =>{
    cardCreator();
    
    var btnFiltro = document.querySelector(".btnFiltro");
    btnFiltro.addEventListener('click', () =>{
        filtroInstituicao();

    });
});

function cardCreator(){
    var card_container = document.querySelector(".container");
    if (card_container !=null) {
        for(let i =0;i<cardInfos.length;i++){
            let temp = cardInfos[i];
            var newCard = document.createElement("div");
            newCard.classList.add('card');
            
            var img = document.createElement('img');
            img.src = temp.img;
            img.alt = temp.titulo + " ilustração";
            newCard.appendChild(img);
            
        var titulo = document.createElement("p");
        titulo.classList.add("card-title");
        titulo.textContent = temp.titulo;

        newCard.appendChild(titulo);
        
        var desc = temp.descricao.split(";");
        for(let j = 0; j<desc.length;j++){
            var parag = desc[j];
            
            var newParag = document.createElement('p');
            newParag.textContent = parag;
            
            newCard.appendChild(newParag);
        }
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