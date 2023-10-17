var cardInfos = [
    {
        titulo: "Instituto AyrtonSenna",
        descricao: "O Instituto Ayrton Senna é uma organização dedicada a melhorar a qualidade da educação no Brasil.;Fundado em homenagem ao lendário piloto de Fórmula 1, Ayrton Senna, o instituto busca promover o;desenvolvimento de crianças e jovens por meio de programas educacionais inovadores.",
        img: "../imagens/ayrtonSenna.jpg"
    },
    {
        titulo: "Crianca Esperanca",
        descricao: "O Criança Esperança é uma parceria entre a TV Globo e a UNESCO. Este projeto tem como objetivo;arrecadar fundos para apoiar projetos sociais que beneficiam crianças e jovens em situação de;vulnerabilidade no Brasil. O site permite que as pessoas façam doações para causas relacionadas;à educação, cultura, esporte e saúde",
        img: "../imagens/criancaEsperanca.jpg"
    }
];

Document.addEventListener("DOMContentLoaded", function () {
    cardCreator();
});w

function cardCreator(){
    var card_container = document.querySelector(".container");
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