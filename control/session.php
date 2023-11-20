<?php
    require "../model/UsuarioEntidade.php";
    // Inicie ou retome a sessão
    session_start();


    $dadosUsuario = array();

    // Verifique se o usuário está logado
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
        $usuario = $_SESSION['usuario'];
        $dadosUsuario = array(
            'loggedin' => true,
            'nome' => $usuario->getNome(),
            'email' => $usuario->getEmail()
        );
    } else {
        $dadosUsuario = array(
            'loggedin' => false
        );
    }
    header('Content-Type: application/json');
    echo json_encode($dadosUsuario);
?>