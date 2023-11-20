<?php
require 'conexao.php';
require '../model/UsuarioEntidade.php';

session_start();

if (isset($_POST['senha'])) {
    $usuario = $_SESSION['usuario'];
    $idUsuario = $usuario->getId();

    $senhaFornecida = htmlspecialchars($_POST['senha']);

    try {
        // Verificar a senha
        $sqlSenha = "SELECT hashsenha FROM usuarios WHERE id = :idUsuario";
        $stmtSenha = $conn->conexao->prepare($sqlSenha);
        $stmtSenha->bindParam(':idUsuario', $idUsuario);
        $stmtSenha->execute();
        $rowSenha = $stmtSenha->fetch(PDO::FETCH_ASSOC);

        if ($rowSenha && password_verify($senhaFornecida, $rowSenha['hashsenha'])) {
            // Senha está correta, prosseguir com a exclusão
            $sqlDeletePerfil = "DELETE FROM perfil WHERE usuarios_idusuario = :idUsuario";
            $stmtDeletePerfil = $conn->conexao->prepare($sqlDeletePerfil);
            $stmtDeletePerfil->bindParam(':idUsuario', $idUsuario);
            $stmtDeletePerfil->execute();

            $sqlDeleteUsuario = "DELETE CASCATE FROM usuarios WHERE id = :idUsuario CASCATE";
            $stmtDeleteUsuario = $conn->conexao->prepare($sqlDeleteUsuario);
            $stmtDeleteUsuario->bindParam(':idUsuario', $idUsuario);
            $stmtDeleteUsuario->execute();

            $response = ['message' => 'Usuário excluído com sucesso', 'result' => true];
        } else {
            // Senha incorreta
            $response = ['message' => 'Senha incorreta', 'result' => false];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = ['message' => $e->getMessage(), 'result' => false];
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    $response = ['message' => 'Usuário não autenticado', 'result' => false];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
