<?php
require_once 'conexao.php';

$conn = new Conexao();

$query = "SELECT * FROM perfil";
$stmt = $conn->conexao->prepare($query);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);


$conn->fecharConexao();
header('Content-Type: application/json');
echo json_encode($data);
?>
