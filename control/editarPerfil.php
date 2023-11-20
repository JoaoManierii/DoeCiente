<?php
require 'conexao.php';
require '../model/UsuarioEntidade.php';
require '../model/PerfilEntidade.php';

session_start();
$usuario = $_SESSION['usuario'];
$id_usuario = $usuario->getId();

$mensagem = "";
$rs = false;
$conn = new Conexao();

try {
    // Atualizar tabela usuario
    if (isset($_POST["email"]) && isset($_POST["nome"])) {
        $nome = htmlspecialchars($_POST["nome"]);
        $email = htmlspecialchars($_POST["email"]);
        $sql = "UPDATE usuario SET nome = :nome, email = :email WHERE id = :id";
        $stmt = $conn->conexao->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':id', $id_usuario);
        $resultado = $stmt->execute();

        if ($resultado) {
            $mensagem .= 'Usuario';
            $rs = true;
        }
    }
} catch (PDOException $e) {
    $mensagem .= $e->getMessage();
}

try {
    // Atualizar tabela perfil se já existir registro, caso contrário, inserir novo registro
    if (isset($_POST["chavepix"]) && isset($_POST["nome"]) && isset($_POST["ong"]) && isset($_POST["endereco"]) && isset($_POST["telefone"]) && isset($_POST["fundacao"]) && isset($_POST["sobre"])) {
        $nome = htmlspecialchars($_POST["nome"]);
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

        $resultado = $stmt->execute();

        if ($resultado) {
            $mensagem .= 'Perfil';
            $rs = true;
        }
    }
} catch (PDOException $e) {
    $mensagem .= $e->getMessage();
}

if ($rs) {
    $response = ['message' => 'Atualizado com sucesso', 'result' => true];
} else {
    $response = ['message' => 'Erro ao atualizar', 'result' => false];
}

header('Content-Type: application/json');
echo json_encode($response);
?>