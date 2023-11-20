<?php
require 'conexao.php';
require '../model/UsuarioEntidade.php';
require '../model/PerfilEntidade.php';

session_start();
$usuario = $_SESSION['usuario'];
$id_usuario = $usuario->getId();

$conn = new Conexao();

try {
    // Atualizar tabela usuario
    $nome = htmlspecialchars($_POST["nome"]);
    $email = htmlspecialchars($_POST["email"]);
    $sql = "UPDATE usuario SET nome = :nome, email = :email WHERE id = :id";
    $stmt = $conn->conexao->prepare($sql);
    $stmtUsuario->bindParam(':nome', $nome);
    $stmtUsuario->bindParam(':email', $email);
    $stmtUsuario->bindParam(':id', $id_usuario);
    $stmtUsuario->execute();

    // Atualizar tabela perfil se já existir registro, caso contrário, inserir novo registro
    $ong = htmlspecialchars($_POST["ong"]);
    $endereco = htmlspecialchars($_POST["endereco"]);
    $telefone = htmlspecialchars($_POST["telefone"]);
    $fundacao = htmlspecialchars($_POST["fundacao"]);
    $sobre = htmlspecialchars($_POST["sobre"]);
    $chavepix = htmlspecialchars($_POST["chavepix"]);

    // Verificar se já existe um registro na tabela perfil para o usuário
    $sql = "SELECT COUNT(*) FROM perfil WHERE usuarios_idusuario = :idUsuario";
    $stmt = $conn->conexao->prepare($sql);
    $stmt->bindParam(':idUsuario', $id_usuario);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        // Atualizar registro existente
        $sql = "UPDATE perfil 
                SET nome = :nome
                    ong = :ong, 
                    endereco = :endereco, 
                    telefone = :telefone, 
                    fundacao = :fundacao, 
                    sobre = :sobre
                WHERE usuarios_idusuario = :idUsuario";
    } else {
        // Inserir novo registro
        $sql = "INSERT INTO perfil (nome, usuarios_idusuario, ong, endereco, chavepix, telefone, fundacao, sobre)
                VALUES (:nome, :idUsuario, :ong, :endereco,:chavepix, :telefone, :fundacao, :sobre)";
    }

    $stmt = $conn->conexao->prepare($sql);
    $stmt->bindParam(":nome", $nome);
    $stmt->bindParam(':ong', $ong);
    $stmt->bindParam(':endereco', $endereco);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':chavepix', $chavepix);
    $stmt->bindParam(':fundacao', $fundacao);
    $stmt->bindParam(':sobre', $sobre);
    $stmt->bindParam(':idUsuario', $id_usuario);

    $stmt->execute();

    $response = array(
        'result'=> true
    );
    header('Content-Type: application/json');
    echo json_encode($response);

} catch (PDOException $e) {
    $response = array(
        'result'=> false
    );
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>