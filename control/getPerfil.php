<?php
require "../model/UsuarioEntidade.php";
require "conexao.php";
// Inicie ou retome a sessão
session_start();

$dadosUsuario = array();

// Verifique se o usuário está logado
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $usuario = $_SESSION['usuario'];
    $idUsuario = $usuario->getId();
    $conn = new Conexao();


    // Prepare and execute the SQL query with a prepared statement
    $sql = "SELECT * FROM perfil WHERE usuarios_idusuario = :id";
    $stmt = $conn->conexao->prepare($sql);
    $stmt->bindParam(':id', $idUsuario);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        // Store the fetched data in $dadosUsuario array
        $dadosUsuario = array(
            'nome' => $usuario->getNome(),
            'email' => $usuario->getEmail(),
            'endereco' => $row["endereco"],
            "telefone"=> $row["telefone"],
            "chavepix"=> $row["chavepix"],
            "fundacao"=> $row["fundacao"],
            "org"=> $row["org"],
            "sobre"=> $row["sobre"],
            "result"=> $row["1"]
        );
    } else {
        $dadosUsuario = array(
            'nome' => $usuario->getNome(),
            'email' => $usuario->getEmail(),
            'result'=> $row['0']
        );
    }

    $conn->fecharConexao();
}

header('Content-Type: application/json');
echo json_encode($dadosUsuario);
exit();
?>