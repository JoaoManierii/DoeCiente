<?php
require 'conexao.php';
require '../model/UsuarioEntidade.php';

try {
    session_start();
    $conn = new Conexao();
    
    $email = htmlspecialchars($_POST["email"]);
    $senha = $_POST["senha"];

    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $conn->conexao->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row) {
        $bol = password_verify($senha, $row["hashsenha"]);
        if ($bol) {
            $usuario = new UsuarioEntidade();
            $usuario->setEmail($row["email"]);
            $usuario->setNome($row["nome"]);
            $usuario->setId($row["id"]);
    
            $_SESSION["loggedin"] = true;
            $_SESSION["usuario"] = $usuario;
    
            $response = ['message' => 'Login realizado com sucesso', 'result' => true];
            header('Content-Type: application/json');
            echo json_encode($response);
            $conn->fecharConexao();
            exit();
        } else {
            $response = ['message' =>'Senha incorreta', 'result' => false];
            header('Content-Type: application/json');
            echo json_encode($response);
            $conn->fecharConexao();
            exit();
        }
    } else {
        $response = ['message' => 'Usuário não encontrado', 'result' => false];
        header('Content-Type: application/json');
        echo json_encode($response);
        $conn->fecharConexao();
        exit();
    }
} catch (PDOException $e) {
    $response = ['message' => $e->getMessage(), 'result' => false];
    header('Content-Type: application/json');
    echo json_encode($response);
    $conn->fecharConexao();

    exit();

}
?>
