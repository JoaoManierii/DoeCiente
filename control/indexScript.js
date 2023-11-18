var banners;
var pos = 0;

var comentarios;


document.addEventListener("DOMContentLoaded", () =>{
    banners = document.querySelectorAll(".banner");
    comentarios = loadComentarios();
    addComentarios();
    setInterval(nextBanner, 4000);

});

function nextBanner(){
    banners[pos].style.display = "none";
    if (pos < banners.length-1) {
        pos++;
    }else{
        pos = 0;
    }
    showBanner(pos);
}

function showBanner(pos){
    banners[pos].style.display = "flex";
}


function loadComentarios(){
    return [{
        titulo: "Doacao X",
        comentario: "Fiz minha doacao solidaria para o Medico Sem Fronteiras de forma pratica e facil !",
        nome:"Anonimo"
    },
    {
        titulo: "Doacao Y",
        comentario: "Fiz minha contribuição para um meio ambiente melhor !",
        nome:"Carlos"
    },
    {
        titulo: "Doacao z",
        comentario: "Educação para todos e de qualidade, fiz minha contribuição!    ",
        nome:"Anonimo"
    }]
}

function addComentarios(){
    var container = document.querySelector(".comentarios");
    if (container != null) {
        for(let i = 0; i<comentarios.length;i++){
            let temp = comentarios[i];
            var newComentario = document.createElement("div");
            newComentario.classList.add("comentario");

            var titulo = document.createElement("h5");
            titulo.classList.add("comentario_titulo");
            titulo.textContent = temp.titulo;

            var comentario = document.createElement("p");
            comentario.classList.add("comentario_p");
            comentario.textContent = temp.comentario;

            var nome = document.createElement("p");
            nome.classList.add("comentario_nome");
            nome.textContent = temp.nome;

            newComentario.appendChild(titulo);
            newComentario.appendChild(comentario);
            newComentario.appendChild(nome);

            container.appendChild(newComentario);
        }
    }
}
