<?php
require_once 'conexao.php';

$conn = new Conexao();

$query = "SELECT * FROM perfil";
$stmt = $conn->conexao->prepare($query);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_DEFAULT);

$newData = [];

for( $i = 0; $i < count($data); $i++ ){
    $newRow[] = $data[$i];
    $newRow[$i]['titulo'] = $data[$i]['nome'];
    unset($newRow[$i]['nome']);
    $newData[$i] = $newRow[$i];
}

$response = [
    'data' => $newData,
    'result' => true
];

$conn->fecharConexao();
header('Content-Type: application/json');
echo json_encode($response);
?>
