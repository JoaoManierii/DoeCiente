<?php
    session_start();
    session_unset();//limpa as variaveis de sessao
    session_destroy();//destroi a sessao ativa

    header("Location: ../view/pages/login.html");
?>