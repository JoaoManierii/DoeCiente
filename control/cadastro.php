<?php
require 'conexao.php';
// Conexão com o banco de dados
var_dump($_POST);

try{

    $conn = new Conexao();    
    
    // Coletar dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $senha = htmlspecialchars($_POST['senha']); 
    
    $senha = password_hash($senha, PASSWORD_DEFAULT); // Criptografar a senha
    
    $stmt = $conn->conexao->prepare("INSERT INTO usuarios (nome, email, hashsenha) VALUES (?, ?, ?)");
    $stmt->bindValue(':nome', $nome, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':senha', $senha, PDO::PARAM_STR);
    $stmt->execute();

    $response = ['message' => 'Usuário cadastrado com sucesso!',
                'nome' => $nome,
                'email' => $email,
                'senha' => $senha,
                'result' => true];
       
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    $response = ['error' => $e->getMessage(), 'result' => false];
    
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
