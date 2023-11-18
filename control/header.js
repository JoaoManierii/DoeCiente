var menu = document.createElement('div');
menu.classList.add('header-menubar');

var header;

var tituloUsuario;

function LoadHeader(){
    header = new HeaderCreator();
    header.setTitle("DoeCiente");
    header.setMenuUser(createMenu());
}

class HeaderCreator{
    constructor(){
        this.header = document.querySelector("header");
        while(this.header.firstChild){
            this.header.removeChild(this.header.firstChild);
        }
        this.header.classList.add("header");
        this.headerContent = document.createElement("div");
        this.headerContent.classList.add("header-content");

        this.logo = document.createElement("div");
        this.logo.classList.add("logo");
        this.logo.onclick = function(){
            window.location.href = 'index.html';
        }

        this.logoImg = document.createElement("img");
        this.logoImg.src = '../../imagens/logo2.png';
        this.logoImg.classList.add('logo-img');
        this.logo.appendChild(this.logoImg);

        this.logoTitle = document.createElement("a");
        this.logoTitle.href = "index.html";
        this.logoTitle.classList.add('logo-title');

        this.headerMenu = document.createElement("div");
        this.headerMenu.classList.add("header-menubar");

        this.logo.appendChild(this.logoTitle)
        this.header.appendChild(this.headerContent);
        this.headerContent.appendChild(this.logo);
        this.headerContent.appendChild(this.headerMenu);
    }

    setTitle(title){
        this.logoTitle.textContent = title;
    }

    setMenuUser(menu){
        this.headerMenu.appendChild(menu);
    }
}

function createMenu(){
    mobileOpenMenu();
    basicMenuitens();
    if(dados.loggedin)
    {
        return loadMenuUsuario();
    }else {
        return loadMenuLogin();
    }
}

function mobileOpenMenu(){
    var btnOpen = document.createElement('button');
    btnOpen.textContent = "=";
    btnOpen.classList.add('menubar-control');
    var controlstatus = false;
    btnOpen.onclick = function(){
        var menus = document.querySelectorAll(".header-menu");
        let display = '';
        if(controlstatus){
            controlstatus = false;
            display='none';
            header.headerContent.style.display = 'flex';
            btnOpen.style.width= 'fit-content';
            btnOpen.textContent = "=";
        }
        else 
        {
            controlstatus = true;
            display = 'block'
            header.headerContent.style.display = 'block';
            btnOpen.style.width= '90%';

            btnOpen.textContent = "-";

        }
            
        for(let i =0; i < menus.length;i++)
        {
            menus[i].style.display = display;
        }
    }
    header.headerContent.appendChild(btnOpen);
}

function loadMenuUsuario(){
    var menuUsuario = document.createElement('div');
    menuUsuario.classList.add('header-menu');
    
    var tituloUsuario = document.createElement('a');
    tituloUsuario.classList.add('header-menuItem');
    tituloUsuario.textContent = dados.nome;    
    tituloUsuario.href = 'editarPerfil.html';
    
    menuUsuario.appendChild(tituloUsuario);

    var contentUsuario = document.createElement('div')
    contentUsuario.classList.add('header-menucontent');


    // menu.addEventListener('mouseover', function () {
    //     content.style.display = 'block';
    // });

    // menu.addEventListener('mouseout', function () {
    //     content.style.display = 'none';
    // });

    var logout = document.createElement('a');
    logout.textContent = 'Logout';
    logout.classList.add('header-menuItem');
    logout.addEventListener('click', () => {
        location.href = '../../control/closeSession.php';
    });

    contentUsuario.appendChild(logout);
    menuUsuario.appendChild(contentUsuario);

    menu.appendChild(menuUsuario);

    return menu;
}


function loadMenuLogin(){    
    var login = document.createElement('div');
    login.classList.add('header-menu');    

    var loginitem = document.createElement('a');
    loginitem.classList.add('header-menuItem');
    loginitem.textContent = 'Login';
    loginitem.href = 'login.html';
    
    var logincontent = document.createElement('div');
    logincontent.classList.add('header-menucontent');
    login.appendChild(loginitem);
    login.appendChild(logincontent);
    
    menu.appendChild(login);

    var menuCad = document.createElement('div');
    menuCad.classList.add('header-menu');
    var cadastrese = document.createElement('a');
    cadastrese.classList.add('header-menuItem');
    cadastrese.textContent = 'Cadastre-se';
    cadastrese.href = 'cadastro.html';
    menuCad.appendChild(cadastrese);
    menu.appendChild(menuCad);

    return menu;
}

function basicMenuitens(){

    var menusobre = document.createElement('div');
    menusobre.classList.add('header-menu');
    var sobre = document.createElement('a');
    sobre.classList.add('header-menuItem');
    sobre.textContent = 'Sobre';
    sobre.href = 'sobre.html';
    menusobre.appendChild(sobre);
    menu.appendChild(menusobre);

    var menuInsti = document.createElement('div');
    menuInsti.classList.add('header-menu');
    var insti = document.createElement('a');
    insti.classList.add('header-menuItem');
    insti.textContent = 'Instituições';
    insti.href = 'instituicoes.html';
    
    menuInsti.appendChild(insti);
    menu.appendChild(menuInsti);
}