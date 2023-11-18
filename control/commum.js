var basedir = "../";
var dados ;

document.addEventListener("DOMContentLoaded", function () {
    fetch("../../control/session.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('response: ' , response);
            return response.text(); // Use text() para obter o corpo da resposta
        })
        .then(data => {
            console.log(data , ' --- ');
            dados = JSON.parse(data);
            LoadHeader();
            createFooter();
    });
});

