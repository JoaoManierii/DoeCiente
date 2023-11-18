var basedir = "../";
var dados ;

document.addEventListener("DOMContentLoaded", function () {
    fetch(basedir + "php/session.php")
        .then(response => response.text())
        .then(data => {
            dados = JSON.parse(data);
            LoadHeader();
            createFooter();
    });
});

