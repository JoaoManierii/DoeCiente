<?php
require 'conexao.php';
// Conexão com o banco de dados
try{

    $conn = new Conexao();    
    
    // Coletar dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $senha = htmlspecialchars($_POST['senha']); 
    
    $senha = password_hash($senha, PASSWORD_DEFAULT); // Criptografar a senha
    
    $stmt = $conn->conexao->prepare("INSERT INTO usuarios (nome, email, hashsenha) VALUES (?, ?, ?)");
    $stmt->bindParam(1, $nome);
    $stmt->bindParam(2, $email);
    $stmt->bindParam(3, $senha);
    $stmt->execute();

    $response = ['message' => 'Usuário cadastrado com sucesso!',
                'result' => true];
       
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    $response = ['error' => $e->getMessage(), 'result' => false];
    
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
