<?php
require 'conexao.php';
// Conexão com o banco de dados
try {

    $conn = new Conexao();    
    
    // Coletar dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $senha = htmlspecialchars($_POST['senha']); 
    
    $senha = password_hash($senha, PASSWORD_DEFAULT); // Criptografar a senha
    
    $stmt = $conn->conexao->prepare("INSERT INTO usuarios (nome, email, hashsenha) VALUES (:nome, :email, :senha)");

    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha);

    $stmt->execute();

    $resp= [
        'message' => 'Usuário cadastrado com sucesso!',
        'result' => true
    ];

    $conn->fecharConexao();
       
    header('Content-Type: application/json');
    echo json_encode($resp);
    
} catch (PDOException $e) {
    $conn->fecharConexao();
    $response = [
        'error' => $e->getMessage(),
        'result' => false];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
