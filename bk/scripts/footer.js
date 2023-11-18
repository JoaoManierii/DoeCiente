var links = ['Sobre','Instituições','Contato'];
var hrefs = ['../','',''];
var footer;

function createFooter(){
    footer = document.querySelector('footer');
    createTitle();
    createContent();
}

function createTitle(){
    var footertitle = document.createElement('div');
    footertitle.classList.add('footer-title');

    
    footer.appendChild(footertitle);
}

function createContent(){
    var footerContent = document.createElement('div');
    footerContent.classList.add('footer-content');

    for(let i = 0 ; i < links.length;i++){
        var link = document.createElement('a');
        link.href = hrefs[i];
        link.textContent = links[i];
        footerContent.appendChild(link);
    }

    footer.appendChild(footerContent);
}

