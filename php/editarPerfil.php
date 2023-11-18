<?php
require 'conexao.php';
require 'UsuarioEntidade.php';

try{
    session_start();
    if(isset($_POST["email"]) && isset($_POST["nome"]) && isset($_POST["ong"]) && isset($_POST["localizacao"]) && isset($_POST["telefone"]) && isset($_POST["fundacao"]) && isset($_POST["sobre"])) {        
        $conn = new Conexao();

        $nome = htmlspecialchars($_POST["nome"]);
        $ong = htmlspecialchars($_POST["ong"]);
        $localizacao = htmlspecialchars($_POST["localizacao"]);
        $email = htmlspecialchars($_POST["email"]);
        $telefone = htmlspecialchars($_POST["telefone"]);
        $fundacao = htmlspecialchars($_POST["fundacao"]);
        $sobre = htmlspecialchars($_POST["sobre"]);


        $sql = "INSERT INTO perfil (nome, ong, localizacao, email, telefone, fundacao, sobre)
        VALUES ('$nome', '$ong', '$localizacao', '$email', '$telefone', '$fundacao', '$sobre')
        ON DUPLICATE KEY UPDATE nome='$nome', ong='$ong', localizacao='$localizacao', email='$email', telefone='$telefone', fundacao='$fundacao', sobre='$sobre'";

        $stmt = $conn->conexao->prepare( $sql );

        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $ong);
        $stmt->bindParam(3, $localizacao);
        $stmt->bindParam(4, $email);
        $stmt->bindParam(5, $telefone);
        $stmt->bindParam(6, $fundacao);
        $stmt->bindParam(7, $sobre);
        $resultado = $stmt->execute();

        if($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['message' => 'Atualizado com sucesso',
                        'result' => true];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        else {
            $response = ['message' => 'Erro ao atualizar',
                            'result' => false];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        
    }else{
        $response = ['message' => 'Verifique os campos e tente novamente',
                'result' => false];
        echo json_encode($response);    
    }
}catch(PDOException $e){
    $response = ['message' => $e->getMessage(), 'result' => false];
    // header('Content-Type: application/json');
    echo json_encode($response);
}

?>