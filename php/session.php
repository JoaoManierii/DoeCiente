<?php
   
    // Inicie ou retome a sessão
    session_start();

    $dadosUsuario = array();

    // Verifique se o usuário está logado
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
        $dadosUsuario = array(
            'loggedin' => true,
            'usuario' => $_SESSION['usuario']
        );
    } else {
        $dadosUsuario = array(
            'loggedin' => false
        );
    }
    header('Content-Type: application/json');
    echo json_encode($dadosUsuario);
?>