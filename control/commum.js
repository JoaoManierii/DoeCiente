var basedir = "../";
var dados ;

document.addEventListener("DOMContentLoaded", function () {
    fetch('/control/session.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            dados = JSON.parse(data);
            LoadHeader();
            createFooter();
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
});

