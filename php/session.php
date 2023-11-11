<?php
   
    // Inicie ou retome a sessão
    session_start();

    $dadosUsuario = array();

    // Verifique se o usuário está logado
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
        $dadosUsuario = array(
            'loggedin' => true,
            'nome' => $_SESSION['nome'],
            'email' => $_SESSION['email'],
        );
    } else {
        $dadosUsuario = array(
            'loggedin' => false
        );
    }
    header('Content-Type: application/json');
    echo json_encode($dadosUsuario);
?>