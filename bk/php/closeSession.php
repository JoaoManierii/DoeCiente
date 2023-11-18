<?php
    session_start();
    session_unset();//limpa as variaveis de sessao
    session_destroy();//destroi a sessao ativa

    $closseInfo = array(
        'loggedin' => false,
    );

    header('Content-Type: application/json');
    echo json_encode($closseInfo);
?>